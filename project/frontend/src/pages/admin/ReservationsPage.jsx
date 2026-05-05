import { useEffect, useState } from 'react';
import { Check, X, ClipboardList, SearchX } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { PRIMARY, C, BTN, STATUS_RESERVATION } from '../../theme';

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const FILTERS = [
  { value: '', label: 'Sve' },
  { value: 'pending', label: 'Na čekanju' },
  { value: 'approved', label: 'Odobrene' },
  { value: 'rejected', label: 'Odbijene' },
];

export default function ReservationsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const authH = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  async function load(status) {
    setLoading(true);
    try {
      const url = status ? `/api/reservations?status=${status}` : '/api/reservations';
      const d = await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
      setReservations(Array.isArray(d) ? d : []);
    } catch {
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(filter); }, [filter]);

  async function handleApprove(id) {
    const res = await fetch(`/api/reservations/${id}/approve`, { method: 'PATCH', headers: authH() });
    if (res.ok) {
      toast.success('Rezervacija je odobrena.');
      load(filter);
    } else {
      toast.error('Greška pri odobravanju rezervacije.');
    }
  }

  async function handleReject(id) {
    const res = await fetch(`/api/reservations/${id}/reject`, { method: 'PATCH', headers: authH() });
    if (res.ok) {
      toast.success('Rezervacija je odbijena.');
      load(filter);
    } else {
      toast.error('Greška pri odbijanju rezervacije.');
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Administrator
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Upravljanje rezervacijama</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregledajte, odobrite ili odbijte zahtjeve za opremu.</p>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={filter === f.value ? 'btn-primary' : 'btn-outline'}
            style={{
              ...(filter === f.value ? BTN.primary : BTN.ghost),
              padding: '7px 16px',
              fontSize: 13,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Rezervacije</span>
          <span style={{ fontSize: 13, color: C.muted }}>{reservations.length} stavki</span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.muted, fontSize: 14 }}>Učitavanje...</div>
        ) : reservations.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <SearchX size={36} color={C.subtle} style={{ margin: '0 auto 14px' }} />
            <p style={{ fontSize: 14, color: C.muted }}>Nema rezervacija za odabrani filter.</p>
          </div>
        ) : (
          <>
            <table className="table-desktop" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.bgFaint }}>
                  {['Oprema', 'Korisnik', 'Početak', 'Kraj', 'Status', 'Akcije'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '11px 20px', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations.map(r => {
                  const sc = STATUS_RESERVATION[r.status] || { bg: '#f1f5f9', color: '#475569', label: r.status };
                  return (
                    <tr key={r.id} className="row-hover" style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                      <td style={{ padding: '13px 20px', fontSize: 14, fontWeight: 500, color: C.heading }}>{r.equipment_name || '—'}</td>
                      <td style={{ padding: '13px 20px' }}>
                        <div style={{ fontSize: 13, color: C.body }}>{r.full_name || '—'}</div>
                        <div style={{ fontSize: 12, color: C.subtle }}>{r.email || ''}</div>
                      </td>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: C.muted }}>{fmt(r.start_time)}</td>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: C.muted }}>{fmt(r.end_time)}</td>
                      <td style={{ padding: '13px 20px' }}>
                        <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{sc.label}</span>
                      </td>
                      <td style={{ padding: '13px 20px' }}>
                        {r.status === 'pending' ? (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              className="btn-primary"
                              onClick={() => handleApprove(r.id)}
                              style={{ ...BTN.primary, padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                            >
                              <Check size={13} /> Odobri
                            </button>
                            <button
                              className="btn-danger"
                              onClick={() => handleReject(r.id)}
                              style={{ ...BTN.danger, padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                            >
                              <X size={13} /> Odbij
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: C.subtle }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="responsive-table-card-list">
              {reservations.map(r => {
                const sc = STATUS_RESERVATION[r.status] || { bg: '#f1f5f9', color: '#475569', label: r.status };
                return (
                  <div key={r.id} style={{ border: `1px solid ${C.borderFaint}`, borderRadius: 10, padding: 14, background: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.heading, overflowWrap: 'anywhere' }}>{r.equipment_name || '—'}</div>
                        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{r.full_name || '—'}</div>
                        <div style={{ fontSize: 11, color: C.subtle }}>{r.email || ''}</div>
                      </div>
                      <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{sc.label}</span>
                    </div>
                    <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
                        <span style={{ color: C.muted }}>Početak</span>
                        <span style={{ color: C.body, textAlign: 'right' }}>{fmt(r.start_time)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
                        <span style={{ color: C.muted }}>Kraj</span>
                        <span style={{ color: C.body, textAlign: 'right' }}>{fmt(r.end_time)}</span>
                      </div>
                    </div>
                    {r.status === 'pending' && (
                      <div className="action-row">
                        <button
                          className="btn-primary"
                          onClick={() => handleApprove(r.id)}
                          style={{ ...BTN.primary, padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <Check size={13} /> Odobri
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleReject(r.id)}
                          style={{ ...BTN.danger, padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <X size={13} /> Odbij
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
