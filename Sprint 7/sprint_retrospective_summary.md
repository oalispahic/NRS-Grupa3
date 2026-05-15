# Sprint Retrospective Summary

**Sprint:** 7  
**Datum:** 14.05.2026.  
**Tim:** NRS-Grupa3  

---

## 1. Šta je išlo dobro
* **Uspješna reimplementacija dostupnosti:** Prelazak sa linearne liste na kalendarski (Grid) prikaz unutar Blazora u potpunosti je riješio problem nefunkcionalnosti modula iz prethodnog sprinta.
* **Stabilnost biznis logike:** Uvođenje dvostruke validacije kroz `FluentValidation` na backendu i klijentsku provjeru u Blazoru drastično je smanjilo mogućnost "double-bookinga" i unosa nevalidnih datuma.
* **Kvalitet podataka o opremi:** Adresiran je komentar asistenta iz prošlog sprinta – baza podataka je uspješno proširena detaljnim tehničkim specifikacijama i serijskim brojevima kroz stabilne SQL migracije.

## 2. Šta nije išlo dobro
* **Kompleksnost bUnit i xUnit testiranja:** Prelazak sa Node.js okruženja (Jest/Vitest) na .NET testni stek (xUnit i bUnit) donio je strmu krivu učenja, što nam je uzelo više vremena od planiranog za pisanje komponentnih testova.
* **Upravljanje vremenskim zonama (DateTime):** Implementacija poslovnog pravila o restrikciji otkazivanja unutar 24h izazvala je neočekivane probleme na backendu zbog neslaganja lokalnog vremena i UTC formata pri kalkulaciji slotova.
* **EF Core i PostgreSQL Enum mapiranje:** Inicijalno povezivanje PostgreSQL `Enum` tipova za statuse rezervacija (Pending, Approved, Rejected) sa EF Core modelima uzrokovalo je nekoliko grešaka pri migraciji baze u ranoj fazi sprinta.

## 3. Šta treba promijeniti
* **Pisanje testova paralelno sa kodom:** Umjesto ostavljanja bUnit testova za kraj sprinta, komponente i njihovi render testovi se moraju pisati simultano (ili kroz bazični TDD pristup).
* **Standardizacija DateTime objekata:** Svi vremenski unosi sa frontenda se moraju slati isključivo u ISO 8606 UTC formatu kako bi se izbjegle kalkulacijske greške u middleware-u.
* **Preciznija procjena za R&D zadatke:** Za svaku novu biblioteku ili tehnologiju (poput bUnit-a) u planiranju sprinta moramo odvojiti poseban "Spike" task za istraživanje i postavku okruženja.

## 4. Koje konkretne akcije tim uvodi u narednom sprintu
* **Akcija 1:** Uspostavljanje `BaseTest` klase u testnom projektu sa već pripremljenim mock-ovima za `MockAuthenticationStateProvider` i DB kontekst, kako bi se ubrzalo pisanje novih testova.
* **Akcija 2:** Svaki pull request koji uključuje izmjenu nad `Equipment` ili `Reservation` entitetima mora proći automatsku provjeru migracijskih skripti unutar `/database/migrations` foldera prije merge-anja.
* **Akcija 3:** Pokrivanje rubnih slučajeva (edge cases) za algoritam detekcije konflikata (Collision Detection) sa minimalno 5 novih unit test scenarija po svakoj metodi.