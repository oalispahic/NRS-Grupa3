# Test funkcionalnost - Sprint 10

## Opseg
Ovaj dokument opisuje sta i kako je testirano za user story-je iz Sprint 10. Fokus je na izvjestajima, maintenance zadacima, aktivnostima korisnika, poredjenju opreme, waitlist funkcionalnosti, QR kodovima i prikazu nadolazecih servisa. Responsive dizajn je pokriven manualnim testiranjem.

## Automatizovani testovi
- Backend: Jest unit testovi za maintenance i waitlist kontrolere, te servisna pravila.
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
| US-32 | Izvjestaji i PDF export | frontend/src/__tests__/ReportsPage.test.jsx |
| US-33 | Maintenance zadaci | backend/tests/maintenance.controller.test.js, frontend/src/__tests__/MaintenancePage.test.jsx, frontend/src/__tests__/MyTasksPage.test.jsx |
| US-34 | Moje aktivnosti | frontend/src/__tests__/MyActivityPage.test.jsx |
| US-35 | Responsive UI | manualno testiranje (razlicite sirine ekrana) |
| US-36 | Poredjenje opreme | frontend/src/__tests__/EquipmentListPage.test.jsx |
| US-37 | Waitlist | backend/tests/waitlist.controller.test.js, backend/tests/reservation.service.test.js, backend/tests/equipment.service.test.js, frontend/src/__tests__/EquipmentDetailPage.test.jsx |
| US-38 | QR kod za opremu | frontend/src/__tests__/ManageEquipmentPage.test.jsx |
| US-39 | Nadolazeci servisi | frontend/src/__tests__/MaintenancePage.test.jsx |

## Detaljni test scenariji - backend

### maintenance.controller.test.js
- Odbijanje kreiranja kada nedostaju obavezna polja.
- Kreiranje zadatka salje notifikaciju i loguje aktivnost.
- Validacija statusa kod izmjene.
- Promjena statusa dozvoljena samo assignee korisniku.

### waitlist.controller.test.js
- Odbijanje dodavanja na waitlist ako korisnik vec postoji (409).
- Uspjesno dodavanje na waitlist.
- Prikaz liste za admina i pozicije za korisnika.
- Uklanjanje sa waitlist (204).

### reservation.service.test.js
- Waitlist rezervacija prolazi i kada postoji konflikt termina.

### equipment.service.test.js
- Promjena statusa na available salje notifikaciju korisnicima na waitlist.

## Detaljni test scenariji - frontend

### ReportsPage.test.jsx (US-32)
- Generisanje izvjestaja poziva /api/statistics/reportv2.
- Dugme "Exportuj PDF" poziva window.print().

### MaintenancePage.test.jsx (US-33, US-39)
- Kreiranje zadatka salje POST /api/maintenance.
- Prikaz nadolazecih servisa.

### MyTasksPage.test.jsx (US-33)
- Promjena statusa zadatka salje PATCH /api/maintenance/:id/status.

### MyActivityPage.test.jsx (US-34)
- Ucitavanje aktivnosti i filter po tipu.

### EquipmentListPage.test.jsx (US-36)
- Odabir opreme za poredjenje i otvaranje modalnog prikaza.

### EquipmentDetailPage.test.jsx (US-37)
- Prikaz opcije za waitlist kada je termin zauzet.
- Slanje rezervacije sa waitlist: true.

### ManageEquipmentPage.test.jsx (US-38)
- Otvaranje QR modalnog prozora za odabranu opremu.

## Napomene
- Testovi su unit/component nivo; E2E tokovi sa realnom bazom nisu dio opsega.
- Waitlist testovi provjeravaju ispravno ponasanje i notifikacije u servisnom sloju.
- Responsive zahtjevi su validirani manuelno u pregledniku.
