import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AdminMessagesPage from '../pages/admin/AdminMessagesPage';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('AdminMessagesPage', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ user: { id: 2, role: 'admin', full_name: 'Admin' }, token: 'token' });
    vi.clearAllMocks();
  });

  test('loads conversations and selects a user to view messages', async () => {
    global.fetch = vi.fn((url) => {
      if (url === '/api/messages/conversations') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, full_name: 'User A', email: 'a@test.com', role: 'laborant', last_message: 'Zdravo', last_at: new Date().toISOString(), unread_count: 0 },
          ]),
        });
      }
      if (url === '/api/messages/conversation/1') {
        return Promise.resolve({
          json: () => Promise.resolve({
            messages: [{ id: 10, sender_id: 1, body: 'Zdravo', sender_name: 'User A', sender_role: 'laborant', created_at: new Date().toISOString(), read_at: null, equipment_id: null, equipment_name: null, recipient_user_id: null }],
          }),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    render(<AdminMessagesPage />);

    const userBtn = await screen.findByText('User A');
    fireEvent.click(userBtn);

    expect(await screen.findByText('Zdravo')).toBeInTheDocument();
  });

  test('admin replies to a conversation', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/messages/conversations') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: 1, full_name: 'User A', email: 'a@test.com', role: 'laborant', last_message: 'Zdravo', last_at: new Date().toISOString(), unread_count: 1 },
          ]),
        });
      }
      if (url === '/api/messages/conversation/1') {
        return Promise.resolve({
          json: () => Promise.resolve({ messages: [] }),
        });
      }
      if (url === '/api/messages' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 5 }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(<AdminMessagesPage />);

    const userBtn = await screen.findByText('User A');
    fireEvent.click(userBtn);

    const textarea = await screen.findByPlaceholderText(/odgovorite/i);
    fireEvent.change(textarea, { target: { value: 'Odgovor admina' } });

    fireEvent.click(screen.getByRole('button', { name: /pošalji/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/messages' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
      expect(JSON.parse(postCall[1].body)).toEqual({
        body: 'Odgovor admina',
        recipient_user_id: 1,
      });
    });
  });

  test('admin creates a broadcast', async () => {
    global.fetch = vi.fn((url, options) => {
      if (url === '/api/messages/conversations') {
        return Promise.resolve({ json: () => Promise.resolve([]) });
      }
      if (url === '/api/messages/broadcasts' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1, title: 'Test' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(<AdminMessagesPage />);

    const broadcastTab = screen.getByRole('button', { name: /nova obavijest/i });
    fireEvent.click(broadcastTab);

    fireEvent.change(screen.getByPlaceholderText(/planirano/i), { target: { value: 'Planirano odrzavanje' } });
    fireEvent.change(screen.getByPlaceholderText(/detalji/i), { target: { value: 'Sistem nece raditi u ponedjeljak.' } });

    fireEvent.click(screen.getByRole('button', { name: /pošalji obavijest/i }));

    await waitFor(() => {
      const postCall = global.fetch.mock.calls.find(([url, opts]) =>
        url === '/api/messages/broadcasts' && opts?.method === 'POST'
      );
      expect(postCall).toBeTruthy();
      const body = JSON.parse(postCall[1].body);
      expect(body.title).toBe('Planirano odrzavanje');
      expect(body.body).toContain('ponedjeljak');
    });
  });

  test('shows empty state when no conversations', async () => {
    global.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve([]) });

    render(<AdminMessagesPage />);

    expect(await screen.findByText(/nema poruka/i)).toBeInTheDocument();
  });
});
