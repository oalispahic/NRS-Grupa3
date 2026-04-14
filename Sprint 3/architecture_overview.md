# Architecture Overview

## Sistem za upravljanje medicinskom laboratorijskom opremom

---

## 1. Kratak opis arhitektonskog pristupa

Sistem koristi **troslojnu (three-tier) klijent-server arhitekturu** sa jasnim razdvajanjem odgovornosti između prezentacijskog sloja (frontend), poslovne logike (backend) i sloja podataka (baza). Komunikacija između frontenda i backenda odvija se putem **RESTful API-ja**, čime se osigurava labava spregnutost (loose coupling) komponenti i mogućnost nezavisnog razvoja i deployementa.

Ovaj pristup je odabran iz sljedećih razloga:

- **Jednostavnost implementacije** — tim od 9 članova sa ograničenim iskustvom može efikasno raditi na jasno odvojenim slojevima bez kompleksnosti mikroservisne arhitekture.
- **Usklađenost sa tehnologijama** — Node.js (Express) + React + PostgreSQL stack je dobro dokumentovan, široko podržan i pogodan za brzi razvoj MVP-a.
- **Skalabilnost za budućnost** — monolitni backend se može naknadno razbiti u servise ukoliko sistem preraste trenutne potrebe, dok RESTful interfejs ostaje stabilan.
- **Medicinski kontekst** — centralizovana baza omogućava lakšu implementaciju audit trail mehanizma (NFR-05), RBAC kontrole pristupa (NFR-09) i enkripcije podataka (NFR-01).

```
┌─────────────────────────────────────────────────────────────────┐
│                     KLIJENT (Browser/Tablet)                    │
│                                                                 │
│   React SPA  ─  Komponente  ─  React Router  ─  Axios/Fetch     │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTPS (TLS 1.3)
                           │  REST API (JSON)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SERVER (Node.js / Express)                  │
│                                                                 │
│   Middleware (Auth, RBAC, Validacija, Logging)                  │
│   Kontroleri  ─  Servisi  ─  Repozitoriji                       │
│   JWT Autentifikacija  ─  Audit Logger                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │  SQL (pg driver / Knex.js / Prisma)
                           │  Connection pooling
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BAZA PODATAKA (PostgreSQL 14+)              │
│                                                                 │
│   Korisnici ─ Oprema ─ Rezervacije ─ Repromaterijal             │
│   Audit Log ─ Notifikacije ─ Održavanje ─ Ocjene                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Glavne komponente sistema

Sistem se sastoji od tri primarne komponente i nekoliko pomoćnih podsistema:

### 2.1 Frontend (React SPA)

Prezentacijski sloj implementiran kao Single Page Application (SPA) u React-u. Odgovoran je za sav korisnički interfejs, rutiranje na klijentu i komunikaciju sa backend API-jem.

**Ključni moduli:**

- **Auth modul** — login forma, upravljanje JWT tokenom u memoriji (ne localStorage zbog NFR-02), automatski session timeout nakon 15 minuta neaktivnosti.
- **Equipment modul** — lista opreme (US-1), detalji opreme (US-2), pretraga (US-12), filtriranje (US-13), specifikacije i slike (US-25).
- **Reservation modul** — kreiranje rezervacije (US-3), prikaz „Moje rezervacije" (US-4), otkazivanje (US-14), izmjena (US-15), kalendar zauzeća (US-11).
- **Admin modul** — upravljanje opremom (US-5), odobravanje rezervacija (US-7), izmjena statusa (US-8), pregled svih rezervacija (US-17), trenutno korištenje (US-18), notifikacije (US-16), izvještaji (US-22), održavanje (US-23), export (US-27), potrošnja repromaterijala (US-20), pravila korištenja (US-21).
- **Dashboard modul** — početni pregled prilagođen ulozi korisnika (US-24).
- **Activity Log modul** — prikaz historije aktivnosti za administratore (US-19).

### 2.2 Backend (Node.js / Express)

Sloj poslovne logike organizovan po principu **Controller → Service → Repository**, čime se odvaja HTTP logika od poslovnih pravila i pristupa bazi.

**Ključni moduli:**

- **Auth servis** — registracija, login, izdavanje i verifikacija JWT tokena, hashiranje lozinki (bcrypt), session management.
- **RBAC middleware** — role-based kontrola pristupa (Administrator, Laborant) koja se primjenjuje na svaku rutu prije izvršenja kontrolera.
- **Equipment servis** — CRUD operacije nad opremom, upravljanje statusima (dostupna, rezervisana, zauzeta, van upotrebe, na održavanju), validacija unosa.
- **Reservation servis** — kreiranje, odobravanje, odbijanje, otkazivanje i izmjena rezervacija; **detekcija konflikata** (US-9) provjerom preklapanja termina prije svakog spremanja ili odobravanja.
- **Consumables servis** — evidencija potrošnje repromaterijala, praćenje stanja zaliha, upozorenja za niske zalihe.
- **Notification servis** — kreiranje i isporuka obavijesti korisnicima (in-app notifikacije).
- **Audit Logger** — middleware koji automatski bilježi svaku važnu akciju (ko, šta, kada) u audit_log tabelu (NFR-05).
- **Report servis** — generisanje izvještaja o korištenju opreme, export u PDF/Excel.
- **Input Validation middleware** — sanitizacija i validacija svih ulaza na serverskoj strani, zaštita od SQL Injection, XSS i CSRF napada (NFR-18).

### 2.3 Baza podataka (PostgreSQL)

Relaciona baza podataka koja čuva sve persistentne podatke sistema. PostgreSQL je odabran zbog podrške za kompleksne upite, transakcije, JSON tipove podataka, i dobru skalabilnost.

**Primarne tabele:**

- `users` — korisnički profili, hashirane lozinke, uloge (admin/laborant)
- `equipment` — inventar opreme, status, kategorija, tip, opis
- `equipment_specs` — tehničke specifikacije i slike opreme
- `reservations` — rezervacije sa statusom (na_čekanju, odobrena, odbijena, otkazana), vremenski termini
- `consumables` — repromaterijal, trenutne zalihe, minimalne granice
- `consumable_usage` — evidencija potrošnje po datumu i korisniku
- `maintenance_records` — historija servisa i kvarova
- `notifications` — obavijesti za korisnike
- `equipment_ratings` — ocjene i komentari korisnika
- `usage_rules` — pravila korištenja opreme
- `audit_log` — neizmjenjiva historija svih akcija u sistemu

---

## 3. Odgovornosti komponenti

| Komponenta | Odgovornost |
|:-----------|:------------|
| **React Frontend** | Renderovanje korisničkog interfejsa, klijentsko rutiranje, prikaz podataka prema ulozi korisnika, prikupljanje korisničkih unosa, klijentska validacija formi, upravljanje stanjem (session, UI state). |
| **Express API sloj (Kontroleri)** | Primanje HTTP zahtjeva, parsiranje parametara, delegiranje poziva servisnom sloju, formatiranje i vraćanje HTTP odgovora, error handling. |
| **Servisni sloj** | Implementacija poslovne logike: validacija pravila (npr. provjera konflikta termina, provjera RBAC dozvola), orkestracija operacija koje uključuju više tabela, generisanje izvještaja. |
| **Repository sloj** | Pristup bazi podataka, izvršavanje SQL upita, mapiranje rezultata na aplikacijske objekte. Jedini sloj koji direktno komunicira sa PostgreSQL bazom. |
| **Auth middleware** | Verifikacija JWT tokena na svakom zaštićenom zahtjevu, dekodiranje korisničkih podataka iz tokena, odbijanje neautorizovanih zahtjeva. |
| **RBAC middleware** | Provjera da li korisnik sa datom ulogom ima pravo pristupiti traženoj ruti/akciji. Sprečava horizontalnu eskalaciju privilegija (NFR-09). |
| **Audit middleware** | Transparentno bilježenje svake značajne akcije u audit_log tabelu, bez utjecaja na tok izvršenja glavne operacije. |
| **PostgreSQL** | Perzistencija podataka, održavanje referencijalnog integriteta (foreign keys), podrška za transakcije (atomičnost operacija nad rezervacijama), indeksiranje za performanse pretrage. |

---

## 4. Tok podataka i interakcija



### 4.1 Primjer: Administrator odobrava rezervaciju (US-7)

1. Administrator otvara listu zahtjeva za rezervaciju (GET `/api/reservations?status=na_cekanju`).
2. Backend provjerava JWT i RBAC (samo admin rola).
3. PostgreSQL vraća sve rezervacije sa statusom `na_čekanju`.
4. Administrator klikne „Odobri" na odabranoj rezervaciji.
5. Frontend šalje PATCH `/api/reservations/:id` sa `{status: "odobrena"}`.
6. Backend **ponovo provjerava konflikt termina** (US-9) — jer je u međuvremenu mogla biti odobrena druga rezervacija za isti termin.
7. Ako nema konflikta, status se ažurira u bazi, kreira se zapis u audit_log tabeli, i kreira se notifikacija za korisnika.
8. Korisnik vidi ažurirani status u prikazu „Moje rezervacije" (US-4).

### 4.2 Opšti tok autentifikacije i autorizacije

```
[Login zahtjev] → Auth servis (bcrypt provjera) → JWT izdavanje
                                                        │
[Svaki naredni zahtjev] → Auth middleware (JWT verifikacija)
                                │
                          RBAC middleware (provjera uloge)
                                │
                          Kontroler → Servis → Repozitorij → PostgreSQL
```

Svi zaštićeni endpointi prolaze kroz dva middleware sloja prije nego što stignu do kontrolera. JWT token se šalje u `Authorization: Bearer <token>` headeru. Token sadrži `user_id`, `role` i `exp` (vrijeme isteka).


