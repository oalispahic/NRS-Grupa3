# Sprint Retrospective Summary

**Sprint:** 9  
**Datum:** 24.05.2026.  
**Tim:** NRS-Grupa3  

---

## 1. Šta je išlo dobro

* **Jasna arhitekturna konzistentnost:** Svi novi moduli (lokacije, repromaterijal, settings, statistike) su implementirani po istom repository → service → controller → route obrascu koji tim koristi od Sprinta 5. Nova infrastruktura nije zahtijevala nikakve pojašnjenja arhitekturnih odluka jer su konvencije dobro utvrđene.

* **Transakcijska sigurnost adjustQuantity operacije:** Implementacija adjust funkcionalnosti za repromaterijal je od prvog pokušaja korektno koristila BEGIN/COMMIT transakcijsku semantiku — promjena količine i log zapis su atomarni, nema mogućnosti nedosljednog stanja u bazi.

* **Statistička stranica s paralelnim upitima:** Korištenjem `Promise.all` za 4 međusobno nezavisna SQL upita, stranica statistika postiže latenciju jednog (najsporijeg) upita umjesto zbira svih — odmah je implementirano ispravno, bez naknadnih optimizacija.

---

## 2. Šta nije išlo dobro

* **Više iteracija planiranja za Sprint 9 backlog:** Definisanje 8 novih stavki zahtijevalo je 3 iteracije jer inicijalni prijedlozi nisu bili u potpunosti novi — tim je morao eksplicitno napomenuti da se ne smiju ponavljati koncepti iz prethodnih sprintova. Bolja inicijalna kontekstualizacija bi uštedjela jedno-dva raunda back-and-forth komunikacije.

* **Git konflikti pri pushu:** Divergirani remote commit uzrokovao je odbijanje push-a što je zahtijevalo git pull --rebase workflow. Bolja koordinacija timskih commitova i redovitiji pull s remote-a bi minimizirali ovu vrstu blokatora.

* **Paralelna egzistencija `location` i `location_id` kolona:** Uvedena je nova `location_id` FK kolona pored postojeće slobodne tekstualne `location` kolone, što znači da isti entitet ima dva mjesta za lokacijsku informaciju. Ovo je tehnički dug koji zahtijeva eventual cleanup.

---

## 3. Šta treba promijeniti

* **Unaprijed definisati "Šta NIJE u opsegu sprinta":** Svaki sprint planning treba eksplicitno navesti koje stavke su van opsega i zašto — to sprečava predlaganje varijanti već implementiranih funcionalnosti i smanjuje broj plannih iteracija.

* **Uvesti pull-before-commit politiku:** Svaki tim član treba napraviti `git pull --rebase` neposredno prije commitanja kako bi se smanjio broj divergiranih historija i potreba za force-pushom ili rebasing-om.

* **Planirati cleanup "dual-field" situacija:** Kada se uvodi strukturiraniji zamjenski koncept (npr. `location_id` umjesto `location`), odmah planirati migracijsku skriptu za prenos podataka iz starog u novo polje i deprecation starog — ne ostavljati oba paralelno bez jasnog plana.

---

## 4. Koje konkretne akcije tim uvodi za Sprint 10

* **Akcija 1:** Na početku Sprint 10 planning sesije eksplicitno navesti listu PB stavki koje su "Done" ili "ne dolaze u obzir" i zašto — spriječiti dupliciranje prijedloga koji su bili razmatrani ali odbačeni.

* **Akcija 2:** Dodati `git pull --rebase origin main` kao obavezan korak u tim's "Definition of Ready" za push — formalizirati u CONTEXT.md ili README.md.

* **Akcija 3:** Kreirati migracijsku skriptu koja kopira vrijdnosti iz `equipment.location` (tekstualno) u `locations` tabelu i ažurira `equipment.location_id` za sve aparate koji imaju tekst ali nemaju FK — eliminisati dualnu situaciju.
