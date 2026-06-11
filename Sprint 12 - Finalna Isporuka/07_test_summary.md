# Test Summary / QA Izvještaj — LabManager

**Datum:** Juni 2026 (Sprint 12)  
**Verzija:** 1.0.0

---

## 1. Vrste testova

### Automatizovani testovi (Jest + Supertest)

Lokacija: `project/backend/tests/`

13 test fajlova koji pokrivaju backend servisni i middleware sloj:

| Test fajl | Što testira |
|---|---|
| `auth.service.test.js` | Registracija, login, JWT generisanje, bcrypt validacija |
| `auth.middleware.test.js` | Provjera JWT tokena, uloga (requireRole), zaštita ruta |
| `equipment.service.test.js` | CRUD opreme, validacija statusa, COALESCE update |
| `reservation.service.test.js` | Kreiranje rezervacije, konflikt detekcija, otkazivanje, izmjena |
| `user.service.test.js` | Profil korisnika, izmjena podataka, promjena lozinke |
| `location.service.test.js` | CRUD lokacija, FK provjera pri brisanju |
| `notification.service.test.js` | Kreiranje notifikacija, mark-as-read |
| `activity.service.test.js` | Log unosa, paginacija, korisnik-filtriranje |
| `rating.service.test.js` | Validacija ocjene (završena rezervacija, bez duplikata) |
| `tag.service.test.js` | Kreiranje tagova, dodjela opremi, json_agg agregacija |
| `waitlist.controller.test.js` | Dodavanje/brisanje s waitliste, pozicija u redu |
| `maintenance.controller.test.js` | Kreiranje taskova, dodjela, status workflow |
| `messages.routes.test.js` | Inbox, unread count, slanje poruka, RBAC provjere |

### Pokretanje automatizovanih testova

```bash
cd project/backend

# Svi testovi
npm test

# S coverage izvještajem
npm run test:coverage

# Jedan fajl
npx jest tests/reservation.service.test.js --verbose
```

**Napomena:** Testovi koriste mock `pg` connection — ne zahtijevaju aktivnu bazu.

---

## 2. Rezultati automatizovanih testova

Testovi su pisani za ključne servise i middleware.

**Pokretanje testova (lokalno, 11. Juni 2026):**

```bash
cd project/backend
npm install
npx jest --verbose
```

**Stvarni output testova:**

```
PASS tests/rating.service.test.js
  rating.service
    ✓ addRating rejects invalid rating (3 ms)
    ✓ addRating rejects missing reservation
    ✓ addRating rejects non-approved reservation
    ✓ addRating rejects before reservation ends (3 ms)
    ✓ addRating rejects duplicate rating
    ✓ addRating creates rating and logs activity (1 ms)
    ✓ getEquipmentRatings returns list and summary

PASS tests/user.service.test.js
  user.service
    ✓ getProfile rejects missing user (2 ms)
    ✓ getProfile returns user
    ✓ updateProfile rejects when no data provided
    ✓ updateProfile rejects password change without current password
    ✓ updateProfile rejects invalid current password
    ✓ updateProfile updates info fields (1 ms)
    ✓ updateProfile updates password when current password is valid

PASS tests/notification.service.test.js
  notification.service
    ✓ notifyReservationApproved creates notification
    ✓ notifyReservationRejected creates notification
    ✓ getUserNotifications returns notifications and unread count (1 ms)
    ✓ markRead delegates to repository
    ✓ markAllRead delegates to repository

PASS tests/maintenance.controller.test.js
  maintenance.controller
    ✓ create rejects missing fields (2 ms)
    ✓ create sends notification when assigned (1 ms)
    ✓ updateStatus rejects invalid status
    ✓ updateStatus forbids non-assignee
    ✓ updateStatus updates task for assignee (1 ms)

PASS tests/equipment.service.test.js
  equipment.service
    ✓ listAll returns equipment (2 ms)
    ✓ getById throws when not found (1 ms)
    ✓ create rejects missing name
    ✓ create rejects missing serial number
    ✓ create rejects missing model
    ✓ create rejects invalid status
    ✓ create rejects invalid date format (1 ms)
    ✓ create normalizes input and calls repository
    ✓ create maps unique constraint error
    ✓ update rejects invalid status
    ✓ update rejects empty serial number when provided
    ✓ update throws when equipment not found (1 ms)
    ✓ update returns updated equipment
    ✓ remove throws when equipment not found
    ✓ remove resolves when equipment deleted
    ✓ update notifies waitlist when equipment becomes available (1 ms)

PASS tests/location.service.test.js
  location.service
    ✓ create rejects missing name (1 ms)
    ✓ create trims input
    ✓ update rejects missing location
    ✓ remove rejects missing location (1 ms)

PASS tests/tag.service.test.js
  tag.service
    ✓ createTag rejects empty name (1 ms)
    ✓ createTag trims name
    ✓ deleteTag rejects missing tag
    ✓ getEquipmentTags returns tags
    ✓ setEquipmentTags replaces tag assignments (1 ms)

PASS tests/waitlist.controller.test.js
  waitlist.controller
    ✓ addToWaitlist rejects duplicate entry (1 ms)
    ✓ addToWaitlist creates entry (2 ms)
    ✓ getWaitlist returns full list for admin
    ✓ getWaitlist returns position for user
    ✓ removeFromWaitlist returns 204 (1 ms)

PASS tests/reservation.service.test.js
  reservation.service
    ✓ createReservation rejects missing fields (6 ms)
    ✓ createReservation rejects end before start
    ✓ createReservation rejects when equipment not found (1 ms)
    ✓ createReservation rejects on conflict
    ✓ createReservation rejects when duration exceeds max days
    ✓ createReservation rejects when booking too far in advance (1 ms)
    ✓ createReservation rejects when max active reservations reached (1 ms)
    ✓ createReservation creates reservation when valid (1 ms)
    ✓ createReservation allows waitlist when conflicts exist
    ✓ getMyReservations returns user reservations
    ✓ getAllReservations passes status to repository
    ✓ approveReservation rejects missing reservation
    ✓ approveReservation updates status (1 ms)
    ✓ rejectReservation rejects missing reservation
    ✓ rejectReservation updates status (1 ms)
    ✓ cancelReservation rejects missing reservation (2 ms)
    ✓ cancelReservation rejects already canceled reservation
    ✓ cancelReservation updates status and equipment when no active reservations remain
    ✓ updateReservationDates rejects missing dates
    ✓ updateReservationDates rejects end before start
    ✓ updateReservationDates rejects missing reservation (1 ms)
    ✓ updateReservationDates rejects canceled reservation
    ✓ updateReservationDates rejects on conflict
    ✓ updateReservationDates updates reservation dates
    ✓ returnReservation rejects missing active reservation
    ✓ returnReservation updates equipment when no active reservations remain
    ✓ getCurrentlyActive returns active reservations (1 ms)

PASS tests/activity.service.test.js
  activity.service
    ✓ log passes data to repository (1 ms)
    ✓ getAll returns logs and total

PASS tests/auth.middleware.test.js
  auth middleware
    ✓ authenticate rejects missing token
    ✓ authenticate rejects invalid token (3 ms)
    ✓ authenticate sets req.user on valid token
    ✓ requireRole blocks when role does not match
    ✓ requireRole allows when role matches

PASS tests/auth.service.test.js
  auth.service
    ✓ register rejects missing fields (2 ms)
    ✓ register rejects duplicate username
    ✓ register hashes password and creates user (5 ms)
    ✓ login rejects missing fields (1 ms)
    ✓ login rejects unknown user
    ✓ login rejects invalid password
    ✓ login returns token and user on success

PASS tests/messages.routes.test.js
  messages routes
    GET /api/messages/inbox
      ✓ returns messages for authenticated user (11 ms)
    GET /api/messages/unread-count
      ✓ returns combined count (messages + broadcasts) for user (1 ms)
      ✓ returns admin unread count (direct messages) (2 ms)
    POST /api/messages
      ✓ rejects empty body with 400 (6 ms)
      ✓ user sends message and notifies all admins (1 ms)
      ✓ admin reply with recipient sends notification (1 ms)
    GET /api/messages/conversations
      ✓ returns conversation list for admin (1 ms)
    GET /api/messages/conversation/:userId
      ✓ returns messages and marks them as read (1 ms)
    Broadcasts
      ✓ GET /api/messages/broadcasts returns broadcast list (1 ms)
      ✓ POST /api/messages/broadcasts rejects missing title (1 ms)
      ✓ POST /api/messages/broadcasts creates broadcast (1 ms)
      ✓ POST /api/messages/broadcasts/:id/read marks as read (1 ms)

Test Suites: 13 passed, 13 total
Tests:       107 passed, 107 total
Snapshots:   0 total
Time:        1.207 s
```

> **Napomena:** Warning `A worker process has failed to exit gracefully` je zbog otvorenog mock timera u `messages.routes.test.js` koji ne utiče na ispravnost testova — svi testovi prolaze.

**Ključni testirani scenariji:**

| Kategorija | Test | Rezultat |
|---|---|---|
| Login s ispravnim kredencijalima | `login returns token and user on success` | ✅ Pass |
| Login s neispravnom lozinkom | `login rejects invalid password` | ✅ Pass |
| Login s nepostojećim korisnikom | `login rejects unknown user` | ✅ Pass |
| Registracija s duplikatom | `register rejects duplicate username` | ✅ Pass |
| Kreiranje rezervacije (slobodan termin) | `createReservation creates reservation when valid` | ✅ Pass |
| Kreiranje rezervacije (konflikt) | `createReservation rejects on conflict` | ✅ Pass |
| Rezervacija prekida globalna ograničenja | `rejects when duration exceeds max days` | ✅ Pass |
| Zaštićena ruta bez tokena | `authenticate rejects missing token` | ✅ Pass |
| Admin ruta s pogrešnom ulogom | `requireRole blocks when role does not match` | ✅ Pass |
| Ocjena bez završene rezervacije | `addRating rejects non-approved reservation` | ✅ Pass |
| Dupla ocjena | `addRating rejects duplicate rating` | ✅ Pass |
| Slanje poruke | `user sends message and notifies all admins` | ✅ Pass |
| Otkazivanje otkazane rezervacije | `cancelReservation rejects already canceled` | ✅ Pass |
| Waitlist duplikat | `addToWaitlist rejects duplicate entry` | ✅ Pass |

---

## 3. Ručno testirani korisnički tokovi

Svi ključni korisnički tokovi su ručno testirani u produkciji (`https://nrs.marexdev.com`) i lokalno.

### Autentifikacija i autorizacija

| Tok | Uloge | Rezultat |
|---|---|---|
| Registracija novog korisnika | Svi | ✅ Radi |
| Login s ispravnim podacima | Admin, Laborant | ✅ Radi |
| Login s neispravnim podacima | Svi | ✅ Prikazuje grešku |
| Pristup admin stranici kao laborant | Laborant | ✅ Vraća na dashboard |
| Logout | Svi | ✅ Briše sesiju, redirect na login |
| Deaktiviran nalog — pokušaj prijave | — | ✅ Vraća 403 |

### Rezervacijski workflow

| Tok | Uloge | Rezultat |
|---|---|---|
| Kreiranje rezervacije (slobodan termin) | Laborant | ✅ Status "Na čekanju" |
| Kreiranje rezervacije (zauzet termin) | Laborant | ✅ Prikazuje grešku konflikta |
| Rezervacija s isteklim sigurnosnim checkbox-om | Laborant | ✅ Dugme disabled bez checkboxa |
| Odobravanje rezervacije | Admin | ✅ Status "Odobren", notifikacija poslana |
| Odbijanje rezervacije s razlogom | Admin | ✅ Razlog vidljiv korisniku |
| Otkazivanje vlastite rezervacije | Laborant | ✅ Status "Otkazan" |
| Izmjena datuma rezervacije | Laborant | ✅ Novi datumi prihvaćeni |
| Stavljanje na waitlist | Laborant | ✅ Pozicija u redu vidljiva |

### Upravljanje opremom

| Tok | Uloge | Rezultat |
|---|---|---|
| Dodavanje novog aparata | Admin | ✅ Pojavljuje se na listi |
| Izmjena aparata (status, lokacija) | Admin | ✅ Odmah vidljivo |
| Dodjela taga aparatu | Admin | ✅ Chip vidljiv na karticama |
| Pretraga po imenu | Svi | ✅ Filtrira u realnom vremenu |
| Filter po tagu | Svi | ✅ Chip klik filtrira |
| Komparacija 2 aparata | Svi | ✅ Modal s tabelom |
| QR kod generiranje | Admin | ✅ Modal, PNG download |

### Komunikacija

| Tok | Uloge | Rezultat |
|---|---|---|
| Slanje poruke adminu | Laborant | ✅ Poruka dostavljena, notifikacija |
| Admin odgovor na poruku | Admin | ✅ Vidljivo u chatu korisnika |
| Broadcast obavijest svim korisnicima | Admin | ✅ Vidljiva u Obavijesti tabu |
| Equipment inquiry s kontekstom | Laborant | ✅ Equipment chip u compose formi |

### Administracija

| Tok | Uloge | Rezultat |
|---|---|---|
| Promjena role korisnika | Admin | ✅ Odmah aktivno |
| Deaktivacija korisnika | Admin | ✅ Deaktivirani ne mogu se prijaviti |
| Kreiranje maintenance taska | Admin | ✅ Vidljivo u "Moji zadaci" dodijeljenog korisnika |
| Dodavanje repromaterijala | Admin | ✅ Pojavljuje se s alert za nisku zalihu |
| Adjust zalihe s napomenom | Admin | ✅ Log promjene kreiran |
| Eksport CSV | Admin | ✅ Preuzima se fajl s UTF-8 BOM |
| Generisanje izvještaja | Admin | ✅ KPI kartice i grafikoni se rendiraju |

---

## 4. Ključni korisnički tokovi koji su posebno provjereni

### Tok 1: Kompletni rezervacijski ciklus

```
Laborant se prijavljuje → pregledava opremu → kreira rezervaciju → 
čeka odobrenje → dobija notifikaciju → koristi opremu → 
(opcije: ocjenjuje / šalje pitanje / otkazuje)
```
**Rezultat:** ✅ Svi koraci funkcionalni end-to-end

### Tok 2: Admin upravljanje

```
Admin se prijavljuje → vidi dashboard s pending rezervacijama → 
odbija jednu (s razlogom) → odobrava drugu → 
laborant dobija notifikacije → admin vidi u activity logu
```
**Rezultat:** ✅ Svi koraci funkcionalni

### Tok 3: Messaging workflow

```
Laborant klikne "Pošalji pitanje adminu" na opremi → 
equipment kontekst se prenosi → laborant piše pitanje → 
šalje → admin vidi u inbox-u s unread badge-om → 
admin odgovara → laborant vidi odgovor
```
**Rezultat:** ✅ Svi koraci funkcionalni (uz 30s polling delay)

---

## 5. Poznati testni propusti

1. **Frontend nema automatizovane testove** — React komponente nisu testirane s Jest/Testing Library. Kompletno ručno testiranje provedeno.
2. **Coverage nije izmjeren za sve servise** — Coverage je ~40-50% (procjena), daleko ispod NFR-12 cilja od 80%.
3. **Integration testovi nedostaju** — Testovi mockiraju bazu; nema end-to-end testova koji pogađaju pravu Supabase bazu.
4. **Nema load testova** — NFR-19 (200 concurrent users) nije verifikovan; sistem je testiran samo s manualnim individualnim korisnicima.
5. **Timezone edge cases nisu sistemski testirani** — Rezervacije oko ponoći (UTC transition) nisu eksplicitno testirane.
6. **Polling timing nije automatizovano testiran** — 30s polling interval za notifikacije i chat nije pokriven testovima.

---

## 6. Dokaz testiranja — stvarni output

### Automatizovani testovi — stvarni output (11. Juni 2026)

Testovi pokrenuti s `npx jest --verbose` iz `project/backend/`:

```
Test Suites: 13 passed, 13 total
Tests:       107 passed, 107 total
Snapshots:   0 total
Time:        1.207 s
```

Potpuni verbose output s imenima svih 107 testova prikazan je u sekciji 2 ovog dokumenta.

---

### Produkcijska verifikacija — stvarni API odgovori (11. Juni 2026)

**Health check:**
```bash
$ curl https://api.nrs.marexdev.com/api/health
{"status":"ok"}
```

**Login laboranta:**
```bash
$ curl -X POST https://api.nrs.marexdev.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"korisnik1@lab.ba","password":"korisnik123"}'

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 "user":{"id":5,"username":"korisnik1@lab.ba","role":"laborant","full_name":"Meho Mehaga"}}
```

**Dohvat opreme s JWT tokenom:**
```bash
$ curl https://api.nrs.marexdev.com/api/equipment \
  -H "Authorization: Bearer eyJhbGci..."

[{"id":250,"name":"TESTNI APARAT","status":"reserved","serial_number":"XXX",
  "model":"xXX","created_at":"2026-05-11T19:06:03.037Z",...},
 {"id":1,"name":"Olympus BX53 Mikroskop",...},
 ...]
```

**Zaštićena ruta bez tokena:**
```bash
$ curl https://api.nrs.marexdev.com/api/equipment
{"error":"Token nije pronađen"}   # HTTP 401
```

**Demo pristup:**
- Frontend: https://nrs.marexdev.com/login
- Laborant: `korisnik1@lab.ba` / `korisnik123`
