-- Clean Financial Dashboard Database Schema
-- This matches the API expectations (lowercase table names)
-- Run this in your Supabase SQL Editor

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS risk_metrics CASCADE;
DROP TABLE IF EXISTS holdings CASCADE;
DROP TABLE IF EXISTS portfolio CASCADE;

-- Create portfolio table
CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  total_value DECIMAL(15,2) DEFAULT 0,
  total_cost DECIMAL(15,2) DEFAULT 0,
  daily_pnl DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create holdings table
CREATE TABLE holdings (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER REFERENCES portfolio(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  shares DECIMAL(10,4) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  change_percent DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create risk metrics table
CREATE TABLE risk_metrics (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER REFERENCES portfolio(id) ON DELETE CASCADE,
  risk_score DECIMAL(5,2) NOT NULL,
  risk_level TEXT NOT NULL,
  var_95 DECIMAL(15,2) NOT NULL,
  var_99 DECIMAL(15,2) NOT NULL,
  sharpe_ratio DECIMAL(5,2) NOT NULL,
  max_drawdown DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraints to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS unique_holding_symbol_portfolio ON holdings(portfolio_id, symbol);
CREATE UNIQUE INDEX IF NOT EXISTS unique_risk_metrics_portfolio ON risk_metrics(portfolio_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_holdings_portfolio_id ON holdings(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_risk_metrics_portfolio_id ON risk_metrics(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_holdings_symbol ON holdings(symbol);

-- Insert sample portfolio data
INSERT INTO portfolio (name, total_value, total_cost, daily_pnl) VALUES
('Demo Portfolio', 1500000.00, 1200000.00, 30000.00);

-- Insert sample holdings data (10 different stocks)
INSERT INTO holdings (portfolio_id, symbol, name, shares, current_price, total_value, change_percent) VALUES
(1, 'AAPL', 'Apple Inc.', 100, 150.00, 15000.00, 1.01),
(1, 'GOOGL', 'Alphabet Inc.', 50, 2800.00, 140000.00, -0.14),
(1, 'MSFT', 'Microsoft Corporation', 200, 350.00, 70000.00, 0.72),
(1, 'TSLA', 'Tesla Inc.', 75, 200.00, 15000.00, 2.56),
(1, 'AMZN', 'Amazon.com Inc.', 30, 3200.00, 96000.00, -0.85),
(1, 'NVDA', 'NVIDIA Corporation', 40, 450.00, 18000.00, 3.25),
(1, 'META', 'Meta Platforms Inc.', 60, 300.00, 18000.00, 1.45),
(1, 'NFLX', 'Netflix Inc.', 25, 400.00, 10000.00, -1.20),
(1, 'JPM', 'JPMorgan Chase & Co.', 150, 150.00, 22500.00, 0.84),
(1, 'JNJ', 'Johnson & Johnson', 100, 150.00, 15000.00, 0.50);

-- Insert sample risk metrics
INSERT INTO risk_metrics (portfolio_id, risk_score, risk_level, var_95, var_99, sharpe_ratio, max_drawdown) VALUES
(1, 65.5, 'High', 25000.00, 35000.00, 1.20, 0.15);

COMMIT;
