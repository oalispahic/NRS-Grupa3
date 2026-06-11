# Završni izvještaj o radu tima — LabManager

**Projekat:** Sistem za upravljanje medicinskom laboratorijskom opremom  
**Tim:** Grupa 3 — NRS kurs, ETF Sarajevo  
**Period rada:** Sprint 1–12 (april–juni 2026)  
**Verzija dokumenta:** 1.0 (Sprint 12)

---

## 1. Svrha projekta

**LabManager** je web-bazirana platforma za centralizovano upravljanje laboratorijskom opremom u medicinskim i istraživačkim laboratorijima. Sistem omogućava digitalnu evidenciju aparata, online rezervacije termina, workflow odobravanje, praćenje statusa opreme u realnom vremenu, upravljanje potrošnim materijalom te direktnu komunikaciju između laboranata i administratora.

---

## 2. Problem koji sistem rješava

Laboratoriji tipično upravljaju opremom kroz neformalne kanale — email, WhatsApp, fizičke liste. Ovo uzrokuje:

- **Dupla rezervacija** — dvije osobe rezervišu isti aparat u istom terminu
- **Nevidljivost statusa** — niko ne zna je li aparat slobodan, na servisu ili pokvarjen
- **Gubitak podataka** — historija korištenja, servisnih pregleda i potrošnje materijala nije centralizovana
- **Administrativno opterećenje** — ručno praćenje tko koristi šta i kada

LabManager rješava sve navedeno kroz jedinstvenu web aplikaciju dostupnu s bilo kojeg uređaja, bez instalacije.

---

## 3. Glavne korisničke uloge

| Uloga | Opis | Ključne akcije |
|---|---|---|
| **Laborant** | Istraživač koji koristi opremu | Pregled opreme, rezervacija termina, otkazivanje/izmjena rezervacije, praćenje vlastitih aktivnosti, komunikacija s adminima |
| **Administrator** | Šef laboratorije ili IT admin | Odobravanje/odbijanje rezervacija, upravljanje opremom i korisnicima, maintenance task management, uvid u statistike, slanje broadcast obavijesti |

---

## 4. Glavne implementirane funkcionalnosti

### Autentifikacija i autorizacija
- Registracija s username (ne mora biti email format)
- JWT-based login/logout s 8h session trajanjem
- Role-based access control (RBAC): laborant / admin / test uloga
- Provjera aktivnosti korisnika (`is_active` flag)

### Upravljanje opremom
- Lista svih aparata s pretragom (naziv, model, proizvođač, lokacija)
- Detaljna kartica opreme: servisni podaci, garancija, sigurnosne napomene
- Tagovi po opremi s filter chipovima
- Status mozaik na dashboardu (18×18px kvadratić po aparatu)
- Komparacija 2-3 aparata u full-screen modalu
- QR kod po aparatu (react-qr-code, PNG download)
- Fizičke lokacije/prostorije — dodjela opremi

### Rezervacijski sistem
- Vizualni kalendar zauzeća (crveno = zauzeto, zeleno = odabrani interval)
- Konflikt provjera na backend sloju (server-side validacija)
- Workflow: pending → approved/rejected (s razlogom odbijanja)
- Otkazivanje i izmjena datuma postojeće rezervacije
- Globalna ograničenja: maks. trajanje, maks. dana unaprijed, maks. istovremenih
- Waitlist s automatskom notifikacijom kad aparat postane slobodan
- Sigurnosne napomene — obavezni checkbox pri rezervaciji opreme koja ih ima

### Notifikacije i komunikacija
- In-app notifikacijski bell s polling (30s) i unread badge
- Notifikacije pri odobravanju i odbijanju rezervacije
- Direktni chat laborant ↔ administratori (mjehurić sučelje)
- Admin inbox s pregledom svih konverzacija
- Equipment inquiry — pitanje o specifičnoj opremi s kontekstom
- Broadcast obavijesti od admina svim korisnicima

### Administracija
- CRUD upravljanje opremom (dodavanje, izmjena, brisanje, tagovi)
- Upravljanje korisnicima (promjena role, deaktivacija/reaktivacija)
- Inventar repromaterijala s logom promjena i upozorenjem za nisku zalihu
- Maintenance task management (kreiranje, dodjela, prioritet, status)
- Activity log — nepromijenljivi zapis svih akcija u sistemu

### Analitika i izvještaji
- Stranica statistike: KPI kartice, bar chart (top 7 opreme), pie chart (status distribucija), line chart (12-sedmični trend)
- Izvještaji s date range filterom i PDF eksportom (window.print())
- CSV eksport liste opreme i rezervacija (s UTF-8 BOM)
- Lična historija aktivnosti s filter po tipu akcije

### UX
- Responsive dizajn (≤768px: hamburger drawer, single-column grid)
- Favoriti opreme (srce ikona, posebna lista)
- Brzi pregled opreme (modal bez napuštanja liste)
- Dashboard: status mozaik, 7-dnevni timeline, KPI kartice

---

## 5. Pregled rada kroz sprintove

| Sprint | Cilj | Ključne isporuke | SP |
|---|---|---|---|
| 1 | Vizija i planiranje | Product vision, team charter, stakeholder mapa, backlog | — |
| 2 | Zahtjevi | 26 user storija, acceptance criteria, 20 NFR, backlog v2 | — |
| 3 | Dizajn | Arhitektura, domain model, risk register, test strategija | — |
| 4 | Setup | Repo struktura, definicija done, skeleton projekta | — |
| 5 | Osnove | Auth sistem, 7 frontend stranica, 3 API modula, Vercel deployment | ~21 |
| 6 | Kontrola | Registracija, RBAC, merge konflikt, frontend polish | ~16 |
| 7 | Rezervacije | Kalendar, pretraga/filtriranje, otkazivanje/izmjena, sidebar | ~26 |
| 8 | Administracija | Notifikacije, activity log, tagovi, profil, dashboard mozaik | ~26 |
| 9 | Proširenje | CSV export, repromaterijal, korisnici, lokacije, razlog odbijanja, statistike | ~28 |
| 10 | Finalizacija | Izvještaji, maintenance, waitlist, QR kod, responsive, komparacija | ~26 |
| 11 | Komunikacija | Direktne poruke, equipment inquiry, broadcast obavijesti | ~10 |
| 12 | Isporuka | Završna dokumentacija (ovaj sprint) | — |

**Ukupno isporučeno:** ~54 backlog stavke, ~153 story poena (Sprint 5–11)

---

## 6. Šta je završeno, djelimično završeno ili nije završeno

### Završeno (Done) — 54 stavke
Sve stavke iz product backlog v6 označene su kao **Done**. Kompletna lista s PB1–PB54 dostupna je u `05_product_backlog_status.md`.

Ključne završene grupe:
- Cijeli rezervacijski workflow (kreiranje → odobravanje → otkazivanje → izmjena)
- Kompletan RBAC sistem
- Kompletna administracija (oprema, korisnici, lokacije, inventar, maintenance)
- Sva analitika i izvještaji
- Komunikacijski sistem (chat, broadcast, inquiry)
- Responsive dizajn za sve stranice

### Djelimično završeno (Partially Done)
- **Email notifikacije** — in-app notifikacije su implementirane, ali slanje emailova nije. Nije bilo u opsegu niti jednog sprinta.
- **Napredna pretraga (server-side)** — klijentsko filtriranje implementirano, server-side pretraga s query parametrima nije (odložena kao nepotrebna za trenutni obim podataka).

### Nije završeno (Not Done)
- **Upload fajlova** — upload tehničke dokumentacije po aparatu (T7.5) — procijenjen kao preopširno u dostupnom vremenu.
- **WebSocket real-time** — messaging koristi polling (30s interval), ne WebSocket. Serverless hosting ne podržava persistent connections.
- **PDF attachments u porukama** — nije bilo u opsegu.
- **httpOnly cookie za JWT** — JWT se čuva u sessionStorage umjesto httpOnly cookie. Odloženo od Sprint 5, nikad implementirano.

---

## 7. Glavne tehničke odluke

| Odluka | Odabrano | Alternativa | Razlog |
|---|---|---|---|
| Backend arhitektura | Monolith (Express) | Microservices | Jednostavnost, manji tim, dovoljno za obim projekta |
| Autentifikacija | JWT + sessionStorage | httpOnly cookie | Brža implementacija; sigurnosni rizik dokumentiran |
| Baza podataka | PostgreSQL (Supabase) | MongoDB | ACID transakcije, kompleksni JOIN-ovi za rezervacije |
| Konflikt rezervacija | Server-side validacija | Client-side | Pouzdanost; klijent se ne može zaobići |
| Audit log | Append-only tabela | Soft delete pattern | Nepromjenjivost je zahtjev za auditabilnost |
| Hosting | Vercel (frontend + backend) | AWS, Railway | Besplatni tier, automatski deployment, jednostavan setup |
| Frontend state | React Context API | Redux/Zustand | Dovoljan za veličinu aplikacije; manje boilerplate |
| Pretraga opreme | Client-side filtriranje | Server-side query | 60-75 aparata u bazi; mreža nije bottleneck |
| Messaging real-time | Polling (30s) | WebSocket | Vercel serverless ne podržava WebSocket |
| CSS pristup | Inline CSS + theme.js tokeni | CSS-in-JS/Tailwind | Nema build dependency, direktna kontrola stilova |

---

## 8. Najveći problemi tokom razvoja i način rješavanja

### Problem 1: Vercel proxy u produkciji
**Simptom:** "Unexpected end of JSON input" pri loginu na produkciji  
**Uzrok:** Vite dev proxy (`/api/*` → localhost:3001) radi samo lokalno. U produkciji frontend šalje API zahtjeve na isti domain koji vraća HTML umjesto JSON-a.  
**Rješenje:** Dodan `vercel.json` rewrite na frontend koji preusmjerava `/api/*` na backend Vercel URL.

### Problem 2: JWT `expiresIn` greška
**Simptom:** `"expiresIn" should be a number of seconds or string representing a timespan`  
**Uzrok:** `JWT_EXPIRES_IN` env varijabla na Vercelu imala nevažeću vrijednost (prazan string ili razmak).  
**Rješenje:** Promjena fallback vrijednosti u kodu na `'8h'` + brisanje pogrešno postavljene env varijable na Vercelu.

### Problem 3: Neispravan bcrypt hash
**Simptom:** "Invalid credentials" pri loginu admin korisnika kreiranog direktno u bazi  
**Uzrok:** AI je generisao ručno napisan bcrypt hash koji nije bio validan.  
**Rješenje:** Hash generiran programski `bcrypt.hash()` i SQL UPDATE izvršen. **Pouka:** bcrypt hashovi se nikad ne pišu ručno.

### Problem 4: Event propagation bug u kalendaru
**Simptom:** Klik na datum u kalendaru aktivirao je i submit formi za rezervaciju ispod.  
**Uzrok:** Click event se propagirao na parent container koji je imao onClick handler.  
**Rješenje:** Dodan `e.stopPropagation()` na sve klik handlere dana u kalendaru.

### Problem 5: Routing konflikt na backendu
**Simptom:** `GET /api/reservations/current` uvijek vraćao 404 (tretiran kao `:id = 'current'`)  
**Uzrok:** Express route registriran *iza* `GET /reservations/:id`.  
**Rješenje:** Specifičnija ruta (`/current`) mora biti registrirana *ispred* parametarske rute.

### Problem 6: NotificationBell token pristup
**Simptom:** Notifikacijski bell nije fetchair unread count — `user._token` je bio undefined.  
**Uzrok:** Token iz AuthContext nije direktno dostupan u child komponentama — trebalo ga proslijediti kao prop.  
**Rješenje:** `AdminLayout` eksplicitno proslijeđuje token kao prop u `NotificationBell`.

### Problem 7: Merge konflikti (PR #5)
**Simptom:** `feature/pb7-oprema` imala konflikte s `main` granom.  
**Uzrok:** Paralelna izmjena istih fajlova na dvije grane.  
**Rješenje:** GitHub Copilot automatski riješio konflikte u `equipment.service.js` i `EquipmentDetailPage.jsx` bez gubitka funkcionalnosti.

---

## 9. Šta bi tim unaprijedio da se projekat nastavlja

1. **httpOnly cookie umjesto sessionStorage** — JWT u sessionStorage je podložan XSS napadima. Prioritetna sigurnosna izmjena.
2. **Email notifikacije** — Integracija sa SendGrid ili Nodemailer za slanje emailova pri odobravanju/odbijanju rezervacija.
3. **WebSocket ili Server-Sent Events** — Za pravo real-time messaging umjesto polling-a (zahtijeva migraciju s Vercel serverless na Railway, Render ili sličan hosting).
4. **Upload fajlova** — Tehnička dokumentacija, slike aparata, PDF uputstva — Supabase Storage ili AWS S3.
5. **Formalizacija `test` role** — Trenutno se kreira direktno u SQL-u bez ENUM constrainta. Trebalo bi biti formalni dio sheme.
6. **Paginacija na serverskom nivou** — Broj opreme raste; client-side filtriranje 500+ aparata postaje sporo.
7. **Automatska deaktivacija rezervacija** — Kad admin deaktivira korisnika, njegove aktivne rezervacije trebale bi biti automatski otkazane.
8. **Rate limiting** — Na `/api/auth/login` endpointu za zaštitu od brute-force napada.
9. **Proper test coverage** — Trenutno pokriva samo kritične servise; trebalo bi imati ≥80% coverage (NFR-12).
10. **i18n** — Lokalizacija za engleski jezik (NFR-20 predviđen ali nije implementiran).
