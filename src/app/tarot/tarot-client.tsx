'use client'

import { useState } from 'react'
import { Sparkles, Star, Moon, Sun, ChevronRight, RotateCcw, Check } from 'lucide-react'
import { MAJOR_ARCANA, POSITIONS, TarotCard } from '@/data/tarot'
import Link from 'next/link'

interface DrawnCard extends TarotCard {
  position: string
  reversed: boolean
  flipped: boolean
}

interface ReadingResult {
  overall: string
  advice: string
  cardReadings?: string[]
}

interface FortuneData {
  score: number
  scoreLabel: string
  loveMessage: string
  todaysWord: string
  luckyAction: string
}

function SelectCard({
  selected, disabled, onClick,
}: {
  selected: boolean; disabled: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className="relative rounded-xl transition-all duration-200"
      style={{
        width: 72,
        height: 108,
        background: selected
          ? 'linear-gradient(135deg, #3a3a18, #4e4e28)'
          : 'linear-gradient(135deg, #1a1a4e, #2d2d8f)',
        border: `2px solid ${selected ? '#c9a84c' : 'rgba(201,168,76,0.25)'}`,
        boxShadow: selected ? '0 0 18px rgba(201,168,76,0.6)' : 'none',
        transform: selected ? 'scale(1.08) translateY(-4px)' : 'none',
        opacity: disabled && !selected ? 0.45 : 1,
        cursor: disabled && !selected ? 'not-allowed' : 'pointer',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        {selected
          ? <Check size={18} color="#c9a84c" />
          : <Moon size={13} color="#9b7fcd" style={{ opacity: 0.5 }} />
        }
      </div>
    </button>
  )
}

function CardBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2"
      style={{
        width: 108,
        height: 172,
        background: 'linear-gradient(135deg, #1a1a4e, #2d2d8f)',
        border: '2px solid rgba(201,168,76,0.5)',
        boxShadow: '0 0 24px rgba(155,127,205,0.4)',
      }}
    >
      <div className="absolute inset-2 rounded-lg flex flex-col items-center justify-center gap-2"
        style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
        <Star size={22} color="#c9a84c" className="animate-pulse" />
        <Moon size={15} color="#9b7fcd" />
        <Star size={22} color="#c9a84c" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center"
        style={{ color: 'rgba(201,168,76,0.7)', fontSize: '10px' }}>
        タップして開く
      </div>
    </button>
  )
}

function CardFront({ card, size = 'large' }: { card: DrawnCard; size?: 'large' | 'small' }) {
  const w = size === 'large' ? 108 : 88
  const h = size === 'large' ? 172 : 140
  const iconSize = size === 'large' ? 'text-4xl' : 'text-3xl'
  const nameSize = size === 'large' ? '12px' : '10px'

  return (
    <div
      className="relative rounded-xl animate-fade-in-scale"
      style={{
        width: w,
        height: h,
        background: card.reversed
          ? 'linear-gradient(135deg, #2d1a4e, #4e1a2d)'
          : 'linear-gradient(135deg, #1a2d4e, #1a4e3d)',
        border: `2px solid ${card.reversed ? 'rgba(155,127,205,0.8)' : 'rgba(201,168,76,0.8)'}`,
        boxShadow: `0 0 28px ${card.reversed ? 'rgba(155,127,205,0.5)' : 'rgba(201,168,76,0.5)'}`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
        <div className={iconSize} style={{ transform: card.reversed ? 'rotate(180deg)' : 'none' }}>
          {card.icon}
        </div>
        <p className="text-center font-bold mt-1" style={{ color: 'var(--accent-gold)', fontSize: nameSize }}>
          {card.name}
        </p>
        <p className="text-center" style={{ color: 'var(--text-muted)', fontSize: '9px' }}>
          {card.nameEn}
        </p>
        {card.reversed && (
          <span className="px-2 py-0.5 rounded-full mt-1"
            style={{ background: 'rgba(155,127,205,0.3)', color: '#9b7fcd', fontSize: '9px' }}>
            逆位置
          </span>
        )}
      </div>
    </div>
  )
}

export default function TarotClient({
  isSubscribed,
  fortune,
}: {
  isSubscribed: boolean
  fortune: FortuneData | null
}) {
  const [phase, setPhase] = useState<'select' | 'reveal' | 'question' | 'loading' | 'result'>('select')
  const [shuffledCards] = useState(() => [...MAJOR_ARCANA].sort(() => Math.random() - 0.5))
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<ReadingResult | null>(null)
  const [error, setError] = useState('')

  const toggleSelect = (index: number) => {
    setSelectedIndices(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index)
      if (prev.length >= 3) return prev
      return [...prev, index]
    })
  }

  const confirmSelection = () => {
    const selected = selectedIndices.map((idx, i) => ({
      ...shuffledCards[idx],
      position: POSITIONS[i],
      reversed: Math.random() > 0.7,
      flipped: false,
    }))
    setDrawnCards(selected)
    setPhase('reveal')
  }

  const flipCard = (index: number) => {
    setDrawnCards(prev => {
      const next = [...prev]
      next[index] = { ...next[index], flipped: true }
      return next
    })
  }

  const allFlipped = drawnCards.length === 3 && drawnCards.every(c => c.flipped)

  async function handleReading() {
    setPhase('loading')
    setError('')
    try {
      const res = await fetch('/api/tarot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardIds: drawnCards.map(c => c.id),
          reversals: drawnCards.map(c => c.reversed),
          question: question || null,
          fortuneScore: fortune?.score ?? null,
          fortuneLabel: fortune?.scoreLabel ?? null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      setPhase('result')
    } catch {
      setError('鑑定に失敗しました。もう一度お試しください。')
      setPhase('question')
    }
  }

  function reset() {
    setPhase('select')
    setSelectedIndices([])
    setDrawnCards([])
    setQuestion('')
    setResult(null)
    setError('')
  }

  if (!isSubscribed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4 animate-float">🔮</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
            プレミアム鑑定プラン限定
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            タロット鑑定はプレミアム会員限定の機能です。<br />
            月額500円でご利用いただけます。
          </p>
          <Link href="/api/stripe/checkout" className="btn-primary inline-block">
            月額500円で始める
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center px-4 py-8 min-h-screen">
      <div className="w-full max-w-sm">

        {/* ヘッダー */}
        <div className="text-center mb-6">
          <div className="flex justify-center gap-2 mb-3">
            <span className="sparkle-icon text-xl">✨</span>
            <span className="sparkle-icon text-xl">🔮</span>
            <span className="sparkle-icon text-xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{
            background: 'linear-gradient(135deg, #f0d080, #c9a84c, #9b7fcd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            タロット鑑定
          </h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>プレミアム鑑定プラン</p>
        </div>

        {/* カード選択フェーズ */}
        {phase === 'select' && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-4">
              <p className="text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                心を静めて、気になるカードを3枚選んでください
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                恋愛についての問いかけを心の中で思い浮かべながら…
              </p>
              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      background: i < selectedIndices.length ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${i < selectedIndices.length ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.1)'}`,
                      color: i < selectedIndices.length ? 'var(--accent-gold)' : 'var(--text-muted)',
                    }}
                  >
                    {i < selectedIndices.length ? '✓' : i + 1}
                  </div>
                ))}
                <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
                  {selectedIndices.length}/3 枚選択
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-5">
              {shuffledCards.map((card, i) => (
                <div key={card.id} className="flex justify-center">
                  <SelectCard
                    selected={selectedIndices.includes(i)}
                    disabled={selectedIndices.length >= 3}
                    onClick={() => toggleSelect(i)}
                  />
                </div>
              ))}
            </div>

            {selectedIndices.length === 3 && (
              <div className="animate-fade-in-up">
                <button
                  onClick={confirmSelection}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  カードを開く
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* カードを開くフェーズ */}
        {phase === 'reveal' && (
          <div className="animate-fade-in-up">
            <p className="text-center text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              ✨ 3枚のカードをタップして開いてください
            </p>
            <div className="flex justify-center gap-3 mb-6">
              {drawnCards.map((card, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <p className="text-center" style={{ color: 'var(--accent-gold)', fontSize: '9px' }}>
                    {POSITIONS[i]}
                  </p>
                  {card.flipped
                    ? <CardFront card={card} />
                    : <CardBack onClick={() => flipCard(i)} />
                  }
                </div>
              ))}
            </div>

            {allFlipped && (
              <div className="animate-fade-in-up">
                <div className="card p-4 mb-4">
                  {drawnCards.map((card, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0"
                      style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                      <span className="text-lg">{card.icon}</span>
                      <div>
                        <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>
                          {card.position}：{card.name} {card.reversed ? '（逆位置）' : '（正位置）'}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {card.reversed ? card.reversedMessage : card.loveMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setPhase('question')}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  AI鑑定を受ける
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 質問フェーズ */}
        {phase === 'question' && (
          <div className="animate-fade-in-up">
            <div className="card-glitter p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} color="#c9a84c" />
                <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>
                  AIへの質問（任意）
                </p>
              </div>
              <textarea
                className="input text-sm"
                rows={3}
                placeholder="例：彼との関係はどうなりますか？&#10;例：新しい出会いはありますか？"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                style={{ resize: 'none' }}
              />
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                ※ 空白でも総合鑑定を行います
              </p>
            </div>
            {error && <p className="text-sm text-red-400 text-center mb-4">{error}</p>}
            <button
              onClick={handleReading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Moon size={16} />
              鑑定スタート
            </button>
          </div>
        )}

        {/* ローディング */}
        {phase === 'loading' && (
          <div className="text-center animate-fade-in-up">
            <div className="card-glitter p-10">
              <div className="flex justify-center gap-3 mb-6">
                <span className="sparkle-icon text-4xl">✨</span>
                <span className="sparkle-icon text-4xl">🔮</span>
                <span className="sparkle-icon text-4xl">✨</span>
              </div>
              <p className="text-sm animate-pulse" style={{ color: 'var(--accent-gold)' }}>
                カードと星のメッセージを読み解いています...
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                しばらくお待ちください
              </p>
            </div>
          </div>
        )}

        {/* 結果フェーズ */}
        {phase === 'result' && result && (
          <div className="space-y-4 animate-fade-in-up">

            {/* 今日の星詠み */}
            {fortune && (
              <div className="card-glitter p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🔯</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>
                    今日の星詠み
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-4xl font-bold" style={{
                    background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {fortune.score}
                    <span className="text-base" style={{ color: 'rgba(255,255,255,0.3)', WebkitTextFillColor: 'rgba(255,255,255,0.3)' }}>
                      /10
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold mb-1" style={{ color: 'var(--accent-gold)' }}>
                      {fortune.scoreLabel}
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="h-1.5 flex-1 rounded-full"
                          style={{ background: i < fortune.score ? '#c9a84c' : 'rgba(255,255,255,0.1)' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-primary)' }}>
                  💕 {fortune.loveMessage}
                </p>
                <div className="space-y-1 pt-2" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    ✨ 今日のひとこと：<span style={{ color: 'var(--text-primary)' }}>{fortune.todaysWord}</span>
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    🌟 引き寄せ行動：<span style={{ color: 'var(--text-primary)' }}>{fortune.luckyAction}</span>
                  </p>
                </div>
              </div>
            )}

            {/* 引いたカード */}
            <div className="flex justify-center gap-3">
              {drawnCards.map((card, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <p className="text-center" style={{ color: 'var(--text-muted)', fontSize: '8px' }}>
                    {POSITIONS[i]}
                  </p>
                  <CardFront card={card} size="small" />
                </div>
              ))}
            </div>

            {/* タロット総合鑑定 */}
            <div className="card-glitter p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} color="#c9a84c" />
                <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>
                  タロット総合鑑定
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {result.overall}
              </p>
            </div>

            {/* アドバイス */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sun size={16} color="#c9a84c" />
                <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>
                  今日のアドバイス
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                🪄 {result.advice}
              </p>
            </div>

            {/* カード個別解説 */}
            <div className="card p-5">
              <p className="text-xs font-bold mb-3" style={{ color: 'var(--accent-gold)' }}>
                ✦ 各カードのメッセージ
              </p>
              {drawnCards.map((card, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b last:border-b-0"
                  style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                  <span className="text-2xl mt-0.5">{card.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold mb-1" style={{ color: 'var(--accent-gold)' }}>
                      {card.position}：{card.name}
                      <span className="ml-1 font-normal"
                        style={{ color: card.reversed ? '#9b7fcd' : 'rgba(201,168,76,0.6)' }}>
                        {card.reversed ? '（逆位置）' : '（正位置）'}
                      </span>
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {result.cardReadings?.[i] || (card.reversed ? card.reversedMessage : card.loveMessage)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm transition-opacity hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <RotateCcw size={14} />
              もう一度引く
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
