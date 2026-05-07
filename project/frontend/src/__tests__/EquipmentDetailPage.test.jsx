import { render, screen, fireEvent } from '@testing-library/react';
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

  test('blocks reservation when end time is before start time', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'laborant', full_name: 'Test User' },
      token: 'token',
    });

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({
        id: 1,
        name: 'Microscope A',
        status: 'available',
      }),
    });

    const { container } = renderWithRoute();

    const openButton = await screen.findByRole('button', { name: /odaberi termin/i });
    fireEvent.click(openButton);

    const dateInputs = container.querySelectorAll('input[type="datetime-local"]');
    fireEvent.change(dateInputs[0], { target: { value: '2025-01-02T12:00' } });
    fireEvent.change(dateInputs[1], { target: { value: '2025-01-02T11:00' } });

    fireEvent.click(screen.getByRole('button', { name: /potvrdi rezervaciju/i }));

    expect(await screen.findByText(/kraj termina mora biti nakon pocetka/i)).toBeInTheDocument();
  });

  test('admin can submit status update', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'admin', full_name: 'Admin User' },
      token: 'token',
    });

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          id: 1,
          name: 'Microscope A',
          status: 'available',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: 'maintenance' }),
      });

    renderWithRoute();

    const statusSelect = await screen.findByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'maintenance' } });

    fireEvent.click(screen.getByRole('button', { name: /spremi status/i }));

    const updateCall = global.fetch.mock.calls[1];
    expect(updateCall[0]).toBe('/api/equipment/1');
    expect(updateCall[1].method).toBe('PUT');
    expect(JSON.parse(updateCall[1].body)).toEqual({ status: 'maintenance' });
  });
});
