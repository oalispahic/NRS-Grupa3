import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ReservationsPage from '../pages/admin/ReservationsPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('ReservationsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve([
          {
            id: 1,
            equipment_name: 'Microscope A',
            full_name: 'Test User',
            email: 'user@example.com',
            start_time: '2025-01-01T10:00:00Z',
            end_time: '2025-01-01T11:00:00Z',
            status: 'pending',
          },
        ]),
      })
      .mockResolvedValueOnce({
        ok: true,
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });
  });

  test('approves reservation', async () => {
    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    const approveButtons = await screen.findAllByRole('button', { name: /odobri/i });
    fireEvent.click(approveButtons[0]);

    const patchCall = global.fetch.mock.calls[1];
    expect(patchCall[0]).toBe('/api/reservations/1/approve');
    expect(patchCall[1].method).toBe('PATCH');
  });
});
