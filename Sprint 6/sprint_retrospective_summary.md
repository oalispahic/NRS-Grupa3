# Sprint Retrospective Summary

**Sprint:** 6  
**Datum:** 06.05.2026.  
**Tim:** NRS-Grupa3  

---

## 1. Šta je išlo dobro
* **Tehnička produktivnost:** Implementacija složenih funkcionalnosti (Registracija, RBAC spinner, Skeletons) završena je brže nego u prethodnim sprintovima zahvaljujući jasnijoj podjeli posla.
* **Kvalitet UI-ja:** Uvođenje centralizovanog `theme.js` fajla se pokazalo kao odlična odluka – dizajn je konzistentan, a dodavanje animacija je bilo jednostavno.
* **Lokalizacija:** Prebacivanje svih poruka na bosanski jezik značajno je poboljšalo "look and feel" aplikacije.

## 2. Šta nije išlo dobro
* **Git workflow (Merge/Rebase):** Imali smo poteškoća sa sinhronizacijom grana i divergentnim historijama, što je dovelo do "nasilnog" čišćenja commit poruka i force-pushovanja na `main`.
* **Deployment iznenađenja:** Problemi sa Environment varijablama na Vercelu su nas usporili jer lokalno okruženje nije u potpunosti simuliralo produkcijske restrikcije.
* **Vremenska procjena testiranja:** Postavljanje Playwright infrastrukture je oduzelo više vremena nego što je planirano, ostavljajući manje prostora za pisanje samih testnih scenarija.

## 3. Šta treba promijeniti
* **Komunikacija prije Pull-a:** Uvesti pravilo da se kolege obavijeste prije većih merge-ova kako bi se izbjegli kompleksni konflikti.
* **Testiranje Env varijabli:** Svaka nova varijabla mora biti dokumentovana u `README.template` fajlu odmah nakon što se doda u `.env`.
* **Vim editor:** Konfigurisati Git da koristi VS Code (ili drugi jednostavniji editor) za merge poruke umjesto podrazumijevanog Vima, kako bi se izbjeglo "zaglavljivanje" u terminalu.

## 4. Koje konkretne akcije tim uvodi u narednom sprintu
* **Akcija 1:** Prije svakog početka rada, obavezan `git pull origin main` uz `git config pull.rebase false` kako bi se spriječili divergentni problemi.
* **Akcija 2:** Svaki novi API endpoint mora imati barem jedan osnovni Playwright test (tzv. "smoke test") prije nego se proglasi završenim.
* **Akcija 3:** Implementacija `httpOnly` cookie mehanizma kao prioritet br. 1 radi rješavanja sigurnosnog duga iz Sprinta 5 i 6.
