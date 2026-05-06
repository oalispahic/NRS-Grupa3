import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, FlaskConical, User, Lock, UserCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PRIMARY, C, FONT, GLOBAL_CSS } from '../theme';

export default function RegisterPage() {
  const { user }                          = useAuth();
  const toast                             = useToast();
  const navigate                          = useNavigate();
  const [username, setUsername]           = useState('');
  const [password, setPassword]           = useState('');
  const [fullName, setFullName]           = useState('');
  const [errorMsg, setErrorMsg]           = useState('');
  const [isSubmitting, setIsSubmitting]   = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registracija neuspjesna');
      }

      toast.success('Nalog kreiran. Prijavite se.');
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const pageStyle = {
    fontFamily: FONT,
    minHeight: '100vh',
    background: C.bgFaint,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  };

  const bgImageStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.06,
  };

  const cardStyle = {
    background: '#fff',
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: '36px 32px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px 10px 36px',
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    fontSize: 14,
    color: C.heading,
    outline: 'none',
    background: '#fff',
  };

  const btnStyle = {
    width: '100%',
    padding: 11,
    background: isSubmitting ? '#93c5fd' : PRIMARY,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
  };

  return (
    <div style={pageStyle}>
      <style>{GLOBAL_CSS}</style>
      <div style={bgImageStyle} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>

        <Link
          to="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22, color: C.body, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
        >
          <ArrowLeft size={16} />
          Povratak na pocetnu
        </Link>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40,
              background: PRIMARY,
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FlaskConical size={20} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, color: C.heading }}>
              LabManager
            </span>
          </div>
          <p style={{ marginTop: 8, fontSize: 14, color: C.muted }}>
            Kreirajte novi nalog
          </p>
        </div>

        <div style={cardStyle}>
          {errorMsg && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 8, padding: '10px 14px',
              marginBottom: 20, fontSize: 13, color: '#991b1b',
            }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: 'block', fontSize: 13,
                fontWeight: 500, color: C.body, marginBottom: 6,
              }}>
                Ime i prezime
              </label>
              <div style={{ position: 'relative' }}>
                <UserCircle size={15} color={C.subtle} style={{
                  position: 'absolute', left: 12, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  autoFocus
                  placeholder="npr. Walter White"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)}
                  onBlur={e => (e.target.style.borderColor = C.border)}
                />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: 'block', fontSize: 13,
                fontWeight: 500, color: C.body, marginBottom: 6,
              }}>
                Korisnicko ime
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} color={C.subtle} style={{
                  position: 'absolute', left: 12, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  placeholder="npr. megaribi"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)}
                  onBlur={e => (e.target.style.borderColor = C.border)}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block', fontSize: 13,
                fontWeight: 500, color: C.body, marginBottom: 6,
              }}>
                Lozinka
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color={C.subtle} style={{
                  position: 'absolute', left: 12, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)}
                  onBlur={e => (e.target.style.borderColor = C.border)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={btnStyle}
            >
              {isSubmitting ? 'Kreiranje naloga...' : 'Kreiraj nalog'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: C.muted }}>
          Vec imate nalog?{' '}
          <Link to="/login" style={{ color: PRIMARY, textDecoration: 'none', fontWeight: 600 }}>
            Prijavite se
          </Link>
        </p>
      </div>
    </div>
  );
}
