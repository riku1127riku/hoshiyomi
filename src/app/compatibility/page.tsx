import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CompatibilityClient from './compatibility-client'

export default async function CompatibilityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subscription } = await supabase
    .from('subscriptions').select('status, trial_end').eq('user_id', user.id).single()

  const now = new Date()
  const isSubscribed =
    subscription?.status === 'active' ||
    (subscription?.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) > now)

  return <CompatibilityClient isSubscribed={!!isSubscribed} />
}
