import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PRIMARY, C } from '../theme';

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      background: C.bgFaint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 32,
        height: 32,
        border: `3px solid ${C.border}`,
        borderTopColor: PRIMARY,
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user)   return <Navigate to="/login" replace />;

  return children;
}

export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)               return <LoadingScreen />;
  if (!user)                 return <Navigate to="/login" replace />;
  if (!['admin', 'test'].includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
}
