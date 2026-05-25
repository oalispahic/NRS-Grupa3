import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LocationsPage from '../pages/admin/LocationsPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('LocationsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('creates a new location', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/locations' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/locations' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, name: 'Lab A' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<LocationsPage />);

    fireEvent.change(await screen.findByPlaceholderText(/Laboratorij/i), {
      target: { value: 'Lab A' },
    });

    fireEvent.click(screen.getByRole('button', { name: /dodaj lokaciju/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/locations' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
    });
  });

  test('updates existing location', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/locations' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([{ id: 2, name: 'Lab B', description: 'Stara' }]),
        });
      }
      if (url === '/api/locations/2' && options?.method === 'PUT') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 2, name: 'Lab C' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<LocationsPage />);

    const editBtn = await screen.findByRole('button', { name: /uredi/i });
    fireEvent.click(editBtn);

    const nameInput = await screen.findByDisplayValue('Lab B');
    fireEvent.change(nameInput, { target: { value: 'Lab C' } });

    fireEvent.click(screen.getByRole('button', { name: /spremi/i }));

    await waitFor(() => {
      const putCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/locations/2' && opts?.method === 'PUT'
      );
      expect(putCall).toBeTruthy();
      expect(JSON.parse(putCall[1].body)).toEqual({ name: 'Lab C', description: 'Stara' });
    });
  });
});
