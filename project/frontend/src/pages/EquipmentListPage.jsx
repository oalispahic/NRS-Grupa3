import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, MapPin, ChevronRight, SearchX, Search, X, Tag } from 'lucide-react';
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
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetch('/api/equipment').then(r => r.json()).then(d => setEquipment(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
    fetch('/api/tags').then(r => r.json()).then(d => setAllTags(Array.isArray(d) ? d : []));
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
    return matchesSearch && matchesStatus && matchesTag;
  });

  return (
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
              return (
                <Link key={item.id} to={`/equipment/${item.id}`} className="card-hover"
                  style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 14, transition: 'border-color 0.15s, box-shadow 0.15s' }}>
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
                    {item.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: C.muted }}>
                        <MapPin size={12} />
                        {item.location}
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
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
