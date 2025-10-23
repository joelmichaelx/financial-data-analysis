import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Check if environment variables are set
    const hasUrl = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
    const hasKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'

    if (!hasUrl || !hasKey) {
      return NextResponse.json({
        status: 'not_configured',
        message: 'Supabase environment variables not configured',
        timestamp: new Date().toISOString(),
        instructions: 'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment'
      })
    }

    // Test basic connection
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1)

    if (error) {
      // This is expected if table doesn't exist
      return NextResponse.json({
        status: 'connected',
        message: 'Supabase connection successful',
        timestamp: new Date().toISOString(),
        error: error.message
      })
    }

    return NextResponse.json({
      status: 'connected',
      message: 'Supabase connection successful',
      timestamp: new Date().toISOString(),
      data: data
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to Supabase',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
