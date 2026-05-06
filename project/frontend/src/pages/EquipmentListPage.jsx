import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, MapPin, ChevronRight, SearchX } from 'lucide-react';
import { PRIMARY, C, iconBox, STATUS_EQUIPMENT } from '../theme';

export default function EquipmentListPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetch('/api/equipment').then(r => r.json()).then(d => setEquipment(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Inventar
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Laboratorijska oprema</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregled sve dostupne opreme u laboratoriji.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted, fontSize: 14 }}>Učitavanje...</div>
      ) : equipment.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <SearchX size={40} color={C.subtle} style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: 15, color: C.muted }}>Oprema trenutno nije dostupna.</p>
        </div>
      ) : (
        <div className="equipment-card-grid">
          {equipment.map(item => {
            const st = STATUS_EQUIPMENT[item.status] || STATUS_EQUIPMENT.out_of_service;
            const details = [
              item.model ? `Model: ${item.model}` : null,
              item.manufacturer ? `Proizvodjac: ${item.manufacturer}` : null,
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                  <span style={{ fontSize: 13, color: PRIMARY, display: 'flex', alignItems: 'center', gap: 3, fontWeight: 500 }}>
                    Detalji <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
