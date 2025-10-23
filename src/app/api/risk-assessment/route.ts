import { NextRequest, NextResponse } from 'next/server';
import { riskAssessmentService } from '@/services/riskAssessmentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '1M';
    
    const data = await riskAssessmentService.getRiskMetrics();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch risk assessment' },
      { status: 500 }
    );
  }
}
