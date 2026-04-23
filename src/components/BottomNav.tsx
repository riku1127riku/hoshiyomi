'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Clock, Sparkles, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/fortune', label: '今日', icon: Sun },
  { href: '/history', label: '履歴', icon: Clock },
  { href: '/tarot', label: 'タロット', icon: Sparkles },
  { href: '/mypage', label: 'マイページ', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  const isAuthPage = ['/', '/login', '/register', '/demo'].includes(pathname)
  if (isAuthPage) return null

  return (
    <>
      {/* ナビの高さ分のスペーサー */}
      <div className="h-16" />

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t"
        style={{
          background: 'rgba(10,10,26,0.95)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(201,168,76,0.15)',
        }}>
        <div className="max-w-sm mx-auto flex items-center h-16">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-all"
                style={{ color: active ? 'var(--accent-gold)' : 'var(--text-muted)' }}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span style={{ fontSize: '10px', fontWeight: active ? 700 : 400 }}>
                  {label}
                </span>
                {active && (
                  <div className="absolute bottom-0 w-6 h-0.5 rounded-full"
                    style={{ background: 'var(--accent-gold)' }} />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
