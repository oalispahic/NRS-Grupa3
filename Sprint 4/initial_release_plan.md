# Initial Release Plan – Sistem za upravljanje medicinskom laboratorijskom opremom
 
Initial Release Plan predstavlja strukturirani pregled svih planiranih aktivnosti, funkcionalnosti i tehničkih isporuka kroz sve sprintove projekta, sve do finalnog izdanja sistema. Ovaj dokument služi kao referentna tačka za cijeli tim – jasno definiše šta se gradi, kojim redoslijedom i na osnovu kojih prioriteta. Plan je direktno zasnovan na **[Product Backlogu](../Sprint%202/product_backlog_v2.md)** i **[Domain Modelu](../Sprint%203/domain_model.md)** koji su definisani u prethodnim sprintovima, a redoslijed implementacije određen je prema kombinaciji poslovne vrijednosti svake funkcionalnosti i tehničkih zavisnosti između njih.
 
---

## Tehnološki stack
 
| Sloj | Tehnologija | Uloga u projektu |
|---|---|---|
| **Frontend** | React | Komponentni UI, dinamički prikaz podataka, SPA arhitektura |
| **Backend** | Node.js + Express | REST API, implementacija poslovne logike, middleware |
| **Baza podataka** | PostgreSQL | Relaciona pohrana svih entiteta i njihovih veza |
| **Autentifikacija** | JWT + RBAC | Sigurna prijava korisnika, kontrola pristupa po ulozi |
| **Testiranje API-ja** | Postman | Ručno testiranje i validacija API endpointa |
| **Verzionisanje** | Git + GitHub | Upravljanje kodom, code review, branching strategija |
| **Deployment** | Docker (opcionalno) | Kontejnerizacija za konzistentno okruženje |
 
---

## Pregled faza projekta
 
Projekt je organizovan u dvije jasno odvojene faze:
 
**Human-First faza (Sprintovi 1–4):** Fokus je isključivo na istraživanju, planiranju i postavljanju temelja projekta. U ovoj fazi nema razvoja aplikacijskog koda. Tim radi na razumijevanju problema, prikupljanju i definisanju zahtjeva, modeliranju domene i uspostavljanju tehničke infrastrukture.
 
**AI-Enabled faza (Sprintovi 5–11):** Fokus je na aktivnoj implementaciji sistema. Tim razvija sve funkcionalnosti prema prioritetima definisanim u Product Backlogu, uz kontinuirano testiranje i poboljšanja.
 
---

## Planirani inkrementi / release cjeline
 
Sistem je podijeljen na **5 inkremenata** koji se logički nadovezuju jedan na drugi. Svaki inkrement donosi grupu funkcionalnosti koje zajedno čine zaokruženu cjelinu koja se može demonstrirati i validirati.
 
---
 
### Inkrement 1 – Tehnička infrastruktura i temelji sistema
 
| Kategorija | Sadržaj |
|---|---|
| **Naziv** | Tehnička infrastruktura i temelji sistema |
| **Cilj** | Uspostaviti potpuno funkcionalno razvojno okruženje i definisati standarde rada koji će biti korišeni u svim narednim inkramentima. Na kraju ovog inkrementa, tim mora imati pokrenuto razvojno okruženje u kojem svaki član može razvijati i testirati kod lokalno, kao i zajednički dogovor o svim tehničkim pravilima. |
| **Okvirni sprintovi** | Sprint 4 |
 
**Glavne funkcionalnosti:**
 
| ID | Funkcionalnost | Opis |
|---|---|---|
| – | Definition of Done | Dokument koji definiše kada se zadatak smatra završenim |
| – | Skeleton projekta | Inicijalizovana React app, Express server i PostgreSQL konekcija |
| – | GitHub repozitorij | Postavljeni branchevi, workflow za pull requestove i code review |
| – | Initial Release Plan | Ovaj dokument – plan isporuke sistema |
| – | Environment konfiguracija | `.env` fajlovi, dependency management, linting pravila |
 
**Zavisnosti:**
 
| Zavisnost | Opis |
|---|---|
| Nema prethodnih inkremenata | Ovo je polazna tačka – ne ovisi ni o čemu unutar projekta |
| Domain Model (Sprint 3) | Struktura baze podataka mora biti usklađena sa definisanim entitetima |
| Odabir tech stacka | Donesena odluka o React + Node.js + PostgreSQL mora biti finalizovana |
 
**Glavni rizici:**
 
| Rizik | Uticaj | Plan ublažavanja |
|---|---|---|
| Skeleton nije potpuno funkcionalan do kraja sprinta | Visok – blokira sve naredne inkrement | Skeleton je apsolutni prioritet broj jedan, svi ostali deliverable-i su sekundarni |
| Različita lokalna okruženja članova tima uzrokuju "radi kod mene" probleme | Srednji | Dokumentovati tačne verzije Node.js i PostgreSQL, koristiti `.nvmrc` fajl |
 
---

### Inkrement 2 – Osnovne funkcionalnosti i sigurnosni temelj (MVP Core)
 
| Kategorija | Sadržaj |
|---|---|
| **Naziv** | Osnovne funkcionalnosti i sigurnosni temelj |
| **Cilj** | Implementirati autentifikaciju, osnovne operacije nad opremom i mogućnost kreiranja rezervacija. Ovo je srž sistema – po završetku ovog inkrementa, korisnik se može prijaviti u sistem, pregledati opremu i kreirati zahtjev za rezervacijom, a administrator može upravljati opremom i odobriti zahtjeve. Sistem u ovoj fazi je minimalno ali potpuno upotrebljiv. |
| **Okvirni sprintovi** | Sprint 5, Sprint 6 |
 
**Glavne funkcionalnosti:**
 
| ID | Funkcionalnost | Prioritet | Sprint |
|---|---|---|---|
| PB23 | Autentifikacija korisnika (login/logout, JWT, bcrypt) | 🔴 Must Have | Sprint 5 |
| PB24 | Autorizacija – Role-Based Access Control (Admin/Laborant) | 🔴 Must Have | Sprint 6 |
| PB26 | Sprječavanje konflikta rezervacija – validacija preklapanja termina | 🔴 Must Have | Sprint 6 |
| PB1 | Pregled liste sve opreme sa statusima | 🔴 Must Have | Sprint 5 |
| PB2 | Detaljan prikaz pojedinačnog komada opreme | 🔴 Must Have | Sprint 5 |
| PB5 | Upravljanje opremom – dodavanje, uređivanje, brisanje (admin) | 🔴 Must Have | Sprint 5 |
| PB3 | Kreiranje zahtjeva za rezervacijom opreme | 🔴 Must Have | Sprint 5 |
| PB4 | Pregled vlastitih rezervacija (laborant) | 🔴 Must Have | Sprint 5 |
| PB6 | Odobravanje i odbijanje zahtjeva za rezervacijom (admin) | 🔴 Must Have | Sprint 6 |
| PB7 | Promjena statusa opreme – Dostupno / Servis / Van upotrebe (admin) | 🔴 Must Have | Sprint 6 |
 
**Zavisnosti:**
 
| Zavisnost | Opis |
|---|---|
| Inkrement 1 mora biti završen | Bez skeleta i baze, razvoj nije moguć |
| PB23 mora biti gotov prije svih ostalih stavki | Autentifikacija je preduvjet – sve ostale rute su zaštićene login-om |
| PB24 mora biti gotov prije PB6 i PB7 | Adminove funkcije mogu biti implementirane tek kad RBAC postoji |
| PB3 ovisi o PB1 | Korisnik mora moći vidjeti opremu da bi je rezervisao |
| PB26 mora biti integrisan u PB3 | Validacija konflikta mora biti dio procesa kreiranja rezervacije |
 
**Glavni rizici:**
 
| Rizik | Uticaj | Plan ublažavanja |
|---|---|---|
| Algoritam za detekciju preklapanja termina (PB26) složeniji od procjene | Visok – kritična funkcionalnost | Posvetiti posebnu pažnju SQL upitu, testirati sve rubne slučajeve (graničnih termina) |
| Sigurnosne ranjivosti u JWT implementaciji | Visok | Koristiti provjerene biblioteke (jsonwebtoken, bcrypt), ne pohranjivati JWT u localStorage |
| Predugo trajanje PB23 blokira ostatak tima | Srednji | Razvoj autentifikacije je prioritet od prvog dana Sprinta 5 |
 
---


### Inkrement 3 – Poboljšano korisničko iskustvo i upravljanje rezervacijama
 
| Kategorija | Sadržaj |
|---|---|
| **Naziv** | Poboljšano korisničko iskustvo i upravljanje rezervacijama |
| **Cilj** | Unaprijediti sistem vizualnim alatima koji olakšavaju svakodnevni rad laboranata i admina. Uvesti kalendarski prikaz zauzeća opreme, mogućnost pretrage i filtriranja, te fleksibilnost u izmjeni i otkazivanju rezervacija. Po završetku ovog inkrementa, sistem prelazi iz "upotrebljivog" u "ugodnog za korištenje". |
| **Okvirni sprintovi** | Sprint 7, Sprint 8 |
 
**Glavne funkcionalnosti:**
 
| ID | Funkcionalnost | Prioritet | Sprint |
|---|---|---|---|
| PB8 | Kalendarski prikaz zauzeća opreme po terminima | 🟡 Should Have | Sprint 7 |
| PB9 | Pretraga opreme po nazivu / modelu / serijskom broju | 🟡 Should Have | Sprint 7 |
| PB10 | Filtriranje opreme po statusu, kategoriji i lokaciji | 🟡 Should Have | Sprint 7 |
| PB13 | Otkazivanje vlastite rezervacije (laborant) | 🟡 Should Have | Sprint 7 |
| PB14 | Izmjena termina postojeće rezervacije u statusu "Na čekanju" | 🟡 Should Have | Sprint 7 |
| PB11 | In-app notifikacije o statusnim promjenama rezervacija | 🟡 Should Have | Sprint 8 |
| PB12 | Centralizovani pregled svih rezervacija sa filterima (admin) | 🟡 Should Have | Sprint 8 |
| PB15 | Pregled opreme koja je trenutno u aktivnom korištenju (admin) | 🟡 Should Have | Sprint 8 |
| PB25 | Dnevnik aktivnosti – automatsko logovanje kritičnih akcija (admin) | 🟡 Should Have | Sprint 8 |
 
**Zavisnosti:**
 
| Zavisnost | Opis |
|---|---|
| Inkrement 2 mora biti potpuno završen | Kalendar i upravljanje rezervacijama ovise o postojećim rezervacijama i opremi |
| PB8 ovisi o PB3 i PB6 | Kalendar prikazuje odobrene rezervacije – mora ih biti u bazi |
| PB14 ovisi o PB3 | Izmjena rezervacije pretpostavlja da rezervacija već postoji u sistemu |
| PB13 i PB14 moraju respektovati PB26 | Izmjena termina mora ponovo proći validaciju konflikta |
| PB25 ovisi o svim prethodnim akcijama | Audit log loguje akcije iz PB6, PB7 i ostalih – mora biti implementiran kao middleware |
 
**Glavni rizici:**
 
| Rizik | Uticaj | Plan ublažavanja |
|---|---|---|
| Integracija kalendarske biblioteke (PB8) može biti kompleksna | Srednji | Evaluirati FullCalendar unaprijed u Sprintu 6, imati fallback plan sa jednostavnijim prikazom |
| Notifikacijski sistem (PB11) zahtijeva dodatnu infrastrukturu (WebSocket ili polling) | Srednji | Početi sa polling pristupom kao jednostavnijim rješenjem, WebSocket kao nadogradnja |
| Sprint 7 ima 5 stavki – rizik od preopterećenja | Srednji | Definisati jasnu podjelu zadataka unutar tima na početku sprinta |
 
---


### Inkrement 4 – Specifične laboratorijske funkcionalnosti i analitika
 
| Kategorija | Sadržaj |
|---|---|
| **Naziv** | Specifične laboratorijske funkcionalnosti i analitika |
| **Cilj** | Implementirati funkcionalnosti koje sistem čine specifičnim za medicinsko laboratorijsko okruženje – evidenciju potrošnog materijala, pravila korištenja opreme, servisnu historiju i analitičke alate. Po završetku ovog inkrementa, sistem pokriva sve operativne potrebe laboratorije, uključujući upravljanje zalihama i planiranje servisnih intervencija. |
| **Okvirni sprintovi** | Sprint 9, Sprint 10 |
 
**Glavne funkcionalnosti:**
 
| ID | Funkcionalnost | Prioritet | Sprint |
|---|---|---|---|
| PB21 | Evidencija i praćenje potrošnje repromaterijala sa automatskim upozorenjima | 🔴 Must Have | Sprint 9 |
| PB22 | Definisanje pravila korištenja opreme (max trajanje, razmak između upotreba) | 🟡 Should Have | Sprint 9 |
| PB27 | Dashboard – pregled ključnih metrika prilagođen ulozi korisnika | 🟢 Nice to Have | Sprint 10 |
| PB17 | Servisni karton – evidencija i historija održavanja opreme | 🟢 Nice to Have | Sprint 10 |
| PB16 | Generisanje izvještaja o korištenju opreme i stanju zaliha | 🟢 Nice to Have | Sprint 10 |
 
**Zavisnosti:**
 
| Zavisnost | Opis |
|---|---|
| Inkrement 2 i 3 moraju biti završeni | Repromaterijal i pravila ovise o postojećoj opremi i rezervacijama |
| PB21 ovisi o PB3 | Potrošnja materijala se evidentira uz rezervaciju – ta veza mora postojati |
| PB22 mora biti integrisan u PB26 | Nova pravila (max trajanje, razmak) moraju biti dio validacije termina |
| PB16 i PB27 ovise o svim prethodnim podacima | Izvještaji i dashboard su agregacija podataka koji nastaju u svim ranijim inkramentima |
| PB17 ovisi o PB7 | Servisna historija vezana je uz status opreme – logički nastavak |
 
**Glavni rizici:**
 
| Rizik | Uticaj | Plan ublažavanja |
|---|---|---|
| N:M relacija između opreme i repromaterijala (PB21) složenija od procjene | Srednji | Pažljivo modelisati posredničku tabelu, razjasniti sve slučajeve korištenja prije implementacije |
| Agregacijski SQL upiti za izvještaje (PB16) mogu biti spori na većim skupovima podataka | Nizak | Koristiti indekse na ključnim kolonama (datum, id opreme), paginirati rezultate |
| Dashboard (PB27) može prerasti u zasebnu mini-aplikaciju | Nizak | Ograničiti scope na 4-5 ključnih widgeta, ne dodavati nove bez odobrenja tima |
 
---
