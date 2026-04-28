import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook for accessing the authentication context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth se mora koristiti unutar AuthProvider-a');
  }
  return ctx;
}
