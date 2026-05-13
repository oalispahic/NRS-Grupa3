# Decision Log

Ovaj dokument bilježi ključne tehničke i arhitekturalne odluke donesene tokom razvoja projekta NRS - Grupa 3.

---

## Odluke iz Sprinta 5

### [D5.1] Arhitektura sistema i izbor tehnologija
- Odluka: Korištenje Clean Architecture principa sa podjelom na Domain, Application, Infrastructure i WebAPI slojeve. Implementacija frontenda u Blazor WebAssembly tehnologiji.
- Obrazloženje: Osiguravanje skalabilnosti, testabilnosti i jasne separacije odgovornosti unutar tima.

### [D5.2] Upravljanje bazom podataka
- Odluka: Korištenje PostgreSQL relacione baze podataka uz Entity Framework Core kao ORM alat.
- Obrazloženje: PostgreSQL nudi visoku pouzdanost i podršku za kompleksne upite potrebne za sistem rezervacija.

---

## Odluke iz Sprinta 6

### [D6.1] Implementacija autentifikacije i autorizacije
- Odluka: Korištenje Keycloak-a kao Identity Provider-a uz implementaciju OIDC (OpenID Connect) protokola.
- Obrazloženje: Keycloak omogućava sigurno upravljanje korisnicima i jednostavno mapiranje rola (Administrator, Korisnik) koje su ključne za pristup modulima.

### [D6.2] Dokumentacija i logging
- Odluka: Usvajanje Swagger-a za dokumentaciju API endpointa i Serilog-a za strukturirano logiranje grešaka na serverskoj strani.
- Obrazloženje: Poboljšanje saradnje između frontend i backend tima i lakše dijagnosticiranje problema u produkciji.

---

## Odluke iz Sprinta 7

### [D7.1] Dizajn korisničkog interfejsa za rezervacije (PB8)
- Odluka: Implementacija kalendarskog (grid) prikaza dostupnosti umjesto linearne liste termina.
- Obrazloženje: Korisničko testiranje je pokazalo da kalendarski pregled pruža bolju preglednost slobodnih slotova na sedmičnom nivou.

### [D7.2] Validacija podataka kod kreiranja rezervacije (PB9)
- Odluka: Uvođenje FluentValidation biblioteke na backendu uz paralelnu validaciju na Blazor formama.
- Obrazloženje: Osiguravanje integriteta podataka i sprječavanje nekonzistentnih stanja u bazi podataka u slučaju direktnih API poziva.

### [D7.3] Model statusa rezervacija (PB13)
- Odluka: Implementacija fiksnog seta statusa (Pending, Approved, Rejected, Cancelled) kao Enum tipa u bazi.
- Obrazloženje: Standardizacija statusa omogućava automatizaciju procesa odobravanja i lakše filtriranje historije za krajnjeg korisnika.

### [D7.4] Pravila za otkazivanje i modifikaciju (PB14)
- Odluka: Postavljanje striktnog vremenskog ograničenja od 24 sata za samostalno otkazivanje rezervacije putem aplikacije.
- Obrazloženje: Optimizacija popunjenosti termina i sprječavanje gubitaka resursa zbog kasnih otkazivanja.

### [D7.5] Strategija učitavanja historije rezervacija (PB10)
- Odluka: Implementacija paginacije ili Lazy Loading-a za prikaz prošlih rezervacija na korisničkom dashboardu.
- Obrazloženje: Smanjenje opterećenja na bazu podataka i ubrzanje inicijalnog učitavanja profila korisnika.

---
Zadnje ažuriranje: 13.05.2026.