# Sprint Retrospective Summary

**Sprint:** 8  
**Datum:** 19.05.2026.  
**Tim:** NRS-Grupa3  

---

## 1. Šta je išlo dobro
* **Vizuelna analitika out-of-the-box:** Integracija Chart.js (kroz Blazor interop/wrapper) omogućila je izuzetno brz i fluidan prikaz grafikona iskorištenosti opreme, što je u potpunosti ispunilo visoka očekivanja profesora i administratora (US-16).
* **Robustan i siguran CI/CD pipeline:** Uvođenje GitHub Actions automatizacije (OD-023) drastično je podiglo sigurnost deploymanta. Svaki Pull Request je automatski testiran, što je spriječilo da nedovršeni kod dospije na produkciju pred finalnu odbranu.
* **Efikasan In-App sistem obavještenja:** Donošenje odluke da se oslonimo na bazu-orijentisane notifikacije (OD-020) umjesto kompleksnih eksternih mail servera pokazalo se kao pun pogodak za stabilnost i brzinu prezentacije sistema (US-17).

## 2. Šta nije išlo dobro
* **Kompleksnost kaskadnih operacija u repozitoriju:** Implementacija automatskog upravljanja konfliktima (US-18) zahtijevala je kompleksne SQL transakcije unutar repozitorija. Kada se oprema označi kao "U kvaru", kaskadno otkazivanje stotina budućih rezervacija uzrokovalo je inicijalne probleme sa timeout-om baze.
* **Formatiranje i eksport velikih CSV datoteka:** Pri generisanju CSV izvještaja (US-19) za profesore, specijalni karakteri (poput č, ć, š) su bili pogrešno kodirani (UTF-8 encoding problem) u Excelu, što je zahtijevalo hitne popravke na frontend transformaciji.
* **Sinkronizacija asinhronih notifikacija u realnom vremenu:** UI indikator (zvonce za notifikacije) nije automatski osvježavao broj nepročitanih poruka bez ručnog reloadovanja stranice, što je zahtijevalo dodatno podešavanje stanja (StateHasChanged) unutar Blazor komponenti.

## 3. Šta treba promijeniti
* **Optimizacija SQL upita za masovne izmjene:** Umjesto pojedinačnog ažuriranja svake rezervacije u petlji, za masovna otkazivanja uslijed kvara opreme moramo koristiti masovne (bulk) update operacije direktno kroz bazu podataka kako bi se smanjilo opterećenje.
* **Rana validacija eksportovanih podataka:** Svi fajlovi namijenjeni krajnjem korisniku (CSV/PDF) moraju proći encoding provjeru na različitim operativnim sistemima (Windows/macOS) odmah u fazi razvoja, a ne tik pred deployment.
* **Definisanje jasne politike retencije logova:** Tabela `audit_logs` i historija incidenata (US-20) rastu eksponencijalno. U budućim iteracijama sistema potrebno je uvesti automatsko arhiviranje starih logova (starijih od 6 mjeseci) radi očuvanja performansi primarne baze.

## 4. Koje konkretne akcije tim uvodi nakon završetka projekta (Završna faza)
* **Akcija 1:** Implementacija UTF-8 Byte Order Mark (BOM) prefiksa u svim generisanim CSV stringovima kako bi Microsoft Excel automatski prepoznao naša lokalna slova (č, ć, ž, š, đ) pri otvaranju izvještaja.
* **Akcija 2:** Kreiranje indeksa nad `equipment_id` i `status` poljima u tabelama rezervacija i logova unutar `/database/migrations` skripti, kako bi se analitički upiti za Chart.js izvršavali ispod 100ms.
* **Akcija 3:** Dodavanje automatskog čišćenja (cleanup skripte) unutar GitHub Actions pipeline-a koja briše privremene Playwright browser binarne datoteke nakon uspješnog izvršavanja testova, čime se štedi dozvoljeni build time na repozitoriju.