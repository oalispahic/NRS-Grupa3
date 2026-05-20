import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ActivityLogPage from '../pages/admin/ActivityLogPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('ActivityLogPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
  });

  test('renders activity log rows', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({
        logs: [
          {
            id: 1,
            action: 'reservation_approved',
            full_name: 'Test User',
            email: 'test@example.com',
            details: 'Oprema: Microscope A',
            entity_type: 'reservation',
            entity_id: 5,
            created_at: '2026-05-20T10:00:00Z',
          },
        ],
        total: 1,
      }),
    });

    render(
      <MemoryRouter>
        <ActivityLogPage />
      </MemoryRouter>
    );

    const labels = await screen.findAllByText('Rezervacija odobrena');
    expect(labels.length).toBeGreaterThan(0);
    const users = await screen.findAllByText('Test User');
    expect(users.length).toBeGreaterThan(0);
  });
});
