import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const prisma = new PrismaClient();

export interface FinancialData {
  portfolioValue: number;
  dailyPnL: number;
  totalReturn: number;
  performanceData: Array<{
    date: string;
    value: number;
    benchmark?: number;
  }>;
  holdings: Array<{
    symbol: string;
    name: string;
    shares: number;
    value: number;
    weight: number;
    change: number;
    changePercent: number;
  }>;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: string;
}

export interface PortfolioData {
  totalValue: number;
  totalCost: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  performanceData: Array<{
    date: string;
    value: number;
    benchmark?: number;
  }>;
  holdings: Array<{
    symbol: string;
    name: string;
    shares: number;
    currentPrice: number;
    totalValue: number;
    costBasis: number;
    gain: number;
    gainPercent: number;
    weight: number;
  }>;
}

class FinancialDataService {
  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async getFinancialData(): Promise<FinancialData> {
    try {
      // Try to fetch from database first
      const portfolio = await prisma.portfolio.findFirst({
        include: {
          holdings: true,
          performance: {
            orderBy: { date: 'desc' },
            take: 30
          }
        }
      });

      if (portfolio) {
        const totalValue = portfolio.totalValue;
        const totalCost = portfolio.totalCost;
        const dailyPnL = totalValue - totalCost;
        const totalReturn = ((totalValue - totalCost) / totalCost) * 100;

        return {
          portfolioValue: totalValue,
          dailyPnL: dailyPnL,
          totalReturn: totalReturn,
          performanceData: portfolio.performance.map(p => ({
            date: p.date.toISOString().split('T')[0],
            value: p.value,
            benchmark: p.benchmark || undefined,
          })),
          holdings: portfolio.holdings.map(h => ({
            symbol: h.symbol,
            name: h.name,
            shares: h.shares,
            value: h.totalValue,
            weight: h.weight,
            change: h.currentPrice - h.costBasis,
            changePercent: ((h.currentPrice - h.costBasis) / h.costBasis) * 100,
          })),
        };
      }

      // Fallback to mock data if no database data
      return {
        portfolioValue: 1250000,
        dailyPnL: 2450,
        totalReturn: 12.5,
        performanceData: this.generateMockPerformanceData(),
        holdings: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            shares: 100,
            value: 15000,
            weight: 0.12,
            change: 150,
            changePercent: 1.01,
          },
          {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            shares: 50,
            value: 140000,
            weight: 0.11,
            change: -200,
            changePercent: -0.14,
          },
          {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            shares: 200,
            value: 70000,
            weight: 0.056,
            change: 500,
            changePercent: 0.72,
          },
        ],
      };
    } catch (error) {
      console.error('Error fetching financial data:', error);
      // Return mock data as fallback
      return {
        portfolioValue: 1250000,
        dailyPnL: 2450,
        totalReturn: 12.5,
        performanceData: this.generateMockPerformanceData(),
        holdings: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            shares: 100,
            value: 15000,
            weight: 0.12,
            change: 150,
            changePercent: 1.01,
          },
          {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            shares: 50,
            value: 140000,
            weight: 0.11,
            change: -200,
            changePercent: -0.14,
          },
          {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            shares: 200,
            value: 70000,
            weight: 0.056,
            change: 500,
            changePercent: 0.72,
          },
        ],
      };
    }
  }

  async getPortfolioData(): Promise<PortfolioData> {
    return {
      totalValue: 1250000,
      totalCost: 1100000,
      totalGain: 150000,
      totalGainPercent: 13.64,
      dayChange: 2450,
      dayChangePercent: 0.2,
      performanceData: this.generateMockPerformanceData(),
      holdings: [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          shares: 100,
          currentPrice: 150,
          totalValue: 15000,
          costBasis: 12000,
          gain: 3000,
          gainPercent: 25,
          weight: 0.12,
        },
        {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          shares: 50,
          currentPrice: 2800,
          totalValue: 140000,
          costBasis: 120000,
          gain: 20000,
          gainPercent: 16.67,
          weight: 0.11,
        },
      ],
    };
  }

  async getMarketData(symbols: string[]): Promise<MarketData[]> {
    // Mock market data
    return symbols.map(symbol => ({
      symbol,
      price: 100 + Math.random() * 1000,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 1000000),
      high: 100 + Math.random() * 1000 + 10,
      low: 100 + Math.random() * 1000 - 10,
      open: 100 + Math.random() * 1000,
      previousClose: 100 + Math.random() * 1000,
      timestamp: new Date().toISOString(),
    }));
  }

  private generateMockPerformanceData() {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    let value = 1000000;

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Simulate realistic market movements
      const change = (Math.random() - 0.5) * 0.02; // ±1% daily change
      value *= (1 + change);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(value),
        benchmark: Math.round(1000000 * (1 + i * 0.001)), // Slight upward trend
      });
    }

    return data;
  }
}

export const financialDataService = new FinancialDataService();
