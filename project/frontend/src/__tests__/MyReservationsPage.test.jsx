import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MyReservationsPage from '../pages/MyReservationsPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('MyReservationsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([
        {
          id: 5,
          equipment_name: 'Centrifuge X',
          start_time: '2025-01-01T10:00:00Z',
          end_time: '2025-01-01T11:00:00Z',
          status: 'pending',
        },
      ]),
    });
  });

  test('renders reservations from API', async () => {
    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    const items = await screen.findAllByText('Centrifuge X');
    expect(items.length).toBeGreaterThan(0);
  });
});
