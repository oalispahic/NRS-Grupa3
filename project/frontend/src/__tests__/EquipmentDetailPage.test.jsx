import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import EquipmentDetailPage from '../pages/EquipmentDetailPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn(), info: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

vi.mock('../components/ReservationCalendar', () => ({
  default: ({ onSelect, onOccupiedRange }) => (
    <div>
      <button type="button" onClick={() => onSelect?.(new Date('2026-01-01'), new Date('2026-01-02'))}>Set dates</button>
      <button type="button" onClick={() => onOccupiedRange?.(new Date('2026-01-01'), new Date('2026-01-02'))}>Set occupied</button>
    </div>
  ),
}));

function renderWithRoute() {
  return render(
    <MemoryRouter initialEntries={['/equipment/1']}>
      <Routes>
        <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('EquipmentDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('disables submit until dates are selected', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'laborant', full_name: 'Test User' },
      token: 'token',
    });

    global.fetch = vi.fn((url) => {
      if (url === '/api/equipment/1') {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 1,
            name: 'Microscope A',
            status: 'available',
          }),
        });
      }
      if (url === '/api/equipment/1/reserved-dates') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/equipment/1/waitlist') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ onList: false, position: null, total: 0 }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    renderWithRoute();

    const openButton = await screen.findByRole('button', { name: /odaberi termin/i });
    fireEvent.click(openButton);

    const submitButton = screen.getByRole('button', { name: /potvrdi rezervaciju/i });
    expect(submitButton).toBeDisabled();
  });

  test('admin can submit status update and sees equipment details', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'admin', full_name: 'Admin User' },
      token: 'token',
    });

    global.fetch = vi.fn((url, options) => {
      if (url === '/api/equipment/1' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 1,
            name: 'Microscope A',
            status: 'available',
            serial_number: 'SN-001',
            model: 'M-1',
            manufacturer: 'Acme',
          }),
        });
      }
      if (url === '/api/equipment/1/reserved-dates') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/equipment/1/waitlist') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ list: [], total: 0 }) });
      }
      if (url === '/api/equipment/1' && options?.method === 'PUT') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ status: 'maintenance' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    renderWithRoute();

    expect(await screen.findByText('SN-001')).toBeInTheDocument();
    expect(screen.getByText('M-1')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'maintenance' } });

    fireEvent.click(screen.getByRole('button', { name: /spremi status/i }));

    const updateCall = global.fetch.mock.calls.find(([url, opts]) =>
      url === '/api/equipment/1' && opts?.method === 'PUT'
    );
    expect(updateCall[0]).toBe('/api/equipment/1');
    expect(updateCall[1].method).toBe('PUT');
    expect(JSON.parse(updateCall[1].body)).toEqual({ status: 'maintenance' });
  });

  test('requires safety note confirmation before showing reservation form', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'laborant', full_name: 'Test User' },
      token: 'token',
    });

    global.fetch = vi.fn((url) => {
      if (url === '/api/equipment/1') {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 1,
            name: 'Microscope A',
            status: 'available',
            safety_notes: 'Nosite zastitu za oci.',
          }),
        });
      }
      if (url === '/api/equipment/1/reserved-dates') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/equipment/1/waitlist') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ onList: false, position: null, total: 0 }) });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    renderWithRoute();

    const openButton = await screen.findByRole('button', { name: /odaberi termin/i });
    fireEvent.click(openButton);

    const confirmButton = await screen.findByRole('button', { name: /razumijem/i });
    fireEvent.click(confirmButton);

    expect(await screen.findByRole('button', { name: /potvrdi rezervaciju/i })).toBeInTheDocument();
  });

  test('submits waitlist request when dates are occupied', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'laborant', full_name: 'Test User' },
      token: 'token',
    });

    global.fetch = vi.fn((url, options) => {
      if (url === '/api/equipment/1' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 1,
            name: 'Microscope A',
            status: 'reserved',
          }),
        });
      }
      if (url === '/api/equipment/1/reserved-dates') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/equipment/1/waitlist') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ onList: false, position: null, total: 0 }) });
      }
      if (url === '/api/reservations' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 22 }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    renderWithRoute();

    const openButton = await screen.findByRole('button', { name: /odaberi termin/i });
    fireEvent.click(openButton);

    fireEvent.click(screen.getByRole('button', { name: /set occupied/i }));

    const waitlistBtn = await screen.findByRole('button', { name: /listu/i });
    fireEvent.click(waitlistBtn);

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/reservations' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
      expect(JSON.parse(postCall[1].body)).toEqual(expect.objectContaining({ waitlist: true }));
    });
  });

  test('shows inquiry button for non-admin and stores equipment context', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'laborant', full_name: 'Test User' },
      token: 'token',
    });

    global.fetch = vi.fn((url) => {
      if (url === '/api/equipment/1') {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 1,
            name: 'Centrifuga X',
            status: 'available',
          }),
        });
      }
      if (url === '/api/equipment/1/reserved-dates') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/equipment/1/waitlist') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ onList: false, position: null, total: 0 }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    renderWithRoute();

    const inquiryBtn = await screen.findByRole('button', { name: /pošalji pitanje adminu/i });
    fireEvent.click(inquiryBtn);

    const ctx = JSON.parse(sessionStorage.getItem('msgEquipCtx'));
    expect(ctx).toEqual({ id: 1, name: 'Centrifuga X' });
  });
});
