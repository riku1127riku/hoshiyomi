import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { generateFortune } from '@/lib/fortune'

export const maxDuration = 60

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // サブスク確認
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status, trial_end, current_period_end')
    .eq('user_id', user.id)
    .single()

  const now = new Date()
  const isActive =
    subscription?.status === 'active' ||
    (subscription?.status === 'trialing' &&
      subscription.trial_end &&
      new Date(subscription.trial_end) > now)

  if (!isActive) {
    return NextResponse.json({ error: 'subscription_required' }, { status: 403 })
  }

  // 今日すでに生成済みか確認
  const today = now.toISOString().split('T')[0]
  const { data: existing } = await supabase
    .from('fortunes')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', today)
    .single()

  if (existing) {
    return NextResponse.json(existing)
  }

  // プロフィール取得
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'profile_not_found' }, { status: 404 })
  }

  // 運勢生成
  const result = await generateFortune({
    initials: profile.initials,
    birthDate: profile.birth_date,
    gender: profile.gender,
    today: now,
  })

  // DBに保存（admin clientで）
  const adminSupabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: fortune, error } = await adminSupabase
    .from('fortunes')
    .insert({
      user_id: user.id,
      date: today,
      score: result.score,
      score_label: result.scoreLabel,
      love_message: result.loveMessage,
      todays_word: result.todaysWord,
      lucky_action: result.luckyAction,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'generation_failed' }, { status: 500 })
  }

  return NextResponse.json(fortune)
}
