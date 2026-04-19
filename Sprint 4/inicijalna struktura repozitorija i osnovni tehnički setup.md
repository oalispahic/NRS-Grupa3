## 1. VIZIJA, STRATEGIJA I KONTEKST PROJEKTA (PRODUCT VISION)

### 1.1 Detaljna analiza problemske domene
U naučno-istraživačkim institucijama, oprema nije samo imovina; ona je osnovni alat čija preciznost direktno korelira sa validnošću naučnog rada. Trenutna analiza stanja u laboratorijama identifikovala je "crne rupe" u informacijama:
* **Informaciona asimetrija:** Laboranti na terenu nemaju uvid u to da li je instrument koji koriste prošao validaciju, dok menadžment nema uvid u realnu stopu kvarova po brendu opreme.
* **Tehnički dug održavanja:** Zbog nedostatka automatizovanih notifikacija, kalibracije se rade reaktivno (kad se uoči greška) umjesto proaktivno (prema planu).
* **Operativna neefikasnost:** Prosječno vrijeme od prijave kvara do izlaska servisera na teren iznosi 48h zbog manuelne komunikacije putem telefona ili e-maila.

### 1.2 Strateški ciljevi i definisani Scope
Glavni cilj sistema ISOLO je transformacija iz reaktivnog u prediktivni model održavanja.
- **Digitalni Identitet Opreme:** Svaki uređaj posjeduje "Digital Twin" profil sa kompletnom genealogijom (od nabavke, preko svih servisa, do rashodovanja).
- **Sistem ranog upozoravanja:** Algoritam za proračun preostalog vremena do kalibracije baziran na specifikacijama proizvođača i intenzitetu korištenja.
- **Incident Lifecycle Management:** Automatizacija ticketing sistema od momenta skeniranja QR koda na uređaju do zatvaranja radnog naloga od strane servisera.

### 1.3 Proširena Stakeholder Map (Analiza uticaja i interesa)
<table>
  <thead>
    <tr>
      <th align="left">Uloga (Stakeholder)</th>
      <th align="left">Interesi i Očekivanja</th>
      <th align="left">Kritični rizici po korisnika</th>
      <th align="left">KPI (Metrika uspjeha)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Laborant (End User)</b></td>
      <td>Želi instantnu informaciju o ispravnosti uređaja prije početka eksperimenta.</td>
      <td>Korištenje nekalibrisanog uređaja dovodi do gubitka mjeseci rada.</td>
      <td>Vrijeme prijave kvara < 30 sekundi.</td>
    </tr>
    <tr>
      <td><b>Šef laboratorije (Decision Maker)</b></td>
      <td>Želi optimizaciju budžeta i usklađenost sa ISO standardima kvaliteta.</td>
      <td>Zakonske sankcije i gubitak akreditacije laboratorije.</td>
      <td>Postotak uređaja u "Valid" stanju > 98%.</td>
    </tr>
    <tr>
      <td><b>Servisni tehničar (Expert)</b></td>
      <td>Želi digitalni pristup šemama, istoriji kvarova i listi rezervnih dijelova.</td>
      <td>Pogrešna dijagnoza kvara uzrokuje dodatne troškove.</td>
      <td>Smanjenje vremena popravke (MTTR) za 25%.</td>
    </tr>
    <tr>
      <td><b>IT Administrator (Support)</b></td>
      <td>Želi sistem koji je lagan za održavanje, siguran i skalabilan.</td>
      <td>Kompromitacija baze podataka i curenje osjetljivih istraživačkih metapodataka.</td>
      <td>Uptime sistema > 99.9%.</td>
    </tr>
  </tbody>
</table>

---

## 2. TEAM CHARTER I OPERATIVNI MODEL (POVELJA TIMA)
*Lokacija: `/docs/management/TeamCharter.md`*

Tim Grupe 3 funkcioniše kao agilna jedinica sa jasno definisanim granicama odgovornosti, ali visokim stepenom kolaboracije.

### 2.1 Matrica odgovornosti (RACI)
- **Omer Alispahić (Tehnički vođa):** Odgovoran (R) za Backend arhitekturu, Konsultovan (C) za Frontend integraciju.
- **Član 2 (Product Owner):** Odgovoran (R) za Backlog i validaciju User Story-ja, Obaviješten (I) o tehničkim dugovima.
- **Član 3 (QA Lead):** Odgovoran (R) za integritet testova i automatizaciju, Konsultovan (C) kod dizajna API ruta.
- **Član 4 (UX/Frontend):** Odgovoran (R) za klijentsku stranu aplikacije i pristupačnost (Accessibility).

### 2.2 Kodeks ponašanja i rešavanje konflikata
- **Dnevna komunikacija:** Koristimo Discord kanale razvrstane po temama (`#database`, `#frontend`, `#devops`). Sve odluke donesene na sastancima moraju biti sumirane u `DecisionLog.md`.
- **Politika "Code Review-a":** Nijedan PR (Pull Request) ne smije biti odobren sam od strane autora. Minimalno jedan "peer" review je obavezan uz prolazak svih CI (Continuous Integration) testova.
- **Upravljanje neslaganjima:** U slučaju tehničkog zastoja, tim organizuje "Spike" (kratko istraživanje) u trajanju od maksimalno 4h, nakon čega se glasa. Glas Scrum Mastera je odlučujući u slučaju izjednačenog rezultata.

---

## 3. PRODUCT BACKLOG I DETALJNA RAZRADA FUNKCIONALNOSTI
*Lokacija: `/docs/product/ProductBacklog.md`*

Naš backlog je baziran na **User-Centric** dizajnu, gdje svaki zahtjev direktno adresira bolnu tačku korisnika.

### 3.1 Prioritizirani User Stories (Sprint 1-3)
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Korisnička priča (User Story)</th>
      <th>Acceptance Criteria (Kriteriji prihvatanja)</th>
      <th>SP</th>
      <th>Prioritet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>US-01</td>
      <td>Kao administrator, želim digitalni registar opreme kako bih eliminisao papirnu dokumentaciju.</td>
      <td>1. CRUD operacije nad opremom. 2. Podrška za jedinstvene serijske brojeve. 3. Mogućnost uploada uputstva u PDF-u.</td>
      <td>5</td>
      <td>Must Have</td>
    </tr>
    <tr>
      <td>US-02</td>
      <td>Kao laborant, želim skenirati QR kod na uređaju da vidim njegov status.</td>
      <td>1. Generisanje unikatnog QR koda. 2. Prikaz zadnje kalibracije i statusa (Ispravno/Neispravno) bez login-a (Public view).</td>
      <td>8</td>
      <td>Must Have</td>
    </tr>
    <tr>
      <td>US-03</td>
      <td>Kao serviser, želim primati notifikacije o novim kvarovima.</td>
      <td>1. Real-time notifikacija (ili email). 2. Uvid u opis kvara koji je poslao laborant. 3. Mogućnost promjene statusa u "In Repair".</td>
      <td>5</td>
      <td>Should Have</td>
    </tr>
    <tr>
      <td>US-04</td>
      <td>Kao šef, želim automatski izvještaj o amortizaciji i troškovima.</td>
      <td>1. Agregacija troškova servisa po uređaju. 2. Grafički prikaz trendova kvarova kroz mjesece. 3. Export u Excel format.</td>
      <td>13</td>
      <td>Should Have</td>
    </tr>
  </tbody>
</table>

### 3.2 Nefunkcionalni zahtjevi (NFR)
1.  **Performanse:** Vrijeme učitavanja profila opreme ne smije prelaziti 1.5s pod opterećenjem od 50 istovremenih korisnika.
2.  **Sigurnost:** Svi podaci u tranzitu moraju biti enkriptovani (TLS). Lozinke se čuvaju koristeći Argon2 ili Bcrypt sa salt-om.
3.  **Dostupnost:** Sistem mora biti responzivan na mobilnim uređajima (Mobile-first design) zbog terenskog rada.

---

## 4. TEHNIČKA ARHITEKTURA I DIZAJN SISTEMA
*Lokacija: `/docs/architecture/Architecture.md`*

### 4.1 Slojevita Arhitektura (Layered Architecture)
Sistem je strukturiran u četiri jasno razgraničena sloja kako bi se osigurala testabilnost i lako održavanje:

1.  **Presentation Layer (React.js):**
    - Koristi **Functional Components** i **Hooks** za upravljanje stanjem.
    - **Tailwind CSS** za brz i konzistentan dizajn interfejsa.
    - **Axios** presretači (interceptors) za automatsko dodavanje JWT tokena u zaglavlja.

2.  **Application/API Layer (Node.js/Express):**
    - **Middleware** za validaciju šema zahtjeva (Joi ili Zod).
    - **Rate Limiter** za sprečavanje Brute-force napada.
    - **Custom Error Handler** koji uniformiše odgovore servera.

3.  **Domain/Service Layer:**
    - Izolacija poslovne logike. Ovdje se dešavaju kalkulacije (npr. logika za određivanje prioriteta servisa na osnovu starosti uređaja).
    - **Pure Functions** koje su lako testabilne bez baze podataka.

4.  **Infrastructure/Data Access Layer (PostgreSQL + Sequelize):**
    - Relaciona baza koja osigurava integritet podataka (Foreign Key constraints).
    - **Migrations:** Svaka promjena baze je dokumentovana kroz kod.

### 4.2 Model podataka (ERD Specifikacija)
- **Table: Equipment** (`id`, `uuid`, `name`, `model`, `serial_number`, `purchase_date`, `status_enum`).
- **Table: ServiceRecord** (`id`, `equipment_id`, `reporter_id`, `technician_id`, `issue_description`, `resolution`, `cost`, `created_at`).
- **Table: CalibrationSchedule** (`id`, `equipment_id`, `last_calibration`, `next_calibration`, `interval_months`).

---

## 5. RAZVOJNI DNEVNIK KROZ SPRINTove (SCRUM EXECUTION)

### 5.1 Sprint 1: Temelji i "Human-First" Inžinjering
- **Fokus:** Postavljanje skeleta aplikacije i dizajn baze podataka.
- **Aktivnosti:** Ručno crtanje ER dijagrama, definisanje REST ruta na papiru, postavljanje Git flow-a.
- **Tehnički izazov:** Implementacija dinamičkog generisanja QR kodova na serverskoj strani bez zavisnosti o eksternim API-jima (zbog privatnosti).
- **Ishod:** Stabilna baza, Login sistem i osnovni pregled inventara.

### 5.2 Sprint 2: Servisna logika i Ticketing (Intermedijarna faza)
- **Fokus:** Workflow kvara i servisa.
- **Aktivnosti:** Implementacija logike promjene stanja uređaja. Razvoj frontenda za prijavu kvara.
- **AI Integracija:** Počeli smo koristiti GitHub Copilot za generisanje boilerplate koda za `Service` sloj.
- **Ishod:** Funkcionalan sistem za prijavu kvarova i praćenje istorije popravki.

### 5.3 Sprint 3: AI-Enabled Optimizacija i QA
- **Fokus:** Testiranje, poliranje UI-ja i automatizacija izvještaja.
- **Aktivnosti:** Masovno generisanje **Unit testova** koristeći ChatGPT 4 (uz ljudsku validaciju). Refaktoring kompleksnih SQL upita za dashboard.
- **Rezultat:** Povećana pokrivenost koda testovima sa 10% na 75% u samo jednoj sedmici. Implementiran izvoz podataka u PDF i Excel.

---

## 6. DECISION LOG (DETALJNA EVIDENCIJA ODLUKA I TRADE-OFFS)
*Lokacija: `/docs/management/DecisionLog.md`*

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Odluka / Problem</th>
      <th>Opcije i Trade-offs</th>
      <th>Konačan izbor i Obrazloženje</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DEC-01</td>
      <td>Tehnologija za Backend</td>
      <td>1. Python/Django (Brz razvoj)<br>2. Node.js (Uniforman jezik sa FE)</td>
      <td><b>Node.js:</b> Odabrano jer cijeli tim poznaje JavaScript, što smanjuje kognitivno opterećenje.</td>
    </tr>
    <tr>
      <td>DEC-02</td>
      <td>Strategija za Slike</td>
      <td>1. Base64 u bazi (Sporo)<br>2. S3 Bucket (Dodatni trošak)<br>3. Lokalni Storage</td>
      <td><b>Lokalni Storage:</b> Odlučeno za MVP fazu zbog nulte cijene, uz plan migracije na S3 kasnije.</td>
    </tr>
    <tr>
      <td>DEC-03</td>
      <td>Validacija podataka</td>
      <td>1. Ručna validacija u controlleru<br>2. Zod/Joi biblioteke</td>
      <td><b>Zod:</b> Omogućava TypeScript-like tipizaciju i automatsku validaciju šeme na ulazu.</td>
    </tr>
  </tbody>
</table>

---

## 7. STRATEGIJA TESTIRANJA I KVALITETA (QA)

### 7.1 Hijerarhija testova
1.  **Unit Testovi (Jest):** Testiranje izolovanih funkcija (npr. kalkulator datuma kalibracije). Cilj: 80% coverage.
2.  **Integration Testovi (Supertest):** Testiranje API ruta i njihove interakcije sa bazom podataka.
3.  **E2E Testovi (Cypress):** Testiranje kritičnih putanja korisnika (npr. "Prijava kvara -> Servis -> Zatvaranje naloga").

### 7.2 Detaljni testni scenariji (QA Specifikacija)

Testna strategija sistema ISOLO zasnovana je na rigoroznoj verifikaciji tri kritična stuba: **Integritetu podataka**, **Sigurnosti (Autorizacija)** i **Operativnoj automatizaciji**. 

#### Tekstualna analiza testnih fokusa:
* **Validacija integriteta podataka (TS-01, TS-03, TS-04, TS-08, TS-12):** Ovi scenariji osiguravaju da digitalni registar ostane konzistentan. Poseban fokus je na unikatnosti serijskih brojeva (klučni identifikator za "Digital Twin") i sprečavanju unosa malicioznog koda ili neadekvatnih datoteka koje bi mogle kompromitovati serversku infrastrukturu.
* **Kontrola pristupa i zaštita privatnosti (TS-02, TS-07, TS-11):** S obzirom na to da laboratorijska oprema može biti dio povjerljivih državnih ili naučnih projekata, RBAC (Role-Based Access Control) mehanizam mora precizno odbijati pokušaje eskalacije privilegija. Testiramo i reaktivnu sigurnost, poput trenutnog prekida sesije nakon što administrator deaktivira korisnički račun.
* **Logika radnog toka i konkurentnost (TS-06, TS-10):** Verifikujemo automatizaciju procesa — npr. da li sistem ispravno mijenja status uređaja u realnom vremenu bez ljudske intervencije nakon prijave kvara. Također, testiramo "Optimistic Locking" mehanizam kako bismo spriječili gubitak podataka kada dva korisnika istovremeno edituju isti zapis.
* **Rukovanje resursima i rubni slučajevi (TS-05, TS-09):** Ovdje ispitujemo otpornost sistema na nepredviđene situacije, kao što su skeniranje oštećenih/nepostojećih QR kodova ili pokušaj generisanja statističkih izvještaja za periode u kojima nije bilo aktivnosti.

#### Tabularni pregled testnih slučajeva

<table width="100%">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th align="left" width="5%">ID</th>
      <th align="left" width="20%">Naziv Scenarija</th>
      <th align="left" width="40%">Opis i Ulazni Podaci</th>
      <th align="left" width="35%">Očekivani Ishod (Expected Result)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>TS-01</b></td>
      <td>Dupliciranje serijskog broja</td>
      <td>Pokušaj unosa novog uređaja sa serijskim brojem koji već postoji u bazi podataka.</td>
      <td>Sistem odbija transakciju, vraća <b>400 Bad Request</b> i prikazuje poruku: "Serijski broj je zauzet".</td>
    </tr>
    <tr>
      <td><b>TS-02</b></td>
      <td>Neovlašteni pristup administraciji</td>
      <td>Pokušaj pristupa ruti <code>/admin/settings</code> od strane korisnika sa ulogom "Laborant".</td>
      <td>Sistem blokira pristup, vraća <b>403 Forbidden</b> i vrši automatsku redirekciju na dashboard.</td>
    </tr>
    <tr>
      <td><b>TS-03</b></td>
      <td>Validacija datuma kalibracije</td>
      <td>Unos datuma sljedeće kalibracije koji je hronološki ispred datuma zadnje kalibracije.</td>
      <td>Validacijski mehanizam blokira unos uz poruku: "Datum sljedeće kalibracije mora biti nakon datuma zadnje".</td>
    </tr>
    <tr>
      <td><b>TS-04</b></td>
      <td>Upload prevelike datoteke</td>
      <td>Pokušaj uploada PDF uputstva čija veličina prelazi limit od 5MB.</td>
      <td>Sistem prekida prenos, vraća <b>413 Payload Too Large</b> i obavještava korisnika o limitu.</td>
    </tr>
    <tr>
      <td><b>TS-05</b></td>
      <td>Skeniranje nepostojećeg QR koda</td>
      <td>Skeniranje koda koji sadrži ID uređaja koji je trajno obrisan iz sistema.</td>
      <td>Sistem prikazuje "404 Not Found" stranicu sa jasnom porukom da uređaj više ne postoji u registru.</td>
    </tr>
    <tr>
      <td><b>TS-06</b></td>
      <td>Automatska promjena statusa</td>
      <td>Laborant šalje prijavu incidenta za uređaj koji je bio u statusu "Ispravan".</td>
      <td>Status uređaja se automatski mijenja u "U kvaru", a serviseru se šalje instant notifikacija.</td>
    </tr>
    <tr>
      <td><b>TS-07</b></td>
      <td>Istek JWT tokena (Session Timeout)</td>
      <td>Korisnik pokušava izvršiti izmjenu podataka nakon što je njegova sesija istekla.</td>
      <td>Sistem vraća <b>401 Unauthorized</b> i preusmjerava korisnika na početnu Login stranicu.</td>
    </tr>
    <tr>
      <td><b>TS-08</b></td>
      <td>Pokušaj SQL Injection napada</td>
      <td>Unos malicioznog koda u polje za pretragu opreme (npr. <code>' OR 1=1 --</code>).</td>
      <td>ORM automatski sanitizuje ulaz; sistem tretira unos kao obični tekst i ne vraća neovlaštene podatke.</td>
    </tr>
    <tr>
      <td><b>TS-09</b></td>
      <td>Izvještaj bez podataka</td>
      <td>Pokušaj generisanja kvartalnog PDF izvještaja za laboratoriju koja nema nijedan servisni zapis.</td>
      <td>Sistem generiše PDF sa zaglavljem, ali u tijelu ispisuje: "Nema podataka za traženi kriterij".</td>
    </tr>
    <tr>
      <td><b>TS-10</b></td>
      <td>Konkurentna izmjena podataka</td>
      <td>Dva administratora istovremeno pokušavaju izmijeniti polje "Lokacija" za isti instrument.</td>
      <td>Primjena <i>Optimistic Locking-a</i>: prva izmjena prolazi, dok drugi korisnik dobija obavijest o konfliktu.</td>
    </tr>
    <tr>
      <td><b>TS-11</b></td>
      <td>Deaktivacija računa tokom rada</td>
      <td>Admin deaktivira račun korisnika dok je taj korisnik u aktivnoj sesiji.</td>
      <td>Pri sljedećem API pozivu, sistem vraća <b>401</b> jer je status računa provjeren u bazi i sesija se prekida.</td>
    </tr>
    <tr>
      <td><b>TS-12</b></td>
      <td>Regex validacija serijskog broja</td>
      <td>Unos serijskog broja koji sadrži emojije ili nedozvoljene simbole (npr. 🔬-123).</td>
      <td>Backend odbija unos i vraća poruku: "Serijski broj smije sadržavati samo alfanumeričke znakove i crticu".</td>
    </tr>
  </tbody>
</table>
---

## 8. AI USAGE LOG (EVIDENCIJA AI ASISTENCIJE)
*Lokacija: `/docs/management/AIUsageLog.md`*

Ovdje dokumentujemo simbiozu ljudske inteligencije i vještačkih modela.

<table>
  <thead>
    <tr>
      <th>Datum</th>
      <th>Zadatak</th>
      <th>Alat (Prompt)</th>
      <th>Ishod i Ljudska Korekcija</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>10.04.</td>
      <td>Generisanje SQL šeme</td>
      <td>ChatGPT 4 ("Create relational schema for...")</td>
      <td>AI je zaboravio `on_delete_cascade` na stranim ključevima. Ručno dodato u migracije.</td>
    </tr>
    <tr>
      <td>15.04.</td>
      <td>Unit testovi za modele</td>
      <td>GitHub Copilot</td>
      <td>Generisao 10 testova u sekundi. Ručno ispravljene putanje importovanja.</td>
    </tr>
    <tr>
      <td>18.04.</td>
      <td>Refaktoring UI komponenti</td>
      <td>Claude 3.5 Sonnet</td>
      <td>Poboljšao pristupačnost (Aria labels) i smanjio broj linija koda za 20%.</td>
    </tr>
  </tbody>
</table>

---

## 9. DEFINITION OF DONE (DoD)
Stavka je gotova samo ako ispunjava:
- [ ] Kod je prošao **Linting** (Prettier/ESLint).
- [ ] Dokumentacija u `/docs/` je ažurirana (ako je bilo promjena šeme).
- [ ] Napisani Unit testovi za novu funkcionalnost.
- [ ] Pull Request je prošao bar jedan ljudski Code Review.
- [ ] Funkcionalnost testirana na mobilnom prikazu.

---

## 10. TEHNIČKI SETUP I INSTRUKCIJE ZA RAZVOJ

### 10.1 Preduslovi
- **Node.js:** v18.16.0 ili noviji.
- **Baza:** PostgreSQL v15.
- **Docker:** Opcionalno za izolaciju baze.

### 10.2 Brzo pokretanje
```bash
# 1. Kloniranje projekta
git clone [https://github.com/oalispahic/NRS-Grupa3.git](https://github.com/oalispahic/NRS-Grupa3.git)

# 2. Instalacija svih zavisnosti (Mono-repo style)
npm install

# 3. Postavljanje okruženja
cp .env.example .env 
# Obavezno podesiti DB_URL, JWT_SECRET i PORT

# 4. Migracije i Seeding (Inicijalni podaci)
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# 5. Pokretanje razvojnih servera (paralelno)
npm run dev