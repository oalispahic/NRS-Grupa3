import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, BookOpen, Settings, ChevronRight, Activity, Package, Clock, CalendarDays, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { PRIMARY, C, iconBox, STATUS_RESERVATION, STATUS_EQUIPMENT } from '../theme';

const STATUS_COLORS = {
  available:      { fill: '#22c55e', border: '#16a34a', label: 'Nema rezervacija' },
  reserved:       { fill: '#f59e0b', border: '#d97706', label: 'Postoje rezervacije' },
  maintenance:    { fill: '#ef4444', border: '#dc2626', label: 'Održavanje' },
  out_of_service: { fill: '#94a3b8', border: '#64748b', label: 'Van upotrebe' },
};

function EquipmentMosaic({ equipment }) {
  const [hovered, setHovered] = useState(null);

  const counts = equipment.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Package size={15} color={PRIMARY} />
          <span style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>Status mozaik opreme</span>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {Object.entries(STATUS_COLORS).map(([key, { fill, label }]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: C.muted }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: fill, display: 'inline-block', flexShrink: 0 }} />
              {label} ({counts[key] || 0})
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {equipment.map(item => {
            const s = STATUS_COLORS[item.status] || STATUS_COLORS.out_of_service;
            const isHov = hovered === item.id;
            return (
              <Link
                key={item.id}
                to={`/equipment/${item.id}`}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                title={item.name}
                style={{
                  width: 18, height: 18,
                  borderRadius: 4,
                  background: s.fill,
                  border: `1.5px solid ${isHov ? s.border : s.fill}`,
                  display: 'block',
                  transform: isHov ? 'scale(1.45)' : 'scale(1)',
                  transition: 'transform 0.12s, border-color 0.12s',
                  boxShadow: isHov ? `0 2px 8px ${s.fill}88` : 'none',
                  zIndex: isHov ? 10 : 1,
                  position: 'relative',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </div>
        {hovered && (() => {
          const item = equipment.find(e => e.id === hovered);
          if (!item) return null;
          const s = STATUS_COLORS[item.status] || STATUS_COLORS.out_of_service;
          return (
            <div style={{
              position: 'fixed', bottom: 20, right: 20,
              background: '#fff', border: `1px solid ${C.border}`,
              borderRadius: 10, padding: '10px 14px',
              boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
              zIndex: 1000, pointerEvents: 'none', maxWidth: 240,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.heading, marginBottom: 4 }}>{item.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.fill, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: C.muted }}>{s.label}</span>
              </div>
              {item.location && <div style={{ fontSize: 11, color: C.subtle, marginTop: 3 }}>{item.location}</div>}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function ReservationTimeline({ reservations, isAdmin }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() + i); return d;
  });

  const approved = reservations.filter(r => r.status === 'approved' && new Date(r.end_time) >= today);

  function dayLabel(i) {
    if (i === 0) return 'Danas';
    if (i === 1) return 'Sutra';
    const d = days[i];
    return d.toLocaleDateString('bs-BA', { weekday: 'short', day: '2-digit', month: '2-digit' });
  }

  function getDayItems(day) {
    const next = new Date(day); next.setDate(next.getDate() + 1);
    return approved.filter(r => new Date(r.start_time) < next && new Date(r.end_time) >= day);
  }

  const totalBusy = approved.filter(r => new Date(r.start_time) >= today).length;
  const hasSomething = days.some(d => getDayItems(d).length > 0);
  if (!hasSomething) return null;

  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarDays size={15} color={PRIMARY} />
          <span style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>Zauzeta oprema — narednih 7 dana</span>
        </div>
        {totalBusy > 0 && (
          <span style={{ background: '#eff6ff', color: PRIMARY, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
            {totalBusy} {totalBusy === 1 ? 'rezervacija' : 'rezervacija'}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: 6 }}>
        {days.map((day, i) => {
          const items = getDayItems(day);
          const isToday = i === 0;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, textAlign: 'center',
                padding: '5px 4px', borderRadius: 7, letterSpacing: 0.3,
                background: isToday ? PRIMARY : C.bgFaint,
                color: isToday ? '#fff' : C.muted,
                textTransform: 'uppercase',
              }}>
                {dayLabel(i)}
              </div>
              <div style={{ minHeight: 44, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {items.length === 0 ? (
                  <div style={{ flex: 1, borderRadius: 6, border: `1px dashed ${C.borderFaint}`, minHeight: 40, background: C.bgFaint + '80' }} />
                ) : items.map(r => (
                  <div key={r.id}
                    title={`${r.equipment_name}${isAdmin && r.full_name ? ' · ' + r.full_name : ''}`}
                    style={{
                      background: '#dbeafe', border: '1px solid #93c5fd',
                      borderLeft: `3px solid ${PRIMARY}`,
                      borderRadius: '0 6px 6px 0',
                      padding: '4px 6px',
                      fontSize: 9, fontWeight: 600, color: '#1e40af',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                    {r.equipment_name}
                    {isAdmin && r.full_name && (
                      <div style={{ fontSize: 9, fontWeight: 400, color: '#3b82f6', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {r.full_name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ ...iconBox(44, 10), background: color + '20' }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.heading, lineHeight: 1 }}>{value ?? '—'}</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      </div>
    </div>
  );
}

function QuickLink({ to, icon: Icon, label, desc }) {
  return (
    <Link to={to} className="card-hover" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color 0.15s, box-shadow 0.15s' }}>
      <div style={iconBox(40, 10)}>
        <Icon size={18} color={PRIMARY} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{label}</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{desc}</div>
      </div>
      <ChevronRight size={16} color={C.subtle} />
    </Link>
  );
}

function AdminDashboard({ token }) {
  const [equipment, setEquipment]       = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('/api/equipment').then(r => r.json()).then(d => setEquipment(Array.isArray(d) ? d : [])).catch(() => {});
    fetch('/api/reservations', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setReservations(Array.isArray(d) ? d : [])).catch(() => {});
  }, [token]);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard icon={Package}   label="Ukupno opreme"   value={equipment.length || null} color={PRIMARY} />
        <StatCard icon={Activity}  label="Sistem aktivan"  value="Online"                   color="#10b981" />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: C.heading, marginBottom: 14 }}>Brze akcije</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
        <QuickLink to="/admin/equipment" icon={Settings}   label="Upravljanje opremom" desc="Dodaj, uredi ili obriši opremu" />
        <QuickLink to="/equipment"       icon={Microscope} label="Pregled opreme"       desc="Vidi cijeli inventar laboratorije" />
      </div>
      {equipment.length > 0 && <EquipmentMosaic equipment={equipment} />}
      {reservations.length > 0 && <ReservationTimeline reservations={reservations} isAdmin={true} />}
    </>
  );
}

function LaborantDashboard({ token }) {
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    fetch('/api/reservations/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setReservations(Array.isArray(d) ? d : [])).catch(() => setReservations([]));
  }, [token]);

  const pending  = reservations?.filter(r => r.status === 'pending').length ?? null;
  const approved = reservations?.filter(r => r.status === 'approved').length ?? null;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard icon={Clock}    label="Na čekanju"  value={pending}  color="#f59e0b" />
        <StatCard icon={Activity} label="Odobrene"    value={approved} color="#10b981" />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: C.heading, marginBottom: 14 }}>Brze akcije</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
        <QuickLink to="/equipment"       icon={Microscope} label="Pregledaj opremu"     desc="Pronađi i rezerviši aparate" />
        <QuickLink to="/reservations/my" icon={BookOpen}   label="Moje rezervacije"     desc="Prati status svojih zahtjeva" />
      </div>

      {reservations && reservations.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Posljednje rezervacije</h3>
            <Link to="/reservations/my" className="app-link">Vidi sve →</Link>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {reservations.slice(0, 3).map((r, i) => {
              const sc = STATUS_RESERVATION[r.status] || { bg: '#f1f5f9', color: '#475569', label: r.status };
              return (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: i < 2 ? `1px solid ${C.borderFaint}` : 'none', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: C.heading }}>{r.equipment_name}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                      {new Date(r.start_time).toLocaleString('bs-BA', { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                  </div>
                  <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{sc.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  const { user, token } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Dobro jutro' : hour < 18 ? 'Dobar dan' : 'Dobro veče';

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          {user.role === 'admin' ? 'Administrator' : user.role === 'test' ? 'Test' : 'Laborant'}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading, lineHeight: 1.2 }}>
          {greeting}, <span style={{ color: PRIMARY }}>{user.full_name.split(' ')[0]}</span>
        </h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>
          {user.role === 'admin' || user.role === 'test' ? 'Upravljajte opremom i pratite stanje sistema.' : 'Pregledajte opremu i upravljajte rezervacijama.'}
        </p>
      </div>

      {user.role === 'admin' ? <AdminDashboard token={token} /> : user.role === 'test' ? <><AdminDashboard token={token} /><LaborantDashboard token={token} /></> : <LaborantDashboard token={token} />}
    </div>
  );
}
