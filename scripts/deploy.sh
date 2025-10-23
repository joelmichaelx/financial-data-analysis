#!/bin/bash

# Financial Data Analysis & Risk Assessment System - Deployment Script

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run linting
echo "🧹 Running linting..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Deployment ready!"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git push origin main"
    echo "2. Connect to Vercel: https://vercel.com/new"
    echo "3. Configure environment variables in Vercel dashboard"
    echo "4. Deploy: vercel --prod"
    echo ""
    echo "Environment variables needed:"
    echo "- DATABASE_URL"
    echo "- NEXTAUTH_SECRET"
    echo "- NEXTAUTH_URL"
    echo "- ALPHA_VANTAGE_API_KEY"
    echo "- FINNHUB_API_KEY"
    echo "- REDIS_URL (optional)"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi
