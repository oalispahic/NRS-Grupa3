import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import { FileText, TrendingUp, CheckCircle2, Clock, XCircle, AlertCircle, Printer } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { C, PRIMARY, BTN } from '../../theme';

const BAR_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#f5f3ff', '#e0e7ff', '#c7d2fe', '#a5b4fc'];

const STATUS_META = {
  approved:  { label: 'Odobrene',    color: '#22c55e' },
  rejected:  { label: 'Odbijene',    color: '#ef4444' },
  cancelled: { label: 'Otkazane',    color: '#94a3b8' },
  pending:   { label: 'Na čekanju',  color: '#f59e0b' },
};

function KPI({ icon, label, value, sub }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 22px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, color: C.heading, lineHeight: 1 }}>{value ?? '—'}</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: C.subtle, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="report-card" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.heading, marginBottom: 18 }}>{title}</div>
      {children}
    </div>
  );
}

function fmt(isoStr) {
  if (!isoStr) return '';
  return new Date(isoStr).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit' });
}

export default function ReportsPage() {
  const { token } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  const firstOfYear = new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 10);

  const [from, setFrom] = useState(firstOfYear);
  const [to, setTo] = useState(today);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generate() {
    if (!from || !to) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/statistics/reportv2?from=${from}&to=${to}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await r.json();
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${body.error || JSON.stringify(body)}`);
      setData(body);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const kpi = data?.kpi || {};
  const topEquipment = data?.topEquipment || [];
  const trend = data?.trend || [];
  const statusBreakdown = data?.statusBreakdown || [];
  const topUsers = data?.topUsers || [];

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .report-card { break-inside: avoid; }
          body { background: #fff !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1000 }}>
        {/* Header */}
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color={PRIMARY} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: C.heading, margin: 0 }}>Izvještaji</h1>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Grafički prikaz korištenosti sistema</div>
            </div>
          </div>
          {data && (
            <button
              onClick={() => window.print()}
              style={{ ...BTN.outline, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Printer size={15} />
              Exportuj PDF
            </button>
          )}
        </div>

        {/* Date range form */}
        <div className="no-print" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Od datuma</label>
            <input
              type="date"
              value={from}
              max={to}
              onChange={e => setFrom(e.target.value)}
              style={{ padding: '8px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.heading, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Do datuma</label>
            <input
              type="date"
              value={to}
              min={from}
              onChange={e => setTo(e.target.value)}
              style={{ padding: '8px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.heading, outline: 'none' }}
            />
          </div>
          <button
            onClick={generate}
            disabled={loading}
            style={{ ...BTN.primary, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Učitavanje...' : 'Generiraj izvještaj'}
          </button>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '14px 18px', color: '#991b1b', marginBottom: 20 }}>
            Greška pri učitavanju: {error}
          </div>
        )}

        {!data && !loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted }}>
            <FileText size={40} color={C.border} style={{ marginBottom: 12 }} />
            <div style={{ fontSize: 15 }}>Odaberi period i klikni "Generiraj izvještaj"</div>
          </div>
        )}

        {data && (
          <>
            {/* Print header (only visible in print) */}
            <div style={{ display: 'none' }} className="print-only">
              <style>{`.print-only { display: block !important; } @media screen { .print-only { display: none !important; } }`}</style>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Izvještaj o korištenosti sistema</h2>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>Period: {from} — {to}</p>
            </div>

            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
              <KPI icon={<TrendingUp size={20} color={PRIMARY} />} label="Ukupno rezervacija" value={kpi.total_reservations} />
              <KPI icon={<CheckCircle2 size={20} color="#22c55e" />} label="Odobrene" value={kpi.approved} sub={`Stopa odobrenja: ${kpi.approval_rate ?? 0}%`} />
              <KPI icon={<XCircle size={20} color="#ef4444" />} label="Odbijene" value={kpi.rejected} />
              <KPI icon={<AlertCircle size={20} color="#f59e0b" />} label="Na čekanju" value={kpi.pending} />
              <KPI icon={<Clock size={20} color={PRIMARY} />} label="Prosj. trajanje" value={kpi.avg_duration_hours ? `${kpi.avg_duration_hours}h` : '—'} />
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 20, marginBottom: 24 }}>
              <Card title="Top 10 opreme po rezervacijama">
                {topEquipment.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 32, color: C.subtle }}>Nema podataka</div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={topEquipment} layout="vertical" margin={{ left: 8, right: 16 }}>
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="equipment_name" type="category" width={120} tick={{ fontSize: 11 }} />
                      <Tooltip formatter={v => [v, 'Rezervacija']} />
                      <Bar dataKey="reservation_count" radius={[0, 4, 4, 0]}>
                        {topEquipment.map((_, i) => (
                          <rect key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Card>

              <Card title="Trend rezervacija po danima">
                {trend.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 32, color: C.subtle }}>Nema podataka</div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={trend} margin={{ left: 0, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="day" tickFormatter={fmt} tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                      <Tooltip labelFormatter={fmt} formatter={v => [v, 'Rezervacija']} />
                      <Line type="monotone" dataKey="count" stroke={PRIMARY} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </Card>
            </div>

            {/* Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20, marginBottom: 24 }}>
              <Card title="Rezervacije po statusu">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <th style={{ textAlign: 'left', padding: '8px 4px', color: C.muted, fontWeight: 600 }}>Status</th>
                      <th style={{ textAlign: 'right', padding: '8px 4px', color: C.muted, fontWeight: 600 }}>Broj</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusBreakdown.length === 0 ? (
                      <tr><td colSpan={2} style={{ textAlign: 'center', padding: 20, color: C.subtle }}>Nema podataka</td></tr>
                    ) : statusBreakdown.map(row => {
                      const meta = STATUS_META[row.status] || { label: row.status, color: C.muted };
                      return (
                        <tr key={row.status} style={{ borderBottom: `1px solid ${C.borderFaint}` }}>
                          <td style={{ padding: '10px 4px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
                              {meta.label}
                            </span>
                          </td>
                          <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 700, color: C.heading }}>{row.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>

              <Card title="Top 5 korisnika po aktivnosti">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <th style={{ textAlign: 'left', padding: '8px 4px', color: C.muted, fontWeight: 600 }}>Korisnik</th>
                      <th style={{ textAlign: 'right', padding: '8px 4px', color: C.muted, fontWeight: 600 }}>Rezervacija</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUsers.length === 0 ? (
                      <tr><td colSpan={2} style={{ textAlign: 'center', padding: 20, color: C.subtle }}>Nema podataka</td></tr>
                    ) : topUsers.map((u, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.borderFaint}` }}>
                        <td style={{ padding: '10px 4px' }}>
                          <div style={{ fontWeight: 600, color: C.heading }}>{u.full_name}</div>
                          <div style={{ fontSize: 11, color: C.subtle }}>{u.email}</div>
                        </td>
                        <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 700, color: C.heading }}>{u.reservation_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
}
