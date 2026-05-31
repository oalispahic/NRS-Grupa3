import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Plus, ChevronDown, ChevronUp, AlertCircle, Check, Trash2, CalendarClock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { C, PRIMARY, BTN } from '../../theme';

const PRIORITY_META = {
  low:    { label: 'Nizak',   color: '#64748b', bg: '#f1f5f9' },
  medium: { label: 'Srednji', color: '#2563eb', bg: '#eff6ff' },
  high:   { label: 'Visok',   color: '#d97706', bg: '#fffbeb' },
  urgent: { label: 'Hitno',   color: '#dc2626', bg: '#fee2e2' },
};

const STATUS_META = {
  open:        { label: 'Otvoreno',    color: '#2563eb', bg: '#eff6ff' },
  in_progress: { label: 'U toku',      color: '#d97706', bg: '#fffbeb' },
  completed:   { label: 'Završeno',    color: '#16a34a', bg: '#dcfce7' },
};

function Badge({ text, color, bg }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 0.4 }}>
      {text}
    </span>
  );
}

const EMPTY = { equipment_id: '', assigned_to: '', title: '', description: '', priority: 'medium', due_date: '' };

export default function MaintenancePage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [upcomingServices, setUpcomingServices] = useState([]);

  const hdr = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    Promise.all([
      fetch('/api/maintenance', { headers: hdr }).then(r => r.json()),
      fetch('/api/users', { headers: hdr }).then(r => r.json()),
      fetch('/api/equipment', { headers: hdr }).then(r => r.json()),
      fetch('/api/maintenance/upcoming-services?days=30', { headers: hdr }).then(r => r.json()),
    ]).then(([t, u, e, us]) => {
      setTasks(Array.isArray(t) ? t : []);
      setUsers(Array.isArray(u) ? u : []);
      setEquipment(Array.isArray(e) ? e : []);
      setUpcomingServices(Array.isArray(us) ? us : []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function loadTasks() {
    const url = filterStatus ? `/api/maintenance?status=${filterStatus}` : '/api/maintenance';
    const t = await fetch(url, { headers: hdr }).then(r => r.json()).catch(() => []);
    setTasks(Array.isArray(t) ? t : []);
  }

  useEffect(() => { if (!loading) loadTasks(); }, [filterStatus]);

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const r = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { ...hdr, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipment_id: form.equipment_id,
          assigned_to: form.assigned_to || null,
          title: form.title,
          description: form.description || null,
          priority: form.priority,
          due_date: form.due_date || null,
        }),
      });
      if (!r.ok) return;
      const task = await r.json();
      setTasks(prev => [task, ...prev]);
      setForm(EMPTY);
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Obrisati ovaj zadatak?')) return;
    await fetch(`/api/maintenance/${id}`, { method: 'DELETE', headers: hdr });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const filteredTasks = filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks;

  function fmtDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  const f = (key, val) => setForm(p => ({ ...p, [key]: val }));
  const inp = { padding: '8px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.heading, width: '100%', outline: 'none' };

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: C.muted }}>Učitavanje...</div>;

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wrench size={20} color="#d97706" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.heading, margin: 0 }}>Održavanje opreme</h1>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Upravljanje servisnim zadacima</div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(p => !p)}
          style={{ ...BTN.primary, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {showForm ? <ChevronUp size={15} /> : <Plus size={15} />}
          {showForm ? 'Zatvori' : 'Novi zadatak'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.heading, marginBottom: 16 }}>Novi maintenance zadatak</div>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Oprema *</label>
                <select value={form.equipment_id} onChange={e => f('equipment_id', e.target.value)} required style={inp}>
                  <option value="">-- Odaberi opremu --</option>
                  {equipment.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Dodijeli korisniku</label>
                <select value={form.assigned_to} onChange={e => f('assigned_to', e.target.value)} style={inp}>
                  <option value="">-- Niko (ostavi bez assignee) --</option>
                  {users.filter(u => u.is_active !== false).map(u => <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Naslov zadatka *</label>
                <input value={form.title} onChange={e => f('title', e.target.value)} required placeholder="npr. Kalibracija rotora" style={inp} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Prioritet</label>
                <select value={form.priority} onChange={e => f('priority', e.target.value)} style={inp}>
                  {Object.entries(PRIORITY_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Rok</label>
                <input type="date" value={form.due_date} onChange={e => f('due_date', e.target.value)} style={inp} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'block', marginBottom: 6 }}>Opis / Upute</label>
              <textarea value={form.description} onChange={e => f('description', e.target.value)} rows={3} placeholder="Detaljan opis zadatka..." style={{ ...inp, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={saving} style={{ ...BTN.primary, opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Kreiranje...' : 'Kreiraj zadatak'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY); }} style={BTN.outline}>Otkaži</button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming planned services (PB51) */}
      {upcomingServices.length > 0 && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontWeight: 700, color: '#92400e', fontSize: 14 }}>
            <CalendarClock size={16} color="#d97706" />
            Nadolazeći planirani servisi (narednih 30 dana)
            <span style={{ fontSize: 12, background: '#fde68a', color: '#92400e', borderRadius: 99, padding: '1px 8px' }}>{upcomingServices.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcomingServices.map(eq => {
              const sDate = new Date(eq.planned_service);
              const now = new Date();
              const diffDays = Math.ceil((sDate - now) / 86400000);
              const isOverdue = diffDays < 0;
              const isSoon = diffDays >= 0 && diffDays <= 7;
              const dateColor = isOverdue ? '#dc2626' : isSoon ? '#d97706' : C.body;
              const fmtDate = sDate.toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
              return (
                <Link
                  key={eq.id}
                  to={`/equipment/${eq.id}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: '#fff', borderRadius: 8, padding: '10px 14px', textDecoration: 'none', border: `1px solid ${isOverdue ? '#fca5a5' : '#fde68a'}`, flexWrap: 'wrap' }}
                >
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{eq.name}</span>
                    {eq.model && <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{eq.model}</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: dateColor }}>
                      {isOverdue ? `Kasni ${Math.abs(diffDays)}d` : diffDays === 0 ? 'Danas' : `Za ${diffDays}d`}
                    </span>
                    <span style={{ fontSize: 12, color: C.muted }}>{fmtDate}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['', 'open', 'in_progress', 'completed'].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer', fontWeight: filterStatus === s ? 700 : 400,
              background: filterStatus === s ? PRIMARY : '#fff',
              color: filterStatus === s ? '#fff' : C.muted,
              border: `1px solid ${filterStatus === s ? PRIMARY : C.border}`,
            }}
          >
            {s === '' ? 'Svi' : STATUS_META[s]?.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: C.muted }}>
          <Wrench size={36} color={C.border} style={{ marginBottom: 12 }} />
          <div>Nema zadataka{filterStatus ? ' za odabrani status' : ''}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredTasks.map(task => {
            const p = PRIORITY_META[task.priority] || PRIORITY_META.medium;
            const s = STATUS_META[task.status] || STATUS_META.open;
            const overdue = task.due_date && task.status !== 'completed' && new Date(task.due_date) < new Date();
            return (
              <div key={task.id} style={{ background: '#fff', border: `1px solid ${overdue ? '#fca5a5' : C.border}`, borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: C.heading }}>{task.title}</span>
                      <Badge text={p.label} color={p.color} bg={p.bg} />
                      <Badge text={s.label} color={s.color} bg={s.bg} />
                      {overdue && <Badge text="Prekoračen rok" color="#991b1b" bg="#fee2e2" />}
                    </div>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>
                      <strong style={{ color: C.body }}>Oprema:</strong> {task.equipment_name}
                      {task.assigned_to_name && <> · <strong style={{ color: C.body }}>Dodijeljen:</strong> {task.assigned_to_name}</>}
                      {task.due_date && <> · <strong style={{ color: C.body }}>Rok:</strong> {fmtDate(task.due_date)}</>}
                    </div>
                    {task.description && (
                      <div style={{ fontSize: 13, color: C.muted, background: C.bgFaint, borderRadius: 8, padding: '8px 12px', marginTop: 8 }}>
                        {task.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(task.id)}
                    title="Obriši zadatak"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.subtle, padding: 4, borderRadius: 6, flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = C.subtle}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
