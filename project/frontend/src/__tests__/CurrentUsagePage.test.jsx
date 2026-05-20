import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import CurrentUsagePage from '../pages/admin/CurrentUsagePage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('CurrentUsagePage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
  });

  test('shows active reservations and refreshes', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([
        {
          id: 1,
          equipment_name: 'Microscope A',
          location: 'Lab 1',
          full_name: 'Ana Admin',
          email: 'ana@example.com',
          start_time: '2026-05-20T09:00:00Z',
          end_time: '2026-05-20T11:00:00Z',
        },
      ]),
    });

    render(
      <MemoryRouter>
        <CurrentUsagePage />
      </MemoryRouter>
    );

    expect(await screen.findByText('1 stavka')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Osvježi/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
