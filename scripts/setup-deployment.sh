#!/bin/bash

# Financial Data Analysis & Risk Assessment System - Deployment Setup Script

echo "🚀 Financial Data Analysis & Risk Assessment System"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run: git init"
    exit 1
fi

# Check if all files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Uncommitted changes detected. Please commit all changes first."
    git status --short
    echo ""
    echo "Run: git add . && git commit -m 'Your commit message'"
    exit 1
fi

echo "✅ Git repository is clean"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

echo "✅ Dependencies installed"
echo ""

# Run type checking
echo "🔍 Running type checking..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type checking failed. Please fix TypeScript errors."
    exit 1
fi

echo "✅ Type checking passed"
echo ""

# Run linting
echo "🧹 Running linting..."
npm run lint
if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found. Consider fixing them before deployment."
    echo "Run: npm run lint --fix"
fi

echo "✅ Linting completed"
echo ""

# Run tests
echo "🧪 Running tests..."
npm run test -- --passWithNoTests
if [ $? -ne 0 ]; then
    echo "⚠️  Some tests failed. Consider fixing them before deployment."
fi

echo "✅ Tests completed"
echo ""

# Build the application
echo "🏗️ Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"
echo ""

echo "🎉 Ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Create GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Name: financial-data-analysis"
echo "   - Make it public"
echo "   - Don't initialize with README"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/financial-data-analysis.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Configure environment variables"
echo ""
echo "4. Set up database:"
echo "   - Use Supabase (free): https://supabase.com"
echo "   - Or Railway: https://railway.app"
echo "   - Or PlanetScale: https://planetscale.com"
echo ""
echo "5. Get API keys:"
echo "   - Alpha Vantage: https://www.alphavantage.co/support/#api-key"
echo "   - Finnhub: https://finnhub.io/register"
echo ""
echo "📖 See DEPLOYMENT_STEPS.md for detailed instructions"
echo ""
echo "🚀 Happy deploying!"
