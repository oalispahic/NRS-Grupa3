# Test funkcionalnost - Sprint 8

## Opseg
Ovaj dokument opisuje sta i kako je testirano za user story-je iz Sprint 8. Fokus je na notifikacijama, logu aktivnosti, trenutnom koristenju opreme, ocjenjivanju, tagovima, profilu korisnika i vizualnim prikazima na dashboardu.

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
| US-16 | In-app notifikacije | backend/tests/notification.service.test.js, frontend/src/__tests__/AdminLayoutNotifications.test.jsx |
| US-17 | Trenutno koristenje opreme | backend/tests/reservation.service.test.js, frontend/src/__tests__/CurrentUsagePage.test.jsx |
| US-18 | Log aktivnosti | backend/tests/activity.service.test.js, frontend/src/__tests__/ActivityLogPage.test.jsx |
| US-19 | Ocjenjivanje opreme | backend/tests/rating.service.test.js, frontend/src/__tests__/MyReservationsPage.test.jsx |
| US-20 | Profil korisnika | backend/tests/user.service.test.js, frontend/src/__tests__/ProfilePage.test.jsx |
| US-21 | Tagovi opreme | backend/tests/tag.service.test.js, frontend/src/__tests__/ManageEquipmentPage.test.jsx, frontend/src/__tests__/EquipmentListPage.test.jsx |
| US-22 | Status mozaik opreme | frontend/src/__tests__/DashboardPage.test.jsx |
| US-23 | Timeline nadolazecih rezervacija | frontend/src/__tests__/DashboardPage.test.jsx |

## Detaljni test scenariji - backend

### notification.service.test.js
- Kreiranje notifikacije za odobrenje/odbijanje rezervacije.
- Dohvat liste notifikacija i broja neprocitanih.
- Oznacavanje pojedinacne i svih notifikacija kao procitanih.

### activity.service.test.js
- Kreiranje log zapisa sa akcijom i detaljima.
- Paginirani dohvat logova i ukupnog broja zapisa.

### reservation.service.test.js
- getCurrentlyActive vraca listu trenutno aktivnih rezervacija.
- returnReservation odbija neaktivne rezervacije i vraca opremu na available kada nema aktivnih termina.

### rating.service.test.js
- Validacija raspona ocjene (1-5).
- Ocjena je dozvoljena samo za odobrene rezervacije koje su zavrsene.
- Sprjecavanje duplog ocjenjivanja.
- Kreiranje ocjene i zapis u log aktivnosti.
- Dohvat ocjena i prosjeka po opremi.

### tag.service.test.js
- Kreiranje taga uz validaciju naziva.
- Brisanje nepostojeceg taga vraca 404.
- Dodjela tagova opremi (reset + add) i ponovni dohvat.

### user.service.test.js
- Dohvat profila korisnika.
- Azuriranje profila uz validaciju zahtjeva.
- Promjena lozinke uz provjeru trenutne lozinke.

## Detaljni test scenariji - frontend

### AdminLayoutNotifications.test.jsx (US-16)
- Prikaz notifikacija u sidebaru.
- Otvaranje liste i oznacavanje svih notifikacija kao procitanih.

### CurrentUsagePage.test.jsx (US-17)
- Prikaz trenutno aktivnih rezervacija.
- Osvjezavanje liste preko dugmeta "Osvjezi".

### ActivityLogPage.test.jsx (US-18)
- Render tablice logova sa akcijama i korisnikom.

### MyReservationsPage.test.jsx (US-19)
- Prikaz panela za ocjenjivanje po zavrsenoj rezervaciji.
- Slanje ocjene na API.

### ProfilePage.test.jsx (US-20)
- Ucitavanje profila.
- Azuriranje licnih podataka preko "Spremi profil".

### ManageEquipmentPage.test.jsx (US-21)
- Kreiranje novog taga iz administratorskog panela.

### EquipmentListPage.test.jsx (US-21)
- Filtriranje opreme po tagu.

### DashboardPage.test.jsx (US-22, US-23)
- Prikaz status mozaika opreme.
- Prikaz timeline-a odobrenih rezervacija za narednih 7 dana.

## Napomene
- Testovi su unit/component nivo; E2E tokovi sa realnom bazom nisu dio opsega.
- In-app notifikacije se osvjezavaju periodicno u UI (interval) ali taj interval nije posebno testiran.
- Testovi su pisani tako da prolaze bez dodatnih servisa nakon kloniranja repozitorija.
