import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UsersAdminPage from '../pages/admin/UsersAdminPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('UsersAdminPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token', user: { id: 1 } });
    vi.clearAllMocks();
  });

  test('changes user role', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/users' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, full_name: 'Admin', email: 'admin@example.com', role: 'admin', is_active: true },
            { id: 2, full_name: 'User A', email: 'user@example.com', role: 'laborant', is_active: true },
          ]),
        });
      }
      if (url === '/api/users/2/role' && options?.method === 'PATCH') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 2, role: 'admin' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<UsersAdminPage />);

    const selects = await screen.findAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'admin' } });

    await waitFor(() => {
      const patchCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/users/2/role' && opts?.method === 'PATCH'
      );
      expect(patchCall).toBeTruthy();
      expect(JSON.parse(patchCall[1].body)).toEqual({ role: 'admin' });
    });
  });

  test('toggles user active state', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/users' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, full_name: 'Admin', email: 'admin@example.com', role: 'admin', is_active: true },
            { id: 2, full_name: 'User A', email: 'user@example.com', role: 'laborant', is_active: true },
          ]),
        });
      }
      if (url === '/api/users/2/active' && options?.method === 'PATCH') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 2, is_active: false }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<UsersAdminPage />);

    const toggleButtons = await screen.findAllByRole('button', { name: /deaktiviraj/i });
    fireEvent.click(toggleButtons[0]);

    await waitFor(() => {
      const patchCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/users/2/active' && opts?.method === 'PATCH'
      );
      expect(patchCall).toBeTruthy();
      expect(JSON.parse(patchCall[1].body)).toEqual({ is_active: false });
    });
  });
});
