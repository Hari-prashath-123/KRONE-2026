import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const COUNTDOWN_ID = 'krone-2026-countdown'

// ─── GET: fetch current timer state ────────────────────────────────
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('countdown_timers')
      .select('*')
      .eq('id', COUNTDOWN_ID)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 },
    )
  }
}

// ─── POST: update timer state ───────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { time_remaining, is_running, end_time, timer_ended, updated_at } = body

    const { data, error } = await supabase
      .from('countdown_timers')
      .update({ time_remaining, is_running, end_time, timer_ended, updated_at })
      .eq('id', COUNTDOWN_ID)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 },
    )
  }
}
