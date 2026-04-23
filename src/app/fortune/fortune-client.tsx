'use client'

import { useState } from 'react'
import { Fortune, Profile } from '@/types'
import Link from 'next/link'

const SCORE_COLORS: Record<number, string> = {
  1: '#6b7280', 2: '#6b7280', 3: '#9b7fcd',
  4: '#9b7fcd', 5: '#9b7fcd', 6: '#c9a84c',
  7: '#c9a84c', 8: '#f59e0b', 9: '#f59e0b', 10: '#ef4444',
}

function formatDate(date: Date) {
  const days = ['日', '月', '火', '水', '木', '金', '土']
  return `${date.getMonth() + 1}月${date.getDate()}日（${days[date.getDay()]}）`
}

interface Props {
  profile: Profile
  initialFortune: Fortune | null
  isSubscribed: boolean
}

export default function FortuneClient({ profile, initialFortune, isSubscribed }: Props) {
  const [fortune, setFortune] = useState<Fortune | null>(initialFortune)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const today = new Date()

  async function handleGenerate() {
    setLoading(true)
    setError('')

    const res = await fetch('/api/fortune', { method: 'POST' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = {}
    try { data = await res.json() } catch { /* empty body */ }

    if (!res.ok) {
      if (data.error === 'subscription_required') {
        setError('サブスクリプションの登録が必要です')
      } else {
        setError('運勢の取得に失敗しました。もう一度お試しください。')
      }
      setLoading(false)
      return
    }

    setFortune(data)
    setLoading(false)
  }

  if (!isSubscribed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4">🔯</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
            無料トライアル期間が終了しました
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            引き続き星詠みをご利用いただくには<br />
            サブスクリプションの登録をお願いします。
          </p>
          <Link href="/api/stripe/checkout" className="btn-primary inline-block">
            月額500円で続ける
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            【今日の {profile.initials} さんへ】
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {formatDate(today)}
          </p>
        </div>

        {fortune ? (
          <div className="space-y-4">
            {/* スコアカード */}
            <div className="card p-5 text-center">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="text-xl">🔯</span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>今日の運勢</span>
              </div>
              <div
                className="text-5xl font-bold"
                style={{ color: SCORE_COLORS[fortune.score] ?? 'var(--accent-gold)' }}
              >
                {fortune.score}
                <span className="text-2xl text-white/30"> / 10</span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--accent-gold)' }}>
                「{fortune.score_label}」
              </p>
            </div>

            {/* 恋愛メッセージ */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span>💕</span>
                <span className="text-sm font-medium" style={{ color: 'var(--accent-gold)' }}>
                  恋愛メッセージ
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {fortune.love_message}
              </p>
            </div>

            {/* 今日のひとこと */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span>🌙</span>
                <span className="text-sm font-medium" style={{ color: 'var(--accent-gold)' }}>
                  今日のひとこと
                </span>
              </div>
              <p
                className="text-sm text-center italic"
                style={{ color: 'var(--accent-purple)' }}
              >
                「{fortune.todays_word}」
              </p>
            </div>

            {/* 引き寄せ行動 */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span>🪄</span>
                <span className="text-sm font-medium" style={{ color: 'var(--accent-gold)' }}>
                  今日の引き寄せ行動
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                {fortune.lucky_action}
              </p>
            </div>

            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              明日また新しい運勢が届きます ✨
            </p>
          </div>
        ) : (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">🔯</div>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              今日の天命を読み解きます
            </p>
            {error && (
              <p className="text-sm text-red-400 mb-4">{error}</p>
            )}
            <button
              onClick={handleGenerate}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? '読み解き中...' : '今日の運勢を見る'}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
