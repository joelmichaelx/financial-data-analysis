import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasAlphaVantageKey: !!process.env.ALPHA_VANTAGE_API_KEY,
      hasFinnhubKey: !!process.env.FINNHUB_API_KEY,
    },
    database: {
      connected: false,
      error: null as string | null,
      tables: {} as Record<string, number>,
    },
    apis: {
      alphaVantage: { status: 'not tested', error: null as string | null },
      finnhub: { status: 'not tested', error: null as string | null },
    }
  };

  // Test database connection
  try {
    const userCount = await prisma.user.count();
    const portfolioCount = await prisma.portfolio.count();
    const holdingCount = await prisma.holding.count();
    const marketDataCount = await prisma.marketData.count();
    const riskAssessmentCount = await prisma.riskAssessment.count();
    const alertCount = await prisma.alert.count();

    diagnostics.database.connected = true;
    diagnostics.database.tables = {
      users: userCount,
      portfolios: portfolioCount,
      holdings: holdingCount,
      marketData: marketDataCount,
      riskAssessments: riskAssessmentCount,
      alerts: alertCount,
    };
  } catch (error) {
    diagnostics.database.connected = false;
    diagnostics.database.error = error instanceof Error ? error.message : 'Unknown database error';
  }

  // Test Alpha Vantage API
  try {
    const alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (alphaVantageKey) {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${alphaVantageKey}`);
      if (response.ok) {
        diagnostics.apis.alphaVantage.status = 'connected';
      } else {
        diagnostics.apis.alphaVantage.status = 'error';
        diagnostics.apis.alphaVantage.error = `HTTP ${response.status}`;
      }
    } else {
      diagnostics.apis.alphaVantage.status = 'no key';
      diagnostics.apis.alphaVantage.error = 'ALPHA_VANTAGE_API_KEY not found';
    }
  } catch (error) {
    diagnostics.apis.alphaVantage.status = 'error';
    diagnostics.apis.alphaVantage.error = error instanceof Error ? error.message : 'Unknown API error';
  }

  // Test Finnhub API
  try {
    const finnhubKey = process.env.FINNHUB_API_KEY;
    if (finnhubKey) {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${finnhubKey}`);
      if (response.ok) {
        diagnostics.apis.finnhub.status = 'connected';
      } else {
        diagnostics.apis.finnhub.status = 'error';
        diagnostics.apis.finnhub.error = `HTTP ${response.status}`;
      }
    } else {
      diagnostics.apis.finnhub.status = 'no key';
      diagnostics.apis.finnhub.error = 'FINNHUB_API_KEY not found';
    }
  } catch (error) {
    diagnostics.apis.finnhub.status = 'error';
    diagnostics.apis.finnhub.error = error instanceof Error ? error.message : 'Unknown API error';
  }

  await prisma.$disconnect();

  return NextResponse.json(diagnostics, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
