'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
}

export function RealTimeDataFeed() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const mockData: MarketData[] = [
        {
          symbol: 'AAPL',
          price: 150 + Math.random() * 10,
          change: (Math.random() - 0.5) * 5,
          changePercent: (Math.random() - 0.5) * 2,
          volume: Math.floor(Math.random() * 1000000),
          timestamp: new Date().toISOString(),
        },
        {
          symbol: 'GOOGL',
          price: 2800 + Math.random() * 100,
          change: (Math.random() - 0.5) * 20,
          changePercent: (Math.random() - 0.5) * 1.5,
          volume: Math.floor(Math.random() * 500000),
          timestamp: new Date().toISOString(),
        },
        {
          symbol: 'MSFT',
          price: 350 + Math.random() * 20,
          change: (Math.random() - 0.5) * 8,
          changePercent: (Math.random() - 0.5) * 1.8,
          volume: Math.floor(Math.random() * 800000),
          timestamp: new Date().toISOString(),
        },
        {
          symbol: 'TSLA',
          price: 200 + Math.random() * 30,
          change: (Math.random() - 0.5) * 15,
          changePercent: (Math.random() - 0.5) * 3,
          volume: Math.floor(Math.random() * 1200000),
          timestamp: new Date().toISOString(),
        },
      ];
      
      setMarketData(mockData);
      setIsConnected(true);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success-500' : 'bg-danger-500'}`} />
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          Last update: {new Date().toLocaleTimeString()}
        </span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {marketData.map((data, index) => (
            <motion.div
              key={data.symbol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-600">
                    {data.symbol.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{data.symbol}</div>
                  <div className="text-xs text-gray-500">Vol: {formatVolume(data.volume)}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-gray-900">{formatPrice(data.price)}</div>
                <div className={`flex items-center text-sm ${
                  data.change >= 0 ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {data.change >= 0 ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
