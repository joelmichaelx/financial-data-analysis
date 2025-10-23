-- Financial Data Analysis & Risk Assessment System Database Schema
-- Run this in your Supabase SQL Editor
-- This version handles existing tables gracefully

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS "RiskBreakdown" CASCADE;
DROP TABLE IF EXISTS "RiskAssessment" CASCADE;
DROP TABLE IF EXISTS "PortfolioPerformance" CASCADE;
DROP TABLE IF EXISTS "Holding" CASCADE;
DROP TABLE IF EXISTS "Portfolio" CASCADE;
DROP TABLE IF EXISTS "Session" CASCADE;
DROP TABLE IF EXISTS "Alert" CASCADE;
DROP TABLE IF EXISTS "RiskHistory" CASCADE;
DROP TABLE IF EXISTS "MarketData" CASCADE;
DROP TABLE IF EXISTS "ApiKey" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- Users table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Sessions table
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- Portfolios table
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- Holdings table
CREATE TABLE "Holding" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shares" DOUBLE PRECISION NOT NULL,
    "costBasis" DOUBLE PRECISION NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- Portfolio Performance table
CREATE TABLE "PortfolioPerformance" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "benchmark" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PortfolioPerformance_pkey" PRIMARY KEY ("id")
);

-- Market Data table
CREATE TABLE "MarketData" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercent" DOUBLE PRECISION NOT NULL,
    "volume" BIGINT NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "previousClose" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MarketData_pkey" PRIMARY KEY ("id")
);

-- Risk Assessment table
CREATE TABLE "RiskAssessment" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT,
    "overallRisk" DOUBLE PRECISION NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "var95" DOUBLE PRECISION NOT NULL,
    "var99" DOUBLE PRECISION NOT NULL,
    "expectedShortfall" DOUBLE PRECISION NOT NULL,
    "maxDrawdown" DOUBLE PRECISION NOT NULL,
    "sharpeRatio" DOUBLE PRECISION NOT NULL,
    "beta" DOUBLE PRECISION NOT NULL,
    "correlation" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RiskAssessment_pkey" PRIMARY KEY ("id")
);

-- Risk Breakdown table
CREATE TABLE "RiskBreakdown" (
    "id" TEXT NOT NULL,
    "riskAssessmentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RiskBreakdown_pkey" PRIMARY KEY ("id")
);

-- Alerts table
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- Risk History table
CREATE TABLE "RiskHistory" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "var95" DOUBLE PRECISION NOT NULL,
    "var99" DOUBLE PRECISION NOT NULL,
    "sharpeRatio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RiskHistory_pkey" PRIMARY KEY ("id")
);

-- API Keys table
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- Create indexes for better performance
CREATE INDEX "idx_market_data_symbol_timestamp" ON "MarketData" ("symbol", "timestamp");
CREATE INDEX "idx_portfolio_performance_date" ON "PortfolioPerformance" ("date");
CREATE INDEX "idx_risk_history_date" ON "RiskHistory" ("date");
CREATE INDEX "idx_alert_user_created" ON "Alert" ("userId", "createdAt");

-- Add foreign key constraints
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PortfolioPerformance" ADD CONSTRAINT "PortfolioPerformance_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RiskBreakdown" ADD CONSTRAINT "RiskBreakdown_riskAssessmentId_fkey" FOREIGN KEY ("riskAssessmentId") REFERENCES "RiskAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create unique constraints
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- Insert sample data
INSERT INTO "User" ("id", "email", "name", "createdAt", "updatedAt") VALUES 
('user-1', 'demo@financialanalysis.com', 'Demo User', NOW(), NOW());

INSERT INTO "Portfolio" ("id", "userId", "name", "description", "totalValue", "totalCost", "createdAt", "updatedAt") VALUES 
('portfolio-1', 'user-1', 'Demo Portfolio', 'Sample portfolio for demonstration', 1500000, 1200000, NOW(), NOW());

INSERT INTO "Holding" ("id", "portfolioId", "symbol", "name", "shares", "costBasis", "currentPrice", "totalValue", "weight", "createdAt", "updatedAt") VALUES 
('holding-1', 'portfolio-1', 'AAPL', 'Apple Inc.', 100, 12000, 150, 15000, 0.12, NOW(), NOW()),
('holding-2', 'portfolio-1', 'GOOGL', 'Alphabet Inc.', 50, 120000, 2800, 140000, 0.11, NOW(), NOW()),
('holding-3', 'portfolio-1', 'MSFT', 'Microsoft Corporation', 200, 60000, 350, 70000, 0.056, NOW(), NOW()),
('holding-4', 'portfolio-1', 'TSLA', 'Tesla Inc.', 75, 12000, 200, 15000, 0.12, NOW(), NOW()),
('holding-5', 'portfolio-1', 'AMZN', 'Amazon.com Inc.', 30, 90000, 3200, 96000, 0.077, NOW(), NOW()),
('holding-6', 'portfolio-1', 'NVDA', 'NVIDIA Corporation', 40, 15000, 450, 18000, 0.014, NOW(), NOW()),
('holding-7', 'portfolio-1', 'META', 'Meta Platforms Inc.', 60, 15000, 300, 18000, 0.014, NOW(), NOW()),
('holding-8', 'portfolio-1', 'NFLX', 'Netflix Inc.', 25, 8000, 400, 10000, 0.008, NOW(), NOW()),
('holding-9', 'portfolio-1', 'JPM', 'JPMorgan Chase & Co.', 150, 18000, 150, 22500, 0.018, NOW(), NOW()),
('holding-10', 'portfolio-1', 'JNJ', 'Johnson & Johnson', 100, 15000, 150, 15000, 0.12, NOW(), NOW());

INSERT INTO "RiskAssessment" ("id", "portfolioId", "overallRisk", "riskScore", "riskLevel", "var95", "var99", "expectedShortfall", "maxDrawdown", "sharpeRatio", "beta", "correlation", "createdAt") VALUES 
('risk-1', 'portfolio-1', 65.5, 65.5, 'High', 25000, 35000, 42000, 0.15, 1.2, 0.8, 0.6, NOW());

INSERT INTO "RiskBreakdown" ("id", "riskAssessmentId", "category", "value", "color", "createdAt") VALUES 
('breakdown-1', 'risk-1', 'Market Risk', 35, '#ef4444', NOW()),
('breakdown-2', 'risk-1', 'Credit Risk', 25, '#f59e0b', NOW()),
('breakdown-3', 'risk-1', 'Liquidity Risk', 20, '#3b82f6', NOW()),
('breakdown-4', 'risk-1', 'Operational Risk', 15, '#10b981', NOW()),
('breakdown-5', 'risk-1', 'Other', 5, '#8b5cf6', NOW());

-- Insert sample market data
INSERT INTO "MarketData" ("id", "symbol", "price", "change", "changePercent", "volume", "high", "low", "open", "previousClose", "timestamp", "createdAt") VALUES 
('market-1', 'AAPL', 150.25, 1.25, 0.84, 50000000, 151.00, 149.50, 149.00, 149.00, NOW(), NOW()),
('market-2', 'GOOGL', 2800.50, -15.25, -0.54, 2500000, 2820.00, 2795.00, 2815.75, 2815.75, NOW(), NOW()),
('market-3', 'MSFT', 350.75, 2.50, 0.72, 15000000, 352.00, 348.25, 348.25, 348.25, NOW(), NOW()),
('market-4', 'TSLA', 200.00, 5.00, 2.56, 75000000, 205.00, 195.00, 195.00, 195.00, NOW(), NOW()),
('market-5', 'AMZN', 3200.00, -27.50, -0.85, 8000000, 3230.00, 3180.00, 3227.50, 3227.50, NOW(), NOW()),
('market-6', 'NVDA', 450.00, 14.25, 3.25, 25000000, 455.00, 440.00, 435.75, 435.75, NOW(), NOW()),
('market-7', 'META', 300.00, 4.30, 1.45, 12000000, 305.00, 295.00, 295.70, 295.70, NOW(), NOW()),
('market-8', 'NFLX', 400.00, -4.85, -1.20, 6000000, 410.00, 395.00, 404.85, 404.85, NOW(), NOW()),
('market-9', 'JPM', 150.00, 1.25, 0.84, 15000000, 151.50, 148.75, 148.75, 148.75, NOW(), NOW()),
('market-10', 'JNJ', 150.00, 0.75, 0.50, 8000000, 151.00, 149.00, 149.25, 149.25, NOW(), NOW());

-- Insert sample alerts
INSERT INTO "Alert" ("id", "userId", "type", "title", "message", "severity", "isRead", "createdAt", "updatedAt") VALUES 
('alert-1', 'user-1', 'warning', 'High Volatility Detected', 'AAPL stock showing unusual price movements', 'high', false, NOW(), NOW()),
('alert-2', 'user-1', 'error', 'Risk Threshold Exceeded', 'Portfolio risk score has exceeded acceptable limits', 'critical', false, NOW(), NOW()),
('alert-3', 'user-1', 'info', 'Market Update', 'Market opening with increased trading volume', 'low', false, NOW(), NOW());

-- Insert sample risk history
INSERT INTO "RiskHistory" ("id", "date", "riskScore", "var95", "var99", "sharpeRatio", "createdAt") VALUES 
('history-1', NOW() - INTERVAL '1 day', 63.2, 24000, 33000, 1.15, NOW()),
('history-2', NOW() - INTERVAL '2 days', 67.8, 26000, 36000, 1.25, NOW()),
('history-3', NOW() - INTERVAL '3 days', 65.1, 25000, 35000, 1.20, NOW());

COMMIT;
