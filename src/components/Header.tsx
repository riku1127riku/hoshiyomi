'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isAuthPage = ['/', '/login', '/register'].includes(pathname)
  if (isAuthPage) return null

  return (
    <header className="sticky top-0 z-10 border-b" style={{
      background: 'rgba(10,10,26,0.9)',
      backdropFilter: 'blur(12px)',
      borderColor: 'rgba(201,168,76,0.15)'
    }}>
      <div className="max-w-sm mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/fortune" className="text-lg font-bold" style={{ color: 'var(--accent-gold)' }}>
          ✨ 星詠み
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/fortune"
            className="text-sm"
            style={{ color: pathname === '/fortune' ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
            今日
          </Link>
          <Link href="/history"
            className="text-sm"
            style={{ color: pathname === '/history' ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
            履歴
          </Link>
          <button onClick={handleLogout} className="text-sm" style={{ color: 'var(--text-muted)' }}>
            ログアウト
          </button>
        </nav>
      </div>
    </header>
  )
}
