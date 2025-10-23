import { useQuery } from 'react-query';
import { riskAssessmentService } from '@/services/riskAssessmentService';

export function useRiskAssessment() {
  return useQuery(
    'riskAssessment',
    () => riskAssessmentService.getRiskMetrics(),
    {
      refetchInterval: 60000, // Refetch every minute
      staleTime: 30000, // Consider data stale after 30 seconds
    }
  );
}

export function useRiskAlerts() {
  return useQuery(
    'riskAlerts',
    () => riskAssessmentService.getRiskAlerts(),
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );
}

export function useRiskHistory(timeframe: string = '1M') {
  return useQuery(
    ['riskHistory', timeframe],
    () => riskAssessmentService.getRiskHistory(timeframe),
    {
      refetchInterval: 300000, // Refetch every 5 minutes
    }
  );
}
