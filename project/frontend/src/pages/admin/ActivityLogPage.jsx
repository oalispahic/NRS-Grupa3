import { useEffect, useState } from 'react';
import { Activity, SearchX } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { C, PRIMARY } from '../../theme';

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const ACTION_META = {
  login:                 { label: 'Prijava',             bg: '#eff6ff', color: PRIMARY },
  register:              { label: 'Registracija',         bg: '#f0fdf4', color: '#166534' },
  reservation_created:   { label: 'Rezervacija kreirana', bg: '#fef9c3', color: '#854d0e' },
  reservation_approved:  { label: 'Rezervacija odobrena', bg: '#dcfce7', color: '#166534' },
  reservation_rejected:  { label: 'Rezervacija odbijena', bg: '#fee2e2', color: '#991b1b' },
  reservation_cancelled: { label: 'Rezervacija otkazana', bg: '#f1f5f9', color: '#475569' },
  'Oprema vracena':      { label: 'Oprema vraćena',      bg: '#eff6ff', color: '#1e40af' },
  ocjena_opreme:         { label: 'Ocjena opreme',        bg: '#fef3c7', color: '#92400e' },
};

export default function ActivityLogPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 50;

  async function load(off = 0) {
    setLoading(true);
    try {
      const data = await fetch(`/api/activity-logs?limit=${LIMIT}&offset=${off}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json());
      if (data && Array.isArray(data.logs)) {
        setLogs(data.logs);
        setTotal(data.total || 0);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(offset); }, [offset]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Administrator
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Log aktivnosti</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Historija svih akcija u sistemu.</p>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={15} color={PRIMARY} />
            <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Aktivnosti</span>
          </div>
          <span style={{ fontSize: 13, color: C.muted }}>{total} ukupno</span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.muted, fontSize: 14 }}>Učitavanje...</div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <SearchX size={36} color={C.subtle} style={{ margin: '0 auto 14px' }} />
            <p style={{ fontSize: 14, color: C.muted }}>Nema zabilježenih aktivnosti.</p>
          </div>
        ) : (
          <>
            <table className="table-desktop" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.bgFaint }}>
                  {['Akcija', 'Korisnik', 'Detalji', 'Entitet', 'Datum i vrijeme'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '11px 20px', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map(log => {
                  const meta = ACTION_META[log.action] || { label: log.action, bg: '#f1f5f9', color: '#475569' };
                  return (
                    <tr key={log.id} className="row-hover" style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                      <td style={{ padding: '12px 20px' }}>
                        <span style={{ background: meta.bg, color: meta.color, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99, whiteSpace: 'nowrap' }}>{meta.label}</span>
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        {log.full_name ? (
                          <>
                            <div style={{ fontSize: 13, color: C.body, fontWeight: 500 }}>{log.full_name}</div>
                            <div style={{ fontSize: 11, color: C.subtle }}>{log.email}</div>
                          </>
                        ) : (
                          <span style={{ fontSize: 12, color: C.subtle }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 20px', fontSize: 13, color: C.muted, maxWidth: 200 }}>
                        <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {log.details || '—'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 20px', fontSize: 12, color: C.subtle }}>
                        {log.entity_type ? `${log.entity_type} #${log.entity_id}` : '—'}
                      </td>
                      <td style={{ padding: '12px 20px', fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>{fmt(log.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="responsive-table-card-list">
              {logs.map(log => {
                const meta = ACTION_META[log.action] || { label: log.action, bg: '#f1f5f9', color: '#475569' };
                return (
                  <div key={log.id} style={{ border: `1px solid ${C.borderFaint}`, borderRadius: 10, padding: 14, background: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: meta.bg, color: meta.color, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99 }}>{meta.label}</span>
                      <span style={{ fontSize: 11, color: C.subtle, whiteSpace: 'nowrap' }}>{fmt(log.created_at)}</span>
                    </div>
                    {log.full_name && <div style={{ fontSize: 13, color: C.body, marginBottom: 4 }}>{log.full_name}</div>}
                    {log.details && <div style={{ fontSize: 12, color: C.muted }}>{log.details}</div>}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {total > LIMIT && (
              <div style={{ padding: '14px 20px', borderTop: `1px solid ${C.borderFaint}`, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  disabled={offset === 0}
                  onClick={() => setOffset(Math.max(0, offset - LIMIT))}
                  style={{ padding: '6px 14px', border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 13, cursor: offset === 0 ? 'not-allowed' : 'pointer', background: '#fff', color: offset === 0 ? C.subtle : C.body, opacity: offset === 0 ? 0.5 : 1 }}
                >
                  ← Prethodni
                </button>
                <span style={{ padding: '6px 12px', fontSize: 13, color: C.muted }}>
                  {Math.floor(offset / LIMIT) + 1} / {Math.ceil(total / LIMIT)}
                </span>
                <button
                  disabled={offset + LIMIT >= total}
                  onClick={() => setOffset(offset + LIMIT)}
                  style={{ padding: '6px 14px', border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 13, cursor: offset + LIMIT >= total ? 'not-allowed' : 'pointer', background: '#fff', color: offset + LIMIT >= total ? C.subtle : C.body, opacity: offset + LIMIT >= total ? 0.5 : 1 }}
                >
                  Sljedeći →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
