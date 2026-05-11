import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRIMARY, C } from '../theme';

const DAYS_BS = ['P', 'U', 'S', 'Č', 'P', 'S', 'N'];
const MONTHS_BS = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

function toDateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isOccupied(day, occupiedRanges) {
  const d = toDateOnly(day);
  return occupiedRanges.some(r => {
    const s = toDateOnly(new Date(r.start_time));
    const e = toDateOnly(new Date(r.end_time));
    return d >= s && d <= e;
  });
}

function rangeContainsOccupied(start, end, occupiedRanges) {
  const s = toDateOnly(start);
  const e = toDateOnly(end);
  return occupiedRanges.some(r => {
    const rs = toDateOnly(new Date(r.start_time));
    const re = toDateOnly(new Date(r.end_time));
    return rs <= e && re >= s;
  });
}

function buildMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // week starts Monday (0=Mon ... 6=Sun)
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
  return days;
}

function MonthGrid({ year, month, today, selectedStart, selectedEnd, hoverDate, occupiedRanges, onDayClick, onDayHover }) {
  const days = buildMonthDays(year, month);

  function getCellStyle(day) {
    if (!day) return { width: 36, height: 36 };

    const d = toDateOnly(day);
    const t = toDateOnly(today);
    const isPast = d < t;
    const occupied = isOccupied(day, occupiedRanges);
    const isStart = sameDay(day, selectedStart);
    const isEnd = sameDay(day, selectedEnd);
    const isToday = sameDay(day, today);

    let inRange = false;
    if (selectedStart && selectedEnd) {
      const s = toDateOnly(selectedStart);
      const e = toDateOnly(selectedEnd);
      inRange = d > s && d < e;
    } else if (selectedStart && hoverDate && !selectedEnd) {
      const s = toDateOnly(selectedStart);
      const h = toDateOnly(hoverDate);
      const lo = s < h ? s : h;
      const hi = s < h ? h : s;
      inRange = d > lo && d < hi;
    }

    const base = {
      width: 36,
      height: 36,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: isToday ? 700 : 400,
      userSelect: 'none',
      transition: 'background 0.12s, color 0.12s',
      position: 'relative',
    };

    if (isPast || occupied) {
      return {
        ...base,
        background: occupied ? '#fee2e2' : '#f1f5f9',
        color: occupied ? '#dc2626' : '#94a3b8',
        cursor: 'default',
        opacity: occupied ? 1 : 0.6,
        borderRadius: '50%',
      };
    }

    if (isStart || isEnd) {
      return { ...base, background: '#166534', color: '#fff', cursor: 'pointer', fontWeight: 700 };
    }

    if (inRange) {
      return { ...base, background: '#dcfce7', color: '#166534', cursor: 'pointer', borderRadius: '50%' };
    }

    return { ...base, background: 'transparent', color: C.heading, cursor: 'pointer' };
  }

  function getWrapperStyle(day) {
    if (!day) return { width: 36, height: 36 };
    const d = toDateOnly(day);
    const t = toDateOnly(today);
    const isPast = d < t;
    const occupied = isOccupied(day, occupiedRanges);

    let inRange = false;
    if (selectedStart && selectedEnd) {
      const s = toDateOnly(selectedStart);
      const e = toDateOnly(selectedEnd);
      inRange = d >= s && d <= e;
    } else if (selectedStart && hoverDate && !selectedEnd) {
      const s = toDateOnly(selectedStart);
      const h = toDateOnly(hoverDate);
      const lo = s < h ? s : h;
      const hi = s < h ? h : s;
      inRange = d >= lo && d <= hi;
    }

    const isStart = sameDay(day, selectedStart);
    const isEnd = sameDay(day, selectedEnd);

    if (!isPast && !occupied && inRange && !isStart && !isEnd) {
      return {
        width: 36,
        height: 36,
        background: '#dcfce7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
    }
    return { width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  }

  return (
    <div>
      <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 14, color: C.heading, marginBottom: 12 }}>
        {MONTHS_BS[month]} {year}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: '2px 0' }}>
        {DAYS_BS.map(d => (
          <div key={d} style={{ width: 36, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: C.muted, textTransform: 'uppercase' }}>
            {d}
          </div>
        ))}
        {days.map((day, i) => (
          <div key={i} style={getWrapperStyle(day)}>
            {day && (
              <div
                style={getCellStyle(day)}
                onClick={() => {
                  const d = toDateOnly(day);
                  const t = toDateOnly(today);
                  if (d < t || isOccupied(day, occupiedRanges)) return;
                  onDayClick(day);
                }}
                onMouseEnter={() => {
                  const d = toDateOnly(day);
                  const t = toDateOnly(today);
                  if (d < t || isOccupied(day, occupiedRanges)) return;
                  onDayHover(day);
                }}
                onMouseLeave={() => onDayHover(null)}
                title={isOccupied(day, occupiedRanges) ? 'Zauzeto' : undefined}
              >
                {day.getDate()}
                {sameDay(day, today) && (
                  <span style={{
                    position: 'absolute',
                    bottom: 3,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: sameDay(day, selectedStart) || sameDay(day, selectedEnd) ? '#fff' : PRIMARY,
                  }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReservationCalendar({ occupiedRanges = [], selectedStart, selectedEnd, onSelect, onClear }) {
  const today = new Date();
  const [baseYear, setBaseYear] = useState(today.getFullYear());
  const [baseMonth, setBaseMonth] = useState(today.getMonth());
  const [hoverDate, setHoverDate] = useState(null);
  const [pickError, setPickError] = useState('');

  const month2 = baseMonth === 11 ? 0 : baseMonth + 1;
  const year2 = baseMonth === 11 ? baseYear + 1 : baseYear;

  const canGoPrev = baseYear > today.getFullYear() || (baseYear === today.getFullYear() && baseMonth > today.getMonth());

  function prevMonth() {
    if (!canGoPrev) return;
    if (baseMonth === 0) { setBaseMonth(11); setBaseYear(y => y - 1); }
    else setBaseMonth(m => m - 1);
  }

  function nextMonth() {
    if (baseMonth === 11) { setBaseMonth(0); setBaseYear(y => y + 1); }
    else setBaseMonth(m => m + 1);
  }

  const handleDayClick = useCallback((day) => {
    setPickError('');

    if (!selectedStart || (selectedStart && selectedEnd)) {
      onSelect(day, null);
      return;
    }

    let start = toDateOnly(selectedStart);
    let end = toDateOnly(day);
    if (end < start) { [start, end] = [end, start]; }

    if (rangeContainsOccupied(start, end, occupiedRanges)) {
      setPickError('Odabrani raspon sadrži zauzete datume. Odaberite drugi period.');
      onSelect(null, null);
      return;
    }

    onSelect(start, end);
  }, [selectedStart, selectedEnd, occupiedRanges, onSelect]);

  function fmtDay(d) {
    if (!d) return '';
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  }

  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(15,23,42,0.08)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          style={{ background: 'none', border: 'none', cursor: canGoPrev ? 'pointer' : 'default', padding: 6, borderRadius: 8, color: canGoPrev ? C.heading : C.subtle, display: 'flex', alignItems: 'center', transition: 'background 0.12s' }}
          onMouseEnter={e => { if (canGoPrev) e.currentTarget.style.background = C.bgFaint; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
        >
          <ChevronLeft size={18} />
        </button>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: '#fee2e2', border: '1px solid #fca5a5', display: 'inline-block' }} />
            Zauzeto
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: '#dcfce7', border: '1px solid #86efac', display: 'inline-block' }} />
            Odabrano
          </span>
        </div>

        <button
          onClick={nextMonth}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: C.heading, display: 'flex', alignItems: 'center', transition: 'background 0.12s' }}
          onMouseEnter={e => { e.currentTarget.style.background = C.bgFaint; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Calendar grid */}
      <div style={{ padding: '20px 24px' }}>
        <div className="cal-grid">
          <MonthGrid
            year={baseYear} month={baseMonth}
            today={today}
            selectedStart={selectedStart} selectedEnd={selectedEnd}
            hoverDate={hoverDate}
            occupiedRanges={occupiedRanges}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
          <MonthGrid
            year={year2} month={month2}
            today={today}
            selectedStart={selectedStart} selectedEnd={selectedEnd}
            hoverDate={hoverDate}
            occupiedRanges={occupiedRanges}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 24px 16px', borderTop: `1px solid ${C.border}`, background: C.bgFaint }}>
        {pickError && (
          <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 10, fontWeight: 500 }}>{pickError}</div>
        )}
        {selectedStart && !selectedEnd && (
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
            Početak: <strong style={{ color: C.heading }}>{fmtDay(selectedStart)}</strong> — odaberite krajnji datum
          </div>
        )}
        {selectedStart && selectedEnd && (
          <div style={{ fontSize: 13, color: '#166534', fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#166534', display: 'inline-block' }} />
            {fmtDay(selectedStart)} — {fmtDay(selectedEnd)}
          </div>
        )}
        {!selectedStart && !pickError && (
          <div style={{ fontSize: 13, color: C.muted }}>Kliknite na slobodan datum za početak rezervacije.</div>
        )}
        {(selectedStart || selectedEnd) && (
          <button
            onClick={() => { onClear(); setPickError(''); }}
            style={{ fontSize: 12, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', marginTop: 2 }}
          >
            Poništi odabir
          </button>
        )}
      </div>
    </div>
  );
}
