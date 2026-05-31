import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, MapPin, ChevronRight, SearchX, Search, X, Tag, Plus, Scale, Star } from 'lucide-react';
import { PRIMARY, C, iconBox, STATUS_EQUIPMENT } from '../theme';

const STATUS_FILTERS = [
  { value: '', label: 'Sve' },
  ...Object.entries(STATUS_EQUIPMENT).map(([value, { label }]) => ({ value, label })),
];

export default function EquipmentListPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    fetch('/api/equipment').then(r => r.json()).then(d => setEquipment(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
    fetch('/api/tags').then(r => r.json()).then(d => setAllTags(Array.isArray(d) ? d : []));
    fetch('/api/locations').then(r => r.json()).then(d => setAllLocations(Array.isArray(d) ? d : []));
  }, []);

  const filtered = equipment.filter(item => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q ||
      item.name?.toLowerCase().includes(q) ||
      item.model?.toLowerCase().includes(q) ||
      item.manufacturer?.toLowerCase().includes(q) ||
      item.serial_number?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesTag = !tagFilter || (item.tags || []).some(t => t.id === parseInt(tagFilter));
    const matchesLocation = !locationFilter || String(item.location_id) === locationFilter;
    return matchesSearch && matchesStatus && matchesTag && matchesLocation;
  });

  return (
    <>
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Inventar
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Laboratorijska oprema</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregled sve dostupne opreme u laboratoriji.</p>
      </div>

      {/* Search + filter bar */}
      <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ position: 'relative', maxWidth: 420 }}>
          <Search size={15} color={C.muted} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Pretraži po nazivu, modelu, proizvođaču..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 36px 9px 36px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, outline: 'none', color: C.heading, background: '#fff' }}
            onFocus={e => e.target.style.borderColor = PRIMARY}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 2 }}>
              <X size={14} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              style={{
                padding: '5px 14px',
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                border: statusFilter === f.value ? `1.5px solid ${PRIMARY}` : `1px solid ${C.border}`,
                background: statusFilter === f.value ? '#eff6ff' : '#fff',
                color: statusFilter === f.value ? PRIMARY : C.muted,
                transition: 'all 0.12s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.subtle, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Tag size={11} /> Tagovi:
            </span>
            {tagFilter && (
              <button
                onClick={() => setTagFilter('')}
                style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.border}`, background: '#fff', color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <X size={10} /> Poništi
              </button>
            )}
            {allTags.map(tag => (
              <button
                key={tag.id}
                onClick={() => setTagFilter(tagFilter === String(tag.id) ? '' : String(tag.id))}
                style={{
                  padding: '4px 10px',
                  borderRadius: 99,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: tagFilter === String(tag.id) ? `1.5px solid ${tag.color}` : `1px solid ${C.border}`,
                  background: tagFilter === String(tag.id) ? tag.color + '22' : '#fff',
                  color: tagFilter === String(tag.id) ? tag.color : C.muted,
                  transition: 'all 0.12s',
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}

        {allLocations.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.subtle, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={11} /> Prostorija:
            </span>
            {locationFilter && (
              <button onClick={() => setLocationFilter('')} style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.border}`, background: '#fff', color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
                <X size={10} /> Poništi
              </button>
            )}
            {allLocations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setLocationFilter(locationFilter === String(loc.id) ? '' : String(loc.id))}
                style={{
                  padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  border: locationFilter === String(loc.id) ? '1.5px solid #6366f1' : `1px solid ${C.border}`,
                  background: locationFilter === String(loc.id) ? '#eef2ff' : '#fff',
                  color: locationFilter === String(loc.id) ? '#4f46e5' : C.muted,
                  transition: 'all 0.12s',
                }}
              >
                {loc.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="equipment-card-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 10 }} />
                <div className="skeleton" style={{ width: 72, height: 22, borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="skeleton" style={{ width: '70%', height: 18 }} />
                <div className="skeleton" style={{ width: '45%', height: 14 }} />
                <div className="skeleton" style={{ width: '90%', height: 13 }} />
                <div className="skeleton" style={{ width: '60%', height: 13 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <div className="skeleton" style={{ width: 60, height: 14 }} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <SearchX size={40} color={C.subtle} style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 8 }}>
            {equipment.length === 0 ? 'Oprema trenutno nije dostupna.' : 'Nema opreme koja odgovara pretrazi.'}
          </p>
          {(search || statusFilter) && (
            <button onClick={() => { setSearch(''); setStatusFilter(''); }} style={{ fontSize: 13, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              Poništi filtere
            </button>
          )}
        </div>
      ) : (
        <>
          {(search || statusFilter) && (
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
              Prikazano {filtered.length} od {equipment.length} stavki
            </div>
          )}
          <div className="equipment-card-grid">
            {filtered.map(item => {
              const st = STATUS_EQUIPMENT[item.status] || STATUS_EQUIPMENT.out_of_service;
              const details = [
                item.model ? `Model: ${item.model}` : null,
                item.manufacturer ? `Proizvođač: ${item.manufacturer}` : null,
                item.serial_number ? `Serijski: ${item.serial_number}` : null,
              ].filter(Boolean).join(' | ');
              const inCompare = compareIds.includes(item.id);
              const compareDisabled = !inCompare && compareIds.length >= 3;
              return (
                <div key={item.id} style={{ position: 'relative' }}>
                  {/* Comparator toggle button */}
                  <button
                    onClick={e => {
                      e.preventDefault();
                      if (inCompare) setCompareIds(p => p.filter(i => i !== item.id));
                      else if (!compareDisabled) setCompareIds(p => [...p, item.id]);
                    }}
                    title={compareDisabled ? 'Max 3 stavke' : inCompare ? 'Ukloni iz komparatora' : 'Dodaj u komparator'}
                    style={{
                      position: 'absolute', top: 10, right: 10, zIndex: 2,
                      width: 26, height: 26, borderRadius: '50%',
                      background: inCompare ? PRIMARY : '#fff',
                      color: inCompare ? '#fff' : C.muted,
                      border: `1.5px solid ${inCompare ? PRIMARY : C.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: compareDisabled ? 'not-allowed' : 'pointer',
                      opacity: compareDisabled ? 0.35 : 1,
                      fontSize: 14, fontWeight: 700, lineHeight: 1,
                    }}
                  >
                    {inCompare ? '✓' : '+'}
                  </button>

                  <Link to={`/equipment/${item.id}`} className="card-hover"
                    style={{ background: '#fff', border: `1px solid ${inCompare ? PRIMARY : C.border}`, borderRadius: 12, padding: '20px 22px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 14, transition: 'border-color 0.15s, box-shadow 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={iconBox(40, 10)}>
                      <Microscope size={18} color={PRIMARY} />
                    </div>
                    <span style={{ background: st.bg, color: st.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap', marginTop: 2 }}>
                      {st.label}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: C.heading, marginBottom: 4 }}>{item.name}</div>
                    {(item.location_name || item.location) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: C.muted }}>
                        <MapPin size={12} />
                        {item.location_name || item.location}
                      </div>
                    )}
                    {details && (
                      <div style={{ marginTop: 6, fontSize: 12, color: C.subtle, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {details}
                      </div>
                    )}
                    {item.description && (
                      <div style={{ marginTop: 6, fontSize: 13, color: C.muted, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.description}
                      </div>
                    )}
                  </div>
                  {item.tags?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {item.tags.map(tag => (
                        <span key={tag.id} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: tag.color + '22', color: tag.color, border: `1px solid ${tag.color}44` }}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                    <span style={{ fontSize: 13, color: PRIMARY, display: 'flex', alignItems: 'center', gap: 3, fontWeight: 500 }}>
                      Detalji <ChevronRight size={14} />
                    </span>
                  </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>

    {/* Floating compare bar - outside main div, inside Fragment */}
    {/* Floating compare bar */}
    {compareIds.length >= 2 && (
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        background: '#0f172a', color: '#fff', borderRadius: 40,
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)', zIndex: 200, animation: 'labFadeIn 0.2s ease-out',
        whiteSpace: 'nowrap',
      }}>
        <Scale size={16} color="#60a5fa" />
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          Odabrano {compareIds.length} {compareIds.length === 2 ? 'stavke' : 'stavke'}
        </span>
        <button
          onClick={() => setShowCompare(true)}
          style={{ background: PRIMARY, color: '#fff', border: 'none', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          Poredi ▶
        </button>
        <button
          onClick={() => setCompareIds([])}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 0 }}
        >
          ×
        </button>
      </div>
    )}

    {/* Compare modal */}
    {showCompare && (
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 300, display: 'flex', flexDirection: 'column' }}
        onClick={e => { if (e.target === e.currentTarget) setShowCompare(false); }}
      >
        <div style={{ background: '#fff', margin: '20px', borderRadius: 16, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: 'calc(100vh - 40px)', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
          {/* Modal header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Scale size={18} color={PRIMARY} />
              <span style={{ fontSize: 16, fontWeight: 800, color: C.heading }}>Usporedba opreme</span>
            </div>
            <button onClick={() => setShowCompare(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 22, lineHeight: 1 }}>×</button>
          </div>

          {/* Compare table */}
          <div style={{ flex: 1, overflowX: 'auto', overflowY: 'auto', padding: '20px 24px' }}>
            {(() => {
              const items = compareIds.map(cid => equipment.find(e => e.id === cid)).filter(Boolean);
              const rows = [
                { label: 'Model', key: 'model' },
                { label: 'Proizvođač', key: 'manufacturer' },
                { label: 'Status', key: 'status', render: v => { const s = STATUS_EQUIPMENT[v] || {}; return <span style={{ background: s.bg, color: s.color, padding: '2px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>{s.label || v}</span>; } },
                { label: 'Lokacija', key: 'location_name', fallback: 'location' },
                { label: 'Serijski br.', key: 'serial_number' },
                { label: 'Sigurnosne napomene', key: 'safety_notes', render: v => v ? <span style={{ color: '#d97706' }}>Da</span> : <span style={{ color: '#22c55e' }}>Ne</span> },
                { label: 'Tagovi', key: 'tags', render: v => v?.length > 0 ? v.map(t => <span key={t.id} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: t.color + '22', color: t.color, border: `1px solid ${t.color}44`, marginRight: 4 }}>{t.name}</span>) : '—' },
                { label: 'Zadnji servis', key: 'last_service', render: v => v ? new Date(v).toLocaleDateString('bs-BA') : '—' },
              ];
              const colW = `${Math.floor(100 / items.length)}%`;
              return (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: items.length * 220 }}>
                  <thead>
                    <tr>
                      <th style={{ width: 140, textAlign: 'left', padding: '10px 12px', color: C.muted, fontSize: 12, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>Karakteristika</th>
                      {items.map(item => (
                        <th key={item.id} style={{ width: colW, textAlign: 'left', padding: '10px 12px', borderBottom: `1px solid ${C.border}` }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>{item.name}</div>
                          <Link to={`/equipment/${item.id}`} style={{ fontSize: 11, color: PRIMARY }}>Otvori →</Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => (
                      <tr key={row.key} style={{ borderBottom: `1px solid ${C.borderFaint}` }}>
                        <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: C.muted, whiteSpace: 'nowrap' }}>{row.label}</td>
                        {items.map(item => {
                          const v = item[row.key] ?? (row.fallback ? item[row.fallback] : null);
                          return (
                            <td key={item.id} style={{ padding: '10px 12px', fontSize: 13, color: C.body }}>
                              {row.render ? row.render(v) : (v || <span style={{ color: C.subtle }}>—</span>)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })()}
          </div>

          {/* Modal footer */}
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 10 }}>
            <button onClick={() => { setShowCompare(false); setCompareIds([]); }} style={{ background: C.bgFaint, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 20px', fontSize: 13, cursor: 'pointer' }}>
              Zatvori
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
