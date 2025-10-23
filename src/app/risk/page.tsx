'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RiskAssessmentChart } from '@/components/charts/RiskAssessmentChart';
import { RiskAlerts } from '@/components/alerts/RiskAlerts';
import { useRiskAssessment, useRiskHistory } from '@/hooks/useRiskAssessment';

export default function RiskAnalysisPage() {
  const { riskMetrics, isLoading } = useRiskAssessment();
  const { data: riskHistory } = useRiskHistory('1M');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const riskMetricsData = [
    {
      title: 'Overall Risk Score',
      value: riskMetrics?.riskScore || '0',
      change: '-2.3%',
      changeType: 'negative' as const,
      icon: ShieldCheckIcon,
      description: 'Current portfolio risk level',
    },
    {
      title: 'Value at Risk (95%)',
      value: `$${riskMetrics?.var95?.toLocaleString() || '0'}`,
      change: '+$1,200',
      changeType: 'positive' as const,
      icon: ExclamationTriangleIcon,
      description: 'Maximum expected loss',
    },
    {
      title: 'Sharpe Ratio',
      value: riskMetrics?.sharpeRatio?.toFixed(2) || '0.00',
      change: '+0.15',
      changeType: 'positive' as const,
      icon: ChartBarIcon,
      description: 'Risk-adjusted returns',
    },
    {
      title: 'Max Drawdown',
      value: `${(riskMetrics?.maxDrawdown * 100)?.toFixed(1) || '0'}%`,
      change: '-0.5%',
      changeType: 'negative' as const,
      icon: ClockIcon,
      description: 'Maximum peak-to-trough decline',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive risk assessment and monitoring
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

        {/* Risk Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskMetricsData.map((metric, index) => (
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
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-xs text-gray-500 mb-2">{metric.description}</p>
                  <div className={`flex items-center text-sm ${
                    metric.changeType === 'positive' ? 'text-success-600' : 
                    metric.changeType === 'negative' ? 'text-danger-600' : 'text-gray-600'
                  }`}>
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
                  Risk Breakdown
                </h3>
              </div>
              <RiskAssessmentChart 
                data={riskMetrics?.riskBreakdown} 
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
                  Risk Alerts
                </h3>
              </div>
              <RiskAlerts alerts={riskMetrics?.alerts} />
            </div>
          </motion.div>
        </div>

        {/* Risk History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Risk History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VaR 95%
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VaR 99%
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sharpe Ratio
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {riskHistory?.slice(0, 10).map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.riskScore.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${record.var95.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${record.var99.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.sharpeRatio.toFixed(2)}
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
