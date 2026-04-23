import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import FortuneClient from './fortune-client'

export default async function FortunePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/onboarding')

  const today = new Date().toISOString().split('T')[0]
  const { data: fortune } = await supabase
    .from('fortunes')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', today)
    .single()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status, trial_end, current_period_end')
    .eq('user_id', user.id)
    .single()

  const now = new Date()
  const isActive =
    subscription?.status === 'active' ||
    (subscription?.status === 'trialing' &&
      subscription?.trial_end &&
      new Date(subscription.trial_end) > now)

  return (
    <FortuneClient
      profile={profile}
      initialFortune={fortune}
      isSubscribed={!!isActive}
    />
  )
}
