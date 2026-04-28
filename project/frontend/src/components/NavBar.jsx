import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FlaskConical, LayoutDashboard, Microscope, BookOpen, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { PRIMARY, C, FONT } from '../theme';

const NAV_LABORANT = [
  { to: '/dashboard',       label: 'Dashboard',  Icon: LayoutDashboard },
  { to: '/equipment',       label: 'Oprema',      Icon: Microscope },
  { to: '/reservations/my', label: 'Rezervacije', Icon: BookOpen },
];

const NAV_ADMIN = [
  { to: '/dashboard',       label: 'Dashboard',  Icon: LayoutDashboard },
  { to: '/equipment',       label: 'Oprema',      Icon: Microscope },
  { to: '/admin/equipment', label: 'Upravljanje', Icon: Settings },
];

export default function NavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!user) return null;

  const links = user.role === 'admin' ? NAV_ADMIN : NAV_LABORANT;

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: '#fff',
      borderBottom: `1px solid ${C.border}`,
      boxShadow: scrolled ? '0 1px 10px rgba(0,0,0,0.08)' : 'none',
      transition: 'box-shadow 0.2s',
      fontFamily: FONT,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 60,
        maxWidth: 1200,
        margin: '0 auto',
      }}>

        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32,
            background: PRIMARY,
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FlaskConical size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: C.heading }}>LabManager</span>
        </Link>

        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {links.map(({ to, label, Icon }) => {
            const active = location.pathname.startsWith(to) && (to !== '/dashboard' || location.pathname === '/dashboard');
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px',
                borderRadius: 7,
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? PRIMARY : C.muted,
                background: active ? C.iconBg : 'transparent',
                textDecoration: 'none',
              }}>
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.heading, lineHeight: 1.3 }}>
              {user.full_name}
            </div>
            <div style={{
              display: 'inline-block',
              background: user.role === 'admin' ? '#fef9c3' : C.iconBg,
              color: user.role === 'admin' ? '#854d0e' : PRIMARY,
              fontSize: 11, fontWeight: 600,
              padding: '1px 8px', borderRadius: 99,
              textTransform: 'capitalize',
            }}>
              {user.role}
            </div>
          </div>
          <button
            onClick={logout}
            title="Odjava"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px',
              border: `1px solid ${C.border}`,
              borderRadius: 7,
              background: '#fff',
              fontSize: 13,
              color: C.muted,
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#fca5a5'; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
          >
            <LogOut size={14} />
            Odjava
          </button>
        </div>
      </div>
    </nav>
  );
}
