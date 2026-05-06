import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, SearchX } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { PRIMARY, C, STATUS_RESERVATION } from '../theme';

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function MyReservationsPage() {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    fetch('/api/reservations/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setReservations(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Moje rezervacije
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Rezervacije</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregled svih vaših zahtjeva za opremu.</p>
      </div>

      {loading ? (
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: C.bgFaint, padding: '12px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: 16 }}>
            {['40%', '20%', '20%', '12%'].map((w, i) => (
              <div key={i} className="skeleton" style={{ width: w, height: 12, borderRadius: 4 }} />
            ))}
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 20px', borderBottom: i < 3 ? `1px solid ${C.borderFaint}` : 'none', alignItems: 'center' }}>
              <div className="skeleton" style={{ width: '35%', height: 14, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '22%', height: 13, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '22%', height: 13, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: 68, height: 22, borderRadius: 99 }} />
            </div>
          ))}
        </div>
      ) : reservations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <SearchX size={40} color={C.subtle} style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>Nemate evidentiranih rezervacija.</p>
          <Link to="/equipment" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: PRIMARY, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            <BookOpen size={14} /> Pregledaj opremu
          </Link>
        </div>
      ) : (
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
          <table className="table-desktop" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: C.bgFaint }}>
                {['Oprema', 'Početak', 'Kraj', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, i) => {
                const sc = STATUS_RESERVATION[r.status] || { bg: '#f1f5f9', color: '#475569', label: r.status };
                return (
                  <tr key={r.id} className="row-hover" style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                    <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, color: C.heading }}>{r.equipment_name || '—'}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: C.muted }}>{fmt(r.start_time)}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: C.muted }}>{fmt(r.end_time)}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99 }}>{sc.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="responsive-table-card-list">
            {reservations.map((r) => {
              const sc = STATUS_RESERVATION[r.status] || { bg: '#f1f5f9', color: '#475569', label: r.status };
              return (
                <div key={r.id} style={{ border: `1px solid ${C.borderFaint}`, borderRadius: 10, padding: 14, background: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.heading, overflowWrap: 'anywhere' }}>{r.equipment_name || 'â€”'}</div>
                      <div style={{ fontSize: 12, color: C.subtle, marginTop: 2 }}>Rezervacija #{r.id}</div>
                    </div>
                    <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{sc.label}</span>
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
                      <span style={{ color: C.muted }}>Početak</span>
                      <span style={{ color: C.body, textAlign: 'right' }}>{fmt(r.start_time)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
                      <span style={{ color: C.muted }}>Kraj</span>
                      <span style={{ color: C.body, textAlign: 'right' }}>{fmt(r.end_time)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
