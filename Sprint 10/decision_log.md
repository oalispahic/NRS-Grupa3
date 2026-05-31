# Decision Log — Sprint 10

> **Sprint 10** · 31.05.2026.  
> Evidentiranje svjesnih projektnih, arhitektonskih i tehničkih odluka u sklopu finalizacije sistema: izvještaji, maintenance, mobilni dizajn, komparacija, waitlist i QR kodovi.

---

## Sumarni pregled

| ID | Naziv odluke | Datum | Oblast | Status |
|---|---|---|---|---|
| OD-035 | PDF eksport kroz window.print() s print CSS umjesto jsPDF | 2026-05-31 | Frontend / UX | Aktivna |
| OD-036 | Maintenance taskovi kao zasebna tabela, ne kao status opreme | 2026-05-31 | Database / Arhitektura | Aktivna |
| OD-037 | Waitlist notifikacije šalje backend pri promjeni statusa opreme | 2026-05-31 | Backend / Arhitektura | Aktivna |
| OD-038 | QR kod generisan čisto na frontendu (react-qr-code) bez backend poziva | 2026-05-31 | Frontend / Arhitektura | Aktivna |
| OD-039 | Komparacija opreme u full-screen modalu umjesto zasebne stranice | 2026-05-31 | Frontend / UX | Aktivna |
| OD-040 | Lična historija koristi postojeću activity_logs tabelu s filtrom po user_id | 2026-05-31 | Backend / Arhitektura | Aktivna |
| OD-041 | Hamburger menu s drawer umjesto separate mobile navigacije | 2026-05-31 | Frontend / UX | Aktivna |
| OD-042 | Reports endpoint agregira sve podatke u jednom pozivom s Promise.all | 2026-05-31 | Backend / Performanse | Aktivna |

---

## Detaljan pregled odluka

---

### OD-035 — PDF eksport kroz window.print() s print CSS umjesto jsPDF

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
PDF eksport izvještaja može se implementirati na više načina. jsPDF/html2canvas pristup zahtijeva dodatne npm pakete i često rezultira lošom rezolucijom teksta u PDF-u.

**Razmatrane opcije:**
1. jsPDF + html2canvas — screenshot DOM-a i ugradi u PDF; loša tipografija, veliki paketi
2. Dedicated PDF backend library (puppeteer) — server renderuje stranicu; kompleksan setup, zahtijeva Chrome na serveru
3. `window.print()` s `@media print` CSS pravilima — browser nativno generira PDF

**Odabrana opcija:** `window.print()` s print-optimiziranim CSS-om

**Razlog izbora:**
Browser nativno renderira PDF s odličnom tipografijom, bez vanjskih paketa. `@media print` CSS selektivno skriva navigaciju, sidebar i akcijska dugmad — prikazuje samo report sadržaj. Korisnik birá "Spremi kao PDF" u standardnom print dijalogu. Nema runtime zavisnosti.

**Posljedice odluke:**
PDF layout ovisi o browser print settingsima korisnika (margine, header/footer). Na Chromu i Safari-ju rezultat je konzistento dobar. Firefox može imati manje razlike u paginaciji.

---

### OD-036 — Maintenance taskovi kao zasebna tabela, ne kao status opreme

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
Evidencija održavanja mogla bi se realizirati kao specijalni status opreme (`maintenance`) ili kao poseban entitet. Oprema već ima status `maintenance` ali bez detalja o tome ko radi servis, šta treba uraditi i do kada.

**Razmatrane opcije:**
1. Proširiti tabelu `equipment` s poljem `maintenance_notes` — limitirano, ne podržava assignment ni tracking
2. Kreirati tabelu `maintenance_tasks` s punim entitetom (assignee, priority, deadline, status workflow)

**Odabrana opcija:** Zasebna tabela `maintenance_tasks`

**Razlog izbora:**
Jedna oprema može imati više istovremenih maintenance zadataka (npr. kalibracija + čišćenje + zamjena dijela). Task entitet podržava assignment na konkretnog korisnika, praćenje napretka, prioritete i historiju završenih radova. Status opreme ostaje neovisan — oprema može biti u `maintenance` statusu dok se taskovi rješavaju.

**Posljedice odluke:**
Nova migracija `018_maintenance_tasks.sql`. Novi API controller i service layer. Backend i frontend scope veći nego proširivanje postojeće tabele.

---

### OD-037 — Waitlist notifikacije šalje backend pri promjeni statusa opreme

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
Waitlist notifikacije moraju biti poslate kada oprema postane slobodna. Pitanje je gdje se taj trigger nalazi — u frontendu ili backendu.

**Razmatrane opcije:**
1. Frontend polling — korisnici periodično provjeravaju status; ne scalable, ne garantira dostavu
2. WebSocket push — real-time, ali kompleksan setup za ovaj scope projekta
3. Backend trigger u equipment update endpointu — kada status → `available`, odmah šalje notifikacije

**Odabrana opcija:** Backend trigger u `PATCH /api/equipment/:id` kada status promijeni u `available`

**Razlog izbora:**
Jedini pouzdani pristup bez dodatne infrastrukture. Backend kontrolira logiku — ne oslanjamo se na to da admin frontenda odradi extra korak. Notifikacijski sistem već postoji (`notification.service.js`) i može se pozvati. Minimalna dodatna kompleksnost.

**Posljedice odluke:**
Equipment update service mora provjeriti prethodni status i pozvati waitlist notification logiku. Nema WebSocket — korisnik mora reload stranicu ili imati automatski refresh notifikacija.

---

### OD-038 — QR kod generisan čisto na frontendu bez backend poziva

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
QR kodove moguće je generirati na backendu (npr. `qrcode` npm package, vraća PNG) ili na frontendu (browser JavaScript library).

**Razmatrane opcije:**
1. Backend endpoint `GET /api/equipment/:id/qr` vraća PNG — zahtijeva novi route, controller, library
2. Frontend `react-qr-code` library — generira SVG QR kod direktno u browseru, bez mrežnog poziva

**Odabrana opcija:** Frontend `react-qr-code` library

**Razlog izbora:**
QR generacija je čisto prezentacijska operacija — ne zahtijeva nikakvu server-side logiku. Frontend library eliminira novi backend endpoint, mrežni zahtjev i dodatnu server zavisnost. SVG output je vektoran (savršena oštrinu pri svakoj veličini printanja). Canvas API za PNG download je standardan browser API.

**Posljedice odluke:**
Nema backend promjena za ovu feature. Instalacija `react-qr-code` paketa na frontendu. PNG download zahtijeva crtanje SVG na canvas element — jednostavan jednolinijski kod.

---

### OD-039 — Komparacija opreme u full-screen modalu umjesto zasebne stranice

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
Komparacija opreme može biti prikazana kao zasebna stranica (nova ruta `/compare`) ili kao overlay modal na vrhu postojeće liste.

**Razmatrane opcije:**
1. Nova ruta `/compare?ids=1,2,3` — zahtijeva navigaciju, korisnik napušta listu opreme
2. Full-screen modal overlay — ostaje na listi, lak povratak, nema navigacijske historije

**Odabrana opcija:** Full-screen modal overlay (`position: fixed; inset: 0; z-index: 1100`)

**Razlog izbora:**
Korisnik odabire opremu na listi pa klikne "Poredi" — prirodno je da usporedba bude overlay, a ne nova stranica. Povratak na listu je instant (zatvori modal). Nema potrebe za rutom jer komparacija nema permalinka.

**Posljedice odluke:**
Modal je velik (full-screen) s horizontalnim scrollom za 3 stupca. Odabir za komparaciju čuva se u React state-u (ne localStorage) — gubi se pri refreshu, što je prihvatljivo za ovaj use case.

---

### OD-040 — Lična historija koristi postojeću activity_logs tabelu s filtrom po user_id

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
Lična historija aktivnosti zahtijeva podatke o akcijama korisnika. Pitanje je da li kreirati novu tabelu ili koristiti postojeći `activity_logs`.

**Razmatrane opcije:**
1. Nova tabela `user_activity_log` s drugačijom strukturom — duplicira podatke koji već postoje
2. Novi endpoint `GET /api/activity/mine` koji filtrira `activity_logs WHERE user_id = $1` — nema duplikacije

**Odabrana opcija:** Novi endpoint koji filtrira postojeću `activity_logs` tabelu

**Razlog izbora:**
Tabela `activity_logs` već bilježi sve korisničke akcije (`user_id`, `action`, `details`, `created_at`). Kreirati novu tabelu bi bila duplikacija. Jedina promjena je endpoint koji vraća subset za autentificiranog korisnika. Nema migracije — čisto backend i frontend dodavanje.

**Posljedice odluke:**
Admin logg stranica i korisnička historija dijele istu tabelu — admin vidi sve, korisnik samo svoje. Performansa je dobra jer `user_id` ima index.

---

### OD-041 — Hamburger menu s drawer umjesto separate mobile navigacije

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
Mobilna navigacija može biti implementirana kao bottom tab bar (native mobile pattern), hamburger s dropdown-om, ili hamburger s drawer-om koji klizi s lijeve/desne strane.

**Razmatrane opcije:**
1. Bottom tab bar — zahtijeva redesign navigacijske hijerarhije i odabir max 5 ikonica
2. Hamburger + dropdown menu — jednostavno ali zagušuje viewport
3. Hamburger + side drawer — standardan web pattern, poznato korisnicima, lako implementirati

**Odabrana opcija:** Hamburger dugme + side drawer (slide-in s desne strane)

**Razlog izbora:**
Aplikacija ima više od 5 navigacijskih stavki (naročito za admina) — bottom tab bar je neprikladan bez redizajna. Side drawer je standardan pattern koji React/CSS može implementirati bez biblioteka. Overlay darkens background, zatvaranje klikom van drawera.

**Posljedice odluke:**
Navbar komponenta dobiva breakpoint logiku. Drawer state managed lokalno u navigacijskoj komponenti. Nema promjena na backendu.

---

### OD-042 — Reports endpoint agregira podatke paralelno s Promise.all

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-31 |
| **Status** | Aktivna |

**Opis problema:**
Reports stranica zahtijeva više SQL upita: KPI agregati, top oprema, trend po periodu, breakdown statusa, top korisnici. Sekvencijalno izvršavanje produžuje response time.

**Razmatrane opcije:**
1. Sekvencijalni SQL upiti — jednostavan kod, spor (zbrajaju se svi latency-ji)
2. `Promise.all([q1, q2, q3, q4, q5])` — paralelni upiti, ukupno čeka najsporiji
3. Materijalizovane tabele / cache — kompleksno, preuranjeno za ovaj scope

**Odabrana opcija:** `Promise.all` za paralelne SQL upite (obrazac iz Statistics endpointa)

**Razlog izbora:**
Isti pattern već koristi `statistics.routes.js` uspješno. Svaki SQL upit je neovisan — nema razloga da čeka prethodni. Paralelno izvršavanje na connection poolu smanjuje ukupno response time na ~latency najsporijeg upita umjesto zbira svih. Nema dodatne kompleksnosti.

**Posljedice odluke:**
DB pool dobiva opterećenje od 5 paralelnih upita po reports pozivu. S pool max=3 moguće kratko čekanje, ali reports endpoint koriste rijetko (admin, ne u realtime). Prihvatljiv tradeoff.

---
