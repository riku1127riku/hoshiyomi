'use client'

import { useState } from 'react'
import { Heart, Sparkles, ChevronRight, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface CardInfo {
  id: number; name: string; icon: string; nameEn: string; loveMessage: string
}

interface CompatData {
  score: number
  label: string
  userLifeNum: number
  partnerLifeNum: number
  userCard: CardInfo
  partnerCard: CardInfo
}

function ScoreRing({ score }: { score: number }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 90 ? '#f0d080' : score >= 80 ? '#c9a84c' : score >= 70 ? '#9b7fcd' : '#8888aa'

  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <svg width="140" height="140" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="text-center z-10">
        <div className="text-4xl font-bold" style={{
          background: `linear-gradient(135deg, ${color}, #fff)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>{score}</div>
        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>/ 100</div>
      </div>
    </div>
  )
}

export default function CompatibilityClient({ isSubscribed }: { isSubscribed: boolean }) {
  const [phase, setPhase] = useState<'input' | 'loading' | 'result'>('input')
  const [partnerInitials, setPartnerInitials] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [compatData, setCompatData] = useState<CompatData | null>(null)
  const [reading, setReading] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!partnerInitials.trim() || !partnerBirthDate) {
      setError('イニシャルと生年月日を入力してください')
      return
    }
    setPhase('loading')
    setError('')

    try {
      const res = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerInitials: partnerInitials.trim(), partnerBirthDate }),
      })
      if (!res.ok) throw new Error()

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let metaParsed = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        if (!metaParsed) {
          const idx = buffer.indexOf('\n')
          if (idx !== -1) {
            setCompatData(JSON.parse(buffer.slice(0, idx)))
            setPhase('result')
            buffer = buffer.slice(idx + 1)
            metaParsed = true
          }
        } else {
          setReading(prev => prev + buffer)
          buffer = ''
        }
      }
    } catch {
      setError('鑑定に失敗しました。もう一度お試しください。')
      setPhase('input')
    }
  }

  function reset() {
    setPhase('input')
    setPartnerInitials('')
    setPartnerBirthDate('')
    setCompatData(null)
    setReading('')
    setError('')
  }

  if (!isSubscribed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4 animate-float">💕</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>プレミアム鑑定プラン限定</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            相性占いはプレミアム会員限定の機能です。<br />月額500円でご利用いただけます。
          </p>
          <Link href="/api/stripe/checkout" className="btn-primary inline-block">月額500円で始める</Link>
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
            <span className="sparkle-icon text-xl">💕</span>
            <span className="sparkle-icon text-xl">✨</span>
            <span className="sparkle-icon text-xl">💕</span>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{
            background: 'linear-gradient(135deg, #f0d080, #c9a84c, #9b7fcd)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>相性占い</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>数秘術×タロットで2人の縁を読む</p>
        </div>

        {/* 入力フェーズ */}
        {phase === 'input' && (
          <div className="animate-fade-in-up space-y-4">
            <div className="card-glitter p-5">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={16} color="#c9a84c" />
                <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>相手の情報を入力</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                    相手のイニシャル
                  </label>
                  <input
                    className="input text-sm w-full"
                    placeholder="例：T.K"
                    value={partnerInitials}
                    onChange={e => setPartnerInitials(e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                    相手の生年月日
                  </label>
                  <input
                    type="date"
                    className="input text-sm w-full"
                    value={partnerBirthDate}
                    onChange={e => setPartnerBirthDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                ※ 生年月日から数秘術で相性を算出します
              </p>
            </div>

            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              相性を占う
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ローディング */}
        {phase === 'loading' && (
          <div className="text-center animate-fade-in-up">
            <div className="card-glitter p-10">
              <div className="flex justify-center gap-3 mb-6">
                <span className="sparkle-icon text-4xl">💕</span>
                <span className="sparkle-icon text-4xl">✨</span>
                <span className="sparkle-icon text-4xl">💕</span>
              </div>
              <p className="text-sm animate-pulse" style={{ color: 'var(--accent-gold)' }}>
                2人の運命の糸を読み解いています...
              </p>
            </div>
          </div>
        )}

        {/* 結果フェーズ */}
        {phase === 'result' && compatData && (
          <div className="space-y-4 animate-fade-in-up">

            {/* 相性スコア */}
            <div className="card-glitter p-6 text-center">
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                あなた × {partnerInitials}さん の相性
              </p>
              <div className="flex justify-center mb-3">
                <ScoreRing score={compatData.score} />
              </div>
              <p className="text-lg font-bold mb-1" style={{ color: 'var(--accent-gold)' }}>
                {compatData.label}
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--accent-gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
                  あなた：{compatData.userLifeNum}番
                </span>
                <span style={{ color: 'var(--text-muted)' }}>×</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(155,127,205,0.15)', color: '#9b7fcd', border: '1px solid rgba(155,127,205,0.3)' }}>
                  {partnerInitials}：{compatData.partnerLifeNum}番
                </span>
              </div>
            </div>

            {/* 2人のカード */}
            <div className="card p-5">
              <p className="text-xs font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
                ✦ 2人を象徴するタロット
              </p>
              <div className="flex gap-4 justify-center">
                {[
                  { card: compatData.userCard, label: 'あなた', color: 'rgba(201,168,76,0.8)' },
                  { card: compatData.partnerCard, label: `${partnerInitials}さん`, color: 'rgba(155,127,205,0.8)' },
                ].map(({ card, label, color }) => (
                  <div key={card.id} className="flex flex-col items-center gap-2 flex-1">
                    <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <div className="relative rounded-xl w-full"
                      style={{
                        height: 140,
                        background: 'linear-gradient(135deg, #1a2d4e, #1a4e3d)',
                        border: `2px solid ${color}`,
                        boxShadow: `0 0 20px ${color.replace('0.8', '0.3')}`,
                      }}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
                        <div className="text-4xl">{card.icon}</div>
                        <p className="text-center font-bold" style={{ color: 'var(--accent-gold)', fontSize: '11px' }}>{card.name}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '9px' }}>{card.nameEn}</p>
                      </div>
                    </div>
                    <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {card.loveMessage.slice(0, 30)}…
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI鑑定文 */}
            <div className="card-glitter p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} color="#c9a84c" />
                <span className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>相性鑑定</span>
              </div>
              {reading ? (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{reading}</p>
              ) : (
                <p className="text-sm animate-pulse" style={{ color: 'var(--text-muted)' }}>鑑定中...</p>
              )}
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <RotateCcw size={14} />
              別の人を占う
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
