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

      {/* メインカード：星座 × 九星 */}
      <div className="card-glitter p-5">
        <p className="text-xs font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
          ✦ あなたの星の設計図
        </p>
        <div className="flex gap-3">

          {/* 星座 */}
          <div className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-3xl mb-1">{p.zodiacEmoji}</div>
            <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--accent-gold)' }}>{p.zodiacName}</p>
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: `${elemColor}22`, color: elemColor, fontSize: '9px' }}>
              {p.zodiacElement}のサイン
            </span>
          </div>

          {/* 九星 */}
          <div className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-3xl mb-1">{p.nineStarEmoji}</div>
            <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--accent-gold)' }}>{p.nineStarName}</p>
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(155,127,205,0.2)', color: '#9b7fcd', fontSize: '9px' }}>
              九星気学
            </span>
          </div>

          {/* 運命数 */}
          <div className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent-gold)' }}>
              {p.lifePathNumber}
            </div>
            <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--accent-gold)' }}>運命数</p>
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(201,168,76,0.15)', color: 'rgba(201,168,76,0.8)', fontSize: '9px' }}>
              数秘術
            </span>
          </div>
        </div>

        {/* 恋愛スタイル */}
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>💕 あなたの恋愛スタイル</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {p.zodiacLoveStyle}
          </p>
        </div>
      </div>

      {/* 今年・今月のサイクル */}
      <div className="card p-5">
        <p className="text-xs font-bold mb-3" style={{ color: 'var(--accent-gold)' }}>
          ✦ 今のサイクル
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 rounded-xl"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <div className="text-center" style={{ minWidth: 36 }}>
              <div className="text-xl font-bold" style={{ color: 'var(--accent-gold)' }}>{p.personalYear}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>今年</div>
            </div>
            <div>
              <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--accent-gold)' }}>
                個人年 {p.personalYear}年サイクル
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {p.personalYearTheme}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl"
            style={{ background: 'rgba(155,127,205,0.08)', border: '1px solid rgba(155,127,205,0.15)' }}>
            <div className="text-center" style={{ minWidth: 36 }}>
              <div className="text-xl font-bold" style={{ color: '#9b7fcd' }}>{p.personalMonth}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>今月</div>
            </div>
            <div>
              <p className="text-xs font-bold mb-0.5" style={{ color: '#9b7fcd' }}>
                個人月 {p.personalMonth}月サイクル
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {p.personalMonthTheme}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 九星 + 星座の詳細 */}
      <div className="card p-5">
        <p className="text-xs font-bold mb-3" style={{ color: 'var(--accent-gold)' }}>
          ✦ 恋愛の詳細プロフィール
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-2 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="text-base">{p.nineStarEmoji}</span>
            <div>
              <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>
                {p.nineStarName}の恋愛
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-primary)' }}>{p.nineStarLoveStyle}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="text-base">{p.zodiacEmoji}</span>
            <div>
              <p className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>
                {p.zodiacName}の恋愛
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-primary)' }}>{p.zodiacLoveStyle}</p>
            </div>
          </div>
          <div className="pt-1">
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>相性の良い星座</p>
            <div className="flex flex-wrap gap-1.5">
              {p.compatibleSigns.map(sign => (
                <span key={sign} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--accent-gold)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  {sign}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ラッキーアイテム */}
      <div className="card p-4">
        <div className="flex gap-4">
          <div className="flex-1 text-center p-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>ラッキーカラー</p>
            <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>{p.luckyColor}</p>
          </div>
          <div className="flex-1 text-center p-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>ラッキーアイテム</p>
            <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>{p.luckyItem}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
