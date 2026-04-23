import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MAJOR_ARCANA } from '@/data/tarot'
import { calcLifeNumber } from '@/lib/numerology'

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

const READINGS: Record<string, string[]> = {
  high: [
    'あなたと{name}さんは、出会うべくして出会った魂の伴侶。互いのエネルギーが自然と引き合い、一緒にいるだけで心が満たされる関係です。この縁を大切に育てることで、二人の絆はさらに深まっていくでしょう。',
    '{name}さんとあなたの間には、数秘術が示す最高の共鳴があります。言葉がなくても通じ合える不思議な感覚、それが2人の本質的なつながりです。この出会いは偶然ではなく、宇宙が引き合わせた必然です。',
    'あなたと{name}さんは魂のレベルで深くつながっています。お互いの良さを引き出し合い、一緒にいると自然体でいられる稀有な関係。この縁を信じて、一歩踏み出す勇気を持ちましょう。',
  ],
  good: [
    'あなたと{name}さんの相性は非常に良く、お互いを高め合える素晴らしい関係です。{name}さんはあなたの感性を理解し、あなたも{name}さんの個性を自然と受け入れられます。一緒に過ごす時間が増えるほど、絆は深まっていくでしょう。',
    '{name}さんとあなたは、価値観や感情のリズムが合いやすい関係。会話が弾み、沈黙も心地よい、そんな穏やかで豊かな愛を育てられます。焦らずじっくりと距離を縮めていきましょう。',
    'あなたと{name}さんの間には自然な引力があります。互いの違いをむしろ魅力として感じられる関係で、長く続くほど愛情が深まっていくタイプです。今の気持ちを素直に伝えることが大切です。',
  ],
  normal: [
    'あなたと{name}さんは、お互いに学び合える可能性に満ちた関係です。最初は少しぎこちなさを感じることがあっても、時間をかけて理解を深めることで、温かく安定した愛情を育てることができます。',
    '{name}さんとあなたは異なる個性を持ちますが、だからこそ互いに新しい視点を与え合えます。丁寧にコミュニケーションを重ねることで、良い関係を築いていけるでしょう。',
    'あなたと{name}さんの関係は、誠実な歩み寄りが鍵です。共通の趣味や目標を見つけることで、距離がぐっと縮まります。焦らず、お互いのペースを尊重しながら関係を育てましょう。',
  ],
  challenging: [
    'あなたと{name}さんは刺激的な関係。お互いに強い個性があるからこそ、惹かれ合うと同時に衝突することも。しかしその摩擦が2人を成長させ、深い絆へと昇華させる可能性を秘めています。',
    '{name}さんとあなたは、一緒にいると刺激が絶えないでしょう。違いが多い分だけ、お互いを理解しようとする努力が関係を豊かにします。この緊張感こそが2人の関係を特別なものにするスパイスです。',
    'あなたと{name}さんは正反対の魅力を持つカップル。最初は戸惑いを感じることもありますが、互いの違いを受け入れることができれば、誰もが羨む唯一無二の関係に発展します。',
  ],
}

function dateSeed(date: Date) {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
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
  const LABELS: Record<string, string> = {
    high: '運命の相手', good: 'とても相性が良い', normal: '良い関係を築ける', challenging: '刺激的な関係',
  }

  const userCard = MAJOR_ARCANA.find(c => c.id === LIFE_TO_CARD_ID[userLifeNum])!
  const partnerCard = MAJOR_ARCANA.find(c => c.id === LIFE_TO_CARD_ID[partnerLifeNum])!

  const seed = dateSeed(now)
  const readingTemplate = pick(READINGS[labelKey], seed)
  const reading = readingTemplate.replace(/{name}/g, partnerInitials)

  return NextResponse.json({
    score,
    label: LABELS[labelKey],
    userLifeNum,
    partnerLifeNum,
    userCard: { id: userCard.id, name: userCard.name, icon: userCard.icon, nameEn: userCard.nameEn, loveMessage: userCard.loveMessage },
    partnerCard: { id: partnerCard.id, name: partnerCard.name, icon: partnerCard.icon, nameEn: partnerCard.nameEn, loveMessage: partnerCard.loveMessage },
    reading,
  })
}

export const maxDuration = 30
