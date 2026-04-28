import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FlaskConical, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { PRIMARY, C, FONT, GLOBAL_CSS } from '../theme';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate        = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', background: C.bgFaint, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06 }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, background: PRIMARY, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FlaskConical size={20} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, color: C.heading }}>LabManager</span>
          </div>
          <p style={{ marginTop: 8, fontSize: 14, color: C.muted }}>Prijavite se u sistem</p>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, padding: '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#991b1b' }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.body, marginBottom: 6 }}>Email adresa</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color={C.subtle} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  required autoFocus placeholder="ime@laboratorija.ba"
                  style={{ width: '100%', padding: '10px 12px 10px 36px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.heading, outline: 'none', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = PRIMARY}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.body, marginBottom: 6 }}>Lozinka</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color={C.subtle} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  required placeholder="••••••••"
                  style={{ width: '100%', padding: '10px 12px 10px 36px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.heading, outline: 'none', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = PRIMARY}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: '100%', padding: 11, background: loading ? '#93c5fd' : PRIMARY, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Prijava u toku...' : 'Prijavi se'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: C.subtle }}>LabManager — NRS Grupa 3</p>
      </div>
    </div>
  );
}
