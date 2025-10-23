'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PerformanceData {
  date: string;
  value: number;
  benchmark?: number;
}

interface PortfolioPerformanceChartProps {
  data?: PerformanceData[];
  timeframe: string;
}

export function PortfolioPerformanceChart({ data, timeframe }: PortfolioPerformanceChartProps) {
  // Mock data for demonstration
  const mockData = [
    { date: '2024-01-01', value: 100000, benchmark: 100000 },
    { date: '2024-01-02', value: 101200, benchmark: 100500 },
    { date: '2024-01-03', value: 102800, benchmark: 101200 },
    { date: '2024-01-04', value: 101500, benchmark: 100800 },
    { date: '2024-01-05', value: 103200, benchmark: 101500 },
    { date: '2024-01-06', value: 104500, benchmark: 102200 },
    { date: '2024-01-07', value: 103800, benchmark: 101800 },
  ];

  const chartData = data || mockData;

  const formatXAxisLabel = (tickItem: string) => {
    const date = new Date(tickItem);
    return format(date, 'MMM dd');
  };

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxisLabel}
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip
            formatter={(value: number) => [formatTooltipValue(value), 'Portfolio Value']}
            labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
          {chartData[0]?.benchmark && (
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
