import { useEffect, useState } from 'react';
import { Clock, BookOpen, Star, User, Wrench, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { C, PRIMARY } from '../theme';

const ACTION_META = {
  reservation_created:      { label: 'Rezervacija kreirana',    Icon: BookOpen,  color: '#2563eb', bg: '#eff6ff' },
  reservation_cancelled:    { label: 'Rezervacija otkazana',    Icon: BookOpen,  color: '#dc2626', bg: '#fee2e2' },
  reservation_updated:      { label: 'Rezervacija izmijenjena', Icon: BookOpen,  color: '#d97706', bg: '#fffbeb' },
  rating_added:             { label: 'Oprema ocijenjena',       Icon: Star,      color: '#f59e0b', bg: '#fefce8' },
  profile_updated:          { label: 'Profil izmijenjen',       Icon: User,      color: '#64748b', bg: '#f1f5f9' },
  maintenance_task_updated: { label: 'Zadatak ažuriran',        Icon: Wrench,    color: '#16a34a', bg: '#dcfce7' },
};

const TYPE_FILTERS = [
  { key: '', label: 'Sve' },
  { key: 'reservation_created', label: 'Rezervacije' },
  { key: 'rating_added', label: 'Ocjene' },
  { key: 'maintenance_task_updated', label: 'Maintenance' },
  { key: 'profile_updated', label: 'Profil' },
];

function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Upravo';
  if (m < 60) return `Prije ${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `Prije ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `Prije ${d}d`;
  return new Date(isoStr).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fmtFull(isoStr) {
  return new Date(isoStr).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function MyActivityPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const limit = 20;

  const hdr = { Authorization: `Bearer ${token}` };

  async function load(type, offset) {
    setLoading(true);
    const params = new URLSearchParams({ limit, offset });
    if (type) params.set('type', type);
    try {
      const r = await fetch(`/api/activity-logs/mine?${params}`, { headers: hdr });
      if (!r.ok) return;
      const d = await r.json();
      setLogs(Array.isArray(d.logs) ? d.logs : []);
      setTotal(d.total || 0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(0);
    load(filter, 0);
  }, [filter]);

  function nextPage() {
    const next = page + 1;
    setPage(next);
    load(filter, next * limit);
  }

  function prevPage() {
    const prev = page - 1;
    setPage(prev);
    load(filter, prev * limit);
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Clock size={20} color={PRIMARY} />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.heading, margin: 0 }}>Moje aktivnosti</h1>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Timeline vaših akcija u sistemu ({total})</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {TYPE_FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer', fontWeight: filter === f.key ? 700 : 400,
              background: filter === f.key ? PRIMARY : '#fff',
              color: filter === f.key ? '#fff' : C.muted,
              border: `1px solid ${filter === f.key ? PRIMARY : C.border}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: C.muted }}>Učitavanje...</div>
      ) : logs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted }}>
          <Clock size={40} color={C.border} style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 15 }}>Nemate aktivnosti{filter ? ' ovog tipa' : ''}</div>
        </div>
      ) : (
        <>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Timeline line */}
            <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: C.border }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {logs.map((log, i) => {
                const meta = ACTION_META[log.action] || { label: log.action, Icon: Clock, color: C.muted, bg: C.bgFaint };
                const { Icon } = meta;
                return (
                  <div key={log.id} style={{ position: 'relative', paddingBottom: 20 }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: -28, top: 2,
                      width: 22, height: 22, borderRadius: '50%',
                      background: meta.bg, border: `2px solid ${meta.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={11} color={meta.color} />
                    </div>

                    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{meta.label}</span>
                        <span
                          title={fmtFull(log.created_at)}
                          style={{ fontSize: 12, color: C.subtle, flexShrink: 0, cursor: 'default' }}
                        >
                          {timeAgo(log.created_at)}
                        </span>
                      </div>
                      {log.details && (
                        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{log.details}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          {total > limit && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 20 }}>
              <button
                onClick={prevPage}
                disabled={page === 0}
                style={{ padding: '6px 16px', borderRadius: 8, border: `1px solid ${C.border}`, background: '#fff', fontSize: 13, cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.4 : 1 }}
              >
                Prethodna
              </button>
              <span style={{ fontSize: 13, color: C.muted }}>
                {page * limit + 1}–{Math.min((page + 1) * limit, total)} od {total}
              </span>
              <button
                onClick={nextPage}
                disabled={(page + 1) * limit >= total}
                style={{ padding: '6px 16px', borderRadius: 8, border: `1px solid ${C.border}`, background: '#fff', fontSize: 13, cursor: (page + 1) * limit >= total ? 'not-allowed' : 'pointer', opacity: (page + 1) * limit >= total ? 0.4 : 1 }}
              >
                Sljedeća
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
