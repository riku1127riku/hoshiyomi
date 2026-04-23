'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Sun, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SAMPLE_CARDS = [
  { name: '太陽', nameEn: 'The Sun', icon: '☀️', position: '過去・背景', reversed: false, message: '喜びと自信に満ちたエネルギーがあなたの恋愛を後押しします。過去の経験が今の輝きの源。' },
  { name: '恋人', nameEn: 'The Lovers', icon: '💕', position: '現在の状況', reversed: false, message: '本物の愛の選択の時。心が動いている相手がいるなら、今がそのサインに気づくタイミング。' },
  { name: '星', nameEn: 'The Star', icon: '⭐', position: '未来・アドバイス', reversed: false, message: '希望の光が恋愛に差し込んでいます。あなたの願いは叶う可能性に満ちています。' },
]

const SAMPLE_FORTUNE = {
  score: 8,
  label: '恋が動き出す予感',
  message: '今日のあなたには、恋を引き寄せる特別な輝きがあります。数秘術が示す「8」という数字は、強い引力と豊かさを象徴。好きな人との距離が縮まったり、素敵な出会いが訪れる予感。素直な気持ちで一歩踏み出してみて。',
  word: '「今日の私は特別」と声に出してみて',
  action: 'いつもより少しだけオシャレして出かける',
}

const SAMPLE_READING = '太陽が過去に輝いていたように、あなたは元々恋愛において豊かなエネルギーを持つ人。現在の恋人のカードは、心が動いている相手との本質的な繋がりを示しています。そして星が指す未来は、希望に満ちた愛の実現。今日の数秘術スコア「8/10」とも呼応するように、あなたの恋愛運は上昇気流に乗っています。勇気を出して想いを届けてみてください。宇宙があなたの愛を応援しています。'

const SAMPLE_ADVICE = '今日、好きな人に「最近どう？」と一言メッセージを送ってみて。星のカードがその一歩を祝福しています。'

const IMAGE_URL = 'https://image.pollinations.ai/prompt/mystical%20fantasy%20tarot%20reading%20art%2C%20The%20Sun%20and%20The%20Lovers%20and%20The%20Star%20tarot%20cards%2C%20starry%20cosmic%20sky%2C%20golden%20magical%20light%2C%20crescent%20moon%2C%20ethereal%20sparkles%2C%20purple%20and%20gold%20color%20palette%2C%20cinematic%20fantasy%20illustration%2C%20beautiful%2C%20no%20text?width=512&height=512&nologo=true&seed=42'

export default function DemoPage() {
  const [score, setScore] = useState(0)
  const [flipped, setFlipped] = useState([false, false, false])
  const [showReading, setShowReading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // スコアカウントアップ
    const timer = setTimeout(() => {
      let current = 0
      const interval = setInterval(() => {
        current++
        setScore(current)
        if (current >= 8) clearInterval(interval)
      }, 120)
    }, 400)

    // カードを順番にフリップ
    const t1 = setTimeout(() => setFlipped([true, false, false]), 900)
    const t2 = setTimeout(() => setFlipped([true, true, false]), 1500)
    const t3 = setTimeout(() => setFlipped([true, true, true]), 2100)
    const t4 = setTimeout(() => setShowReading(true), 2600)

    return () => { clearTimeout(timer); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh' }}>
      {/* デモバナー */}
      <div className="sticky top-0 z-20 text-center py-2 text-xs font-bold"
        style={{ background: 'linear-gradient(90deg, #9b7fcd, #c9a84c)', color: '#0a0a1a' }}>
        ✨ デモ体験 — 実際の鑑定結果サンプルです ✨
      </div>

      <main className="flex flex-col items-center px-4 py-6 max-w-sm mx-auto">

        {/* ブランド */}
        <div className="text-center mb-6">
          <div className="flex justify-center gap-2 mb-2">
            <span className="text-xl" style={{ animation: 'pulse 2s infinite' }}>✨</span>
            <span className="text-2xl">🔮</span>
            <span className="text-xl" style={{ animation: 'pulse 2s infinite' }}>✨</span>
          </div>
          <h1 className="text-3xl font-bold mb-0.5" style={{
            background: 'linear-gradient(135deg, #f0d080, #c9a84c, #9b7fcd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>星詠み</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>プレミアム鑑定プラン</p>
        </div>

        {/* 今日の星詠み */}
        <div className="w-full rounded-2xl p-5 mb-4 animate-fade-in-up"
          style={{ background: 'rgba(26,26,78,0.8)', border: '1px solid rgba(201,168,76,0.3)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔯</span>
            <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>今日の星詠み</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--accent-gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
              S.K さん
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="text-5xl font-bold" style={{
              background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {score}
              <span className="text-xl" style={{ color: 'rgba(255,255,255,0.25)', WebkitTextFillColor: 'rgba(255,255,255,0.25)' }}>/10</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold mb-1.5" style={{ color: 'var(--accent-gold)' }}>{SAMPLE_FORTUNE.label}</p>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300"
                    style={{ background: i < score ? '#c9a84c' : 'rgba(255,255,255,0.1)' }} />
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-primary)' }}>
            💕 {SAMPLE_FORTUNE.message}
          </p>
          <div className="space-y-1 pt-2" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              ✨ 今日のひとこと：<span style={{ color: 'var(--text-primary)' }}>{SAMPLE_FORTUNE.word}</span>
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              🌟 引き寄せ行動：<span style={{ color: 'var(--text-primary)' }}>{SAMPLE_FORTUNE.action}</span>
            </p>
          </div>
        </div>

        {/* タロット 3枚 */}
        <div className="w-full mb-4">
          <p className="text-center text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
            ✦ タロット鑑定（3枚引き）
          </p>
          <div className="flex justify-center gap-3">
            {SAMPLE_CARDS.map((card, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <p className="text-center" style={{ color: 'var(--accent-gold)', fontSize: '8px' }}>
                  {card.position}
                </p>
                <div className="relative rounded-xl overflow-hidden transition-all duration-700"
                  style={{
                    width: 90,
                    height: 144,
                    background: flipped[i]
                      ? 'linear-gradient(135deg, #1a2d4e, #1a4e3d)'
                      : 'linear-gradient(135deg, #1a1a4e, #2d2d8f)',
                    border: `2px solid ${flipped[i] ? 'rgba(201,168,76,0.8)' : 'rgba(201,168,76,0.25)'}`,
                    boxShadow: flipped[i] ? '0 0 24px rgba(201,168,76,0.4)' : 'none',
                    transform: flipped[i] ? 'none' : 'rotateY(180deg)',
                  }}>
                  {flipped[i] ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-1">
                      <div className="text-3xl">{card.icon}</div>
                      <p className="text-center font-bold" style={{ color: 'var(--accent-gold)', fontSize: '10px' }}>
                        {card.name}
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '8px' }}>{card.nameEn}</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star size={20} color="#c9a84c" style={{ opacity: 0.5 }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 生成画像 */}
        <div className="w-full rounded-2xl overflow-hidden mb-4"
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
          {!imageLoaded && (
            <div className="w-full h-52 flex items-center justify-center"
              style={{ background: 'rgba(26,26,78,0.8)' }}>
              <div className="text-center">
                <span className="text-3xl block mb-2">🔮</span>
                <p className="text-xs" style={{ color: 'var(--accent-gold)', opacity: 0.7 }}>
                  AI鑑定画像を生成中...
                </p>
              </div>
            </div>
          )}
          <img
            src={IMAGE_URL}
            alt="タロット鑑定画像"
            className="w-full object-cover"
            style={{ display: imageLoaded ? 'block' : 'none', maxHeight: '260px' }}
            onLoad={() => setImageLoaded(true)}
          />
          {imageLoaded && (
            <div className="px-4 py-2.5 flex gap-2"
              style={{ background: 'rgba(26,26,78,0.8)' }}>
              <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold"
                style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--accent-gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
                💾 画像を保存
              </div>
              <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold"
                style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }}>
                𝕏 シェア
              </div>
            </div>
          )}
        </div>

        {/* 総合鑑定 */}
        {showReading && (
          <div className="w-full space-y-3 mb-6 animate-fade-in-up">
            <div className="rounded-2xl p-5"
              style={{ background: 'rgba(26,26,78,0.8)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} color="#c9a84c" />
                <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>タロット総合鑑定</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{SAMPLE_READING}</p>
            </div>

            <div className="rounded-2xl p-5"
              style={{ background: 'rgba(10,10,26,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Sun size={15} color="#c9a84c" />
                <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>今日のアドバイス</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>🪄 {SAMPLE_ADVICE}</p>
            </div>

            {/* カード個別 */}
            <div className="rounded-2xl p-5"
              style={{ background: 'rgba(10,10,26,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs font-bold mb-3" style={{ color: 'var(--accent-gold)' }}>✦ 各カードのメッセージ</p>
              {SAMPLE_CARDS.map((card, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b last:border-b-0"
                  style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
                  <span className="text-xl mt-0.5">{card.icon}</span>
                  <div>
                    <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--accent-gold)' }}>
                      {card.position}：{card.name}
                      <span className="ml-1 font-normal" style={{ color: 'rgba(201,168,76,0.5)' }}>（正位置）</span>
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>{card.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="w-full text-center space-y-3 pb-8">
          <div className="flex justify-center gap-2 mb-2">
            <span className="text-lg">⭐</span>
            <span className="text-lg">✨</span>
            <span className="text-lg">⭐</span>
          </div>
          <Link href="/register"
            className="btn-primary flex items-center justify-center gap-2 w-full text-base py-4 animate-pulse-glow">
            <Sparkles size={18} />
            7日間 無料で始める
            <ChevronRight size={18} />
          </Link>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            クレジットカード不要・7日後から月額500円
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            すでにアカウントをお持ちの方は{' '}
            <Link href="/login" style={{ color: 'var(--accent-gold)' }}>ログイン</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
