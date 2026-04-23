import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TarotClient from './tarot-client'
import { generateFortune } from '@/lib/fortune'

export default async function TarotPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: subscription }, { data: profile }] = await Promise.all([
    supabase.from('subscriptions').select('status, trial_end').eq('user_id', user.id).single(),
    supabase.from('profiles').select('initials, birth_date, gender').eq('id', user.id).single(),
  ])

  const now = new Date()
  const isSubscribed =
    subscription?.status === 'active' ||
    (subscription?.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) > now)

  let fortune = null
  if (profile) {
    try {
      fortune = await generateFortune({
        initials: profile.initials,
        birthDate: profile.birth_date,
        gender: profile.gender as 'female' | 'male' | 'other',
        today: now,
      })
    } catch {}
  }

  return <TarotClient isSubscribed={!!isSubscribed} fortune={fortune} />
}
