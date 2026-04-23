import Link from 'next/link'

const REVIEWS = [
  { text: '毎朝読むのが習慣になった。当たりすぎて怖い', name: 'S.K さん' },
  { text: '失恋後に登録したら、少し前向きになれた', name: 'A.M さん' },
  { text: '彼からLINEきた！引き寄せ行動やってたから？笑', name: 'Y.T さん' },
]

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center px-4 pb-16">
      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-16 pb-12 max-w-sm">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
          星詠み
        </h1>
        <p className="text-lg leading-relaxed mb-2" style={{ color: 'var(--text-primary)' }}>
          毎朝、あなただけの<br />
          <span style={{ color: 'var(--accent-purple)' }}>今日の恋愛運</span>が届く。
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          AIがあなたの天命を読み解きます。
        </p>

        <Link href="/register" className="btn-primary text-center w-full max-w-xs block">
          7日間 無料で試してみる →
        </Link>
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          ※ 7日後から月額500円（税込）
        </p>
      </section>

      {/* 共感コピー */}
      <section className="card p-6 w-full max-w-sm mb-6">
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent-gold)' }}>
          こんな気持ち、ありませんか？
        </p>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-primary)' }}>
          <li>✔ 好きな人の気持ちが読めなくて不安</li>
          <li>✔ なんとなく今日うまくいく気がしない</li>
          <li>✔ 毎朝、どう動けばいいか迷う</li>
        </ul>
      </section>

      {/* プライバシー訴求 */}
      <section className="card p-6 w-full max-w-sm mb-6">
        <div className="text-3xl text-center mb-3">🔒</div>
        <h2 className="text-center text-sm font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
          名前も住所も不要
        </h2>
        <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
          イニシャルと生年月日だけで、<br />
          あなたの天命を読み解きます。<br />
          個人情報は最小限に。
        </p>
      </section>

      {/* 使い方 */}
      <section className="w-full max-w-sm mb-6">
        <h2 className="text-sm font-bold text-center mb-4" style={{ color: 'var(--accent-gold)' }}>
          使い方はとてもシンプル
        </h2>
        <div className="space-y-3">
          {[
            { step: '①', text: 'イニシャルと生年月日を登録（30秒）' },
            { step: '②', text: '毎朝アプリを開く' },
            { step: '③', text: '今日のあなたへのメッセージを読む' },
          ].map(item => (
            <div key={item.step} className="card p-4 flex items-center gap-3">
              <span className="text-xl" style={{ color: 'var(--accent-gold)' }}>{item.step}</span>
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 口コミ */}
      <section className="w-full max-w-sm mb-8">
        <h2 className="text-sm font-bold text-center mb-4" style={{ color: 'var(--accent-gold)' }}>
          使っている人の声
        </h2>
        <div className="space-y-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="card p-4">
              <p className="text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                「{r.text}」
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center w-full max-w-sm">
        <Link href="/register" className="btn-primary block w-full">
          今すぐ無料で始める →
        </Link>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          月額500円（税込）・7日間は完全無料
        </p>
        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          すでにアカウントをお持ちの方は{' '}
          <Link href="/login" style={{ color: 'var(--accent-gold)' }}>
            ログイン
          </Link>
        </p>
      </section>
    </main>
  )
}
