// ===== 型定義 =====

export type ZodiacKey =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export type Element = '火' | '地' | '風' | '水'

export interface AstrologyResult {
  zodiacName: string
  zodiacEmoji: string
  zodiacElement: Element
  zodiacLoveStyle: string
  compatibleSigns: string[]

  nineStarName: string
  nineStarEmoji: string
  nineStarPersonality: string
  nineStarLoveStyle: string

  lifePathNumber: number
  birthdayNumber: number

  personalYear: number
  personalYearTheme: string
  personalMonth: number
  personalMonthTheme: string

  overallMessage: string
  luckyColor: string
  luckyItem: string
}

// ===== 全テキストプール =====

const ZODIAC_POOL: Record<ZodiacKey, {
  name: string; emoji: string; element: Element
  compatible: ZodiacKey[]
  loveStyles: string[]
  luckyColors: string[]
}> = {
  aries: {
    name: '牡羊座', emoji: '♈', element: '火',
    compatible: ['leo', 'sagittarius', 'gemini', 'aquarius'],
    loveStyles: [
      '一目惚れが多く、情熱の炎で恋を燃やすタイプ。好きになったら全力で突き進む',
      '恋愛は直感で動く。スピード感があって、気づいたら深みにはまっている',
      '積極的でエネルギッシュ。好意はストレートに伝えるから相手も心動かされやすい',
    ],
    luckyColors: ['真紅', 'オレンジ', 'コーラルレッド'],
  },
  taurus: {
    name: '牡牛座', emoji: '♉', element: '地',
    compatible: ['virgo', 'capricorn', 'cancer', 'pisces'],
    loveStyles: [
      'ゆっくり深く愛するタイプ。一度心を開いた相手には一途で揺るがない',
      '安心感と信頼を積み重ねる恋愛。じっくり育てる愛が本物になっていく',
      '誠実で粘り強い。すぐに動かないけど、動き出したら本気の証拠',
    ],
    luckyColors: ['フォレストグリーン', 'ローズピンク', 'アイボリー'],
  },
  gemini: {
    name: '双子座', emoji: '♊', element: '風',
    compatible: ['libra', 'aquarius', 'aries', 'leo'],
    loveStyles: [
      '会話が弾む相手に惹かれる。知的な刺激が恋心のスイッチを入れる',
      '好奇心旺盛で多彩な出会いがある。同じ話題で盛り上がれる人が運命の相手',
      'フレンドリーで距離感が上手い。気づいたら友達から恋人になっているパターンが多い',
    ],
    luckyColors: ['スカイブルー', 'レモンイエロー', 'ミントグリーン'],
  },
  cancer: {
    name: '蟹座', emoji: '♋', element: '水',
    compatible: ['scorpio', 'pisces', 'taurus', 'virgo'],
    loveStyles: [
      '包み込む愛情で相手を癒す。「この人といると落ち着く」と言われやすい',
      '感受性が豊かで共感力が高い。相手の気持ちを敏感に察知して寄り添える',
      '家庭的な温かさが魅力。守られたい気持ちと守りたい気持ちが共存している',
    ],
    luckyColors: ['シルバー', 'パール', 'ムーンストーンホワイト'],
  },
  leo: {
    name: '獅子座', emoji: '♌', element: '火',
    compatible: ['aries', 'sagittarius', 'gemini', 'libra'],
    loveStyles: [
      '特別扱いされることを大切にする。愛情表現は大胆で惜しみない',
      '自分も相手も輝かせる恋愛が好き。一緒にいると自信が湧いてくるカップル',
      '堂々としていて存在感がある。惹きつけるオーラで自然と縁が集まる',
    ],
    luckyColors: ['ゴールド', 'サンセットオレンジ', 'ロイヤルパープル'],
  },
  virgo: {
    name: '乙女座', emoji: '♍', element: '地',
    compatible: ['taurus', 'capricorn', 'cancer', 'scorpio'],
    loveStyles: [
      '細やかな気配りで愛情を示す。見えないところでそっと支えるのが得意',
      '慎重に相手を見極めてから動く。一度信頼した相手には献身的に尽くす',
      '完璧主義だけど、大切な人の前では素直になれる。ギャップが魅力になる',
    ],
    luckyColors: ['ネイビー', 'スレートグレー', 'オリーブグリーン'],
  },
  libra: {
    name: '天秤座', emoji: '♎', element: '風',
    compatible: ['gemini', 'aquarius', 'leo', 'sagittarius'],
    loveStyles: [
      'ロマンチックな演出が好き。美しい関係を大切に育てていく',
      '調和を愛するパートナー。喧嘩より話し合いで解決するタイプ',
      'おしゃれなデートや特別な時間を共有することで絆が深まる',
    ],
    luckyColors: ['ベビーピンク', 'ライトブルー', 'ラベンダー'],
  },
  scorpio: {
    name: '蠍座', emoji: '♏', element: '水',
    compatible: ['cancer', 'pisces', 'virgo', 'capricorn'],
    loveStyles: [
      '深く狂おしいほどの愛。一度心を開いた相手には全力で尽くす',
      '直感で相手の本質を見抜く。表面だけじゃなく、魂レベルで繋がりたい',
      '情熱と洞察力が共存する。秘密めいた雰囲気が相手を惹きつける',
    ],
    luckyColors: ['ディープレッド', 'マットブラック', 'バーガンディ'],
  },
  sagittarius: {
    name: '射手座', emoji: '♐', element: '火',
    compatible: ['aries', 'leo', 'libra', 'aquarius'],
    loveStyles: [
      '自由を愛しながら一緒に成長できる恋愛を求める。冒険を共にしたい',
      '明るくオープンで友達が多い。共通の夢を持つ相手と運命を感じやすい',
      '束縛が苦手だけど、信頼できる相手には深く絆を結ぶ',
    ],
    luckyColors: ['パープル', 'ターコイズ', 'コバルトブルー'],
  },
  capricorn: {
    name: '山羊座', emoji: '♑', element: '地',
    compatible: ['taurus', 'virgo', 'scorpio', 'pisces'],
    loveStyles: [
      '責任感と誠実さで愛を育てる。時間をかけて信頼を積み重ねるタイプ',
      '外では冷静でも、心を許した相手には意外と甘えん坊な一面がある',
      '現実的だけど夢を持っている。将来を見据えた真剣な恋愛が好き',
    ],
    luckyColors: ['チャコールブラウン', 'ダークグリーン', 'オフホワイト'],
  },
  aquarius: {
    name: '水瓶座', emoji: '♒', element: '風',
    compatible: ['gemini', 'libra', 'aries', 'sagittarius'],
    loveStyles: [
      '友達から始まる恋が多い。独自のペースで深まる唯一無二の関係を大切に',
      'ユニークな価値観を持つ相手に惹かれる。一般的な恋愛より特別な絆を求める',
      '自立していて個性的。相手の自由も自分の自由も大切にするパートナー',
    ],
    luckyColors: ['エレクトリックブルー', 'シルバー', 'ロイヤルブルー'],
  },
  pisces: {
    name: '魚座', emoji: '♓', element: '水',
    compatible: ['cancer', 'scorpio', 'taurus', 'capricorn'],
    loveStyles: [
      '夢見がちで純粋な愛。相手に溶け合うような深い繋がりを求める',
      '共感力と想像力で相手の心を読む。感情で繋がることが恋愛の核心',
      'ロマンチックな雰囲気と繊細な気遣いで相手を包み込む恋愛',
    ],
    luckyColors: ['シーグリーン', 'ラベンダー', 'パステルブルー'],
  },
}

const NINE_STAR_POOL: Record<number, {
  name: string; emoji: string
  personalities: string[]
  loveStyles: string[]
}> = {
  1: {
    name: '一白水星', emoji: '💧',
    personalities: [
      '柔軟で知性的。流れに乗る直感の持ち主',
      '穏やかに見えて内面に強い信念を持っている',
      '観察眼が鋭く、人の本質を見抜く力がある',
    ],
    loveStyles: [
      '静かな情熱を持つ。じっくり相手を見極めてから深く愛する',
      '感情を表に出さないけれど、内側では誰より深く想っている',
      '流れに身を任せる恋愛。縁のある相手には自然と近づいていく',
    ],
  },
  2: {
    name: '二黒土星', emoji: '🌾',
    personalities: [
      '忍耐強く誠実。縁の下の力持ちタイプ',
      '思いやりがあり、周りの人を支えることに喜びを感じる',
      '地道な努力が実を結ぶ。信頼と実績で人の心をつかむ',
    ],
    loveStyles: [
      '献身的で尽くす愛。相手のために自分を惜しまない',
      '安定した愛情で包む。長く続く関係を何より大切にする',
      '縁を丁寧に育てる。日々の小さな積み重ねが深い絆になる',
    ],
  },
  3: {
    name: '三碧木星', emoji: '⚡',
    personalities: [
      '行動力があり新しいものが大好き',
      'エネルギッシュで発想力豊か。やると決めたら一直線',
      '明るく前向き。周りに活気を与える存在',
    ],
    loveStyles: [
      'スピーディーな恋愛。直感で動き一気に距離を縮める',
      '情熱的でアクティブ。一緒にいて飽きない刺激的な関係',
      '素直な気持ちをストレートに伝える。その純粋さが相手を動かす',
    ],
  },
  4: {
    name: '四緑木星', emoji: '🍃',
    personalities: [
      '社交的でコミュニケーション上手',
      '人と人を繋ぐ橋渡し役。誰とでも仲良くなれる',
      '柔軟で物事を広い視野で捉えられる',
    ],
    loveStyles: [
      '出会いが多く縁に恵まれる。人脈から素敵な恋が生まれやすい',
      '楽しい雰囲気を作るのが得意。デートの計画力で相手を喜ばせる',
      '縁を大切に育てる。気づいたら自然に愛が深まっていくタイプ',
    ],
  },
  5: {
    name: '五黄土星', emoji: '🌕',
    personalities: [
      'カリスマ性があり存在感が際立つ',
      'どんな状況でも中心的な役割を担う。人を引き寄せる力がある',
      '強い意志を持ち、困難を乗り越える力がある',
    ],
    loveStyles: [
      '強い引力で相手を惹きつける。運命的な出会いが多い',
      '情熱的で独占欲もある。大切な人を全力で守ろうとする',
      '唯一無二の存在感で相手の心に刻まれる恋愛をする',
    ],
  },
  6: {
    name: '六白金星', emoji: '✨',
    personalities: [
      '完璧主義で高い理想を持つリーダー',
      '品格があり、物事を正しく進める責任感がある',
      '信念を曲げない。自分の価値観に誇りを持っている',
    ],
    loveStyles: [
      '理想が高く妥協しない。本物だと確信した相手には真剣に向き合う',
      '誇り高い愛情表現。相手を尊重しながら自分も尊重される関係を築く',
      '品のある恋愛が好き。一流の時間を共有することで絆が深まる',
    ],
  },
  7: {
    name: '七赤金星', emoji: '💫',
    personalities: [
      '魅力的で楽しいことが大好き',
      'ユーモアがあり場を和ませる。笑いのある関係を大切にする',
      'センスが良く、美しいものに敏感',
    ],
    loveStyles: [
      '楽しい時間を共有する恋愛。笑顔が絶えない関係を大切に',
      '遊び心と愛情のバランスが絶妙。相手に飽きさせない魅力がある',
      'おしゃれな雰囲気の中で愛が育つ。特別な体験を共有することで深まる',
    ],
  },
  8: {
    name: '八白土星', emoji: '⛰️',
    personalities: [
      '変化に強く粘り強い現実主義者',
      '山のように揺るぎない信頼感がある',
      '時間をかけて大きな成果を出すタイプ',
    ],
    loveStyles: [
      '着実に関係を築く。変化の時期に運命の出会いが訪れやすい',
      '安定と成長を共に求める恋愛。一緒に高め合えるパートナーが理想',
      '粘り強くアプローチする。諦めない姿勢が相手の心を動かす',
    ],
  },
  9: {
    name: '九紫火星', emoji: '🔥',
    personalities: [
      '直感鋭く美的センスに優れたロマンチスト',
      '感受性が豊かで芸術的な才能がある',
      '明るく情熱的。場の雰囲気をパッと変える力がある',
    ],
    loveStyles: [
      '一目惚れしやすく情熱的。美しいものや高尚な恋愛に惹かれる',
      '直感で恋を選ぶ。心が動いた瞬間に全力になる',
      'ロマンチックな演出が得意。相手の心に残る特別な思い出を作る',
    ],
  },
}

const PERSONAL_YEAR_THEMES: Record<number, string[]> = {
  1: ['新しい恋のスタート。思い切った行動が吉', '今年は恋愛の種まきの時。積極的に動いた分だけ実る', '新しい出会いに心を開いて。一歩踏み出せば流れが変わる'],
  2: ['関係を深める時。相手の気持ちに寄り添って', '焦らず丁寧に。今年の愛情は時間をかけるほど輝く', '2人の間に橋をかける時期。対話と共感が鍵'],
  3: ['出会いと表現の年。自分を発信すると縁が広がる', '楽しむことが最大の引き寄せ。笑顔が縁を連れてくる', '自分らしさを前面に。個性が輝くほど魅力が増す'],
  4: ['基盤づくりの年。真剣な関係を築くのに最適', '地道な積み重ねが恋愛の礎に。焦らず丁寧に向き合って', '今年の縁は長続きする。大切な関係を丁寧に育てる年'],
  5: ['変化と自由の年。新しい出会いが劇的に訪れる', '予期せぬ出来事が恋愛のターニングポイントに', '変化を恐れないで。今年の動きが未来の恋愛を決める'],
  6: ['愛と責任の年。大切な関係に誠実に向き合う', '愛情を惜しまず与えて。返ってくるものは何倍にもなる', '家族や大切な人との絆を深める。愛が実りやすい年'],
  7: ['内省と成熟の年。本当に大切なものが見えてくる', '一人の時間も大切に。自分を知ることで理想の恋が見える', '深く考える年。本物の縁だけが残っていく'],
  8: ['実りと成就の年。努力が報われ関係が花開く', '今まで育てた愛が形になる時。結実を楽しんで', '大きな決断が実を結ぶ年。自信を持って進んで'],
  9: ['完成と手放しの年。新しいステージへの準備期間', '今年で一つの恋愛サイクルが終わる。次への扉が開く', '手放すことで新しい縁が来る。今年の経験がすべて次に繋がる'],
}

const PERSONAL_MONTH_THEMES: Record<number, string[]> = {
  1: ['積極的な行動が吉。気になる人に連絡を', '新しいことを始めるのに最高の月。動いた人が勝つ', '今月は自分から仕掛けて。受け身でいると機会を逃す'],
  2: ['感情を素直に表現して。相手との対話を大切に', '協調と共感の月。相手の話をじっくり聞くと縁が深まる', '2人の時間を大切に。心と心が近づく月'],
  3: ['楽しいデートや集まりに参加して縁を広げて', '笑顔でいると素敵な縁が集まってくる月', '表現を豊かに。気持ちを言葉や行動で伝える月'],
  4: ['関係を整理・整頓の時期。本音で向き合って', '丁寧に向き合う月。焦らず一つ一つ確認して', '基礎固めの月。急がず誠実に向き合うことが大切'],
  5: ['予期せぬ出来事に注目。変化を楽しんで', '自由に動くと良い縁に出会える月', '変化の風に乗って。新しい出会いのチャンスが多い'],
  6: ['愛情表現を惜しまないで。思いやりが実を結ぶ', '与えるほど返ってくる月。愛情を積極的に示して', '身近な人との絆を大切に。感謝の言葉が縁を深める'],
  7: ['自分磨きの時期。内面を高めると魅力が増す', '一人の時間を大切に。自分と向き合うことで答えが見える', '直感を信じる月。閃きに従って動くと吉'],
  8: ['決断の月。大切なことに結論を出す勇気を', '行動が結果に直結する月。チャンスを逃さないで', '今月動いたことが形になる。積極的に仕掛けて'],
  9: ['ひとつの区切り。手放すことで新しい縁が来る', '感謝とともに締めくくる月。次のサイクルへの準備を', '今月の経験をしっかり受け取って。すべては次に繋がる'],
}

const OVERALL_MESSAGES: string[] = [
  'あなたの恋愛は、一度動き出せば止まらないエネルギーを持っています。星のサインを信じて。',
  '複数の占いが示す今の流れは、新しい縁が近づいているサイン。心を開いて待って。',
  '数字と星が一致して告げています。あなたには素敵な恋愛をする力がある。',
  '九星と星座のエネルギーが共鳴している。今が行動に移す絶好のタイミング。',
  '個人サイクルと星の位置が味方している。今年・今月は恋愛に積極的になるべき時期。',
]

const LUCKY_ITEMS: string[] = [
  'クリスタル', 'お気に入りの香水', 'ゴールドのアクセサリー', 'お守り', 'プレスドフラワー',
  'ムーンストーン', 'ピンクのハンカチ', '手帳', 'バラのルームスプレー', 'パールのピアス',
]

// ===== 計算ロジック =====

function reduceToSingleDigit(n: number): number {
  while (n > 9) {
    n = String(n).split('').reduce((a, b) => a + parseInt(b), 0)
  }
  return n
}

// 日付ベースのシード（同じ日は同じ結果）
function dateSeed(today: Date): number {
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

function calcZodiacKey(birthDate: string): ZodiacKey {
  const date = new Date(birthDate)
  const m = date.getMonth() + 1
  const d = date.getDate()
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19))       return 'aries'
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20))        return 'taurus'
  if ((m === 5 && d >= 21) || (m === 6 && d <= 21))        return 'gemini'
  if ((m === 6 && d >= 22) || (m === 7 && d <= 22))        return 'cancer'
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22))        return 'leo'
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22))        return 'virgo'
  if ((m === 9 && d >= 23) || (m === 10 && d <= 23))       return 'libra'
  if ((m === 10 && d >= 24) || (m === 11 && d <= 22))      return 'scorpio'
  if ((m === 11 && d >= 23) || (m === 12 && d <= 21))      return 'sagittarius'
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19))       return 'capricorn'
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18))        return 'aquarius'
  return 'pisces'
}

function calcNineStarNumber(birthDate: string): number {
  const date = new Date(birthDate)
  let year = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  if (m === 1 || (m === 2 && d <= 3)) year -= 1
  const reduced = reduceToSingleDigit(
    String(year).split('').reduce((a, b) => a + parseInt(b), 0)
  )
  return ((11 - reduced) % 9) || 9
}

export function calcLifePathNumber(birthDate: string): number {
  const digits = birthDate.replace(/-/g, '').split('').map(Number)
  return reduceToSingleDigit(digits.reduce((a, b) => a + b, 0))
}

export function calcBirthdayNumber(birthDate: string): number {
  return reduceToSingleDigit(parseInt(birthDate.split('-')[2]))
}

export function calcAstrologyResult(birthDate: string, today: Date = new Date()): AstrologyResult {
  const seed = dateSeed(today)

  const zodiacKey = calcZodiacKey(birthDate)
  const zodiac = ZODIAC_POOL[zodiacKey]

  const nineStarNum = calcNineStarNumber(birthDate)
  const nineStar = NINE_STAR_POOL[nineStarNum]

  const lifePathNumber = calcLifePathNumber(birthDate)
  const birthdayNumber = calcBirthdayNumber(birthDate)

  const [, bMonth, bDay] = birthDate.split('-').map(Number)
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const yearReduced = reduceToSingleDigit(String(year).split('').reduce((a, b) => a + parseInt(b), 0))
  const birthSum = reduceToSingleDigit(
    String(bMonth).split('').reduce((a, b) => a + parseInt(b), 0) +
    String(bDay).split('').reduce((a, b) => a + parseInt(b), 0)
  )
  const personalYear = reduceToSingleDigit(yearReduced + birthSum)
  const personalMonth = reduceToSingleDigit(
    personalYear + reduceToSingleDigit(String(month).split('').reduce((a, b) => a + parseInt(b), 0))
  )

  const ZODIAC_LABEL: Partial<Record<ZodiacKey, string>> = {
    aries: '♈牡羊座', taurus: '♉牡牛座', gemini: '♊双子座', cancer: '♋蟹座',
    leo: '♌獅子座', virgo: '♍乙女座', libra: '♎天秤座', scorpio: '♏蠍座',
    sagittarius: '♐射手座', capricorn: '♑山羊座', aquarius: '♒水瓶座', pisces: '♓魚座',
  }

  return {
    zodiacName: zodiac.name,
    zodiacEmoji: zodiac.emoji,
    zodiacElement: zodiac.element,
    zodiacLoveStyle: pick(zodiac.loveStyles, seed),
    compatibleSigns: zodiac.compatible.map(k => ZODIAC_LABEL[k] ?? k),

    nineStarName: nineStar.name,
    nineStarEmoji: nineStar.emoji,
    nineStarPersonality: pick(nineStar.personalities, seed + 1),
    nineStarLoveStyle: pick(nineStar.loveStyles, seed + 2),

    lifePathNumber,
    birthdayNumber,

    personalYear,
    personalYearTheme: pick(PERSONAL_YEAR_THEMES[personalYear], seed + 3),
    personalMonth,
    personalMonthTheme: pick(PERSONAL_MONTH_THEMES[personalMonth], seed + 4),

    overallMessage: pick(OVERALL_MESSAGES, seed + 5),
    luckyColor: pick(zodiac.luckyColors, seed + 6),
    luckyItem: pick(LUCKY_ITEMS, seed + 7),
  }
}

// 相性スコア（星座ベース）
export function calcZodiacCompatibility(z1: ZodiacKey, z2: ZodiacKey): { score: number; label: string } {
  const pool = ZODIAC_POOL[z1]
  if (!pool) return { score: 70, label: '良い相性' }
  const idx = pool.compatible.indexOf(z2)
  if (idx === 0) return { score: 98, label: '運命の相性' }
  if (idx === 1) return { score: 94, label: '最高の相性' }
  if (idx === 2) return { score: 87, label: 'とても良い相性' }
  if (idx === 3) return { score: 81, label: '良い相性' }
  if (ZODIAC_POOL[z1].element === ZODIAC_POOL[z2].element) return { score: 76, label: '気が合う相性' }
  return { score: 65, label: '刺激し合える関係' }
}

export { calcZodiacKey, calcNineStarNumber }
