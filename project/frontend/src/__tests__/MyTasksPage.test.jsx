import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MyTasksPage from '../pages/MyTasksPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('MyTasksPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('advances task status', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/maintenance/mine' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, title: 'Kalibracija', status: 'open', priority: 'medium', equipment_name: 'Microscope A' },
          ]),
        });
      }
      if (url === '/api/maintenance/1/status' && options?.method === 'PATCH') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ status: 'in_progress' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<MyTasksPage />);

    const advanceBtn = await screen.findByRole('button', { name: /u toku/i });
    fireEvent.click(advanceBtn);

    await waitFor(() => {
      const patchCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/maintenance/1/status' && opts?.method === 'PATCH'
      );
      expect(patchCall).toBeTruthy();
    });
  });
});
