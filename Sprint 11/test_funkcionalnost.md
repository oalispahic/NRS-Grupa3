# Test funkcionalnost - Sprint 11

## Opseg
Ovaj dokument opisuje sta i kako je testirano za user story-je iz Sprint 11. Fokus je na sistemu direktnih poruka između korisnika i administratora (US-40), kontekstualnom pitanju o opremi (US-41) i broadcast obavijestima (US-42).

## Automatizovani testovi
- Backend: Jest + Supertest za route testove (poruke i broadcast-ovi).
- Frontend: Vitest + React Testing Library za UI tokove, fetch pozivi su mock-ovani u testovima.

## Testni pristup i okruzenje
- Tip testova: unit i integration (backend), UI/component (frontend).
- Izolacija: backend testovi koriste mock-ovani pool (pg), frontend koristi mock-ovani fetch.
- Frontend se izvrsava u jsdom okruzenju.
- Fokus: validacija API endpointa, notifikacija, prikaz poruka i broadcast-ova.

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
| US-40 | Direktne poruke korisnik ↔ administratori | backend/tests/messages.routes.test.js, frontend/src/__tests__/MessagesPage.test.jsx, frontend/src/__tests__/AdminMessagesPage.test.jsx |
| US-41 | Pitanje o opremi (Equipment Inquiry) | frontend/src/__tests__/EquipmentDetailPage.test.jsx, frontend/src/__tests__/MessagesPage.test.jsx |
| US-42 | Admin broadcast obavijesti | backend/tests/messages.routes.test.js, frontend/src/__tests__/MessagesPage.test.jsx, frontend/src/__tests__/AdminMessagesPage.test.jsx |

## Detaljni test scenariji - backend

### messages.routes.test.js (US-40, US-42)

**GET /api/messages/inbox**
- Vraća poruke za autentifikovanog korisnika.

**GET /api/messages/unread-count**
- Vraća kombinovani broj (nepročitane poruke + nepročitane broadcast-ove) za regularnog korisnika.
- Vraća broj nepročitanih poruka za admina.

**POST /api/messages**
- Odbija prazno tijelo poruke (400).
- Korisnik šalje poruku — notifikacije se šalju svim aktivnim adminima.
- Admin šalje odgovor sa recipient_user_id — notifikacija se šalje korisniku.

**GET /api/messages/conversations**
- Vraća listu korisnika sa kojima admin ima aktivnu konverzaciju.

**GET /api/messages/conversation/:userId**
- Vraća poruke konverzacije i označava ih kao pročitane.

**GET /api/messages/broadcasts**
- Vraća listu broadcast-ova sa statusom is_read za korisnika.

**POST /api/messages/broadcasts**
- Odbija zahtjev bez naslova (400).
- Kreira novi broadcast (201).

**POST /api/messages/broadcasts/:id/read**
- Označava broadcast kao pročitan (upsert u broadcast_reads).

## Detaljni test scenariji - frontend

### MessagesPage.test.jsx (US-40, US-41, US-42)
- Slanje poruke adminu (POST /api/messages) sa ispravnim body-jem.
- Prikaz broadcast-ova u "Obavijesti" tabu i označavanje kao pročitano (POST /api/messages/broadcasts/:id/read).
- Pre-fill forme sa kontekstom opreme iz sessionStorage (equipment inquiry).
- Prikaz praznog stanja kada nema poruka.

### AdminMessagesPage.test.jsx (US-40, US-42)
- Učitavanje liste konverzacija i odabir korisnika za pregled poruka.
- Slanje odgovora korisniku (POST /api/messages sa recipient_user_id).
- Kreiranje broadcast obavijesti (POST /api/messages/broadcasts) sa naslovom i tekstom.
- Prikaz praznog stanja kada nema konverzacija.

### EquipmentDetailPage.test.jsx (US-41)
- Prikaz "Pošalji pitanje adminu" dugmeta za ne-admin korisnike.
- Klik na dugme sprema kontekst opreme (id, name) u sessionStorage i navigira na /messages.

## Napomene
- Testovi su unit/integration nivo.
- Backend route testovi koriste Supertest sa mock-ovanim pg pool-om.
- Frontend testovi koriste mock-ovani fetch i sessionStorage.
- Notifikacije se provjeravaju indirektno kroz insert pozive na notifications tabelu.
