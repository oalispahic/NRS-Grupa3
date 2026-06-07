const express = require('express');
const request = require('supertest');

// Mock auth middleware
const mockAuthenticate = jest.fn((req, res, next) => {
  req.user = req.__authUser || { id: 1, role: 'laborant', full_name: 'Test User' };
  next();
});
const mockRequireRole = jest.fn((...roles) => (req, res, next) => next());

jest.mock('../src/middleware/auth', () => ({
  authenticate: (...args) => mockAuthenticate(...args),
  requireRole: (...roles) => mockRequireRole(...roles),
}));

const mockQuery = jest.fn();
jest.mock('../src/config/db', () => ({
  query: (...args) => mockQuery(...args),
}));

const messagesRoutes = require('../src/routes/messages.routes');

function createApp(authUser) {
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    req.__authUser = authUser || { id: 1, role: 'laborant', full_name: 'Test User' };
    next();
  });
  app.use('/api/messages', messagesRoutes);
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
  });
  return app;
}

describe('messages routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/messages/inbox', () => {
    test('returns messages for authenticated user', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 1, sender_id: 1, body: 'Hello', equipment_id: null, created_at: new Date().toISOString(), read_at: null, sender_name: 'Test', sender_role: 'laborant', equipment_name: null }] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(createApp()).get('/api/messages/inbox');

      expect(res.status).toBe(200);
      expect(res.body.messages).toHaveLength(1);
      expect(res.body.messages[0].body).toBe('Hello');
    });
  });

  describe('GET /api/messages/unread-count', () => {
    test('returns combined count (messages + broadcasts) for user', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ count: 3 }] })
        .mockResolvedValueOnce({ rows: [{ count: 2 }] });

      const res = await request(createApp()).get('/api/messages/unread-count');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(5);
    });

    test('returns admin unread count (direct messages)', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ count: 7 }] });

      const res = await request(createApp({ id: 2, role: 'admin', full_name: 'Admin' })).get('/api/messages/unread-count');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(7);
    });
  });

  describe('POST /api/messages', () => {
    test('rejects empty body with 400', async () => {
      const res = await request(createApp()).post('/api/messages').send({ body: '' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('prazna');
    });

    test('user sends message and notifies all admins', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 1, body: 'Pitanje' }] })
        .mockResolvedValueOnce({ rows: [{ id: 3 }, { id: 4 }] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(createApp()).post('/api/messages').send({ body: 'Pitanje', equipment_id: 5 });

      expect(res.status).toBe(201);
      expect(res.body.id).toBe(1);
    });

    test('admin reply with recipient sends notification', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 2, body: 'Odgovor' }] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(createApp({ id: 2, role: 'admin', full_name: 'Admin' }))
        .post('/api/messages')
        .send({ body: 'Odgovor', recipient_user_id: 1 });

      expect(res.status).toBe(201);
    });
  });

  describe('GET /api/messages/conversations', () => {
    test('returns conversation list for admin', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ id: 1, full_name: 'User A', email: 'a@t.com', role: 'laborant', last_message: 'Zdravo', last_at: new Date().toISOString(), unread_count: 1 }],
      });

      const res = await request(createApp({ id: 2, role: 'admin', full_name: 'Admin' })).get('/api/messages/conversations');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /api/messages/conversation/:userId', () => {
    test('returns messages and marks them as read', async () => {
      mockQuery
        .mockResolvedValueOnce({
          rows: [{ id: 1, sender_id: 1, recipient_user_id: null, body: 'Zdravo', equipment_id: null, equipment_name: null, created_at: new Date().toISOString(), read_at: null, sender_name: 'User', sender_role: 'laborant' }],
        })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(createApp({ id: 2, role: 'admin', full_name: 'Admin' })).get('/api/messages/conversation/1');

      expect(res.status).toBe(200);
      expect(res.body.messages).toHaveLength(1);
    });
  });

  describe('Broadcasts', () => {
    test('GET /api/messages/broadcasts returns broadcast list', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ id: 1, title: 'Odrzavanje', body: 'U ponedjeljak', created_at: new Date().toISOString(), sender_name: 'Admin', is_read: false }],
      });

      const res = await request(createApp()).get('/api/messages/broadcasts');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });

    test('POST /api/messages/broadcasts rejects missing title', async () => {
      const res = await request(createApp({ id: 2, role: 'admin', full_name: 'Admin' }))
        .post('/api/messages/broadcasts')
        .send({ body: 'Tekst' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Naslov');
    });

    test('POST /api/messages/broadcasts creates broadcast', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: 1, title: 'Obavijest', body: 'Detalji' }] });

      const res = await request(createApp({ id: 2, role: 'admin', full_name: 'Admin' }))
        .post('/api/messages/broadcasts')
        .send({ title: 'Obavijest', body: 'Detalji' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Obavijest');
    });

    test('POST /api/messages/broadcasts/:id/read marks as read', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(createApp()).post('/api/messages/broadcasts/1/read');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
    });
  });
});
