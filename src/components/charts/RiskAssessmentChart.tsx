'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface RiskBreakdown {
  category: string;
  value: number;
  color: string;
}

interface RiskAssessmentChartProps {
  data?: RiskBreakdown[];
  timeframe: string;
}

export function RiskAssessmentChart({ data, timeframe }: RiskAssessmentChartProps) {
  // Mock data for demonstration
  const mockData = [
    { category: 'Market Risk', value: 35, color: '#ef4444' },
    { category: 'Credit Risk', value: 25, color: '#f59e0b' },
    { category: 'Liquidity Risk', value: 20, color: '#3b82f6' },
    { category: 'Operational Risk', value: 15, color: '#10b981' },
    { category: 'Other', value: 5, color: '#8b5cf6' },
  ];

  const chartData = data || mockData;

  const formatTooltipValue = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatTooltipValue(value), 'Risk Level']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
