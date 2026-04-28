import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook za pristup autentifikacijskom kontekstu
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth se mora koristiti unutar AuthProvider-a');
  }
  return ctx;
}
