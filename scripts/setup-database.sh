#!/bin/bash

# Financial Data Analysis & Risk Assessment System - Database Setup Script

echo "🗄️ Setting up database for Financial Data Analysis & Risk Assessment System"
echo "=================================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Database Setup Steps:"
echo ""

echo "1. 🔗 Connect to your Supabase project:"
echo "   https://supabase.com/dashboard/project/vatfnqdkrqtbckcpmhgx"
echo ""

echo "2. 🔑 Get your database connection string:"
echo "   - Go to Settings → Database"
echo "   - Copy the 'Connection string' under 'Connection parameters'"
echo "   - It should look like: postgresql://postgres:[YOUR-PASSWORD]@db.vatfnqdkrqtbckcpmhgx.supabase.co:5432/postgres"
echo ""

echo "3. 🌐 Add environment variables to Vercel:"
echo "   https://vercel.com/joels-projects-47c72ac7/financial-data-analysis"
echo ""
echo "   Required environment variables:"
echo "   - DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.vatfnqdkrqtbckcpmhgx.supabase.co:5432/postgres"
echo "   - NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random"
echo "   - NEXTAUTH_URL=https://financial-data-analysis.vercel.app"
echo "   - ALPHA_VANTAGE_API_KEY=TIONEPPO5BKIT34D"
echo "   - FINNHUB_API_KEY=d3t464pr01qqdgfu4g9gd3t464pr01qqdgfu4ga0"
echo ""

echo "4. 🚀 Deploy database schema:"
echo "   After setting environment variables in Vercel, run:"
echo "   npx prisma migrate deploy"
echo ""

echo "5. ✅ Verify deployment:"
echo "   - Check your Vercel deployment logs"
echo "   - Visit your deployed application"
echo "   - Verify database connection in Supabase dashboard"
echo ""

echo "🎉 Your Financial Data Analysis & Risk Assessment System will be live!"
echo ""
echo "📊 Features available after deployment:"
echo "   - Real-time financial dashboard"
echo "   - Advanced risk assessment"
echo "   - Portfolio management"
echo "   - Live market data feeds"
echo "   - Interactive charts and visualizations"
echo "   - Mobile responsive design"
echo ""
echo "🚀 Happy deploying!"
