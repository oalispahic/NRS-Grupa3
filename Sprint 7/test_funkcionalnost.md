# Test funkcionalnost - Sprint 7

## Opseg
Ovaj dokument opisuje sta i kako je testirano za implementirane user story-je iz Sprint 7. Testovi su uskladjeni sa definisanom test strategijom (Sprint 3) i fokusirani na kalendarski prikaz dostupnosti, detalje opreme, obradu zahtjeva, historiju rezervacija i otkazivanje.

## Automatizovani testovi
- Backend: Jest unit testovi za servisnu logiku. Repozitoriji i vanjske zavisnosti su mock-ovani (nema potrebe za DB).
- Frontend: Vitest + React Testing Library za UI tokove. Mrezni pozivi su mock-ovani.

## Testni pristup i okruzenje
- Tip testova: unit (backend) i UI/component (frontend).
- Izolacija: nema pravih poziva bazi ni JWT-u; sve se mock-uje.
- Frontend se izvrsava u jsdom okruzenju uz MemoryRouter.
- Fokus: validacija konflikta termina, UI kalendar, detalji opreme, obrada zahtjeva i promjene statusa.

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
| US-11 | Kalendar dostupnosti opreme | frontend/src/__tests__/ReservationCalendar.test.jsx, frontend/src/__tests__/EquipmentDetailPage.test.jsx |
| US-8 (prosireno) | Detalji i status opreme | frontend/src/__tests__/EquipmentDetailPage.test.jsx, backend/tests/equipment.service.test.js |
| US-7 | Odobravanje/odbijanje rezervacija | frontend/src/__tests__/ReservationsPage.test.jsx, backend/tests/reservation.service.test.js |
| US-13 | Historija rezervacija korisnika | frontend/src/__tests__/MyReservationsPage.test.jsx, backend/tests/reservation.service.test.js |
| US-14 | Otkazivanje rezervacije | frontend/src/__tests__/MyReservationsPage.test.jsx, backend/tests/reservation.service.test.js |

## Detaljni test scenariji - backend

### reservation.service.test.js
- createReservation: validacija obaveznih polja, provjera konflikta termina.
- createReservation: postavlja status opreme na reserved kada je dostupna.
- approve/reject: mijenja status rezervacije i azurira status opreme kada nema aktivnih rezervacija.
- cancelReservation: odbija otkazivanje ako rezervacija ne postoji ili je vec otkazana.
- cancelReservation: mijenja status na rejected i azurira opremu kada nema aktivnih rezervacija.
- updateReservationDates: validacija start/end vremena, provjera konflikta i azuriranje termina.

### equipment.service.test.js
- create/update: validacija i normalizacija detalja (model, serijski broj, lokacija, servisni podaci).
- update: parcijalni update preko COALESCE.

## Detaljni test scenariji - frontend

### ReservationCalendar.test.jsx (US-11)
- Odabir perioda koji sadrzi zauzete datume -> prikazuje gresku i ponistava selekciju.

### EquipmentDetailPage.test.jsx (US-11, US-8)
- Prikaz detaljnih polja opreme (serijski broj, model, proizvodjac).
- Rezervacija preko kalendara: potvrda je onemogucena dok nije odabran period.
- Admin promjena statusa opreme -> PUT /api/equipment/:id.

### ReservationsPage.test.jsx (US-7)
- Klik na odobravanje zahtjeva -> PATCH /api/reservations/:id/approve.

### MyReservationsPage.test.jsx (US-13, US-14)
- Prikaz rezervacija i dostupnost opcije "Uredi" samo za pending/approved.
- Otkazivanje rezervacije iz edit panela -> DELETE /api/reservations/:id.

## Napomene
- Testovi su kreirani tako da se mogu pokrenuti nakon pull-a sa GitHub-a bez dodatnih servisa.
- Ovi testovi su unit/component nivo; E2E tokovi sa realnom bazom nisu dio ovog opsega.
- Filter po statusu u historiji rezervacija i pravilo 24h lock perioda nisu automatizovani u ovim testovima ako nisu implementirani u kodu.
