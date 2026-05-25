import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SettingsPage from '../pages/admin/SettingsPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('saves reservation rules', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/settings' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { key: 'max_reservation_days', value: '7' },
            { key: 'max_advance_days', value: '30' },
            { key: 'max_active_reservations', value: '3' },
          ]),
        });
      }
      if (url === '/api/settings' && options?.method === 'PUT') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<SettingsPage />);

    const daysInput = await screen.findByDisplayValue('7');
    fireEvent.change(daysInput, { target: { value: '10' } });

    fireEvent.click(screen.getByRole('button', { name: /spremi pravila/i }));

    await waitFor(() => {
      const putCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/settings' && opts?.method === 'PUT'
      );
      expect(putCall).toBeTruthy();
      expect(JSON.parse(putCall[1].body)).toEqual({
        max_reservation_days: 10,
        max_advance_days: 30,
        max_active_reservations: 3,
      });
    });
  });
});
