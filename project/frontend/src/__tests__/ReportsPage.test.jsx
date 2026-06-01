import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ReportsPage from '../pages/admin/ReportsPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('ReportsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    window.print = vi.fn();
    vi.clearAllMocks();
  });

  test('generates report and allows PDF export', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        kpi: {
          total_reservations: 8,
          approved: 6,
          rejected: 1,
          pending: 1,
          approval_rate: 75,
          avg_duration_hours: 2,
        },
        topEquipment: [],
        trend: [],
        statusBreakdown: [],
        topUsers: [],
      }),
    });

    render(<ReportsPage />);

    fireEvent.click(screen.getByRole('button', { name: /generiraj/i }));

    expect(await screen.findByText('Ukupno rezervacija')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /exportuj/i }));

    expect(window.print).toHaveBeenCalled();
  });
});
