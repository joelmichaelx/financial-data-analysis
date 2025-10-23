'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface RiskAlertsProps {
  alerts?: Alert[];
}

export function RiskAlerts({ alerts }: RiskAlertsProps) {
  // Mock data for demonstration
  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High Volatility Detected',
      message: 'AAPL stock showing unusual price movements',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      severity: 'high',
    },
    {
      id: '2',
      type: 'error',
      title: 'Risk Threshold Exceeded',
      message: 'Portfolio risk score has exceeded acceptable limits',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      severity: 'critical',
    },
    {
      id: '3',
      type: 'info',
      title: 'Market Update',
      message: 'Market opening with increased trading volume',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      severity: 'low',
    },
  ];

  const alertData = alerts || mockAlerts;

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: Alert['type'], severity: Alert['severity']) => {
    if (type === 'error' || severity === 'critical') {
      return 'border-danger-200 bg-danger-50 text-danger-800';
    }
    if (type === 'warning' || severity === 'high') {
      return 'border-warning-200 bg-warning-50 text-warning-800';
    }
    if (type === 'info' || severity === 'medium') {
      return 'border-primary-200 bg-primary-50 text-primary-800';
    }
    return 'border-success-200 bg-success-50 text-success-800';
  };

  const getSeverityBadge = (severity: Alert['severity']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[severity]}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {alertData.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-lg p-3 ${getAlertColor(alert.type, alert.severity)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  {getSeverityBadge(alert.severity)}
                </div>
                <p className="text-sm opacity-90 mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-75">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                  <button className="text-xs underline hover:no-underline">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {alertData.length === 0 && (
        <div className="text-center py-8">
          <CheckCircleIcon className="h-12 w-12 text-success-400 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No active alerts</p>
        </div>
      )}
    </div>
  );
}
