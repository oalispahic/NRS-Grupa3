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
    vi.clearAllMocks();
  });

  test('submits new equipment', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/equipment' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/tags' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/equipment' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'Microscope A' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

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
      const postCall = global.fetch.mock.calls.find(([url, options]) =>
        url === '/api/equipment' && options?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
    });
  });

  test('creates new tag', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/equipment' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/tags' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/tags' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'PCR' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(
      <MemoryRouter>
        <ManageEquipmentPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('npr. PCR, Mikroskopija...'), {
      target: { value: 'PCR' },
    });

    fireEvent.click(screen.getByRole('button', { name: /dodaj tag/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, options]) =>
        url === '/api/tags' && options?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
    });
  });
});
