import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Check if environment variables are set
    const hasUrl = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
    const hasKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'

    if (!hasUrl || !hasKey) {
      // Return fallback data if Supabase not configured
      return NextResponse.json({
        portfolio: {
          id: 1,
          name: 'Demo Portfolio',
          total_value: 1250000.00,
          total_cost: 1100000.00,
          daily_pnl: 2450.00
        },
        holdings: [
          { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 100, current_price: 150.00, total_value: 15000.00, change_percent: 1.01 },
          { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 50, current_price: 2800.00, total_value: 140000.00, change_percent: -0.14 },
          { id: 3, symbol: 'MSFT', name: 'Microsoft Corporation', shares: 200, current_price: 350.00, total_value: 70000.00, change_percent: 0.72 }
        ],
        risk_metrics: {
          id: 1,
          risk_score: 65.5,
          risk_level: 'High',
          var_95: 25000.00,
          var_99: 35000.00,
          sharpe_ratio: 1.20,
          max_drawdown: 0.15
        },
        source: 'fallback'
      })
    }

    // Fetch from Supabase
    const { data: portfolio, error: portfolioError } = await supabase
      .from('portfolio')
      .select('*')
      .limit(1)
      .single()

    if (portfolioError) {
      throw new Error(`Portfolio error: ${portfolioError.message}`)
    }

    const { data: holdings, error: holdingsError } = await supabase
      .from('holdings')
      .select('*')
      .eq('portfolio_id', portfolio.id)

    if (holdingsError) {
      throw new Error(`Holdings error: ${holdingsError.message}`)
    }

    const { data: riskMetrics, error: riskError } = await supabase
      .from('risk_metrics')
      .select('*')
      .eq('portfolio_id', portfolio.id)
      .limit(1)
      .single()

    if (riskError) {
      throw new Error(`Risk metrics error: ${riskError.message}`)
    }

    return NextResponse.json({
      portfolio,
      holdings,
      risk_metrics: riskMetrics,
      source: 'database'
    })

  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    
    // Return fallback data on error
    return NextResponse.json({
      portfolio: {
        id: 1,
        name: 'Demo Portfolio',
        total_value: 1250000.00,
        total_cost: 1100000.00,
        daily_pnl: 2450.00
      },
      holdings: [
        { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 100, current_price: 150.00, total_value: 15000.00, change_percent: 1.01 },
        { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 50, current_price: 2800.00, total_value: 140000.00, change_percent: -0.14 },
        { id: 3, symbol: 'MSFT', name: 'Microsoft Corporation', shares: 200, current_price: 350.00, total_value: 70000.00, change_percent: 0.72 }
      ],
      risk_metrics: {
        id: 1,
        risk_score: 65.5,
        risk_level: 'High',
        var_95: 25000.00,
        var_99: 35000.00,
        sharpe_ratio: 1.20,
        max_drawdown: 0.15
      },
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
