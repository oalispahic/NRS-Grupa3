import { useEffect, useState } from 'react';
import { ListChecks, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { C, PRIMARY } from '../theme';

const PRIORITY_META = {
  low:    { label: 'Nizak',   color: '#64748b', bg: '#f1f5f9' },
  medium: { label: 'Srednji', color: '#2563eb', bg: '#eff6ff' },
  high:   { label: 'Visok',   color: '#d97706', bg: '#fffbeb' },
  urgent: { label: 'Hitno',   color: '#dc2626', bg: '#fee2e2' },
};

const STATUS_META = {
  open:        { label: 'Otvoreno',    color: '#2563eb', bg: '#eff6ff', icon: Clock },
  in_progress: { label: 'U toku',      color: '#d97706', bg: '#fffbeb', icon: AlertCircle },
  completed:   { label: 'Završeno',    color: '#16a34a', bg: '#dcfce7', icon: CheckCircle2 },
};

const STATUS_TRANSITIONS = {
  open:        'in_progress',
  in_progress: 'completed',
};

const STATUS_BTN_LABEL = {
  open:        'Označi kao u toku',
  in_progress: 'Označi kao završeno',
};

export default function MyTasksPage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const hdr = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch('/api/maintenance/mine', { headers: hdr })
      .then(r => r.json())
      .then(d => setTasks(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function advanceStatus(task) {
    const next = STATUS_TRANSITIONS[task.status];
    if (!next) return;
    setUpdating(task.id);
    try {
      const r = await fetch(`/api/maintenance/${task.id}/status`, {
        method: 'PATCH',
        headers: { ...hdr, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      if (r.ok) {
        const updated = await r.json();
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, ...updated } : t));
      }
    } finally {
      setUpdating(null);
    }
  }

  function fmtDate(d) {
    if (!d) return null;
    return new Date(d).toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  const open = tasks.filter(t => t.status !== 'completed');
  const done = tasks.filter(t => t.status === 'completed');

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: C.muted }}>Učitavanje...</div>;

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ListChecks size={20} color={PRIMARY} />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.heading, margin: 0 }}>Moji zadaci</h1>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
            {open.length} aktivnih · {done.length} završenih
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted }}>
          <ListChecks size={40} color={C.border} style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 15 }}>Nema dodijeljenih zadataka</div>
        </div>
      ) : (
        <>
          {open.length > 0 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
                Aktivni zadaci ({open.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {open.map(task => <TaskCard key={task.id} task={task} onAdvance={advanceStatus} updating={updating === task.id} fmtDate={fmtDate} />)}
              </div>
            </>
          )}
          {done.length > 0 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
                Završeni ({done.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {done.map(task => <TaskCard key={task.id} task={task} onAdvance={advanceStatus} updating={updating === task.id} fmtDate={fmtDate} />)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function TaskCard({ task, onAdvance, updating, fmtDate }) {
  const p = PRIORITY_META[task.priority] || PRIORITY_META.medium;
  const s = STATUS_META[task.status] || STATUS_META.open;
  const StatusIcon = s.icon;
  const overdue = task.due_date && task.status !== 'completed' && new Date(task.due_date) < new Date();
  const canAdvance = STATUS_TRANSITIONS[task.status];

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${overdue ? '#fca5a5' : C.border}`,
      borderRadius: 12,
      padding: '16px 20px',
      borderLeft: `4px solid ${p.color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <StatusIcon size={15} color={s.color} />
            <span style={{ fontSize: 15, fontWeight: 700, color: C.heading }}>{task.title}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: p.color, background: p.bg, padding: '2px 8px', borderRadius: 99 }}>{p.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, padding: '2px 8px', borderRadius: 99 }}>{s.label}</span>
            {overdue && <span style={{ fontSize: 11, fontWeight: 700, color: '#991b1b', background: '#fee2e2', padding: '2px 8px', borderRadius: 99 }}>Prekoračen rok</span>}
          </div>

          <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>
            <strong style={{ color: C.body }}>Oprema:</strong> {task.equipment_name}
            {task.due_date && (
              <span style={{ marginLeft: 12 }}>
                <strong style={{ color: C.body }}>Rok:</strong>{' '}
                <span style={{ color: overdue ? '#dc2626' : C.body }}>{fmtDate(task.due_date)}</span>
              </span>
            )}
          </div>

          {task.description && (
            <div style={{ fontSize: 13, color: C.muted, background: C.bgFaint, borderRadius: 8, padding: '8px 12px', marginTop: 8 }}>
              {task.description}
            </div>
          )}
        </div>

        {canAdvance && (
          <button
            onClick={() => onAdvance(task)}
            disabled={updating}
            style={{
              padding: '7px 14px',
              background: task.status === 'in_progress' ? '#dcfce7' : '#eff6ff',
              color: task.status === 'in_progress' ? '#16a34a' : '#2563eb',
              border: `1px solid ${task.status === 'in_progress' ? '#86efac' : '#bfdbfe'}`,
              borderRadius: 8, fontSize: 12, fontWeight: 600,
              cursor: updating ? 'not-allowed' : 'pointer',
              opacity: updating ? 0.6 : 1,
              flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <CheckCircle2 size={13} />
            {STATUS_BTN_LABEL[task.status]}
          </button>
        )}
      </div>
    </div>
  );
}
