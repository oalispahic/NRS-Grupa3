# Sprint Backlog - Sprint 7

## Sprint Goal
Implementacija kompletnog korisničkog interfejsa za modul rezervacija, integracija klijentske validacije i uspostavljanje stabilne logike za upravljanje statusima termina.

## User Stories i Zadaci

### PB8: Korisnički interfejs za prikaz dostupnih termina
**User Story:** Kao korisnik, želim imati vizuelni pregled slobodnih termina kako bih mogao planirati svoju rezervaciju u skladu sa dostupnošću laboratorije.
- Task 7.8.1: Dizajniranje responzivnog kalendarskog prikaza (Grid layout) unutar Blazor komponente.
- Task 7.8.2: Implementacija klijentske logike za filtriranje dostupnih slotova na osnovu odabranog datuma.
- Task 7.8.3: Integracija komponente sa backend endpointom za dobavljanje dostupnosti u realnom vremenu.

### PB9: Implementacija forme za unos rezervacije
**User Story:** Kao korisnik, želim popuniti i poslati formu za rezervaciju kako bih osigurao željeni termin za odabranu opremu ili uslugu.
- Task 7.9.1: Izrada Blazor forme sa poljima za unos podataka i dinamičkim izborom usluge.
- Task 7.9.2: Implementacija validacije unosa na klijentskoj strani koristeći FluentValidation.
- Task 7.9.3: Povezivanje forme sa POST metodom na backendu za spašavanje rezervacije u PostgreSQL bazu.

### PB10: Pregled historije rezervacija
**User Story:** Kao ulogovani korisnik, želim vidjeti listu svojih prethodnih i aktivnih rezervacija kako bih mogao pratiti njihov status.
- Task 7.10.1: Izrada korisničkog dashboarda (interfejsa) za prikaz liste ličnih rezervacija.
- Task 7.10.2: Implementacija vizuelnih indikatora (Badge sistema) za prikaz statusa (npr. Na čekanju, Odobreno).

### PB13: Upravljanje statusima rezervacija
**User Story:** Kao administrator, želim imati mogućnost promjene statusa rezervacije (odobravanje/odbijanje) kako bih efikasno upravljao resursima.
- Task 7.13.1: Razvoj administrativnog interfejsa za pregled svih pristiglih zahtjeva za rezervaciju.
- Task 7.13.2: Implementacija backend logike za ažuriranje stanja rezervacije u bazi podataka.

### PB14: UI za modifikaciju i otkazivanje rezervacija
**User Story:** Kao korisnik, želim imati opciju da otkažem rezervaciju ukoliko mi planovi propadnu, uz poštovanje definisanih vremenskih ograničenja.
- Task 7.14.1: Implementacija funkcionalnosti za otkazivanje uz provjeru biznis pravila o roku od 24h.
- Task 7.14.2: Razvoj modalnog prozora za potvrdu akcije otkazivanja radi sprječavanja slučajnih klikova.

---

## Status i Odgovornost

<table>
  <thead>
    <tr>
      <th>Task ID</th>
      <th>Opis zadatka</th>
      <th>Odgovorni član</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>T 7.8.1</td>
      <td>Dizajn kalendara (Blazor)</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.9.1</td>
      <td>Izrada forme i validacija</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.10.1</td>
      <td>Dashboard historije</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.13.2</td>
      <td>Backend logika statusa</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.14.1</td>
      <td>Logika otkazivanja (24h)</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
  </tbody>
</table>

---

