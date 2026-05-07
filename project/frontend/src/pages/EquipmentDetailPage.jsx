import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ChevronLeft, AlertCircle, CheckCircle2, Microscope, Settings2, Hash, Wrench, ShieldCheck, Truck, Building2, Clock, Tag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PRIMARY, C, iconBox, STATUS_EQUIPMENT, BTN } from '../theme';

const STATUSES = Object.entries(STATUS_EQUIPMENT).map(([value, { label }]) => ({ value, label }));

function fmtDate(value) {
  if (!value) return '-';
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleDateString('bs-BA');
}

export default function EquipmentDetailPage() {
  const { id }          = useParams();
  const { user, token } = useAuth();
  const toast           = useToast();

  const [equipment, setEquipment]   = useState(null);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [startTime, setStartTime]   = useState('');
  const [endTime, setEndTime]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg]     = useState('');

  const [adminStatus, setAdminStatus]   = useState('');
  const [adminSaving, setAdminSaving]   = useState(false);
  const [adminSuccess, setAdminSuccess] = useState('');

  function loadEquipment() {
    return fetch(`/api/equipment/${id}`)
      .then(r => r.json())
      .then(data => { setEquipment(data); setAdminStatus(data.status || ''); })
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadEquipment(); }, [id]);

  async function handleReserve(e) {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');

    if (new Date(endTime) <= new Date(startTime)) {
      setErrorMsg('Kraj termina mora biti nakon pocetka.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ equipmentId: id, startTime, endTime }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri rezervaciji');
      const msg = 'Rezervacija uspjesno kreirana — status: na cekanju.';
      setSuccessMsg(msg);
      toast.success(msg);
      setShowForm(false); setStartTime(''); setEndTime('');
    } catch (err) {
      setErrorMsg(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusSave() {
    setAdminSaving(true);
    setAdminSuccess('');
    try {
      const res = await fetch(`/api/equipment/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: adminStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri promjeni statusa');
      setEquipment(prev => ({ ...prev, status: adminStatus }));
      const msg = 'Status opreme je azuriran.';
      setAdminSuccess(msg);
      toast.success(msg);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAdminSaving(false);
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
      <div style={{ width: 28, height: 28, border: `3px solid ${C.border}`, borderTopColor: PRIMARY, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  if (!equipment || equipment.error) return <div style={{ color: C.muted }}>Oprema nije pronađena.</div>;

  const st = STATUS_EQUIPMENT[equipment.status] || STATUS_EQUIPMENT.out_of_service;
  const canReserve = user.role === 'laborant' && (equipment.status === 'available' || equipment.status === 'reserved');
  const isAdmin = user.role === 'admin';
  const statusChanged = adminStatus !== equipment.status;

  return (
    <div>
      <Link to="/equipment"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, color: C.muted, textDecoration: 'none', marginBottom: 24, transition: 'color 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.color = PRIMARY}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}>
        <ChevronLeft size={15} /> Nazad na listu
      </Link>

      <div className="detail-layout">
        <div>
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

          <span style={{ background: st.bg, color: st.color, fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 99, display: 'inline-block', marginBottom: 20, transition: 'background 0.2s, color 0.2s' }}>
            {st.label}
          </span>

          {equipment.description && (
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Opis</div>
              <p style={{ fontSize: 14, color: C.body, lineHeight: 1.7 }}>{equipment.description}</p>
            </div>
          )}

          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#166534' }}>
              <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
              {successMsg}
            </div>
          )}

          {/* Laborant: rezervacija */}
          {canReserve && (
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px', overflow: 'hidden' }}>
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
                <form onSubmit={handleReserve} style={{ animation: 'labFadeIn 0.18s ease-out' }}>
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

          {/* Admin: promjena statusa (PB7) */}
          {isAdmin && (
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px', marginTop: 16, animation: 'labFadeIn 0.18s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Settings2 size={16} color={PRIMARY} />
                <span style={{ fontSize: 15, fontWeight: 600, color: C.heading }}>Upravljanje statusom</span>
              </div>

              {adminSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#166534' }}>
                  <CheckCircle2 size={14} style={{ flexShrink: 0 }} /> {adminSuccess}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <select
                  value={adminStatus}
                  onChange={e => { setAdminStatus(e.target.value); setAdminSuccess(''); }}
                  style={{ padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none', background: '#fff', color: C.heading, cursor: 'pointer', minWidth: 160 }}
                  onFocus={e => e.target.style.borderColor = PRIMARY}
                  onBlur={e => e.target.style.borderColor = C.border}
                >
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <button
                  onClick={handleStatusSave}
                  disabled={adminSaving || !statusChanged}
                  className="btn-primary"
                  style={{ ...BTN.primary, padding: '9px 20px', opacity: (adminSaving || !statusChanged) ? 0.6 : 1, cursor: (adminSaving || !statusChanged) ? 'not-allowed' : 'pointer' }}
                >
                  {adminSaving ? 'Spremanje...' : 'Spremi status'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info sidebar */}
        <div style={{ minWidth: 260, maxWidth: 300 }}>

          {/* Identifikacija */}
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ background: '#eff6ff', borderBottom: `1px solid #dbeafe`, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Hash size={14} color="#2563eb" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', letterSpacing: 0.6 }}>Identifikacija</span>
            </div>
            <div style={{ padding: '14px 18px', display: 'grid', gap: 12 }}>
              {[
                { label: 'ID', value: `#${equipment.id}` },
                { label: 'Serijski broj', value: equipment.serial_number },
                { label: 'Model', value: equipment.model },
                { label: 'Proizvođač', value: equipment.manufacturer },
              ].map(row => (
                <div key={row.label}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.subtle, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{row.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.heading }}>{row.value || <span style={{ color: C.subtle, fontWeight: 400 }}>—</span>}</div>
                </div>
              ))}
              {equipment.location && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.subtle, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>Lokacija</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.heading, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <MapPin size={13} color={C.muted} />{equipment.location}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nabavka & Garancija */}
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ background: '#f0fdf4', borderBottom: `1px solid #bbf7d0`, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Truck size={14} color="#16a34a" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: 0.6 }}>Nabavka & Garancija</span>
            </div>
            <div style={{ padding: '14px 18px', display: 'grid', gap: 12 }}>
              {(() => {
                const now = new Date();
                const warrantyDate = equipment.warranty_expiry ? new Date(equipment.warranty_expiry) : null;
                const warrantyExpired = warrantyDate && warrantyDate < now;
                const warrantySoon = warrantyDate && !warrantyExpired && (warrantyDate - now) < 90 * 24 * 60 * 60 * 1000;
                return [
                  { label: 'Datum nabavke', value: fmtDate(equipment.purchase_date), icon: <Calendar size={12} color={C.muted} />, accent: null },
                  { label: 'Dobavljač', value: equipment.supplier, icon: <Building2 size={12} color={C.muted} />, accent: null },
                  {
                    label: 'Garantni rok',
                    value: fmtDate(equipment.warranty_expiry),
                    icon: <ShieldCheck size={12} color={warrantyExpired ? '#dc2626' : warrantySoon ? '#d97706' : '#16a34a'} />,
                    accent: warrantyExpired ? { bg: '#fef2f2', color: '#dc2626', text: 'Istekla' } : warrantySoon ? { bg: '#fffbeb', color: '#d97706', text: 'Uskoro ističe' } : null,
                  },
                ].map(row => (
                  <div key={row.label}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: C.subtle, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{row.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.heading, display: 'flex', alignItems: 'center', gap: 5 }}>
                      {row.icon}
                      {row.value || <span style={{ color: C.subtle, fontWeight: 400 }}>—</span>}
                      {row.accent && <span style={{ fontSize: 10, fontWeight: 700, background: row.accent.bg, color: row.accent.color, padding: '1px 7px', borderRadius: 99, marginLeft: 4 }}>{row.accent.text}</span>}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Servisiranje */}
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ background: '#faf5ff', borderBottom: `1px solid #e9d5ff`, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Wrench size={14} color="#9333ea" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#7e22ce', textTransform: 'uppercase', letterSpacing: 0.6 }}>Servisiranje</span>
            </div>
            <div style={{ padding: '14px 18px', display: 'grid', gap: 12 }}>
              {(() => {
                const now = new Date();
                const plannedDate = equipment.planned_service ? new Date(equipment.planned_service) : null;
                const serviceOverdue = plannedDate && plannedDate < now;
                const serviceSoon = plannedDate && !serviceOverdue && (plannedDate - now) < 30 * 24 * 60 * 60 * 1000;
                return [
                  { label: 'Zadnji servis', value: fmtDate(equipment.last_service), icon: <Clock size={12} color={C.muted} />, accent: null },
                  {
                    label: 'Planirani servis',
                    value: fmtDate(equipment.planned_service),
                    icon: <Calendar size={12} color={serviceOverdue ? '#dc2626' : serviceSoon ? '#d97706' : '#9333ea'} />,
                    accent: serviceOverdue ? { bg: '#fef2f2', color: '#dc2626', text: 'Kasni' } : serviceSoon ? { bg: '#fffbeb', color: '#d97706', text: 'Uskoro' } : null,
                  },
                  { label: 'Servisna firma', value: equipment.service_company, icon: <Tag size={12} color={C.muted} />, accent: null },
                ].map(row => (
                  <div key={row.label}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: C.subtle, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{row.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.heading, display: 'flex', alignItems: 'center', gap: 5 }}>
                      {row.icon}
                      {row.value || <span style={{ color: C.subtle, fontWeight: 400 }}>—</span>}
                      {row.accent && <span style={{ fontSize: 10, fontWeight: 700, background: row.accent.bg, color: row.accent.color, padding: '1px 7px', borderRadius: 99, marginLeft: 4 }}>{row.accent.text}</span>}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
