## 1. Vizija, Strategija i Kontekst projekta 

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

### 1.3 Stakeholder Map (Analiza uticaja i interesa)
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

## 2. Team Charter i Operativni model 
*Lokacija: `/docs/management/TeamCharter.md`*

Tim Grupe 3 funkcioniše kao agilna jedinica sa jasno definisanim granicama odgovornosti, ali visokim stepenom kolaboracije.

### 2.1 Matrica odgovornosti 

Kako bi se osigurala maksimalna efikasnost i izbjeglo preklapanje nadležnosti u timu od 8 članova, primjenjujemo RACI model (Responsible, Accountable, Consulted, Informed). Svaki član tima ima jasno definisanu primarnu ulogu u životnom ciklusu razvoja sistema ISOLO.

<table style="width:100%">
  <thead>
    <tr>
      <th align="left">Član tima</th>
      <th align="left">Primarna uloga</th>
      <th align="left">Glavne odgovornosti (RACI)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Omar Alispahić</b></td>
      <td>Tehnički vođa (Tech Lead)</td>
      <td><b>(A/R)</b> Backend arhitektura, dizajn baze podataka i sigurnosni protokoli. <b>(C)</b> Frontend integracija.</td>
    </tr>
    <tr>
      <td><b>Elma Dedić</b></td>
      <td>Product Owner / Scrum Master</td>
      <td><b>(A/R)</b> Upravljanje backlog-om, validacija User Story-ja i prioritizacija sprinteva. <b>(I)</b> Tehnički dug.</td>
    </tr>
    <tr>
      <td><b>Iman Salanović</b></td>
      <td>QA Lead (Kvalitet)</td>
      <td><b>(R)</b> Testiranje integriteta podataka i automatizacija testova (Jest/Supertest). <b>(C)</b> Dizajn API ruta.</td>
    </tr>
    <tr>
      <td><b>Ilda Avdić</b></td>
      <td>Backend Developer</td>
      <td><b>(R)</b> Implementacija Business Logic sloja i API endpoint-a. <b>(C)</b> Optimizacija SQL upita i migracija.</td>
    </tr>
    <tr>
      <td><b>Amina Rovčanin</b></td>
      <td>Database & DevOps Eng.</td>
      <td><b>(R)</b> Upravljanje PostgreSQL bazom, Docker konfiguracija i CI/CD pipeline na GitHub-u. <b>(A)</b> Integritet podataka.</td>
    </tr>
    <tr>
      <td><b>Harun Zukanović</b></td>
      <td>Frontend Developer</td>
      <td><b>(R)</b> Implementacija React komponenti i State management (Zustand). <b>(C)</b> API integracija.</td>
    </tr>
    <tr>
      <td><b>Kemal Mešić</b></td>
      <td>Full-stack Developer</td>
      <td><b>(R)</b> Razvoj "end-to-end" funkcionalnosti (npr. QR skener modul). <b>(C)</b> Code review za oba stacka.</td>
    </tr>
    <tr>
      <td><b>Suljo Ruvić</b></td>
      <td>UX/UI & Frontend Lead</td>
      <td><b>(R)</b> Klijentska strana aplikacije, Tailwind CSS styling i pristupačnost (Accessibility). <b>(A)</b> Design system.</td>
    </tr>
  </tbody>
</table>

#### Ključne definicije uloga:
* **Responsible (R):** Osoba koja direktno izvršava zadatak.
* **Accountable (A):** Osoba koja snosi krajnju odgovornost za uspjeh zadatka i odobrava rad (obično vođa modula).
* **Consulted (C):** Osoba čije se stručno mišljenje traži prije donošenja finalne odluke.
* **Informed (I):** Osoba koja se obavještava o progresu ili ishodu nakon što je odluka donesena.

---

### Operativni model rada
S obzirom na veličinu tima, rad je organizovan kroz:
1.  **Peer-to-Peer Review:** Nijedan kod ne ulazi u `main` bez odobrenja barem jednog člana koji nije autor koda (npr. Ilda pregleda Omarov kod).
2.  **Cross-functional kolaboracija:** QA (Iman) blisko sarađuje sa Backend timom (Omar, Ilda) već u fazi dizajna API specifikacija.
3.  **UI Sync:** UX/UI Lead (Suljo) i Frontend tim (Harun) vrše sedmične provjere vizuelne konzistentnosti prema definisanom prototipu.

### 2.2 Kodeks ponašanja i rešavanje konflikata
- **Dnevna komunikacija:** Koristimo Discord kanale razvrstane po temama (`#database`, `#frontend`, `#devops`). Sve odluke donesene na sastancima moraju biti sumirane u `DecisionLog.md`.
- **Politika "Code Review-a":** Nijedan PR (Pull Request) ne smije biti odobren sam od strane autora. Minimalno jedan "peer" review je obavezan uz prolazak svih CI (Continuous Integration) testova.
- **Upravljanje neslaganjima:** U slučaju tehničkog zastoja, tim organizuje "Spike" (kratko istraživanje) u trajanju od maksimalno 4h, nakon čega se glasa. Glas Scrum Mastera je odlučujući u slučaju izjednačenog rezultata.

---

## 3. Backglog i detaljna razrada funkcionalnosti
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

Nefunkcionalni zahtjevi definišu operativne standarde i kvalitativne atribute sistema ISOLO. Ovi parametri osiguravaju da sistem ne samo "radi", već da radi pouzdano, sigurno i efikasno u specifičnom okruženju medicinskih i naučnih laboratorija gdje je preciznost imperativ.

#### 1. Performanse i Skalabilnost
Sistem mora osigurati fluidno korisničko iskustvo čak i u uslovima povećanog intenziteta rada, kao što su periodične revizije opreme ili masovni upisi novih instrumenata u bazu. Fokus je na brzini odziva jer laboranti na terenu ne smiju gubiti vrijeme čekajući na učitavanje stranica.

<table>
  <thead>
    <tr>
      <th>Parametar</th>
      <th>Ciljna vrijednost</th>
      <th>Metrika / Alat</th>
      <th>Opis i Obrazloženje</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Latenza profila</b></td>
      <td>&lt; 1.5 sekundi</td>
      <td>Lighthouse / DevTools</td>
      <td>Vrijeme od klika na "Detalji" ili skeniranja QR koda do potpunog prikaza Digital Twin profila uređaja.</td>
    </tr>
    <tr>
      <td><b>Odziv API-ja</b></td>
      <td>&lt; 200 ms</td>
      <td>Postman / k6</td>
      <td>Maksimalno vrijeme obrade zahtjeva na backendu za standardne GET operacije nad listom opreme.</td>
    </tr>
    <tr>
      <td><b>Konkurentnost</b></td>
      <td>50+ sesija</td>
      <td>Node.js Cluster</td>
      <td>Broj istovremenih korisnika koji mogu obavljati transakcije (npr. prijava kvara) bez degradacije brzine.</td>
    </tr>
    <tr>
      <td><b>Optimizacija medija</b></td>
      <td>Auto-compression</td>
      <td>Sharp (Node.js)</td>
      <td>Sve slike kvarova se automatski optimizuju na max 800KB prije pohrane radi uštede prostora i bandwidth-a.</td>
    </tr>
  </tbody>
</table>

* **Skalabilnost baze podataka:** Arhitektura baze je dizajnirana tako da performanse pretrage ostaju konzistentne čak i kada broj zapisa o servisima premaši 100.000, koristeći indeksiranje nad poljima `serial_number` i `equipment_id`.
* **Keširanje:** Implementacija klijentskog keširanja (React Query) smanjuje broj suvišnih API poziva za statične podatke (npr. kategorije opreme ili lokacije).

#### 2. Sigurnost i Integritet Podataka
Zaštita istraživačkih metapodataka i nepovredivost zapisa o održavanju su ključni za dobijanje laboratorijskih akreditacija. ISOLO koristi višeslojni pristup sigurnosti.

<table>
  <thead>
    <tr>
      <th>Sigurnosni sloj</th>
      <th>Tehnologija</th>
      <th>Metoda Implementacije</th>
      <th>Cilj zaštite</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Enkripcija u tranzitu</b></td>
      <td>TLS 1.3 (SSL)</td>
      <td>Let's Encrypt / HTTPS</td>
      <td>Sprečavanje "Man-in-the-Middle" napada i prisluškivanja saobraćaja.</td>
    </tr>
    <tr>
      <td><b>Zaštita lozinki</b></td>
      <td>Argon2 / Bcrypt</td>
      <td>Salt factor 12</td>
      <td>Onemogućavanje dešifrovanja lozinki čak i u slučaju kompromitacije same baze podataka.</td>
    </tr>
    <tr>
      <td><b>Upravljanje pristupom</b></td>
      <td>JWT + RBAC</td>
      <td>HttpOnly Cookies</td>
      <td>Stroga kontrola ko može editovati podatke o kalibraciji u odnosu na obične korisnike (laborante).</td>
    </tr>
    <tr>
      <td><b>Integritet unosa</b></td>
      <td>Zod Validation</td>
      <td>Schema Validation</td>
      <td>Sprečavanje SQL injection napada i unosa nevalidnih formata podataka u sistem.</td>
    </tr>
  </tbody>
</table>

* **Audit Log (Trag revizije):** Svaka kritična akcija (promjena statusa, brisanje zapisa) kreira neizbrisiv trag u bazi podataka. Sistem bilježi ko je izvršio promjenu, kada, i koja je bila prethodna vrijednost.
* **Rate Limiting:** Implementirana zaštita od "Brute Force" napada na login rutu, ograničavajući broj pokušaja na 5 unutar 15 minuta po IP adresi.

#### Dostupnost i Pouzdanost (Reliability)
Laboratorije rade 24/7, stoga sistem za praćenje opreme mora pratiti taj tempo. Neplanirani zastoji direktno utiču na produktivnost naučnog osoblja.

* **Uptime i Disaster Recovery:** Ciljana dostupnost je **99.9%**. U slučaju fatalne greške, sistem posjeduje strategiju oporavka baziranu na inkrementalnom backupu baze podataka svakih 24h, sa maksimalnim gubitkom podataka od 1 sata (RPO = 1h).
* **Mobile-First Design:** Korisnički interfejs je primarno razvijen za mobilne uređaje (tablete i telefone). Elementi su dizajnirani da budu "tap-friendly", sa jasnim vizuelnim indikatorima statusa (zeleno/crveno) koji su vidljivi čak i pod lošim laboratorijskim osvjetljenjem.
* **Efikasnost skeniranja:** QR kod integracija omogućava da od momenta skeniranja do prikaza ključne informacije o "ispravnosti" uređaja ne prođe više od dvije sekunde, čime se minimizira kognitivno opterećenje korisnika.
* **Fault Tolerance (Otpornost na greške):** Ako servis za generisanje PDF izvještaja nije dostupan, jezgro sistema (pregled opreme i prijava kvarova) nastavlja funkcionisati nezavisno.

---

## 4. Tehnička ahitektura i dizajn sistema
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

## 5. Razvojni dnevnik kroz sprintove (SCRUM EXECUTION)

Proces planiranja i dokumentovanja sistema ISOLO odvija se kroz iterativne cikluse (sprintove). Do sada su završena tri sprinta koja su se fokusirala na **"Human-First"** inžinjering — temeljnu analizu i projektovanje bez upotrebe AI alata, oslanjajući se isključivo na istraživački rad i kolaboraciju članova tima.

### 5.1 Sprint 1: Defisanje Vizije i Analiza Problematike
* **Fokus:** Identifikacija kritičnih tačaka u laboratorijskom okruženju i postavljanje ciljeva.
* **Aktivnosti:** * Detaljna analiza "crnih rupa" u informacionim tokovima (informaciona asimetrija između laboranata i menadžmenta).
    * Definisanje **Product Vision-a** i identifikacija ključnih korisnika sistema (Laborant, Šef laboratorije, Servisni tehničar).
    * Izrada početne mape uticaja i interesa stakeholdera.
    * **Komunikacijski kanali:** Uspostavljena primarna koordinacija putem **WhatsApp** grupe za brze dogovore i sinkronizaciju.
* **Ishod:** Jasno definisan obuhvat (Scope) projekta i strateški pravci transformacije procesa održavanja.

### 5.2 Sprint 2: Operativni Model i Planiranje Timskih Protokola
* **Fokus:** Uspostavljanje unutrašnje organizacije tima i pravila saradnje.
* **Aktivnosti:** * Izrada **Team Charter-a** i definisanje **RACI matrice** (odgovornosti članova tima za dokumentaciju).
    * Održavanje redovnih sastanaka putem **Google Meet** platforme radi detaljne diskusije o arhitekturi.
    * Definisanje kodeksa ponašanja i protokola za rješavanje konflikata unutar tima.
    * Postavljanje standarda za budući razvoj koda i politike pregleda (Code Review).
* **Ishod:** Operativan tim sa usuglašenim metodama komunikacije i jasnim granicama odgovornosti.

### 5.3 Sprint 3: Detaljna Specifikacija Arhitekture i QA Okvira
* **Fokus:** Tehničko modeliranje i definisanje kriterija kvaliteta.
* **Aktivnosti:** * Kreiranje prioritizovanog **Product Backlog-a** sa detaljnim korisničkim pričama (**User Stories**).
    * Definisanje striktnih kriterija prihvatanja (**Acceptance Criteria**) i nefunkcionalnih zahtjeva (NFR).
    * Modeliranje slojevite arhitekture sistema i ERD specifikacija baze podataka (entiteti i relacije).
    * Definisanje **Definition of Done (DoD)** liste i tabele detaljnih testnih scenarija za osiguranje kvaliteta.
* **Ishod:** Kompletirana tehnička i funkcionalna dokumentacija koja služi kao precizan nacrt za implementaciju softvera.


---

## 6. Decision Log 
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
      <td><b>DEC-01</b></td>
      <td>Tehnologija za Backend</td>
      <td>1. Python/Django (Brz razvoj)<br>2. Node.js/Express (JavaScript)</td>
      <td><b>Node.js:</b> Odabrano zbog uniformnosti jezika sa Frontend-om (Full-stack JS), što ubrzava razvoj i olakšava Code Review unutar tima.</td>
    </tr>
    <tr>
      <td><b>DEC-02</b></td>
      <td>Strategija pohrane slika</td>
      <td>1. Base64 u bazi (Sporo)<br>2. S3 Bucket (Dodatni trošak)<br>3. Lokalni Storage (FS)</td>
      <td><b>Lokalni Storage:</b> Odlučeno za MVP fazu (lokalni <code>/uploads</code> folder). Jednostavnije za dev okruženje uz planiranu migraciju na S3 kasnije.</td>
    </tr>
    <tr>
      <td><b>DEC-03</b></td>
      <td>Validacija podataka</td>
      <td>1. Ručna validacija u kontrolerima<br>2. Zod/Joi biblioteke</td>
      <td><b>Zod:</b> Omogućava TypeScript-like tipizaciju i "Schema-first" pristup koji automatski generiše tipove, smanjujući runtime greške.</td>
    </tr>
    <tr>
      <td><b>DEC-04</b></td>
      <td>ORM (Object-Relational Mapper)</td>
      <td>1. TypeORM (Kompleksan)<br>2. Sequelize (Stabilan, odlična dokumentacija)<br>3. Raw SQL</td>
      <td><b>Sequelize:</b> Odabran zbog moćnog migracijskog sistema i stabilne podrške za relacije između opreme, korisnika i servisnih zapisa.</td>
    </tr>
    <tr>
      <td><b>DEC-05</b></td>
      <td>Autentifikacija</td>
      <td>1. Session/Cookies (Stateful)<br>2. JWT - JSON Web Tokens (Stateless)</td>
      <td><b>JWT:</b> Omogućava skalabilnost i lakšu integraciju sa mobilnim skenerima u budućnosti. Čuva se u <code>HttpOnly</code> cookie-u radi sigurnosti.</td>
    </tr>
    <tr>
      <td><b>DEC-06</b></td>
      <td>State Management (Frontend)</td>
      <td>1. Redux (Robustan, ali "težak")<br>2. Context API (Ugrađen)<br>3. Zustand (Lagan i brz)</td>
      <td><b>Zustand + Context:</b> Context API koristimo za Auth stanje, a Zustand za globalno upravljanje filterima opreme i stanjem modala.</td>
    </tr>
    <tr>
      <td><b>DEC-07</b></td>
      <td>Generisanje QR kodova</td>
      <td>1. Serverski generisane slike<br>2. Client-side generisanje (Library)</td>
      <td><b>Client-side (qrcode.react):</b> Smanjuje opterećenje servera i pohranu. QR kod se generiše dinamički na osnovu UUID-a uređaja prilikom prikaza.</td>
    </tr>
    <tr>
      <td><b>DEC-08</b></td>
      <td>Baza Podataka</td>
      <td>1. MongoDB (NoSQL)<br>2. PostgreSQL (Relaciona baza)</td>
      <td><b>PostgreSQL:</b> Relacioni integritet je kritičan. Foreign Key ograničenja osiguravaju da se ne obriše uređaj koji ima aktivne servisne zapise.</td>
    </tr>
    <tr>
      <td><b>DEC-09</b></td>
      <td>Rukovanje datumima</td>
      <td>1. Native JS Date (Nepouzdan)<br>2. Day.js (Lagan i modularan)</td>
      <td><b>Day.js:</b> Neophodan za preciznu kalkulaciju kalibracijskih intervala (npr. dodavanje 6 ili 12 mjeseci na datum zadnjeg servisa).</td>
    </tr>
    <tr>
      <td><b>DEC-10</b></td>
      <td>UI Styling</td>
      <td>1. Klasični CSS/SASS<br>2. Tailwind CSS (Utility-first)</td>
      <td><b>Tailwind CSS:</b> Omogućava ultra-brz razvoj responzivnog sučelja koje je optimizovano za tablete koje laboranti koriste na terenu.</td>
    </tr>
    <tr>
      <td><b>DEC-11</b></td>
      <td>Logging i Error Tracking</td>
      <td>1. console.log (Samo dev)<br>2. Winston / Morgan (Strukturirani logovi)</td>
      <td><b>Winston + Morgan:</b> Omogućava bilježenje grešaka u <code>error.log</code> datoteke, što je ključno za debuggiranje produkcijskih problema.</td>
    </tr>
    <tr>
      <td><b>DEC-12</b></td>
      <td>API Arhitektura</td>
      <td>1. Monolitni kontroleri<br>2. Layered Architecture (Controller-Service-Repo)</td>
      <td><b>Layered:</b> Razdvajanje poslovne logike (Service) od HTTP logike (Controller) olakšava pisanje Unit testova i održavanje koda.</td>
    </tr>
  </tbody>
</table>

---

## 7. Strategija Testiranja i Kvaliteta (QA)

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

## 8. AI Usage Log (Evidencija AI Assistance)
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

### 9. Definition of Done (DoD)

**Definition of Done (DoD)** predstavlja finalni set striktnih kriterija koje svaka funkcionalnost, User Story ili ispravka bug-a mora ispuniti prije nego što se smatra završenom. Cilj je osigurati nultu stopu tehničkog duga i stopostotnu pouzdanost sistema u medicinskom okruženju.

#### 9.1 Arhitektura i Standardi Kodiranja
Prije nego što se kod pošalje na pregled, moraju biti ispunjeni sljedeći tehnički preduslovi:

<table>
  <thead>
    <tr>
      <th width="25%">Kategorija</th>
      <th width="45%">Kriterij ispunjenosti</th>
      <th width="30%">Metoda Provjere</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Struktura koda</b></td>
      <td>Kod prati <i>Layered Architecture</i> (Controller-Service-Repository). Nema direktnih SQL upita u kontrolerima.</td>
      <td>Manual Code Review</td>
    </tr>
    <tr>
      <td><b>Clean Code</b></td>
      <td>Promjenljive i funkcije imaju deskriptivna imena (CamelCase). Prolazak kroz <b>ESLint</b> i <b>Prettier</b> bez upozorenja.</td>
      <td>Statička analiza (Linting)</td>
    </tr>
    <tr>
      <td><b>Validacija</b></td>
      <td>Svi ulazni parametri su validirani na klijentu (React Hook Form + Zod) i serveru (Middleware schema check).</td>
      <td>Zod Schema Validation</td>
    </tr>
    <tr>
      <td><b>Integritet Baze</b></td>
      <td>Sve promjene u šemi su definisane kroz <b>Sequelize migracije</b>. Upiti su optimizovani (N+1 query problem eliminisan).</td>
      <td>DB Migration Logs</td>
    </tr>
  </tbody>
</table>

#### 9.2 Kvalitet, Testiranje i Sigurnost
Kvalitet softvera u ISOLO sistemu se ne provjerava samo manuelno, već kroz automatizovane procese:

* **Unit & Integration Testovi:** * Svaki novi endpoint mora imati set testova (Jest/Supertest) koji pokrivaju *Happy Path* i *Edge Cases* (npr. nevalidan JWT, nepostojeći ID).
    * Ukupna pokrivenost koda (Code Coverage) ne smije pasti ispod **80%** nakon uvođenja nove funkcionalnosti.
* **Security Audit:**
    * Nema hardkodovanih tajnih ključeva ili lozinki (korištenje `.env` varijabli).
    * Sve rute koje nisu javne (poput QR statusa) zahtijevaju validan `Authorization` header.
    * Rukovanje greškama ne otkriva detalje o infrastrukturi (Stack Trace je skriven u produkciji).
* **Performance Check:**
    * Novi upiti ne smiju usporiti učitavanje profila opreme iznad definisanih **1.5s**.
    * Slike se moraju obrađivati kroz `Sharp` biblioteku kako bi se smanjila težina fajlova na serveru.

#### 9.3 Dokumentacija i Korisničko Iskustvo (UX)
Funkcionalnost nije završena ako nije adekvatno dokumentovana i testirana na stvarnim uređajima:

<table>
  <thead>
    <tr>
      <th width="30%">Tip Dokumentacije</th>
      <th width="70%">Zahtjev</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Tehnička (API)</b></td>
      <td>Ažurirana Swagger/OpenAPI specifikacija. Svi novi <i>Request/Response</i> modeli su definisani.</td>
    </tr>
    <tr>
      <td><b>Korisnička</b></td>
      <td>Upute za rad sa novom funkcijom dodate u internu Wiki bazu tima.</td>
    </tr>
    <tr>
      <td><b>Vizuelna (UX)</b></td>
      <td>Dizajn je 100% u skladu sa Figma prototipom. Responzivnost potvrđena na rezolucijama (360px, 768px, 1440px).</td>
    </tr>
  </tbody>
</table>

#### 9.4 Finalni Deployment Protokol
Tek kada su svi gore navedeni koraci potvrđeni, pristupa se finalizaciji:

1.  **Peer Review:** Najmanje jedan senior developer ili Tech Lead je odobrio Pull Request (PR) na GitHubu.
2.  **Conflict Resolution:** Grana je sinhronizovana sa `main` granom i nema konflikata.
3.  **CI/CD Pipeline:** Sve faze automatizovanog build-a na GitHub Actions su prošle zeleno.
4.  **PO Acceptance:** Product Owner je testirao funkcionalnost u *Staging* okruženju i potvrdio da ispunjava biznis zahtjeve.

> **Napomena:** Svako odstupanje od ovog DoD protokola zahtijeva pismeno obrazloženje u `DecisionLog.md` dokumentu pod oznakom "Technical Debt".

---

## 10. Initial Release Plan (Plan puštanja prve verzije)

Ovaj plan definiše strategiju i korake prelaska sistema ISOLO iz razvojnog okruženja u produkciju, osiguravajući stabilnost za laborante i administratore.

### 10.1 Faze puštanja (Release Phases)

Sistem će biti puštan u fazama kako bi se minimizovali rizici i omogućila brza adaptacija korisnika na novi digitalni proces.

<table style="width:100%">
  <thead>
    <tr>
      <th align="left">Faza</th>
      <th align="left">Cilj i Opseg</th>
      <th align="left">Glavni Stakeholderi</th>
      <th align="left">Tehnički fokus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>MVP (Alpha)</b></td>
      <td>Osnovni CRUD opreme, generisanje QR kodova i autentifikacija korisnika.</td>
      <td>Interni razvojni tim</td>
      <td>Stabilnost baze i API rute</td>
    </tr>
    <tr>
      <td><b>Beta Release</b></td>
      <td>Modul za prijavu kvarova (Incidents) i osnovni pregled profila putem QR koda.</td>
      <td>Odabrani laboranti (Testers)</td>
      <td>UI/UX feedback i bug fixing</td>
    </tr>
    <tr>
      <td><b>V1.0 (Public)</b></td>
      <td>Puna integracija: Kalendari održavanja, PDF izvještaji i Dashboard analitika.</td>
      <td>Svi zaposlenici laboratorije</td>
      <td>Performanse i NFR provjera</td>
    </tr>
  </tbody>
</table>

### 10.2 Strategija Deploymenta i CI/CD
U skladu sa vašim tehničkim stack-om, koristimo automatizovani proces isporuke koda:

* **Infrastruktura:** Aplikacija se hostuje u **Docker** kontejnerima. Backend (Node.js/Express) komunicira sa PostgreSQL bazom, dok se Frontend (Vite/React) servira kao statički build.
* **Pipeline:** Svaki "Merge Request" u `main` granu koji odobri **Omar Alispahić** ili **Ilda Avdić** pokreće GitHub Actions:
    1.  Izvršavanje Jest testova (QA verifikacija - **Iman Salanović**).
    2.  Security scan (provjera `.env` varijabli i zavisnosti).
    3.  Automatski deployment na produkcijski server u slučaju uspješnog builda.

### 10.3 Kriteriji za uspješan Release (Checklist)

Prije nego što **Elma Dedić** (Scrum Master) potvrdi "Go-Live", moraju biti ispunjeni sljedeći uslovi:

* [ ] **Integritet koda:** Svi zadaci ispunjavaju *Definition of Done (DoD)*.
* [ ] **Migracije:** Sve Sequelize migracije su uspješno izvršene na produkcijskoj bazi.
* [ ] **Sigurnost:** SSL certifikat je aktivan i JWT tajni ključevi su sigurno pohranjeni.
* [ ] **Performanse:** Vrijeme učitavanja QR profila je ispod 1.5s (prema NFR zahtjevu).
* [ ] **Dokumentacija:** Swagger dokumentacija je dostupna za sve aktivne API rute.

### 10.4 Monitoring i podrška nakon puštanja
Nakon puštanja verzije 1.0, tim postupa po sljedećem protokolu:
1.  **Praćenje logova:** Korištenje *Morgan/Winston* logera za identifikaciju 500 (Server Error) grešaka u realnom vremenu.
2.  **Korisnički feedback:** **Suljo Ruvić** i **Harun Zukanović** prate interakciju korisnika sa mobilnim sučeljem radi UI optimizacije.
3.  **Hotfix:** Svaki kritični bug (P0) otkriven na produkciji mora biti adresiran u roku od 24h kroz ubrzani CI/CD ciklus.



## 11. Tehnički setup i instrukcije za razvoj

### 11.1 Preduslovi
- **Node.js:** v18.16.0 ili noviji.
- **Baza:** PostgreSQL v15.
- **Docker:** Opcionalno za izolaciju baze.

### 11.2 Brzo pokretanje
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



