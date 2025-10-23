'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  TrendingUpIcon, 
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
import { useFinancialData } from '@/hooks/useFinancialData';
import { useRiskAssessment } from '@/hooks/useRiskAssessment';

export default function Dashboard() {
  const { data: financialData, isLoading: dataLoading } = useFinancialData();
  const { riskMetrics, isLoading: riskLoading } = useRiskAssessment();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: financialData?.portfolioValue || '$0',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Risk Score',
      value: riskMetrics?.overallRisk || '0',
      change: '-2.3%',
      changeType: 'negative' as const,
      icon: ShieldCheckIcon,
    },
    {
      title: 'Daily P&L',
      value: financialData?.dailyPnL || '$0',
      change: '+$2,450',
      changeType: 'positive' as const,
      icon: TrendingUpIcon,
    },
    {
      title: 'Active Alerts',
      value: riskMetrics?.activeAlerts || '0',
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
                data={financialData?.performanceData} 
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
                data={riskMetrics?.riskBreakdown} 
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
              <RiskAlerts alerts={riskMetrics?.alerts} />
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
