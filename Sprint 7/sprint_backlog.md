# Sprint Backlog - Sprint 7

## Sprint Goal
Finalizacija korisničkog interfejsa za modul rezervacija i uspostavljanje stabilne logike za upravljanje statusima termina, omogućavajući korisniku kompletan ciklus od zakazivanja do otkazivanja rezervacije.

## User Stories i Zadaci

### PB8: Korisnički interfejs za prikaz dostupnih termina
**User Story:** Kao korisnik, želim imati vizuelni pregled slobodnih termina kako bih mogao planirati svoju rezervaciju u skladu sa dostupnošću.
- Task 7.8.1: Dizajniranje responzivnog kalendarskog prikaza unutar Blazor komponente.
- Task 7.8.2: Implementacija klijentske logike za filtriranje slotova na osnovu odabranog datuma.
- Task 7.8.3: Povezivanje komponente sa API endpointom za dobavljanje dostupnosti.

### PB9: Implementacija forme za unos rezervacije
**User Story:** Kao korisnik, želim popuniti i poslati formu za rezervaciju kako bih osigurao željeni termin za odabranu uslugu.
- Task 7.9.1: Kreiranje Blazor forme sa poljima za unos podataka i izbor usluge.
- Task 7.9.2: Implementacija validacije unosa na klijentskoj strani (FluentValidation).
- Task 7.9.3: Integracija sa backend servisom za spašavanje nove rezervacije u bazu.

### PB10: Pregled historije rezervacija
**User Story:** Kao ulogovani korisnik, želim vidjeti listu svojih prethodnih i aktivnih rezervacija kako bih pratio njihove statuse.
- Task 7.10.1: Izrada korisničkog dashboarda za prikaz liste ličnih rezervacija.
- Task 7.10.2: Implementacija vizuelnih indikatora za statuse (npr. Na čekanju, Odobreno).

### PB13: Upravljanje statusima rezervacija
**User Story:** Kao administrator, želim imati mogućnost promjene statusa rezervacije kako bih efikasno upravljao poslovnim procesima.
- Task 7.13.1: Razvoj administrativnog interfejsa za pregled svih pristiglih zahtjeva.
- Task 7.13.2: Implementacija backend logike za ažuriranje statusa rezervacije u PostgreSQL bazi.

### PB14: UI za modifikaciju i otkazivanje rezervacija
**User Story:** Kao korisnik, želim imati opciju da otkažem ili izmijenim rezervaciju ukoliko dođe do promjene u mojim planovima.
- Task 7.14.1: Implementacija dugmeta za otkazivanje uz provjeru poslovnog pravila o roku od 24h.
- Task 7.14.2: Razvoj modalnog prozora za potvrdu akcije otkazivanja.
- Task 7.14.3: Automatsko ažuriranje i oslobađanje termina nakon uspješne modifikacije.

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
      <td>Dizajn kalendara</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.9.1</td>
      <td>Izrada forme</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.10.1</td>
      <td>Korisnički dashboard</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.13.1</td>
      <td>Admin UI za statuse</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.14.1</td>
      <td>Logika otkazivanja</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
  </tbody>
</table>

---

## Sprint Burndown cilj
Cilj sprinta je uspješna demonstracija "end-to-end" procesa upravljanja rezervacijama na klijentskoj strani, čime se osigurava da je sistem spreman za finalnu integraciju.