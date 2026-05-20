import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import DashboardPage from '../pages/DashboardPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({
      user: { role: 'admin', full_name: 'Admin User' },
      token: 'token',
    });
  });

  test('renders admin quick links', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve([{ id: 1, status: 'available', name: 'Microscope A' }]),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Upravljanje opremom')).toBeInTheDocument();
  });

  test('renders mosaic and timeline for admin', async () => {
    const start = new Date(Date.now() + 3600000).toISOString();
    const end = new Date(Date.now() + 7200000).toISOString();

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve([
          { id: 1, status: 'available', name: 'Microscope A' },
        ]),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([
          { id: 10, status: 'approved', equipment_name: 'Microscope A', start_time: start, end_time: end },
        ]),
      });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Status mozaik opreme')).toBeInTheDocument();
    expect(await screen.findByText('Zauzeta oprema — narednih 7 dana')).toBeInTheDocument();
  });
});
