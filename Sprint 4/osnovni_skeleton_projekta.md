# Project Scaffolding
## Sistem za upravljanje medicinskom laboratorijskom opremom

> Stack: **React** · **Node.js / Express** · **PostgreSQL** · **JWT**

---

## Korijenski layout

```
project-root/
├── backend/
├── frontend/
├── .env.example
└── README.md
```

---

## Backend

```
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── database.js          # pg Pool, withTransaction helper
│   │   ├── jwt.js               # JWT secret, expiry konstante
│   │   └── app.js               # Express instanca, globalni middleware, montiranje ruta
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verifikacija → popunjava req.user
│   │   ├── rbac.middleware.js       # requireRole(...roles) fabrika
│   │   ├── validate.middleware.js   # Joi validacija tijela zahtjeva
│   │   ├── audit.middleware.js      # After-hook za audit_log unos
│   │   ├── error.middleware.js      # Centralni error handler
│   │   └── rateLimiter.js           # express-rate-limit za login rutu
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
│   │   ├── auth.service.js              # login, hashPassword, verifyToken
│   │   ├── equipment.service.js         # CRUD, soft delete, status update
│   │   ├── reservations.service.js      # create, approve, reject, cancel, update + konflikt detekcija
│   │   ├── consumables.service.js       # potrošnja, provjera minimalnog praga
│   │   ├── notifications.service.js     # kreiranje i isporuka in-app obavijesti
│   │   ├── maintenance.service.js       # evidencija servisa i kvarova
│   │   ├── reports.service.js           # generisanje izvještaja, export PDF/Excel
│   │   └── audit.service.js             # insert u audit_log
│   │
│   ├── repositories/
│   │   ├── user.repository.js
│   │   ├── equipment.repository.js
│   │   ├── reservation.repository.js    # findConflict, findByIdForUpdate, findAll s filterima
│   │   ├── consumable.repository.js
│   │   ├── notification.repository.js
│   │   ├── maintenance.repository.js
│   │   └── audit.repository.js
│   │
│   ├── validations/
│   │   ├── auth.validation.js
│   │   ├── equipment.validation.js
│   │   └── reservation.validation.js
│   │
│   ├── utils/
│   │   ├── errors.js            # AppError klasa + HTTP kod mapa
│   │   ├── pagination.js        # limit/offset helper
│   │   └── exportHelper.js      # pdfkit + exceljs wrapper
│   │
│   └── server.js                # Entry point – provjera DB konekcije, PORT bind
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
│   ├── 001_admin_user.sql       # Inicijalni admin nalog
│   └── 002_sample_equipment.sql # Testna oprema za razvoj
│
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   │   ├── auth.service.test.js
│   │   │   ├── reservations.service.test.js
│   │   │   └── consumables.service.test.js
│   │   └── utils/
│   │       └── exportHelper.test.js
│   └── integration/
│       ├── auth.test.js
│       ├── reservations.test.js
│       └── rbac.test.js
│
├── .env
├── .env.example
├── package.json
└── jest.config.js
```

---

## Frontend

```
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── api/
│   │   ├── axiosInstance.js         # baseURL, request/response interceptori, token inject, silent refresh
│   │   ├── auth.api.js
│   │   ├── equipment.api.js
│   │   ├── reservations.api.js
│   │   ├── consumables.api.js
│   │   ├── notifications.api.js
│   │   └── reports.api.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx          # user, token (in-memory), login(), logout()
│   │   └── NotificationContext.jsx  # polling neprečitanih notifikacija
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useEquipment.js
│   │   ├── useReservations.js
│   │   └── useDebounce.js           # debounce za live pretragu opreme
│   │
│   ├── routes/
│   │   ├── AppRouter.jsx            # sve rute aplikacije
│   │   ├── PrivateRoute.jsx         # redirect na /login ako nije prijavljen
│   │   └── AdminRoute.jsx           # redirect ako uloga nije admin
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx            # US-24, laborant view
│   │   ├── EquipmentListPage.jsx        # US-1, US-12, US-13
│   │   ├── EquipmentDetailPage.jsx      # US-2
│   │   ├── ReservationFormPage.jsx      # US-3, US-15
│   │   ├── MyReservationsPage.jsx       # US-4, US-14, US-26
│   │   ├── CalendarPage.jsx             # US-11
│   │   ├── admin/
│   │   │   ├── AdminDashboardPage.jsx   # US-24, admin view
│   │   │   ├── ManageEquipmentPage.jsx  # US-5, US-8, US-21, US-25
│   │   │   ├── AllReservationsPage.jsx  # US-17
│   │   │   ├── ApproveReservationsPage.jsx  # US-7
│   │   │   ├── ConsumablesPage.jsx      # US-20
│   │   │   ├── MaintenancePage.jsx      # US-23
│   │   │   ├── NotificationsPage.jsx    # US-16
│   │   │   ├── ReportsPage.jsx          # US-22, US-27
│   │   │   ├── ActivityLogPage.jsx      # US-19
│   │   │   └── CurrentUsagePage.jsx     # US-18
│   │   └── NotFoundPage.jsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx               # navigacija + notifikacija badge
│   │   │   ├── Sidebar.jsx              # admin sidebar
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── ConfirmDialog.jsx        # potvrda otkazivanja/brisanja
│   │   │   └── StatusBadge.jsx          # bojeni badge za statuse opreme/rezervacije
│   │   ├── equipment/
│   │   │   ├── EquipmentCard.jsx        # card za grid prikaz
│   │   │   ├── EquipmentTable.jsx       # tabela za list prikaz
│   │   │   ├── EquipmentForm.jsx        # dodavanje/izmjena opreme
│   │   │   ├── EquipmentSearch.jsx      # input s debounce
│   │   │   └── EquipmentFilters.jsx     # dropdown filteri po kategoriji i tipu
│   │   ├── reservations/
│   │   │   ├── ReservationForm.jsx      # datetime picker + validacija
│   │   │   ├── ReservationList.jsx
│   │   │   ├── ReservationCard.jsx
│   │   │   └── ReservationStatusBadge.jsx
│   │   └── calendar/
│   │       └── OccupancyCalendar.jsx    # react-big-calendar wrapper
│   │
│   ├── utils/
│   │   ├── formatDate.js        # ISO 8601 formatiranje
│   │   ├── roleGuard.js         # helper za uvjetni render po ulozi
│   │   └── constants.js         # STATUS enumi, ROLE konstante
│   │
│   ├── App.jsx
│   └── main.jsx                 # Vite entry point
│
├── .env
├── .env.example
├── vite.config.js
└── package.json
```

---

## Migrations – redoslijed i sadržaj

| Fajl | Sadržaj |
|:-----|:--------|
| `001_create_users.sql` | Tabela `users`, `ENUM user_role` |
| `002_create_equipment.sql` | Tabela `equipment`, `ENUM equipment_status`, `equipment_specs`, `equipment_images`, `usage_rules` |
| `003_create_reservations.sql` | Tabela `reservations`, `ENUM reservation_status`, `equipment_ratings` |
| `004_create_consumables.sql` | Tabela `consumables`, `consumable_usage`, `equipment_consumables` (N:M) |
| `005_create_maintenance.sql` | Tabela `maintenance_records`, `ENUM maintenance_type` |
| `006_create_audit_log.sql` | Tabela `audit_log` (append-only, BIGSERIAL) |
| `007_create_notifications.sql` | Tabela `notifications` |
| `008_create_ratings_rules.sql` | Constraints i UNIQUE ograničenja za ocjene |
| `009_create_indexes.sql` | GIN index za pretragu, index za konflikt detekciju, ostali performansni indeksi |

---

## Mapiranje ruta → fajlovi

| Ruta | Route fajl | Controller | Service |
|:-----|:-----------|:-----------|:--------|
| `/api/auth/*` | `auth.routes.js` | `auth.controller.js` | `auth.service.js` |
| `/api/equipment/*` | `equipment.routes.js` | `equipment.controller.js` | `equipment.service.js` |
| `/api/reservations/*` | `reservations.routes.js` | `reservations.controller.js` | `reservations.service.js` |
| `/api/users/*` | `users.routes.js` | `users.controller.js` | — (direktno repository) |
| `/api/consumables/*` | `consumables.routes.js` | `consumables.controller.js` | `consumables.service.js` |
| `/api/notifications/*` | `notifications.routes.js` | `notifications.controller.js` | `notifications.service.js` |
| `/api/maintenance/*` | `maintenance.routes.js` | `maintenance.controller.js` | `maintenance.service.js` |
| `/api/reports/*` | `reports.routes.js` | `reports.controller.js` | `reports.service.js` |
| `/api/audit-log/*` | `audit.routes.js` | `audit.controller.js` | `audit.service.js` |
| `/api/dashboard` | `dashboard.routes.js` | `dashboard.controller.js` | — (agregira više servisa) |
