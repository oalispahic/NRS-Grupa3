import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminLayout from '../components/AdminLayout';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('AdminLayout notifications', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({
      user: { role: 'admin', full_name: 'Admin User' },
      token: 'token',
      logout: vi.fn(),
    });
  });

  test('loads notifications and marks all as read', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/notifications') {
        return Promise.resolve({
          json: () => Promise.resolve({
            unread: 1,
            notifications: [
              {
                id: 1,
                title: 'Rezervacija odobrena',
                message: 'Rezervacija je odobrena.',
                type: 'reservation_approved',
                is_read: false,
                created_at: '2026-05-20T10:00:00Z',
              },
            ],
          }),
        });
      }
      if (url === '/api/notifications/read-all') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(
      <MemoryRouter>
        <AdminLayout>
          <div>Child</div>
        </AdminLayout>
      </MemoryRouter>
    );

    const buttons = await screen.findAllByLabelText('Notifikacije');
    fireEvent.click(buttons[0]);

    expect(await screen.findByText('Označi sve kao pročitano')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Označi sve kao pročitano'));

    await waitFor(() => {
      const call = global.fetch.mock.calls.find(([u, o]) => u === '/api/notifications/read-all' && o?.method === 'PATCH');
      expect(call).toBeTruthy();
    });
  });
});
