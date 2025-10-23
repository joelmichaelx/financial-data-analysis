'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PortfolioPerformanceChart } from '@/components/charts/PortfolioPerformanceChart';
import { usePortfolioData } from '@/hooks/useFinancialData';

export default function PortfolioPage() {
  const { data: portfolioData, isLoading } = usePortfolioData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const portfolioMetrics = [
    {
      title: 'Total Value',
      value: portfolioData?.totalValue ? `$${portfolioData.totalValue.toLocaleString()}` : '$0',
      change: portfolioData?.dayChange ? `$${portfolioData.dayChange.toLocaleString()}` : '$0',
      changeType: (portfolioData?.dayChange || 0) >= 0 ? 'positive' as const : 'negative' as const,
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Total Gain',
      value: portfolioData?.totalGain ? `$${portfolioData.totalGain.toLocaleString()}` : '$0',
      change: portfolioData?.totalGainPercent ? `+${portfolioData.totalGainPercent.toFixed(2)}%` : '+0%',
      changeType: 'positive' as const,
      icon: ArrowTrendingUpIcon,
    },
    {
      title: 'Day Change',
      value: portfolioData?.dayChange ? `$${portfolioData.dayChange.toLocaleString()}` : '$0',
      change: portfolioData?.dayChangePercent ? `${portfolioData.dayChangePercent >= 0 ? '+' : ''}${portfolioData.dayChangePercent.toFixed(2)}%` : '+0%',
      changeType: (portfolioData?.dayChangePercent || 0) >= 0 ? 'positive' as const : 'negative' as const,
      icon: ChartBarIcon,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
            <p className="text-gray-600 mt-1">
              Portfolio performance and holdings overview
            </p>
          </div>
          <div className="flex items-center space-x-4">
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

        {/* Portfolio Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                  <div className={`flex items-center text-sm ${
                    metric.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Portfolio Performance
              </h3>
            </div>
            <PortfolioPerformanceChart 
              data={portfolioData?.performanceData} 
              timeframe={selectedTimeframe}
            />
          </div>
        </motion.div>

        {/* Holdings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Holdings
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shares
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gain/Loss
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {portfolioData?.holdings?.map((holding, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-primary-600">
                              {holding.symbol.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {holding.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {holding.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {holding.shares.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${holding.currentPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${holding.totalValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {holding.gain >= 0 ? (
                            <ArrowUpIcon className="h-4 w-4 text-success-600 mr-1" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 text-danger-600 mr-1" />
                          )}
                          <span className={`text-sm ${
                            holding.gain >= 0 ? 'text-success-600' : 'text-danger-600'
                          }`}>
                            ${holding.gain.toLocaleString()} ({holding.gainPercent >= 0 ? '+' : ''}{holding.gainPercent.toFixed(2)}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(holding.weight * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
