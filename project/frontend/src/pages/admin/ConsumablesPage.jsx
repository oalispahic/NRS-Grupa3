import { useEffect, useState } from 'react';
import { Plus, Trash2, Package, ChevronDown, ChevronUp, AlertTriangle, History } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { C, BTN } from '../../theme';

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ConsumablesPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [consumables, setConsumables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [logs, setLogs] = useState({});
  const [adjustModal, setAdjustModal] = useState(null);
  const [adjustChange, setAdjustChange] = useState('');
  const [adjustNote, setAdjustNote] = useState('');
  const [newItem, setNewItem] = useState({ name: '', unit: 'kom', quantity: '', low_stock_threshold: '5', notes: '' });

  const authH = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  async function load() {
    setLoading(true);
    try {
      const d = await fetch('/api/consumables', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
      setConsumables(Array.isArray(d) ? d : []);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function loadLogs(id) {
    const d = await fetch(`/api/consumables/${id}/logs`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
    setLogs(prev => ({ ...prev, [id]: Array.isArray(d) ? d : [] }));
  }

  function toggleExpand(id) {
    if (expandedId === id) { setExpandedId(null); return; }
    setExpandedId(id);
    if (!logs[id]) loadLogs(id);
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    const res = await fetch('/api/consumables', {
      method: 'POST', headers: authH(),
      body: JSON.stringify({ ...newItem, quantity: parseFloat(newItem.quantity) || 0, low_stock_threshold: parseFloat(newItem.low_stock_threshold) || 5 }),
    });
    if (res.ok) {
      toast.success('Stavka dodana.');
      setNewItem({ name: '', unit: 'kom', quantity: '', low_stock_threshold: '5', notes: '' });
      load();
    } else {
      const d = await res.json();
      toast.error(d.error || 'Greška.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Obrisati stavku i sav log?')) return;
    const res = await fetch(`/api/consumables/${id}`, { method: 'DELETE', headers: authH() });
    if (res.ok || res.status === 204) { toast.success('Stavka obrisana.'); load(); }
    else toast.error('Greška pri brisanju.');
  }

  async function handleAdjust() {
    const change = parseFloat(adjustChange);
    if (!adjustModal || isNaN(change) || change === 0) return;
    const res = await fetch(`/api/consumables/${adjustModal.id}/adjust`, {
      method: 'PATCH', headers: authH(),
      body: JSON.stringify({ change, note: adjustNote.trim() || undefined }),
    });
    if (res.ok) {
      toast.success('Zaliha ažurirana.');
      setAdjustModal(null); setAdjustChange(''); setAdjustNote('');
      load();
      if (expandedId === adjustModal.id) loadLogs(adjustModal.id);
    } else {
      toast.error('Greška pri ažuriranju zalihe.');
    }
  }

  const FIELD = { width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13, color: C.body, fontFamily: 'inherit', boxSizing: 'border-box' };

  return (
    <div>
      {/* Adjust modal */}
      {adjustModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 400, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: C.heading, marginBottom: 6 }}>Ažuriraj zalihu</h2>
            <p style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>
              <strong>{adjustModal.name}</strong> — trenutno: {parseFloat(adjustModal.quantity)} {adjustModal.unit}
            </p>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>Promjena (+ dodati, − oduzeti)</label>
            <input
              type="number"
              step="0.01"
              value={adjustChange}
              onChange={e => setAdjustChange(e.target.value)}
              placeholder="npr. 10 ili -3"
              style={{ ...FIELD, marginBottom: 12 }}
              autoFocus
            />
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>Napomena (opcionalno)</label>
            <input value={adjustNote} onChange={e => setAdjustNote(e.target.value)} placeholder="Razlog promjene..." style={{ ...FIELD, marginBottom: 18 }} />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => { setAdjustModal(null); setAdjustChange(''); setAdjustNote(''); }} style={{ ...BTN.ghost, padding: '8px 16px', fontSize: 13 }}>Odustani</button>
              <button onClick={handleAdjust} style={{ ...BTN.primary, padding: '8px 16px', fontSize: 13 }}>Spremi</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>Administrator</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Inventar repromaterijala</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pratite zalihe potrošnog materijala u laboratoriji.</p>
      </div>

      {/* Add form */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: C.heading, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} color="#6366f1" /> Nova stavka
        </h2>
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>Naziv *</label>
              <input value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="npr. Staklene pločice" required style={FIELD} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>Jedinica</label>
              <input value={newItem.unit} onChange={e => setNewItem({ ...newItem, unit: e.target.value })} placeholder="kom, ml, g..." style={FIELD} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>Početna količina</label>
              <input type="number" step="0.01" min="0" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} placeholder="0" style={FIELD} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>Prag upozorenja</label>
              <input type="number" step="0.01" min="0" value={newItem.low_stock_threshold} onChange={e => setNewItem({ ...newItem, low_stock_threshold: e.target.value })} style={FIELD} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>Napomena</label>
              <input value={newItem.notes} onChange={e => setNewItem({ ...newItem, notes: e.target.value })} placeholder="Opcionalna napomena..." style={FIELD} />
            </div>
          </div>
          <button type="submit" style={{ ...BTN.primary, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', fontSize: 13 }}>
            <Plus size={14} /> Dodaj stavku
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ display: 'grid', gap: 10 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: C.muted }}>Učitavanje...</div>
        ) : consumables.length === 0 ? (
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '60px 40px', textAlign: 'center' }}>
            <Package size={36} color={C.subtle} style={{ margin: '0 auto 14px', display: 'block' }} />
            <p style={{ fontSize: 14, color: C.muted }}>Nema evidentiranih stavki repromaterijala.</p>
          </div>
        ) : consumables.map(c => {
          const isLow = parseFloat(c.quantity) <= parseFloat(c.low_stock_threshold);
          const isExpanded = expandedId === c.id;
          return (
            <div key={c.id} style={{ background: '#fff', border: `1px solid ${isLow ? '#fcd34d' : C.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>{c.name}</span>
                    {isLow && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#92400e', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 99, padding: '2px 8px' }}>
                        <AlertTriangle size={11} /> Niska zaliha
                      </span>
                    )}
                  </div>
                  {c.notes && <div style={{ fontSize: 12, color: C.subtle, marginTop: 2 }}>{c.notes}</div>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: isLow ? '#d97706' : C.heading }}>{parseFloat(c.quantity)}</span>
                  <span style={{ fontSize: 13, color: C.muted }}>{c.unit}</span>
                  <span style={{ fontSize: 12, color: C.subtle, marginLeft: 4 }}>(min. {parseFloat(c.low_stock_threshold)})</span>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button onClick={() => setAdjustModal(c)} style={{ ...BTN.primary, padding: '6px 14px', fontSize: 13 }}>Ažuriraj zalihu</button>
                  <button onClick={() => toggleExpand(c.id)} style={{ ...BTN.ghost, padding: '6px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                    <History size={13} /> {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  <button onClick={() => handleDelete(c.id)} style={{ ...BTN.danger, padding: '6px 10px', fontSize: 12 }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div style={{ borderTop: `1px solid ${C.borderFaint}`, padding: '12px 20px', background: '#f8fafc' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 10 }}>Log promjena</div>
                  {!logs[c.id] ? (
                    <div style={{ fontSize: 13, color: C.subtle }}>Učitavanje...</div>
                  ) : logs[c.id].length === 0 ? (
                    <div style={{ fontSize: 13, color: C.subtle }}>Nema evidentiranih promjena.</div>
                  ) : (
                    <div style={{ display: 'grid', gap: 6 }}>
                      {logs[c.id].map(log => (
                        <div key={log.id} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
                          <span style={{ fontWeight: 700, color: parseFloat(log.change) >= 0 ? '#16a34a' : '#dc2626', minWidth: 60 }}>
                            {parseFloat(log.change) >= 0 ? '+' : ''}{parseFloat(log.change)} {c.unit}
                          </span>
                          <span style={{ color: C.muted, fontSize: 12 }}>{fmt(log.created_at)}</span>
                          {log.user_name && <span style={{ color: C.subtle, fontSize: 12 }}>{log.user_name}</span>}
                          {log.note && <span style={{ color: C.body, fontStyle: 'italic' }}>{log.note}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
