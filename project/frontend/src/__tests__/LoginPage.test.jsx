import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LoginPage from '../pages/LoginPage';

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

describe('LoginPage', () => {
  let loginMock;

  beforeEach(() => {
    loginMock = vi.fn().mockResolvedValue({});
    useAuthMock.mockReturnValue({ user: null, login: loginMock });
  });

  test('submits credentials and navigates on success', async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = container.querySelector('input[type="text"]');
    const passwordInput = container.querySelector('input[type="password"]');

    fireEvent.change(usernameInput, {
      target: { value: 'laborant01' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'secret' },
    });

    fireEvent.click(screen.getByRole('button', { name: /prijavi se/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('laborant01', 'secret');
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });
});
