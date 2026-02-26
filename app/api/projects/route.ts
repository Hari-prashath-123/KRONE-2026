import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const SETTINGS_ID = 'krone-2026-projects'

// ─── GET: fetch submissions + lock state ───────────────────────────
export async function GET() {
  try {
    const [settingsRes, submissionsRes] = await Promise.all([
      supabase
        .from('project_settings')
        .select('*')
        .eq('id', SETTINGS_ID)
        .single(),
      supabase
        .from('project_submissions')
        .select('*')
        .order('created_at', { ascending: false }),
    ])

    if (settingsRes.error) {
      return NextResponse.json({ error: settingsRes.error.message }, { status: 500 })
    }
    if (submissionsRes.error) {
      return NextResponse.json({ error: submissionsRes.error.message }, { status: 500 })
    }

    return NextResponse.json({
      is_locked: settingsRes.data?.is_locked ?? false,
      submissions: submissionsRes.data ?? [],
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}

// ─── POST: submit a project OR toggle lock ─────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // ── Toggle lock (admin action) ──────────────────────────────────
    if (body.action === 'toggle_lock') {
      const { data: current, error: fetchErr } = await supabase
        .from('project_settings')
        .select('is_locked')
        .eq('id', SETTINGS_ID)
        .single()

      if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 })

      const newLocked = !current.is_locked

      const { data, error } = await supabase
        .from('project_settings')
        .update({ is_locked: newLocked, updated_at: new Date().toISOString() })
        .eq('id', SETTINGS_ID)
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ is_locked: data.is_locked })
    }

    // ── Set lock directly (admin action) ───────────────────────────
    if (body.action === 'set_lock') {
      const { data, error } = await supabase
        .from('project_settings')
        .update({ is_locked: body.is_locked, updated_at: new Date().toISOString() })
        .eq('id', SETTINGS_ID)
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ is_locked: data.is_locked })
    }

    // ── Submit a project ────────────────────────────────────────────
    if (body.action === 'submit') {
      // Check lock state first
      const { data: settings, error: settingsErr } = await supabase
        .from('project_settings')
        .select('is_locked')
        .eq('id', SETTINGS_ID)
        .single()

      if (settingsErr) return NextResponse.json({ error: settingsErr.message }, { status: 500 })
      if (settings.is_locked) {
        return NextResponse.json({ error: 'Submissions are currently locked.' }, { status: 403 })
      }

      const { team_name, project_name, repo_link } = body
      if (!team_name || !project_name || !repo_link) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('project_submissions')
        .insert({ team_name, project_name, repo_link })
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ submission: data })
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
