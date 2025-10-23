import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabaseTest = {
    timestamp: new Date().toISOString(),
    connection: {
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not Set',
      urlValid: false,
      error: null as string | null,
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL,
      vercelRegion: process.env.VERCEL_REGION,
      vercelEnv: process.env.VERCEL_ENV,
    },
    tests: {
      databaseConnection: false,
      tableAccess: false,
      dataRetrieval: false,
    }
  };

  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      supabaseTest.connection.error = 'DATABASE_URL environment variable not set';
      return NextResponse.json(supabaseTest);
    }

    // Parse DATABASE_URL to extract connection details
    const dbUrl = process.env.DATABASE_URL;
    const urlPattern = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
    const match = dbUrl.match(urlPattern);

    if (match) {
      const [, username, password, host, port, database] = match;
      supabaseTest.connection.urlValid = true;
      
      // Test basic connection
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      
      try {
        await prisma.$connect();
        supabaseTest.tests.databaseConnection = true;
        
        // Test table access
        const userCount = await prisma.user.count();
        supabaseTest.tests.tableAccess = true;
        
        // Test data retrieval
        const users = await prisma.user.findMany({ take: 1 });
        supabaseTest.tests.dataRetrieval = true;
        
        await prisma.$disconnect();
      } catch (dbError) {
        supabaseTest.connection.error = dbError instanceof Error ? dbError.message : 'Database connection failed';
      }
    } else {
      supabaseTest.connection.error = 'Invalid DATABASE_URL format';
    }

  } catch (error) {
    supabaseTest.connection.error = error instanceof Error ? error.message : 'Unknown error';
  }

  return NextResponse.json(supabaseTest, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
