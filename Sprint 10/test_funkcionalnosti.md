# Test funkcionalnosti — Sprint 10

> **Sprint 10** · 31.05.2026.  
> Scenariji testiranja za svih 7 user storija implementiranih u Sprint 10.

---

## Backend testovi

### T-BE-32 — Reports endpoint

**Fajl:** `project/backend/tests/reports.test.js`

| ID | Scenario | Ulaz | Očekivani izlaz | Status |
|---|---|---|---|---|
| T-BE-32.1 | Uspješan dohvat izvještaja za period | `GET /api/reports?from=2026-01-01&to=2026-05-31` + admin JWT | 200, JSON s kpi/topEquipment/trend/statusBreakdown/topUsers | ✅ |
| T-BE-32.2 | Nedostaje from parametar | `GET /api/reports?to=2026-05-31` | 400 Bad Request | ✅ |
| T-BE-32.3 | Neautentifikovani zahtjev | Bez JWT | 401 Unauthorized | ✅ |
| T-BE-32.4 | Non-admin zahtjev | Korisnik JWT | 403 Forbidden | ✅ |
| T-BE-32.5 | Prazan period (nema rezervacija) | `from=to=2026-01-01` | 200, prazni nizovi, kpi = 0 | ✅ |

---

### T-BE-33 — Maintenance tasks endpoint

**Fajl:** `project/backend/tests/maintenance.test.js`

| ID | Scenario | Ulaz | Očekivani izlaz | Status |
|---|---|---|---|---|
| T-BE-33.1 | Admin kreira task | `POST /api/maintenance` s validnim podacima | 201, task objekat | ✅ |
| T-BE-33.2 | Dodjela nepostojećem korisniku | `assigned_to: 99999` | 400 Bad Request | ✅ |
| T-BE-33.3 | Korisnik dohvata svoje taskove | `GET /api/maintenance/mine` + korisnik JWT | 200, lista taskova za tog korisnika | ✅ |
| T-BE-33.4 | Korisnik mijenja status taska | `PATCH /api/maintenance/:id/status` + `{status: 'completed'}` | 200, ažurirani task | ✅ |
| T-BE-33.5 | Korisnik ne može promijeniti tuđi task | Drugi korisnik JWT | 403 Forbidden | ✅ |
| T-BE-33.6 | Admin briše task | `DELETE /api/maintenance/:id` + admin JWT | 204 No Content | ✅ |

---

### T-BE-34 — Activity mine endpoint

**Fajl:** `project/backend/tests/activity.test.js`

| ID | Scenario | Ulaz | Očekivani izlaz | Status |
|---|---|---|---|---|
| T-BE-34.1 | Korisnik dohvata svoju historiju | `GET /api/activity/mine` + korisnik JWT | 200, lista logova za tog korisnika | ✅ |
| T-BE-34.2 | Logovi nisu drugog korisnika | Provjera da nema tuđih logova u odgovoru | 200, svi user_id = logged user | ✅ |
| T-BE-34.3 | Neautentifikovani zahtjev | Bez JWT | 401 Unauthorized | ✅ |

---

### T-BE-37 — Waitlist endpointi

**Fajl:** `project/backend/tests/waitlist.test.js`

| ID | Scenario | Ulaz | Očekivani izlaz | Status |
|---|---|---|---|---|
| T-BE-37.1 | Korisnik se stavlja na waitlist | `POST /api/equipment/:id/waitlist` | 201, waitlist entry | ✅ |
| T-BE-37.2 | Duplikat waitlist entry | Isti korisnik, ista oprema | 409 Conflict | ✅ |
| T-BE-37.3 | Korisnik se uklanja s waitliste | `DELETE /api/equipment/:id/waitlist` | 204 No Content | ✅ |
| T-BE-37.4 | Dohvat pozicije korisnika | `GET /api/equipment/:id/waitlist` + korisnik JWT | 200, {position: 1, total: 3} | ✅ |
| T-BE-37.5 | Admin vidi cijelu listu | `GET /api/equipment/:id/waitlist` + admin JWT | 200, lista svih korisnika | ✅ |
| T-BE-37.6 | Notifikacija pri promjeni statusa u available | Admin `PATCH /api/equipment/:id` s `{status: 'available'}` | Notifikacije kreirane za sve na waitlisti | ✅ |

---

## Frontend testovi

### T-FE-32 — ReportsPage

**Fajl:** `project/frontend/src/pages/admin/ReportsPage.jsx`

| ID | Scenario | Akcija | Očekivano | Status |
|---|---|---|---|---|
| T-FE-32.1 | Stranica se učitava | Navigate na `/admin/reports` | 5 KPI kartica, date picker, "Generiraj" dugme | ✅ |
| T-FE-32.2 | Generisanje izvještaja | Odaberi period, klikni "Generiraj" | Bar chart, line chart, tabele se popunjavaju | ✅ |
| T-FE-32.3 | PDF eksport | Klikni "Exportuj PDF" | Otvara se print dijalog | ✅ |
| T-FE-32.4 | Print CSS | Otvori print preview | Navigacija skrivena, samo report sadržaj | ✅ |
| T-FE-32.5 | Prazan period | Period s 0 rezervacija | "Nema podataka" u chartovima | ✅ |

---

### T-FE-33 — MaintenancePage + MyTasksPage

| ID | Scenario | Akcija | Očekivano | Status |
|---|---|---|---|---|
| T-FE-33.1 | Admin vidi taskove | Navigate na `/admin/maintenance` | Lista svih taskova s filterima | ✅ |
| T-FE-33.2 | Kreiranje taska | Popuni formu, klikni "Kreiraj" | Task se pojavljuje u listi | ✅ |
| T-FE-33.3 | Filter po statusu | Odaberi "open" | Prikazuju se samo otvoreni taskovi | ✅ |
| T-FE-33.4 | Korisnik vidi My Tasks | Navigate na `/my-tasks` | Timeline dodijeljenih taskova | ✅ |
| T-FE-33.5 | Označi kao završeno | Klikni "Označi kao završeno" | Status se mijenja u "completed", task premješten | ✅ |
| T-FE-33.6 | Priority badge bojanje | Task s prioritetom "urgent" | Crveni badge | ✅ |

---

### T-FE-34 — MyActivityPage

| ID | Scenario | Akcija | Očekivano | Status |
|---|---|---|---|---|
| T-FE-34.1 | Stranica se učitava | Navigate na `/my-activity` | Timeline aktivnosti korisnika | ✅ |
| T-FE-34.2 | Filter po tipu | Odaberi "Rezervacije" | Samo rezervacijske akcije vidljive | ✅ |
| T-FE-34.3 | Relativni timestamp | Pregled liste | "Prije 2 dana", "Jučer" format | ✅ |
| T-FE-34.4 | Hover timestamp | Hover na relativni tekst | Tooltip s apsolutnim datumom i vremenom | ✅ |
| T-FE-34.5 | Prazna historija | Novi korisnik bez akcija | "Nemate aktivnosti" poruka | ✅ |

---

### T-FE-35 — Responsive dizajn

| ID | Scenario | Viewport | Očekivano | Status |
|---|---|---|---|---|
| T-FE-35.1 | Hamburger menu | 375px | Hamburger ikonica vidljiva, desktop nav skrivena | ✅ |
| T-FE-35.2 | Drawer otvaranje | 375px, klik na hamburger | Drawer se otvara s desne strane | ✅ |
| T-FE-35.3 | Drawer zatvaranje | Klik van drawera | Drawer se zatvara | ✅ |
| T-FE-35.4 | Equipment lista | 375px | Single-column card grid | ✅ |
| T-FE-35.5 | Admin tabele | 375px | Horizontalni scroll | ✅ |
| T-FE-35.6 | Equipment modal | 375px | Full-screen modal | ✅ |
| T-FE-35.7 | Touch targets | 375px | Sva dugmad min 44px visina | ✅ |

---

### T-FE-36 — Komparacija opreme

| ID | Scenario | Akcija | Očekivano | Status |
|---|---|---|---|---|
| T-FE-36.1 | Dodavanje u komparator | Klikni "+" na kartici | Floating bar se pojavljuje s "1 stavka odabrana" | ✅ |
| T-FE-36.2 | Max 3 stavke | Pokušaj dodati 4. stavku | "+" dugme disabled na preostalim karticama | ✅ |
| T-FE-36.3 | Otvaranje usporedbe | Klikni "Poredi 2 ▶" | Full-screen modal s tabelom | ✅ |
| T-FE-36.4 | Sadržaj usporedbe | Provjera sadržaja | Model, status badge, lokacija, ocjena, tagovi, safety, servis | ✅ |
| T-FE-36.5 | Rezerviraj iz komparacije | Klikni "Rezerviraj" u modalu | Navigate na EquipmentDetailPage | ✅ |
| T-FE-36.6 | Zatvaranje komparatora | Klikni X na floating baru ili modalu | Floating bar se skriva, odabir se briše | ✅ |

---

### T-FE-37 — Waitlist UI

| ID | Scenario | Akcija | Očekivano | Status |
|---|---|---|---|---|
| T-FE-37.1 | Dugme za zauzetu opremu | EquipmentDetailPage, status "reserved" | Vidljivo "Stavi na listu čekanja" dugme | ✅ |
| T-FE-37.2 | Dugme za slobodnu opremu | EquipmentDetailPage, status "available" | Waitlist dugme nije vidljivo | ✅ |
| T-FE-37.3 | Stavljanje na listu | Klikni dugme | Badge "Na listi čekanja (pozicija 1)" se pojavljuje | ✅ |
| T-FE-37.4 | Uklanjanje s liste | Klikni "Ukloni s liste" | Badge nestaje | ✅ |
| T-FE-37.5 | Waitlist notifikacija | Admin promijeni status u "available" | In-app notifikacija korisniku | ✅ |

---

### T-FE-38 — QR kod

| ID | Scenario | Akcija | Očekivano | Status |
|---|---|---|---|---|
| T-FE-38.1 | QR dugme na kartici | ManageEquipmentPage | "QR" dugme vidljivo na svakoj kartici opreme | ✅ |
| T-FE-38.2 | Otvaranje modala | Klikni "QR" | Modal s QR kodom i URL-om ispod | ✅ |
| T-FE-38.3 | QR sadržaj | Provjera dekodiranog QR-a | URL `{APP_URL}/equipment/:id` | ✅ |
| T-FE-38.4 | PNG download | Klikni "Preuzmi PNG" | Fajl se preuzima kao `qr-{naziv}.png` | ✅ |
| T-FE-38.5 | QR skeniranje | Skeniraj mobilnim | Otvara EquipmentDetailPage bez login-a | ✅ |

---

## Regresijski testovi (prethodni sprintovi)

| Oblast | Test | Status |
|---|---|---|
| Autentifikacija | Login/logout, JWT refresh | ✅ |
| Rezervacije | Kreiranje, odobravanje, odbijanje s razlogom | ✅ |
| Upravljanje opremom | CRUD, tagovi, lokacija, safety notes | ✅ |
| Statistike | KPI kartice, bar/line/donut chart | ✅ |
| Notifikacije | Bell ikonica, in-app poruke | ✅ |
| CSV eksport | Rezervacije i oprema export | ✅ |
| Repromaterijal | Inventar, upozorenja na nisku zalihu | ✅ |
| Upravljanje korisnicima | Promjena uloge, deaktivacija | ✅ |
