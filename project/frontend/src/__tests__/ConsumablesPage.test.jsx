import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ConsumablesPage from '../pages/admin/ConsumablesPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('ConsumablesPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('creates new consumable item', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/consumables' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/consumables' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, name: 'Staklene plocice' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<ConsumablesPage />);

    fireEvent.change(await screen.findByPlaceholderText(/Staklene/i), {
      target: { value: 'Staklene plocice' },
    });

    fireEvent.click(screen.getByRole('button', { name: /dodaj stavku/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/consumables' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
    });
  });

  test('adjusts consumable quantity', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/consumables' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, name: 'Epruvete', unit: 'kom', quantity: 3, low_stock_threshold: 2 },
          ]),
        });
      }
      if (url === '/api/consumables/1/adjust' && options?.method === 'PATCH') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<ConsumablesPage />);

    const adjustButton = await screen.findByRole('button', { name: /zalihu/i });
    fireEvent.click(adjustButton);

    fireEvent.change(screen.getByPlaceholderText('npr. 10 ili -3'), {
      target: { value: '5' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Razlog/i), {
      target: { value: 'Dopuna' },
    });

    fireEvent.click(screen.getByRole('button', { name: /spremi/i }));

    await waitFor(() => {
      const patchCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/consumables/1/adjust' && opts?.method === 'PATCH'
      );
      expect(patchCall).toBeTruthy();
      expect(JSON.parse(patchCall[1].body)).toEqual({ change: 5, note: 'Dopuna' });
    });
  });
});
