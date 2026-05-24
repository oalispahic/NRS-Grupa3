import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid,
} from 'recharts';
import { BarChart2, TrendingUp, CheckCircle2, Clock, Users, Microscope } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { C } from '../../theme';

const STATUS_COLORS = {
  approved: '#22c55e',
  pending: '#f59e0b',
  rejected: '#ef4444',
  cancelled: '#94a3b8',
};
const STATUS_LABELS = {
  approved: 'Odobrene',
  pending: 'Na čekanju',
  rejected: 'Odbijene',
  cancelled: 'Otkazane',
};

const BAR_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#f5f3ff'];

function KPICard({ icon, label, value, sub }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.heading, lineHeight: 1 }}>{value ?? '—'}</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: C.subtle, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.heading, marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  );
}

function fmtWeek(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function StatisticsPage() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/statistics', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        if (d && d.kpi) setData(d);
        else setError('Neočekivani format odgovora od servera.');
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ padding: 60, textAlign: 'center', color: C.muted }}>Učitavanje statistika...</div>
  );

  if (error) return (
    <div style={{ padding: 60, textAlign: 'center' }}>
      <div style={{ fontSize: 14, color: '#991b1b', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 10, padding: '16px 24px', display: 'inline-block' }}>
        Greška pri učitavanju statistika: {error}
      </div>
    </div>
  );

  const kpi = data?.kpi || {};
  const pieData = (data?.statusDistribution || []).map(s => ({
    name: STATUS_LABELS[s.status] || s.status,
    value: parseInt(s.count),
    color: STATUS_COLORS[s.status] || '#94a3b8',
  }));
  const barData = (data?.topEquipment || []).map((e, i) => ({
    name: e.equipment_name.length > 20 ? e.equipment_name.slice(0, 18) + '…' : e.equipment_name,
    fullName: e.equipment_name,
    count: parseInt(e.reservation_count),
    fill: BAR_COLORS[i % BAR_COLORS.length],
  }));
  const lineData = (data?.weeklyTrend || []).map(w => ({
    week: fmtWeek(w.week),
    rezervacije: parseInt(w.count),
  }));

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>Administrator</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Statistike i analitika</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregled korištenosti sistema — rezervacije, oprema i korisnici.</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard
          icon={<Microscope size={20} color="#6366f1" />}
          label="Ukupno opreme"
          value={kpi.total_equipment}
        />
        <KPICard
          icon={<BarChart2 size={20} color="#6366f1" />}
          label="Ukupno rezervacija"
          value={kpi.total_reservations}
        />
        <KPICard
          icon={<Users size={20} color="#6366f1" />}
          label="Registrovanih korisnika"
          value={kpi.total_users}
        />
        <KPICard
          icon={<Clock size={20} color="#6366f1" />}
          label="Prosječno trajanje"
          value={kpi.avg_duration_hours ? `${kpi.avg_duration_hours}h` : '—'}
          sub="odobrene rezervacije"
        />
        <KPICard
          icon={<CheckCircle2 size={20} color="#6366f1" />}
          label="Stopa odobrenja"
          value={kpi.approval_rate ? `${kpi.approval_rate}%` : '—'}
          sub="approved / (approved + rejected)"
        />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20, marginBottom: 20 }}>
        <ChartCard title="Top 7 najrezerviranijih komada opreme">
          {barData.length === 0 ? (
            <div style={{ fontSize: 13, color: C.subtle, textAlign: 'center', padding: 30 }}>Nema podataka</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v, n, p) => [v, p.payload.fullName]} />
                {barData.map((entry, i) => null)}
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Distribucija statusa rezervacija">
          {pieData.length === 0 ? (
            <div style={{ fontSize: 13, color: C.subtle, textAlign: 'center', padding: 30 }}>Nema podataka</div>
          ) : (() => {
            const total = pieData.reduce((s, d) => s + d.value, 0);
            return (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={44}
                      dataKey="value"
                      labelLine={false}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} (${total ? ((value / total) * 100).toFixed(0) : 0}%)`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 12 }}>
                  {pieData.map((entry, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.body }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: entry.color, flexShrink: 0, display: 'inline-block' }} />
                      <span>{entry.name}</span>
                      <span style={{ fontWeight: 700, color: C.heading }}>{entry.value}</span>
                      <span style={{ color: C.muted }}>({total ? ((entry.value / total) * 100).toFixed(0) : 0}%)</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </ChartCard>
      </div>

      <ChartCard title="Trend rezervacija — posljednjih 12 sedmica">
        {lineData.length === 0 ? (
          <div style={{ fontSize: 13, color: C.subtle, textAlign: 'center', padding: 30 }}>Nema podataka</div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData} margin={{ left: 0, right: 20, top: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderFaint} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="rezervacije" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
