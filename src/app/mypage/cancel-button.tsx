'use client'

import { useState } from 'react'

export default function CancelButton() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleCancel() {
    if (!confirm('本当に解約しますか？期間終了日まで引き続きご利用いただけます。')) return
    setLoading(true)
    const res = await fetch('/api/stripe/cancel', { method: 'POST' })
    if (res.ok) {
      setDone(true)
    } else {
      alert('解約処理に失敗しました。もう一度お試しください。')
    }
    setLoading(false)
  }

  if (done) {
    return <p className="text-xs text-red-400">解約手続きが完了しました。</p>
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-xs underline"
      style={{ color: 'var(--text-muted)' }}
    >
      {loading ? '処理中...' : 'サブスクリプションを解約する'}
    </button>
  )
}
