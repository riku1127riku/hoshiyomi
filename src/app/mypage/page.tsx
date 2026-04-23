import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CancelButton from './cancel-button'
import AstrologyProfile from '@/components/AstrologyProfile'

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status, trial_end, current_period_end')
    .eq('user_id', user.id)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('initials, birth_date, gender')
    .eq('id', user.id)
    .single()

  const now = new Date()
  const isTrialing = subscription?.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) > now
  const isActive = subscription?.status === 'active'
  const isCanceling = subscription?.status === 'cancel_at_period_end'

  const statusLabel = isTrialing ? '無料トライアル中'
    : isActive ? 'サブスク利用中'
    : isCanceling ? '解約手続き済み（期間終了まで利用可）'
    : '未契約'

  const endDate = subscription?.trial_end || subscription?.current_period_end
  const endDateStr = endDate ? new Date(endDate).toLocaleDateString('ja-JP') : null

  return (
    <main className="max-w-sm mx-auto px-4 py-8">
      <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--accent-gold)' }}>🔯 マイページ</h2>

      <div className="space-y-4">
        <div className="card p-5">
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>アカウント</p>
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{user.email}</p>
        </div>

        {profile && (
          <div className="card p-5">
            <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>プロフィール</p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>イニシャル：{profile.initials}</p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>生年月日：{profile.birth_date}</p>
          </div>
        )}

        {profile?.birth_date && (
          <AstrologyProfile birthDate={profile.birth_date} />
        )}

        <div className="card p-5">
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>サブスクリプション</p>
          <p className="text-sm font-medium" style={{ color: 'var(--accent-gold)' }}>{statusLabel}</p>
          {endDateStr && (
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {isTrialing ? 'トライアル終了日' : '次回請求日'}：{endDateStr}
            </p>
          )}

          {(isActive || isTrialing) && !isCanceling && (
            <div className="mt-4">
              <CancelButton />
            </div>
          )}

          {isCanceling && (
            <p className="text-xs mt-3 text-red-400">
              解約手続き済みです。期間終了後にサービスが停止します。
            </p>
          )}

          {!subscription && (
            <a href="/api/stripe/checkout" className="btn-primary inline-block mt-3 text-sm">
              月額500円で登録する
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
