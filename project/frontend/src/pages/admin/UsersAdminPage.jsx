import { useEffect, useState } from 'react';
import { Users, ShieldCheck, UserX, UserCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { C, BTN } from '../../theme';

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const ROLE_LABELS = { admin: 'Administrator', laborant: 'Laborant', test: 'Test' };

export default function UsersAdminPage() {
  const { token, user: me } = useAuth();
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const authH = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  async function load() {
    setLoading(true);
    try {
      const d = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
      setUsers(Array.isArray(d) ? d : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleRoleChange(id, role) {
    const res = await fetch(`/api/users/${id}/role`, {
      method: 'PATCH', headers: authH(), body: JSON.stringify({ role }),
    });
    if (res.ok) {
      toast.success('Uloga korisnika promijenjena.');
      load();
    } else {
      toast.error('Greška pri promjeni uloge.');
    }
  }

  async function handleToggleActive(id, currentlyActive) {
    const res = await fetch(`/api/users/${id}/active`, {
      method: 'PATCH', headers: authH(), body: JSON.stringify({ is_active: !currentlyActive }),
    });
    if (res.ok) {
      toast.success(currentlyActive ? 'Korisnik deaktiviran.' : 'Korisnik aktiviran.');
      load();
    } else {
      toast.error('Greška pri promjeni statusa korisnika.');
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Administrator
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Upravljanje korisnicima</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregledajte sve korisnike, promijenite uloge i upravljajte statusima naloga.</p>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.heading, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={16} /> Korisnici
          </span>
          <span style={{ fontSize: 13, color: C.muted }}>{users.length} registrovanih</span>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: C.muted, fontSize: 14 }}>Učitavanje...</div>
        ) : (
          <>
            <table className="table-desktop" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Korisnik', 'Email', 'Uloga', 'Registrovan', 'Status', 'Akcije'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '11px 20px', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => {
                  const isMe = u.id === me?.id;
                  return (
                    <tr key={u.id} style={{ borderTop: `1px solid ${C.borderFaint}`, opacity: u.is_active ? 1 : 0.6 }}>
                      <td style={{ padding: '13px 20px' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{u.full_name}</div>
                        {isMe && <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 600 }}>Ja</div>}
                      </td>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: C.muted }}>{u.email}</td>
                      <td style={{ padding: '13px 20px' }}>
                        {isMe ? (
                          <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>{ROLE_LABELS[u.role] || u.role}</span>
                        ) : (
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <select
                              value={u.role}
                              onChange={e => handleRoleChange(u.id, e.target.value)}
                              style={{ padding: '4px 26px 4px 10px', borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 600, color: C.body, background: '#fff', cursor: 'pointer', appearance: 'none' }}
                            >
                              <option value="laborant">Laborant</option>
                              <option value="admin">Administrator</option>
                            </select>
                            <ChevronDown size={12} style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: C.muted }} />
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: C.muted }}>{fmt(u.created_at)}</td>
                      <td style={{ padding: '13px 20px' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                          background: u.is_active ? '#dcfce7' : '#f1f5f9',
                          color: u.is_active ? '#15803d' : '#64748b',
                        }}>
                          {u.is_active ? 'Aktivan' : 'Deaktiviran'}
                        </span>
                      </td>
                      <td style={{ padding: '13px 20px' }}>
                        {!isMe && (
                          <button
                            onClick={() => handleToggleActive(u.id, u.is_active)}
                            style={{
                              ...(u.is_active ? BTN.danger : BTN.primary),
                              padding: '5px 12px', fontSize: 12,
                              display: 'flex', alignItems: 'center', gap: 5,
                            }}
                          >
                            {u.is_active ? <><UserX size={12} /> Deaktiviraj</> : <><UserCheck size={12} /> Aktiviraj</>}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="responsive-table-card-list">
              {users.map(u => {
                const isMe = u.id === me?.id;
                return (
                  <div key={u.id} style={{ border: `1px solid ${C.borderFaint}`, borderRadius: 10, padding: 14, background: '#fff', opacity: u.is_active ? 1 : 0.6 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{u.full_name}</div>
                        <div style={{ fontSize: 12, color: C.muted }}>{u.email}</div>
                        {isMe && <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, marginTop: 2 }}>Ja</div>}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: u.is_active ? '#dcfce7' : '#f1f5f9', color: u.is_active ? '#15803d' : '#64748b', flexShrink: 0 }}>
                        {u.is_active ? 'Aktivan' : 'Deaktiviran'}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gap: 6, fontSize: 13, marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: C.muted }}>Uloga</span>
                        <span style={{ color: C.body, fontWeight: 500 }}>{ROLE_LABELS[u.role] || u.role}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: C.muted }}>Registrovan</span>
                        <span style={{ color: C.body }}>{fmt(u.created_at)}</span>
                      </div>
                    </div>
                    {!isMe && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, color: C.body }}>
                          <option value="laborant">Laborant</option>
                          <option value="admin">Administrator</option>
                        </select>
                        <button onClick={() => handleToggleActive(u.id, u.is_active)} style={{ ...(u.is_active ? BTN.danger : BTN.primary), padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                          {u.is_active ? <><UserX size={12} /> Deaktiviraj</> : <><UserCheck size={12} /> Aktiviraj</>}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
