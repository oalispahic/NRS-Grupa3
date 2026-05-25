import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ReservationsPage from '../pages/admin/ReservationsPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('ReservationsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('approves reservation', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url.startsWith('/api/reservations') && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([
            {
              id: 1,
              equipment_name: 'Microscope A',
              full_name: 'Test User',
              email: 'user@example.com',
              start_time: '2025-01-01T10:00:00Z',
              end_time: '2025-01-01T11:00:00Z',
              status: 'pending',
            },
          ]),
        });
      }
      if (url === '/api/reservations/1/approve' && options?.method === 'PATCH') {
        return Promise.resolve({ ok: true });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    const approveButtons = await screen.findAllByRole('button', { name: /^odobri$/i });
    fireEvent.click(approveButtons[0]);

    await waitFor(() => {
      const patchCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/reservations/1/approve' && opts?.method === 'PATCH'
      );
      expect(patchCall).toBeTruthy();
    });
  });

  test('rejects reservation with reason', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url.startsWith('/api/reservations') && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve([
            {
              id: 1,
              equipment_name: 'Microscope A',
              full_name: 'Test User',
              email: 'user@example.com',
              start_time: '2025-01-01T10:00:00Z',
              end_time: '2025-01-01T11:00:00Z',
              status: 'pending',
            },
          ]),
        });
      }
      if (url === '/api/reservations/1/reject' && options?.method === 'PATCH') {
        return Promise.resolve({ ok: true });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    const rejectButtons = await screen.findAllByRole('button', { name: /^odbij$/i });
    fireEvent.click(rejectButtons[0]);

    fireEvent.change(screen.getByPlaceholderText(/servisu/i), {
      target: { value: 'Nedostaje potvrda' },
    });

    fireEvent.click(screen.getByRole('button', { name: /odbij rezervaciju/i }));

    await waitFor(() => {
      const patchCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/reservations/1/reject' && opts?.method === 'PATCH'
      );
      expect(patchCall).toBeTruthy();
      expect(JSON.parse(patchCall[1].body)).toEqual({ reason: 'Nedostaje potvrda' });
    });
  });

  test('exports reservations CSV', async () => {
    const blob = new Blob(['id,name']);
    if (!URL.createObjectURL) URL.createObjectURL = () => 'blob:mock';
    if (!URL.revokeObjectURL) URL.revokeObjectURL = () => {};
    const createUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    global.fetch = vi.fn((url, options) => {
      if (url.startsWith('/api/reservations') && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/export/reservations') {
        return Promise.resolve({ blob: () => Promise.resolve(blob) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <ReservationsPage />
      </MemoryRouter>
    );

    const exportBtn = await screen.findByRole('button', { name: /export csv/i });
    fireEvent.click(exportBtn);

    await waitFor(() => {
      const exportCall = global.fetch.mock.calls.find(([url]) => url === '/api/export/reservations');
      expect(exportCall).toBeTruthy();
    });

    createUrlSpy.mockRestore();
    revokeSpy.mockRestore();
    clickSpy.mockRestore();
  });
});
