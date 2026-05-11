import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, SearchX, Pencil, X, AlertTriangle, CheckCircle2, CalendarDays } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PRIMARY, C, BTN, STATUS_RESERVATION } from '../theme';
import ReservationCalendar from '../components/ReservationCalendar';

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function fmtDay(d) {
  if (!d) return '';
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

const EDITABLE_STATUSES = ['pending', 'approved'];

export default function MyReservationsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);

  // Edit state
  const [editingId, setEditingId]       = useState(null);
  const [editMode, setEditMode]         = useState(null); // 'cancel' | 'dates'
  const [confirming, setConfirming]     = useState(false);
  const [saving, setSaving]             = useState(false);
  const [occupied, setOccupied]         = useState([]);
  const [calStart, setCalStart]         = useState(null);
  const [calEnd, setCalEnd]             = useState(null);

  function loadReservations() {
    return fetch('/api/reservations/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setReservations(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
  }

  useEffect(() => { loadReservations(); }, [token]);

  function openEdit(id) {
    if (editingId === id) {
      closeEdit();
      return;
    }
    setEditingId(id);
    setEditMode(null);
    setConfirming(false);
    setCalStart(null);
    setCalEnd(null);
    setOccupied([]);
  }

  function closeEdit() {
    setEditingId(null);
    setEditMode(null);
    setConfirming(false);
    setCalStart(null);
    setCalEnd(null);
  }

  function openDatesMode(reservation) {
    setEditMode('dates');
    setCalStart(null);
    setCalEnd(null);
    fetch(`/api/equipment/${reservation.equipment_id}/reserved-dates`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          // exclude own reservation so user can keep/extend/shrink their current dates
          setOccupied(data.filter(d => d.id !== reservation.id));
        }
      });
  }

  async function handleCancel(reservation) {
    setSaving(true);
    try {
      const res = await fetch(`/api/reservations/${reservation.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri otkazivanju');
      toast.success('Rezervacija je otkazana.');
      closeEdit();
      loadReservations();
    } catch (err) {
      toast.error(err.message);
      setConfirming(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateDates(reservation) {
    if (!calStart || !calEnd) return;
    setSaving(true);
    try {
      const startTime = new Date(calStart.getFullYear(), calStart.getMonth(), calStart.getDate(), 0, 0, 0).toISOString();
      const endTime = new Date(calEnd.getFullYear(), calEnd.getMonth(), calEnd.getDate(), 23, 59, 59).toISOString();
      const res = await fetch(`/api/reservations/${reservation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ startTime, endTime }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri izmjeni');
      toast.success('Datumi rezervacije su promijenjeni — status: na čekanju.');
      closeEdit();
      loadReservations();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  const renderEditPanel = useCallback((reservation) => {
    if (editingId !== reservation.id) return null;

    return (
      <div style={{ background: '#f8fafc', border: `1px solid ${C.border}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: 20, animation: 'labFadeIn 0.15s ease-out' }}>
        {editMode === null && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: C.muted, marginRight: 4 }}>Šta želite uraditi?</span>
            <button
              onClick={() => { setEditMode('cancel'); setConfirming(false); }}
              style={{ ...BTN.danger, padding: '8px 16px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <AlertTriangle size={13} /> Otkaži rezervaciju
            </button>
            <button
              onClick={() => openDatesMode(reservation)}
              style={{ ...BTN.outline, padding: '8px 16px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <CalendarDays size={13} /> Promijeni datume
            </button>
            <button onClick={closeEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 4 }}>
              <X size={16} />
            </button>
          </div>
        )}

        {editMode === 'cancel' && (
          <div>
            {!confirming ? (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#92400e', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '8px 14px' }}>
                  <AlertTriangle size={14} />
                  Jeste li sigurni da želite otkazati ovu rezervaciju?
                </div>
                <button
                  onClick={() => { setConfirming(true); handleCancel(reservation); }}
                  disabled={saving}
                  style={{ ...BTN.danger, padding: '8px 16px', fontSize: 13, opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Otkazivanje...' : 'Da, otkaži'}
                </button>
                <button onClick={() => setEditMode(null)} style={{ ...BTN.ghost, padding: '8px 14px', fontSize: 13 }}>
                  Nazad
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
                <div style={{ width: 14, height: 14, border: `2px solid ${C.border}`, borderTopColor: PRIMARY, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Otkazivanje...
              </div>
            )}
          </div>
        )}

        {editMode === 'dates' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.heading, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CalendarDays size={14} color={PRIMARY} />
                Odaberite novi period
              </div>
              <button onClick={() => setEditMode(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 4 }}>
                <X size={15} />
              </button>
            </div>
            <ReservationCalendar
              occupiedRanges={occupied}
              selectedStart={calStart}
              selectedEnd={calEnd}
              onSelect={(s, e) => { setCalStart(s); setCalEnd(e); }}
              onClear={() => { setCalStart(null); setCalEnd(null); }}
            />
            {calStart && calEnd && (
              <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={14} />
                  {fmtDay(calStart)} — {fmtDay(calEnd)}
                </div>
                <button
                  onClick={() => handleUpdateDates(reservation)}
                  disabled={saving}
                  style={{ ...BTN.primary, padding: '8px 18px', fontSize: 13, opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Spremanje...' : 'Spremi izmjene'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }, [editingId, editMode, confirming, saving, occupied, calStart, calEnd]);

  return (
    <div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Moje rezervacije
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Rezervacije</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregled svih vaših zahtjeva za opremu.</p>
      </div>

      {loading ? (
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: C.bgFaint, padding: '12px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: 16 }}>
            {['40%', '20%', '20%', '12%'].map((w, i) => (
              <div key={i} className="skeleton" style={{ width: w, height: 12, borderRadius: 4 }} />
            ))}
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 20px', borderBottom: i < 3 ? `1px solid ${C.borderFaint}` : 'none', alignItems: 'center' }}>
              <div className="skeleton" style={{ width: '35%', height: 14, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '22%', height: 13, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '22%', height: 13, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: 68, height: 22, borderRadius: 99 }} />
            </div>
          ))}
        </div>
      ) : reservations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <SearchX size={40} color={C.subtle} style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>Nemate evidentiranih rezervacija.</p>
          <Link to="/equipment" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: PRIMARY, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            <BookOpen size={14} /> Pregledaj opremu
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reservations.map((r) => {
            const sc = STATUS_RESERVATION[r.status] || { bg: '#f1f5f9', color: '#475569', label: r.status };
            const canEdit = EDITABLE_STATUSES.includes(r.status);
            const isExpanded = editingId === r.id;

            return (
              <div key={r.id}>
                <div style={{
                  background: '#fff',
                  border: `1px solid ${isExpanded ? PRIMARY : C.border}`,
                  borderRadius: isExpanded ? '12px 12px 0 0' : 12,
                  transition: 'border-color 0.15s',
                }}>
                  {/* Desktop row */}
                  <div className="table-desktop" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.8fr) 1fr 1fr auto auto', gap: 0, alignItems: 'center' }}>
                    <div style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, color: C.heading }}>
                      {r.equipment_name || '—'}
                      <div style={{ fontSize: 11, color: C.subtle, fontWeight: 400, marginTop: 2 }}>#{r.id}</div>
                    </div>
                    <div style={{ padding: '14px 12px', fontSize: 13, color: C.muted }}>{fmt(r.start_time)}</div>
                    <div style={{ padding: '14px 12px', fontSize: 13, color: C.muted }}>{fmt(r.end_time)}</div>
                    <div style={{ padding: '14px 12px' }}>
                      <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{sc.label}</span>
                    </div>
                    <div style={{ padding: '14px 16px 14px 4px' }}>
                      {canEdit && (
                        <button
                          onClick={() => openEdit(r.id)}
                          title="Uredi rezervaciju"
                          style={{
                            background: isExpanded ? '#eff6ff' : 'none',
                            border: `1px solid ${isExpanded ? PRIMARY : C.border}`,
                            borderRadius: 7,
                            cursor: 'pointer',
                            padding: '6px 10px',
                            color: isExpanded ? PRIMARY : C.muted,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            transition: 'all 0.12s',
                          }}
                          onMouseEnter={e => { if (!isExpanded) { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; e.currentTarget.style.background = '#eff6ff'; }}}
                          onMouseLeave={e => { if (!isExpanded) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.background = 'none'; }}}
                        >
                          <Pencil size={12} /> Uredi
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="responsive-table-card-list" style={{ padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.heading, overflowWrap: 'anywhere' }}>{r.equipment_name || '—'}</div>
                        <div style={{ fontSize: 12, color: C.subtle, marginTop: 2 }}>Rezervacija #{r.id}</div>
                      </div>
                      <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{sc.label}</span>
                    </div>
                    <div style={{ display: 'grid', gap: 6, marginBottom: canEdit ? 12 : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
                        <span style={{ color: C.muted }}>Početak</span>
                        <span style={{ color: C.body, textAlign: 'right' }}>{fmt(r.start_time)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
                        <span style={{ color: C.muted }}>Kraj</span>
                        <span style={{ color: C.body, textAlign: 'right' }}>{fmt(r.end_time)}</span>
                      </div>
                    </div>
                    {canEdit && (
                      <button
                        onClick={() => openEdit(r.id)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: `1px solid ${isExpanded ? PRIMARY : C.border}`,
                          background: isExpanded ? '#eff6ff' : '#fff',
                          color: isExpanded ? PRIMARY : C.muted,
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <Pencil size={13} /> {isExpanded ? 'Zatvori' : 'Uredi'}
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && renderEditPanel(r)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
