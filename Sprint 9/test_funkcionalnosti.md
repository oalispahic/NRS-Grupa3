# Test funkcionalnosti — Sprint 9

## Opseg
Ovaj dokument opisuje sta i kako je testirano za user story-je iz Sprint 9. Fokus je na eksportu podataka, inventaru repromaterijala, globalnim pravilima rezervacija, razlozima odbijanja, upravljanju korisnicima, lokacijama, sigurnosnim napomenama i statistikama.

## Automatizovani testovi
- Backend: Jest unit testovi za servisnu logiku (repozitoriji i DB pozivi su mock-ovani).
- Frontend: Vitest + React Testing Library za UI tokove, fetch pozivi su mock-ovani u testovima.

## Testni pristup i okruzenje
- Tip testova: unit (backend) i UI/component (frontend).
- Izolacija: nema pravih poziva bazi niti eksternim servisima.
- Frontend se izvrsava u jsdom okruzenju uz MemoryRouter.
- Fokus: validacija poslovnih pravila i prikaz kljucnih UI elemenata.

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
| US-24 | Export podataka (CSV) | backend/tests/export.routes.test.js, frontend/src/__tests__/ReservationsPage.test.jsx |
| US-25 | Inventar repromaterijala | backend/tests/consumable.service.test.js, frontend/src/__tests__/ConsumablesPage.test.jsx |
| US-26 | Pravila korištenja opreme | backend/tests/settings.service.test.js, backend/tests/reservation.service.test.js, frontend/src/__tests__/SettingsPage.test.jsx |
| US-27 | Razlog odbijanja rezervacije | backend/tests/reservation.service.test.js, frontend/src/__tests__/ReservationsPage.test.jsx, frontend/src/__tests__/MyReservationsPage.test.jsx |
| US-28 | Upravljanje korisnicima | backend/tests/user.service.test.js, frontend/src/__tests__/UsersAdminPage.test.jsx |
| US-29 | Lokacije laboratorije | backend/tests/location.service.test.js, frontend/src/__tests__/LocationsPage.test.jsx, frontend/src/__tests__/EquipmentListPage.test.jsx |
| US-30 | Sigurnosne napomene opreme | frontend/src/__tests__/EquipmentDetailPage.test.jsx, frontend/src/__tests__/ManageEquipmentPage.test.jsx |
| US-31 | Stranica statistika i analitike | backend/tests/statistics.routes.test.js, frontend/src/__tests__/StatisticsPage.test.jsx |

## Detaljni test scenariji — backend

### export.routes.test.js
- GET /api/export/reservations vraca CSV string s BOM prefiksom i ispravnim headerima.
- GET /api/export/equipment vraca CSV string s BOM prefiksom i svim kolonama.
- Zahtjevi bez Authorization headera vracaju 401.
- Zahtjevi bez admin uloge vracaju 403.

### consumable.service.test.js
- Kreiranje repromaterijala uz validaciju naziva (ne smije biti prazan).
- adjustQuantity transakcijski: promjena kolicine i log zapis u jednoj operaciji.
- adjustQuantity odbija promjenu koja bi dovela kolicinu ispod 0.
- getLogs vraca paginirani log promjena za konkretan repromaterijal.
- Brisanje repromaterijala koji ima logove — soft ili hard delete.

### settings.service.test.js
- getAll vraca sve kljuceve iz system_settings tabele.
- set(key, value) mijenja vrijednost i azurira updated_at timestamp.
- set s nepoznatim kljucem kreira novi red (UPSERT semantika).

### reservation.service.test.js (prosireni scenariji)
- createReservation odbija rezervaciju koja prelazi max_reservation_days.
- createReservation odbija rezervaciju koja pocinje vise od max_advance_days u buducnosti.
- createReservation odbija kreiranje ako korisnik ima max_active_reservations aktivnih rezervacija.
- rejectReservation proslijedjuje rejection_reason u update upitu.
- rejectReservation poziva notifyReservationRejected s razlogom.

### user.service.test.js (prosireni scenariji)
- getAllUsers vraca listu svih korisnika.
- setRole mijenja ulogu korisnika i vraca azurirani zapis.
- setActive(id, false) deaktivira korisnika.
- auth.service.js login vraca 403 za korisnika s is_active = false.

### location.service.test.js
- Kreiranje lokacije uz validaciju (naziv je obavezan).
- Kreiranje lokacije s duplim nazivom vraca greSku (UNIQUE constraint).
- Brisanje lokacije postavlja location_id = NULL na svim aparatima koji su je koristili (ON DELETE SET NULL).
- getAll vraca paginiranu listu lokacija.

### statistics.routes.test.js
- GET /api/statistics vraca objekt s poljima kpi, topEquipment, statusDistribution, weeklyTrend.
- kpi sadrzi total_equipment, total_reservations, total_users, avg_duration_hours, approval_rate.
- topEquipment sadrzi max 7 stavki sortiranih silazno po broju rezervacija.
- weeklyTrend sadrzi max 12 stavki (jedna po sedmici).

## Detaljni test scenariji — frontend

### ReservationsPage.test.jsx (US-24, US-27)
- Klik na "Eksportuj CSV" dugme pokrece fetch poziv na /api/export/reservations s Authorization headerom.
- Klik "Odbij" otvara modal s textarea; klik "Otkaži" zatvara modal bez poziva API-ja.
- Klik "Potvrdi odbijanje" salje PATCH zahtjev s { reason: "..." } u tijelu.

### ConsumablesPage.test.jsx (US-25)
- Render liste repromaterijala s nazivom, jedinicom i kolicinom.
- Stavke ispod praga prikazuju AlertTriangle ikonicu.
- Klik "Prilagodi" otvara modal s + i - opcijama i poljem za napomenu.
- Klik "Potvrdi" salje POST zahtjev na /api/consumables/:id/adjust.
- Klik "Log promjena" ekspaanduje sekciju s hronoloski sortiranim unosima.

### SettingsPage.test.jsx (US-26)
- Ucitavanje stranice poziva GET /api/settings i prikazuje vrijednosti u numerickim inputima.
- Promjena vrijednosti i submit poziva PUT /api/settings s novim vrijednostima.
- Nevalidna vrijednost (0 ili negativan broj) prikazuje validacijski error.

### MyReservationsPage.test.jsx (US-27)
- Odbijena rezervacija s rejection_reason prikazuje crveni okvir s tekstom razloga.
- Odbijena rezervacija bez rejection_reason ne prikazuje crveni okvir.

### UsersAdminPage.test.jsx (US-28)
- Render tablice s korisnicima, ulogama i statusima.
- Vlastiti nalog prikazan s labelom "Ja" i bez dugmeta za deaktivaciju.
- Promjena uloge drugog korisnika salje PATCH /api/users/:id/role.
- Klik "Deaktiviraj" salje PATCH /api/users/:id/active s { is_active: false }.

### LocationsPage.test.jsx (US-29)
- Render tablice lokacija s imenom i opisom.
- Klik "Dodaj" kreira novu lokaciju putem POST /api/locations.
- Klik "Uredi" prebacuje red u editabilni mode; klik "Spremi" salje PUT zahtjev.
- Klik "Briši" prikazuje potvrdu; potvrda salje DELETE zahtjev.

### EquipmentListPage.test.jsx (US-29)
- Filter cip za lokaciju filtrira listu opreme na client strani.
- Klik "Sve lokacije" ponistava lokacijski filter.

### EquipmentDetailPage.test.jsx (US-30)
- Oprema sa safety_notes prikazuje zutu sekciju s tekstom napomene.
- Forma za rezervaciju sadrzi checkbox kada je safety_notes prisutan.
- "Rezervisi" dugme je disabled dok checkbox nije oznacen.
- Oprema bez safety_notes ne prikazuje checkbox u formi.

### ManageEquipmentPage.test.jsx (US-30)
- Forma za kreiranje opreme sadrzi textarea za safety_notes.
- Forma za edit opreme prikazuje postojecu vrijednost safety_notes.

### StatisticsPage.test.jsx (US-31)
- Render 5 KPI kartica s vrijednostima iz API odgovora.
- Bar chart rendera se s podacima topEquipment (recharts BarChart komponenta prisutna u DOM-u).
- Pie chart rendera se s podacima statusDistribution.
- Line chart rendera se s podacima weeklyTrend.
- Loading state prikazuje se dok API poziv nije zavrsen.

## Napomene
- Testovi su unit/component nivo; E2E tokovi sa realnom bazom nisu dio opsega.
- CSV eksport se testira mock-ovanjem fetch-a i provjerom da je kreiran Blob URL — stvarno preuzimanje fajla nije dio unit test opsega.
- recharts grafici su testirani provjera da komponente postoje u DOM-u, ne vizualnom verifikacijom.
- Svi testovi prolaze bez dodatnih servisa nakon kloniranja repozitorija.
