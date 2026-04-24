import Link from 'next/link'

const REVIEWS = [
  { text: '毎朝読むのが習慣になった。当たりすぎて怖い', name: 'S.K さん', star: '★★★★★' },
  { text: '失恋後に登録したら、少し前向きになれた', name: 'A.M さん', star: '★★★★★' },
  { text: '彼からLINEきた！引き寄せ行動やってたから？笑', name: 'Y.T さん', star: '★★★★★' },
  { text: 'タロットで背中を押してもらった。やってみてよかった', name: 'R.N さん', star: '★★★★★' },
]

const FEATURES = [
  {
    icon: '💫',
    title: '毎日の恋愛運',
    tag: '無料',
    tagClass: 'lp-badge lp-badge-free',
    desc: '生年月日から導くライフパス数と今日の数字で、あなただけのスコアを毎朝算出。恋愛メッセージ・今日のひとこと・引き寄せ行動が届きます。',
  },
  {
    icon: '🃏',
    title: 'AIタロット鑑定',
    tag: 'サブスク',
    tagClass: 'lp-badge lp-badge-sub',
    desc: '大アルカナ22枚から3枚を引き、過去・現在・未来を読み解きます。恋のテーマを選んで、AIが導く本格リーディングをいつでも。',
  },
  {
    icon: '💑',
    title: '相性占い',
    tag: 'サブスク',
    tagClass: 'lp-badge lp-badge-sub',
    desc: '気になる人やパートナーとの相性を独自アルゴリズムで鑑定。ふたりの縁の深さと、関係を深めるヒントを導きます。',
  },
  {
    icon: '🌟',
    title: '星の設計図',
    tag: '無料',
    tagClass: 'lp-badge lp-badge-free',
    desc: '星座・九星気学・ライフパス数から読み解く、あなただけの恋愛の個性。生まれながらの縁と愛のスタイルを知れます。',
  },
]

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center pb-20 overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section
        className="relative w-full overflow-hidden flex flex-col items-center"
        style={{ minHeight: '94svh' }}
      >
        {/* 君の名は — 大気レイヤー */}
        <div className="lp-aurora-1" aria-hidden="true" />
        <div className="lp-aurora-2" aria-hidden="true" />
        <div className="lp-milky-way" aria-hidden="true" />
        <div className="lp-horizon" aria-hidden="true" />

        {/* コメット */}
        <div
          className="lp-comet"
          aria-hidden="true"
          style={{ top: '18%', left: '5%', width: '90px', animationDuration: '5s', animationDelay: '2s' }}
        />
        <div
          className="lp-comet"
          aria-hidden="true"
          style={{ top: '35%', left: '20%', width: '60px', animationDuration: '6s', animationDelay: '9s' }}
        />

        {/* コンテンツ */}
        <div
          className="flex flex-col items-center text-center px-6 w-full max-w-sm"
          style={{ paddingTop: '3.5rem', position: 'relative', zIndex: 1 }}
        >
          <div className="lp-sparkle-row mb-5">
            <span className="sparkle-icon">✦</span>
            <span className="sparkle-icon">✧</span>
            <span className="sparkle-icon">✦</span>
          </div>

          <div className="animate-float mb-3">
            <h1 className="lp-title">星詠み</h1>
            <p className="lp-title-sub">HOSHIYOMI</p>
          </div>

          <p className="lp-tagline">
            夜空に問いかけた、<br />その想いに答えを。
          </p>

          <p className="lp-desc">
            数秘術・タロット・星座が導く<br />あなただけの恋愛鑑定アプリ
          </p>

          <Link
            href="/register"
            className="btn-primary w-full block animate-pulse-glow"
            style={{ fontSize: '1rem', padding: '1rem 2rem' }}
          >
            ✨ 7日間 無料で始める
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.75rem' }}>
            クレジットカード不要 · 7日後から月額500円
          </p>

          <div className="lp-scroll-hint" style={{ marginTop: '3rem' }}>↓</div>
        </div>
      </section>

      {/* ===== プレビューカード ===== */}
      <section className="px-4 w-full max-w-sm mb-8" style={{ marginTop: '-1rem' }}>
        <p className="text-center text-xs mb-4" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          ── 今日の星詠みイメージ ──
        </p>
        <div className="card-glitter lp-preview-card p-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg">🔯</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>天命スコア</span>
          </div>

          <div className="lp-score-num">
            8<span className="lp-score-denom"> / 10</span>
          </div>

          <p className="text-sm mb-4" style={{ color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
            「恋が動き出す予感」
          </p>

          <div className="lp-message-preview">
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              💕 今日のあなたには、恋を引き寄せる特別な輝きがあります。好きな人との距離が縮まるサインを見逃さないで…
            </p>
          </div>

          <div className="lp-dots mt-3">
            <span className="lp-dot lp-dot-active" />
            <span className="lp-dot" />
            <span className="lp-dot" />
          </div>
        </div>
      </section>

      {/* ===== 共感コピー ===== */}
      <section className="card px-5 py-5 w-full max-w-sm mx-4 mb-8" style={{ marginLeft: '1rem', marginRight: '1rem' }}>
        <p className="text-sm font-bold mb-4 text-center" style={{ color: 'var(--accent-gold)' }}>
          ✨ こんな気持ち、ありませんか？
        </p>
        <ul className="space-y-3 text-sm" style={{ color: 'var(--text-primary)' }}>
          {[
            '好きな人の気持ちが読めなくて不安',
            'なんとなく今日うまくいく気がしない',
            '毎朝、どう動けばいいか迷っている',
            '恋愛の背中をそっと押してほしい',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-gold)', flexShrink: 0 }}>💫</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ===== 機能紹介 ===== */}
      <section className="w-full max-w-sm px-4 mb-8">
        <h2 className="lp-section-title mb-1">星詠みでできること</h2>
        <div className="lp-divider mb-5" />
        <div className="space-y-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="card-glitter p-4 flex items-start gap-4">
              <span
                className="text-3xl animate-float-slow"
                style={{ animationDelay: `${i * 0.45}s`, flexShrink: 0 }}
              >
                {f.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>{f.title}</p>
                  <span className={f.tagClass}>{f.tag}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 使い方 ===== */}
      <section className="w-full max-w-sm px-4 mb-8">
        <h2 className="lp-section-title mb-1">はじめ方</h2>
        <div className="lp-divider mb-5" />
        <div className="space-y-3">
          {[
            { step: '01', icon: '✍️', title: '登録30秒', desc: 'イニシャルと生年月日だけ。名前も住所も不要です。' },
            { step: '02', icon: '🌅', title: '毎朝チェック', desc: '今日のあなただけの恋愛運が毎朝更新されます。' },
            { step: '03', icon: '🃏', title: 'タロットで深掘り', desc: '気になる時はタロットや相性占いでさらに鑑定を。' },
          ].map(item => (
            <div key={item.step} className="lp-step-card">
              <div className="lp-step-num">{item.step}</div>
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 口コミ ===== */}
      <section className="w-full max-w-sm px-4 mb-10">
        <h2 className="lp-section-title mb-1">使っている人の声</h2>
        <div className="lp-divider mb-5" />
        <div className="space-y-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="card-glitter p-4">
              <p className="text-xs mb-2" style={{ color: '#f0c040', letterSpacing: '0.08em' }}>{r.star}</p>
              <p className="text-sm mb-2" style={{ color: 'var(--text-primary)', lineHeight: '1.65' }}>
                「{r.text}」
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 最後のCTA ===== */}
      <section className="w-full max-w-sm px-4 text-center">
        <div className="lp-cta-card">
          <div className="lp-cta-aurora" aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex justify-center gap-3 mb-4">
              <span className="sparkle-icon text-xl">✦</span>
              <span className="sparkle-icon text-xl" style={{ animationDelay: '0.5s' }}>✧</span>
              <span className="sparkle-icon text-xl" style={{ animationDelay: '1s' }}>✦</span>
            </div>
            <p className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>
              あなたの恋愛を、<br />星に問いかけてみませんか。
            </p>
            <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
              7日間は完全無料。いつでも解約できます。
            </p>
            <Link
              href="/register"
              className="btn-primary block w-full animate-pulse-glow"
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              ✨ 今すぐ無料で始める
            </Link>
            <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>月額500円（税込）</p>
            <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
              すでにアカウントをお持ちの方は{' '}
              <Link href="/login" style={{ color: 'var(--accent-gold)' }}>ログイン</Link>
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
