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

  const positionLabels = ['過去の背景・潜在的な流れ', '現在の核心・あなたの状況', '未来の可能性・進むべき道']

  const prompt = `あなたはウェイト=スミス版タロットに精通したプロの占い師です。恋愛に特化した本格鑑定を行ってください。

${fortuneScore ? `【今日の数秘術運勢】スコア：${fortuneScore}/10（${fortuneLabel}）\n` : ''}【引いたカード】
${cards.map((c: typeof cards[0], i: number) => `・${c.position}（${positionLabels[i]}）
  ${c.name}（${c.nameEn}）【${c.reversed ? '逆位置' : '正位置'}】
  キーワード：${c.keywords.join('、')}`).join('\n')}

${question ? `【ご質問】\n${question}\n` : ''}【鑑定の指針】
- タロットの本来の象徴体系に基づいて解釈してください
- 正位置・逆位置それぞれの本来の意味を活用してください
- 3枚の流れを「過去→現在→未来」として繋げて読んでください
${fortuneScore ? `- 今日の数秘術スコア${fortuneScore}との相乗効果も読み解いてください\n` : ''}- 「あなた」を主語に、希望と温かさのある具体的な言葉で
- 全体鑑定は380〜450文字で

必ずこのJSON形式のみで返してください（他のテキストは一切不要）：
{
  "overall": "3枚を統合した総合鑑定メッセージ（380〜450文字）",
  "advice": "今日からできる具体的なアクション（70文字程度）",
  "cardReadings": [
    "${cards[0]?.name}（${cards[0]?.reversed ? '逆位置' : '正位置'}）の個別メッセージ（100文字程度）",
    "${cards[1]?.name}（${cards[1]?.reversed ? '逆位置' : '正位置'}）の個別メッセージ（100文字程度）",
    "${cards[2]?.name}（${cards[2]?.reversed ? '逆位置' : '正位置'}）の個別メッセージ（100文字程度）"
  ]
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
    return NextResponse.json({
      overall: `${cards[0].name}が過去の背景を、${cards[1].name}が現在の状況を、${cards[2].name}が未来への道を示しています。${cards[1].reversed ? cards[1].reversedMessage : cards[1].loveMessage} ${cards[2].reversed ? cards[2].reversedMessage : cards[2].loveMessage}`,
      advice: cards[2].reversed ? cards[2].reversedMessage : cards[2].loveMessage,
      cardReadings: cards.map((c: typeof cards[0]) => c.reversed ? c.reversedMessage : c.loveMessage),
    })
  }

  const text = result.response.text()
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return NextResponse.json({ error: 'parse_error' }, { status: 500 })

  const parsed = JSON.parse(jsonMatch[0])

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

  return NextResponse.json({
    overall: parsed.overall,
    advice: parsed.advice,
    cardReadings: parsed.cardReadings,
  })
}

export const maxDuration = 60
