import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MaintenancePage from '../pages/admin/MaintenancePage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('MaintenancePage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('creates a maintenance task', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/maintenance' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/users') {
        return Promise.resolve({ json: () => Promise.resolve([{ id: 7, full_name: 'User A', email: 'a@example.com', is_active: true }]) });
      }
      if (url === '/api/equipment') {
        return Promise.resolve({ json: () => Promise.resolve([{ id: 1, name: 'Microscope A' }]) });
      }
      if (url.startsWith('/api/maintenance/upcoming-services')) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/maintenance' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 9, title: 'Kalibracija' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <MaintenancePage />
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByRole('button', { name: /novi zadatak/i }));

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '1' } });

    fireEvent.change(screen.getByPlaceholderText(/kalibracija/i), {
      target: { value: 'Kalibracija' },
    });

    fireEvent.click(screen.getByRole('button', { name: /kreiraj zadatak/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/maintenance' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
      const body = JSON.parse(postCall[1].body);
      expect(body).toEqual(expect.objectContaining({
        equipment_id: '1',
        title: 'Kalibracija',
      }));
    });
  });

  test('shows upcoming services list', async () => {
    global.fetch = vi.fn((url) => {
      if (url === '/api/maintenance') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/users') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/equipment') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url.startsWith('/api/maintenance/upcoming-services')) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 2, name: 'Analyzer B', planned_service: new Date(Date.now() + 86400000).toISOString() },
          ]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <MaintenancePage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Nadolaze/i)).toBeInTheDocument();
    expect(screen.getByText('Analyzer B')).toBeInTheDocument();
  });
});
