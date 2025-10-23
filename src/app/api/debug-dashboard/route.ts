import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    step: 'Dashboard Data Debug',
    issues: [] as string[],
    fixes: [] as string[],
    data: {
      financialData: null as any,
      riskData: null as any,
      marketData: null as any,
    },
    environment: {
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not Set',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
      alphaVantageKey: process.env.ALPHA_VANTAGE_API_KEY ? 'Set' : 'Not Set',
      finnhubKey: process.env.FINNHUB_API_KEY ? 'Set' : 'Not Set',
    }
  };

  try {
    // Step 1: Check database connection
    console.log('🔍 Step 1: Checking database connection...');
    await prisma.$connect();
    debugInfo.fixes.push('✅ Database connection successful');

    // Step 2: Check if tables exist and have data
    console.log('🔍 Step 2: Checking database tables...');
    
    const userCount = await prisma.user.count();
    const portfolioCount = await prisma.portfolio.count();
    const holdingCount = await prisma.holding.count();
    const marketDataCount = await prisma.marketData.count();
    const riskAssessmentCount = await prisma.riskAssessment.count();
    const alertCount = await prisma.alert.count();

    console.log('Database counts:', { userCount, portfolioCount, holdingCount, marketDataCount, riskAssessmentCount, alertCount });

    if (userCount === 0) {
      debugInfo.issues.push('❌ No users found in database');
      debugInfo.fixes.push('🔧 Run the database schema SQL in Supabase');
    } else {
      debugInfo.fixes.push('✅ Users found in database');
    }

    if (portfolioCount === 0) {
      debugInfo.issues.push('❌ No portfolios found in database');
      debugInfo.fixes.push('🔧 Run the database schema SQL in Supabase');
    } else {
      debugInfo.fixes.push('✅ Portfolios found in database');
    }

    if (holdingCount === 0) {
      debugInfo.issues.push('❌ No holdings found in database');
      debugInfo.fixes.push('🔧 Run the database schema SQL in Supabase');
    } else {
      debugInfo.fixes.push('✅ Holdings found in database');
    }

    // Step 3: Test financial data service
    console.log('🔍 Step 3: Testing financial data service...');
    try {
      const portfolio = await prisma.portfolio.findFirst({
        include: {
          holdings: true,
          performance: {
            orderBy: { date: 'desc' },
            take: 30
          }
        }
      });

      if (portfolio) {
        debugInfo.data.financialData = {
          portfolioValue: portfolio.totalValue,
          totalCost: portfolio.totalCost,
          holdingsCount: portfolio.holdings.length,
          performanceCount: portfolio.performance.length,
        };
        debugInfo.fixes.push('✅ Financial data retrieved successfully');
      } else {
        debugInfo.issues.push('❌ No portfolio data found');
        debugInfo.fixes.push('🔧 Run the database schema SQL in Supabase');
      }
    } catch (error) {
      debugInfo.issues.push(`❌ Financial data service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Step 4: Test risk assessment data
    console.log('🔍 Step 4: Testing risk assessment data...');
    try {
      const riskAssessment = await prisma.riskAssessment.findFirst({
        include: {
          riskBreakdowns: true
        }
      });

      if (riskAssessment) {
        debugInfo.data.riskData = {
          riskScore: riskAssessment.riskScore,
          riskLevel: riskAssessment.riskLevel,
          breakdownCount: riskAssessment.riskBreakdowns.length,
        };
        debugInfo.fixes.push('✅ Risk assessment data retrieved successfully');
      } else {
        debugInfo.issues.push('❌ No risk assessment data found');
        debugInfo.fixes.push('🔧 Run the database schema SQL in Supabase');
      }
    } catch (error) {
      debugInfo.issues.push(`❌ Risk assessment service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Step 5: Test market data
    console.log('🔍 Step 5: Testing market data...');
    try {
      const marketData = await prisma.marketData.findMany({
        take: 5
      });

      if (marketData.length > 0) {
        debugInfo.data.marketData = {
          count: marketData.length,
          symbols: marketData.map(m => m.symbol),
        };
        debugInfo.fixes.push('✅ Market data retrieved successfully');
      } else {
        debugInfo.issues.push('❌ No market data found');
        debugInfo.fixes.push('🔧 Run the database schema SQL in Supabase');
      }
    } catch (error) {
      debugInfo.issues.push(`❌ Market data service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Step 6: Test API endpoints
    console.log('🔍 Step 6: Testing API endpoints...');
    try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      
      // Test financial data API
      const financialResponse = await fetch(`${baseUrl}/api/financial-data`);
      if (financialResponse.ok) {
        debugInfo.fixes.push('✅ Financial data API endpoint working');
      } else {
        debugInfo.issues.push(`❌ Financial data API error: ${financialResponse.status}`);
      }

      // Test risk assessment API
      const riskResponse = await fetch(`${baseUrl}/api/risk-assessment`);
      if (riskResponse.ok) {
        debugInfo.fixes.push('✅ Risk assessment API endpoint working');
      } else {
        debugInfo.issues.push(`❌ Risk assessment API error: ${riskResponse.status}`);
      }

    } catch (error) {
      debugInfo.issues.push(`❌ API endpoint test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

  } catch (error) {
    debugInfo.issues.push(`❌ Database connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    debugInfo.fixes.push('🔧 Check DATABASE_URL in Vercel environment variables');
  } finally {
    await prisma.$disconnect();
  }

  // Summary
  if (debugInfo.issues.length === 0) {
    debugInfo.fixes.push('🎉 All systems working correctly!');
  } else {
    debugInfo.fixes.push('🔧 Fix the issues above to get data loading');
  }

  return NextResponse.json(debugInfo, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
