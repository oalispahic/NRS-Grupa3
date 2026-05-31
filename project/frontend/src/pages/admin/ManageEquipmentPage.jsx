import { useEffect, useState, useRef } from 'react';
import {
  Plus, Pencil, Trash2, Check, X, Tag, Download,
  MapPin, ChevronDown, ChevronUp, Shield, Wrench, QrCode,
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { PRIMARY, C, BTN, STATUS_EQUIPMENT } from '../../theme';

const STATUSES = Object.entries(STATUS_EQUIPMENT).map(([value, { label }]) => ({ value, label }));

const F = {
  width: '100%',
  padding: '9px 12px',
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  fontSize: 13,
  outline: 'none',
  background: '#fff',
  color: C.body,
};

const LABEL = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: C.muted,
  marginBottom: 5,
  textTransform: 'uppercase',
  letterSpacing: 0.4,
};

function fmtDate(v) {
  if (!v) return '—';
  const d = new Date(v);
  return isNaN(d.getTime()) ? v : d.toLocaleDateString('bs-BA');
}

function Field({ label, children }) {
  return (
    <div>
      <label style={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${C.borderFaint}` }}>
      {icon}
      <span style={{ fontSize: 13, fontWeight: 700, color: C.heading }}>{title}</span>
    </div>
  );
}

const EMPTY_ITEM = {
  name: '', serial_number: '', model: '', manufacturer: '',
  purchase_date: '', description: '', status: 'available',
  location: '', location_id: '', supplier: '',
  last_service: '', planned_service: '', warranty_expiry: '',
  service_company: '', safety_notes: '',
};

function InputEl({ value, onChange, placeholder, type = 'text', style }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ ...F, ...style }}
      onFocus={e => e.target.style.borderColor = PRIMARY}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function SelectEl({ value, onChange, children, style }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...F, ...style }}
      onFocus={e => e.target.style.borderColor = PRIMARY}
      onBlur={e => e.target.style.borderColor = C.border}
    >
      {children}
    </select>
  );
}

function TextareaEl({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{ ...F, resize: 'vertical', fontFamily: 'inherit' }}
      onFocus={e => e.target.style.borderColor = PRIMARY}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function EquipmentForm({ data, onChange, locations }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <SectionTitle icon={<Wrench size={14} color={PRIMARY} />} title="Osnovno" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          <Field label="Naziv *">
            <InputEl value={data.name} onChange={e => set('name', e.target.value)} placeholder="Naziv aparata" />
          </Field>
          <Field label="Serijski broj *">
            <InputEl value={data.serial_number} onChange={e => set('serial_number', e.target.value)} placeholder="SN-0001" />
          </Field>
          <Field label="Model *">
            <InputEl value={data.model} onChange={e => set('model', e.target.value)} placeholder="Model" />
          </Field>
          <Field label="Proizvođač">
            <InputEl value={data.manufacturer} onChange={e => set('manufacturer', e.target.value)} placeholder="Npr. Eppendorf" />
          </Field>
          <Field label="Status">
            <SelectEl value={data.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </SelectEl>
          </Field>
          <Field label="Datum nabavke">
            <InputEl type="date" value={data.purchase_date} onChange={e => set('purchase_date', e.target.value)} />
          </Field>
        </div>
      </div>

      <div>
        <SectionTitle icon={<MapPin size={14} color={PRIMARY} />} title="Lokacija i opis" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          <Field label="Prostorija">
            <SelectEl value={data.location_id} onChange={e => set('location_id', e.target.value)}>
              <option value="">— Bez prostorije —</option>
              {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </SelectEl>
          </Field>
          <Field label="Lokacija (slobodan tekst)">
            <InputEl value={data.location} onChange={e => set('location', e.target.value)} placeholder="Sala, ormar, polica..." />
          </Field>
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Opis">
              <TextareaEl value={data.description} onChange={e => set('description', e.target.value)} placeholder="Kratak opis aparata..." rows={2} />
            </Field>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle icon={<Wrench size={14} color={PRIMARY} />} title="Servisne informacije" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          <Field label="Dobavljač">
            <InputEl value={data.supplier} onChange={e => set('supplier', e.target.value)} placeholder="Naziv dobavljača" />
          </Field>
          <Field label="Servisna firma">
            <InputEl value={data.service_company} onChange={e => set('service_company', e.target.value)} placeholder="Naziv servisne firme" />
          </Field>
          <Field label="Zadnji servis">
            <InputEl type="date" value={data.last_service} onChange={e => set('last_service', e.target.value)} />
          </Field>
          <Field label="Planirani servis">
            <InputEl type="date" value={data.planned_service} onChange={e => set('planned_service', e.target.value)} />
          </Field>
          <Field label="Garantni rok (ističe)">
            <InputEl type="date" value={data.warranty_expiry} onChange={e => set('warranty_expiry', e.target.value)} />
          </Field>
        </div>
      </div>

      <div>
        <SectionTitle icon={<Shield size={14} color="#d97706" />} title="Sigurnosne napomene" />
        <TextareaEl
          value={data.safety_notes}
          onChange={e => set('safety_notes', e.target.value)}
          placeholder="Npr. Nositi zaštitne naočale. Ne rukovati bez certifikata. Rad isključivo u digestoru."
          rows={3}
        />
      </div>
    </div>
  );
}

export default function ManageEquipmentPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [locations, setLocations] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showTagMgmt, setShowTagMgmt] = useState(false);
  const [newItem, setNewItem] = useState(EMPTY_ITEM);

  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({});

  const [qrItem, setQrItem] = useState(null);
  const qrRef = useRef(null);

  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#6366f1');

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const authH = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  async function load() {
    const d = await fetch('/api/equipment').then(r => r.json());
    setEquipment(Array.isArray(d) ? d : []);
  }
  async function loadTags() {
    const d = await fetch('/api/tags').then(r => r.json());
    setAllTags(Array.isArray(d) ? d : []);
  }
  async function loadLocations() {
    const d = await fetch('/api/locations').then(r => r.json());
    setLocations(Array.isArray(d) ? d : []);
  }

  useEffect(() => { load().finally(() => setLoading(false)); loadTags(); loadLocations(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const res = await fetch('/api/equipment', { method: 'POST', headers: authH(), body: JSON.stringify(newItem) });
    const data = await res.json();
    if (!res.ok) { toast.error(data.error || 'Greška pri dodavanju'); return; }
    toast.success(`"${data.name}" dodana.`);
    setNewItem(EMPTY_ITEM);
    setShowAddForm(false);
    load();
  }

  async function handleSave() {
    const res = await fetch(`/api/equipment/${editItem.id}`, { method: 'PUT', headers: authH(), body: JSON.stringify(editData) });
    if (res.ok) {
      toast.success('Izmjene su spremljene.');
      setEditItem(null);
      load();
    } else {
      toast.error('Greška pri spremanju.');
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Obrisati "${name}"?`)) return;
    const res = await fetch(`/api/equipment/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { toast.success(`"${name}" obrisana.`); load(); }
    else toast.error('Greška pri brisanju.');
  }

  function openEdit(item) {
    setEditItem(item);
    setEditData({
      name: item.name, serial_number: item.serial_number || '',
      model: item.model || '', manufacturer: item.manufacturer || '',
      purchase_date: item.purchase_date || '', description: item.description || '',
      status: item.status, location: item.location || '',
      location_id: item.location_id || '', supplier: item.supplier || '',
      last_service: item.last_service || '', planned_service: item.planned_service || '',
      warranty_expiry: item.warranty_expiry || '', service_company: item.service_company || '',
      safety_notes: item.safety_notes || '',
    });
  }

  async function handleSetTags(equipmentId, tagIds) {
    await fetch(`/api/equipment/${equipmentId}/tags`, { method: 'PUT', headers: authH(), body: JSON.stringify({ tagIds }) });
    load();
    if (editItem?.id === equipmentId) {
      setEditItem(prev => ({
        ...prev,
        tags: allTags.filter(t => tagIds.includes(t.id)),
      }));
    }
  }

  async function handleCreateTag(e) {
    e.preventDefault();
    if (!newTagName.trim()) return;
    const res = await fetch('/api/tags', { method: 'POST', headers: authH(), body: JSON.stringify({ name: newTagName.trim(), color: newTagColor }) });
    const data = await res.json();
    if (res.ok) { toast.success(`Tag "${data.name}" kreiran.`); setNewTagName(''); loadTags(); }
    else toast.error(data.error || 'Greška pri kreiranju taga.');
  }

  async function handleDeleteTag(id, name) {
    if (!confirm(`Obrisati tag "${name}"?`)) return;
    const res = await fetch(`/api/tags/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { toast.success(`Tag "${name}" obrisan.`); loadTags(); load(); }
    else toast.error('Greška pri brisanju taga.');
  }

  async function exportCsv(type) {
    const res = await fetch(`/api/export/${type}`, { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${type}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = equipment.filter(e => {
    const q = search.toLowerCase();
    const matchQ = !q || [e.name, e.model, e.manufacturer, e.serial_number].some(v => (v || '').toLowerCase().includes(q));
    const matchS = !filterStatus || e.status === filterStatus;
    const matchL = !filterLocation || String(e.location_id) === filterLocation;
    return matchQ && matchS && matchL;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 10 }}>
          Administrator
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Upravljanje opremom</h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => exportCsv('equipment')}
              style={{ ...BTN.ghost, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', fontSize: 13 }}
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={() => setShowAddForm(p => !p)}
              style={{ ...BTN.primary, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13 }}
            >
              <Plus size={14} /> {showAddForm ? 'Zatvori' : 'Dodaj opremu'}
            </button>
          </div>
        </div>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Dodajte, uredite ili uklonite opremu iz inventara.</p>
      </div>

      {/* Add form — collapsible */}
      {showAddForm && (
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.heading, marginBottom: 20 }}>Nova oprema</div>
          <form onSubmit={handleAdd}>
            <EquipmentForm data={newItem} onChange={setNewItem} locations={locations} />
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button type="submit" style={{ ...BTN.primary, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 13 }}>
                <Plus size={14} /> Dodaj opremu
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} style={{ ...BTN.ghost, padding: '9px 18px', fontSize: 13 }}>
                Odustani
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tag management — collapsible */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 20, overflow: 'hidden' }}>
        <button
          onClick={() => setShowTagMgmt(p => !p)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag size={14} color={PRIMARY} />
            <span style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>Upravljanje tagovima</span>
            {allTags.length > 0 && (
              <span style={{ fontSize: 12, background: C.bgFaint, color: C.muted, padding: '2px 8px', borderRadius: 99, border: `1px solid ${C.border}` }}>
                {allTags.length}
              </span>
            )}
          </div>
          {showTagMgmt ? <ChevronUp size={16} color={C.muted} /> : <ChevronDown size={16} color={C.muted} />}
        </button>
        {showTagMgmt && (
          <div style={{ padding: '0 20px 20px' }}>
            <form onSubmit={handleCreateTag} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 14 }}>
              <div style={{ flex: '1 1 180px' }}>
                <label style={LABEL}>Naziv taga</label>
                <input
                  value={newTagName}
                  onChange={e => setNewTagName(e.target.value)}
                  placeholder="npr. PCR, Hemija..."
                  style={F}
                  onFocus={e => e.target.style.borderColor = PRIMARY}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
              <div>
                <label style={LABEL}>Boja</label>
                <input type="color" value={newTagColor} onChange={e => setNewTagColor(e.target.value)}
                  style={{ width: 40, height: 37, padding: 3, border: `1px solid ${C.border}`, borderRadius: 8, cursor: 'pointer' }} />
              </div>
              <button type="submit" style={{ ...BTN.primary, padding: '9px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Plus size={13} /> Dodaj tag
              </button>
            </form>
            {allTags.length === 0 ? (
              <p style={{ fontSize: 13, color: C.subtle }}>Nema kreiranih tagova.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {allTags.map(tag => (
                  <div key={tag.id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px 4px 12px', borderRadius: 99, background: tag.color + '18', border: `1px solid ${tag.color}44` }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: tag.color }}>{tag.name}</span>
                    <button onClick={() => handleDeleteTag(tag.id, tag.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tag.color, display: 'flex', padding: 0, opacity: 0.7 }}>
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Pretraži po nazivu, modelu, proizvođaču..."
          style={{ ...F, flex: '1 1 220px', maxWidth: 360 }}
          onFocus={e => e.target.style.borderColor = PRIMARY}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ ...F, width: 'auto' }}
          onFocus={e => e.target.style.borderColor = PRIMARY}
          onBlur={e => e.target.style.borderColor = C.border}
        >
          <option value="">Svi statusi</option>
          {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          style={{ ...F, width: 'auto' }}
          onFocus={e => e.target.style.borderColor = PRIMARY}
          onBlur={e => e.target.style.borderColor = C.border}
        >
          <option value="">Sve prostorije</option>
          {locations.map(l => <option key={l.id} value={String(l.id)}>{l.name}</option>)}
        </select>
      </div>

      {/* Inventory */}
      <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>Inventar opreme</span>
          <span style={{ fontSize: 13, color: C.muted }}>{filtered.length} / {equipment.length} stavki</span>
        </div>

        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: C.muted }}>Učitavanje...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: C.muted }}>Nema opreme koja odgovara filteru.</div>
        ) : (
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {filtered.map(item => {
              const st = STATUS_EQUIPMENT[item.status] || STATUS_EQUIPMENT.out_of_service;
              return (
                <div
                  key={item.id}
                  className="card-hover"
                  style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  {/* Name + status */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.heading, lineHeight: 1.3, wordBreak: 'break-word' }}>{item.name}</div>
                      {item.model && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{item.model}{item.manufacturer ? ` · ${item.manufacturer}` : ''}</div>}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 99, background: st.bg, color: st.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {st.label}
                    </span>
                  </div>

                  {/* Meta row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12, color: C.muted }}>
                    {item.serial_number && <span>SN: {item.serial_number}</span>}
                    {(item.location_name || item.location) && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={11} /> {item.location_name || item.location}
                      </span>
                    )}
                    {item.safety_notes && (
                      <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Shield size={11} /> Sigurnosne napomene
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {(item.tags || []).length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {(item.tags || []).map(tag => (
                        <span key={tag.id} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: tag.color + '18', color: tag.color, border: `1px solid ${tag.color}44` }}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 4, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => openEdit(item)}
                      style={{ ...BTN.ghost, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 12px', fontSize: 12 }}
                    >
                      <Pencil size={12} /> Uredi
                    </button>
                    <button
                      onClick={() => setQrItem(item)}
                      title="Generiraj QR kod"
                      style={{ ...BTN.ghost, display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', fontSize: 12 }}
                    >
                      <QrCode size={12} /> QR
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      style={{ ...BTN.danger, display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', fontSize: 12 }}
                    >
                      <Trash2 size={12} /> Obriši
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editItem && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 16px', overflowY: 'auto' }}
          onClick={e => { if (e.target === e.currentTarget) setEditItem(null); }}
        >
          <div style={{ background: '#fff', borderRadius: 14, width: '100%', maxWidth: 760, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', animation: 'labFadeIn 0.15s ease-out' }}>
            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: `1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.heading }}>Uredi opremu</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{editItem.name}</div>
              </div>
              <button onClick={() => setEditItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 6 }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
              <EquipmentForm data={editData} onChange={setEditData} locations={locations} />

              {/* Tags section */}
              {allTags.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <SectionTitle icon={<Tag size={14} color={PRIMARY} />} title="Tagovi" />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {allTags.map(tag => {
                      const assigned = (editItem.tags || []).some(t => t.id === tag.id);
                      return (
                        <button
                          key={tag.id}
                          onClick={() => {
                            const current = (editItem.tags || []).map(t => t.id);
                            const next = assigned ? current.filter(id => id !== tag.id) : [...current, tag.id];
                            handleSetTags(editItem.id, next);
                          }}
                          style={{
                            fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 99,
                            background: assigned ? tag.color + '22' : C.bgFaint,
                            color: assigned ? tag.color : C.muted,
                            border: `1px solid ${assigned ? tag.color + '55' : C.border}`,
                            cursor: 'pointer',
                          }}
                        >
                          {assigned && <Check size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />}
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', padding: '16px 24px', borderTop: `1px solid ${C.border}` }}>
              <button onClick={() => setEditItem(null)} style={{ ...BTN.ghost, padding: '9px 18px', fontSize: 13 }}>
                Odustani
              </button>
              <button onClick={handleSave} style={{ ...BTN.primary, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', fontSize: 13 }}>
                <Check size={14} /> Spremi izmjene
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR modal */}
      {qrItem && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setQrItem(null); }}
        >
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', maxWidth: 360, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', animation: 'labFadeIn 0.15s ease-out', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.heading, marginBottom: 4 }}>QR kod</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>{qrItem.name}</div>

            <div ref={qrRef} style={{ display: 'inline-block', padding: 16, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 20 }}>
              <QRCode
                value={`${window.location.origin}/equipment/${qrItem.id}`}
                size={180}
                bgColor="#ffffff"
                fgColor="#0f172a"
              />
            </div>

            <div style={{ fontSize: 11, color: C.subtle, marginBottom: 20, wordBreak: 'break-all' }}>
              {window.location.origin}/equipment/{qrItem.id}
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  const svg = qrRef.current?.querySelector('svg');
                  if (!svg) return;
                  const canvas = document.createElement('canvas');
                  const size = 220;
                  canvas.width = size; canvas.height = size;
                  const ctx = canvas.getContext('2d');
                  ctx.fillStyle = '#fff';
                  ctx.fillRect(0, 0, size, size);
                  const svgData = new XMLSerializer().serializeToString(svg);
                  const img = new Image();
                  img.onload = () => {
                    ctx.drawImage(img, 20, 20, size - 40, size - 40);
                    const a = document.createElement('a');
                    a.download = `qr-${qrItem.name.replace(/\s+/g, '-').toLowerCase()}.png`;
                    a.href = canvas.toDataURL('image/png');
                    a.click();
                  };
                  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                }}
                style={{ ...BTN.outline, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
              >
                <Download size={13} /> Preuzmi PNG
              </button>
              <button onClick={() => setQrItem(null)} style={{ ...BTN.ghost, fontSize: 13 }}>
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
