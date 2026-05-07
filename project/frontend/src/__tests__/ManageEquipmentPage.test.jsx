import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ManageEquipmentPage from '../pages/admin/ManageEquipmentPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('ManageEquipmentPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ name: 'Microscope A' }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });
  });

  test('submits new equipment', async () => {
    render(
      <MemoryRouter>
        <ManageEquipmentPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Naziv aparata'), {
      target: { value: 'Microscope A' },
    });
    fireEvent.change(screen.getByPlaceholderText('SN-0001'), {
      target: { value: 'SN-001' },
    });
    fireEvent.change(screen.getByPlaceholderText('Model'), {
      target: { value: 'M-1' },
    });

    fireEvent.click(screen.getByRole('button', { name: /dodaj opremu/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls[1];
      expect(postCall[0]).toBe('/api/equipment');
      expect(postCall[1].method).toBe('POST');
    });
  });
});
