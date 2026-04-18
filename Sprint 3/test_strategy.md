
## 1. Cilj testiranja 
Glavni cilj testiranja je da sistem bude pouzdan, siguran i funkcionalan u svakodnevnom radu laboratorije. Važno je spriječiti probleme kao što su duple rezervacije, neovlašten pristup administratorskim funkcijama i netačno evidentiranje aktivnosti u sistemu. Testiranjem želimo na vrijeme uočiti greške i potvrditi da sistem radi u skladu sa definisanim zahtjevima.

### 1.1. Specifični ciljevi (Technical QA Objectives)
Osim osnovne funkcionalnosti, fokusiramo se na:
* **Integritet baze podataka:** Validacija da svaki `Equipment` entitet ispravno korelira sa svojim `Reservation` statusom.
* **RBAC (Role-Based Access Control):** Rigorozna provjera da student ne može pristupiti ruti `/api/admin/**`.
* **Concurrency Control:** Eliminacija "Race Condition" problema kod istovremenih pokušaja rezervacije istog mikroskopa ili instrumenta.
* **Data Consistency:** Osiguravanje da se prilikom otpisa materijala (Inventory) stanje u bazi ne može spustiti ispod nule.

---

## 2. Nivoi testiranja 
- **Unit testiranje**
   Ovaj nivo testiranja koristi se za provjeru pojedinačnih dijelova sistema, odnosno funkcija i logike unutar aplikacije. Fokus je na testiranju servisnih metoda (npr. u `UserService` ili `EquipmentService`) izolovanih od baze podataka koristeći Mockito.

- **Integraciono testiranje**
   Na ovom nivou provjerava se da li različiti dijelovi sistema ispravno rade zajedno, na primjer aplikacija, baza podataka i API. Ovdje verifikujemo JPA Repository upite i komunikaciju između Spring Boot kontrolera i PostgreSQL baze.

- **Sistemsko testiranje**
   Sistemsko testiranje obuhvata provjeru kompletnog sistema kao cjeline, odnosno rada svih glavnih funkcionalnosti zajedno. Testiramo cjelokupni "Business Flow" od momenta prijave na React frontend do upisa transakcije u bazu podataka.

- **Prihvatno testiranje**
   Ovaj nivo testiranja služi da se provjeri da li sistem ispunjava očekivanja korisnika i acceptance kriterije definisane za user storyje. Ovo uključuje verifikaciju od strane krajnjeg korisnika (asistent/laborant) na staging okruženju.

---

## 3. Šta se testira u kojem nivou
Na nivou unit testiranja pažnja je usmjerena na pojedinačne dijelove sistema. Tu se provjerava da li osnovne funkcije rade ispravno same za sebe, bez uticaja drugih dijelova aplikacije. To uključuje prijavu korisnika, provjeru korisničkih uloga, validaciju rezervacija, kao i funkcije za pretragu i filtriranje opreme.

Kod integracionog testiranja fokus je na tome da različiti dijelovi sistema pravilno sarađuju. Ovdje je važno provjeriti da li se podaci ispravno prenose između aplikacije, baze podataka i ostalih dijelova sistema. Na ovom nivou testiraju se tokovi kao što su rezervacija opreme, odobravanje rezervacija, promjena statusa opreme i razmjena podataka između korisničkog interfejsa i baze.

Sistemsko testiranje obuhvata rad sistema kao cjeline. Tu se provjerava kako sve glavne funkcionalnosti rade zajedno u realnim uslovima korištenja. Posebna pažnja se posvećuje funkcijama kao što su pregled opreme, rezervacije, kalendar zauzeća, notifikacije i upravljanje opremom, kako bi se potvrdilo da sistem kao cjelina radi stabilno i logično.

Na kraju, kroz prihvatno testiranje provjerava se da li su funkcionalnosti sistema usklađene sa acceptance kriterijima definisanim za user storyje. Cilj ovog nivoa testiranja je potvrditi da sistem ispunjava ono što je planirano i da su funkcionalnosti spremne za korištenje iz ugla krajnjeg korisnika.

### 3.1. Detaljna matrica tehničkih testova
<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Modul</th>
      <th>Metoda Testiranja</th>
      <th>Opis Scenarija</th>
      <th>Očekivani Ishod</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Autentifikacija</b></td>
      <td>Unit / JWT</td>
      <td>Validacija generisanja JWT tokena sa claims za ulogu STUDENT.</td>
      <td>Token sadrži ispravan "scope" i "exp" datum.</td>
    </tr>
    <tr>
      <td><b>Rezervacije</b></td>
      <td>Integration</td>
      <td>Pokušaj rezervacije u terminu koji se preklapa za 1 minutu.</td>
      <td>Baza odbija upis uz Error 409 Conflict.</td>
    </tr>
    <tr>
      <td><b>Inventar</b></td>
      <td>Unit</td>
      <td>Smanjenje zaliha materijala ispod dostupne količine.</td>
      <td>Custom Exception: "Insufficient material quantity".</td>
    </tr>
    <tr>
      <td><b>Frontend</b></td>
      <td>System (E2E)</td>
      <td>Prikaz kalendara zauzeća za selektovani laboratorijski instrument.</td>
      <td>Kalendar ispravno renderuje zauzete slotove iz baze.</td>
    </tr>
  </tbody>
</table>

---

## 4. Veza sa acceptance kriterijima
Acceptance kriteriji predstavljaju direktnu osnovu za testiranje funkcionalnosti sistema, jer jasno definišu šta sistem treba uraditi u određenim situacijama i koji rezultat se očekuje. Na osnovu njih se za svaki user story može provjeriti da li je funkcionalnost ispravno implementirana, odnosno da li sistem reaguje onako kako je planirano. Na taj način postoji jasna veza između zahtjeva, user storyja i samog procesa testiranja.

U praksi to znači da se svaki acceptance kriterij može posmatrati kao uslov koji treba potvrditi kroz testiranje. Ako sistem ispuni definisane kriterije, funkcionalnost se može smatrati prihvaćenom, a ako ih ne ispuni, potrebno je izvršiti dorade prije nego što se funkcionalnost smatra završenom. Ovakav pristup omogućava da testiranje bude jasnije, mjerljivije i direktno povezano sa onim što je unaprijed definisano u dokumentaciji.

### 4.1. Mapiranje User Story-a na AC testove
<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>User Story ID</th>
      <th>Opis zahtjeva</th>
      <th>Acceptance Criterion (AC)</th>
      <th>Status Testiranja</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>US-01</b></td>
      <td>Pregled opreme</td>
      <td>Sistem mora filtrirati opremu po laboratorijama.</td>
      <td>Prošlo</td>
    </tr>
    <tr>
      <td><b>US-02</b></td>
      <td>Rezervacija resursa</td>
      <td>Korisnik ne može rezervisati više od 3 sata dnevno.</td>
      <td>U testiranju</td>
    </tr>
    <tr>
      <td><b>US-03</b></td>
      <td>Upravljanje inventarom</td>
      <td>Sistem šalje notifikaciju kada zaliha padne ispod 5%.</td>
      <td> Palo (Bug #44)</td>
    </tr>
  </tbody>
</table>

---

## 5. Način evidentiranja rezultata testiranja
Rezultati testiranja evidentiraju se kroz provjeru user storyja i pripadajućih acceptance kriterija, tako da se za svaku funkcionalnost može jasno utvrditi da li je ispunila očekivano ponašanje sistema. Za svaki test potrebno je zabilježiti koji user story i koji acceptance kriterij se provjerava, koji je očekivani rezultat, šta je stvarno dobijeno i da li je test uspješno prošao ili nije. Na taj način se može pratiti koje funkcionalnosti su spremne, a koje zahtijevaju doradu ili ponovno testiranje.

### 5.1. Standardni format Test Reporta (Bug Log)
Svaki propust se dokumentuje u QA dnevniku sa sljedećim poljima:
* **Test ID:** Jedinstveni identifikator testa (npr. TS-001).
* **Ozbiljnost (Severity):** (Kritična, Visoka, Srednja, Niska).
* **Koraci za reprodukciju:** Detaljan opis klikova i unosa koji dovode do greške.
* **Logs:** Izvod iz `catalina.out` ili `Spring Boot` konzole.

---

## 6. Glavni rizici kvaliteta 
Glavni rizici kvaliteta u ovom sistemu odnose se na mogućnost duplih rezervacija, odnosno preklapanja termina za istu opremu, jer bi to direktno uticalo na organizaciju rada i dostupnost laboratorijskih resursa. Pored toga, važan rizik predstavlja i neispravno upravljanje dozvolama pristupa, odnosno situacija u kojoj bi korisnik bez odgovarajućih ovlaštenja mogao pristupiti administratorskim funkcijama ili mijenjati važne podatke u sistemu.

Dodatni rizici kvaliteta odnose se na mogući pad sistema i probleme sa oporavkom podataka, kao i na netačno evidentiranje stanja zaliha repromaterijala. Ako sistem ne prikazuje stvarno stanje zaliha ili ne evidentira promjene ispravno, to može dovesti do problema u svakodnevnom radu laboratorije. Zbog toga je posebno važno obratiti pažnju na tačnost rezervacija, sigurnost pristupa, pouzdanost sistema i ispravno vođenje podataka o potrošnji materijala.

### 6.2. Matrica rizika i mitigacije (Ublažavanje)
<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Opis Rizika</th>
      <th>Uticaj</th>
      <th>Strategija Ublažavanja</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Race Condition (Rezervacije)</b></td>
      <td>Kritičan</td>
      <td>Implementacija @Version (Optimistic Locking) u JPA.</td>
    </tr>
    <tr>
      <td><b>Curenje JWT Tokena</b></td>
      <td>Visok</td>
      <td>Postavljanje kratkog vijeka trajanja (Exp) i obavezan HTTPS.</td>
    </tr>
    <tr>
      <td><b>Gubitak podataka u inventaru</b></td>
      <td>Srednji</td>
      <td>Audit tabele koje bilježe svaku promjenu (History Log).</td>
    </tr>
  </tbody>
</table>

---

## 7. Vizuelni prikaz testnog toka (Mermaid Dijagram)
Ispod je prikazan tok testiranja u sklopu CI/CD pipeline-a:

```mermaid
graph TD
    UI[UI / E2E Testovi - Najmanji broj]
    INT[Integracioni Testovi - Srednji broj]
    UNIT[Unit Testovi - Najveći broj]

    UI --- INT
    INT --- UNIT
    
    subgraph Piramida_Testiranja
    UI
    INT
    UNIT
    end

---

## 8. Strategije Testiranja (Component Deep-Dive)

### 8.1. Backend Testiranje (Spring Boot Arhitektura)
S obzirom na backend baziran na Java Spring Boot okviru, testiranje se fokusira na robusnost API endpointa, stabilnost poslovne logike i integritet perzistentnog sloja.

* **Validacija Entiteta (Bean Validation):** Svaki model (npr. `Equipment`, `User`, `Reservation`) testira se na ispravnost anotacija.
    * **Test Case:** Pokušaj slanja `Reservation` objekta sa datumom u prošlosti.
    * **Očekivani rezultat:** Sistem baca `MethodArgumentNotValidException` i vraća `400 Bad Request`.
* **Testiranje Servisnog Sloja (Business Logic):** Koristi se Mockito za izolaciju servisa. Fokus je na kompleksnim pravilima:
    * **Pravilo prekoračenja vremena:** Verifikacija da metoda `createReservation` odbija zahtjev ako student već ima 3 sata aktivnih rezervacija u tom danu.
    * **Logika Inventara:** Testiranje metode `decrementStock` koja mora baciti custom `InsufficientStockException` ako je zahtijevana količina veća od dostupne.
* **Integracioni testovi API-ja (MockMvc):** Simuliraju se stvarni HTTP pozivi bez podizanja cijelog servera.
    * **Endpoint Coverage:** Provjera svih CRUD operacija (`GET /api/equipment`, `POST /api/reservations`, `PATCH /api/inventory/{id}`).
    * **JSON Mapping:** Provjera da li se Java `LocalDateTime` ispravno serijalizuje u ISO-8601 format koji React frontend očekuje.

### 8.2. Frontend Testiranje (React.js)
Testiranje korisničkog interfejsa osigurava da korisnici imaju stabilno iskustvo bez obzira na uređaj ili stanje mreže.

* **Unit Testiranje Komponenti (Jest & React Testing Library):**
    * **Renderovanje:** Provjera da li se dugme "Otkaži rezervaciju" prikazuje samo ako je korisnik vlasnik te rezervacije.
    * **Interakcija:** Simulacija klika na filter laboratorije i provjera da li se lista opreme ispravno ažurira u DOM-u.
* **Handling API Error-a & Edge Cases:**
    * **Stubbing:** Simuliramo "500 Internal Server Error" sa backenda da potvrdimo da aplikacija prikazuje ljubaznu poruku o grešci umjesto pucanja (Crash).
    * **Empty States:** Provjera prikaza komponente "Nema pronađene opreme" kada pretraga ne vrati rezultate.
* **User Flow (E2E) & Router Testing:**
    * Provjera navigacije (React Router) – osiguravanje da neprijavljeni korisnik bude automatski prebačen na `/login` stranicu ako pokuša pristupiti ruti `/dashboard`.

### 8.3. Sigurnosno testiranje (Security & JWT)
Sistem rukuje privatnim podacima studenata i pristupom skupoj opremi, što zahtijeva rigorozne provjere.

* **JWT Token Lifecycle:**
    * **Signature Testing:** Testiranje pokušaja pristupa sa tokenom koji je potpisan nevažećim ključem (Sistem mora vratiti `401 Unauthorized`).
    * **Expiration:** Provjera da li sistem automatski izbacuje korisnika nakon isteka `exp` claim-a u tokenu.
* **Horizontalna i Vertikalna autorizacija:**
    * **Vertikalna:** Student ne smije pristupiti `/api/admin/**`.
    * **Horizontalna:** Student A ne smije moći obrisati ili modifikovati rezervaciju koja pripada Studentu B (Provjera `OwnerID` logike).
* **Data Masking:** Provjera da API odgovor ne sadrži osjetljive podatke poput lozinki (čak i u hash formatu) ili privatnih ključeva u JSON payload-u.

### 8.4. Upravljanje testnim podacima (Data Management)
Za kvalitetno testiranje neophodni su stabilni podaci koji ne kontaminiraju produkciju.

* **Izolacija baze podataka:** Korištenje `Testcontainers` (Docker kontejner sa PostgreSQL) za integracione testove, čime se osigurava da svaki test radi u identičnom, čistom okruženju.
* **Mocking strategija:** Za eksterne servise (npr. slanje email notifikacija) koristi se `MockBean` kako bi se izbjeglo slanje stvarnih mailova tokom testiranja.

---

## 9. Metrike uspjeha i kriteriji završetka (Exit Criteria)

Testiranje se smatra uspješnim, a verzija spremnom za deployment, samo ako su ispunjeni sljedeći kvantitativni i kvalitativni uslovi:

1.  **Code Coverage (Pokrivenost koda):**
    * Minimalno **80%** pokrivenosti za `Service` sloj (poslovna logika).
    * Minimalno **60%** pokrivenosti za `Controller` sloj (API rute).
    * Svi kritični algoritmi (npr. algoritam za detekciju preklapanja termina) moraju imati **100%** coverage.
2.  **Pass Rate:**
    * **100%** svih automatizovanih testova mora biti zeleno. Nijedan test ne smije biti "skipping" (označen sa `@Ignore`) bez validne dokumentacije zašto.
3.  **Defect Density (Gustoća defekata):**
    * Nula (0) otvorenih defekata visokog (High) ili kritičnog (Critical) prioriteta.
    * Svi "Medium" bugovi moraju imati dokumentovan "Workaround" ili plan za rješavanje u sljedećem sprintu.
4.  **Performanse & Responzivnost:**
    * Vrijeme učitavanja Dashboard-a ne smije prelaziti **1.5 sekundi** na standardnoj 4G mreži.
    * Sistem mora podržati minimalno **50 istovremenih korisnika** bez povećanja latencije iznad 2 sekunde.
5.  **Dokumentacija:**
    * Swagger (OpenAPI) dokumentacija mora biti ažurirana i testirana tako da svaki endpoint odgovara opisu.

---

## 10. Alati i Tehnologije

Kompletan QA proces se oslanja na sljedeći tehnološki stack:

* **Backend (Java/Spring Boot):**
    * **JUnit 5:** Osnovni framework za pisanje i pokretanje testova.
    * **Mockito:** Za kreiranje mock objekata i simuliranje ponašanja zavisnosti.
    * **AssertJ:** Za pisanje čitljivih i tečnih "assertion" provjera (npr. `assertThat(result).isNotNull()`).
    * **Hamcrest:** Za kompleksno mečiranje JSON odgovora u integracionim testovima.
* **Frontend (React):**
    * **Jest:** Runner za pokretanje JavaScript testova.
    * **React Testing Library (RTL):** Za testiranje komponenti iz perspektive korisnika (fokus na DOM, a ne na internu implementaciju).
    * **Cypress / Playwright:** (Opcionalno) Za automatizovane End-to-End (E2E) testove u stvarnom browseru.
* **Infrastruktura & Monitoring:**
    * **H2 Database:** In-memory baza za ultra-brzo izvršavanje unit testova.
    * **Postman:** Za ad-hoc testiranje, kreiranje testnih kolekcija i automatsko dokumentovanje API-ja.
    * **GitHub Actions:** CI/CD alat koji pokreće cijeli testni suite pri svakom "Push" ili "Pull Request" događaju na granu `main` ili `develop`.
    * **SonarLint / SonarQube:** Alat za statičku analizu koda koji detektuje sigurnosne propuste i "Code Smell" (loše prakse pisanja koda).