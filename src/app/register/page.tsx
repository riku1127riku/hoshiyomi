'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Gender } from '@/types'

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'female', label: '女性' },
  { value: 'male', label: '男性' },
  { value: 'other', label: 'その他' },
]

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [initials, setInitials] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<Gender>('female')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) {
      setError('登録に失敗しました。別のメールアドレスをお試しください。')
      setLoading(false)
      return
    }

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initials, birthDate, gender }),
    })

    if (!res.ok) {
      setError('プロフィールの登録に失敗しました。もう一度お試しください。')
      setLoading(false)
      return
    }

    router.push('/fortune')
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">✨</div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--accent-gold)' }}>
            星詠み
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            7日間無料ではじめる
          </p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                メールアドレス
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input" placeholder="example@mail.com" required />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                パスワード（6文字以上）
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="input" placeholder="••••••••" minLength={6} required />
            </div>

            <hr style={{ borderColor: 'rgba(201,168,76,0.2)' }} />

            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                イニシャル（例：S.K）
              </label>
              <input type="text" value={initials} onChange={e => setInitials(e.target.value)}
                className="input" placeholder="S.K" maxLength={5} required />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                生年月日
              </label>
              <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}
                className="input" max={new Date().toISOString().split('T')[0]} required />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                性別
              </label>
              <div className="flex gap-2">
                {GENDER_OPTIONS.map(opt => (
                  <button key={opt.value} type="button" onClick={() => setGender(opt.value)}
                    className={`flex-1 py-2 rounded-full text-sm border transition-all ${
                      gender === opt.value
                        ? 'border-yellow-500 text-yellow-400 bg-yellow-900/20'
                        : 'border-white/10 text-white/50'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? '登録中...' : '無料で始める →'}
            </button>
            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              7日間無料、その後月額500円（税込）
            </p>
          </form>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: 'var(--text-muted)' }}>
          すでにアカウントをお持ちの方は{' '}
          <Link href="/login" style={{ color: 'var(--accent-gold)' }}>ログイン</Link>
        </p>
      </div>
    </main>
  )
}
