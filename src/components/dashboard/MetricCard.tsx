'use client';

import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

export function MetricCard({ title, value, change, changeType, icon: Icon }: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success-600';
      case 'negative':
        return 'text-danger-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <ArrowUpIcon className="h-4 w-4" />;
      case 'negative':
        return <ArrowDownIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="metric-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          <div className={`flex items-center text-sm ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="ml-1">{change}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
