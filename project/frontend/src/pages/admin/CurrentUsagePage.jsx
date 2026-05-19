import { useEffect, useState } from 'react';
import { MonitorCheck, RefreshCw, SearchX, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { C, PRIMARY, BTN } from '../../theme';

function fmtDate(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function timeLeft(end) {
  const diff = new Date(end) - new Date();
  if (diff <= 0) return 'Isteklo';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h > 0) return `${h}h ${m}m preostalo`;
  return `${m}m preostalo`;
}

export default function CurrentUsagePage() {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  async function load() {
    setLoading(true);
    try {
      const data = await fetch('/api/reservations/current', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json());
      setReservations(Array.isArray(data) ? data : []);
      setLastRefresh(new Date());
    } catch {
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Administrator
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Trenutno korištenje</h1>
            <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Oprema koja se aktivno koristi u ovom trenutku.</p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="btn-outline"
            style={{ ...BTN.outline, padding: '9px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, opacity: loading ? 0.6 : 1 }}
          >
            <RefreshCw size={13} style={{ animation: loading ? 'spin 0.8s linear infinite' : 'none' }} />
            Osvježi
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Aktivnih sesija', value: reservations.length, color: reservations.length > 0 ? '#166534' : C.muted, bg: reservations.length > 0 ? '#dcfce7' : C.bgFaint },
          { label: 'Zadnje osvježavanje', value: lastRefresh.toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' }), color: C.muted, bg: C.bgFaint },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <MonitorCheck size={15} color={PRIMARY} />
          <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Aktivna oprema</span>
          {reservations.length > 0 && (
            <span style={{ marginLeft: 4, background: '#dcfce7', color: '#166534', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>
              {reservations.length} {reservations.length === 1 ? 'stavka' : 'stavki'}
            </span>
          )}
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.muted, fontSize: 14 }}>Učitavanje...</div>
        ) : reservations.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <SearchX size={36} color={C.subtle} style={{ margin: '0 auto 14px' }} />
            <p style={{ fontSize: 14, color: C.muted }}>Trenutno nema opreme u aktivnoj upotrebi.</p>
          </div>
        ) : (
          <>
            <table className="table-desktop" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.bgFaint }}>
                  {['Oprema', 'Lokacija', 'Korisnik', 'Početak', 'Kraj', 'Preostalo'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '11px 20px', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations.map(r => {
                  const tl = timeLeft(r.end_time);
                  const urgent = new Date(r.end_time) - new Date() < 3600000;
                  return (
                    <tr key={r.id} className="row-hover" style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                      <td style={{ padding: '13px 20px', fontSize: 14, fontWeight: 600, color: C.heading }}>{r.equipment_name || '—'}</td>
                      <td style={{ padding: '13px 20px' }}>
                        {r.location ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: C.muted }}>
                            <MapPin size={12} />{r.location}
                          </div>
                        ) : <span style={{ color: C.subtle, fontSize: 13 }}>—</span>}
                      </td>
                      <td style={{ padding: '13px 20px' }}>
                        <div style={{ fontSize: 13, color: C.body, fontWeight: 500 }}>{r.full_name || '—'}</div>
                        <div style={{ fontSize: 11, color: C.subtle }}>{r.email || ''}</div>
                      </td>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: C.muted }}>{fmtDate(r.start_time)}</td>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: C.muted }}>{fmtDate(r.end_time)}</td>
                      <td style={{ padding: '13px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: urgent ? '#991b1b' : '#166534' }}>
                          <Clock size={12} />{tl}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="responsive-table-card-list">
              {reservations.map(r => {
                const tl = timeLeft(r.end_time);
                const urgent = new Date(r.end_time) - new Date() < 3600000;
                return (
                  <div key={r.id} style={{ border: `1px solid ${C.borderFaint}`, borderRadius: 10, padding: 14, background: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{r.equipment_name || '—'}</div>
                        {r.location && <div style={{ fontSize: 12, color: C.muted, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{r.location}</div>}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: urgent ? '#991b1b' : '#166534', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} />{tl}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: C.body, marginBottom: 6 }}>{r.full_name || '—'}</div>
                    <div style={{ display: 'grid', gap: 4, fontSize: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: C.muted }}>Početak</span><span>{fmtDate(r.start_time)}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: C.muted }}>Kraj</span><span>{fmtDate(r.end_time)}</span></div>
                    </div>
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
