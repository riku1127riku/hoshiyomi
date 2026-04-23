import { GoogleGenerativeAI } from '@google/generative-ai'
import { calcLifeNumber, calcTodayNumber, calcFortuneScore } from './numerology'
import { Gender } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SCORE_LABELS: Record<number, string> = {
  1: 'エネルギーを蓄える日',
  2: '内省が大切な日',
  3: '少しずつ前進できる日',
  4: '焦らず丁寧にいこう',
  5: '変化の予感がする日',
  6: '縁がつながりやすい日',
  7: '直感を信じていい日',
  8: '恋が動き出す予感',
  9: '運命の流れに乗れる日',
  10: '特別な輝きをまとう日',
}

const GENDER_TONE: Record<Gender, string> = {
  female: '恋愛に敏感で感受性豊かな女性向けに、共感しやすく感情に寄り添う言葉で書いてください。',
  male: '恋愛に前向きな男性向けに、背中を押すような言葉で書いてください。',
  other: '性別を問わず、誰もが共感できるニュートラルな言葉で書いてください。',
}

interface FortuneInput {
  initials: string
  birthDate: string
  gender: Gender
  today: Date
}

export interface FortuneResult {
  score: number
  scoreLabel: string
  loveMessage: string
  todaysWord: string
  luckyAction: string
}

export async function generateFortune(input: FortuneInput): Promise<FortuneResult> {
  const { initials, birthDate, gender, today } = input
  const lifeNumber = calcLifeNumber(birthDate)
  const todayNumber = calcTodayNumber(today)
  const score = calcFortuneScore(lifeNumber, todayNumber)
  const scoreLabel = SCORE_LABELS[score]

  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const dayName = dayNames[today.getDay()]

  const prompt = `あなたはプロの占い師です。以下の情報を元に今日の運勢を生成してください。

【情報】
- イニシャル：${initials}
- 生年月日：${birthDate}（数秘術ライフパス数：${lifeNumber}）
- 今日の日付：${dateStr}（${dayName}曜日）（今日の数：${todayNumber}）
- 今日の運勢スコア：${score}/10「${scoreLabel}」
- 性別：${gender}

【トーン】
${GENDER_TONE[gender]}

【出力形式】必ずこのJSON形式のみで返してください。余分なテキスト不要。
{
  "loveMessage": "恋愛を中心にした今日のメッセージ（150〜200文字）。感情に寄り添い、希望を与える内容。「あなた」を主語にする。ネガティブな予言はしない。",
  "todaysWord": "今日のひとこと（20〜40文字の一文）。保存したくなるような、心に響く言葉。",
  "luckyAction": "今日の引き寄せ行動（30〜50文字）。恋愛に関する具体的な小さなアクション。"
}`

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  let result
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      result = await model.generateContent(prompt)
      break
    } catch (e: unknown) {
      const err = e as { status?: number; errorDetails?: { '@type': string; retryDelay?: string }[] }
      if (err?.status === 429) {
        const retryInfo = err.errorDetails?.find(d => d['@type']?.includes('RetryInfo'))
        const delaySec = parseInt(retryInfo?.retryDelay ?? '30') + 2
        console.log(`Rate limited. Retrying in ${delaySec}s...`)
        await new Promise(r => setTimeout(r, delaySec * 1000))
      } else {
        throw e
      }
    }
  }
  if (!result) throw new Error('運勢の生成に失敗しました')

  const text = result.response.text()

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('運勢の生成に失敗しました')

  const parsed = JSON.parse(jsonMatch[0])

  return {
    score,
    scoreLabel,
    loveMessage: parsed.loveMessage,
    todaysWord: parsed.todaysWord,
    luckyAction: parsed.luckyAction,
  }
}
