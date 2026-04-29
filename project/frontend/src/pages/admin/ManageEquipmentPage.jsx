import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { PRIMARY, C, BTN, STATUS_EQUIPMENT } from '../../theme';

const STATUSES = Object.entries(STATUS_EQUIPMENT).map(([value, { label }]) => ({ value, label }));

const FIELD = { width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none', background: '#fff' };
const SELECT = { ...FIELD };

function focusStyle(e)  { e.target.style.borderColor = PRIMARY; }
function blurStyle(e)   { e.target.style.borderColor = C.border; }

export default function ManageEquipmentPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData]   = useState({});
  const [newItem, setNewItem]     = useState({ name: '', description: '', status: 'available', location: '' });
  const [addMsg, setAddMsg]       = useState(null);

  const authH = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  async function load() {
    const d = await fetch('/api/equipment').then(r => r.json());
    setEquipment(Array.isArray(d) ? d : []);
  }

  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setAddMsg(null);
    const res = await fetch('/api/equipment', { method: 'POST', headers: authH(), body: JSON.stringify(newItem) });
    const data = await res.json();
    if (!res.ok) {
      const message = data.error || 'Greska pri dodavanju';
      setAddMsg({ ok: false, text: message });
      toast.error(message);
      return;
    }
    const message = `"${data.name}" dodana u inventar.`;
    setAddMsg({ ok: true, text: message });
    toast.success(message);
    setNewItem({ name: '', description: '', status: 'available', location: '' });
    load();
  }

  async function handleSave(id) {
    const res = await fetch(`/api/equipment/${id}`, { method: 'PUT', headers: authH(), body: JSON.stringify(editData) });
    if (res.ok) {
      toast.success('Izmjene su spremljene.');
      setEditingId(null);
      load();
    } else {
      toast.error('Greska pri spremanju izmjena.');
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Obrisati "${name}"?`)) return;
    const res = await fetch(`/api/equipment/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      toast.success(`"${name}" je obrisana iz inventara.`);
      load();
    } else {
      toast.error('Greska pri brisanju opreme.');
    }
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditData({ name: item.name, description: item.description || '', status: item.status, location: item.location || '' });
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Administrator
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Upravljanje opremom</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Dodajte, uredite ili uklonite opremu iz inventara.</p>
      </div>

      {/* Add form */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 28px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <Plus size={16} color={PRIMARY} />
          <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Dodaj novu opremu</span>
        </div>

        {addMsg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: addMsg.ok ? '#f0fdf4' : '#fef2f2', border: `1px solid ${addMsg.ok ? '#bbf7d0' : '#fecaca'}`, borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: addMsg.ok ? '#166534' : '#991b1b' }}>
            {addMsg.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {addMsg.text}
          </div>
        )}

        <form onSubmit={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Naziv *</label>
              <input value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required placeholder="Naziv aparata" style={FIELD} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Lokacija</label>
              <input value={newItem.location} onChange={e => setNewItem({ ...newItem, location: e.target.value })} placeholder="Sala, kabinet..." style={FIELD} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Status</label>
              <select value={newItem.status} onChange={e => setNewItem({ ...newItem, status: e.target.value })} style={SELECT} onFocus={focusStyle} onBlur={blurStyle}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Opis</label>
              <input value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} placeholder="Kratak opis..." style={FIELD} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ ...BTN.primary, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Plus size={14} /> Dodaj opremu
          </button>
        </form>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Inventar</span>
          <span style={{ fontSize: 13, color: C.muted }}>{equipment.length} stavki</span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.muted, fontSize: 14 }}>Učitavanje...</div>
        ) : equipment.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.muted, fontSize: 14 }}>Nema opreme u inventaru.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: C.bgFaint }}>
                {['Naziv', 'Opis', 'Lokacija', 'Status', 'Akcije'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 20px', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {equipment.map(item => {
                const st = STATUS_EQUIPMENT[item.status] || STATUS_EQUIPMENT.out_of_service;
                const editing = editingId === item.id;
                return (
                  <tr key={item.id} className="row-hover" style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                    <td style={{ padding: '13px 20px' }}>
                      {editing
                        ? <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} style={{ ...FIELD, fontSize: 13 }} onFocus={focusStyle} onBlur={blurStyle} />
                        : <span style={{ fontSize: 14, fontWeight: 500, color: C.heading }}>{item.name}</span>}
                    </td>
                    <td style={{ padding: '13px 20px', maxWidth: 200 }}>
                      {editing
                        ? <input value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} placeholder="—" style={{ ...FIELD, fontSize: 13 }} onFocus={focusStyle} onBlur={blurStyle} />
                        : <span style={{ fontSize: 13, color: C.muted, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description || '—'}</span>}
                    </td>
                    <td style={{ padding: '13px 20px' }}>
                      {editing
                        ? <input value={editData.location} onChange={e => setEditData({ ...editData, location: e.target.value })} placeholder="—" style={{ ...FIELD, fontSize: 13 }} onFocus={focusStyle} onBlur={blurStyle} />
                        : <span style={{ fontSize: 13, color: C.muted }}>{item.location || '—'}</span>}
                    </td>
                    <td style={{ padding: '13px 20px' }}>
                      {editing
                        ? <select value={editData.status} onChange={e => setEditData({ ...editData, status: e.target.value })} style={{ ...SELECT, fontSize: 13, width: 140 }} onFocus={focusStyle} onBlur={blurStyle}>
                            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </select>
                        : <span style={{ background: st.bg, color: st.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{st.label}</span>}
                    </td>
                    <td style={{ padding: '13px 20px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {editing ? (
                          <>
                            <button className="btn-primary" onClick={() => handleSave(item.id)} style={{ ...BTN.primary, padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Check size={13} /> Spremi
                            </button>
                            <button className="btn-outline" onClick={() => setEditingId(null)} style={{ ...BTN.outline, padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <X size={13} /> Odustani
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="btn-outline" onClick={() => startEdit(item)} style={{ ...BTN.ghost, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Pencil size={13} /> Uredi
                            </button>
                            <button className="btn-danger" onClick={() => handleDelete(item.id, item.name)} style={{ ...BTN.danger, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Trash2 size={13} /> Obriši
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
