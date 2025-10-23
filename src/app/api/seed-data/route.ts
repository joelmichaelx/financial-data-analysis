import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Clear existing data
    await prisma.riskBreakdown.deleteMany();
    await prisma.riskAssessment.deleteMany();
    await prisma.alert.deleteMany();
    await prisma.portfolioPerformance.deleteMany();
    await prisma.holding.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.user.deleteMany();
    await prisma.marketData.deleteMany();
    await prisma.riskHistory.deleteMany();

    // Create sample user
    const user = await prisma.user.create({
      data: {
        id: 'user-1',
        email: 'demo@financialanalysis.com',
        name: 'Demo User',
      }
    });

    // Create sample portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        id: 'portfolio-1',
        userId: user.id,
        name: 'Demo Portfolio',
        description: 'Sample portfolio for demonstration',
        totalValue: 1250000,
        totalCost: 1100000,
      }
    });

    // Create sample holdings
    const holdings = await prisma.holding.createMany({
      data: [
        {
          id: 'holding-1',
          portfolioId: portfolio.id,
          symbol: 'AAPL',
          name: 'Apple Inc.',
          shares: 100,
          costBasis: 12000,
          currentPrice: 150,
          totalValue: 15000,
          weight: 0.12,
        },
        {
          id: 'holding-2',
          portfolioId: portfolio.id,
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          shares: 50,
          costBasis: 120000,
          currentPrice: 2800,
          totalValue: 140000,
          weight: 0.11,
        },
        {
          id: 'holding-3',
          portfolioId: portfolio.id,
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          shares: 200,
          costBasis: 60000,
          currentPrice: 350,
          totalValue: 70000,
          weight: 0.056,
        },
      ]
    });

    // Create sample performance data
    const performanceData = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    let value = 1000000;

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const change = (Math.random() - 0.5) * 0.02;
      value *= (1 + change);
      
      performanceData.push({
        id: `perf-${i}`,
        portfolioId: portfolio.id,
        date: date,
        value: Math.round(value),
        benchmark: Math.round(1000000 * (1 + i * 0.001)),
      });
    }

    await prisma.portfolioPerformance.createMany({
      data: performanceData
    });

    // Create sample risk assessment
    const riskAssessment = await prisma.riskAssessment.create({
      data: {
        id: 'risk-1',
        portfolioId: portfolio.id,
        overallRisk: 65.5,
        riskScore: 65.5,
        riskLevel: 'High',
        var95: 25000,
        var99: 35000,
        expectedShortfall: 42000,
        maxDrawdown: 0.15,
        sharpeRatio: 1.2,
        beta: 0.8,
        correlation: 0.6,
      }
    });

    // Create risk breakdown
    await prisma.riskBreakdown.createMany({
      data: [
        {
          id: 'breakdown-1',
          riskAssessmentId: riskAssessment.id,
          category: 'Market Risk',
          value: 35,
          color: '#ef4444',
        },
        {
          id: 'breakdown-2',
          riskAssessmentId: riskAssessment.id,
          category: 'Credit Risk',
          value: 25,
          color: '#f59e0b',
        },
        {
          id: 'breakdown-3',
          riskAssessmentId: riskAssessment.id,
          category: 'Liquidity Risk',
          value: 20,
          color: '#3b82f6',
        },
        {
          id: 'breakdown-4',
          riskAssessmentId: riskAssessment.id,
          category: 'Operational Risk',
          value: 15,
          color: '#10b981',
        },
        {
          id: 'breakdown-5',
          riskAssessmentId: riskAssessment.id,
          category: 'Other',
          value: 5,
          color: '#8b5cf6',
        },
      ]
    });

    // Create sample market data
    await prisma.marketData.createMany({
      data: [
        {
          id: 'market-1',
          symbol: 'AAPL',
          price: 150.25,
          change: 1.25,
          changePercent: 0.84,
          volume: 50000000,
          high: 151.00,
          low: 149.50,
          open: 149.00,
          previousClose: 149.00,
        },
        {
          id: 'market-2',
          symbol: 'GOOGL',
          price: 2800.50,
          change: -15.25,
          changePercent: -0.54,
          volume: 2500000,
          high: 2820.00,
          low: 2795.00,
          open: 2815.75,
          previousClose: 2815.75,
        },
        {
          id: 'market-3',
          symbol: 'MSFT',
          price: 350.75,
          change: 2.50,
          changePercent: 0.72,
          volume: 15000000,
          high: 352.00,
          low: 348.25,
          open: 348.25,
          previousClose: 348.25,
        },
        {
          id: 'market-4',
          symbol: 'TSLA',
          price: 200.00,
          change: 5.00,
          changePercent: 2.56,
          volume: 75000000,
          high: 205.00,
          low: 195.00,
          open: 195.00,
          previousClose: 195.00,
        },
      ]
    });

    // Create sample alerts
    await prisma.alert.createMany({
      data: [
        {
          id: 'alert-1',
          userId: user.id,
          type: 'warning',
          title: 'High Volatility Detected',
          message: 'AAPL stock showing unusual price movements',
          severity: 'high',
        },
        {
          id: 'alert-2',
          userId: user.id,
          type: 'error',
          title: 'Risk Threshold Exceeded',
          message: 'Portfolio risk score has exceeded acceptable limits',
          severity: 'critical',
        },
        {
          id: 'alert-3',
          userId: user.id,
          type: 'info',
          title: 'Market Update',
          message: 'Market opening with increased trading volume',
          severity: 'low',
        },
      ]
    });

    // Create sample risk history
    const riskHistoryData = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      riskHistoryData.push({
        id: `history-${i}`,
        date: date,
        riskScore: 60 + Math.random() * 30,
        var95: 20000 + Math.random() * 10000,
        var99: 30000 + Math.random() * 15000,
        sharpeRatio: 1.0 + Math.random() * 0.8,
      });
    }

    await prisma.riskHistory.createMany({
      data: riskHistoryData
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Sample data seeded successfully',
      data: {
        users: 1,
        portfolios: 1,
        holdings: 3,
        performanceRecords: 30,
        riskAssessments: 1,
        riskBreakdowns: 5,
        marketData: 4,
        alerts: 3,
        riskHistory: 30,
      }
    });

  } catch (error) {
    console.error('Error seeding data:', error);
    await prisma.$disconnect();
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
