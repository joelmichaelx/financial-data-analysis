# Financial Data Analysis & Risk Assessment System

A comprehensive, real-time financial dashboard built with **Next.js 14**, **TypeScript**, and **Supabase** for portfolio management, risk analysis, and market data visualization.

**Live Dashboard:** [https://financial-data-analysis-gray.vercel.app](https://financial-data-analysis-gray.vercel.app)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

### Portfolio Management
- **Real-time Portfolio Tracking** - Monitor portfolio value, cost basis, and daily P&L
- **Holdings Management** - Track multiple stocks with detailed position information
- **Performance Metrics** - View gains/losses, percentage changes, and daily movements

### Risk Assessment
- **Risk Score Analysis** - Comprehensive risk scoring with level classification
- **Value at Risk (VaR)** - 95% and 99% VaR calculations
- **Sharpe Ratio** - Risk-adjusted return metrics
- **Maximum Drawdown** - Track worst-case portfolio decline scenarios

### Market Data
- **Live Price Updates** - Real-time stock prices and market data
- **Change Tracking** - Monitor daily price changes and percentage movements
- **Multi-Asset Support** - Track diverse portfolio holdings

### User Interface
- **Modern Dashboard** - Clean, responsive design with Tailwind CSS
- **Real-time Updates** - Dynamic data fetching and display
- **Loading States** - Smooth loading animations
- **Responsive Design** - Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **API**: Next.js API Routes

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Git for version control

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/joelmichaelx/financial-data-analysis.git
cd "Financial Data Analysis & Risk Assessment System"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get your Supabase credentials from:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and anon/public key

### 4. Database Setup

Run the clean schema in your Supabase SQL Editor:

```bash
# Copy the contents of clean-schema.sql
# Paste into Supabase SQL Editor
# Execute the script
```

This will create:
- `portfolio` table - Stores portfolio information
- `holdings` table - Stores individual stock holdings
- `risk_metrics` table - Stores risk assessment data

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Financial Data Analysis & Risk Assessment System/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── portfolio/
│   │   │   │   └── route.ts          # Portfolio API endpoint
│   │   │   └── test-connection/
│   │   │       └── route.ts          # Database connection test
│   │   ├── simple/
│   │   │   └── page.tsx              # Simple dashboard view
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main dashboard
│   └── lib/
│       └── supabase.ts               # Supabase client configuration
├── clean-schema.sql                  # Clean database schema (RECOMMENDED)
├── schema.sql                        # Alternative schema
├── database-setup.sql                # Initial database setup
├── add-more-holdings.sql             # Script to add more holdings
├── simple-add-holdings.sql           # Simple holdings addition
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── next.config.js                    # Next.js configuration
└── README.md                         # This file
```

## Database Schema

### Portfolio Table
```sql
- id (SERIAL PRIMARY KEY)
- name (TEXT)
- total_value (DECIMAL)
- total_cost (DECIMAL)
- daily_pnl (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Holdings Table
```sql
- id (SERIAL PRIMARY KEY)
- portfolio_id (INTEGER, FK)
- symbol (TEXT)
- name (TEXT)
- shares (DECIMAL)
- current_price (DECIMAL)
- total_value (DECIMAL)
- change_percent (DECIMAL)
- created_at (TIMESTAMP)
```

### Risk Metrics Table
```sql
- id (SERIAL PRIMARY KEY)
- portfolio_id (INTEGER, FK)
- risk_score (DECIMAL)
- risk_level (TEXT)
- var_95 (DECIMAL)
- var_99 (DECIMAL)
- sharpe_ratio (DECIMAL)
- max_drawdown (DECIMAL)
- created_at (TIMESTAMP)
```

## Key Features Explained

### Portfolio Dashboard
The main dashboard (`src/app/page.tsx`) displays:
- **Total Portfolio Value** - Aggregate value of all holdings
- **Risk Score** - Overall portfolio risk assessment
- **Daily P&L** - Profit/Loss for the current day
- **Holdings Count** - Number of active positions

### Holdings Table
View detailed information for each stock:
- Stock symbol and company name
- Number of shares held
- Current price per share
- Total position value
- Daily percentage change

### Risk Metrics
Comprehensive risk analysis including:
- **VaR 95%** - Maximum expected loss at 95% confidence
- **VaR 99%** - Maximum expected loss at 99% confidence
- **Sharpe Ratio** - Risk-adjusted return measure
- **Max Drawdown** - Largest peak-to-trough decline

## Configuration

### Supabase Configuration
Edit `src/lib/supabase.ts` to customize your Supabase client:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Fallback Data
The application includes fallback data for when Supabase is not configured, making it easy to test the UI without a database connection.

## Sample Data

The `clean-schema.sql` file includes sample data for:
- 1 Demo Portfolio
- 10 Stock Holdings (AAPL, GOOGL, MSFT, TSLA, AMZN, NVDA, META, NFLX, JPM, JNJ)
- Risk metrics and analysis

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### GET `/api/portfolio`
Fetches complete portfolio data including:
- Portfolio summary
- All holdings
- Risk metrics

Response format:
```json
{
  "portfolio": {
    "id": 1,
    "name": "Demo Portfolio",
    "total_value": 1500000.00,
    "total_cost": 1200000.00,
    "daily_pnl": 30000.00
  },
  "holdings": [...],
  "risk_metrics": {...},
  "source": "database"
}
```

### GET `/api/test-connection`
Tests Supabase database connection and returns status.

## Security Features

- **Environment Variables** - Sensitive credentials stored securely
- **API Key Protection** - Supabase anon key used for client-side access
- **Row Level Security** - Configure RLS in Supabase for data protection
- **Fallback Mechanism** - Graceful degradation when database is unavailable

## Troubleshooting

### Database Connection Issues
1. Verify environment variables in `.env.local`
2. Check Supabase project status
3. Test connection using `/api/test-connection` endpoint

### Duplicate Holdings
The `clean-schema.sql` includes unique constraints to prevent duplicate symbols:
```sql
CREATE UNIQUE INDEX unique_holding_symbol_portfolio 
ON holdings(portfolio_id, symbol);
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Development

### Adding New Holdings
Use the provided SQL scripts to add holdings:

```sql
INSERT INTO holdings (portfolio_id, symbol, name, shares, current_price, total_value, change_percent) 
VALUES (1, 'SYMBOL', 'Company Name', shares, price, total, change);
```

### Modifying Risk Calculations
Edit the risk metrics in your database or extend the API logic in `src/app/api/portfolio/route.ts`.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Joel Omoroje

## Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- Vercel for hosting capabilities

## Support

For support, please open an issue in the GitHub repository or contact the maintainer.

---

**Built with Next.js and Supabase**
