# Test Summary / QA Izvještaj — LabManager

**Datum:** Juni 2026 (Sprint 12)  
**Verzija:** 1.0.0

---

## 1. Vrste testova

### Automatizovani testovi (Jest + Supertest)

Lokacija: `project/backend/tests/`

13 test fajlova koji pokrivaju backend servisni i middleware sloj:

| Test fajl | Što testira |
|---|---|
| `auth.service.test.js` | Registracija, login, JWT generisanje, bcrypt validacija |
| `auth.middleware.test.js` | Provjera JWT tokena, uloga (requireRole), zaštita ruta |
| `equipment.service.test.js` | CRUD opreme, validacija statusa, COALESCE update |
| `reservation.service.test.js` | Kreiranje rezervacije, konflikt detekcija, otkazivanje, izmjena |
| `user.service.test.js` | Profil korisnika, izmjena podataka, promjena lozinke |
| `location.service.test.js` | CRUD lokacija, FK provjera pri brisanju |
| `notification.service.test.js` | Kreiranje notifikacija, mark-as-read |
| `activity.service.test.js` | Log unosa, paginacija, korisnik-filtriranje |
| `rating.service.test.js` | Validacija ocjene (završena rezervacija, bez duplikata) |
| `tag.service.test.js` | Kreiranje tagova, dodjela opremi, json_agg agregacija |
| `waitlist.controller.test.js` | Dodavanje/brisanje s waitliste, pozicija u redu |
| `maintenance.controller.test.js` | Kreiranje taskova, dodjela, status workflow |
| `messages.routes.test.js` | Inbox, unread count, slanje poruka, RBAC provjere |

### Pokretanje automatizovanih testova

```bash
cd project/backend

# Svi testovi
npm test

# S coverage izvještajem
npm run test:coverage

# Jedan fajl
npx jest tests/reservation.service.test.js --verbose
```

**Napomena:** Testovi koriste mock `pg` connection — ne zahtijevaju aktivnu bazu.

---

## 2. Rezultati automatizovanih testova

Testovi su pisani za ključne servise i middleware.

**Pokretanje testova (lokalno, Juni 2026):**

```
Test Suites: 13 passed, 13 total
Tests:       47 passed, 47 total
Snapshots:   0 total
Time:        3.2s
```

**Ključni testirani scenariji:**

| Kategorija | Testovano | Rezultat |
|---|---|---|
| Login s ispravnim kredencijalima | Vraća JWT token | ✅ Pass |
| Login s neispravnom lozinkom | Vraća 401 | ✅ Pass |
| Kreiranje rezervacije za slobodan termin | Uspješno kreira | ✅ Pass |
| Kreiranje rezervacije za zauzeti termin | Vraća grešku konflikta | ✅ Pass |
| Zaštićena ruta bez tokena | Vraća 401 | ✅ Pass |
| Admin ruta s laborant tokenom | Vraća 403 | ✅ Pass |
| Ocjena bez završene rezervacije | Vraća grešku validacije | ✅ Pass |
| Slanje poruke autentifikovanim korisnikom | Kreira poruku | ✅ Pass |

---

## 3. Ručno testirani korisnički tokovi

Svi ključni korisnički tokovi su ručno testirani u produkciji (`https://nrs.marexdev.com`) i lokalno.

### Autentifikacija i autorizacija

| Tok | Uloge | Rezultat |
|---|---|---|
| Registracija novog korisnika | Svi | ✅ Radi |
| Login s ispravnim podacima | Admin, Laborant | ✅ Radi |
| Login s neispravnim podacima | Svi | ✅ Prikazuje grešku |
| Pristup admin stranici kao laborant | Laborant | ✅ Vraća na dashboard |
| Logout | Svi | ✅ Briše sesiju, redirect na login |
| Deaktiviran nalog — pokušaj prijave | — | ✅ Vraća 403 |

### Rezervacijski workflow

| Tok | Uloge | Rezultat |
|---|---|---|
| Kreiranje rezervacije (slobodan termin) | Laborant | ✅ Status "Na čekanju" |
| Kreiranje rezervacije (zauzet termin) | Laborant | ✅ Prikazuje grešku konflikta |
| Rezervacija s isteklim sigurnosnim checkbox-om | Laborant | ✅ Dugme disabled bez checkboxa |
| Odobravanje rezervacije | Admin | ✅ Status "Odobren", notifikacija poslana |
| Odbijanje rezervacije s razlogom | Admin | ✅ Razlog vidljiv korisniku |
| Otkazivanje vlastite rezervacije | Laborant | ✅ Status "Otkazan" |
| Izmjena datuma rezervacije | Laborant | ✅ Novi datumi prihvaćeni |
| Stavljanje na waitlist | Laborant | ✅ Pozicija u redu vidljiva |

### Upravljanje opremom

| Tok | Uloge | Rezultat |
|---|---|---|
| Dodavanje novog aparata | Admin | ✅ Pojavljuje se na listi |
| Izmjena aparata (status, lokacija) | Admin | ✅ Odmah vidljivo |
| Dodjela taga aparatu | Admin | ✅ Chip vidljiv na karticama |
| Pretraga po imenu | Svi | ✅ Filtrira u realnom vremenu |
| Filter po tagu | Svi | ✅ Chip klik filtrira |
| Komparacija 2 aparata | Svi | ✅ Modal s tabelom |
| QR kod generiranje | Admin | ✅ Modal, PNG download |

### Komunikacija

| Tok | Uloge | Rezultat |
|---|---|---|
| Slanje poruke adminu | Laborant | ✅ Poruka dostavljena, notifikacija |
| Admin odgovor na poruku | Admin | ✅ Vidljivo u chatu korisnika |
| Broadcast obavijest svim korisnicima | Admin | ✅ Vidljiva u Obavijesti tabu |
| Equipment inquiry s kontekstom | Laborant | ✅ Equipment chip u compose formi |

### Administracija

| Tok | Uloge | Rezultat |
|---|---|---|
| Promjena role korisnika | Admin | ✅ Odmah aktivno |
| Deaktivacija korisnika | Admin | ✅ Deaktivirani ne mogu se prijaviti |
| Kreiranje maintenance taska | Admin | ✅ Vidljivo u "Moji zadaci" dodijeljenog korisnika |
| Dodavanje repromaterijala | Admin | ✅ Pojavljuje se s alert za nisku zalihu |
| Adjust zalihe s napomenom | Admin | ✅ Log promjene kreiran |
| Eksport CSV | Admin | ✅ Preuzima se fajl s UTF-8 BOM |
| Generisanje izvještaja | Admin | ✅ KPI kartice i grafikoni se rendiraju |

---

## 4. Ključni korisnički tokovi koji su posebno provjereni

### Tok 1: Kompletni rezervacijski ciklus

```
Laborant se prijavljuje → pregledava opremu → kreira rezervaciju → 
čeka odobrenje → dobija notifikaciju → koristi opremu → 
(opcije: ocjenjuje / šalje pitanje / otkazuje)
```
**Rezultat:** ✅ Svi koraci funkcionalni end-to-end

### Tok 2: Admin upravljanje

```
Admin se prijavljuje → vidi dashboard s pending rezervacijama → 
odbija jednu (s razlogom) → odobrava drugu → 
laborant dobija notifikacije → admin vidi u activity logu
```
**Rezultat:** ✅ Svi koraci funkcionalni

### Tok 3: Messaging workflow

```
Laborant klikne "Pošalji pitanje adminu" na opremi → 
equipment kontekst se prenosi → laborant piše pitanje → 
šalje → admin vidi u inbox-u s unread badge-om → 
admin odgovara → laborant vidi odgovor
```
**Rezultat:** ✅ Svi koraci funkcionalni (uz 30s polling delay)

---

## 5. Poznati testni propusti

1. **Frontend nema automatizovane testove** — React komponente nisu testirane s Jest/Testing Library. Kompletno ručno testiranje provedeno.
2. **Coverage nije izmjeren za sve servise** — Coverage je ~40-50% (procjena), daleko ispod NFR-12 cilja od 80%.
3. **Integration testovi nedostaju** — Testovi mockiraju bazu; nema end-to-end testova koji pogađaju pravu Supabase bazu.
4. **Nema load testova** — NFR-19 (200 concurrent users) nije verifikovan; sistem je testiran samo s manualnim individualnim korisnicima.
5. **Timezone edge cases nisu sistemski testirani** — Rezervacije oko ponoći (UTC transition) nisu eksplicitno testirane.
6. **Polling timing nije automatizovano testiran** — 30s polling interval za notifikacije i chat nije pokriven testovima.

---

## 6. Screenshot / dokaz testiranja

Produkcijska aplikacija je dostupna i može se verificirati na:
- **Login stranica:** https://nrs.marexdev.com/login
- **Health check:** https://api.nrs.marexdev.com/api/health → `{"status":"ok"}`
- **Demo korisnici:** `admin2/admin123` i `korisnik1/korisnik123`

```bash
# Verifikacija backend zdravlja:
curl https://api.nrs.marexdev.com/api/health
# Rezultat: {"status":"ok"}

# Verifikacija login endpointa:
curl -X POST https://api.nrs.marexdev.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin2","password":"admin123"}'
# Rezultat: {"token":"eyJ...","user":{"id":...,"username":"admin2","role":"admin"}}
```
