import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Fortune } from '@/types'

const SCORE_COLORS: Record<number, string> = {
  1: '#6b7280', 2: '#6b7280', 3: '#9b7fcd',
  4: '#9b7fcd', 5: '#9b7fcd', 6: '#c9a84c',
  7: '#c9a84c', 8: '#f59e0b', 9: '#f59e0b', 10: '#ef4444',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const days = ['日', '月', '火', '水', '木', '金', '土']
  return `${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）`
}

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: fortunes } = await supabase
    .from('fortunes')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(30)

  return (
    <main className="max-w-sm mx-auto px-4 py-6">
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
        🔯 過去の運勢
      </h2>

      {!fortunes || fortunes.length === 0 ? (
        <div className="card p-8 text-center">
          <p style={{ color: 'var(--text-muted)' }}>まだ運勢の記録がありません</p>
          <Link href="/fortune" className="btn-primary inline-block mt-4">
            今日の運勢を見る
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {(fortunes as Fortune[]).map(f => (
            <div key={f.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(f.date)}
                </span>
                <span className="font-bold text-lg" style={{ color: SCORE_COLORS[f.score] ?? 'var(--accent-gold)' }}>
                  {f.score}<span className="text-xs text-white/30">/10</span>
                </span>
              </div>
              <p className="text-xs mb-2" style={{ color: 'var(--accent-gold)' }}>
                「{f.score_label}」
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {f.love_message}
              </p>
              <div className="mt-3 pt-3 border-t space-y-1" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                <p className="text-xs italic text-center" style={{ color: 'var(--accent-purple)' }}>
                  🌙「{f.todays_word}」
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  🪄 {f.lucky_action}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
