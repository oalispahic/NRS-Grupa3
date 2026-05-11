import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FlaskConical, LayoutDashboard, Microscope, BookOpen,
  Settings, LogOut, ClipboardList, Menu, X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { FONT, GLOBAL_CSS } from '../theme';

const SIDEBAR_W = 240;
const DARK = '#0d1b2e';

const NAV_GROUPS_LABORANT = [
  {
    label: 'Navigacija',
    items: [
      { to: '/dashboard',       label: 'Dashboard',        Icon: LayoutDashboard },
      { to: '/equipment',       label: 'Oprema',           Icon: Microscope },
      { to: '/reservations/my', label: 'Moje rezervacije', Icon: BookOpen },
    ],
  },
];

const NAV_GROUPS_ADMIN = [
  {
    label: 'Navigacija',
    items: [
      { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
      { to: '/equipment', label: 'Oprema',    Icon: Microscope },
    ],
  },
  {
    label: 'Administracija',
    items: [
      { to: '/admin/equipment',    label: 'Upravljanje opremom', Icon: Settings },
      { to: '/admin/reservations', label: 'Sve rezervacije',     Icon: ClipboardList },
    ],
  },
];

const NAV_GROUPS_TEST = [
  {
    label: 'Navigacija',
    items: [
      { to: '/dashboard',       label: 'Dashboard',        Icon: LayoutDashboard },
      { to: '/equipment',       label: 'Oprema',           Icon: Microscope },
      { to: '/reservations/my', label: 'Moje rezervacije', Icon: BookOpen },
    ],
  },
  {
    label: 'Administracija',
    items: [
      { to: '/admin/equipment',    label: 'Upravljanje opremom', Icon: Settings },
      { to: '/admin/reservations', label: 'Sve rezervacije',     Icon: ClipboardList },
    ],
  },
];

const ROLE_META = {
  admin:    { label: 'Administrator', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
  test:     { label: 'Test',          color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  laborant: { label: 'Laborant',      color: '#34d399', bg: 'rgba(52,211,153,0.15)'  },
};

function NavItem({ to, label, Icon, active }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 14px 9px 16px',
        margin: '1px 8px',
        borderRadius: 8,
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? '#fff' : 'rgba(255,255,255,0.55)',
        background: active
          ? 'linear-gradient(90deg, rgba(37,99,235,0.38) 0%, rgba(37,99,235,0.10) 100%)'
          : 'transparent',
        borderLeft: `2.5px solid ${active ? '#3b82f6' : 'transparent'}`,
        transition: 'background 0.13s, color 0.13s, border-color 0.13s',
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
        }
      }}
    >
      <Icon
        size={15}
        color={active ? '#60a5fa' : 'rgba(255,255,255,0.4)'}
        style={{ flexShrink: 0 }}
      />
      <span style={{ flex: 1 }}>{label}</span>
      {active && (
        <span style={{
          width: 5, height: 5,
          borderRadius: '50%',
          background: '#3b82f6',
          boxShadow: '0 0 6px #3b82f6',
          flexShrink: 0,
        }} />
      )}
    </Link>
  );
}

function Sidebar({ user, groups, isActive, logout }) {
  const role = ROLE_META[user?.role] || { label: user?.role, color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' };
  const initial = user?.full_name?.[0]?.toUpperCase() || '?';

  return (
    <div style={{
      width: SIDEBAR_W,
      height: '100%',
      background: DARK,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: FONT,
      borderRight: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '4px 0 28px rgba(0,0,0,0.4)',
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(37,99,235,0.55)',
          flexShrink: 0,
        }}>
          <FlaskConical size={17} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', lineHeight: 1.2 }}>LabManager</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1, letterSpacing: 0.3 }}>Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 0', scrollbarWidth: 'none' }}>
        {groups.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 6 }}>
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.28)',
              textTransform: 'uppercase',
              letterSpacing: 1.3,
              padding: `${gi === 0 ? '8px' : '16px'} 20px 6px`,
            }}>
              {group.label}
            </div>
            {group.items.map(({ to, label, Icon }) => (
              <NavItem key={to} to={to} label={label} Icon={Icon} active={isActive(to)} />
            ))}
          </div>
        ))}
      </nav>

      {/* Divider + user */}
      <div style={{
        padding: '14px 14px 16px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(0,0,0,0.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 34, height: 34,
            borderRadius: 9,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff',
            flexShrink: 0,
          }}>
            {initial}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#fff',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.full_name}
            </div>
            <div style={{
              display: 'inline-block', marginTop: 3,
              background: role.bg, color: role.color,
              fontSize: 10, fontWeight: 700,
              padding: '1px 7px', borderRadius: 99,
              textTransform: 'uppercase', letterSpacing: 0.5,
            }}>
              {role.label}
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '8px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 7,
            color: 'rgba(252,165,165,0.85)',
            fontSize: 13, fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.13s, color 0.13s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.22)'; e.currentTarget.style.color = '#fca5a5'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = 'rgba(252,165,165,0.85)'; }}
        >
          <LogOut size={13} />
          Odjava
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const groups =
    user?.role === 'test'     ? NAV_GROUPS_TEST :
    user?.role === 'admin'    ? NAV_GROUPS_ADMIN :
                                NAV_GROUPS_LABORANT;
  const isActive = (to) =>
    location.pathname.startsWith(to) && (to !== '/dashboard' || location.pathname === '/dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: FONT, background: '#f1f5f9' }}>
      <style>{GLOBAL_CSS}</style>
      <style>{`
        .admin-sidebar { display: flex; }
        .admin-mobile-bar { display: none; }
        .admin-content { margin-left: ${SIDEBAR_W}px; }
        @media (max-width: 900px) {
          .admin-sidebar { display: none !important; }
          .admin-mobile-bar { display: flex !important; }
          .admin-content { margin-left: 0 !important; padding-top: 56px; }
        }
        nav::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Desktop sidebar */}
      <div className="admin-sidebar" style={{
        width: SIDEBAR_W, flexShrink: 0,
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        <Sidebar user={user} groups={groups} isActive={isActive} logout={logout} />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: SIDEBAR_W, zIndex: 99 }}>
            <Sidebar user={user} groups={groups} isActive={isActive} logout={logout} />
          </div>
        </>
      )}

      {/* Mobile top bar */}
      <div className="admin-mobile-bar" style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 56, background: DARK, zIndex: 50,
        alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FlaskConical size={15} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>LabManager</span>
        </div>
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 7, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Content */}
      <main className="admin-content" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px', animation: 'labFadeIn 0.18s ease-out' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
