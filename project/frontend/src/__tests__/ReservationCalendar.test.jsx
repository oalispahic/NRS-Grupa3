import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ReservationCalendar from '../components/ReservationCalendar';

function Wrapper({ occupied }) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  return (
    <ReservationCalendar
      occupiedRanges={occupied}
      selectedStart={start}
      selectedEnd={end}
      onSelect={(s, e) => { setStart(s); setEnd(e); }}
      onClear={() => { setStart(null); setEnd(null); }}
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

  test('shows error when selected range contains occupied dates', () => {
    render(
      <Wrapper
        occupied={[{ start_time: '2025-01-20T00:00:00Z', end_time: '2025-01-22T00:00:00Z' }]}
      />
    );

    const startDay = screen.getAllByText('18')[0];
    const endDay = screen.getAllByText('24')[0];

    fireEvent.click(startDay);
    expect(screen.getByText(/odaberite krajnji datum/i)).toBeInTheDocument();
    fireEvent.click(endDay);

    expect(screen.getByText(/Odabrani raspon/i)).toBeInTheDocument();
  });
});
