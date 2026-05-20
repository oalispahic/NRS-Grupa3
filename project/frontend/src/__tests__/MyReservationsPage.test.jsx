import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MyReservationsPage from '../pages/MyReservationsPage';

const useAuthMock = vi.fn();
const toastMock = { success: vi.fn(), error: vi.fn() };

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('../hooks/useToast', () => ({
  useToast: () => toastMock,
}));

describe('MyReservationsPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ token: 'token' });
    vi.clearAllMocks();
  });

  test('shows edit actions only for editable statuses', async () => {
    const futureStart = new Date(Date.now() + 24 * 3600000).toISOString();
    const futureEnd = new Date(Date.now() + 25 * 3600000).toISOString();

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([
        {
          id: 1,
          equipment_name: 'Microscope A',
          start_time: futureStart,
          end_time: futureEnd,
          status: 'pending',
        },
        {
          id: 2,
          equipment_name: 'Centrifuge B',
          start_time: futureStart,
          end_time: futureEnd,
          status: 'approved',
        },
        {
          id: 3,
          equipment_name: 'Scale C',
          start_time: futureStart,
          end_time: futureEnd,
          status: 'rejected',
        },
      ]),
    });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    const rejectedItems = await screen.findAllByText('Scale C');
    expect(rejectedItems.length).toBeGreaterThan(0);
    const dateButtons = await screen.findAllByRole('button', { name: /Promijeni datume/i });
    expect(dateButtons.length).toBe(2);
  });

  test('sends cancel request from edit panel', async () => {
    const futureStart = new Date(Date.now() + 24 * 3600000).toISOString();
    const futureEnd = new Date(Date.now() + 25 * 3600000).toISOString();

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve([
          {
            id: 5,
            equipment_name: 'Centrifuge X',
            start_time: futureStart,
            end_time: futureEnd,
            status: 'pending',
          },
        ]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    const cancelButton = await screen.findByRole('button', { name: /Otkaži/i });
    fireEvent.click(cancelButton);

    const confirmButton = await screen.findByRole('button', { name: /Da, otkaži/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      const deleteCall = global.fetch.mock.calls[1];
      expect(deleteCall[0]).toBe('/api/reservations/5');
      expect(deleteCall[1].method).toBe('DELETE');
    });
  });

  test('submits rating for completed reservation', async () => {
    const pastStart = new Date(Date.now() - 2 * 3600000).toISOString();
    const pastEnd = new Date(Date.now() - 3600000).toISOString();

    global.fetch = vi.fn((url, options) => {
      if (url === '/api/reservations/my') {
        return Promise.resolve({
          json: () => Promise.resolve([
            {
              id: 10,
              equipment_id: 5,
              equipment_name: 'Microscope Z',
              start_time: pastStart,
              end_time: pastEnd,
              status: 'approved',
            },
          ]),
        });
      }
      if (url === '/api/equipment/5/ratings' && (!options || !options.method)) {
        return Promise.resolve({ json: () => Promise.resolve({ ratings: [] }) });
      }
      if (url === '/api/equipment/5/ratings' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 77, rating: 5 }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(
      <MemoryRouter>
        <MyReservationsPage />
      </MemoryRouter>
    );

    const openRating = await screen.findByRole('button', { name: /Ocijeni opremu/i });
    fireEvent.click(openRating);

    const ratingHeader = await screen.findByText('Ocijenite opremu');
    const ratingBlock = ratingHeader.parentElement;

    const starButtons = within(ratingBlock).getAllByRole('button');
    fireEvent.click(starButtons[4]);

    const submitBtn = await within(ratingBlock).findByRole('button', { name: /Pošalji ocjenu/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, options]) =>
        url === '/api/equipment/5/ratings' && options?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
    });
  });
});
