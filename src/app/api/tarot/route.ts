import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { MAJOR_ARCANA, POSITIONS } from '@/data/tarot'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status, trial_end')
    .eq('user_id', user.id)
    .single()

  const now = new Date()
  const isActive =
    subscription?.status === 'active' ||
    (subscription?.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) > now)

  if (!isActive) return NextResponse.json({ error: 'subscription_required' }, { status: 403 })

  const { cardIds, reversals, question, fortuneScore, fortuneLabel } = await req.json()

  const cards = cardIds.map((id: number, i: number) => ({
    ...MAJOR_ARCANA.find(c => c.id === id)!,
    position: POSITIONS[i],
    reversed: reversals?.[i] ?? false,
  }))

  const prompt = `プロのタロット占い師として恋愛鑑定を行ってください。

${fortuneScore ? `今日の数秘術スコア：${fortuneScore}/10（${fortuneLabel}）\n` : ''}過去：${cards[0].name}（${cards[0].reversed ? '逆位置' : '正位置'}）
現在：${cards[1].name}（${cards[1].reversed ? '逆位置' : '正位置'}）
未来：${cards[2].name}（${cards[2].reversed ? '逆位置' : '正位置'}）
${question ? `\n質問：${question}` : ''}

3枚の流れを繋げて「あなた」を主語に恋愛メッセージを250文字で。温かく具体的に。メッセージのみ返してください。`

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  // DBに非同期保存（ブロックしない）
  const adminSupabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  adminSupabase.from('tarot_readings').insert({
    user_id: user.id,
    card_ids: cardIds,
    question: question || null,
    overall: cards.map((c: typeof cards[0]) => c.name).join('・'),
    advice: null,
  }).then(() => {}).catch(() => {})

  try {
    const result = await model.generateContentStream(prompt)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(encoder.encode(chunk.text()))
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch {
    // フォールバック
    const fallback = `${cards[0].name}が示す過去のエネルギーを経て、現在${cards[1].name}があなたの恋愛に影響を与えています。${cards[1].reversed ? cards[1].reversedMessage : cards[1].loveMessage} そして未来には${cards[2].name}が待ち受けています。${cards[2].reversed ? cards[2].reversedMessage : cards[2].loveMessage}`
    return new Response(fallback, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}

export const maxDuration = 60
