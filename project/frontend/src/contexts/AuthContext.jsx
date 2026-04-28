import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken]     = useState(null);
  const [isLoading, setIsLoading]     = useState(true);
  const navigate = useNavigate();

  // On app load, check if there is a saved session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    const savedUser  = sessionStorage.getItem('user');

    if (savedToken && savedUser) {
      setAuthToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Send credentials to backend and store the session
  const login = useCallback(async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));

    setAuthToken(data.token);
    setCurrentUser(data.user);

    return data.user;
  }, []);

  // Clear session and redirect to login page
  const logout = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setAuthToken(null);
    setCurrentUser(null);
    navigate('/login');
  }, [navigate]);

  const contextValue = {
    user:    currentUser,
    token:   authToken,
    loading: isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
