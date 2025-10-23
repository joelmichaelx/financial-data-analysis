'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  ArrowTrendingUpIcon, 
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RiskAssessmentChart } from '@/components/charts/RiskAssessmentChart';
import { PortfolioPerformanceChart } from '@/components/charts/PortfolioPerformanceChart';
import { RealTimeDataFeed } from '@/components/data/RealTimeDataFeed';
import { RiskAlerts } from '@/components/alerts/RiskAlerts';

export default function Dashboard() {
  const [financialData, setFinancialData] = useState(null);
  const [riskMetrics, setRiskMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  useEffect(() => {
    // Load data on client side to avoid build-time issues
    const loadData = async () => {
      try {
        const [financialResponse, riskResponse] = await Promise.all([
          fetch('/api/financial-data'),
          fetch('/api/risk-assessment')
        ]);
        
        if (financialResponse.ok) {
          const financial = await financialResponse.json();
          setFinancialData(financial);
        }
        
        if (riskResponse.ok) {
          const risk = await riskResponse.json();
          setRiskMetrics(risk);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Fallback data for when API calls fail
  const fallbackData = {
    portfolioValue: 1250000,
    dailyPnL: 2450,
    totalReturn: 12.5,
    performanceData: [
      { date: '2024-01-01', value: 1000000, benchmark: 1000000 },
      { date: '2024-01-02', value: 1012000, benchmark: 1005000 },
      { date: '2024-01-03', value: 1028000, benchmark: 1012000 },
      { date: '2024-01-04', value: 1015000, benchmark: 1008000 },
      { date: '2024-01-05', value: 1032000, benchmark: 1015000 },
    ],
    holdings: [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 100, value: 15000, weight: 0.12, change: 150, changePercent: 1.01 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 50, value: 140000, weight: 0.11, change: -200, changePercent: -0.14 },
      { symbol: 'MSFT', name: 'Microsoft Corporation', shares: 200, value: 70000, weight: 0.056, change: 500, changePercent: 0.72 },
    ]
  };

  const fallbackRisk = {
    overallRisk: 65.5,
    riskScore: 65.5,
    riskLevel: 'High',
    var95: 25000,
    var99: 35000,
    expectedShortfall: 42000,
    maxDrawdown: 0.15,
    sharpeRatio: 1.2,
    beta: 0.8,
    correlation: 0.6,
    activeAlerts: 3,
    riskBreakdown: [
      { category: 'Market Risk', value: 35, color: '#ef4444' },
      { category: 'Credit Risk', value: 25, color: '#f59e0b' },
      { category: 'Liquidity Risk', value: 20, color: '#3b82f6' },
      { category: 'Operational Risk', value: 15, color: '#10b981' },
      { category: 'Other', value: 5, color: '#8b5cf6' },
    ],
    alerts: [
      { id: '1', type: 'warning', title: 'High Volatility Detected', message: 'AAPL stock showing unusual price movements', severity: 'high' },
      { id: '2', type: 'error', title: 'Risk Threshold Exceeded', message: 'Portfolio risk score has exceeded acceptable limits', severity: 'critical' },
      { id: '3', type: 'info', title: 'Market Update', message: 'Market opening with increased trading volume', severity: 'low' },
    ]
  };

  const data = financialData || fallbackData;
  const risk = riskMetrics || fallbackRisk;

  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: data?.portfolioValue ? `$${data.portfolioValue.toLocaleString()}` : '$1,250,000',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Risk Score',
      value: risk?.overallRisk ? risk.overallRisk.toString() : '65.5',
      change: '-2.3%',
      changeType: 'negative' as const,
      icon: ShieldCheckIcon,
    },
    {
      title: 'Daily P&L',
      value: data?.dailyPnL ? `$${data.dailyPnL.toLocaleString()}` : '$2,450',
      change: '+$2,450',
      changeType: 'positive' as const,
      icon: ArrowTrendingUpIcon,
    },
    {
      title: 'Active Alerts',
      value: risk?.activeAlerts ? risk.activeAlerts.toString() : '3',
      change: '+3',
      changeType: 'neutral' as const,
      icon: ExclamationTriangleIcon,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Real-time financial data analysis and risk assessment
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="input-field w-auto"
            >
              <option value="1D">1 Day</option>
              <option value="1W">1 Week</option>
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="1Y">1 Year</option>
            </select>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">
                  Portfolio Performance
                </h3>
              </div>
              <PortfolioPerformanceChart 
                data={data?.performanceData} 
                timeframe={selectedTimeframe}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">
                  Risk Assessment
                </h3>
              </div>
              <RiskAssessmentChart 
                data={risk?.riskBreakdown} 
                timeframe={selectedTimeframe}
              />
            </div>
          </motion.div>
        </div>

        {/* Real-time Data and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">
                  Real-time Market Data
                </h3>
              </div>
              <RealTimeDataFeed />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">
                  Risk Alerts
                </h3>
              </div>
              <RiskAlerts alerts={risk?.alerts} />
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
