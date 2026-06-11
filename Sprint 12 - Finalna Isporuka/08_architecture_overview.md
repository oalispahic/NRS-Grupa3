# Architecture / Technical Overview — LabManager

**Projekat:** LabManager  
**Verzija:** 1.0.0 (Sprint 12)

---

## 1. Pregled arhitekture

LabManager je **three-tier web aplikacija**:

```
┌─────────────────────────────────────────────────────┐
│              Browser (React SPA)                    │
│   React 18 + Vite + React Router + Axios + Recharts │
│           https://nrs.marexdev.com                  │
└───────────────────┬─────────────────────────────────┘
                    │ HTTPS REST API (JSON)
                    │ /api/* rewrites
┌───────────────────▼─────────────────────────────────┐
│           Express.js API (Node.js 18)               │
│    Controller → Service → Repository pattern        │
│         https://api.nrs.marexdev.com                │
└───────────────────┬─────────────────────────────────┘
                    │ SQL (pg connection pool)
                    │ TLS encrypted
┌───────────────────▼─────────────────────────────────┐
│         PostgreSQL 15 (Supabase Cloud)              │
│    aws-0-eu-west-1.pooler.supabase.com              │
└─────────────────────────────────────────────────────┘
```

---

## 2. Frontend

### Tehnologije
- **React 18** — komponentna SPA arhitektura
- **Vite 5** — build tool i dev server
- **React Router DOM 6** — client-side routing
- **Axios** — HTTP klijent za API pozive
- **Recharts 3.8** — grafikoni (bar, line, pie/donut)
- **react-qr-code** — generisanje QR kodova
- **lucide-react** — icon library

### Struktura (`project/frontend/src/`)
```
src/
├── main.jsx           # Entry point, ReactDOM.createRoot
├── App.jsx            # Router, rute, layout wrappers
├── context/
│   └── AuthContext.jsx  # JWT token + user state (React Context)
├── hooks/
│   └── useAuth.js       # wrapper hook za AuthContext
├── components/
│   ├── AdminLayout.jsx  # Sidebar navigacija za admin/test
│   ├── ProtectedRoute.jsx  # Route guard (laborant i admin)
│   ├── ReservationCalendar.jsx  # Vizualni kalendar
│   ├── EquipmentMosaic.jsx  # Status mozaik kvadratići
│   └── ReservationTimeline.jsx  # 7-dnevni timeline
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── EquipmentListPage.jsx
│   ├── EquipmentDetailPage.jsx
│   ├── MyReservationsPage.jsx
│   ├── ReservationsPage.jsx   # Admin: sve rezervacije
│   ├── ManageEquipmentPage.jsx  # Admin CRUD
│   ├── UsersAdminPage.jsx
│   ├── LocationsPage.jsx
│   ├── ConsumablesPage.jsx
│   ├── SettingsPage.jsx
│   ├── StatisticsPage.jsx
│   ├── ReportsPage.jsx
│   ├── MaintenancePage.jsx
│   ├── MyTasksPage.jsx
│   ├── ActivityLogPage.jsx
│   ├── CurrentUsagePage.jsx
│   ├── MyActivityPage.jsx
│   ├── ProfilePage.jsx
│   ├── MessagesPage.jsx      # User chat
│   └── AdminMessagesPage.jsx # Admin inbox + broadcast
└── theme.js           # Centralni design tokeni (boje, CSS klase)
```

### Autentifikacijski flow (frontend)
```
Login forma → POST /api/auth/login → 
JWT token → sessionStorage.setItem('token') →
AuthContext.jsx ažurira state → React Router redirect →
ProtectedRoute provjerava auth za svaku zaštićenu rutu
```

### Komunikacija s backendom
```javascript
// Sve API pozive šalje Axios s JWT tokenom
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// ili per-request:
axios.get('/api/equipment', { headers: { Authorization: `Bearer ${token}` } })
```

---

## 3. Backend

### Tehnologije
- **Node.js 18+** runtime
- **Express.js 4.19** — HTTP framework
- **jsonwebtoken 9** — JWT issue i verify
- **bcrypt 5** — hash lozinki (bcrypt, 10 rounds)
- **pg 8.12** — PostgreSQL klijent (connection pooling)
- **dotenv** — environment varijable

### Arhitekturni obrazac: Controller → Service → Repository

```
HTTP Request
    ↓
Router (routes/*.routes.js)
    ↓
Auth Middleware (middleware/auth.middleware.js)
    ↓
Controller (controllers/*.controller.js)
    ↓
Service (services/*.service.js)
    ↓
Repository (repositories/*.repository.js)
    ↓
PostgreSQL (via pg Pool)
```

### Struktura (`project/backend/src/`)
```
src/
├── app.js              # Express app, middleware setup, route mounting
├── server.js           # HTTP server, listen
├── config/
│   └── db.js           # pg Pool konfiguracija (max: 1 za Supabase free)
├── middleware/
│   └── auth.middleware.js  # authenticate() + requireRole()
├── routes/
│   ├── auth.routes.js
│   ├── equipment.routes.js
│   ├── reservation.routes.js
│   ├── user.routes.js
│   ├── location.routes.js
│   ├── consumable.routes.js
│   ├── settings.routes.js
│   ├── statistics.routes.js
│   ├── export.routes.js
│   ├── notification.routes.js
│   ├── activity.routes.js
│   ├── tag.routes.js
│   ├── waitlist.routes.js
│   ├── maintenance.routes.js
│   ├── messages.routes.js
│   └── report.routes.js
├── controllers/        # HTTP handler, req/res, poziva service
├── services/           # Poslovna logika, validacija
└── repositories/       # SQL upiti, baza interakcija
```

### Ključni API endpointi

| Method | Endpoint | Opis | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Registracija | Javno |
| POST | `/api/auth/login` | Login → JWT | Javno |
| GET | `/api/health` | Health check | Javno |
| GET | `/api/equipment` | Lista opreme | Authenticated |
| GET | `/api/equipment/:id` | Detalji aparata | Authenticated |
| PUT | `/api/equipment/:id` | Izmjena aparata | Admin |
| POST | `/api/reservations` | Kreiranje rezervacije | Authenticated |
| PATCH | `/api/reservations/:id/approve` | Odobravanje | Admin |
| PATCH | `/api/reservations/:id/reject` | Odbijanje | Admin |
| PATCH | `/api/reservations/:id/cancel` | Otkazivanje | Owner |
| GET | `/api/users` | Lista korisnika | Admin |
| GET | `/api/statistics` | Agregatni podaci | Admin |
| POST | `/api/equipment/:id/waitlist` | Waitlist | Authenticated |
| GET | `/api/messages/inbox` | Inbox poruka | Authenticated |
| POST | `/api/messages/send` | Slanje poruke | Authenticated |
| GET | `/api/broadcasts` | Broadcast obavijesti | Authenticated |

---

## 4. Baza podataka

### PostgreSQL shema (21 migracija)

```sql
-- Ključne tabele:
users           -- id, username, password_hash, role, is_active, bio, ...
equipment       -- id, name, model, manufacturer, status, location_id, safety_notes
equipment_tags  -- equipment_id, tag_id (N:M junction)
tags            -- id, name, color
reservations    -- id, equipment_id, user_id, start_date, end_date, status, rejection_reason
notifications   -- id, user_id, message, is_read, created_at
activity_logs   -- id, user_id, action, entity_type, entity_id, timestamp (append-only)
locations       -- id, name, description
consumables     -- id, name, unit, quantity, min_threshold
consumable_logs -- id, consumable_id, user_id, change, note, created_at
system_settings -- key, value (3 rows: max_days, max_ahead, max_concurrent)
equipment_ratings -- id, equipment_id, user_id, rating, reservation_id
user_profile    -- (kolone u users tabeli: bio, institution, department, phone, degree)
waitlist        -- id, equipment_id, user_id, created_at
maintenance_tasks -- id, equipment_id, assigned_to, title, priority, status
messages        -- id, sender_id, recipient_user_id, body, equipment_id, is_read
broadcasts      -- id, admin_id, title, body, created_at
broadcast_reads -- user_id, broadcast_id (composite PK, ON CONFLICT DO NOTHING)
```

### Ključni poslovni invarianti u bazi
- Konflikt rezervacija: query provjerava preklapanje intervala prije INSERT
- Ocjenjivanje: `UNIQUE(equipment_id, user_id)` sprječava duplikate
- Broadcast čitanje: composite PK s `ON CONFLICT DO NOTHING` sprječava race condition
- Activity log: nema UPDATE/DELETE — samo INSERT (append-only)

---

## 5. Komunikacija između komponenti

```
Browser → vercel.json rewrite → /api/* → Express backend
Browser → vercel.json rewrite → /(.*) → React index.html (SPA)

Express backend → pg.Pool.query() → Supabase PostgreSQL
Express backend → res.json() → Browser (JSON response)

NotificationBell → polling GET /api/notifications → Express → DB
MessagesPage → polling GET /api/messages/inbox → Express → DB
```

---

## 6. Najvažnije sigurnosne odluke

| Odluka | Implementacija |
|---|---|
| **Autentifikacija** | JWT s HS256 algoritmom; token expiry 8h; verificiran na svakom zaštićenom endpointu |
| **Lozinke** | bcrypt s cost factor 10; plaintext lozinka nikad ne dospijeva u bazu |
| **RBAC** | `requireRole('admin')` middleware na svim admin endpointima; klijentski UI je samo vizualni filter |
| **Konflikt rezervacija** | Validacija isključivo na serveru — klijent se ne može zaobići |
| **SQL injection zaštita** | Parametrizirani upiti (`pool.query('SELECT ... WHERE id = $1', [id])`) svuda |
| **CORS** | `cors` middleware konfiguriran za specifičan `FRONTEND_URL` |
| **Audit trail** | Activity log je append-only; nema endpoint za brisanje logova |
| **Deaktivacija korisnika** | `is_active = false` provjera pri svakom loginu (auth.service.js) |
| **Poznat sigurnosni propust** | JWT u `sessionStorage` umjesto `httpOnly cookie` — ranjivo na XSS |

---

## 7. Gdje se nalazi ključni kod

| Funkcionalnost | Lokacija |
|---|---|
| Konflikt provjera rezervacija | `project/backend/src/services/reservation.service.js` |
| JWT autentifikacija | `project/backend/src/middleware/auth.middleware.js` |
| Vizualni kalendar | `project/frontend/src/components/ReservationCalendar.jsx` |
| Auth context (frontend) | `project/frontend/src/context/AuthContext.jsx` |
| Design tokeni | `project/frontend/src/theme.js` |
| DB pool konfiguracija | `project/backend/src/config/db.js` |
| Sve SQL migracije | `project/migrations/001_*.sql` do `021_*.sql` |
| Broadcast (race-safe) | `project/backend/src/routes/messages.routes.js` |
