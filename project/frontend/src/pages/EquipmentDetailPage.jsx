import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ChevronLeft, AlertCircle, CheckCircle2, Microscope, Settings2, Hash, Wrench, ShieldCheck, Shield, Truck, Building2, Clock, Tag, X, Bell, BellOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PRIMARY, C, iconBox, STATUS_EQUIPMENT, BTN } from '../theme';
import ReservationCalendar from '../components/ReservationCalendar';

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

  const [equipment, setEquipment]     = useState(null);
  const [loading, setLoading]         = useState(true);
  const [showForm, setShowForm]       = useState(false);
  const [calStart, setCalStart]       = useState(null);
  const [calEnd, setCalEnd]           = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [submitting, setSubmitting]   = useState(false);
  const [successMsg, setSuccessMsg]   = useState('');
  const [errorMsg, setErrorMsg]       = useState('');

  const [adminStatus, setAdminStatus]   = useState('');
  const [adminSaving, setAdminSaving]   = useState(false);
  const [adminSuccess, setAdminSuccess] = useState('');
  const [safetyConfirmed, setSafetyConfirmed] = useState(false);
  const [showSafetyDialog, setShowSafetyDialog] = useState(false);

  const [waitlistInfo, setWaitlistInfo] = useState(null);
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  function loadEquipment() {
    return fetch(`/api/equipment/${id}`)
      .then(r => r.json())
      .then(data => { setEquipment(data); setAdminStatus(data.status || ''); })
      .finally(() => setLoading(false));
  }

  function loadReservedDates() {
    fetch(`/api/equipment/${id}/reserved-dates`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setReservedDates(data); });
  }

  function loadWaitlist() {
    if (!token || !user) return;
    fetch(`/api/equipment/${id}/waitlist`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setWaitlistInfo(d); })
      .catch(() => {});
  }

  useEffect(() => { loadEquipment(); loadReservedDates(); loadWaitlist(); }, [id]);

  async function handleReserve(e) {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');



    const startTime = new Date(calStart.getFullYear(), calStart.getMonth(), calStart.getDate(), 0, 0, 0).toISOString();
    const endTime = new Date(calEnd.getFullYear(), calEnd.getMonth(), calEnd.getDate(), 23, 59, 59).toISOString();

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
      setShowForm(false); setCalStart(null); setCalEnd(null);
      loadReservedDates();
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
  const canReserve = (user.role === 'laborant' || user.role === 'test') && (equipment.status === 'available' || equipment.status === 'reserved');
  const isAdmin = user.role === 'admin' || user.role === 'test';
  const statusChanged = adminStatus !== equipment.status;
  // Waitlist: show when status is reserved/maintenance/in_use (not available, not out_of_service)
  const showWaitlist = ['reserved', 'maintenance', 'in_use'].includes(equipment.status);

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

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 20 }}>
            <span style={{ background: st.bg, color: st.color, fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 99, transition: 'background 0.2s, color 0.2s' }}>
              {st.label}
            </span>
            {(equipment.tags || []).map(tag => (
              <span key={tag.id} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: tag.color + '22', color: tag.color, border: `1px solid ${tag.color}44` }}>
                {tag.name}
              </span>
            ))}
          </div>

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
                  {equipment?.safety_notes && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#d97706', fontWeight: 600, marginBottom: 12 }}>
                      <Shield size={13} /> Oprema ima sigurnosne napomene
                    </div>
                  )}
                  <div className="action-row">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        if (equipment?.safety_notes) {
                          setShowSafetyDialog(true);
                        } else {
                          setShowForm(true);
                        }
                      }}
                      style={{ ...BTN.primary, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
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
                  <div style={{ marginBottom: 16 }}>
                    <ReservationCalendar
                      occupiedRanges={reservedDates}
                      selectedStart={calStart}
                      selectedEnd={calEnd}
                      onSelect={(s, e) => { setCalStart(s); setCalEnd(e); setErrorMsg(''); }}
                      onClear={() => { setCalStart(null); setCalEnd(null); }}
                    />
                  </div>
                  <div className="action-row">
                    <button type="submit"
                      disabled={submitting || !calStart || !calEnd}
                      className="btn-primary"
                      style={{ ...BTN.primary, opacity: (submitting || !calStart || !calEnd) ? 0.6 : 1, cursor: (submitting || !calStart || !calEnd) ? 'not-allowed' : 'pointer' }}>
                      {submitting ? 'Slanje...' : 'Potvrdi rezervaciju'}
                    </button>
                    <button type="button" className="btn-outline" style={BTN.outline}
                      onClick={() => { setShowForm(false); setCalStart(null); setCalEnd(null); setErrorMsg(''); setSafetyConfirmed(false); }}>
                      Odustani
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Waitlist — visible for reserved/maintenance/in_use status */}
          {showWaitlist && (
            <div style={{ background: '#fafbff', border: `1px solid #dbeafe`, borderRadius: 12, padding: '16px 20px', fontSize: 13, marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontWeight: 600, color: '#1e40af' }}>
                <Bell size={14} />
                Lista čekanja
                {waitlistInfo?.total > 0 && <span style={{ fontSize: 12, background: '#dbeafe', color: '#1e40af', borderRadius: 99, padding: '1px 8px', fontWeight: 700 }}>{waitlistInfo.total} {waitlistInfo.total === 1 ? 'korisnik' : 'korisnika'}</span>}
              </div>
              {isAdmin && waitlistInfo?.list !== undefined ? (
                <div style={{ fontSize: 13, color: C.muted }}>
                  {waitlistInfo.total > 0
                    ? `${waitlistInfo.total} korisnik(a) čeka na obavijest kada oprema postane slobodna.`
                    : 'Niko nije na listi čekanja.'}
                </div>
              ) : waitlistInfo?.onList ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '7px 14px' }}>
                    <Bell size={14} /> Na listi čekanja{waitlistInfo.position ? ` (pozicija ${waitlistInfo.position})` : ''}
                  </span>
                  <button
                    disabled={waitlistLoading}
                    onClick={async () => {
                      setWaitlistLoading(true);
                      await fetch(`/api/equipment/${id}/waitlist`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
                      setWaitlistInfo(p => ({ ...p, onList: false, position: null, total: (p?.total || 1) - 1 }));
                      setWaitlistLoading(false);
                    }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 12px', cursor: 'pointer' }}
                  >
                    <BellOff size={13} /> Ukloni s liste
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ color: C.muted, marginBottom: 10 }}>Oprema nije dostupna. Dobijet ćete obavijest čim postane slobodna.</div>
                  <button
                    disabled={waitlistLoading}
                    onClick={async () => {
                      setWaitlistLoading(true);
                      const r = await fetch(`/api/equipment/${id}/waitlist`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
                      if (r.ok) loadWaitlist();
                      setWaitlistLoading(false);
                    }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: waitlistLoading ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: waitlistLoading ? 0.7 : 1 }}
                  >
                    <Bell size={14} />
                    Stavi me na listu čekanja
                  </button>
                </div>
              )}
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

          {equipment.safety_notes && (
            <div style={{ background: '#fff', border: `1px solid #fcd34d`, borderRadius: 12, padding: '20px 24px', marginTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Shield size={14} color="#d97706" />
                <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: 0.5 }}>Sigurnosne napomene</div>
              </div>
              <p style={{ fontSize: 14, color: '#78350f', margin: 0, lineHeight: 1.6 }}>{equipment.safety_notes}</p>
            </div>
          )}

        </div>
      </div>

      {showSafetyDialog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px' }}>
          <div style={{ background: '#fff', borderRadius: 14, width: '100%', maxWidth: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', animation: 'labFadeIn 0.15s ease-out' }}>
            <div style={{ background: '#fffbeb', borderRadius: '14px 14px 0 0', padding: '18px 24px', borderBottom: '1px solid #fcd34d', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Shield size={18} color="#d97706" />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#92400e' }}>Sigurnosne napomene</span>
              </div>
              <button onClick={() => setShowSafetyDialog(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#92400e', display: 'flex', padding: 4 }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: '0 0 8px' }}>
                Oprema <strong>{equipment.name}</strong> ima sljedeće sigurnosne napomene:
              </p>
              <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: '12px 16px', marginBottom: 20 }}>
                <p style={{ fontSize: 14, color: '#92400e', margin: 0, lineHeight: 1.7 }}>{equipment.safety_notes}</p>
              </div>
              <p style={{ fontSize: 13, color: '#78350f', margin: '0 0 20px', fontWeight: 500 }}>
                Potvrđivanjem izjavljujete da ste pročitali i razumjeli gore navedene napomene.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowSafetyDialog(false)}
                  style={{ ...BTN.ghost, padding: '9px 18px', fontSize: 13 }}
                >
                  Odustani
                </button>
                <button
                  onClick={() => { setShowSafetyDialog(false); setSafetyConfirmed(true); setShowForm(true); }}
                  style={{ background: '#d97706', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Shield size={14} /> Razumijem, nastavi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
