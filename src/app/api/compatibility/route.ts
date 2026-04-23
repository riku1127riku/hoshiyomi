import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MAJOR_ARCANA } from '@/data/tarot'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { calcLifeNumber } from '@/lib/numerology'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const LIFE_TO_CARD_ID: Record<number, number> = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
}

const COMPAT_MATRIX: number[][] = [
  [75, 88, 82, 65, 90, 70, 85, 78, 72],
  [88, 70, 78, 85, 75, 92, 68, 80, 88],
  [82, 78, 72, 78, 88, 85, 90, 70, 82],
  [65, 85, 78, 68, 80, 75, 72, 92, 78],
  [90, 75, 88, 80, 65, 78, 85, 72, 88],
  [70, 92, 85, 75, 78, 72, 80, 88, 85],
  [85, 68, 90, 72, 85, 80, 78, 75, 70],
  [78, 80, 70, 92, 72, 88, 75, 68, 85],
  [72, 88, 82, 78, 88, 85, 70, 85, 75],
]

const COMPAT_LABELS: Record<string, string> = {
  high: '運命の相手',
  good: 'とても相性が良い',
  normal: '良い関係を築ける',
  challenging: '刺激的な関係',
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: subscription } = await supabase
    .from('subscriptions').select('status, trial_end').eq('user_id', user.id).single()

  const now = new Date()
  const isActive =
    subscription?.status === 'active' ||
    (subscription?.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) > now)
  if (!isActive) return NextResponse.json({ error: 'subscription_required' }, { status: 403 })

  const { data: profile } = await supabase
    .from('profiles').select('initials, life_number').eq('id', user.id).single()

  const { partnerInitials, partnerBirthDate } = await req.json()

  const userLifeNum = profile?.life_number ?? 1
  const partnerLifeNum = calcLifeNumber(partnerBirthDate)
  const score = COMPAT_MATRIX[userLifeNum - 1][partnerLifeNum - 1]
  const labelKey = score >= 90 ? 'high' : score >= 80 ? 'good' : score >= 70 ? 'normal' : 'challenging'
  const label = COMPAT_LABELS[labelKey]

  const userCard = MAJOR_ARCANA.find(c => c.id === LIFE_TO_CARD_ID[userLifeNum])!
  const partnerCard = MAJOR_ARCANA.find(c => c.id === LIFE_TO_CARD_ID[partnerLifeNum])!

  const metadata = {
    score,
    label,
    userLifeNum,
    partnerLifeNum,
    userCard: { id: userCard.id, name: userCard.name, icon: userCard.icon, nameEn: userCard.nameEn, loveMessage: userCard.loveMessage },
    partnerCard: { id: partnerCard.id, name: partnerCard.name, icon: partnerCard.icon, nameEn: partnerCard.nameEn, loveMessage: partnerCard.loveMessage },
  }

  const prompt = `数秘術師＆タロット占い師として2人の恋愛相性を鑑定してください。

あなた：ライフパスナンバー${userLifeNum}・${userCard.name}のエネルギー
相手（${partnerInitials}）：ライフパスナンバー${partnerLifeNum}・${partnerCard.name}のエネルギー
相性スコア：${score}点（${label}）

2人の相性・関係性の特徴・恋愛の発展可能性を200文字で。「あなた」と「${partnerInitials}さん」を主語に温かく具体的に。メッセージのみ返してください。`

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  try {
    const result = await model.generateContentStream(prompt)
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(JSON.stringify(metadata) + '\n'))
        for await (const chunk of result.stream) {
          controller.enqueue(encoder.encode(chunk.text()))
        }
        controller.close()
      },
    })
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
    })
  } catch {
    return NextResponse.json({ ...metadata, reading: `${userCard.name}と${partnerCard.name}の組み合わせは${label}です。` })
  }
}

export const maxDuration = 60
