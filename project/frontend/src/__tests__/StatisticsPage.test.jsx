import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import StatisticsPage from '../pages/admin/StatisticsPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('StatisticsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    window.ResizeObserver = global.ResizeObserver;
  });

  test('renders KPI values', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        kpi: {
          total_equipment: 12,
          total_reservations: 41,
          total_users: 7,
          avg_duration_hours: 2.5,
          approval_rate: 75,
        },
        topEquipment: [{ equipment_name: 'Microscope A', reservation_count: 5 }],
        statusDistribution: [{ status: 'approved', count: 10 }],
        weeklyTrend: [{ week: '2025-01-01T00:00:00Z', count: 3 }],
      }),
    });

    render(<StatisticsPage />);

    expect(await screen.findByText('Ukupno opreme')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Ukupno rezervacija')).toBeInTheDocument();
  });
});
