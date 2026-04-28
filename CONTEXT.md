# Projektni kontekst — LabEMS (Lab Equipment Management System)

> Ovaj dokument je namijenjen agentima i developerima koji nastavljaju rad na projektu.
> Sadrži kompletan tehnički i projektni kontekst kako ne bi gubili vrijeme na analizu.

---

## 1. Šta je projekt

**Sistem za upravljanje medicinskom laboratorijskom opremom.**
Korisnici (laboranti) pregledaju opremu i kreiraju zahtjeve za rezervaciju. Administratori upravljaju opremom i odobravaju/odbijaju rezervacije.

Dva tipa korisnika:
- **laborant** — pregledava opremu, rezerviše, prati vlastite rezervacije
- **admin** — dodaje/mijenja/briše opremu, odobrava rezervacije, ima pristup svim podacima

---

## 2. Tehnološki stack

| Sloj | Tehnologija |
|---|---|
| Frontend | React 18 + Vite, react-router-dom v7, lucide-react |
| Backend | Node.js + Express |
| Baza podataka | PostgreSQL (Supabase) |
| Autentifikacija | JWT (jsonwebtoken) + bcrypt |
| Deployment | Vercel (frontend + backend zasebno) |

**Nema UI biblioteke** (Material UI, Tailwind itd.) — koriste se inline stilovi po uzoru na homepage dizajn sistem (`src/theme.js`).

---

## 3. Struktura repozitorija

```
NRS-Grupa3/
├── project/
│   ├── backend/
│   │   └── src/
│   │       ├── app.js                  ← Express app, CORS, route mounting
│   │       ├── server.js               ← HTTP server pokretanje
│   │       ├── config/db.js            ← PostgreSQL pool (pg)
│   │       ├── middleware/
│   │       │   ├── auth.js             ← authenticate(), requireRole()
│   │       │   └── errorHandler.js     ← centralni error handler
│   │       ├── routes/
│   │       │   ├── auth.routes.js
│   │       │   ├── equipment.routes.js
│   │       │   └── reservation.routes.js
│   │       ├── controllers/
│   │       │   ├── auth.controller.js
│   │       │   ├── equipment.controller.js
│   │       │   └── reservation.controller.js
│   │       ├── services/
│   │       │   ├── auth.service.js
│   │       │   ├── equipment.service.js
│   │       │   └── reservation.service.js
│   │       └── repositories/
│   │           ├── user.repository.js
│   │           ├── equipment.repository.js
│   │           └── reservation.repository.js
│   ├── frontend/
│   │   └── src/
│   │       ├── main.jsx                ← ReactDOM entry
│   │       ├── App.jsx                 ← BrowserRouter + sve rute
│   │       ├── theme.js                ← design tokeni (PRIMARY, C, BTN, iconBox, STATUS_*)
│   │       ├── contexts/
│   │       │   └── AuthContext.jsx     ← auth state, login(), logout()
│   │       ├── hooks/
│   │       │   └── useAuth.js          ← useContext(AuthContext) wrapper
│   │       ├── components/
│   │       │   ├── NavBar.jsx          ← fixed top nav, role-aware, active link highlight
│   │       │   └── ProtectedRoute.jsx  ← ProtectedRoute + AdminRoute
│   │       └── pages/
│   │           ├── LoginPage.jsx
│   │           ├── DashboardPage.jsx
│   │           ├── EquipmentListPage.jsx
│   │           ├── EquipmentDetailPage.jsx   ← uključuje formu za rezervaciju (PB3)
│   │           ├── MyReservationsPage.jsx
│   │           └── admin/
│   │               └── ManageEquipmentPage.jsx
│   └── migrations/
│       └── 001_initial_schema.sql
├── Sprint 1/   ← product backlog v1, ERD, vision, team charter
├── Sprint 2/   ← product_backlog_v2.md, user_stories.md, acceptance_criteria.md
├── Sprint 3/   ← domain_model.md, architecture_overview.md, use-case.md
├── Sprint 4/   ← definition_of_done.md, initial_release_plan.md, skeleton doc
└── CONTEXT.md  ← ovaj fajl
```

---

## 4. Design sistem (`src/theme.js`)

Svi stilovi koriste zajedničke tokene iz `theme.js`. **Svaka nova stranica mora importovati iz ovog fajla.**

```js
import { PRIMARY, C, BTN, iconBox, STATUS_EQUIPMENT, STATUS_RESERVATION, GLOBAL_CSS } from '../theme';
```

| Token | Vrijednost | Upotreba |
|---|---|---|
| `PRIMARY` | `#2563EB` | Plava — dugmad, linkovi, ikone, focus border |
| `C.heading` | `#0f172a` | Naslovi |
| `C.body` | `#374151` | Normalan tekst |
| `C.muted` | `#64748b` | Sekundarni tekst, labeli |
| `C.subtle` | `#94a3b8` | Ikone, placeholderi |
| `C.border` | `#e5e7eb` | Borderi kartica i inputa |
| `C.borderFaint` | `#f1f5f9` | Table row separatori |
| `C.bg` | `#fff` | Pozadina kartica |
| `C.bgFaint` | `#f8fafc` | Pozadina stranica |
| `C.iconBg` | `#EFF6FF` | Pozadina icon containerima |
| `FONT` | `'Inter','Segoe UI',sans-serif` | Font porodica |

**Helper funkcije:**
- `iconBox(size=40, radius=10)` — style objekt za plavi icon container
- `BTN.primary / BTN.outline / BTN.danger / BTN.ghost` — gotovi style objekti za dugmad
- `STATUS_EQUIPMENT` — mapa statusa opreme na `{ bg, color, label }`
- `STATUS_RESERVATION` — mapa statusa rezervacija na `{ bg, color, label }`
- `GLOBAL_CSS` — globalni CSS string — injectuje se kao `<style>{GLOBAL_CSS}</style>`

**CSS klase iz GLOBAL_CSS:**
- `.btn-primary:hover`, `.btn-outline:hover`, `.btn-danger:hover`
- `.card-hover:hover` — plavi border + shadow (kartice opreme)
- `.row-hover:hover` — sivi fill (table rows)
- `.app-link` — styled link

---

## 5. Baza podataka

**Lokacija:** Supabase (PostgreSQL).

```sql
CREATE TYPE user_role         AS ENUM ('admin', 'laborant');
CREATE TYPE equipment_status  AS ENUM ('available','reserved','in_use','maintenance','out_of_service');
CREATE TYPE reservation_status AS ENUM ('pending','approved','rejected');

CREATE TABLE users (
  id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, full_name VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'laborant', created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE equipment (
  id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL,
  description TEXT, status equipment_status DEFAULT 'available',
  location VARCHAR(255), created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id),
  equipment_id INT REFERENCES equipment(id),
  start_time TIMESTAMPTZ NOT NULL, end_time TIMESTAMPTZ NOT NULL,
  status reservation_status DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT end_after_start CHECK (end_time > start_time)
);

CREATE INDEX idx_reservations_conflict ON reservations (equipment_id, start_time, end_time)
  WHERE status IN ('pending', 'approved');
```

Tabele za Sprint 6+ (audit_log, notifikacije, repromaterijal) **još ne postoje**.
Novi SQL fajlovi migracija idu u `project/migrations/` s numeričkim prefiksom.

---

## 6. Backend — API endpointi

### Auth
| Metoda | Ruta | Auth | Opis |
|---|---|---|---|
| POST | `/api/auth/register` | javno | Kreira korisnika (uvijek `laborant`) |
| POST | `/api/auth/login` | javno | Vraća `{ token, user: { id, email, role, full_name } }` |

### Oprema
| Metoda | Ruta | Auth | Opis |
|---|---|---|---|
| GET | `/api/equipment` | javno | Lista sve opreme |
| GET | `/api/equipment/:id` | javno | Detalji |
| POST | `/api/equipment` | admin JWT | Dodaj |
| PUT | `/api/equipment/:id` | admin JWT | Ažuriraj (name, description, status, location) |
| DELETE | `/api/equipment/:id` | admin JWT | Obriši |

### Rezervacije
| Metoda | Ruta | Auth | Opis |
|---|---|---|---|
| POST | `/api/reservations` | JWT | Kreiraj (conflict detection ugrađen, 409 na konflikt) |
| GET | `/api/reservations/my` | JWT | Moje rezervacije (JOIN s equipment.name) |

### Nedostaju (Sprint 6)
- `GET /api/reservations` — admin vidi sve
- `PATCH /api/reservations/:id/approve`
- `PATCH /api/reservations/:id/reject`
- `PATCH /api/reservations/:id/cancel`

---

## 7. Backend — arhitektura

Slojevita: **Route → Controller → Service → Repository → DB**

Auth middleware: `authenticate` (JWT decode → `req.user`) + `requireRole('admin')`.
Greške: `err.status` → HTTP kod, `err.message` → `{ error: message }`.

---

## 8. Frontend — routing

| Putanja | Komponenta | Zaštita |
|---|---|---|
| `/` | `HomePage` | javno |
| `/login` | `LoginPage` | javno |
| `/dashboard` | `DashboardPage` | `ProtectedRoute` |
| `/equipment` | `EquipmentListPage` | `ProtectedRoute` |
| `/equipment/:id` | `EquipmentDetailPage` | `ProtectedRoute` |
| `/reservations/my` | `MyReservationsPage` | `ProtectedRoute` |
| `/admin/equipment` | `ManageEquipmentPage` | `AdminRoute` |

`Layout` u App.jsx: NavBar + main s `paddingTop: 60px`, `maxWidth: 1100px`.

---

## 9. Frontend — autentifikacija

`AuthContext.jsx`: state `{ user, token, loading }`, storage u `sessionStorage`.
- `login(email, password)` → POST `/api/auth/login` → sprema u sessionStorage
- `logout()` → briše sessionStorage → navigate `/login`
- Hidrira iz sessionStorage na mount (preživljava refresh)

```js
const { user, token } = useAuth();
headers: { Authorization: `Bearer ${token}` }
```

---

## 10. Frontend — stranice

| Stranica | Opis |
|---|---|
| `LoginPage` | Forma s lab background, Mail/Lock ikone, focus border, error inline |
| `DashboardPage` | Admin: stat (oprema count) + quick links. Laborant: stat (pending/approved) + 3 zadnje rezervacije |
| `EquipmentListPage` | Card grid, icon container, status badge, hover efekt |
| `EquipmentDetailPage` | Header s ikonom, status badge, opis, sidebar meta, inline rezervacija forma (samo laborant + available) |
| `MyReservationsPage` | Tabela, status badge-evi, prazan state s CTA |
| `ManageEquipmentPage` | Add forma (grid layout), tabela s inline edit (Pencil/Check/X/Trash2) |
| `NavBar` | Fixed, scroll shadow, logo, aktivna ruta highlighted, role pill, logout s hover |

---

## 11. Kreiranje korisnika

```bash
# Registracija (uvijek laborant)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@lab.ba","password":"lozinka123","fullName":"Ime Prezime"}'

# Promocija u admina (Supabase SQL)
UPDATE users SET role = 'admin' WHERE email = 'user@lab.ba';
```

**Test korisnici:**
| Email | Lozinka | Uloga |
|---|---|---|
| `admin@lab.ba` | `admin123` | admin |
| `test@lab.ba` | `test123` | laborant |

---

## 12. Environment varijable

**Backend** (`project/backend/.env`):
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_EXPIRES_IN=8h    # default 15m — produži za razvoj
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Frontend nema `.env` — Vite proxy `/api/*` → `http://localhost:3001`.

---

## 13. Pokretanje lokalno

```bash
cd project/backend  && npm install && npm run dev   # port 3001
cd project/frontend && npm install && npm run dev   # port 5173
```

---

## 14. Sprint plan

| Sprint | Status | PB stavke | Fokus |
|---|---|---|---|
| Sprint 4 | ✅ Završen | — | Infrastruktura, skeleton |
| Sprint 5 | ✅ Završen | PB1–PB5, PB23 | Login, oprema, rezervacije, UI |
| Sprint 6 | 📋 Sljedeći | PB6, PB7, PB24, PB26 | Odobravanje rezervacija, RBAC |
| Sprint 7 | 📋 | PB8–PB10, PB13, PB14 | Kalendar, pretraga, filtriranje |
| Sprint 8 | 📋 | PB11, PB12, PB15, PB25 | Notifikacije, audit log |
| Sprint 9 | 📋 | PB21, PB22 | Repromaterijal, pravila |
| Sprint 10 | 📋 | PB16, PB17, PB27 | Izvještaji, dashboard |
| Sprint 11 | 📋 | PB18–PB20 | Specifikacije, export, finalizacija |

---

## 15. Sprint 6 — šta treba uraditi

**PB6 — Odobravanje rezervacija:**
- Backend: `GET /api/reservations` (admin, JOIN s users+equipment), `PATCH /:id/approve`, `PATCH /:id/reject`
- Frontend: `pages/admin/ReservationsPage.jsx`, ruta `/admin/reservations` (AdminRoute), link u NavBar

**PB7 — Status opreme:** `PUT /api/equipment/:id` i ManageEquipmentPage već implementiraju ovo. ✅

**PB24 — RBAC:** Middleware i ProtectedRoute/AdminRoute već postoje. ✅

**PB26 — Conflict detection:** `findConflict` SQL + 409 + UI prikaz već implementirani. ✅

---

## 16. Poznati propusti

- JWT expiry 15min default — produži na `8h` u `.env`
- JWT u sessionStorage — plan: httpOnly cookie Sprint 6+
- Register stranica ne postoji — ručno/curl
- Equipment DELETE ne provjerava aktivne rezervacije
- NavBar nije responsive za mobilni (app dio)

---

## 17. Deployment

| | URL |
|---|---|
| Frontend | https://nrs-grupa3-95bq.vercel.app |
| Backend | https://nrs-grupa3.vercel.app |

---

## 18. Dokumentacijski fajlovi

| Fajl | Sadržaj |
|---|---|
| `Sprint 2/product_backlog_v2.md` | PB1–PB27, prioriteti, raspodjela po sprintovima |
| `Sprint 2/user_stories.md` | US-1–US-27 s opisima i zavisnostima |
| `Sprint 2/acceptance_criteria.md` | Given-when-then kriteriji po sprintovima |
| `Sprint 3/domain_model.md` | Entiteti, atributi, business rules |
| `Sprint 3/architecture_overview.md` | 3-layer arhitektura, API konvencije |
| `Sprint 3/use-case.md` | 25 use-caseva, UC→US mapping |
| `Sprint 4/initial_release_plan.md` | Release plan, inkrementi, DoD |
| `Sprint 4/definition_of_done.md` | Kriteriji završenosti |
