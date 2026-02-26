import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('countdown_timers')
      .select('*')
      .eq('id', 'krone-2026-countdown')
      .single()

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return NextResponse.json(data)
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err?.message ?? String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
