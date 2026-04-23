import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  // Supabaseのcontactsテーブルに保存
  const { createClient } = await import('@supabase/supabase-js')
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await adminSupabase.from('contacts').insert({ name, email, message })

  return NextResponse.json({ success: true })
}
