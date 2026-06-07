import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MessagesPage from '../pages/MessagesPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('MessagesPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ user: { id: 1, role: 'laborant' }, token: 'token' });
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  test('sends a message to admin', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/messages/inbox') {
        return Promise.resolve({ json: () => Promise.resolve({ messages: [] }) });
      }
      if (url === '/api/messages/broadcasts') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/messages' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(<MessagesPage />);

    const textarea = await screen.findByPlaceholderText(/napišite poruku/i);
    fireEvent.change(textarea, { target: { value: 'Pitanje o centrifugi' } });

    fireEvent.click(screen.getByRole('button', { name: /pošalji/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/messages' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
      expect(JSON.parse(postCall[1].body)).toEqual({ body: 'Pitanje o centrifugi' });
    });
  });

  test('displays broadcasts tab and marks as read', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/messages/inbox') {
        return Promise.resolve({ json: () => Promise.resolve({ messages: [] }) });
      }
      if (url === '/api/messages/broadcasts' && (!options || options.method !== 'POST')) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, title: 'Odrzavanje', body: 'Sistem nece raditi.', created_at: new Date().toISOString(), sender_name: 'Admin', is_read: false },
          ]),
        });
      }
      if (url?.startsWith('/api/messages/broadcasts/') && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(<MessagesPage />);

    const broadcastsTab = await screen.findByRole('button', { name: /obavijesti/i });
    fireEvent.click(broadcastsTab);

    expect(await screen.findByText('Odrzavanje')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /pročitano/i }));

    await waitFor(() => {
      const readCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/messages/broadcasts/1/read' && opts?.method === 'POST'
      );
      expect(readCall).toBeTruthy();
    });
  });

  test('pre-fills equipment inquiry from sessionStorage', async () => {
    sessionStorage.setItem('msgEquipCtx', JSON.stringify({ id: 5, name: 'Centrifuga X' }));

    global.fetch = vi.fn((url, options) => {
      if (url === '/api/messages/inbox') {
        return Promise.resolve({ json: () => Promise.resolve({ messages: [] }) });
      }
      if (url === '/api/messages/broadcasts') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/messages' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 2 }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(<MessagesPage />);

    // The chip "Pitanje o: Centrifuga X" should be visible
    expect(await screen.findByText(/Pitanje o:/)).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(/napišite poruku/i);
    expect(textarea.value).toContain('Centrifuga X');
    expect(screen.getAllByText(/Centrifuga X/).length).toBeGreaterThanOrEqual(2);

    // Submit with equipment context
    fireEvent.click(screen.getByRole('button', { name: /pošalji/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/messages' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
      expect(JSON.parse(postCall[1].body)).toEqual({
        body: expect.stringContaining('Centrifuga X'),
        equipment_id: 5,
      });
    });
  });

  test('shows empty state when no messages', async () => {
    global.fetch = vi.fn((url) => {
      if (url === '/api/messages/inbox') {
        return Promise.resolve({ json: () => Promise.resolve({ messages: [] }) });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    render(<MessagesPage />);

    expect(await screen.findByText(/nema poruka/i)).toBeInTheDocument();
  });
});
