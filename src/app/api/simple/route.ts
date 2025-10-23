import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Financial Data Analysis & Risk Assessment System',
    status: 'running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
