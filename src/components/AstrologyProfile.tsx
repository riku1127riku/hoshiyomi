'use client'

import { useMemo } from 'react'
import { calcAstrologyResult } from '@/lib/astrology'

interface Props {
  birthDate: string
  today?: Date
}

export default function AstrologyProfile({ birthDate, today = new Date() }: Props) {
  const p = useMemo(() => calcAstrologyResult(birthDate, today), [birthDate])

  const ELEMENT_COLOR: Record<string, string> = {
    '火': '#ef4444', '地': '#a3854b', '風': '#60a5fa', '水': '#818cf8',
  }
  const elemColor = ELEMENT_COLOR[p.zodiacElement] ?? '#c9a84c'

  return (
    <div className="space-y-3">

      {/* 星座 × 九星 × 運命数 */}
      <div className="card-glitter p-5">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-3xl mb-1">{p.zodiacEmoji}</div>
            <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>{p.zodiacName}</p>
            <span style={{ color: elemColor, fontSize: '9px' }}>{p.zodiacElement}のサイン</span>
          </div>
          <div className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-3xl mb-1">{p.nineStarEmoji}</div>
            <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>{p.nineStarName}</p>
            <span style={{ color: '#9b7fcd', fontSize: '9px' }}>九星気学</span>
          </div>
          <div className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent-gold)' }}>{p.lifePathNumber}</div>
            <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>運命数</p>
            <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '9px' }}>数秘術</span>
          </div>
        </div>

        <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>💕 恋愛スタイル</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {p.zodiacLoveStyle}
          </p>
        </div>
      </div>

      {/* 相性 + ラッキー */}
      <div className="card p-4 space-y-3">
        <div>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>相性の良い星座</p>
          <div className="flex flex-wrap gap-1.5">
            {p.compatibleSigns.map(sign => (
              <span key={sign} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--accent-gold)', border: '1px solid rgba(201,168,76,0.2)' }}>
                {sign}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex-1">
            <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>ラッキーカラー</p>
            <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>{p.luckyColor}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>ラッキーアイテム</p>
            <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>{p.luckyItem}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
