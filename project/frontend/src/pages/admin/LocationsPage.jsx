import { useEffect, useState } from 'react';
import { Plus, Trash2, MapPin, Pencil, Check, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { C, BTN } from '../../theme';

export default function LocationsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const authH = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  async function load() {
    setLoading(true);
    try {
      const d = await fetch('/api/locations').then(r => r.json());
      setLocations(Array.isArray(d) ? d : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const res = await fetch('/api/locations', {
      method: 'POST',
      headers: authH(),
      body: JSON.stringify({ name: newName.trim(), description: newDesc.trim() || undefined }),
    });
    if (res.ok) {
      toast.success('Lokacija dodana.');
      setNewName(''); setNewDesc('');
      load();
    } else {
      const d = await res.json();
      toast.error(d.error || 'Greška pri dodavanju lokacije.');
    }
  }

  async function handleSave(id) {
    const res = await fetch(`/api/locations/${id}`, {
      method: 'PUT',
      headers: authH(),
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      toast.success('Lokacija ažurirana.');
      setEditingId(null);
      load();
    } else {
      toast.error('Greška pri ažuriranju lokacije.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Obrisati lokaciju? Oprema neće biti obrisana.')) return;
    const res = await fetch(`/api/locations/${id}`, { method: 'DELETE', headers: authH() });
    if (res.ok || res.status === 204) {
      toast.success('Lokacija obrisana.');
      load();
    } else {
      toast.error('Greška pri brisanju lokacije.');
    }
  }

  const FIELD = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: `1px solid ${C.border}`, fontSize: 13, color: C.body,
    fontFamily: 'inherit', boxSizing: 'border-box', background: '#fff',
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Administrator
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Lokacije laboratorije</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Definirajte prostorije i lokacije kojima se dodjeljuje oprema.</p>
      </div>

      {/* Add form */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: C.heading, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} color="var(--primary, #6366f1)" /> Nova lokacija
        </h2>
        <form onSubmit={handleCreate} style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Naziv *</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="npr. Laboratorij A" required style={FIELD} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>Opis</label>
              <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Kratak opis lokacije (opcionalno)" style={FIELD} />
            </div>
          </div>
          <div>
            <button type="submit" style={{ ...BTN.primary, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', fontSize: 13 }}>
              <Plus size={14} /> Dodaj lokaciju
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Lokacije</span>
          <span style={{ fontSize: 13, color: C.muted }}>{locations.length} stavki</span>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: C.muted, fontSize: 14 }}>Učitavanje...</div>
        ) : locations.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <MapPin size={36} color={C.subtle} style={{ margin: '0 auto 14px', display: 'block' }} />
            <p style={{ fontSize: 14, color: C.muted }}>Nema definisanih lokacija.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Naziv', 'Opis', 'Akcije'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 20px', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {locations.map(loc => (
                <tr key={loc.id} style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                  <td style={{ padding: '12px 20px' }}>
                    {editingId === loc.id ? (
                      <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} style={{ ...FIELD, width: 160 }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <MapPin size={14} color="#6366f1" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{loc.name}</span>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    {editingId === loc.id ? (
                      <input value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} placeholder="Opis..." style={{ ...FIELD, width: 260 }} />
                    ) : (
                      <span style={{ fontSize: 13, color: C.muted }}>{loc.description || '—'}</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    {editingId === loc.id ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => handleSave(loc.id)} style={{ ...BTN.primary, padding: '5px 11px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Check size={12} /> Spremi
                        </button>
                        <button onClick={() => setEditingId(null)} style={{ ...BTN.ghost, padding: '5px 11px', fontSize: 12 }}>
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => { setEditingId(loc.id); setEditData({ name: loc.name, description: loc.description || '' }); }}
                          style={{ ...BTN.ghost, padding: '5px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <Pencil size={12} /> Uredi
                        </button>
                        <button onClick={() => handleDelete(loc.id)} style={{ ...BTN.danger, padding: '5px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Trash2 size={12} /> Obriši
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
