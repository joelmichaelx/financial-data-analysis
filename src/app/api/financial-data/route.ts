import { NextRequest, NextResponse } from 'next/server';
import { financialDataService } from '@/services/financialDataService';

export async function GET(request: NextRequest) {
  try {
    const data = await financialDataService.getFinancialData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching financial data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch financial data' },
      { status: 500 }
    );
  }
}
