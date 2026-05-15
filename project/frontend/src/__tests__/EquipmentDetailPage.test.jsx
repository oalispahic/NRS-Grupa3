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

  test('disables submit until dates are selected', async () => {
    useAuthMock.mockReturnValue({
      user: { role: 'laborant', full_name: 'Test User' },
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
        json: () => Promise.resolve([]),
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

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          id: 1,
          name: 'Microscope A',
          status: 'available',
          serial_number: 'SN-001',
          model: 'M-1',
          manufacturer: 'Acme',
        }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: 'maintenance' }),
      });

    renderWithRoute();

    expect(await screen.findByText('SN-001')).toBeInTheDocument();
    expect(screen.getByText('M-1')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'maintenance' } });

    fireEvent.click(screen.getByRole('button', { name: /spremi status/i }));

    const updateCall = global.fetch.mock.calls[2];
    expect(updateCall[0]).toBe('/api/equipment/1');
    expect(updateCall[1].method).toBe('PUT');
    expect(JSON.parse(updateCall[1].body)).toEqual({ status: 'maintenance' });
  });
});
