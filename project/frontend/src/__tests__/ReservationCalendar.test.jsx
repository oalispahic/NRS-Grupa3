import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ReservationCalendar from '../components/ReservationCalendar';

function Wrapper({ occupied, onOccupiedRange }) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  return (
    <ReservationCalendar
      occupiedRanges={occupied}
      selectedStart={start}
      selectedEnd={end}
      onSelect={(s, e) => { setStart(s); setEnd(e); }}
      onClear={() => { setStart(null); setEnd(null); }}
      onOccupiedRange={onOccupiedRange}
    />
  );
}

describe('ReservationCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-10T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('shows prompt when start day selected, then calls onOccupiedRange when range covers occupied dates', () => {
    const onOccupiedRange = vi.fn();

    render(
      <Wrapper
        occupied={[{ start_time: '2025-01-20T00:00:00Z', end_time: '2025-01-22T00:00:00Z' }]}
        onOccupiedRange={onOccupiedRange}
      />
    );

    // Click day 18 (start)
    const startDay = screen.getAllByText('18')[0];
    fireEvent.click(startDay);
    expect(screen.getByText(/odaberite krajnji datum/i)).toBeInTheDocument();

    // Click day 24 (end — overlaps with occupied 20-22)
    const endDay = screen.getAllByText('24')[0];
    fireEvent.click(endDay);

    // onOccupiedRange should have been called because 18-24 overlaps occupied 20-22
    expect(onOccupiedRange).toHaveBeenCalled();
  });
});
