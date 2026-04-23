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
    .select('status, trial_end, current_period_end')
    .eq('user_id', user.id)
    .single()

  const now = new Date()
  const isActive =
    subscription?.status === 'active' ||
    (subscription?.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) > now)

  if (!isActive) return NextResponse.json({ error: 'subscription_required' }, { status: 403 })

  const { cardIds, question } = await req.json()

  const cards = cardIds.map((id: number, i: number) => ({
    ...MAJOR_ARCANA.find(c => c.id === id)!,
    position: POSITIONS[i],
  }))

  const prompt = `あなたはプロのタロット占い師です。恋愛に特化した鑑定をお願いします。

【引いたカード】
${cards.map((c: typeof cards[0]) => `・${c.position}：${c.name}（${c.nameEn}）`).join('\n')}

${question ? `【ご質問】\n${question}\n` : ''}
【鑑定内容】
3枚のカードの流れを読み解き、恋愛に関する総合的なメッセージを200〜300文字で伝えてください。
各カードの意味を統合し、具体的なアドバイスを含めてください。「あなた」を主語にし、希望と温かさのある言葉で。

必ずこのJSON形式のみで返してください：
{
  "overall": "3枚の総合鑑定メッセージ（200〜300文字）",
  "advice": "今日からできる具体的なアクション（50文字程度）"
}`

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  let result
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      result = await model.generateContent(prompt)
      break
    } catch (e: unknown) {
      const err = e as { status?: number }
      if (err?.status === 429) {
        await new Promise(r => setTimeout(r, 30000))
      } else throw e
    }
  }

  if (!result) {
    // フォールバック
    return NextResponse.json({
      cards,
      overall: `${cards[0].name}が過去の背景を、${cards[1].name}が現在の状況を、${cards[2].name}が未来への道を示しています。${cards[1].loveMessage} ${cards[2].loveMessage}`,
      advice: cards[2].loveMessage,
    })
  }

  const text = result.response.text()
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return NextResponse.json({ error: 'parse_error' }, { status: 500 })

  const parsed = JSON.parse(jsonMatch[0])

  // 鑑定結果を保存
  const adminSupabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  await adminSupabase.from('tarot_readings').insert({
    user_id: user.id,
    card_ids: cardIds,
    question: question || null,
    overall: parsed.overall,
    advice: parsed.advice,
  })

  return NextResponse.json({ cards, overall: parsed.overall, advice: parsed.advice })
}

export const maxDuration = 60
