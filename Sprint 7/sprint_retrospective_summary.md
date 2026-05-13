# Sprint Retrospective Summary - Sprint 7

Ovaj dokument sumira rezultate retrospektive nakon završetka Sprinta 7, fokusirajući se na procese rada, izazove i planirana poboljšanja.

## 1. Šta je išlo dobro?
- Integracija frontenda sa backend servisima za rezervacije je protekla brže od planiranog.
- Tim je uspješno implementirao kompleksnu logiku validacije termina, čime je eliminisana mogućnost preklapanja.
- Dizajn korisničkog interfejsa je dobio pozitivne interne kritike zbog jednostavnosti i preglednosti.

## 2. Šta bi se moglo poboljšati?
- Testiranje na različitim veličinama ekrana (responzivnost) je otkrilo manje vizuelne bugove u kasnoj fazi sprinta.
- Komunikacija između članova zaduženih za UI i onih zaduženih za bazu podataka mogla je biti učestalija prilikom definisanja statusa rezervacija.

## 3. Akcioni plan za naredni period
- Uvesti obavezno testiranje na mobilnim emulatorima odmah nakon završetka svake komponente UI-a.
- Dokumentovati sve promjene u strukturi baze podataka u realnom vremenu kako bi frontend tim imao ažurne informacije.

## 4. Pregled realizacije Product Backlog stavki

<table>
  <thead>
    <tr>
      <th>PBI ID</th>
      <th>Naziv stavke</th>
      <th>Status</th>
      <th>Napomena</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PB8</td>
      <td>UI prikaz dostupnih termina</td>
      <td>Završeno</td>
      <td>Implementiran kalendarski prikaz.</td>
    </tr>
    <tr>
      <td>PB9</td>
      <td>Forma za unos rezervacije</td>
      <td>Završeno</td>
      <td>Dodata klijentska i serverska validacija.</td>
    </tr>
    <tr>
      <td>PB10</td>
      <td>Historija rezervacija</td>
      <td>Završeno</td>
      <td>Sortiranje po datumu uspješno dodato.</td>
    </tr>
    <tr>
      <td>PB13</td>
      <td>Upravljanje statusima</td>
      <td>Završeno</td>
      <td>Integrisano sa bazom podataka.</td>
    </tr>
    <tr>
      <td>PB14</td>
      <td>Modifikacija i otkazivanje</td>
      <td>Završeno</td>
      <td>Implementirano pravilo od 24h.</td>
    </tr>
  </tbody>
</table>

---
