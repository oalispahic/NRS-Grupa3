# AI Usage Log — Sprint 9

> Dokument bilježi sve relevantne slučajeve korištenja AI alata tokom Sprint 9.
> Svrha je transparentnost i procjena zrelosti u korištenju alata, ne evaluacija tima.

---

## Unos 1 — Planiranje Sprint 9 i kreiranje Product Backlog V4

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Sprint** | Sprint 9 |
| **Alat** | Claude Code (Anthropic) — `/plan` komanda |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Analiza product backlog v3, identifikacija već implementiranih stavki (PB32, PB33, PB34, PB37, PB39), osmišljavanje 5 potpuno novih PB stavki i redefinicija PB21, te kreiranje `product_backlog_v4.md` u istom HTML-table formatu.

**Kratak opis upita:** Korisnik je zatražio da AI analizira Sprint 9 u product_backlog_v3.md, primijeti da su PB32/33/34/37/39 već implementirani, smisli nova zadatke koji doprinose sistemu i ažurira backlog. Posebno je traženo da PB21 (potrošnja repromaterijala) bude redefiniran jer originalna koncepcija nije bila jasna. Strogi uvjet: tačno 8 stavki po sprintu.

**Šta je AI predložio/generisao:**
- Inicijalni prijedlog: PB20, PB21 (redefiniran), PB22 + 5 novih stavki: foto opreme, lista čekanja, blokada termina, statistike po korisniku, upravljanje korisnicima
- Nakon korisnikove napomene (nema foto i liste čekanja): zamijenjeno s razlogom odbijanja (PB43), lokacijama (PB45), sigurnosnim napomenama (PB46)
- Nakon korisnikove napomene (blokada termina → nešto drugačije, statistike po korisniku → generalne): blokada termina zamjenjena upravljanjem korisnicima (PB44), statistike postale stranica grafova (PB47)
- Finalna lista: PB20, PB21, PB22, PB43, PB44, PB45, PB46, PB47 (28 story poena)
- `Sprint 9/product_backlog_v4.md` u HTML table formatu identičnom v3 predlošku

**Šta je tim prihvatio:** Finalna lista od 8 stavki; HTML table format; redefinicija PB21 kao jednostavnog stock managementa s logom promjena; PB43–PB47 kao nove stavke.

**Šta je tim izmijenio:** Tri iteracije planiranja prije finalnog odobrenja — tim je odbacio foto opreme, listu čekanja i blokadu termina te tražio izmjenu statistika po korisniku u generalne grafikone.

**Šta je tim odbacio:** Foto opreme (previše posla s podacima), lista čekanja (nepotrebna za ovaj sistem), blokada termina (zamijenjena upravljanjem korisnicima), statistike po korisniku (zamijenjene generalnom analitičkom stranicom).

**Rizici/problemi:** Inicijalni prijedlog je ponudio stavke koje su bile konceptualno bliske već implementiranim — tim je morao eksplicitno tražiti "samo nove, dosad neimplementirane stavke".

---

## Unos 2 — Implementacija backend modula (migracije, rute, servisi)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Sprint** | Sprint 9 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Kompletna backend implementacija za svih 8 Sprint 9 stavki — SQL migracije, repository sloj, servisna logika, controlleri i rute.

**Kratak opis upita:** Korisnik je zatražio implementaciju po uobičajenoj arhitekturi (repo → service → controller → route). AI je sam odlučio o redoslijedu: prvo migracije, zatim servisi koji nemaju zavisnosti, na kraju oni koji ovise o drugima.

**Šta je AI predložio/generisao:**

*Migracije (010–015):*
- `010_rejection_reason.sql` — ALTER TABLE reservations ADD COLUMN rejection_reason TEXT
- `011_safety_notes.sql` — ALTER TABLE equipment ADD COLUMN safety_notes TEXT
- `012_locations.sql` — CREATE TABLE locations + ALTER TABLE equipment ADD COLUMN location_id FK
- `013_user_active_field.sql` — ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE
- `014_system_settings.sql` — CREATE TABLE system_settings + INSERT 3 default vrijednosti
- `015_consumables.sql` — CREATE TABLE consumables + CREATE TABLE consumable_logs (s transakcijskim adjustQuantity)

*Novi backend moduli:*
- Lokacije: `location.repository.js`, `location.service.js`, `location.controller.js`, `location.routes.js`
- Settings: `settings.repository.js` s UPSERT, `settings.routes.js` (GET javno, PUT admin-only)
- Export: `export.routes.js` s CSV generacijom i BOM prefiksom, `Content-Disposition` headerom
- Consumables: `consumable.repository.js` (adjustQuantity transakcijski BEGIN/COMMIT), routes
- Statistics: `statistics.routes.js` s `Promise.all` za 4 paralelna upita

*Izmjene postojećih:*
- `reservation.repository.js` — `updateStatus` prima `rejectionReason`, `countActiveByUser`
- `reservation.service.js` — provjera 3 pravila iz `system_settings` pri kreiranju
- `notification.service.js` — razlog odbijanja u notifikacijskoj poruci
- `user.repository.js` — `findAll`, `setRole`, `setActive`
- `auth.service.js` — provjera `is_active === false` → 403
- `equipment.repository.js` — JOIN locations, `location_id` u create/update

**Šta je tim prihvatio:** Cijela arhitektura i implementacija.

**Šta je tim izmijenio:** Ništa značajno.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- Git push odbijen jer je remote imao divergirani commit — riješeno s `git pull --rebase origin main` pa `git push`.
- Eksport je inicijalno bio dizajniran s tokenom u URL-u (nebezbjednosno) — promijenjen u fetch+Blob pristup.

---

## Unos 3 — Implementacija frontend modula (5 novih stranica)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Sprint** | Sprint 9 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Bilal Ozdić |

**Svrha korištenja:** Kreiranje 5 novih admin stranica i integracija Sprint 9 funkcionalnosti u postojeće stranice.

**Kratak opis upita:** Korisnik je zatražio kompletnu frontend implementaciju za PB20, PB21, PB22, PB43, PB44, PB45, PB46, PB47 po uobičajenom inline CSS + lucide-react + theme.js principu.

**Šta je AI predložio/generisao:**

*Nove stranice:*
- `LocationsPage.jsx` — CRUD tabela s inline editom, potvrda pri brisanju
- `UsersAdminPage.jsx` — tabela + mobilne kartice, role dropdown, aktiviraj/deaktiviraj dugme, "Ja" labela za trenutnog korisnika (bez mogućnosti self-deaktivacije)
- `SettingsPage.jsx` — 3 numerička inputa za globalna ograničenja, forma za PUT /api/settings
- `ConsumablesPage.jsx` — CRUD lista repromaterijala, adjust modal (+ ili - s napomenom), expandabilan log, AlertTriangle za nisku zalihu
- `StatisticsPage.jsx` — 5 KPI kartica, horizontalni bar chart (top 7), pie chart (distribucija statusa), line chart (12-sedmični trend) koristeći `recharts`

*Izmjene postojećih stranica:*
- `ReservationsPage.jsx` — modal za unos razloga odbijanja, Export CSV dugme (fetch + blob)
- `MyReservationsPage.jsx` — crveni okvir s razlogom odbijanja za odbijene rezervacije
- `EquipmentDetailPage.jsx` — checkbox za sigurnosne upute (blokira rezervaciju), žuti info okvir s uputama
- `EquipmentListPage.jsx` — filter po lokacijama (chip styl), prikaz `location_name` na karticama
- `ManageEquipmentPage.jsx` — dropdown za lokaciju, textarea za sigurnosne napomene, Export CSV dugme

*Infrastruktura:*
- `App.jsx` — 5 novih ruta
- `AdminLayout.jsx` — 5 novih nav stavki s ikonama

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- `recharts` je bio potreban za StatisticsPage — instaliran kao dependency (`recharts@3.8.1`).
- Edit tool je nekoliko puta imao grešku "string not found" zbog preciznosti old_string parametra — riješeno pažljivim čitanjem exact sadržaja fajla.

---

## Unos 4 — Pokretanje SQL migracija 010–015 na Supabase

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Sprint** | Sprint 9 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Primjena 6 novih SQL migracija na produkcijsku Supabase bazu podataka.

**Kratak opis upita:** Nakon završetka implementacije, korisnik je zatražio pokretanje migracija. Korišten je isti Node.js workaround kao u Sprintu 8 (pg paket iz backend direktorija).

**Šta je AI predložio/generisao:**
- Pokretanje privremenog `run_migrations.js` skripta koji sekvencionalno primjenjuje migracije 010–015
- Provjera uspješnog izvršavanja svake migracije

**Šta je tim prihvatio:** Node.js workaround za pokretanje migracija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema — sve migracije su koristile `IF NOT EXISTS` pattern koji osigurava idempotentnost.

---

## Sumarni pregled

| # | Opis | Alat | Prihvaćeno | Izmijenjeno | Odbačeno | Greška AI-a |
|---|---|---|---|---|---|---|
| 1 | Sprint 9 planiranje i Product Backlog V4 | Claude Code | ✅ | 3 iteracije planiranja | Foto, lista čekanja, blokada termina, statistike po korisniku | Inicijalni prijedlog uključivao bliske ionako implementirane koncepte |
| 2 | Backend implementacija (6 migracija, 5 novih modula, izmjene) | Claude Code | ✅ | — | — | CSV eksport inicijalno s tokenom u URL-u (sigurnosni propust, odmah ispravljen) |
| 3 | Frontend (5 novih stranica + izmjene 5 postojećih) | Claude Code | ✅ | — | — | Edit tool "string not found" višekratno (minor, odmah riješeno) |
| 4 | Pokretanje DB migracija na Supabase | Claude Code | ✅ | — | — | — |

**Ukupno zabilježenih slučajeva:** 4
**Korišteni AI alati:** Claude Code (Anthropic)
**Greške AI-a:** 2 (sigurnosni propust u CSV eksportu — URL token; Edit tool greška — oboje odmah uočeni i ispravljeni)
**Kritičnih grešaka:** 0
