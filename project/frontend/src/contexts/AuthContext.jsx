import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [korisnik, setKorisnik]     = useState(null);
  const [authToken, setAuthToken]   = useState(null);
  const [ucitavanje, setUcitavanje] = useState(true);
  const navigate = useNavigate();

  // Pri pokretanju aplikacije, provjeri da li postoji sacuvana sesija
  useEffect(() => {
    const sacuvaniToken    = sessionStorage.getItem('token');
    const sacuvaniKorisnik = sessionStorage.getItem('user');

    if (sacuvaniToken && sacuvaniKorisnik) {
      setAuthToken(sacuvaniToken);
      setKorisnik(JSON.parse(sacuvaniKorisnik));
    }
    setUcitavanje(false);
  }, []);

  // Funkcija za prijavu - salje kredencijale na backend
  const login = useCallback(async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const podaci = await response.json();

    if (!response.ok) {
      throw new Error(podaci.error || 'Prijava neuspješna');
    }

    // Cuvanje tokena i korisnickih podataka u sessionStorage
    sessionStorage.setItem('token', podaci.token);
    sessionStorage.setItem('user', JSON.stringify(podaci.user));

    setAuthToken(podaci.token);
    setKorisnik(podaci.user);

    return podaci.user;
  }, []);

  // Funkcija za odjavu - brise sesiju i vraca na login
  const logout = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setAuthToken(null);
    setKorisnik(null);
    navigate('/login');
  }, [navigate]);

  const contextVrijednost = {
    user:    korisnik,
    token:   authToken,
    loading: ucitavanje,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextVrijednost}>
      {children}
    </AuthContext.Provider>
  );
}
