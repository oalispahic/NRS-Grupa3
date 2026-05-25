# Test funkcionalnost - Sprint 9

## Opseg
Ovaj dokument opisuje sta i kako je testirano za user story-je iz Sprint 9. Fokus je na eksportu CSV, repromaterijalima, globalnim pravilima rezervacija, razlozima odbijanja, upravljanju korisnicima, lokacijama, sigurnosnim napomenama i statistici.

## Automatizovani testovi
- Backend: Jest unit testovi za servisnu logiku (rezervacije i lokacije).
- Frontend: Vitest + React Testing Library za UI tokove, fetch pozivi su mock-ovani u testovima.

## Testni pristup i okruzenje
- Tip testova: unit (backend) i UI/component (frontend).
- Izolacija: nema pravih poziva bazi niti eksternim servisima.
- Frontend se izvrsava u jsdom okruzenju.
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
| US-24 | Export podataka (CSV) | frontend/src/__tests__/ManageEquipmentPage.test.jsx, frontend/src/__tests__/ReservationsPage.test.jsx |
| US-25 | Inventar repromaterijala | frontend/src/__tests__/ConsumablesPage.test.jsx |
| US-26 | Pravila koristenja opreme | backend/tests/reservation.service.test.js, frontend/src/__tests__/SettingsPage.test.jsx |
| US-27 | Razlog odbijanja rezervacije | backend/tests/reservation.service.test.js, frontend/src/__tests__/ReservationsPage.test.jsx, frontend/src/__tests__/MyReservationsPage.test.jsx |
| US-28 | Upravljanje korisnicima | frontend/src/__tests__/UsersAdminPage.test.jsx |
| US-29 | Lokacije laboratorije | backend/tests/location.service.test.js, frontend/src/__tests__/LocationsPage.test.jsx, frontend/src/__tests__/EquipmentListPage.test.jsx |
| US-30 | Sigurnosne napomene opreme | frontend/src/__tests__/EquipmentDetailPage.test.jsx |
| US-31 | Statistike i analitika | frontend/src/__tests__/StatisticsPage.test.jsx |

## Detaljni test scenariji - backend

### reservation.service.test.js
- Odbijanje rezervacije kada je trajanje vece od definisanog maksimuma.
- Odbijanje rezervacije kada je start predaleko u buducnosti.
- Odbijanje rezervacije kada korisnik ima previse aktivnih rezervacija.
- Odbijanje rezervacije sa razlogom (razlog se prosledjuje u repo i notifikaciju).

### location.service.test.js
- Kreiranje lokacije odbija prazan naziv.
- Kreiranje lokacije trimuje naziv i opis.
- Azuriranje nepostojece lokacije vraca 404.
- Brisanje nepostojece lokacije vraca 404.

## Detaljni test scenariji - frontend

### ManageEquipmentPage.test.jsx (US-24)
- Export opreme u CSV poziva /api/export/equipment i inicira download.

### ReservationsPage.test.jsx (US-24, US-27)
- Export rezervacija u CSV poziva /api/export/reservations.
- Odbijanje rezervacije salje razlog odbijanja na API.

### ConsumablesPage.test.jsx (US-25)
- Kreiranje nove stavke repromaterijala (POST /api/consumables).
- Azuriranje zalihe (PATCH /api/consumables/:id/adjust) sa napomenom.

### SettingsPage.test.jsx (US-26)
- Snimanje globalnih pravila (PUT /api/settings) sa numerickim vrijednostima.

### UsersAdminPage.test.jsx (US-28)
- Promjena uloge korisnika (PATCH /api/users/:id/role).
- Aktiviranje/deaktiviranje korisnika (PATCH /api/users/:id/active).

### LocationsPage.test.jsx (US-29)
- Dodavanje lokacije (POST /api/locations).
- Uredjivanje lokacije (PUT /api/locations/:id).

### EquipmentListPage.test.jsx (US-29)
- Filtriranje opreme po lokaciji.

### EquipmentDetailPage.test.jsx (US-30)
- Sigurnosne napomene: prikaz modala i potvrda prije prikaza forme za rezervaciju.

### MyReservationsPage.test.jsx (US-27)
- Prikaz razloga odbijanja na kartici odbijene rezervacije.

### StatisticsPage.test.jsx (US-31)
- Render KPI kartica nakon odgovora sa /api/statistics.

## Napomene
- Testovi su unit/component nivo; E2E tokovi sa realnom bazom nisu dio opsega.
- CSV eksport testovi provjeravaju da je pozvan ispravan endpoint i da je iniciran download.
- Testovi su pisani tako da prolaze bez dodatnih servisa nakon kloniranja repozitorija.
