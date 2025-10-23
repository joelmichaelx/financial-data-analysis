# 🚀 Deployment Steps - Financial Data Analysis & Risk Assessment System

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not already installed
# brew install gh (on macOS)
# or download from https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository and push
gh repo create financial-data-analysis --public --description "Advanced Financial Data Analysis & Risk Assessment System with real-time monitoring and interactive dashboards"
git remote add origin https://github.com/$(gh api user --jq .login)/financial-data-analysis.git
git push -u origin main
```

### Option B: Manual GitHub Setup
1. Go to [GitHub.com](https://github.com/new)
2. Create a new repository named `financial-data-analysis`
3. Make it public
4. Don't initialize with README (we already have one)
5. Copy the repository URL
6. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/financial-data-analysis.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Database

### Option A: Supabase (Recommended - Free Tier)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Option B: Railway
1. Go to [Railway](https://railway.app)
2. Create new project
3. Add PostgreSQL database
4. Copy connection string

### Option C: PlanetScale
1. Go to [PlanetScale](https://planetscale.com)
2. Create new database
3. Get connection string

## Step 3: Get API Keys

### Alpha Vantage API (Free)
1. Go to [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Sign up for free account
3. Get your API key
4. Free tier: 5 calls per minute, 500 calls per day

### Finnhub API (Free)
1. Go to [Finnhub](https://finnhub.io/register)
2. Sign up for free account
3. Get your API key
4. Free tier: 60 calls per minute

## Step 4: Deploy to Vercel

### Automatic Deployment
1. Go to [Vercel](https://vercel.com/new)
2. Click "Import Git Repository"
3. Connect your GitHub account
4. Select `financial-data-analysis` repository
5. Click "Import"

### Configure Project
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables
Add these in Vercel project settings:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random
NEXTAUTH_URL=https://your-app-name.vercel.app

# Financial Data APIs
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
FINNHUB_API_KEY=your-finnhub-key

# Optional
REDIS_URL=redis://username:password@host:port
```

## Step 5: Database Migration

After deployment, run database migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Run database migrations
npx prisma migrate deploy
```

## Step 6: Test Your Application

1. **Visit your Vercel URL**: `https://your-app-name.vercel.app`
2. **Check the dashboard**: Should show financial metrics
3. **Test real-time data**: Market data should update
4. **Verify risk assessment**: Risk metrics should display

## Step 7: Custom Domain (Optional)

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Configure DNS records

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Check locally
   npm run build
   npm run type-check
   npm run lint
   ```

2. **Database Connection**
   - Verify DATABASE_URL format
   - Check database is accessible
   - Run: `npx prisma db push`

3. **API Errors**
   - Verify API keys are correct
   - Check API rate limits
   - Review console logs

4. **Environment Variables**
   - Ensure all variables are set
   - Check variable names match exactly
   - Redeploy after changes

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to Vercel dashboard
   - Enable Analytics
   - Monitor performance

2. **Database Indexing**
   ```sql
   CREATE INDEX idx_market_data_symbol_timestamp ON "MarketData" (symbol, timestamp);
   CREATE INDEX idx_portfolio_performance_date ON "PortfolioPerformance" (date);
   ```

## 📊 Monitoring

### Vercel Analytics
- Real-time performance metrics
- User behavior tracking
- Error monitoring

### Application Monitoring
- Check Vercel function logs
- Monitor API response times
- Set up alerts for errors

## 🎉 Success!

Your Financial Data Analysis & Risk Assessment System is now live!

### Features Available:
- ✅ Real-time financial dashboard
- ✅ Advanced risk assessment
- ✅ Portfolio management
- ✅ Live market data
- ✅ Interactive charts
- ✅ Mobile responsive design

### Next Steps:
1. **Customize**: Modify colors, add your branding
2. **Extend**: Add more financial data sources
3. **Scale**: Upgrade API plans for higher limits
4. **Monitor**: Set up analytics and alerts

---

**🚀 Your application is ready for production use!**
