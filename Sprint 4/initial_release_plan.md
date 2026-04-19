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

