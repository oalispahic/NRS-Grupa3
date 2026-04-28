import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Wrapper komponenta koja stiti rute od neprijavljenih korisnika.
 * Ako korisnik nije prijavljen, preusmjerava na login stranicu.
 */
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user)   return <Navigate to="/login" replace />;

  return children;
}

/**
 * Wrapper komponenta koja stiti admin rute.
 * Propusta samo korisnike sa ulogom 'admin'.
 */
export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)              return null;
  if (!user)                return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return children;
}
