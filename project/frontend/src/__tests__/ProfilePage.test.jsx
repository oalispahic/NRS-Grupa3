import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ProfilePage from '../pages/ProfilePage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('loads profile and submits update', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/users/profile' && (!options || !options.method)) {
        return Promise.resolve({
          json: () => Promise.resolve({
            full_name: 'Ana Admin',
            email: 'ana@example.com',
            role: 'admin',
            bio: '',
            institution: '',
            department: '',
            phone: '',
            degree: '',
          }),
        });
      }
      if (url === '/api/users/profile' && options?.method === 'PUT') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ full_name: 'Ana Updated' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Moj profil')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Ime i prezime'), {
      target: { value: 'Ana Updated' },
    });

    fireEvent.click(screen.getByRole('button', { name: /spremi profil/i }));

    await waitFor(() => {
      const putCall = global.fetch.mock.calls.find(([url, options]) =>
        url === '/api/users/profile' && options?.method === 'PUT'
      );
      expect(putCall).toBeTruthy();
      expect(JSON.parse(putCall[1].body).fullName).toBe('Ana Updated');
    });
  });
});
