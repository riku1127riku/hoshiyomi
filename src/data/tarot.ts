export interface TarotCard {
  id: number
  name: string
  nameEn: string
  keywords: string[]
  loveMessage: string
  reversedMessage: string
  icon: string
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: '愚者', nameEn: 'The Fool', keywords: ['新しい始まり', '自由', '冒険'], loveMessage: '新しい出会いや関係のスタートを告げるカード。恋に飛び込む勇気を持って。', reversedMessage: '無謀な行動に注意。感情に流されず、少し立ち止まって考えて。', icon: '🌟' },
  { id: 1, name: '魔術師', nameEn: 'The Magician', keywords: ['意志', '創造力', '行動'], loveMessage: 'あなたには恋愛を動かす力があります。積極的に行動すれば望む結果が得られる。', reversedMessage: '自分を偽ることへの警告。素直な気持ちで相手と向き合って。', icon: '✨' },
  { id: 2, name: '女教皇', nameEn: 'The High Priestess', keywords: ['直感', '神秘', '内なる知恵'], loveMessage: '直感を大切に。今は行動より内省の時。相手の真意は言葉でなく感覚で掴んで。', reversedMessage: '感情を抑えすぎている可能性。もっと素直に気持ちを表現して。', icon: '🌙' },
  { id: 3, name: '女帝', nameEn: 'The Empress', keywords: ['愛', '豊かさ', '美しさ'], loveMessage: '愛情豊かな時期。あなたの魅力が最大限に輝いています。恋愛が実りやすい最高の時。', reversedMessage: '依存心や束縛への警告。相手に求めすぎていないか見直して。', icon: '💐' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', keywords: ['安定', '権威', '保護'], loveMessage: '安定した愛の形が見えてくる時期。頼れるパートナーとの絆が深まります。', reversedMessage: '支配的な関係への警告。対等なパートナーシップを心がけて。', icon: '👑' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', keywords: ['伝統', '導き', '精神性'], loveMessage: '誠実で真剣な愛が育まれる時。縁のある人との深い絆が結ばれるかもしれません。', reversedMessage: '固定観念にとらわれすぎている可能性。柔軟な心で恋愛を見つめて。', icon: '📿' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', keywords: ['愛', '選択', '調和'], loveMessage: '恋愛運最高潮のカード。大切な選択や深い絆の形成を示します。本物の愛が近づいています。', reversedMessage: '優柔不断や浮気心への警告。心を一つにして向き合って。', icon: '💕' },
  { id: 7, name: '戦車', nameEn: 'The Chariot', keywords: ['勝利', '意志', '前進'], loveMessage: '恋愛において積極的な行動が吉。自信を持って進めば望む恋が手に入ります。', reversedMessage: '焦りすぎへの警告。相手のペースも大切にしながら進んで。', icon: '⚡' },
  { id: 8, name: '力', nameEn: 'Strength', keywords: ['勇気', '忍耐', '内なる力'], loveMessage: '内側からの強さで恋愛を乗り越えられる時期。困難があっても愛で乗り越えられます。', reversedMessage: '自信の喪失や不安感への警告。あなたには十分な力があります。', icon: '🦁' },
  { id: 9, name: '隠者', nameEn: 'The Hermit', keywords: ['内省', '孤独', '知恵'], loveMessage: '一人の時間を大切にする時期。自分を見つめ直すことで、本当に求める愛が見えてきます。', reversedMessage: '孤立しすぎへの警告。周りの人との交流を大切にして。', icon: '🕯️' },
  { id: 10, name: '運命の輪', nameEn: 'Wheel of Fortune', keywords: ['転換点', '運命', 'チャンス'], loveMessage: '恋愛の転換点が訪れています。運命的な出会いや関係の大きな変化が起きやすい時期。', reversedMessage: '変化への抵抗への警告。流れに逆らわず、変化を受け入れて。', icon: '🎡' },
  { id: 11, name: '正義', nameEn: 'Justice', keywords: ['公正', 'バランス', '真実'], loveMessage: '誠実さが報われる時期。正直な気持ちで向き合えば、公正な愛が返ってきます。', reversedMessage: '不誠実さへの警告。隠し事や嘘は関係を壊す原因になります。', icon: '⚖️' },
  { id: 12, name: '吊られた男', nameEn: 'The Hanged Man', keywords: ['待機', '犠牲', '新たな視点'], loveMessage: '今は待つ時期。焦らず相手を信じることで、新しい関係の扉が開きます。', reversedMessage: '無駄な我慢への警告。自分の気持ちも大切にして。', icon: '🌊' },
  { id: 13, name: '死神', nameEn: 'Death', keywords: ['変容', '終わり', '再生'], loveMessage: '古い関係や恋愛パターンの終わりと新しい始まりを示します。変化を恐れないで。', reversedMessage: '変化への強い抵抗。手放すべきものを手放せていない可能性。', icon: '🦋' },
  { id: 14, name: '節制', nameEn: 'Temperance', keywords: ['調和', 'バランス', '癒し'], loveMessage: 'バランスのとれた愛が育まれる時期。穏やかで長続きする恋愛関係が築けます。', reversedMessage: 'アンバランスな関係への警告。お互いの気持ちを確認して。', icon: '🌈' },
  { id: 15, name: '悪魔', nameEn: 'The Devil', keywords: ['執着', '誘惑', '物質'], loveMessage: '強い引き合いや情熱を示すカード。ただし執着や依存には注意が必要です。', reversedMessage: '不健全な執着からの解放のサイン。自由な心を取り戻して。', icon: '🔥' },
  { id: 16, name: '塔', nameEn: 'The Tower', keywords: ['突然の変化', '崩壊', '解放'], loveMessage: '突然の変化が訪れる暗示。ただしそれは新しい真実の愛への道を開くものかもしれません。', reversedMessage: '変化を避けようとしている状態。受け入れることで新しい道が開けます。', icon: '⚡' },
  { id: 17, name: '星', nameEn: 'The Star', keywords: ['希望', '癒し', '未来'], loveMessage: '恋愛に希望の光が差し込んでいます。理想の愛に向かって歩み続けてください。', reversedMessage: '希望を失いかけている状態。あなたの願いはまだ可能性があります。', icon: '⭐' },
  { id: 18, name: '月', nameEn: 'The Moon', keywords: ['幻想', '無意識', '不安'], loveMessage: '直感を信じて。表面に見えないものの中に、真実の愛のサインが隠れています。', reversedMessage: '誤解や思い込みへの警告。現実をしっかり見つめて。', icon: '🌙' },
  { id: 19, name: '太陽', nameEn: 'The Sun', keywords: ['喜び', '成功', '幸福'], loveMessage: '最高の幸運カード。喜びと愛に満ちた恋愛が待っています。すべてがうまくいく時期！', reversedMessage: '過度な自己中心さへの警告。相手への思いやりを忘れずに。', icon: '☀️' },
  { id: 20, name: '審判', nameEn: 'Judgement', keywords: ['覚醒', '再生', '決断'], loveMessage: '重要な決断の時。過去を清算して新しい恋愛に踏み出す覚悟が問われています。', reversedMessage: '優柔不断への警告。決断を先送りにすると好機を逃します。', icon: '🎺' },
  { id: 21, name: '世界', nameEn: 'The World', keywords: ['完成', '達成', '統合'], loveMessage: '恋愛の完成と充実を示す最高のカード。望む愛の形が実現に近づいています。', reversedMessage: '完成を急ぎすぎている状態。プロセスも楽しむことが大切です。', icon: '🌍' },
]

export const POSITIONS = ['過去・背景', '現在の状況', '未来・アドバイス']
