-- Simple Financial Dashboard Database Schema
-- Run this in your Supabase SQL Editor

-- Create a simple portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  total_value DECIMAL(15,2) DEFAULT 0,
  total_cost DECIMAL(15,2) DEFAULT 0,
  daily_pnl DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a simple holdings table
CREATE TABLE IF NOT EXISTS holdings (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER REFERENCES portfolio(id),
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  shares DECIMAL(10,4) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  change_percent DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a simple risk table
CREATE TABLE IF NOT EXISTS risk_metrics (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER REFERENCES portfolio(id),
  risk_score DECIMAL(5,2) NOT NULL,
  risk_level TEXT NOT NULL,
  var_95 DECIMAL(15,2) NOT NULL,
  var_99 DECIMAL(15,2) NOT NULL,
  sharpe_ratio DECIMAL(5,2) NOT NULL,
  max_drawdown DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO portfolio (name, total_value, total_cost, daily_pnl) VALUES
('Demo Portfolio', 1250000.00, 1100000.00, 2450.00);

INSERT INTO holdings (portfolio_id, symbol, name, shares, current_price, total_value, change_percent) VALUES
(1, 'AAPL', 'Apple Inc.', 100, 150.00, 15000.00, 1.01),
(1, 'GOOGL', 'Alphabet Inc.', 50, 2800.00, 140000.00, -0.14),
(1, 'MSFT', 'Microsoft Corporation', 200, 350.00, 70000.00, 0.72);

INSERT INTO risk_metrics (portfolio_id, risk_score, risk_level, var_95, var_99, sharpe_ratio, max_drawdown) VALUES
(1, 65.5, 'High', 25000.00, 35000.00, 1.20, 0.15);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_holdings_portfolio_id ON holdings(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_risk_metrics_portfolio_id ON risk_metrics(portfolio_id);
