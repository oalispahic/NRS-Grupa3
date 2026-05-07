import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { ProtectedRoute, AdminRoute } from '../components/ProtectedRoute';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('ProtectedRoute', () => {
  test('renders children for authenticated user', () => {
    useAuthMock.mockReturnValue({ user: { role: 'laborant' }, loading: false });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  test('blocks non-admin in AdminRoute', () => {
    useAuthMock.mockReturnValue({ user: { role: 'laborant' }, loading: false });

    render(
      <MemoryRouter>
        <AdminRoute>
          <div>Admin Only</div>
        </AdminRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Admin Only')).not.toBeInTheDocument();
  });
});
