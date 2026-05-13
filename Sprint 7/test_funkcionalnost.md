# Izvještaj o testiranju funkcionalnosti - Sprint 7

Ovaj dokument sadrži rezultate verifikacije i validacije funkcionalnosti implementiranih tokom Sprinta 7, s fokusom na korisnički interfejs i upravljanje rezervacijama.

## Cilj testiranja
Cilj je potvrditi da su sve komponente modula za rezervacije stabilne, da ispravno komuniciraju sa bazom podataka i da pružaju ispravan feedback korisniku u skladu sa definisanim kriterijima prihvatanja.

## Rezultati testiranja po stavkama

<table>
  <thead>
    <tr>
      <th>ID testa</th>
      <th>Naziv testa / Funkcionalnost</th>
      <th>Očekivani rezultat</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TF.7.1</td>
      <td>Prikaz dostupnih termina (PB8)</td>
      <td>Kalendar ispravno učitava i prikazuje samo slobodne termine iz baze.</td>
      <td>Prošlo</td>
    </tr>
    <tr>
      <td>TF.7.2</td>
      <td>Validacija forme za rezervaciju (PB9)</td>
      <td>Sistem onemogućava slanje forme ako su polja prazna ili je format pogrešan.</td>
      <td>Prošlo</td>
    </tr>
    <tr>
      <td>TF.7.3</td>
      <td>Dupla rezervacija istog termina (PB9)</td>
      <td>Sistem sprečava unos ako je u međuvremenu termin zauzet (Concurrency test).</td>
      <td>Prošlo</td>
    </tr>
    <tr>
      <td>TF.7.4</td>
      <td>Pregled historije korisnika (PB10)</td>
      <td>Korisnik vidi isključivo svoje rezervacije sortirane po datumu.</td>
      <td>Prošlo</td>
    </tr>
    <tr>
      <td>TF.7.5</td>
      <td>Promjena statusa (PB13)</td>
      <td>Promjena statusa u administraciji se trenutno reflektuje na korisničkom profilu.</td>
      <td>Prošlo</td>
    </tr>
    <tr>
      <td>TF.7.6</td>
      <td>Otkazivanje unutar 24 sata (PB14)</td>
      <td>Sistem blokira otkazivanje ako je do termina ostalo manje od 24h.</td>
      <td>Prošlo</td>
    </tr>
    <tr>
      <td>TF.7.7</td>
      <td>Otkazivanje izvan 24 sata (PB14)</td>
      <td>Sistem uspješno otkazuje termin i oslobađa ga za druge korisnike.</td>
      <td>Prošlo</td>
    </tr>
  </tbody>
</table>

## Opis testnog okruženja
- Web preglednici: Google Chrome, Mozilla Firefox (responzivni mod).
- Mobilni uređaji: Android Emulator (Pixel 5), iOS Simulator (iPhone 13).
- Baza podataka: [Navedite vašu bazu, npr. PostgreSQL/MySQL].
- Alat za API testiranje: Postman (provjera endpointa za rezervacije).

## Zaključak testiranja
Sve testne procedure su uspješno izvršene. Nisu pronađeni kritični bugovi koji bi ometali proces rezervacije. Manje vizuelne neusklađenosti na specifičnim rezolucijama ekrana su ispravljene tokom samog sprinta.

---
