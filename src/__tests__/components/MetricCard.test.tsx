import { render, screen } from '@testing-library/react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

describe('MetricCard', () => {
  it('renders metric card with correct data', () => {
    const mockProps = {
      title: 'Total Value',
      value: '$1,000,000',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon,
    };

    render(<MetricCard {...mockProps} />);

    expect(screen.getByText('Total Value')).toBeInTheDocument();
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    expect(screen.getByText('+5.2%')).toBeInTheDocument();
  });

  it('applies correct styling for positive change', () => {
    const mockProps = {
      title: 'Total Value',
      value: '$1,000,000',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon,
    };

    render(<MetricCard {...mockProps} />);

    const changeElement = screen.getByText('+5.2%');
    expect(changeElement).toHaveClass('text-success-600');
  });

  it('applies correct styling for negative change', () => {
    const mockProps = {
      title: 'Total Value',
      value: '$1,000,000',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: CurrencyDollarIcon,
    };

    render(<MetricCard {...mockProps} />);

    const changeElement = screen.getByText('-2.1%');
    expect(changeElement).toHaveClass('text-danger-600');
  });
});
