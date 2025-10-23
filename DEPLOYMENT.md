# Deployment Guide

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account
- PostgreSQL database (Supabase, Railway, or PlanetScale)
- Financial data API keys (Alpha Vantage, Finnhub)

### Step 1: Push to GitHub

1. **Create a new repository on GitHub**
   ```bash
   # Add remote origin (replace with your GitHub username and repo name)
   git remote add origin https://github.com/yourusername/financial-data-analysis.git
   
   # Push to GitHub
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com/new)**
2. **Import your GitHub repository**
3. **Configure the project:**
   - Framework: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Environment Variables

Set these in your Vercel project settings:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app

# Financial Data APIs
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
FINNHUB_API_KEY=your-finnhub-key
POLYGON_API_KEY=your-polygon-key

# Optional
REDIS_URL=redis://username:password@host:port
```

### Step 4: Database Setup

#### Option A: Supabase (Recommended)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Get your database URL
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

#### Option B: Railway
1. Go to [Railway](https://railway.app)
2. Create a new PostgreSQL database
3. Get your connection string
4. Run migrations

#### Option C: PlanetScale
1. Go to [PlanetScale](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Run migrations

### Step 5: API Keys Setup

#### Alpha Vantage API
1. Go to [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Sign up for a free account
3. Get your API key
4. Add to Vercel environment variables

#### Finnhub API
1. Go to [Finnhub](https://finnhub.io/register)
2. Sign up for a free account
3. Get your API key
4. Add to Vercel environment variables

### Step 6: Deploy

1. **Trigger deployment** in Vercel dashboard
2. **Wait for build** to complete
3. **Test your application** at the provided URL

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Redis (optional)

### Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env.local

# Update .env.local with your values
# DATABASE_URL=postgresql://...
# ALPHA_VANTAGE_API_KEY=your-key
# etc.

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run dev
```

## 📊 Database Schema

The application uses the following main entities:
- **Users**: User authentication and profiles
- **Portfolios**: User portfolios
- **Holdings**: Individual stock holdings
- **MarketData**: Real-time market data
- **RiskAssessment**: Risk metrics and analysis
- **Alerts**: Risk alerts and notifications

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript errors: `npm run type-check`
   - Fix linting issues: `npm run lint`

2. **Database Connection**
   - Verify DATABASE_URL format
   - Check database is accessible
   - Run migrations: `npx prisma migrate deploy`

3. **API Errors**
   - Verify API keys are correct
   - Check API rate limits
   - Review API documentation

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Restart Vercel deployment after changes

### Performance Optimization

1. **Database Indexing**
   ```sql
   CREATE INDEX idx_market_data_symbol_timestamp ON "MarketData" (symbol, timestamp);
   CREATE INDEX idx_portfolio_performance_date ON "PortfolioPerformance" (date);
   ```

2. **Caching**
   - Enable Redis for caching
   - Use React Query for client-side caching
   - Implement API response caching

3. **CDN**
   - Vercel automatically provides CDN
   - Optimize images and static assets
   - Use Next.js Image component

## 📈 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor performance metrics
- Track user interactions

### Error Tracking
- Consider adding Sentry for error tracking
- Monitor API response times
- Set up alerts for critical errors

## 🔄 Updates and Maintenance

### Regular Updates
1. **Dependencies**: `npm update`
2. **Database**: Run migrations as needed
3. **API Keys**: Renew before expiration
4. **Security**: Keep dependencies updated

### Backup Strategy
1. **Database**: Regular automated backups
2. **Code**: Version control with Git
3. **Environment**: Document all configurations

## 📞 Support

For deployment issues:
1. Check Vercel logs in dashboard
2. Review GitHub repository
3. Consult documentation
4. Create GitHub issues for bugs

---

**Happy Deploying! 🎉**
