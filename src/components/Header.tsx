'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isAuthPage = ['/', '/login', '/register', '/demo'].includes(pathname)
  if (isAuthPage) return null

  return (
    <header className="sticky top-0 z-10 border-b" style={{
      background: 'rgba(10,10,26,0.9)',
      backdropFilter: 'blur(12px)',
      borderColor: 'rgba(201,168,76,0.15)',
    }}>
      <div className="max-w-sm mx-auto px-4 h-12 flex items-center justify-between">
        <Link href="/fortune" className="text-lg font-bold whitespace-nowrap" style={{
          background: 'linear-gradient(135deg, #f0d080, #c9a84c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ✨ 星詠み
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-70"
          style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <LogOut size={12} />
          ログアウト
        </button>
      </div>
    </header>
  )
}
