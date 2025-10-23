# 🗄️ Database Setup Guide

## Quick Setup (5 minutes)

### Step 1: Run SQL Schema in Supabase

1. **Go to your Supabase project**: [https://supabase.com/dashboard/project/vatfnqdkrqtbckcpmhgx](https://supabase.com/dashboard/project/vatfnqdkrqtbckcpmhgx)

2. **Open SQL Editor**:
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and paste the schema**:
   - Open the file `database/schema.sql` in this project
   - Copy the entire contents
   - Paste into the Supabase SQL Editor

4. **Run the query**:
   - Click "Run" button
   - Wait for completion (should take 10-30 seconds)

### Step 2: Verify Database Setup

After running the SQL, you should see:
- ✅ **9 tables created** (User, Portfolio, Holding, etc.)
- ✅ **Sample data inserted** (demo user, portfolio, holdings)
- ✅ **Indexes created** for performance
- ✅ **Foreign key constraints** established

### Step 3: Test Your Application

1. **Visit your Vercel deployment**: `https://financial-data-analysis.vercel.app`
2. **Check the dashboard**: Should show financial metrics
3. **Verify data loading**: Charts and data should populate
4. **Test responsiveness**: Try on mobile/tablet

## 🎯 What You'll Get

After database setup, your application will have:

### 📊 **Real-time Dashboard**
- Portfolio value: $1,250,000
- Risk score: 65.5 (High)
- Daily P&L: Live calculations
- Active alerts: 3 notifications

### 💼 **Portfolio Management**
- **Holdings**: AAPL, GOOGL, MSFT
- **Performance**: Historical tracking
- **Risk Analysis**: VaR, Sharpe Ratio, Beta
- **Alerts**: Automated risk notifications

### 📈 **Live Market Data**
- **AAPL**: $150.25 (+0.84%)
- **GOOGL**: $2,800.50 (-0.54%)
- **MSFT**: $350.75 (+0.72%)
- **TSLA**: $200.00 (+2.56%)

## 🔧 Troubleshooting

### If SQL fails:
1. **Check permissions**: Ensure you have admin access to Supabase
2. **Verify connection**: Test database connection in Supabase dashboard
3. **Check logs**: Look at Supabase logs for error details

### If app doesn't load data:
1. **Check environment variables**: Verify DATABASE_URL in Vercel
2. **Check API keys**: Ensure Alpha Vantage and Finnhub keys are set
3. **Check logs**: Look at Vercel function logs

### If charts don't display:
1. **Check browser console**: Look for JavaScript errors
2. **Verify data format**: Ensure API responses are correct
3. **Test API endpoints**: Visit `/api/financial-data` directly

## 🚀 Success!

Once the database is set up, your Financial Data Analysis & Risk Assessment System will be fully functional with:

- ✅ **Real-time financial monitoring**
- ✅ **Advanced risk assessment**
- ✅ **Portfolio management**
- ✅ **Live market data feeds**
- ✅ **Interactive dashboards**
- ✅ **Mobile responsive design**

**Total setup time: ~5 minutes**

---

**🎉 Your professional financial analysis platform is ready to go live!**
