# Test funkcionalnost - Sprint 8

## Opseg
Ovaj dokument opisuje šta i kako je testirano za implementirane user story-je iz Sprint 8. Testovi su usklađeni sa definisanom test strategijom, odlukom o uvođenju Playwright-a (Sprint 6) i CI/CD automatizacijom (Sprint 8). Fokus testiranja je na vizuelnoj analitici iskorištenosti, asinhronim notifikacijama, automatskom kaskadnom rješavanju konflikata pri kvaru opreme, te CSV eksportu podataka.

## Automatizovani testovi
- **Backend:** Jest unit testovi za analitičke upite, servisnu logiku notifikacija i transakcijsko otkazivanje rezervacija uslijed kvara.
- **Frontend:** Vitest + React Testing Library za UI komponente grafikona i panel notifikacija.
- **E2E / Integracija:** Playwright testovi za kompletne tokove (npr. prijava kvara od strane admina -> provjera automatskog otkazivanja na korisničkom profilu), integrisani u GitHub Actions CI pipeline.

## Testni pristup i okruženje
- **Tip testova:** unit (backend), UI/component (frontend) i E2E (Playwright).
- **Izolacija:** Unit i komponentni testovi koriste mock-ovane mrežne pozive i repozitorije. E2E testovi se izvršavaju u GitHub Actions virtuelnom okruženju sa podignutom testnom bazom podataka.
- **Fokus:** Tačnost agregiranih podataka za grafikone, pravovremeno okidanje In-App notifikacija, stabilnost kaskadnih transakcija u bazi i ispravnost UTF-8 enkodinga u generisanim CSV datotekama.

## Kako pokrenuti
Backend:
1) cd project/backend
2) npm install
3) npm test

Frontend:
1) cd project/frontend
2) npm install
3) npm test

E2E (Playwright) i CI validacija:
1) npm run test:e2e
*(Alternativno, testovi se automatski pokreću na GitHub-u prilikom svakog Pull Request-a u main granu).*

## Testovi po user story-ju
| User story | Opis | Automatski testovi |
| --- | --- | --- |
| US-16 | Izvještaji o iskorištenosti opreme (Analitika) | frontend/src/__tests__/AnalyticsDashboard.test.jsx, backend/tests/analytics.service.test.js |
| US-17 | In-App sistem notifikacija za promjene statusa | frontend/src/__tests__/NotificationBell.test.jsx, backend/tests/notification.service.test.js |
| US-18 | Automatsko upravljanje konfliktima pri kvaru opreme | backend/tests/equipment.repository.test.js, e2e/equipment-failure-flow.spec.js |
| US-19 | Eksportovanje izvještaja u CSV format | frontend/src/__tests__/ExportButton.test.jsx |
| US-20 | Historija incidenata i servisiranja opreme | backend/tests/audit.service.test.js, e2e/incident-logs.spec.js |

## Detaljni test scenariji - backend

### analytics.service.test.js
- getEquipmentStats: validacija ispravnosti grupisanja i sumiranja sati zauzeća opreme za odabrani vremenski period.
- getEquipmentStats: provjera da li se u analitiku ispravno računaju samo odobrene (`Approved`) i završene rezervacije.

### notification.service.test.js
- createNotification: automatsko generisanje zapisa u bazi prilikom promjene statusa rezervacije (okidač na PATCH/PATCH rute).
- markAsRead: promjena statusa notifikacije iz nepročitane u pročitanu i validacija brojača.

### equipment.repository.test.js & audit.service.test.js
- handleEquipmentFailureTransaction: provjera da li postavljanje statusa opreme na "U kvaru" u sklopu iste transakcije uspješno prebacuje sve buduće rezervacije te opreme u status `Cancelled`/`Rejected`.
- logIncident: provjera da li se svaka izmjena statusa opreme trajno upisuje u `audit_logs` sa ispravnim vremenskim pečatom (timestamp).

## Detaljni test scenariji - frontend

### AnalyticsDashboard.test.jsx (US-16)
- Provjera uspješnog renderovanja Chart.js komponenti (grafikona) nakon što frontend povuče podatke sa `/api/analytics` endpointa.
- Odabir različitih vremenskih intervala (mjesec/semestar) ispravno osvježava podatke na grafikonu.

### NotificationBell.test.jsx (US-17)
- Prikaz crvenog bedža sa tačnim brojem nepročitanih obavijesti na ikonici zvonca u navigaciji.
- Klik na notifikaciju otvara detalje i šalje zahtjev za ažuriranje stanja, što asinhrono smanjuje brojač bez potrebe za osvježavanjem cijele stranice (`StateHasChanged`).

### ExportButton.test.jsx (US-19)
- Klik na dugme "Izvezi u CSV" generiše download stringa u browseru.
- Validacija postojanja UTF-8 BOM prefiksa u generisanom fajlu kako bi se osigurao ispravan prikaz naših slova (č, ć, š, ž, đ) u Excelu.

## Detaljni test scenariji - E2E (Playwright)

### equipment-failure-flow.spec.js (US-18)
- Logovanje kao administrator -> Promjena statusa mjerne stanice u "U kvaru".
- Automatski backend proces otkazuje konflikte -> Logovanje kao student (koji je imao rezervisanu tu stanicu) -> Provjera da li je studentu odmah vidljiva nova In-App notifikacija o otkazivanju i da li je status njegove rezervacije prebačen u `Cancelled`.

## Napomene
- Svi kreirani unit i komponentni testovi su potpuno izolovani i izvršavaju se bez eksternih zavisnosti.
- E2E testovi koriste izolovanu testnu bazu unutar CI pipeline-a koja se čisti nakon svakog pokretanja.
- GitHub Actions workflow (`ci.yml`) je konfigurisan tako da striktno blokira spajanje koda ako bilo koji od gore navedenih test scenarija padne.