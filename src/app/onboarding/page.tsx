'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Gender } from '@/types'

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'female', label: '女性' },
  { value: 'male', label: '男性' },
  { value: 'other', label: 'その他' },
]

export default function OnboardingPage() {
  const [initials, setInitials] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<Gender>('female')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initials, birthDate, gender }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(`登録に失敗しました: ${data.error}`)
      setLoading(false)
      return
    }

    router.push('/fortune')
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🔯</div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--accent-gold)' }}>
            あなたのことを教えて
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
            名前も住所も不要。<br />
            イニシャルと生年月日だけで<br />
            天命を読み解きます。
          </p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                イニシャル（例：S.K）
              </label>
              <input
                type="text"
                value={initials}
                onChange={e => setInitials(e.target.value)}
                className="input"
                placeholder="S.K"
                maxLength={5}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                生年月日
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                className="input"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                性別
              </label>
              <div className="flex gap-2">
                {GENDER_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setGender(opt.value)}
                    className={`flex-1 py-2 rounded-full text-sm border transition-all ${
                      gender === opt.value
                        ? 'border-yellow-500 text-yellow-400 bg-yellow-900/20'
                        : 'border-white/10 text-white/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? '読み解き中...' : '天命を読み解く →'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
