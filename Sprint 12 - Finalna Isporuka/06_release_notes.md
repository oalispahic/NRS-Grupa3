# Release Notes — LabManager v1.0

**Verzija:** 1.0.0  
**Datum isporuke:** Juni 2026  
**Tip isporuke:** Finalna verzija

---

## Šta je uključeno u finalnu verziju

LabManager v1.0 je kompletna web aplikacija za upravljanje medicinskom laboratorijskom opremom, deployana na cloud platvormu Vercel. Sadrži sve funkcionalne module razvijene tokom Sprintova 5–11.

**Produkcijski URL-ovi:**
- Frontend: https://nrs.marexdev.com/
- Backend API: https://api.nrs.marexdev.com/

---

## Najvažnije funkcionalnosti

### Autentifikacija i korisnici
- Registracija s username (ne mora biti email format)
- JWT-based login/logout (8h trajanje sesije)
- RBAC: laborant / administrator uloge
- Korisnički profil s ličnim podacima i promjenom lozinke

### Oprema
- Lista 60+ laboratorijskih aparata s pretragom, filterima i tagovima
- Vizualni status mozaik na dashboardu
- Detalji aparata: servisni podaci, garancija, sigurnosne napomene
- QR kod generiranje (PNG download) za fizičko označavanje
- Komparacija 2-3 aparata u full-screen modalu

### Rezervacije
- Vizualni kalendar zauzeća s airline-style range selekcijom
- Server-side konflikt provjera
- Workflow: kreiranje → odobravanje/odbijanje (s razlogom)
- Otkazivanje i izmjena datuma
- Waitlist s automatskom notifikacijom
- Globalna ograničenja: maks. trajanje, maks. unaprijed, maks. istovremenih

### Administracija
- Admin odobravanje s razlogom odbijanja
- Upravljanje korisnicima (promjena role, deaktivacija)
- CRUD oprema s tagovima, lokacijama, sigurnosnim napomenama
- Inventar repromaterijala (zalihe, log, upozorenja)
- Maintenance task management (prioritet, dodjela, workflow)
- Activity audit log (nepromijenljiv zapis)

### Komunikacija
- In-app notifikacije (bell, polling 30s)
- Direktni chat laborant ↔ admin
- Equipment inquiry s kontekstom aparata
- Admin broadcast obavijesti svim korisnicima

### Analitika
- Statistike: KPI kartice, grafikoni korištenosti (recharts)
- Izvještaji s date range filterom i PDF eksportom
- CSV eksport opreme i rezervacija

### UX
- Fully responsive dizajn (mobilni, tablet, desktop)
- 7-dnevni timeline nadolazećih rezervacija
- Favoriti opreme
- Brzi pregled (modal bez navigacije)

---

## Poznata ograničenja

1. **Bez email notifikacija** — sve notifikacije su isključivo in-app. Korisnik mora biti prijavljen da ih vidi.
2. **JWT u sessionStorage** — ranjivije od httpOnly cookie; nije zaštićeno od XSS napada u slučaju injektiranog skripte treće strane.
3. **Polling umjesto real-time** — chat i notifikacijski bell osvježavaju se svakih 30 sekundi, ne u realnom vremenu.
4. **Vercel cold start** — prvi API request nakon perioda neaktivnosti može trajati 1-3 sekunde.
5. **Klijentsko filtriranje** — pretraga i filtriranje opreme rade na klijentskoj strani; za >500 aparata može biti sporije.
6. **PDF eksport** — koristi browser `window.print()`, ne generiše PDF fajl bez korisnikove intervencije.
7. **Supabase free tier** — 500MB storage, 50.000 operacija/dan. Bez automatskog čišćenja starih logova.
8. **`test` uloga** — specijalna uloga za QA nije formalni ENUM u DB shemi; kreira se direktno kroz SQL.

---

## Poznati bugovi

1. **Admini vide vlastite broadcast obavijesti** u "Obavijesti" tabu (po dizajnu nisu vidjeti kao sender, ali nema filtera).
2. **Deaktivacija korisnika ne otkazuje aktivne rezervacije** — korisnikove pending/approved rezervacije ostaju u sistemu nakon deaktivacije. Admin mora ih ručno otkazati.
3. **Timezone neslaganje** — sistem koristi UTC za storage ali browser local time za prikaz; mogu se pojaviti vizualna neslaganja od 1-2h ovisno o lokaciji korisnika (dokumentirano u Sprint 7 retrospektivi).

---

## Šta nije dio finalne isporuke

| Funkcionalnost | Status | Napomena |
|---|---|---|
| Email notifikacije | ❌ Not implemented | Zahtijeva SMTP setup (SendGrid, Nodemailer) |
| WebSocket real-time chat | ❌ Not implemented | Vercel serverless ograničenje |
| Upload fajlova/slika | ❌ Not implemented | Nije bio u opsegu |
| httpOnly cookie auth | ❌ Not implemented | Odloženo od Sprint 5 |
| Rate limiting | ❌ Not implemented | Identificirano kao nedostatak |
| i18n / engleski jezik | ❌ Not implemented | NFR-20 planiran, nikad implementiran |
| Server-side paginacija | ❌ Not implemented | Nije potrebno za trenutni obim |
| Automatska kancellacija pri deaktivaciji | ❌ Not implemented | Tehnički dug identificiran u Sprint 9 |

---

## Ranije verzije i sprintovi

| Sprint | Datum | Ključne isporuke |
|---|---|---|
| Sprint 5 | April 2026 | Auth, 7 frontend stranica, basic API, Vercel deployment |
| Sprint 6 | Maj 2026 | RBAC, registracija, frontend polish |
| Sprint 7 | Maj 2026 | Kalendar, pretraga, sidebar navigacija |
| Sprint 8 | Maj 2026 | Notifikacije, activity log, tagovi, dashboard vizuali |
| Sprint 9 | Maj 2026 | CSV export, repromaterijal, korisnici, lokacije, statistike |
| Sprint 10 | Juni 2026 | Izvještaji, maintenance, waitlist, QR, responsive |
| Sprint 11 | Juni 2026 | Chat, broadcast, equipment inquiry |
| Sprint 12 | Juni 2026 | Finalna dokumentacija |
