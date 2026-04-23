import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single()

  if (subscription?.status !== 'active') {
    return NextResponse.json({ error: 'subscription_required' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl || !imageUrl.startsWith('https://image.pollinations.ai/')) {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  const res = await fetch(imageUrl)
  if (!res.ok) return NextResponse.json({ error: 'Image fetch failed' }, { status: 502 })

  const buffer = await res.arrayBuffer()

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment; filename="hoshiyomi-tarot.jpg"',
      'Cache-Control': 'no-store',
    },
  })
}

export const maxDuration = 60
