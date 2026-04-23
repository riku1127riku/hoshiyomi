import Link from 'next/link'

const REVIEWS = [
  { text: '毎朝読むのが習慣になった。当たりすぎて怖い', name: 'S.K さん', star: '⭐⭐⭐⭐⭐' },
  { text: '失恋後に登録したら、少し前向きになれた', name: 'A.M さん', star: '⭐⭐⭐⭐⭐' },
  { text: '彼からLINEきた！引き寄せ行動やってたから？笑', name: 'Y.T さん', star: '⭐⭐⭐⭐⭐' },
]

const FEATURES = [
  { icon: '💫', title: '数秘術で算出', desc: '生年月日から導き出したライフパス数と今日の数字で、あなただけのスコアを計算' },
  { icon: '💕', title: '恋愛に特化', desc: '恋愛メッセージ・今日のひとこと・引き寄せ行動の3つでその日を導きます' },
  { icon: '🔒', title: 'イニシャルだけでOK', desc: '名前も住所も不要。イニシャルと生年月日だけで個人情報は最小限に' },
]

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center px-4 pb-16 overflow-hidden">

      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-14 pb-12 max-w-sm w-full">
        <div className="flex justify-center gap-2 mb-5">
          <span className="sparkle-icon text-2xl">✨</span>
          <span className="sparkle-icon text-2xl">⭐</span>
          <span className="sparkle-icon text-2xl">✨</span>
          <span className="sparkle-icon text-2xl">⭐</span>
          <span className="sparkle-icon text-2xl">✨</span>
        </div>

        <div className="animate-float mb-2">
          <div
            className="text-7xl font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #f0d080, #c9a84c, #9b7fcd, #c9a84c, #f0d080)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
            }}
          >
            星詠み
          </div>
        </div>

        <p className="text-base leading-relaxed mb-1 mt-3" style={{ color: 'var(--text-primary)' }}>
          毎朝、あなただけの
        </p>
        <p className="text-xl font-bold mb-1" style={{
          background: 'linear-gradient(90deg, #c9a84c, #9b7fcd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          今日の恋愛運 ✨
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          数秘術×AIがあなたの天命を読み解きます
        </p>

        <Link
          href="/register"
          className="btn-primary text-center w-full max-w-xs block animate-pulse-glow"
        >
          ✨ 7日間 無料で試してみる
        </Link>
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          クレジットカード不要・7日後から月額500円
        </p>
      </section>

      {/* スコアプレビュー */}
      <section className="card-glitter p-6 w-full max-w-sm mb-6 text-center">
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>今日の運勢イメージ</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-xl">🔯</span>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>今日の運勢</span>
        </div>
        <div className="text-6xl font-bold mb-1" style={{
          background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          8<span className="text-2xl" style={{ color: 'rgba(255,255,255,0.3)', WebkitTextFillColor: 'rgba(255,255,255,0.3)' }}> / 10</span>
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--accent-gold)' }}>「恋が動き出す予感」</p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          💕 今日のあなたには恋を引き寄せる特別な輝きが...
        </p>
      </section>

      {/* 共感コピー */}
      <section className="card p-6 w-full max-w-sm mb-6">
        <p className="text-sm font-bold mb-3 text-center" style={{ color: 'var(--accent-gold)' }}>
          ✨ こんな気持ち、ありませんか？
        </p>
        <ul className="space-y-3 text-sm" style={{ color: 'var(--text-primary)' }}>
          <li className="flex items-center gap-2">
            <span style={{ color: 'var(--accent-gold)' }}>💫</span>
            好きな人の気持ちが読めなくて不安
          </li>
          <li className="flex items-center gap-2">
            <span style={{ color: 'var(--accent-gold)' }}>💫</span>
            なんとなく今日うまくいく気がしない
          </li>
          <li className="flex items-center gap-2">
            <span style={{ color: 'var(--accent-gold)' }}>💫</span>
            毎朝、どう動けばいいか迷う
          </li>
        </ul>
      </section>

      {/* 特徴 */}
      <section className="w-full max-w-sm mb-6">
        <h2 className="text-sm font-bold text-center mb-4" style={{ color: 'var(--accent-gold)' }}>
          ✨ 星詠みの3つの特徴
        </h2>
        <div className="space-y-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="card-glitter p-4 flex items-start gap-4">
              <span className="text-3xl animate-float-slow" style={{ animationDelay: `${i * 0.5}s` }}>
                {f.icon}
              </span>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--accent-gold)' }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 使い方 */}
      <section className="w-full max-w-sm mb-6">
        <h2 className="text-sm font-bold text-center mb-4" style={{ color: 'var(--accent-gold)' }}>
          使い方はとてもシンプル
        </h2>
        <div className="space-y-3">
          {[
            { step: '①', icon: '✍️', text: 'イニシャルと生年月日を登録（30秒）' },
            { step: '②', icon: '🌅', text: '毎朝アプリを開く' },
            { step: '③', icon: '💌', text: '今日のあなただけのメッセージを読む' },
          ].map(item => (
            <div key={item.step} className="card p-4 flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="text-xs" style={{ color: 'var(--accent-gold)' }}>{item.step}</span>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 口コミ */}
      <section className="w-full max-w-sm mb-8">
        <h2 className="text-sm font-bold text-center mb-4" style={{ color: 'var(--accent-gold)' }}>
          💬 使っている人の声
        </h2>
        <div className="space-y-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="card-glitter p-4">
              <p className="text-xs mb-1">{r.star}</p>
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
        <div className="flex justify-center gap-2 mb-4">
          <span className="sparkle-icon text-xl">⭐</span>
          <span className="sparkle-icon text-xl">✨</span>
          <span className="sparkle-icon text-xl">⭐</span>
        </div>
        <Link href="/register" className="btn-primary block w-full text-lg py-4">
          ✨ 今すぐ無料で始める
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
