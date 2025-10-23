import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface RiskMetrics {
  overallRisk: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskBreakdown: Array<{
    category: string;
    value: number;
    color: string;
  }>;
  activeAlerts: number;
  alerts: Array<{
    id: string;
    type: 'warning' | 'error' | 'info' | 'success';
    title: string;
    message: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
  var95: number; // Value at Risk 95%
  var99: number; // Value at Risk 99%
  expectedShortfall: number;
  maxDrawdown: number;
  sharpeRatio: number;
  beta: number;
  correlation: number;
}

export interface RiskHistory {
  date: string;
  riskScore: number;
  var95: number;
  var99: number;
  sharpeRatio: number;
}

class RiskAssessmentService {
  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async getRiskMetrics(): Promise<RiskMetrics> {
    // Mock risk assessment data
    const riskScore = 65 + Math.random() * 20; // Risk score between 65-85
    const riskLevel = this.getRiskLevel(riskScore);
    
    return {
      overallRisk: Math.round(riskScore),
      riskScore: Math.round(riskScore),
      riskLevel,
      riskBreakdown: [
        { category: 'Market Risk', value: 35, color: '#ef4444' },
        { category: 'Credit Risk', value: 25, color: '#f59e0b' },
        { category: 'Liquidity Risk', value: 20, color: '#3b82f6' },
        { category: 'Operational Risk', value: 15, color: '#10b981' },
        { category: 'Other', value: 5, color: '#8b5cf6' },
      ],
      activeAlerts: Math.floor(Math.random() * 5) + 1,
      alerts: this.generateMockAlerts(),
      var95: 25000,
      var99: 35000,
      expectedShortfall: 42000,
      maxDrawdown: 0.15,
      sharpeRatio: 1.2 + Math.random() * 0.5,
      beta: 0.8 + Math.random() * 0.4,
      correlation: 0.6 + Math.random() * 0.3,
    };
  }

  async getRiskAlerts() {
    return this.generateMockAlerts();
  }

  async getRiskHistory(timeframe: string): Promise<RiskHistory[]> {
    const days = this.getDaysFromTimeframe(timeframe);
    const data: RiskHistory[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        riskScore: 60 + Math.random() * 30,
        var95: 20000 + Math.random() * 10000,
        var99: 30000 + Math.random() * 15000,
        sharpeRatio: 1.0 + Math.random() * 0.8,
      });
    }

    return data;
  }

  private getRiskLevel(score: number): 'Low' | 'Medium' | 'High' | 'Critical' {
    if (score < 30) return 'Low';
    if (score < 60) return 'Medium';
    if (score < 80) return 'High';
    return 'Critical';
  }

  private getDaysFromTimeframe(timeframe: string): number {
    switch (timeframe) {
      case '1D': return 1;
      case '1W': return 7;
      case '1M': return 30;
      case '3M': return 90;
      case '1Y': return 365;
      default: return 30;
    }
  }

  private generateMockAlerts() {
    const alertTypes = ['warning', 'error', 'info', 'success'] as const;
    const severities = ['low', 'medium', 'high', 'critical'] as const;
    const alertTemplates = [
      {
        title: 'High Volatility Detected',
        message: 'Unusual price movements detected in portfolio holdings',
      },
      {
        title: 'Risk Threshold Exceeded',
        message: 'Portfolio risk score has exceeded acceptable limits',
      },
      {
        title: 'Market Update',
        message: 'Significant market movements affecting portfolio performance',
      },
      {
        title: 'Diversification Alert',
        message: 'Portfolio concentration risk has increased',
      },
      {
        title: 'Liquidity Warning',
        message: 'Low liquidity detected in some holdings',
      },
    ];

    const alerts = [];
    const numAlerts = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < numAlerts; i++) {
      const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
      const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      
      alerts.push({
        id: `alert-${i + 1}`,
        type,
        title: template.title,
        message: template.message,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        severity,
      });
    }

    return alerts;
  }
}

export const riskAssessmentService = new RiskAssessmentService();
