import { useQuery } from 'react-query';
import { financialDataService } from '@/services/financialDataService';

export function useFinancialData() {
  return useQuery(
    'financialData',
    () => financialDataService.getFinancialData(),
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      staleTime: 10000, // Consider data stale after 10 seconds
    }
  );
}

export function usePortfolioData() {
  return useQuery(
    'portfolioData',
    () => financialDataService.getPortfolioData(),
    {
      refetchInterval: 60000, // Refetch every minute
    }
  );
}

export function useMarketData(symbols: string[]) {
  return useQuery(
    ['marketData', symbols],
    () => financialDataService.getMarketData(symbols),
    {
      refetchInterval: 5000, // Refetch every 5 seconds for real-time data
      enabled: symbols.length > 0,
    }
  );
}
