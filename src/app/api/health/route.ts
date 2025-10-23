import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Financial Data Analysis & Risk Assessment System is running',
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasAlphaVantageKey: !!process.env.ALPHA_VANTAGE_API_KEY,
      hasFinnhubKey: !!process.env.FINNHUB_API_KEY,
    }
  });
}
