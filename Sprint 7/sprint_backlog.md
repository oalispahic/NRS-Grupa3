# Sprint Backlog - Sprint 7

Ovaj dokument sadrži detaljan plan rada za Sprint 7, uključujući dekompoziciju stavki iz Product Backloga na konkretne tehničke zadatke.

## Trajanje sprinta
- Početak: [Ubacite datum početka]
- Kraj: [Ubacite datum kraja]

---

## Dekompozicija zadataka

### PBI 8: Korisnički interfejs za prikaz dostupnih termina
Korisnik treba imati vizuelni pregled slobodnih slotova za rezervaciju.
- Task 7.8.1: Dizajniranje kalendarskog prikaza (Grid/Calendar view).
- Task 7.8.2: Implementacija logike za filtriranje termina po danima.
- Task 7.8.3: Povezivanje frontenda sa API-jem /api/availability.

### PBI 9: Implementacija forme za unos rezervacije
Omogućavanje korisniku da kroz formu pošalje zahtjev za termin.
- Task 7.9.1: Kreiranje UI forme (input polja za datum, vrijeme i uslugu).
- Task 7.9.2: Implementacija klijentske validacije (provjera praznih polja).
- Task 7.9.3: Integracija sa POST metodom na backendu za kreiranje rezervacije.

### PBI 10: Pregled historije rezervacija
Prikaz personalizovane liste svih korisnikovih termina.
- Task 7.10.1: Kreiranje stranice "Moje Rezervacije".
- Task 7.10.2: Implementacija kartičnog prikaza (Card view) za svaku rezervaciju.
- Task 7.10.3: Razvoj logike za sortiranje (od najnovijih prema starijim).

### PBI 13: Upravljanje statusima rezervacija
Sistem/admin mora imati mogućnost upravljanja životnim ciklusom rezervacije.
- Task 7.13.1: Implementacija vizuelnih indikatora za statuse: Pending, Approved, Cancelled.
- Task 7.13.2: Backend logika za automatsko ažuriranje statusa nakon potvrde.

### PBI 14: UI za modifikaciju i otkazivanje rezervacija
Omogućavanje korisniku da ažurira ili poništi svoj termin.
- Task 7.14.1: Implementacija Cancel funkcionalnosti uz potvrdu (Confirmation modal).
- Task 7.14.2: Razvoj forme za izmjenu (Edit) postojećih detalja rezervacije.
- Task 7.14.3: Provjera pravila otkazivanja (npr. rok od 24h prije termina).

---

## Status i Odgovornost

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
      <td>T 7.9.3</td>
      <td>Integracija forme</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.10.2</td>
      <td>Card view historije</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.13.1</td>
      <td>Indikatori statusa</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
    <tr>
      <td>T 7.14.1</td>
      <td>Modal za otkazivanje</td>
      <td>[Ime]</td>
      <td>Done</td>
    </tr>
  </tbody>
</table>

---

## Sprint Burndown cilj
Cilj sprinta je da se do kraja radne sedmice zatvore svi taskovi vezani za UI rezervacija, čime se kompletira korisnički workflow aplikacije.

---

## Sprint Burndown cilj
Cilj sprinta je da se do kraja radne sedmice zatvore svi taskovi vezani za UI rezervacija, čime se kompletira korisnički workflow aplikacije.