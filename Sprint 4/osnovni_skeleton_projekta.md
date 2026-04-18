# Tehnički Skeleton Sistema
## Sistem za upravljanje medicinskom laboratorijskom opremom

> **Verzija:** 1.0  
> **Datum:** April 2026  
> **Projekt:** NRS-Grupa3  
> **Stack:** React · Node.js / Express · PostgreSQL · JWT

---

## Sadržaj

1. [Pregled arhitekture](#1-pregled-arhitekture)
2. [Struktura direktorija](#2-struktura-direktorija)
3. [Šema baze podataka](#3-šema-baze-podataka)
4. [Backend – Skeleton koda](#4-backend--skeleton-koda)
5. [REST API – Kompletna specifikacija ruta](#5-rest-api--kompletna-specifikacija-ruta)
6. [Frontend – Komponentna arhitektura](#6-frontend--komponentna-arhitektura)
7. [Autentifikacija i autorizacija](#7-autentifikacija-i-autorizacija)
8. [Middleware lanac](#8-middleware-lanac)
9. [Ključni algoritmi](#9-ključni-algoritmi)
10. [Konfiguracija okruženja](#10-konfiguracija-okruženja)
11. [Pokretanje i inicijalizacija](#11-pokretanje-i-inicijalizacija)
12. [Mapiranje: User Story → Endpoint → Komponenta](#12-mapiranje-user-story--endpoint--komponenta)

---

## 1. Pregled arhitekture

Sistem implementira **troslojnu klijent-server arhitekturu** sa jasno razdvojenim prezentacijskim slojem, slojem poslovne logike i slojem podataka. Sve komponente komuniciraju kroz definisane interfejse — frontend isključivo kroz REST API, a backend isključivo kroz repozitorij sloj.

```
┌──────────────────────────────────────────────────────┐
│            KLIJENT  (Browser / Tablet)               │
│                                                      │
│  React SPA                                           │
│  ├── React Router v6  (klijentsko rutiranje)         │
│  ├── Axios             (HTTP klijent)                │
│  ├── Context API       (globalno stanje)             │
│  └── react-big-calendar (kalendar zauzeća)           │
└──────────────────────┬───────────────────────────────┘
                       │  HTTPS  +  TLS 1.3
                       │  JSON  (REST API)
                       │  Authorization: Bearer <JWT>
                       ▼
┌──────────────────────────────────────────────────────┐
│            SERVER  (Node.js 20 LTS / Express 4)      │
│                                                      │
│  Middleware lanac:                                   │
│  ─ CORS · Helmet · Rate Limiter                      │
│  ─ Body Parser · Cookie Parser                       │
│  ─ Auth Middleware   (JWT verifikacija)              │
│  ─ RBAC Middleware   (provjera uloge)                │
│  ─ Validation MW     (joi sheme)                     │
│  ─ Audit Logger MW   (append-only log)               │
│                                                      │
│  Slojevi:                                            │
│  Controller → Service → Repository                   │
│                                                      │
│  Servisi:                                            │
│  ├── AuthService      ├── EquipmentService           │
│  ├── ReservationService  ├── ConsumableService       │
│  ├── NotificationService ├── MaintenanceService      │
│  ├── ReportService    └── AuditService               │
└──────────────────────┬───────────────────────────────┘
                       │  TCP/IP  (pg driver)
                       │  Connection pool (max 20)
                       │  Parametrizirani SQL upiti
                       ▼
┌──────────────────────────────────────────────────────┐
│            BAZA PODATAKA  (PostgreSQL 14+)           │
│                                                      │
│  users · equipment · equipment_specs                 │
│  reservations · consumables · consumable_usage       │
│  maintenance_records · notifications                 │
│  equipment_ratings · usage_rules · audit_log         │
│                                                      │
│  Row-level locking (SELECT FOR UPDATE)               │
│  ACID transakcije · Foreign key constraints          │
│  Indeksi za pretragu i filtriranje                   │
└──────────────────────────────────────────────────────┘
```

---

## 2. Struktura direktorija

### 2.1 Korijenski layout projekta

```
project-root/
├── backend/
├── frontend/
├── docker-compose.yml          # opcioni – NFR-17 (Won't Have za MVP)
├── .env.example
└── README.md
```

### 2.2 Backend struktura

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # pg Pool konfiguracija, connection string
│   │   ├── jwt.js               # secret, expiry, refresh config
│   │   └── app.js               # Express instanca, globalni middleware
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js   # verifikacija JWT tokena
│   │   ├── rbac.middleware.js   # provjera uloge (admin / laborant)
│   │   ├── validate.middleware.js  # joi validacija tijela zahtjeva
│   │   ├── audit.middleware.js  # automatski audit log zapis
│   │   └── rateLimiter.js       # express-rate-limit (login ruta)
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── equipment.routes.js
│   │   ├── reservations.routes.js
│   │   ├── users.routes.js
│   │   ├── consumables.routes.js
│   │   ├── notifications.routes.js
│   │   ├── maintenance.routes.js
│   │   ├── reports.routes.js
│   │   ├── audit.routes.js
│   │   └── dashboard.routes.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── equipment.controller.js
│   │   ├── reservations.controller.js
│   │   ├── users.controller.js
│   │   ├── consumables.controller.js
│   │   ├── notifications.controller.js
│   │   ├── maintenance.controller.js
│   │   ├── reports.controller.js
│   │   ├── audit.controller.js
│   │   └── dashboard.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── equipment.service.js
│   │   ├── reservations.service.js    # sadrži konflikt-detekciju
│   │   ├── consumables.service.js
│   │   ├── notifications.service.js
│   │   ├── maintenance.service.js
│   │   ├── reports.service.js
│   │   └── audit.service.js
│   │
│   ├── repositories/
│   │   ├── user.repository.js
│   │   ├── equipment.repository.js
│   │   ├── reservation.repository.js
│   │   ├── consumable.repository.js
│   │   ├── notification.repository.js
│   │   ├── maintenance.repository.js
│   │   └── audit.repository.js
│   │
│   ├── validations/              # joi sheme po resursu
│   │   ├── auth.validation.js
│   │   ├── equipment.validation.js
│   │   └── reservation.validation.js
│   │
│   ├── utils/
│   │   ├── errors.js            # AppError klasa, HTTP kodovi
│   │   ├── pagination.js        # helper za limit/offset
│   │   └── exportHelper.js      # PDF (pdfkit) + Excel (exceljs)
│   │
│   └── server.js                # entry point, PORT bind
│
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_equipment.sql
│   ├── 003_create_reservations.sql
│   ├── 004_create_consumables.sql
│   ├── 005_create_maintenance.sql
│   ├── 006_create_audit_log.sql
│   ├── 007_create_notifications.sql
│   ├── 008_create_ratings_rules.sql
│   └── 009_create_indexes.sql
│
├── seeds/
│   ├── 001_admin_user.sql
│   └── 002_sample_equipment.sql
│
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       ├── auth.test.js
│       ├── reservations.test.js
│       └── rbac.test.js
│
├── .env
├── package.json
└── jest.config.js
```

### 2.3 Frontend struktura

```
frontend/
├── public/
│   └── index.html
│
├── src/
│   ├── api/
│   │   ├── axiosInstance.js     # baseURL, interceptori, token inject
│   │   ├── auth.api.js
│   │   ├── equipment.api.js
│   │   ├── reservations.api.js
│   │   ├── consumables.api.js
│   │   ├── notifications.api.js
│   │   └── reports.api.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx      # user, token, login(), logout()
│   │   └── NotificationContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useEquipment.js
│   │   ├── useReservations.js
│   │   └── useDebounce.js       # za live pretragu
│   │
│   ├── routes/
│   │   ├── AppRouter.jsx        # sve rute, PrivateRoute wrapper
│   │   └── PrivateRoute.jsx     # redirect na /login ako nije prijavljen
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── EquipmentListPage.jsx
│   │   ├── EquipmentDetailPage.jsx
│   │   ├── ReservationFormPage.jsx
│   │   ├── MyReservationsPage.jsx
│   │   ├── CalendarPage.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── ManageEquipmentPage.jsx
│   │   │   ├── AllReservationsPage.jsx
│   │   │   ├── ApproveReservationsPage.jsx
│   │   │   ├── ConsumablesPage.jsx
│   │   │   ├── MaintenancePage.jsx
│   │   │   ├── NotificationsPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   ├── ActivityLogPage.jsx
│   │   │   └── CurrentUsagePage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── equipment/
│   │   │   ├── EquipmentCard.jsx
│   │   │   ├── EquipmentTable.jsx
│   │   │   ├── EquipmentForm.jsx
│   │   │   ├── EquipmentSearch.jsx
│   │   │   └── EquipmentFilters.jsx
│   │   ├── reservations/
│   │   │   ├── ReservationForm.jsx
│   │   │   ├── ReservationList.jsx
│   │   │   ├── ReservationCard.jsx
│   │   │   └── ReservationStatusBadge.jsx
│   │   └── calendar/
│   │       └── OccupancyCalendar.jsx
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── roleGuard.js
│   │   └── constants.js         # STATUS enumi, ROLE konstante
│   │
│   ├── App.jsx
│   └── main.jsx                 # Vite entry point
│
├── .env
├── vite.config.js
└── package.json
```

---

## 3. Šema baze podataka

### 3.1 DDL – Sve tabele

```sql
-- ============================================================
-- MIGRATION 001: Korisnici
-- ============================================================
CREATE TYPE user_role AS ENUM ('admin', 'laborant');

CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    username      VARCHAR(50)  UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,         -- bcrypt, cost 12
    email         VARCHAR(100) UNIQUE NOT NULL,
    first_name    VARCHAR(100) NOT NULL,
    last_name     VARCHAR(100) NOT NULL,
    phone         VARCHAR(20),
    role          user_role    NOT NULL DEFAULT 'laborant',
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MIGRATION 002: Oprema
-- ============================================================
CREATE TYPE equipment_status AS ENUM (
    'dostupna',
    'rezervisana',
    'zauzeta',
    'van_upotrebe',
    'na_odrzavanju'
);

CREATE TABLE equipment (
    id              SERIAL PRIMARY KEY,
    serial_number   VARCHAR(100) UNIQUE NOT NULL,
    name            VARCHAR(200) NOT NULL,
    model           VARCHAR(200),
    manufacturer    VARCHAR(200),
    category        VARCHAR(100),
    type            VARCHAR(100),
    description     TEXT,
    location        VARCHAR(200),
    status          equipment_status NOT NULL DEFAULT 'dostupna',
    purchase_date   DATE,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Tehničke specifikacije i slike (US-25)
CREATE TABLE equipment_specs (
    id              SERIAL PRIMARY KEY,
    equipment_id    INT NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    spec_key        VARCHAR(100) NOT NULL,   -- npr. "Napon napajanja"
    spec_value      VARCHAR(500) NOT NULL,   -- npr. "230V / 50Hz"
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE equipment_images (
    id              SERIAL PRIMARY KEY,
    equipment_id    INT NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    file_path       VARCHAR(500) NOT NULL,
    uploaded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pravila korištenja (US-21)
CREATE TABLE usage_rules (
    id              SERIAL PRIMARY KEY,
    equipment_id    INT REFERENCES equipment(id) ON DELETE CASCADE,
    -- NULL equipment_id = opće pravilo za sve
    rule_text       TEXT NOT NULL,
    created_by      INT NOT NULL REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MIGRATION 003: Rezervacije
-- ============================================================
CREATE TYPE reservation_status AS ENUM (
    'na_cekanju',
    'odobrena',
    'odbijena',
    'otkazana'
);

CREATE TABLE reservations (
    id              SERIAL PRIMARY KEY,
    user_id         INT NOT NULL REFERENCES users(id),
    equipment_id    INT NOT NULL REFERENCES equipment(id),
    start_time      TIMESTAMPTZ NOT NULL,
    end_time        TIMESTAMPTZ NOT NULL,
    status          reservation_status NOT NULL DEFAULT 'na_cekanju',
    note            TEXT,
    rejection_reason TEXT,                  -- popunjava admin pri odbijanju
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Sprječava start_time >= end_time na razini baze
    CONSTRAINT chk_time_order CHECK (start_time < end_time)
);

-- Ocjene opreme (US-26)
CREATE TABLE equipment_ratings (
    id              SERIAL PRIMARY KEY,
    user_id         INT NOT NULL REFERENCES users(id),
    equipment_id    INT NOT NULL REFERENCES equipment(id),
    reservation_id  INT NOT NULL REFERENCES reservations(id),
    rating          SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment         TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Jedan korisnik može ocijeniti svaku rezervaciju samo jednom
    UNIQUE (user_id, reservation_id)
);

-- ============================================================
-- MIGRATION 004: Repromaterijal
-- ============================================================
CREATE TABLE consumables (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(200) NOT NULL,
    unit            VARCHAR(50)  NOT NULL,   -- "komad", "ml", "g"...
    quantity        NUMERIC(10,2) NOT NULL DEFAULT 0,
    min_threshold   NUMERIC(10,2) NOT NULL DEFAULT 0,
    supplier        VARCHAR(200),
    last_restocked  DATE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE consumable_usage (
    id              SERIAL PRIMARY KEY,
    consumable_id   INT NOT NULL REFERENCES consumables(id),
    used_by         INT NOT NULL REFERENCES users(id),
    quantity_used   NUMERIC(10,2) NOT NULL CHECK (quantity_used > 0),
    used_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    note            TEXT
);

-- Veza oprema ↔ repromaterijal (N:M)
CREATE TABLE equipment_consumables (
    equipment_id    INT NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    consumable_id   INT NOT NULL REFERENCES consumables(id) ON DELETE CASCADE,
    typical_usage   NUMERIC(10,2),   -- tipična potrošnja po upotrebi
    PRIMARY KEY (equipment_id, consumable_id)
);

-- ============================================================
-- MIGRATION 005: Evidencija održavanja
-- ============================================================
CREATE TYPE maintenance_type AS ENUM ('hitni', 'planirani', 'kalibracija');

CREATE TABLE maintenance_records (
    id              SERIAL PRIMARY KEY,
    equipment_id    INT NOT NULL REFERENCES equipment(id),
    recorded_by     INT NOT NULL REFERENCES users(id),
    type            maintenance_type NOT NULL DEFAULT 'planirani',
    description     TEXT NOT NULL,
    technician_info VARCHAR(200),
    cost            NUMERIC(10,2),
    maintenance_date DATE NOT NULL,
    next_service_date DATE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MIGRATION 006: Audit log (append-only, bez UPDATE/DELETE)
-- ============================================================
CREATE TABLE audit_log (
    id              BIGSERIAL PRIMARY KEY,
    user_id         INT REFERENCES users(id),     -- NULL = sistemska akcija
    action          VARCHAR(100) NOT NULL,         -- npr. 'RESERVATION_APPROVED'
    entity_type     VARCHAR(100),                 -- npr. 'reservation'
    entity_id       INT,
    old_value       JSONB,
    new_value       JSONB,
    ip_address      INET,
    user_agent      TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MIGRATION 007: Notifikacije
-- ============================================================
CREATE TABLE notifications (
    id              SERIAL PRIMARY KEY,
    user_id         INT NOT NULL REFERENCES users(id),
    sent_by         INT NOT NULL REFERENCES users(id),
    title           VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    reservation_id  INT REFERENCES reservations(id),
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MIGRATION 009: Indeksi za performanse (NFR-04, NFR-08)
-- ============================================================
-- Pretraga opreme po nazivu (US-12)
CREATE INDEX idx_equipment_name        ON equipment USING GIN (to_tsvector('simple', name));
CREATE INDEX idx_equipment_category    ON equipment (category);
CREATE INDEX idx_equipment_status      ON equipment (status);
CREATE INDEX idx_equipment_is_active   ON equipment (is_active);

-- Provjera konflikta termina (US-9) – najkritičniji index
CREATE INDEX idx_reservations_overlap  ON reservations (equipment_id, start_time, end_time)
    WHERE status = 'odobrena';

-- Moje rezervacije (US-4)
CREATE INDEX idx_reservations_user     ON reservations (user_id, created_at DESC);

-- Audit log pretraga
CREATE INDEX idx_audit_user_time       ON audit_log (user_id, created_at DESC);
CREATE INDEX idx_audit_entity          ON audit_log (entity_type, entity_id);

-- Notifikacije za korisnika
CREATE INDEX idx_notifications_user    ON notifications (user_id, is_read, created_at DESC);
```

### 3.2 ER dijagram (tekstualni prikaz)

```
users ──────────────────── reservations ────────────── equipment
  │  1                  N  │                        N  │  1
  │                        │                           │
  │ 1                      │ 1               equipment_specs (N)
  │                        │
  │ N                      │ 1               equipment_images (N)
audit_log              equipment_ratings
                        (1 korisnik,            usage_rules (N)
                         1 rezervacija)
users ─── consumable_usage ─── consumables ──── equipment_consumables ─── equipment
  │ 1    N │                   │ 1          N                              │ 1
  │        │ N                 │
  │        consumables         │ N
  │                      maintenance_records ──── users
notifications ──── users (user_id)
               ──── users (sent_by)
               ──── reservations
```

---

## 4. Backend – Skeleton koda

### 4.1 Konfiguracija baze – `src/config/database.js`

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                    // maks. konekcija u poolu (NFR-19)
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: true }
    : false,
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
  process.exit(-1);
});

/**
 * Izvršava upit unutar transakcije.
 * Garantira atomičnost za operacije nad rezervacijama.
 */
async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { pool, withTransaction };
```

### 4.2 Express aplikacija – `src/config/app.js`

```javascript
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const morgan  = require('morgan');

const authRoutes         = require('../routes/auth.routes');
const equipmentRoutes    = require('../routes/equipment.routes');
const reservationRoutes  = require('../routes/reservations.routes');
const usersRoutes        = require('../routes/users.routes');
const consumableRoutes   = require('../routes/consumables.routes');
const notifRoutes        = require('../routes/notifications.routes');
const maintenanceRoutes  = require('../routes/maintenance.routes');
const reportsRoutes      = require('../routes/reports.routes');
const auditRoutes        = require('../routes/audit.routes');
const dashboardRoutes    = require('../routes/dashboard.routes');
const errorHandler       = require('../middleware/error.middleware');

const app = express();

// ── Sigurnosni headeri (NFR-18) ──────────────────────────────
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc:  ["'self'"],
    styleSrc:   ["'self'", "'unsafe-inline'"],
  }
}));

// ── CORS ─────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
}));

// ── Parsiranje ────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logovanje HTTP zahtjeva ───────────────────────────────────
app.use(morgan('combined'));

// ── Rute ─────────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api/equipment',     equipmentRoutes);
app.use('/api/reservations',  reservationRoutes);
app.use('/api/users',         usersRoutes);
app.use('/api/consumables',   consumableRoutes);
app.use('/api/notifications', notifRoutes);
app.use('/api/maintenance',   maintenanceRoutes);
app.use('/api/reports',       reportsRoutes);
app.use('/api/audit-log',     auditRoutes);
app.use('/api/dashboard',     dashboardRoutes);

// ── Centralni error handler ───────────────────────────────────
app.use(errorHandler);

module.exports = app;
```

### 4.3 Auth Servis – `src/services/auth.service.js`

```javascript
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');
const { AppError } = require('../utils/errors');

const BCRYPT_ROUNDS  = 12;
const ACCESS_EXPIRY  = '15m';   // NFR-02: session timeout 15 min
const REFRESH_EXPIRY = '7d';

class AuthService {

  async login(username, password) {
    const user = await UserRepository.findByUsername(username);
    if (!user || !user.is_active) {
      // Isti error message – ne otkrivamo koji podatak je pogrešan
      throw new AppError('Neispravno korisničko ime ili lozinka.', 401);
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new AppError('Neispravno korisničko ime ili lozinka.', 401);
    }

    const payload = { sub: user.id, role: user.role, username: user.username };

    const accessToken  = jwt.sign(payload, process.env.JWT_SECRET,
                                  { expiresIn: ACCESS_EXPIRY });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,
                                  { expiresIn: REFRESH_EXPIRY });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  }

  async hashPassword(plaintext) {
    return bcrypt.hash(plaintext, BCRYPT_ROUNDS);
  }

  verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  }
}

module.exports = new AuthService();
```

### 4.4 Reservation Servis – `src/services/reservations.service.js`

```javascript
const ReservationRepository = require('../repositories/reservation.repository');
const EquipmentRepository   = require('../repositories/equipment.repository');
const AuditService          = require('./audit.service');
const { withTransaction }   = require('../config/database');
const { AppError }          = require('../utils/errors');

class ReservationService {

  /**
   * Kreira novi zahtjev za rezervaciju (US-3).
   * Provjerava: status opreme, validnost termina, konflikt s odobrenim rezervacijama.
   */
  async create({ userId, equipmentId, startTime, endTime, note }) {
    return withTransaction(async (client) => {
      // 1. Provjera statusa opreme (US-9, Pravilo 2)
      const equipment = await EquipmentRepository.findByIdForUpdate(client, equipmentId);
      if (!equipment) throw new AppError('Oprema ne postoji.', 404);
      if (equipment.status !== 'dostupna') {
        throw new AppError(
          `Oprema nije dostupna za rezervaciju. Trenutni status: ${equipment.status}`,
          409
        );
      }

      // 2. Provjera konflikta termina (US-9, Pravilo 1)
      await this._assertNoConflict(client, equipmentId, startTime, endTime, null);

      // 3. Kreiranje rezervacije
      const reservation = await ReservationRepository.create(client, {
        userId, equipmentId, startTime, endTime, note,
        status: 'na_cekanju',
      });

      // 4. Audit log
      await AuditService.log({
        userId, action: 'RESERVATION_CREATED',
        entityType: 'reservation', entityId: reservation.id,
        newValue: { status: 'na_cekanju', startTime, endTime },
      });

      return reservation;
    });
  }

  /**
   * Administrator odobrava rezervaciju (US-7).
   * PONOVNA provjera konflikta – jer je u međuvremenu mogla biti odobrena druga.
   */
  async approve({ reservationId, adminId }) {
    return withTransaction(async (client) => {
      const reservation = await ReservationRepository.findByIdForUpdate(
        client, reservationId
      );
      if (!reservation) throw new AppError('Rezervacija ne postoji.', 404);
      if (reservation.status !== 'na_cekanju') {
        throw new AppError('Rezervacija nije u statusu "na čekanju".', 409);
      }

      // Ponovna provjera konflikta (race condition zaštita)
      await this._assertNoConflict(
        client,
        reservation.equipment_id,
        reservation.start_time,
        reservation.end_time,
        reservationId,   // isključujemo samu sebe
      );

      const updated = await ReservationRepository.updateStatus(
        client, reservationId, 'odobrena'
      );

      await AuditService.log({
        userId: adminId, action: 'RESERVATION_APPROVED',
        entityType: 'reservation', entityId: reservationId,
        oldValue: { status: 'na_cekanju' },
        newValue: { status: 'odobrena' },
      });

      return updated;
    });
  }

  /**
   * Provjerava preklapanje termina za odobrene rezervacije.
   * Termini A i B se preklapaju ako: A.start < B.end AND A.end > B.start
   *
   * @param {object} client  - pg transakcijski klijent
   * @param {number} equipmentId
   * @param {Date}   startTime
   * @param {Date}   endTime
   * @param {number|null} excludeId  - ID rezervacije koji se isključuje (pri izmjeni)
   */
  async _assertNoConflict(client, equipmentId, startTime, endTime, excludeId) {
    const conflict = await ReservationRepository.findConflict(
      client, { equipmentId, startTime, endTime, excludeId }
    );
    if (conflict) {
      throw new AppError(
        'Odabrani termin se preklapa s postojećom odobrenom rezervacijom.',
        409
      );
    }
  }

  async reject({ reservationId, adminId, reason }) { /* ... */ }
  async cancel({ reservationId, userId }) { /* ... */ }
  async update({ reservationId, userId, startTime, endTime, note }) { /* ... */ }
  async findByUser(userId, pagination) { /* ... */ }
  async findAll(filters, pagination) { /* ... */ }
}

module.exports = new ReservationService();
```

### 4.5 Reservation Repository – ključni SQL

```javascript
// src/repositories/reservation.repository.js

const findConflict = async (client, { equipmentId, startTime, endTime, excludeId }) => {
  const params = [equipmentId, startTime, endTime];
  let excludeClause = '';
  if (excludeId) {
    params.push(excludeId);
    excludeClause = `AND id != $${params.length}`;
  }

  const sql = `
    SELECT id FROM reservations
    WHERE equipment_id = $1
      AND status       = 'odobrena'
      AND start_time   < $3
      AND end_time     > $2
      ${excludeClause}
    LIMIT 1
  `;
  const { rows } = await client.query(sql, params);
  return rows[0] ?? null;
};

// SELECT FOR UPDATE – sprječava race condition pri odobravanju
const findByIdForUpdate = async (client, id) => {
  const { rows } = await client.query(
    'SELECT * FROM reservations WHERE id = $1 FOR UPDATE',
    [id]
  );
  return rows[0] ?? null;
};

// Paginacija – koristi se u getAllReservations
const findAll = async (client, { status, userId, equipmentId, dateFrom, dateTo, limit = 20, offset = 0 }) => {
  const conditions = [];
  const params = [];
  let i = 1;

  if (status)      { conditions.push(`r.status = $${i++}`);       params.push(status); }
  if (userId)      { conditions.push(`r.user_id = $${i++}`);      params.push(userId); }
  if (equipmentId) { conditions.push(`r.equipment_id = $${i++}`); params.push(equipmentId); }
  if (dateFrom)    { conditions.push(`r.start_time >= $${i++}`);  params.push(dateFrom); }
  if (dateTo)      { conditions.push(`r.end_time <= $${i++}`);    params.push(dateTo); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  params.push(limit, offset);

  const sql = `
    SELECT r.*,
           u.first_name, u.last_name, u.email,
           e.name AS equipment_name, e.serial_number
    FROM reservations r
    JOIN users     u ON u.id = r.user_id
    JOIN equipment e ON e.id = r.equipment_id
    ${where}
    ORDER BY r.created_at DESC
    LIMIT $${i++} OFFSET $${i}
  `;
  const { rows } = await client.query(sql, params);
  return rows;
};

module.exports = { findConflict, findByIdForUpdate, findAll, /* ostale metode */ };
```

---

## 5. REST API – Kompletna specifikacija ruta

### Konvencije

| Metoda | Semantika |
|--------|-----------|
| `GET` | Dohvat podataka, bez bočnih efekata |
| `POST` | Kreiranje novog resursa |
| `PUT` | Potpuna zamjena resursa |
| `PATCH` | Parcijalna izmjena resursa |
| `DELETE` | Logičko brisanje (soft delete) |

Svi odgovori su JSON. Uspješni odgovori vraćaju `{ data: ..., meta?: ... }`. Greške vraćaju `{ error: { code, message } }`.

### 5.1 Auth rute

| Metoda | Putanja | Auth | Opis |
|--------|---------|------|------|
| `POST` | `/api/auth/login` | — | Prijava; vraća `accessToken`, `refreshToken`, `user` |
| `POST` | `/api/auth/refresh` | — | Obnova `accessToken` uz `refreshToken` |
| `POST` | `/api/auth/logout` | ✓ | Odjava (invalidacija refresh tokena ako je implementirana blacklista) |

### 5.2 Equipment rute

| Metoda | Putanja | Auth | Uloga | Opis (US) |
|--------|---------|------|-------|-----------|
| `GET` | `/api/equipment` | ✓ | Oboje | Lista aktivne opreme; query params: `search`, `category`, `type`, `status`, `page`, `limit` (US-1, 12, 13) |
| `GET` | `/api/equipment/:id` | ✓ | Oboje | Detalji opreme + specifikacije + pravila + ocjene (US-2) |
| `POST` | `/api/equipment` | ✓ | Admin | Dodavanje opreme (US-5) |
| `PUT` | `/api/equipment/:id` | ✓ | Admin | Potpuna izmjena opreme (US-8, 25) |
| `PATCH` | `/api/equipment/:id/status` | ✓ | Admin | Samo izmjena statusa (US-8) |
| `DELETE` | `/api/equipment/:id` | ✓ | Admin | Soft delete – postavlja `is_active = false` (US-5) |
| `GET` | `/api/equipment/:id/calendar` | ✓ | Oboje | Odobrene rezervacije za kalendar zauzeća (US-11) |
| `POST` | `/api/equipment/:id/specs` | ✓ | Admin | Dodavanje specifikacije (US-25) |
| `POST` | `/api/equipment/:id/images` | ✓ | Admin | Upload slike (US-25) |
| `GET` | `/api/equipment/:id/maintenance` | ✓ | Admin | Historija održavanja (US-23) |
| `POST` | `/api/equipment/:id/maintenance` | ✓ | Admin | Evidencija servisa (US-23) |
| `GET` | `/api/equipment/:id/ratings` | ✓ | Oboje | Ocjene opreme (US-26) |

### 5.3 Reservations rute

| Metoda | Putanja | Auth | Uloga | Opis (US) |
|--------|---------|------|-------|-----------|
| `POST` | `/api/reservations` | ✓ | Laborant | Kreiranje zahtjeva; body: `{ equipmentId, startTime, endTime, note }` (US-3) |
| `GET` | `/api/reservations/my` | ✓ | Laborant | Korisnikove rezervacije (US-4) |
| `GET` | `/api/reservations` | ✓ | Admin | Sve rezervacije; filteri: `status`, `userId`, `equipmentId`, `dateFrom`, `dateTo` (US-17) |
| `GET` | `/api/reservations/current` | ✓ | Admin | Trenutno aktivne rezervacije (US-18) |
| `GET` | `/api/reservations/pending` | ✓ | Admin | Zahtjevi `na_cekanju` (US-7) |
| `PATCH` | `/api/reservations/:id/approve` | ✓ | Admin | Odobravanje (US-7) |
| `PATCH` | `/api/reservations/:id/reject` | ✓ | Admin | Odbijanje; body: `{ reason }` (US-7) |
| `PATCH` | `/api/reservations/:id/cancel` | ✓ | Vlasnik | Otkazivanje (US-14) |
| `PUT` | `/api/reservations/:id` | ✓ | Vlasnik | Izmjena termina (US-15) |
| `POST` | `/api/reservations/:id/rate` | ✓ | Laborant | Ocjena po završetku (US-26) |

### 5.4 Consumables rute

| Metoda | Putanja | Auth | Uloga | Opis (US) |
|--------|---------|------|-------|-----------|
| `GET` | `/api/consumables` | ✓ | Admin | Lista repromaterijala (US-20) |
| `GET` | `/api/consumables/low-stock` | ✓ | Admin | Materijali ispod minimalnog praga (US-20) |
| `POST` | `/api/consumables/usage` | ✓ | Admin | Evidencija potrošnje; automatski update količine (US-20) |

### 5.5 Ostale rute

| Metoda | Putanja | Auth | Uloga | Opis (US) |
|--------|---------|------|-------|-----------|
| `GET` | `/api/notifications` | ✓ | Oboje | Korisnikove notifikacije (US-16) |
| `POST` | `/api/notifications` | ✓ | Admin | Slanje obavijesti (US-16) |
| `PATCH` | `/api/notifications/:id/read` | ✓ | Laborant | Označavanje kao pročitano |
| `GET` | `/api/reports/usage` | ✓ | Admin | Izvještaj o korištenju; query: `from`, `to`, `equipmentId` (US-22) |
| `GET` | `/api/reports/export` | ✓ | Admin | Export u PDF/Excel; query: `format` (US-27) |
| `GET` | `/api/audit-log` | ✓ | Admin | Historija aktivnosti; filteri po akciji, korisniku, datumu (US-19) |
| `GET` | `/api/dashboard` | ✓ | Oboje | Podaci za dashboard (drugačiji za admin vs. laborant) (US-24) |
| `GET` | `/api/users` | ✓ | Admin | Lista korisnika |
| `PATCH` | `/api/users/:id/role` | ✓ | Admin | Izmjena uloge korisnika |

---

## 6. Frontend – Komponentna arhitektura

### 6.1 Routing – `src/routes/AppRouter.jsx`

```jsx
// Shematski prikaz – sve rute aplikacije

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Javne rute */}
      <Route path="/login" element={<LoginPage />} />

      {/* Zaštićene rute – zahtijevaju prijavu */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DashboardPage />} />

        {/* Laborant + Admin */}
        <Route path="/equipment"            element={<EquipmentListPage />} />
        <Route path="/equipment/:id"        element={<EquipmentDetailPage />} />
        <Route path="/equipment/:id/reserve" element={<ReservationFormPage />} />
        <Route path="/equipment/:id/calendar" element={<CalendarPage />} />
        <Route path="/my-reservations"      element={<MyReservationsPage />} />

        {/* Samo Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/equipment"      element={<ManageEquipmentPage />} />
          <Route path="/admin/reservations"   element={<AllReservationsPage />} />
          <Route path="/admin/approve"        element={<ApproveReservationsPage />} />
          <Route path="/admin/consumables"    element={<ConsumablesPage />} />
          <Route path="/admin/maintenance"    element={<MaintenancePage />} />
          <Route path="/admin/notifications"  element={<NotificationsPage />} />
          <Route path="/admin/reports"        element={<ReportsPage />} />
          <Route path="/admin/audit"          element={<ActivityLogPage />} />
          <Route path="/admin/current-usage"  element={<CurrentUsagePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
```

### 6.2 Auth Context – `src/context/AuthContext.jsx`

```jsx
// Token se čuva u memoriji (ne localStorage) – NFR-02
// Refresh token u httpOnly cookie-u

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);    // accessToken u memoriji

  const login = async (username, password) => {
    const { data } = await authApi.login(username, password);
    setUser(data.user);
    setToken(data.accessToken);
    // refreshToken dolazi kao httpOnly cookie – automatski ga čita browser
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setToken(null);
  };

  // Tiho osvježavanje tokena pri inicijalizaciji (ako postoji refresh cookie)
  useEffect(() => {
    authApi.refreshToken()
      .then(({ data }) => { setUser(data.user); setToken(data.accessToken); })
      .catch(() => { /* nije prijavljen */ });
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 6.3 Axios instanca – `src/api/axiosInstance.js`

```javascript
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,   // šalje httpOnly refresh cookie
  headers: { 'Content-Type': 'application/json' },
});

// Automatski dodaje Bearer token na svaki zahtjev
axiosInstance.interceptors.request.use((config) => {
  const token = getTokenFromMemory();   // iz AuthContext
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Automatski refresh pri 401 odgovoru
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const { data } = await axiosInstance.post('/api/auth/refresh');
      setTokenInMemory(data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosInstance(original);
    }
    return Promise.reject(error);
  }
);
```

---

## 7. Autentifikacija i autorizacija

### 7.1 Tok autentifikacije

```
Korisnik unosi username + password
        │
        ▼
POST /api/auth/login
        │
        ▼
auth.controller.js  →  auth.service.login()
        │
        ├─ UserRepository.findByUsername()
        │   └─ SELECT * FROM users WHERE username = $1
        │
        ├─ bcrypt.compare(password, user.password_hash)
        │   └─ Ako ne odgovara → 401 Unauthorized
        │
        ├─ jwt.sign({ sub: id, role, username }, JWT_SECRET, { expiresIn: '15m' })
        │   └─ accessToken (u JSON response tijelu)
        │
        ├─ jwt.sign({ sub: id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })
        │   └─ refreshToken (u httpOnly Cookie – ne dostupan JS-u)
        │
        └─ AuditService.log('LOGIN')
```

### 7.2 RBAC Matrica pristupa

| Ruta / Akcija | Laborant | Admin |
|---|:---:|:---:|
| Pregled opreme (GET /equipment) | ✓ | ✓ |
| Detalji opreme (GET /equipment/:id) | ✓ | ✓ |
| Kreiranje rezervacije | ✓ | ✓ |
| Pregled svojih rezervacija | ✓ | — |
| Otkazivanje vlastite rezervacije | ✓ | — |
| Izmjena vlastite rezervacije | ✓ | — |
| Ocjenjivanje opreme | ✓ | — |
| Dodavanje opreme | — | ✓ |
| Brisanje opreme | — | ✓ |
| Izmjena statusa opreme | — | ✓ |
| Pregled svih rezervacija | — | ✓ |
| Odobravanje / odbijanje | — | ✓ |
| Slanje notifikacija | — | ✓ |
| Evidencija potrošnje | — | ✓ |
| Evidencija održavanja | — | ✓ |
| Pregled audit log-a | — | ✓ |
| Generisanje izvještaja | — | ✓ |
| Export podataka | — | ✓ |
| Izmjena korisničkih uloga | — | ✓ |

### 7.3 RBAC Middleware – `src/middleware/rbac.middleware.js`

```javascript
/**
 * Fabrika: vraća middleware koji zahtijeva jednu od navedenih uloga.
 * Primjer: requireRole('admin')
 *          requireRole('admin', 'laborant')
 */
const requireRole = (...allowedRoles) => (req, res, next) => {
  // auth.middleware mora biti pokrenut prije ovog
  const { role } = req.user;
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({
      error: {
        code: 'FORBIDDEN',
        message: 'Nemate ovlaštenje za pristup ovoj funkciji.',
      },
    });
  }
  next();
};

module.exports = { requireRole };

// ── Primjena u rutama ─────────────────────────────────────────
// equipment.routes.js
router.post('/',            authenticate, requireRole('admin'), validate(equipmentSchema), equipmentController.create);
router.delete('/:id',       authenticate, requireRole('admin'), equipmentController.remove);
router.patch('/:id/status', authenticate, requireRole('admin'), equipmentController.updateStatus);
router.get('/',             authenticate,                        equipmentController.getAll);
```

---

## 8. Middleware lanac

### 8.1 Redoslijed middleware-a za zaštićene rute

```
HTTP Request
    │
    ▼
[1] helmet()                  Sigurnosni HTTP headeri
[2] cors()                    CORS provjera Origin headera
[3] express.json()            Parsiranje JSON tijela
[4] morgan()                  HTTP access log
    │
    ▼  (za svaku zaštićenu rutu)
[5] authenticate              JWT verifikacija, dekodira req.user
[6] requireRole('admin')      RBAC provjera (samo tamo gdje treba)
[7] validate(joiSchema)       Validacija i sanitizacija ulaza
    │
    ▼
[8] Controller               Poziv servisa
[9] Service                  Poslovna logika
[10] Repository              SQL upit
    │
    ▼
[11] auditMiddleware         (after-hook) Bilježi akciju u audit_log
[12] Response                JSON odgovor klijentu
    │
    ▼  (u slučaju greške)
[13] errorHandler            Centralni error handler → JSON error response
```

### 8.2 Auth Middleware – `src/middleware/auth.middleware.js`

```javascript
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errors');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Autentifikacija je obavezna.', 401));
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.sub, role: decoded.role, username: decoded.username };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Sesija je istekla. Prijavite se ponovo.', 401));
    }
    next(new AppError('Nevažeći token.', 401));
  }
};

module.exports = { authenticate };
```

### 8.3 Audit Middleware – `src/middleware/audit.middleware.js`

```javascript
/**
 * After-hook – automatski dodaje audit zapis za svaku uspješnu mutaciju.
 * Preuzima metapodatke iz req.auditContext koji postavljaju servisi.
 */
const auditAfter = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode < 400 && req.auditContext) {
      AuditRepository.insert({
        userId:     req.user?.id,
        action:     req.auditContext.action,
        entityType: req.auditContext.entityType,
        entityId:   req.auditContext.entityId,
        oldValue:   req.auditContext.oldValue,
        newValue:   req.auditContext.newValue,
        ipAddress:  req.ip,
        userAgent:  req.get('User-Agent'),
      }).catch(console.error);   // ne smije blokirati response
    }
    return originalJson(body);
  };
  next();
};
```

### 8.4 Validation Middleware – primjer za rezervaciju

```javascript
// src/validations/reservation.validation.js
const Joi = require('joi');

const createReservationSchema = Joi.object({
  equipmentId: Joi.number().integer().positive().required(),
  startTime:   Joi.date().iso().min('now').required(),
  endTime:     Joi.date().iso().greater(Joi.ref('startTime')).required(),
  note:        Joi.string().max(1000).optional(),
});

// src/middleware/validate.middleware.js
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,     // uklanja neočekivane ključeve (NFR-18)
  });
  if (error) {
    const details = error.details.map(d => d.message);
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: details.join('; ') }
    });
  }
  req.body = value;   // sanitizovani podaci
  next();
};
```

---

## 9. Ključni algoritmi

### 9.1 Algoritam detekcije konflikta rezervacija

Dva termina `A` i `B` su u konfliktu ako i samo ako:

```
A.start_time < B.end_time  AND  A.end_time > B.start_time
```

Vizualizacija:

```
Scenariji konflikta:
  [===A===]          [===A===]          [====A====]
        [===B===]    [===B===]             [=B=]
          ^─ konflikt  ^─ konflikt          ^─ konflikt

Scenariji bez konflikta:
  [===A===]                   [===A===]
              [===B===]  [=B=]
```

SQL implementacija (iz sekcije 4.5):

```sql
SELECT id FROM reservations
WHERE equipment_id = $1
  AND status       = 'odobrena'
  AND start_time   < $3        -- A.start < B.end
  AND end_time     > $2        -- A.end > B.start
LIMIT 1
```

### 9.2 Sprječavanje race conditiona

```
Korisnik A i Korisnik B istovremeno vide slobodan termin 10:00–12:00
                │                │
                ▼                ▼
         BEGIN TRANSACTION  BEGIN TRANSACTION
                │                │
         SELECT * FROM     SELECT * FROM
         reservations      reservations
         FOR UPDATE        FOR UPDATE    ← blokiran, čeka A
                │
         Nema konflikta
                │
         INSERT reservation
                │
         COMMIT ──────────────────► B se odblokirava
                                         │
                                   SELECT * FROM reservations
                                   FOR UPDATE
                                         │
                                   Pronalazi A-nu rezervaciju!
                                         │
                                   ROLLBACK → 409 Conflict
```

### 9.3 Soft delete opreme

```javascript
// Umjesto fizičkog brisanja, oprema se označava kao neaktivna.
// Prethodno se provjerava da nema aktivnih/budućih rezervacija.

async function softDelete(client, equipmentId, adminId) {
  const activeCount = await client.query(
    `SELECT COUNT(*) FROM reservations
     WHERE equipment_id = $1
       AND status IN ('na_cekanju', 'odobrena')
       AND end_time > NOW()`,
    [equipmentId]
  );
  if (parseInt(activeCount.rows[0].count) > 0) {
    throw new AppError(
      'Nije moguće obrisati opremu s aktivnim ili budućim rezervacijama.',
      409
    );
  }
  await client.query(
    'UPDATE equipment SET is_active = FALSE, updated_at = NOW() WHERE id = $1',
    [equipmentId]
  );
}
```

### 9.4 Upozorenje o niskim zalihama

```javascript
// Nakon svakog unosa potrošnje, automatska provjera
async function recordUsage(consumableId, quantityUsed, userId) {
  return withTransaction(async (client) => {
    // 1. Ažuriranje stanja zalihe
    const { rows } = await client.query(
      `UPDATE consumables
       SET quantity    = quantity - $1,
           updated_at  = NOW()
       WHERE id = $2
         AND quantity - $1 >= 0   -- sprječava negativne zalihe
       RETURNING quantity, min_threshold, name`,
      [quantityUsed, consumableId]
    );

    if (rows.length === 0) {
      throw new AppError('Nema dovoljno zalihe za evidentiranu potrošnju.', 409);
    }

    const { quantity, min_threshold, name } = rows[0];

    // 2. Upozorenje ako je palo ispod minimuma
    if (quantity <= min_threshold) {
      await NotificationService.broadcastToAdmins({
        title:   `⚠️ Niske zalihe: ${name}`,
        message: `Trenutna količina: ${quantity}. Minimalni prag: ${min_threshold}.`,
      });
    }

    // 3. Evidencija potrošnje
    await client.query(
      `INSERT INTO consumable_usage (consumable_id, used_by, quantity_used)
       VALUES ($1, $2, $3)`,
      [consumableId, userId, quantityUsed]
    );
  });
}
```

---

## 10. Konfiguracija okruženja

### 10.1 Backend `.env`

```dotenv
# ── Server ──────────────────────────────────────────────────
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# ── Baza podataka ────────────────────────────────────────────
DATABASE_URL=postgresql://labuser:labpass@localhost:5432/labequip_db

# ── JWT ──────────────────────────────────────────────────────
# Generisati jakim generatorom: node -e "require('crypto').randomBytes(64).toString('hex')"
JWT_SECRET=<64-byte-hex-string>
JWT_REFRESH_SECRET=<drugi-64-byte-hex-string>

# ── Fajlovi (slike opreme) ───────────────────────────────────
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=5

# ── Rate limiting ────────────────────────────────────────────
LOGIN_RATE_LIMIT_WINDOW_MS=900000    # 15 minuta
LOGIN_RATE_LIMIT_MAX=10              # maks. 10 pokušaja
```

### 10.2 Frontend `.env`

```dotenv
VITE_API_URL=http://localhost:5000
```

### 10.3 `package.json` – Backend dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "joi": "^17.9.0",
    "helmet": "^7.0.0",
    "cors": "^2.8.5",
    "morgan": "^1.10.0",
    "express-rate-limit": "^6.7.0",
    "pdfkit": "^0.13.0",
    "exceljs": "^4.3.0",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.3.0",
    "nodemon": "^3.0.0"
  },
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "migrate": "psql $DATABASE_URL -f migrations/",
    "test": "jest --coverage",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration"
  }
}
```

### 10.4 `package.json` – Frontend dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.0",
    "axios": "^1.4.0",
    "react-big-calendar": "^1.8.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "vite": "^4.3.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

---

## 11. Pokretanje i inicijalizacija

### 11.1 Inicijalno podešavanje (razvojna okolina)

```bash
# 1. Kreiranje PostgreSQL baze
createdb labequip_db

# 2. Pokretanje migracija (slijede se po redu)
psql labequip_db -f backend/migrations/001_create_users.sql
psql labequip_db -f backend/migrations/002_create_equipment.sql
psql labequip_db -f backend/migrations/003_create_reservations.sql
psql labequip_db -f backend/migrations/004_create_consumables.sql
psql labequip_db -f backend/migrations/005_create_maintenance.sql
psql labequip_db -f backend/migrations/006_create_audit_log.sql
psql labequip_db -f backend/migrations/007_create_notifications.sql
psql labequip_db -f backend/migrations/008_create_ratings_rules.sql
psql labequip_db -f backend/migrations/009_create_indexes.sql

# 3. Seed – inicijalni admin korisnik
psql labequip_db -f backend/seeds/001_admin_user.sql

# 4. Backend
cd backend && npm install && npm run dev

# 5. Frontend (novi terminal)
cd frontend && npm install && npm run dev
```

### 11.2 Seed – inicijalni admin

```sql
-- backend/seeds/001_admin_user.sql
-- Lozinka: Admin@1234 (promijeniti pri deploymentu)
INSERT INTO users (username, password_hash, email, first_name, last_name, role)
VALUES (
  'admin',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NLEiOHUTe',  -- bcrypt hash
  'admin@laboratorija.ba',
  'Sistem',
  'Administrator',
  'admin'
);
```

### 11.3 Server entry point – `src/server.js`

```javascript
require('dotenv').config();
const app  = require('./config/app');
const { pool } = require('./config/database');

const PORT = process.env.PORT || 5000;

// Provjera konekcije s bazom pri startu
pool.query('SELECT 1')
  .then(() => {
    console.log('✓ PostgreSQL konekcija uspješna');
    app.listen(PORT, () => {
      console.log(`✓ Server pokrenut na portu ${PORT}`);
      console.log(`  Okruženje: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error('✗ Greška pri konekciji s bazom:', err.message);
    process.exit(1);
  });
```

---

## 12. Mapiranje: User Story → Endpoint → Komponenta

Kompletna matrica koja pokazuje vezu između funkcionalnih zahtjeva, API endpointa i frontend komponenti.

| User Story | Backlog ID | API Endpoint | Frontend Komponenta | Sprint |
|:-----------|:----------:|:-------------|:--------------------|:------:|
| Pregled opreme | PB1 | `GET /api/equipment` | `EquipmentListPage` → `EquipmentTable` / `EquipmentCard` | 5 |
| Detalji opreme | PB2 | `GET /api/equipment/:id` | `EquipmentDetailPage` | 5 |
| Rezervacija opreme | PB3 | `POST /api/reservations` | `ReservationFormPage` → `ReservationForm` | 5 |
| Moje rezervacije | PB4 | `GET /api/reservations/my` | `MyReservationsPage` → `ReservationList` | 5 |
| Upravljanje opremom | PB5 | `POST/PUT/DELETE /api/equipment` | `ManageEquipmentPage` → `EquipmentForm` | 5 |
| Autentifikacija | PB23 | `POST /api/auth/login` | `LoginPage` + `AuthContext` | 5 |
| Odobravanje rezervacija | PB6 | `PATCH /api/reservations/:id/approve` | `ApproveReservationsPage` | 6 |
| Status opreme | PB7 | `PATCH /api/equipment/:id/status` | `ManageEquipmentPage` → `StatusBadge` | 6 |
| Konflikt rezervacija | PB26 | (server-side logika) | `ReservationForm` (poruka greške) | 6 |
| Autorizacija korisnika | PB24 | (RBAC middleware) | `PrivateRoute` + `AdminRoute` | 6 |
| Kalendar zauzeća | PB8 | `GET /api/equipment/:id/calendar` | `CalendarPage` → `OccupancyCalendar` | 7 |
| Pretraga opreme | PB9 | `GET /api/equipment?search=...` | `EquipmentSearch` (debounce) | 7 |
| Filtriranje opreme | PB10 | `GET /api/equipment?category=...&type=...` | `EquipmentFilters` | 7 |
| Otkazivanje rezervacija | PB13 | `PATCH /api/reservations/:id/cancel` | `MyReservationsPage` → `ConfirmDialog` | 7 |
| Izmjena rezervacije | PB14 | `PUT /api/reservations/:id` | `ReservationFormPage` (edit mode) | 7 |
| Notifikacije | PB11 | `POST /api/notifications` | `NotificationsPage` + `Navbar` badge | 8 |
| Pregled svih rezervacija | PB12 | `GET /api/reservations` | `AllReservationsPage` | 8 |
| Trenutno korištenje | PB15 | `GET /api/reservations/current` | `CurrentUsagePage` | 8 |
| Logovanje aktivnosti | PB25 | `GET /api/audit-log` | `ActivityLogPage` | 8 |
| Potrošnja repromaterijala | PB21 | `POST /api/consumables/usage` | `ConsumablesPage` | 9 |
| Pravila korištenja | PB22 | `POST /api/equipment/:id/rules` | `ManageEquipmentPage` | 9 |
| Izvještaji | PB16 | `GET /api/reports/usage` | `ReportsPage` | 10 |
| Održavanje opreme | PB17 | `POST /api/equipment/:id/maintenance` | `MaintenancePage` | 10 |
| Dashboard pregled | PB27 | `GET /api/dashboard` | `DashboardPage` / `AdminDashboardPage` | 10 |
| Specifikacije opreme | PB18 | `POST /api/equipment/:id/specs` | `ManageEquipmentPage` | 11 |
| Ocjenjivanje opreme | PB19 | `POST /api/reservations/:id/rate` | `MyReservationsPage` | 11 |
| Export podataka | PB20 | `GET /api/reports/export?format=pdf` | `ReportsPage` → download trigger | 11 |

---

## Napomena o NFR pokrivanju

| NFR | Implementaciona tačka u skeleton-u |
|:----|:-----------------------------------|
| NFR-01 (AES-256, TLS 1.3) | TLS na nivou reverse proxy-a (Nginx); `pg` SSL konekcija |
| NFR-02 (session timeout 15 min) | `expiresIn: '15m'` u JWT; token u memoriji, ne `localStorage` |
| NFR-05 (Audit Log) | `audit.middleware.js` + `audit_log` tabela (append-only) |
| NFR-09 (RBAC) | `rbac.middleware.js` + RBAC matrica pristupa |
| NFR-12 (80% test coverage) | `jest.config.js` + `--coverage` flag; ciljani servisni sloj |
| NFR-13 (Sljedivost) | `audit_log.old_value` / `new_value` JSONB kolone |
| NFR-18 (SQL Injection, XSS) | Parametrizirani SQL upiti; `joi` validacija; `helmet` headeri |
| NFR-04 (Pretraga <1.5s) | GIN indeks na `equipment.name`; `idx_reservations_overlap` |
| NFR-06 (RTO <2h) | `pg_dump` backup skripta (dnevno) |
| NFR-19 (200 korisnika) | Connection pool `max: 20`; stateless JWT (horizontalno skaliranje) |

---

*Dokument je živ – ažurira se paralelno s razvojem sprintova 5–12.*
