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

---


## 5. Ključne tehničke odluke

### 5.1 Monolitni backend umjesto mikroservisa

**Odluka:** Sva serverska logika u jednoj Express aplikaciji.

**Razlog:** Tim od 9 članova sa ograničenim iskustvom u distribuiranim sistemima. Mikroservisi bi uveli nepotrebnu kompleksnost (service discovery, inter-service komunikacija, distribuirane transakcije) bez stvarne koristi za sistem sa 200 istovremenih korisnika (NFR-19). Monolitna arhitektura omogućava jednostavnije testiranje, deployment i debugging. Ukoliko se u budućnosti pojavi potreba, modul se može izdvojiti u zaseban servis jer je interna struktura već organizovana po domenskim servisima.

### 5.2 JWT za autentifikaciju umjesto server-side sesija

**Odluka:** Stateless autentifikacija putem JSON Web Tokena.

**Razlog:** JWT eliminira potrebu za session storeom na serveru, čime se pojednostavljuje horizontalno skaliranje. Token sadrži korisničku ulogu što omogućava RBAC provjeru bez dodatnog upita u bazu na svakom zahtjevu. Session timeout od 15 minuta (NFR-02) se implementira kroz kratak `exp` claim u tokenu, sa mogućnošću refresh tokena za nastavak rada.

**Trade-off:** JWT se ne može invalidirati prije isteka bez dodatnog mehanizma (blacklist). Za MVP, kratak životni vijek tokena (15 minuta) je prihvatljiv kompromis.

### 5.3 PostgreSQL kao primarna baza

**Odluka:** Relaciona baza umjesto NoSQL rješenja.

**Razlog:** Podaci sistema su inherentno relacioni (korisnici imaju rezervacije, rezervacije se odnose na opremu, oprema ima održavanje). PostgreSQL pruža ACID transakcije koje su kritične za sprečavanje konflikata rezervacija (US-9) — provjera i upis moraju biti atomična operacija. Podrška za JSON/JSONB tipove omogućava fleksibilnost za polustrukturirane podatke (specifikacije opreme) bez potrebe za zasebnom NoSQL bazom.

### 5.4 Konflikt rezervacija — provjera na serverskoj strani

**Odluka:** Validacija konflikata termina se vrši isključivo na backendu, unutar transakcije.

**Razlog:** Klijentska provjera nije pouzdana jer dva korisnika mogu istovremeno vidjeti slobodan termin. Koristi se PostgreSQL transakcija sa `SELECT ... FOR UPDATE` ili eksplicitnim zaključavanjem reda opreme kako bi se osiguralo da ne dođe do race condition-a. Ovo direktno adresira US-9 i acceptance kriterije koji zahtijevaju da sistem nikada ne dozvoli preklapanje odobrenih rezervacija za istu opremu.

### 5.5 Audit log kao append-only tabela

**Odluka:** Neizmjenjiva tabela u koju se samo dodaju zapisi.

**Razlog:** NFR-05 zahtijeva trajno bilježenje svake administrativne akcije. Tabela `audit_log` nema UPDATE ili DELETE operacije na aplikacijskom nivou. Pristup čitanju je ograničen na administratore. Ovo zadovoljava zahtjeve za sljedivost (NFR-13) i akreditacijske standarde.

### 5.6 Validacija unosa na oba sloja

**Odluka:** Dupla validacija — na frontendu (UX) i na backendu (sigurnost).

**Razlog:** Klijentska validacija poboljšava korisničko iskustvo (brz feedback), ali nikada ne smije biti jedina linija odbrane. Serverska validacija koristi biblioteku poput `joi` ili `express-validator` za sanitizaciju svih ulaza i zaštitu od SQL Injection, XSS i CSRF napada (NFR-18).

---

## 6. Struktura API-ja

API prati RESTful konvencije sa sljedećim glavnim grupama ruta:

| Grupa | Primjeri ruta | Uloga |
|:------|:-------------|:------|
| **Auth** | `POST /api/auth/login`, `POST /api/auth/logout` | Autentifikacija |
| **Equipment** | `GET /api/equipment`, `GET /api/equipment/:id`, `POST /api/equipment`, `PUT /api/equipment/:id`, `DELETE /api/equipment/:id` | CRUD opreme |
| **Reservations** | `GET /api/reservations`, `POST /api/reservations`, `PATCH /api/reservations/:id`, `GET /api/reservations/my` | Upravljanje rezervacijama |
| **Users** | `GET /api/users`, `PUT /api/users/:id/role` | Upravljanje korisnicima (admin) |
| **Consumables** | `GET /api/consumables`, `POST /api/consumables/usage` | Repromaterijal |
| **Notifications** | `GET /api/notifications`, `POST /api/notifications` | Obavijesti |
| **Maintenance** | `GET /api/equipment/:id/maintenance`, `POST /api/equipment/:id/maintenance` | Održavanje |
| **Reports** | `GET /api/reports/usage`, `GET /api/reports/export` | Izvještaji i export |
| **Audit** | `GET /api/audit-log` | Historija aktivnosti (admin) |
| **Dashboard** | `GET /api/dashboard` | Podaci za početni pregled |

Svaka ruta koja mijenja stanje (POST, PUT, PATCH, DELETE) prolazi kroz auth middleware, RBAC middleware, validaciju unosa i audit logger.

---

## 7. Ograničenja i rizici arhitekture

### 7.1 Ograničenja

| Ograničenje | Opis | Mitigacija |
|:------------|:-----|:-----------|
| **Monolitna arhitektura** | Sve komponente backenda dijele isti proces. Kvar u jednom modulu može potencijalno srušiti cijeli sistem. | Dobro strukturiran error handling, process manager (PM2) za automatski restart, modularni kod koji se može izdvojiti u budućnosti. |
| **Stateless JWT** | Nemogućnost trenutnog invalidiranja tokena (npr. pri odjavi ili promjeni uloge). | Kratak životni vijek tokena (15 min), refresh token mehanizam, eventualna Redis blacklista za kritične slučajeve. |
| **Bez real-time komunikacije u MVP-u** | Notifikacije se prikazuju tek pri sljedećem učitavanju stranice (polling), a ne u realnom vremenu. | Periodični polling (npr. svakih 30 sekundi), sa mogućnošću uvođenja WebSocket-a u kasnijim sprintovima. |
| **Jedan server** | MVP pretpostavlja deployment na jedan server bez redundancije. | Prihvatljivo za početnu fazu; load balancer i horizontalno skaliranje su mogući zbog stateless arhitekture. |
| **Bez integracije sa eksternim sistemima** | MVP ne uključuje HL7/FHIR integraciju sa laboratorijskim analizatorima (NFR-10). | API je dizajniran da bude proširiv; integracioni sloj se može dodati bez izmjene postojeće arhitekture. |

### 7.2 Rizici

| Rizik | Vjerovatnoća | Uticaj | Mitigacija |
|:------|:-------------|:-------|:-----------|
| **Race condition kod rezervacija** | Srednja | Visok — dva korisnika istovremeno rezervišu isti termin | Transakcije sa row-level zaključavanjem u PostgreSQL (SELECT FOR UPDATE). Obavezno testirati pod opterećenjem. |
| **Performanse pretrage pri rastu baze** | Niska (kratkoročno) | Srednji | Indeksi na kolonama za pretragu i filtriranje (naziv, kategorija, status). NFR-04 zahtijeva odgovor <1.5s na 5,000 stavki — PostgreSQL to može bez problema uz pravilne indekse. |
| **Gubitak podataka** | Niska | Kritičan | Dnevni backup PostgreSQL baze (pg_dump), testiranje restore procedure. RTO <2h (NFR-06). |
| **Sigurnosne ranjivosti** | Srednja | Kritičan | OWASP Top 10 provjera (NFR-18), bcrypt za lozinke, parametrizovani SQL upiti, Content-Security-Policy headeri, rate limiting na login ruti. |
| **Nedovoljna pokrivenost testovima** | Visoka (ograničeno vrijeme) | Srednji | Prioritetno testiranje kritičnih putanja: autentifikacija, detekcija konflikata, RBAC provjere. Ciljana pokrivenost od 80% za servisni sloj (NFR-12). |
| **Složenost kalendara zauzeća** | Srednja | Srednji | Korištenje provjerene React biblioteke za kalendar (npr. react-big-calendar) umjesto vlastite implementacije od nule. |

---

## 8. Otvorena pitanja

1. **Refresh token strategija** — Da li koristiti rotacione refresh tokene pohranjene u httpOnly cookie-u ili implementirati sliding session sa kratkim JWT tokenima? Ovo utiče na korisničko iskustvo (koliko često se korisnik mora ponovo prijaviti) i sigurnost.

2. **File storage za slike opreme** — Da li slike čuvati direktno u PostgreSQL (bytea kolona) ili na filesystem-u sa putanjama u bazi? Filesystem je efikasniji za veće fajlove, ali zahtijeva dodatnu konfiguraciju backup-a.

3. **Real-time notifikacije** — Da li u kasnijim sprintovima uvesti WebSocket (Socket.io) za real-time obavijesti ili je polling mehanizam dovoljan za obim korištenja sistema?

4. **Export format i biblioteka** — Koju Node.js biblioteku koristiti za generisanje PDF izvještaja (pdfkit, puppeteer, jsPDF) i Excel fajlova (exceljs, xlsx)?

5. **Deployment strategija** — Da li koristiti Docker kontejnerizaciju od početka (NFR-17 to preporučuje, ali je „Won't Have" za MVP) ili klasični deployment na Linux server sa PM2?

6. **Lokalizacija** — NFR-20 zahtijeva podršku za bosanski i engleski jezik. Da li implementirati i18n mehanizam od prvog sprinta ili ga dodati u kasnijem ciklusu?

7. **Testiranje pod opterećenjem** — Kada i kako sprovesti load testing (NFR-19 zahtijeva 200 istovremenih korisnika)? Da li koristiti k6, JMeter ili Gatling?

---


### Reference

- Product Vision (Sprint 1)
- Product Backlog v2 (Sprint 2) — tehnologije i raspodjela po sprintovima
- NFR Zahtjevi (Sprint 2) — nefunkcionalni zahtjevi referencirani kao NFR-XX
- User Stories (Sprint 2) — funkcionalne specifikacije referencirane kao US-XX
- Acceptance Criteria (Sprint 2) — kriteriji prihvatanja po sprintu
- Stakeholder Map (Sprint 1) — analiza stakeholdera i funkcionalni zahtjevi FR-XX
