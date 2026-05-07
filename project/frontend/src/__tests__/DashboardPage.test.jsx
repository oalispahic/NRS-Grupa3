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
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([{ id: 1 }]),
    });
  });

  test('renders admin quick links', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Upravljanje opremom')).toBeInTheDocument();
  });
});
