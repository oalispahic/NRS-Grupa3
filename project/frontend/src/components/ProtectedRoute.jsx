import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Wrapper component that protects routes from unauthenticated users.
 * Redirects to login page if user is not signed in.
 */
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user)   return <Navigate to="/login" replace />;

  return children;
}

/**
 * Wrapper component that protects admin-only routes.
 * Only allows users with the 'admin' role through.
 */
export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)              return null;
  if (!user)                return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return children;
}
