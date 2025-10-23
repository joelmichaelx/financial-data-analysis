import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    const portfolioCount = await prisma.portfolio.count();
    const holdingCount = await prisma.holding.count();
    const marketDataCount = await prisma.marketData.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        users: userCount,
        portfolios: portfolioCount,
        holdings: holdingCount,
        marketData: marketDataCount,
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
