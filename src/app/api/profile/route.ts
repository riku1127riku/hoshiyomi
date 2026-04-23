import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { calcLifeNumber } from '@/lib/numerology'

export async function POST(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { initials, birthDate, gender } = await req.json()
  const lifeNumber = calcLifeNumber(birthDate)

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  console.log('Admin key available:', !!key, 'URL:', url)

  const adminSupabase = createClient(url, key)

  const { error } = await adminSupabase.from('profiles').upsert({
    id: user.id,
    initials: initials.toUpperCase(),
    birth_date: birthDate,
    gender,
    life_number: lifeNumber,
  })

  if (error) {
    console.error('Upsert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
