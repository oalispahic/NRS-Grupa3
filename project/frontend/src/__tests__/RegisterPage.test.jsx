import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import RegisterPage from '../pages/RegisterPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };
const navigateMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('RegisterPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ user: null });
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    });
  });

  test('submits registration and navigates to login', async () => {
    const { container } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('npr. Walter White'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('npr. megaribi'), {
      target: { value: 'testuser' },
    });
    const passwordInput = container.querySelector('input[type="password"]');
    fireEvent.change(passwordInput, {
      target: { value: 'secret' },
    });

    fireEvent.click(screen.getByRole('button', { name: /kreiraj nalog/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', expect.any(Object));
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });
});
