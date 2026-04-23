import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: '星詠み | 毎朝あなただけの今日の恋愛運',
  description: 'イニシャルと生年月日だけで、AIが毎日あなただけの今日の運勢を読み解きます。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">
        <div className="stars-bg" />
        <Header />
        {children}
      </body>
    </html>
  )
}
