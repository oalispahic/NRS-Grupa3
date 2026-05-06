import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ChevronLeft, AlertCircle, CheckCircle2, Microscope } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PRIMARY, C, iconBox, STATUS_EQUIPMENT, BTN } from '../theme';

function fmtDate(value) {
  if (!value) return '-';
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleDateString('bs-BA');
}

export default function EquipmentDetailPage() {
  const { id }    = useParams();
  const { user, token } = useAuth();
  const toast = useToast();
  const [equipment, setEquipment]     = useState(null);
  const [loading, setLoading]         = useState(true);
  const [showForm, setShowForm]       = useState(false);
  const [startTime, setStartTime]     = useState('');
  const [endTime, setEndTime]         = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [successMsg, setSuccessMsg]   = useState('');
  const [errorMsg, setErrorMsg]       = useState('');

  useEffect(() => {
    fetch(`/api/equipment/${id}`).then(r => r.json()).then(setEquipment).finally(() => setLoading(false));
  }, [id]);

  async function handleReserve(e) {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ equipmentId: id, startTime, endTime }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri rezervaciji');
      const message = 'Rezervacija uspjesno kreirana - status: na cekanju.';
      setSuccessMsg(message);
      toast.success(message);
      setShowForm(false); setStartTime(''); setEndTime('');
    } catch (err) {
      setErrorMsg(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted }}>Učitavanje...</div>;
  if (!equipment || equipment.error) return <div style={{ color: C.muted }}>Oprema nije pronađena.</div>;

  const st = STATUS_EQUIPMENT[equipment.status] || STATUS_EQUIPMENT.out_of_service;
  const canReserve = user.role === 'laborant' && equipment.status === 'available';

  return (
    <div>
      <Link to="/equipment" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, color: C.muted, textDecoration: 'none', marginBottom: 24 }}
        onMouseEnter={e => e.currentTarget.style.color = PRIMARY}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}>
        <ChevronLeft size={15} /> Nazad na listu
      </Link>

      <div className="detail-layout">
        <div>
          {/* Header */}
          <div className="detail-header">
            <div style={iconBox(48, 12)}>
              <Microscope size={22} color={PRIMARY} />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.heading, lineHeight: 1.2 }}>{equipment.name}</h1>
              {equipment.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: C.muted, marginTop: 4 }}>
                  <MapPin size={13} /> {equipment.location}
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <span style={{ background: st.bg, color: st.color, fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 99, display: 'inline-block', marginBottom: 20 }}>
            {st.label}
          </span>

          {/* Description */}
          {equipment.description && (
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Opis</div>
              <p style={{ fontSize: 14, color: C.body, lineHeight: 1.7 }}>{equipment.description}</p>
            </div>
          )}

          {/* Success message */}
          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#166534' }}>
              <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
              {successMsg}
            </div>
          )}

          {/* Reserve section */}
          {canReserve && (
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: showForm ? 20 : 0 }}>
                <Calendar size={18} color={PRIMARY} />
                <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Rezervišite opremu</span>
              </div>

              {!showForm ? (
                <div style={{ marginTop: 12 }}>
                  <p style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>Oprema je dostupna. Odaberite termin i kreirajte zahtjev za rezervaciju.</p>
                  <div className="action-row">
                    <button className="btn-primary" onClick={() => setShowForm(true)} style={{ ...BTN.primary, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={14} /> Odaberi termin
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReserve}>
                  {errorMsg && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#991b1b' }}>
                      <AlertCircle size={14} style={{ flexShrink: 0 }} /> {errorMsg}
                    </div>
                  )}
                  <div className="reservation-form-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.body, marginBottom: 6 }}>Početak</label>
                      <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required
                        style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = PRIMARY} onBlur={e => e.target.style.borderColor = C.border}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: C.body, marginBottom: 6 }}>Kraj</label>
                      <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required
                        style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = PRIMARY} onBlur={e => e.target.style.borderColor = C.border}
                      />
                    </div>
                  </div>
                  <div className="action-row">
                    <button type="submit" disabled={submitting} className="btn-primary"
                      style={{ ...BTN.primary, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                      {submitting ? 'Slanje...' : 'Potvrdi rezervaciju'}
                    </button>
                    <button type="button" className="btn-outline" style={BTN.outline}
                      onClick={() => { setShowForm(false); setErrorMsg(''); }}>
                      Odustani
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {!canReserve && user.role === 'laborant' && (
            <div style={{ background: C.bgFaint, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', fontSize: 13, color: C.muted }}>
              Oprema trenutno nije dostupna za rezervaciju.
            </div>
          )}
        </div>

        {/* Meta sidebar */}
        <div style={{ minWidth: 180 }}>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', fontSize: 13 }}>
            <div style={{ color: C.subtle, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Info</div>
            {[
              { label: 'ID', value: `#${equipment.id}` },
              { label: 'Lokacija', value: equipment.location },
              { label: 'Serijski broj', value: equipment.serial_number },
              { label: 'Model', value: equipment.model },
              { label: 'Proizvodjac', value: equipment.manufacturer },
              { label: 'Datum nabavke', value: fmtDate(equipment.purchase_date) },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 8 }}>
                <span style={{ color: C.muted }}>{row.label}: </span>
                <span style={{ color: C.body, fontWeight: 500 }}>{row.value || '-'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
