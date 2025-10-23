import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const testResults = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasAlphaVantageKey: !!process.env.ALPHA_VANTAGE_API_KEY,
      hasFinnhubKey: !!process.env.FINNHUB_API_KEY,
    },
    database: {
      connected: false,
      error: null as string | null,
      tables: {} as Record<string, number>,
      connectionString: process.env.DATABASE_URL ? 'Set' : 'Not Set',
    },
    apis: {
      alphaVantage: { status: 'not tested', error: null as string | null },
      finnhub: { status: 'not tested', error: null as string | null },
    },
    deployment: {
      platform: 'Vercel',
      region: process.env.VERCEL_REGION || 'Unknown',
      environment: process.env.VERCEL_ENV || 'Unknown',
    }
  };

  // Test database connection
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('Database connected successfully');

    // Test table access
    const userCount = await prisma.user.count();
    const portfolioCount = await prisma.portfolio.count();
    const holdingCount = await prisma.holding.count();
    const marketDataCount = await prisma.marketData.count();
    const riskAssessmentCount = await prisma.riskAssessment.count();
    const alertCount = await prisma.alert.count();
    const riskHistoryCount = await prisma.riskHistory.count();

    testResults.database.connected = true;
    testResults.database.tables = {
      users: userCount,
      portfolios: portfolioCount,
      holdings: holdingCount,
      marketData: marketDataCount,
      riskAssessments: riskAssessmentCount,
      alerts: alertCount,
      riskHistory: riskHistoryCount,
    };

    console.log('Database tables accessed successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    testResults.database.connected = false;
    testResults.database.error = error instanceof Error ? error.message : 'Unknown database error';
  }

  // Test Alpha Vantage API
  try {
    const alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (alphaVantageKey) {
      console.log('Testing Alpha Vantage API...');
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${alphaVantageKey}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Financial-Analysis-App/1.0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data['Global Quote']) {
          testResults.apis.alphaVantage.status = 'connected';
        } else {
          testResults.apis.alphaVantage.status = 'error';
          testResults.apis.alphaVantage.error = 'No data returned from API';
        }
      } else {
        testResults.apis.alphaVantage.status = 'error';
        testResults.apis.alphaVantage.error = `HTTP ${response.status}: ${response.statusText}`;
      }
    } else {
      testResults.apis.alphaVantage.status = 'no key';
      testResults.apis.alphaVantage.error = 'ALPHA_VANTAGE_API_KEY not found in environment variables';
    }
  } catch (error) {
    console.error('Alpha Vantage API error:', error);
    testResults.apis.alphaVantage.status = 'error';
    testResults.apis.alphaVantage.error = error instanceof Error ? error.message : 'Unknown API error';
  }

  // Test Finnhub API
  try {
    const finnhubKey = process.env.FINNHUB_API_KEY;
    if (finnhubKey) {
      console.log('Testing Finnhub API...');
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${finnhubKey}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Financial-Analysis-App/1.0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.c !== undefined) {
          testResults.apis.finnhub.status = 'connected';
        } else {
          testResults.apis.finnhub.status = 'error';
          testResults.apis.finnhub.error = 'No data returned from API';
        }
      } else {
        testResults.apis.finnhub.status = 'error';
        testResults.apis.finnhub.error = `HTTP ${response.status}: ${response.statusText}`;
      }
    } else {
      testResults.apis.finnhub.status = 'no key';
      testResults.apis.finnhub.error = 'FINNHUB_API_KEY not found in environment variables';
    }
  } catch (error) {
    console.error('Finnhub API error:', error);
    testResults.apis.finnhub.status = 'error';
    testResults.apis.finnhub.error = error instanceof Error ? error.message : 'Unknown API error';
  }

  // Test Vercel environment
  testResults.deployment.region = process.env.VERCEL_REGION || 'Unknown';
  testResults.deployment.environment = process.env.VERCEL_ENV || 'Unknown';

  await prisma.$disconnect();

  return NextResponse.json(testResults, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Content-Type': 'application/json'
    }
  });
}
