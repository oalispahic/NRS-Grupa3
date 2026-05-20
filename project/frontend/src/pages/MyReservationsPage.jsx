import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, SearchX, CalendarDays, Star,
  AlertTriangle, CheckCircle2, X, Undo2, Clock,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PRIMARY, C, BTN, STATUS_RESERVATION } from '../theme';
import ReservationCalendar from '../components/ReservationCalendar';

function fmt(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleString('bs-BA', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function fmtDay(d) {
  if (!d) return '';
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

function RatingPanel({ reservation, token, onRated }) {
  const toast = useToast();
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [existingRating, setExistingRating] = useState(null);
  const [loadingRating, setLoadingRating] = useState(true);

  useEffect(() => {
    fetch(`/api/equipment/${reservation.equipment_id}/ratings`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(d => {
      if (d?.ratings) {
        const mine = d.ratings.find(r => r.reservation_id === reservation.id);
        if (mine) setExistingRating(mine);
      }
    }).finally(() => setLoadingRating(false));
  }, [reservation.id, reservation.equipment_id, token]);

  async function handleSubmit() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/equipment/${reservation.equipment_id}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reservationId: reservation.id, rating: selected, comment: comment.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri slanju ocjene');
      toast.success('Hvala! Vaša ocjena je sačuvana.');
      setExistingRating(data);
      onRated?.();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loadingRating) return <div style={{ fontSize: 13, color: C.subtle }}>Provjera ocjene...</div>;

  if (existingRating) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} size={15} fill={s <= existingRating.rating ? '#f59e0b' : 'none'} color={s <= existingRating.rating ? '#f59e0b' : C.border} />
          ))}
        </div>
        <span style={{ fontSize: 13, color: C.muted }}>Ocijenili ste ovu opremu</span>
        {existingRating.comment && (
          <span style={{ fontSize: 12, color: C.subtle, fontStyle: 'italic' }}>"{existingRating.comment}"</span>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.heading, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Star size={13} color="#f59e0b" fill="#f59e0b" />
        Ocijenite opremu
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
        {[1, 2, 3, 4, 5].map(s => (
          <button
            key={s}
            type="button"
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setSelected(s)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
          >
            <Star
              size={22}
              fill={(hover || selected) >= s ? '#f59e0b' : 'none'}
              color={(hover || selected) >= s ? '#f59e0b' : C.border}
              style={{ transition: 'all 0.1s' }}
            />
          </button>
        ))}
      </div>
      {selected > 0 && (
        <>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Dodajte komentar (opcionalno)..."
            rows={2}
            style={{
              width: '100%', padding: '8px 10px',
              border: `1px solid ${C.border}`, borderRadius: 8,
              fontSize: 13, resize: 'vertical', fontFamily: 'inherit',
              color: C.heading, outline: 'none', marginBottom: 10,
            }}
            onFocus={e => e.target.style.borderColor = PRIMARY}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{ ...BTN.primary, padding: '8px 18px', fontSize: 13, opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'Slanje...' : 'Pošalji ocjenu'}
          </button>
        </>
      )}
    </div>
  );
}

export default function MyReservationsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editMode, setEditMode] = useState(null); // null | 'cancel' | 'dates' | 'return'
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);
  const [occupied, setOccupied] = useState([]);
  const [calStart, setCalStart] = useState(null);
  const [calEnd, setCalEnd] = useState(null);

  function loadReservations() {
    return fetch('/api/reservations/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setReservations(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadReservations(); }, [token]);

  function isCompleted(r) {
    return r.status === 'approved' && new Date(r.end_time) < new Date();
  }

  function isActive(r) {
    const now = new Date();
    return r.status === 'approved' && new Date(r.start_time) <= now && new Date(r.end_time) > now;
  }

  function canManage(r) {
    return (r.status === 'pending' || r.status === 'approved') && new Date(r.start_time) > new Date();
  }

  function openPanel(id, mode) {
    if (editingId === id && editMode === mode) { closePanel(); return; }
    setEditingId(id);
    setEditMode(mode);
    setConfirming(false);
    setCalStart(null);
    setCalEnd(null);
    setOccupied([]);
  }

  function openDatesPanel(reservation) {
    openPanel(reservation.id, 'dates');
    fetch(`/api/equipment/${reservation.equipment_id}/reserved-dates`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOccupied(data.filter(d => d.id !== reservation.id));
        }
      });
  }

  function closePanel() {
    setEditingId(null);
    setEditMode(null);
    setConfirming(false);
    setCalStart(null);
    setCalEnd(null);
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
      closePanel();
      loadReservations();
    } catch (err) {
      toast.error(err.message);
      setConfirming(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleReturn(reservation) {
    setSaving(true);
    try {
      const res = await fetch(`/api/reservations/${reservation.id}/return`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri vraćanju opreme');
      toast.success('Oprema je uspješno vraćena.');
      closePanel();
      loadReservations();
    } catch (err) {
      toast.error(err.message);
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
      closePanel();
      loadReservations();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  const renderExpandPanel = useCallback((r) => {
    if (editingId !== r.id) return null;

    return (
      <div style={{
        borderTop: `1px solid ${C.border}`,
        padding: '18px 20px',
        background: C.bgFaint,
        borderRadius: '0 0 14px 14px',
        animation: 'labFadeIn 0.15s ease-out',
      }}>
        {editMode === 'return' && (
          <div>
            {!confirming ? (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, fontSize: 13,
                  color: '#1e40af', background: '#eff6ff',
                  border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 14px',
                }}>
                  <Undo2 size={14} />
                  Potvrdi povrat opreme prije isteka termina?
                </div>
                <button
                  onClick={() => { setConfirming(true); handleReturn(r); }}
                  disabled={saving}
                  style={{ ...BTN.primary, padding: '8px 18px', fontSize: 13, opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Vraćanje...' : 'Da, vrati opremu'}
                </button>
                <button onClick={closePanel} style={{ ...BTN.ghost, padding: '8px 14px', fontSize: 13 }}>
                  Odustani
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
                <div style={{ width: 14, height: 14, border: `2px solid ${C.border}`, borderTopColor: PRIMARY, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Vraćanje opreme...
              </div>
            )}
          </div>
        )}

        {editMode === 'cancel' && (
          <div>
            {!confirming ? (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, fontSize: 13,
                  color: '#92400e', background: '#fffbeb',
                  border: '1px solid #fde68a', borderRadius: 8, padding: '8px 14px',
                }}>
                  <AlertTriangle size={14} />
                  Jeste li sigurni da želite otkazati ovu rezervaciju?
                </div>
                <button
                  onClick={() => { setConfirming(true); handleCancel(r); }}
                  disabled={saving}
                  style={{ ...BTN.danger, padding: '8px 18px', fontSize: 13, opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Otkazivanje...' : 'Da, otkaži'}
                </button>
                <button onClick={closePanel} style={{ ...BTN.ghost, padding: '8px 14px', fontSize: 13 }}>
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
              <button onClick={closePanel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 4 }}>
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
                  onClick={() => handleUpdateDates(r)}
                  disabled={saving}
                  style={{ ...BTN.primary, padding: '8px 18px', fontSize: 13, opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Spremanje...' : 'Spremi izmjene'}
                </button>
              </div>
            )}
          </div>
        )}

        {editMode === null && isCompleted(r) && (
          <RatingPanel reservation={r} token={token} onRated={loadReservations} />
        )}
      </div>
    );
  }, [editingId, editMode, confirming, saving, occupied, calStart, calEnd, token]);

  const statusAccent = {
    pending:  '#f59e0b',
    approved: '#22c55e',
    rejected: '#ef4444',
  };

  return (
    <div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .res-card { background:#fff; border:1px solid ${C.border}; border-radius:14px; overflow:hidden; transition:box-shadow 0.15s, border-color 0.15s; }
        .res-card:hover { box-shadow:0 4px 18px rgba(15,23,42,0.07); border-color:#d1d5db; }
        .res-card.active { border-color:#bfdbfe; }
        .res-card.expanded { border-color:${PRIMARY}; box-shadow:0 0 0 3px rgba(37,99,235,0.08); }
        .res-action-btn { display:inline-flex; align-items:center; gap:5px; padding:7px 13px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.12s; border:1px solid ${C.border}; background:#fff; color:${C.body}; }
        .res-action-btn:hover { border-color:${PRIMARY}; color:${PRIMARY}; background:#eff6ff; }
        .res-action-btn.return { background:#eff6ff; border-color:#bfdbfe; color:#1e40af; }
        .res-action-btn.return:hover { background:#dbeafe; border-color:${PRIMARY}; }
        .res-action-btn.cancel { border-color:#fecaca; color:#dc2626; background:#fff5f5; }
        .res-action-btn.cancel:hover { background:#fee2e2; border-color:#ef4444; }
        .res-action-btn.rate { border-color:#fde68a; color:#92400e; background:#fffbeb; }
        .res-action-btn.rate:hover { background:#fef3c7; border-color:#f59e0b; }
        .res-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(360px,1fr)); gap:16px; }
        @media(max-width:600px){ .res-grid { grid-template-columns:1fr; } }
      `}</style>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'inline-block', border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 14px', fontSize: 13, color: C.muted, marginBottom: 12 }}>
          Moje rezervacije
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.heading }}>Rezervacije</h1>
        <p style={{ marginTop: 6, fontSize: 15, color: C.muted }}>Pregled svih vaših zahtjeva za laboratorijsku opremu.</p>
      </div>

      {loading ? (
        <div className="res-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: 4 }} className="skeleton" />
              <div style={{ padding: '16px 20px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div className="skeleton" style={{ width: 80, height: 20, borderRadius: 99 }} />
                  <div className="skeleton" style={{ width: 36, height: 16, borderRadius: 4 }} />
                </div>
                <div className="skeleton" style={{ width: '70%', height: 18, borderRadius: 4, marginBottom: 16 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  <div className="skeleton" style={{ height: 40, borderRadius: 8 }} />
                  <div className="skeleton" style={{ height: 40, borderRadius: 8 }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div className="skeleton" style={{ width: 100, height: 30, borderRadius: 8 }} />
                  <div className="skeleton" style={{ width: 80, height: 30, borderRadius: 8 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reservations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <SearchX size={40} color={C.subtle} style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 16 }}>Nemate evidentiranih rezervacija.</p>
          <Link
            to="/equipment"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: PRIMARY, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
          >
            <BookOpen size={14} /> Pregledaj opremu
          </Link>
        </div>
      ) : (
        <div className="res-grid">
          {reservations.map((r) => {
            const sc = STATUS_RESERVATION[r.status] || { bg: '#f1f5f9', color: '#475569', label: r.status };
            const accent = statusAccent[r.status] || '#94a3b8';
            const active = isActive(r);
            const completed = isCompleted(r);
            const manage = canManage(r);
            const isExpanded = editingId === r.id;

            return (
              <div key={r.id} className={`res-card${active ? ' active' : ''}${isExpanded ? ' expanded' : ''}`}>
                {/* status accent strip */}
                <div style={{ height: 4, background: active ? PRIMARY : accent }} />

                <div style={{ padding: '16px 20px 20px' }}>
                  {/* header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{
                      background: sc.bg, color: sc.color,
                      fontSize: 11, fontWeight: 700, padding: '3px 10px',
                      borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.4px',
                    }}>
                      {sc.label}
                    </span>
                    <span style={{ fontSize: 12, color: C.subtle, fontWeight: 500 }}>#{r.id}</span>
                  </div>

                  {/* equipment name */}
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.heading, marginBottom: 14, lineHeight: 1.35 }}>
                    {r.equipment_name || '—'}
                  </div>

                  {/* dates */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                    <div style={{ background: C.bgFaint, borderRadius: 8, padding: '9px 12px' }}>
                      <div style={{ fontSize: 10, color: C.subtle, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                        Početak
                      </div>
                      <div style={{ fontSize: 12, color: C.body, fontWeight: 500 }}>{fmt(r.start_time)}</div>
                    </div>
                    <div style={{ background: C.bgFaint, borderRadius: 8, padding: '9px 12px' }}>
                      <div style={{ fontSize: 10, color: C.subtle, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                        Kraj
                      </div>
                      <div style={{ fontSize: 12, color: C.body, fontWeight: 500 }}>{fmt(r.end_time)}</div>
                    </div>
                  </div>

                  {/* active badge */}
                  {active && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 12, color: '#1e40af', background: '#eff6ff',
                      border: '1px solid #bfdbfe', borderRadius: 7,
                      padding: '5px 10px', marginBottom: 14, width: 'fit-content',
                    }}>
                      <Clock size={12} />
                      Oprema je trenutno u upotrebi
                    </div>
                  )}

                  {/* completed badge */}
                  {completed && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 12, color: '#374151', background: '#f9fafb',
                      border: `1px solid ${C.border}`, borderRadius: 7,
                      padding: '5px 10px', marginBottom: 14, width: 'fit-content',
                    }}>
                      <CheckCircle2 size={12} color="#22c55e" />
                      Rezervacija završena
                    </div>
                  )}

                  {/* action buttons */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {active && (
                      <button
                        className="res-action-btn return"
                        onClick={() => openPanel(r.id, 'return')}
                      >
                        <Undo2 size={12} /> Vrati opremu
                      </button>
                    )}
                    {manage && (
                      <>
                        <button
                          className="res-action-btn"
                          onClick={() => openDatesPanel(r)}
                        >
                          <CalendarDays size={12} /> Promijeni datume
                        </button>
                        <button
                          className="res-action-btn cancel"
                          onClick={() => openPanel(r.id, 'cancel')}
                        >
                          <AlertTriangle size={12} /> Otkaži
                        </button>
                      </>
                    )}
                    {completed && (
                      <button
                        className="res-action-btn rate"
                        onClick={() => openPanel(r.id, null)}
                      >
                        <Star size={12} /> Ocijeni opremu
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && renderExpandPanel(r)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
