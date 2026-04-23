import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import StarryBackground from '@/components/StarryBackground'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '星詠み | 毎朝あなただけの今日の恋愛運',
  description: 'イニシャルと生年月日だけで、AIが毎日あなただけの今日の運勢を読み解きます。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">
        <StarryBackground />
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <footer className="text-center py-4 text-xs space-x-4" style={{ color: 'var(--text-muted)' }}>
          <Link href="/terms" className="hover:opacity-70">利用規約</Link>
          <Link href="/privacy" className="hover:opacity-70">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:opacity-70">お問い合わせ</Link>
        </footer>
      </body>
    </html>
  )
}
