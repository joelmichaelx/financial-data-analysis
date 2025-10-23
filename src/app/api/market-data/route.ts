import { NextRequest, NextResponse } from 'next/server';
import { financialDataService } from '@/services/financialDataService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols')?.split(',') || ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];
    
    const data = await financialDataService.getMarketData(symbols);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
