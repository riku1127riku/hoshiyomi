'use client'

import { useState, useCallback } from 'react'
import { Sparkles, Star, Moon, Sun, Shuffle, ChevronRight, RotateCcw } from 'lucide-react'
import { MAJOR_ARCANA, POSITIONS, TarotCard } from '@/data/tarot'
import Link from 'next/link'

interface DrawnCard extends TarotCard {
  position: string
  reversed: boolean
  flipped: boolean
}

interface ReadingResult {
  cards: DrawnCard[]
  overall: string
  advice: string
}

function CardBack({ onClick, index }: { onClick: () => void; index: number }) {
  return (
    <button
      onClick={onClick}
      className="relative w-24 h-40 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2"
      style={{
        background: 'linear-gradient(135deg, #1a1a4e, #2d2d8f)',
        border: '2px solid rgba(201,168,76,0.5)',
        boxShadow: '0 0 20px rgba(155,127,205,0.3)',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="absolute inset-2 rounded-lg flex flex-col items-center justify-center gap-1"
        style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
        <Star size={16} color="#c9a84c" className="animate-pulse" />
        <Moon size={12} color="#9b7fcd" />
        <Star size={16} color="#c9a84c" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs"
        style={{ color: 'rgba(201,168,76,0.6)', fontSize: '9px' }}>
        タップして開く
      </div>
    </button>
  )
}

function CardFront({ card }: { card: DrawnCard }) {
  return (
    <div
      className="relative w-24 h-40 rounded-xl animate-fade-in-scale"
      style={{
        background: card.reversed
          ? 'linear-gradient(135deg, #2d1a4e, #4e1a2d)'
          : 'linear-gradient(135deg, #1a2d4e, #1a4e3d)',
        border: `2px solid ${card.reversed ? 'rgba(155,127,205,0.7)' : 'rgba(201,168,76,0.7)'}`,
        boxShadow: `0 0 25px ${card.reversed ? 'rgba(155,127,205,0.4)' : 'rgba(201,168,76,0.4)'}`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
        <div className="text-3xl" style={{ transform: card.reversed ? 'rotate(180deg)' : 'none' }}>
          {card.icon}
        </div>
        <p className="text-center font-bold text-xs mt-1" style={{ color: 'var(--accent-gold)', fontSize: '10px' }}>
          {card.name}
        </p>
        <p className="text-center text-xs" style={{ color: 'var(--text-muted)', fontSize: '8px' }}>
          {card.nameEn}
        </p>
        {card.reversed && (
          <span className="text-xs px-1 rounded" style={{ background: 'rgba(155,127,205,0.3)', color: '#9b7fcd', fontSize: '8px' }}>
            逆位置
          </span>
        )}
      </div>
    </div>
  )
}

export default function TarotClient({ isSubscribed }: { isSubscribed: boolean }) {
  const [phase, setPhase] = useState<'shuffle' | 'draw' | 'question' | 'loading' | 'result'>('shuffle')
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<ReadingResult | null>(null)
  const [error, setError] = useState('')

  const drawCards = useCallback(() => {
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 3).map((card, i) => ({
      ...card,
      position: POSITIONS[i],
      reversed: Math.random() > 0.7,
      flipped: false,
    }))
    setDrawnCards(selected)
    setPhase('draw')
  }, [])

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
          question: question || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult({ ...data, cards: drawnCards })
      setPhase('result')
    } catch {
      setError('鑑定に失敗しました。もう一度お試しください。')
      setPhase('question')
    }
  }

  function reset() {
    setPhase('shuffle')
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
        <div className="text-center mb-8">
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
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            プレミアム鑑定プラン
          </p>
        </div>

        {/* シャッフルフェーズ */}
        {phase === 'shuffle' && (
          <div className="text-center animate-fade-in-up">
            <div className="card-glitter p-8 mb-6">
              <div className="flex justify-center gap-3 mb-6">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-16 h-28 rounded-lg animate-float"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      background: 'linear-gradient(135deg, #1a1a4e, #2d2d8f)',
                      border: '2px solid rgba(201,168,76,0.4)',
                    }}
                  >
                    <div className="h-full flex items-center justify-center">
                      <Star size={20} color="#c9a84c" className="animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                心を静めて、質問を心の中で思い浮かべてください
              </p>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                恋愛についての問いかけを...
              </p>
              <button
                onClick={drawCards}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                <Shuffle size={16} />
                カードを引く
              </button>
            </div>
          </div>
        )}

        {/* カード引くフェーズ */}
        {phase === 'draw' && (
          <div className="animate-fade-in-up">
            <p className="text-center text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              ✨ 3枚のカードをタップして開いてください
            </p>
            <div className="flex justify-center gap-4 mb-6">
              {drawnCards.map((card, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <p className="text-xs text-center" style={{ color: 'var(--accent-gold)', fontSize: '9px' }}>
                    {POSITIONS[i]}
                  </p>
                  {card.flipped
                    ? <CardFront card={card} />
                    : <CardBack onClick={() => flipCard(i)} index={i} />
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
                          {card.position}：{card.name} {card.reversed ? '（逆位置）' : ''}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
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
                カードのメッセージを読み解いています...
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

            {/* 引いたカード */}
            <div className="flex justify-center gap-3 mb-2">
              {drawnCards.map((card, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <p className="text-xs" style={{ color: 'var(--text-muted)', fontSize: '8px' }}>
                    {POSITIONS[i]}
                  </p>
                  <CardFront card={card} />
                </div>
              ))}
            </div>

            {/* 総合鑑定 */}
            <div className="card-glitter p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} color="#c9a84c" />
                <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>
                  総合鑑定
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

            {/* カード個別 */}
            <div className="card p-5">
              <p className="text-xs font-bold mb-3" style={{ color: 'var(--accent-gold)' }}>
                各カードの意味
              </p>
              {drawnCards.map((card, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0"
                  style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                  <span className="text-xl">{card.icon}</span>
                  <div>
                    <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>
                      {card.position}：{card.name} {card.reversed ? '（逆位置）' : ''}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {card.reversed ? card.reversedMessage : card.loveMessage}
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
