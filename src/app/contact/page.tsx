'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
            送信しました
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            お問い合わせありがとうございます。<br />
            内容を確認の上、ご連絡いたします。
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-8">
      <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--accent-gold)' }}>
        ✉️ お問い合わせ
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>お名前</label>
          <input
            className="input"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="山田 花子"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>メールアドレス</label>
          <input
            className="input"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>お問い合わせ内容</label>
          <textarea
            className="input"
            required
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="ご質問・ご要望などをご記入ください"
            style={{ resize: 'none' }}
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? '送信中...' : '送信する'}
        </button>
      </form>
    </main>
  )
}
