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

### Inkrement 5 – Finalizacija, dodatne funkcionalnosti i priprema za isporuku
 
| Kategorija | Sadržaj |
|---|---|
| **Naziv** | Finalizacija, dodatne funkcionalnosti i priprema za isporuku |
| **Cilj** | Implementirati preostale Nice-to-Have funkcionalnosti iz backlog-a, provesti sveobuhvatno testiranje cijelog sistema, otkloniti sve poznate greške i pripremiti sistem za finalnu demonstraciju i predaju. Po završetku ovog inkrementa, sistem je potpuno funkcionalan, testiran i dokumentovan. |
| **Okvirni sprintovi** | Sprint 11 |
 
**Glavne funkcionalnosti:**
 
| ID | Funkcionalnost | Prioritet | Sprint |
|---|---|---|---|
| PB18 | Dodavanje slika i tehničkih specifikacija opreme (admin) | 🟢 Nice to Have | Sprint 11 |
| PB19 | Ocjenjivanje opreme od strane laboranta nakon korištenja | 🟢 Nice to Have | Sprint 11 |
| PB20 | Export podataka u CSV format (oprema, rezervacije, zalihe) | 🟢 Nice to Have | Sprint 11 |
| – | End-to-end testiranje svih kritičnih korisničkih tokova | Obavezno | Sprint 11 |
| – | Sigurnosni pregled svih API ruta i autorizacijskih provjera | Obavezno | Sprint 11 |
| – | Korisnička dokumentacija – vodič za laborante i administratore | Obavezno | Sprint 11 |
| – | Priprema za deployment (Docker konfiguracija, environment varijable) | Obavezno | Sprint 11 |
 
**Zavisnosti:**
 
| Zavisnost | Opis |
|---|---|
| Svi prethodni inkrementi moraju biti završeni | Testiranje i finalizacija pretpostavljaju potpuno funkcionalan sistem |
| PB18 ovisi o PB2 | Slike i specifikacije se dodaju na stranicu detalja opreme koja mora postojati |
| PB19 ovisi o PB3 i PB4 | Ocjenjivanje je moguće samo za rezervacije koje su završene |
| PB20 ovisi o PB12 i PB21 | Export podataka o rezervacijama i zalihama ovisi o tim funkcionalnostima |
 
**Glavni rizici:**
 
| Rizik | Uticaj | Plan ublažavanja |
|---|---|---|
| Nedovoljno vremena za testiranje zbog nagomilanog tehničkog duga | Visok | Kontinuirano testirati tokom svakog sprinta, ne čekati kraj projekta |
| PB18, PB19 i PB20 se ne stignu implementirati | Nizak | Sve tri stavke su Nice-to-Have i ne utiču na MVP – mogu biti odgođene |
| Problemi sa deployment konfiguracijom u zadnji čas | Srednji | Testirati Docker konfiguraciju već u Sprintu 10, ne ostavljati za Sprint 11 |
 
---

## Sumarni pregled svih inkremenata
 
| Inkrement | Naziv | Sprintovi | PB stavke | Status |
|---|---|---|---|---|
| **I1** | Tehnička infrastruktura i temelji | Sprint 4 | – | 🔄 U toku |
| **I2** | Osnovne funkcionalnosti – MVP Core | Sprint 5–6 | PB1, PB2, PB3, PB4, PB5, PB6, PB7, PB23, PB24, PB26 | 📋 Planirano |
| **I3** | Poboljšano korisničko iskustvo | Sprint 7–8 | PB8, PB9, PB10, PB11, PB12, PB13, PB14, PB15, PB25 | 📋 Planirano |
| **I4** | Laboratorijske funkcionalnosti i analitika | Sprint 9–10 | PB16, PB17, PB21, PB22, PB27 | 📋 Planirano |
| **I5** | Finalizacija i priprema za isporuku | Sprint 11 | PB18, PB19, PB20 | 📋 Planirano |
 
---

## MVP – Minimum Viable Product
 
MVP verzija sistema, koja pokriva sve High prioritet stavke iz Product Backlog-a, mora biti funkcionalna po završetku **Inkrementa 2** (kraj Sprinta 6).
 
| ID | Naziv | Prioritet | Inkrement | Sprint |
|---|---|---|---|---|
| PB23 | Autentifikacija korisnika | 🔴 Must Have | I2 | Sprint 5 |
| PB1 | Pregled opreme | 🔴 Must Have | I2 | Sprint 5 |
| PB2 | Detalji opreme | 🔴 Must Have | I2 | Sprint 5 |
| PB5 | Upravljanje opremom (admin) | 🔴 Must Have | I2 | Sprint 5 |
| PB3 | Rezervacija opreme | 🔴 Must Have | I2 | Sprint 5 |
| PB4 | Moje rezervacije | 🔴 Must Have | I2 | Sprint 5 |
| PB24 | Autorizacija (RBAC) | 🔴 Must Have | I2 | Sprint 6 |
| PB26 | Sprječavanje konflikta rezervacija | 🔴 Must Have | I2 | Sprint 6 |
| PB6 | Odobravanje rezervacija (admin) | 🔴 Must Have | I2 | Sprint 6 |
| PB7 | Status opreme (admin) | 🔴 Must Have | I2 | Sprint 6 |
| PB21 | Potrošnja repromaterijala | 🔴 Must Have | I4 | Sprint 9 |
| PB8 | Kalendar zauzeća | 🟡 Should Have | I3 | Sprint 7 |
| PB9 | Pretraga opreme | 🟡 Should Have | I3 | Sprint 7 |
| PB10 | Filtriranje opreme | 🟡 Should Have | I3 | Sprint 7 |
| PB13 | Otkazivanje rezervacije | 🟡 Should Have | I3 | Sprint 7 |
| PB14 | Izmjena rezervacije | 🟡 Should Have | I3 | Sprint 7 |
| PB11 | Notifikacije | 🟡 Should Have | I3 | Sprint 8 |
| PB12 | Pregled svih rezervacija (admin) | 🟡 Should Have | I3 | Sprint 8 |
| PB15 | Trenutno korištenje opreme | 🟡 Should Have | I3 | Sprint 8 |
| PB25 | Logovanje aktivnosti | 🟡 Should Have | I3 | Sprint 8 |
| PB22 | Pravila korištenja opreme | 🟡 Should Have | I4 | Sprint 9 |
| PB27 | Dashboard pregled | 🟢 Nice to Have | I4 | Sprint 10 |
| PB17 | Održavanje opreme | 🟢 Nice to Have | I4 | Sprint 10 |
| PB16 | Izvještaji | 🟢 Nice to Have | I4 | Sprint 10 |
| PB18 | Specifikacije i slike opreme | 🟢 Nice to Have | I5 | Sprint 11 |
| PB19 | Ocjenjivanje opreme | 🟢 Nice to Have | I5 | Sprint 11 |
| PB20 | Export podataka (CSV) | 🟢 Nice to Have | I5 | Sprint 11 |
 
---
