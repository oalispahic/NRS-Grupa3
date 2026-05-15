import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MyReservationsPage from '../pages/MyReservationsPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('MyReservationsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('shows edit actions only for editable statuses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([
        {
          id: 1,
          equipment_name: 'Microscope A',
          start_time: '2025-01-01T10:00:00Z',
          end_time: '2025-01-01T11:00:00Z',
          status: 'pending',
        },
        {
          id: 2,
          equipment_name: 'Centrifuge B',
          start_time: '2025-01-02T10:00:00Z',
          end_time: '2025-01-02T11:00:00Z',
          status: 'approved',
        },
        {
          id: 3,
          equipment_name: 'Scale C',
          start_time: '2025-01-03T10:00:00Z',
          end_time: '2025-01-03T11:00:00Z',
          status: 'rejected',
        },
      ]),
    });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    const rejectedItems = await screen.findAllByText('Scale C');
    expect(rejectedItems.length).toBeGreaterThan(0);
    const editButtons = await screen.findAllByText(/uredi/i);
    expect(editButtons.length).toBe(4);
  });

  test('sends cancel request from edit panel', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve([
          {
            id: 5,
            equipment_name: 'Centrifuge X',
            start_time: '2025-01-01T10:00:00Z',
            end_time: '2025-01-01T11:00:00Z',
            status: 'pending',
          },
        ]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    const editButtons = await screen.findAllByText(/uredi/i);
    fireEvent.click(editButtons[0]);

    const cancelButton = await screen.findByRole('button', { name: /otka/i });
    fireEvent.click(cancelButton);

    const confirmButton = await screen.findByRole('button', { name: /da, otk/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      const deleteCall = global.fetch.mock.calls[1];
      expect(deleteCall[0]).toBe('/api/reservations/5');
      expect(deleteCall[1].method).toBe('DELETE');
    });
  });
});
