import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, BookOpen, Settings, ChevronRight, Activity, Package, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { PRIMARY, C, iconBox, STATUS_RESERVATION } from '../theme';

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

function AdminDashboard() {
  const [equipCount, setEquipCount] = useState(null);

  useEffect(() => {
    fetch('/api/equipment').then(r => r.json()).then(d => setEquipCount(Array.isArray(d) ? d.length : 0)).catch(() => setEquipCount(0));
  }, []);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard icon={Package}   label="Ukupno opreme"   value={equipCount} color={PRIMARY} />
        <StatCard icon={Activity}  label="Sistem aktivan"  value="Online"     color="#10b981" />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: C.heading, marginBottom: 14 }}>Brze akcije</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
        <QuickLink to="/admin/equipment" icon={Settings}  label="Upravljanje opremom" desc="Dodaj, uredi ili obriši opremu" />
        <QuickLink to="/equipment"       icon={Microscope} label="Pregled opreme"      desc="Vidi cijeli inventar laboratorije" />
      </div>
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
          {user.role === 'admin' ? 'Administrator' : 'Laborant'}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading, lineHeight: 1.2 }}>
          {greeting}, <span style={{ color: PRIMARY }}>{user.full_name.split(' ')[0]}</span>
        </h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>
          {user.role === 'admin' ? 'Upravljajte opremom i pratite stanje sistema.' : 'Pregledajte opremu i upravljajte rezervacijama.'}
        </p>
      </div>

      {user.role === 'admin' ? <AdminDashboard /> : <LaborantDashboard token={token} />}
    </div>
  );
}
