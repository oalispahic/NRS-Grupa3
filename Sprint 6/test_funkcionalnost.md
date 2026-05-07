# Test funkcionalnost - Sprint 6

## Opseg
Ovaj dokument opisuje sta i kako je testirano za implementirane user story-je iz Sprint 5 i Sprint 6. Testovi su uskladjeni sa definisanom test strategijom (Sprint 3) i fokusirani na kriticne tokove: autentifikacija, pregled opreme, rezervacije, upravljanje opremom i kontrola pristupa.

## Automatizovani testovi
- Backend: Jest unit testovi za service i middleware sloj. Repozitoriji i vanjske zavisnosti su mock-ovani (nema potrebe za DB).
- Frontend: Vitest + React Testing Library za UI tokove. Mrezni pozivi su mock-ovani.

## Testni pristup i okruzenje
- Tip testova: unit (backend servisna logika) i UI/component (frontend stranice i rute).
- Izolacija: nema pravih poziva bazi, JWT-u ili bcrypt-u; sve se mock-uje.
- Frontend radi u jsdom okruzenju; rute se testiraju preko MemoryRouter-a.
- Fokus: validacija ulaza, role-based pristup, sprjecavanje konflikta, CRUD tokovi i renderovanje kljucnih UI prikaza.

## Testni podaci (mock)
- Korisnici: admin i laborant, sa id, email/username i ulogom.
- Oprema: id, name, status, serial_number, model, (opcioni: manufacturer, location, dates).
- Rezervacije: id, equipment_name, start_time, end_time, status (pending/approved/rejected).

## Kriterij prolaza
- Svi testovi prolaze bez gresaka.
- Svaki user story iz Sprint 5 i Sprint 6 ima bar jedan automatizovani test koji provjerava acceptance intent.

## Kako pokrenuti
Backend:
1) cd project/backend
2) npm install
3) npm run build
4) npm test

Frontend:
1) cd project/frontend
2) npm install
3) npm run build
4) npm test

Jedna komanda (iz korijena repozitorija):
1) npm run install:all
2) npm run build
3) npm test

## Testovi po user story-ju
| User story | Opis | Automatski testovi |
| --- | --- | --- |
| US-1 | Pregled opreme | backend/tests/equipment.service.test.js (listAll), frontend/src/__tests__/EquipmentListPage.test.jsx |
| US-2 | Detalji opreme | backend/tests/equipment.service.test.js (getById), frontend/src/__tests__/EquipmentDetailPage.test.jsx |
| US-3 | Rezervacija opreme | backend/tests/reservation.service.test.js (createReservation), frontend/src/__tests__/EquipmentDetailPage.test.jsx |
| US-4 | Moje rezervacije | backend/tests/reservation.service.test.js (getMyReservations), frontend/src/__tests__/MyReservationsPage.test.jsx |
| US-5 | Upravljanje opremom | backend/tests/equipment.service.test.js (create/update/remove), frontend/src/__tests__/ManageEquipmentPage.test.jsx |
| US-6 | Autentifikacija korisnika | backend/tests/auth.service.test.js, frontend/src/__tests__/LoginPage.test.jsx |
| US-7 | Odobravanje rezervacija | backend/tests/reservation.service.test.js (approve/reject), frontend/src/__tests__/ReservationsPage.test.jsx |
| US-8 | Status opreme | backend/tests/equipment.service.test.js (update status), frontend/src/__tests__/EquipmentDetailPage.test.jsx |
| US-9 | Sprjecavanje konflikta rezervacija | backend/tests/reservation.service.test.js (conflict) |
| US-10 | Autorizacija korisnika | backend/tests/auth.middleware.test.js, frontend/src/__tests__/ProtectedRoute.test.jsx |
| US-24 | Dashboard pregled | frontend/src/__tests__/DashboardPage.test.jsx |
| US-28 | Registracija korisnika | backend/tests/auth.service.test.js (register), frontend/src/__tests__/RegisterPage.test.jsx |

## Detaljni test scenariji - backend

### auth.service.test.js
- Register: nedostaju polja -> baca gresku sa status 400.
- Register: korisnik vec postoji -> baca gresku sa status 409.
- Register: hash lozinke (bcrypt) i kreiranje korisnika u repo sloju.
- Login: nedostaju polja -> status 400.
- Login: korisnik ne postoji -> status 401.
- Login: pogresna lozinka -> status 401.
- Login: uspjesno -> jwt.sign pozvan sa ispravnim payloadom, vraca token i user.

### auth.middleware.test.js
- authenticate: nema Bearer tokena -> 401.
- authenticate: neispravan token -> 401.
- authenticate: ispravan token -> postavlja req.user i poziva next().
- requireRole: uloga ne odgovara -> 403.
- requireRole: uloga odgovara -> prolaz kroz middleware.

### equipment.service.test.js
- listAll: vraca listu opreme iz repo sloja.
- getById: nepostojeci id -> 404.
- create: validacija obaveznih polja (name, serial_number, model) -> 400.
- create: invalid status -> 400.
- create: neispravan datum (purchase_date) -> 400.
- create: normalizacija stringova (trim, prazan string -> null).
- create: unique constraint (serial_number) -> mapira u 409.
- update: invalid status -> 400.
- update: prazan serial_number ako je eksplicitno poslan -> 400.
- update: nepostojeca oprema -> 404.
- update: uspjesno -> vraca azuriran zapis.
- remove: nepostojeca oprema -> 404.
- remove: uspjesno -> zavrsava bez greske.

### reservation.service.test.js
- createReservation: nedostaju polja -> 400.
- createReservation: end_time <= start_time -> 400.
- createReservation: oprema ne postoji -> 404.
- createReservation: pronadjen konflikt -> 409.
- createReservation: uspjesno -> kreira rezervaciju u repo sloju.
- getMyReservations: vraca rezervacije za userId.
- getAllReservations: status filter prosledjen repo sloju.
- approve/reject: nepostojeci id -> 404.
- approve/reject: uspjesno -> update status.

## Detaljni test scenariji - frontend

### EquipmentListPage.test.jsx (US-1)
- Mock fetch /api/equipment -> render liste i prikaz naziva opreme.

### EquipmentDetailPage.test.jsx (US-2, US-3, US-8)
- Mock fetch /api/equipment/:id -> prikaz detalja.
- Laborant: pokusaj rezervacije sa end_time < start_time -> prikaz validacione poruke.
- Admin: promjena statusa -> PUT /api/equipment/:id sa novim statusom.

### MyReservationsPage.test.jsx (US-4)
- Mock fetch /api/reservations/my sa tokenom -> prikaz rezervacija u tabeli i karticama.

### ManageEquipmentPage.test.jsx (US-5)
- Popunjavanje obaveznih polja -> POST /api/equipment -> reload liste.

### ReservationsPage.test.jsx (US-7)
- Mock fetch /api/reservations -> prikaz pending rezervacije.
- Klik na "Odobri" -> PATCH /api/reservations/:id/approve.

### DashboardPage.test.jsx (US-24)
- Admin prikaz: nakon fetch /api/equipment prikazuje brze linkove.

### LoginPage.test.jsx (US-6)
- Unos kredencijala -> poziva login() i navigira na /dashboard.

### RegisterPage.test.jsx (US-28)
- Unos podataka -> POST /api/auth/register -> navigira na /login.

### ProtectedRoute.test.jsx (US-10)
- ProtectedRoute: prikaz sadrzaja kada je korisnik autentifikovan.
- AdminRoute: blokira laboranta i ne prikazuje admin sadrzaj.

## Napomene
- Testovi su kreirani tako da se mogu pokrenuti nakon pull-a sa GitHub-a bez dodatnih servisa.
- "100% testovi" je realizovano na nivou user story-ja: svaki implementirani story iz Sprint 5 i Sprint 6 ima bar jedan automatski test koji potvrduje acceptance intent.
- Ovi testovi su unit/component nivo; E2E tokovi sa realnom bazom nisu dio ovog opsega.
