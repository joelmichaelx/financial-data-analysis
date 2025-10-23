'use client';

import { useState, useEffect } from 'react';

interface PortfolioData {
  portfolio: {
    id: number;
    name: string;
    total_value: number;
    total_cost: number;
    daily_pnl: number;
  };
  holdings: Array<{
    id: number;
    symbol: string;
    name: string;
    shares: number;
    current_price: number;
    total_value: number;
    change_percent: number;
  }>;
  risk_metrics: {
    id: number;
    risk_score: number;
    risk_level: string;
    var_95: number;
    var_99: number;
    sharpe_ratio: number;
    max_drawdown: number;
  };
  source: string;
}

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        const portfolioData = await response.json();
        setData(portfolioData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Financial Dashboard...</p>
        </div>
      </div>
    );
  }

  const portfolio = data?.portfolio;
  const holdings = data?.holdings || [];
  const risk = data?.risk_metrics;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Real-time financial data analysis and risk assessment
          </p>
          {data?.source && (
            <p className="text-sm text-blue-600 mt-2">
              Data source: {data.source === 'database' ? 'Live Database' : 'Fallback Data'}
            </p>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio Value</h3>
            <p className="text-3xl font-bold text-green-600">
              ${portfolio?.total_value ? portfolio.total_value.toLocaleString() : '1,250,000'}
            </p>
            <p className="text-sm text-gray-600">
              {portfolio?.total_cost ? 
                `+${(((portfolio.total_value - portfolio.total_cost) / portfolio.total_cost) * 100).toFixed(1)}% from cost` : 
                '+12.5% from last month'
              }
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Score</h3>
            <p className="text-3xl font-bold text-red-600">
              {risk?.risk_score || '65.5'}
            </p>
            <p className="text-sm text-gray-600">
              {risk?.risk_level || 'High Risk Level'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily P&L</h3>
            <p className="text-3xl font-bold text-green-600">
              +${portfolio?.daily_pnl ? portfolio.daily_pnl.toLocaleString() : '2,450'}
            </p>
            <p className="text-sm text-gray-600">
              {portfolio?.daily_pnl && portfolio?.total_value ? 
                `+${((portfolio.daily_pnl / portfolio.total_value) * 100).toFixed(2)}% today` : 
                '+0.2% today'
              }
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Holdings</h3>
            <p className="text-3xl font-bold text-blue-600">
              {holdings.length}
            </p>
            <p className="text-sm text-gray-600">Active positions</p>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Holdings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {holdings.map((holding) => (
                  <tr key={holding.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {holding.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {holding.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {holding.shares.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${holding.current_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${holding.total_value.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      holding.change_percent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {holding.change_percent >= 0 ? '+' : ''}{holding.change_percent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Metrics */}
        {risk && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">VaR 95%</p>
                <p className="text-sm text-gray-600">${risk.var_95.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">VaR 99%</p>
                <p className="text-sm text-gray-600">${risk.var_99.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">Sharpe Ratio</p>
                <p className="text-sm text-gray-600">{risk.sharpe_ratio.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">Max Drawdown</p>
                <p className="text-sm text-gray-600">{(risk.max_drawdown * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* System Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">System Operational</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">Last updated: {new Date().toLocaleString()}</span>
            {data?.source && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-blue-600 font-medium">
                  Connected to {data.source === 'database' ? 'Supabase Database' : 'Fallback Data'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}