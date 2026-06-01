import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MyActivityPage from '../pages/MyActivityPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('MyActivityPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('loads activity logs and filters by type', async () => {
    global.fetch = vi.fn((url) => {
      if (url.includes('type=maintenance_task_updated')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            logs: [
              { id: 2, action: 'maintenance_task_updated', details: 'Task updated', created_at: new Date().toISOString() },
            ],
            total: 1,
          }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          logs: [
            { id: 1, action: 'reservation_created', details: 'Reservation', created_at: new Date().toISOString() },
          ],
          total: 1,
        }),
      });
    });

    render(<MyActivityPage />);

    expect(await screen.findByText(/Rezervacija/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Maintenance' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('type=maintenance_task_updated'), expect.anything());
    });

    expect(await screen.findByText(/Zadatak/i)).toBeInTheDocument();
  });
});
