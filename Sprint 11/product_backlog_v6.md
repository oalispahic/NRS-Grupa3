
# Product backlog 6.0

<div align > 

## Sistem za upravljanje medicinskom laboratorijskom opremom

</div>

## Opis projekta 

Ovaj sistem omogućava evidenciju laboratorijske opreme, upravljanje rezervacijama, praćenje statusa opreme, odobravanje korištenja, pregled zauzeća, potrošnju repromaterijala, maintenance task management, grafičke izvještaje i direktnu komunikaciju između korisnika i administratora.

## Tipovi korisnika

- Korisnik (laborant)
  
- Administrator (šef laboratorije, IT administrator)

## Product Backlog 

<table>

<tr>
<th>ID</th>
<th>Naziv</th>
<th align ="left" >User Story</th>
<th>Opis</th>
<th>Tip</th>
<th>Priority</th>
<th>Procjena</th>
<th>Status</th>
<th>Napomena</th>
</tr>

<tr>
<td>PB1</td>
<td>Pregled opreme</td>
<td align ="left">Kao korisnik želim pregledati svu dostupnu opremu</td>
<td>Prikaz liste sve laboratorijske opreme</td>
<td>Feature</td>
<td>High</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB2</td>
<td>Detalji opreme</td>
<td  align ="left">Kao korisnik želim vidjeti informacije o opremi (status, opis)</td>
<td>Detaljan prikaz pojedinačne opreme</td>
<td>Feature</td>
<td>High</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB3</td>
<td>Rezervacija opreme</td>
<td  align ="left">Kao korisnik želim moći rezervisati opremu za odgovarajući termin</td>
<td>Kreiranje rezervacije za vremenski period</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB4</td>
<td>Moje rezervacije</td>
<td  align ="left">Kao korisnik želim vidjeti podatke o svojim rezervacijama</td>
<td>Pregled aktivnih i starih rezervacija</td>
<td>Feature</td>
<td>High</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB5</td>
<td>Upravljanje opremom</td>
<td  align ="left">Kao administrator želim dodavati i brisati opremu iz inventara </td>
<td>Manipulisanje dostupnom opremom</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB6</td>
<td>Odobravanje rezervacija</td>
<td  align ="left">Kao administrator želim odobravati/odbijati zahtjeve za korištenje opreme </td>
<td>Workflow za rezervacije</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB7</td>
<td>Status opreme</td>
<td  align ="left">Kao administrator želim mijenjati statuse i detalje vezane za opremu </td>
<td>Ažuriranje statusa</td>
<td>Feature</td>
<td>High</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB8</td>
<td>Kalendar zauzeća</td>
<td  align ="left">Kao korisnik želim vidjeti kalendar zauzeća opreme </td>
<td>Vizualni prikaz rezervacija u kalendaru</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB9</td>
<td>Pretraga opreme</td>
<td align="left">Kao korisnik želim pretraživati opremu po nazivu</td>
<td>Napredna pretraga po nazivu ili šifri</td>
<td>Feature</td>
<th>Medium</th>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB10</td>
<td>Filtriranje opreme</td>
<td align="left">Kao korisnik želim filtrirati opremu po kategoriji ili tipu</td>
<td>Filtriranje listi opreme</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB11</td>
<td>Notifikacije</td>
<td align="left">Kao administrator želim slati obavijesti o rezervacijama</td>
<td>Slanje obavještenja korisnicima</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB12</td>
<td>Pregled svih rezervacija</td>
<td align="left">Kao administrator želim vidjeti sve rezervacije u sistemu</td>
<td>Centralizovan pregled rezervacija</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB13</td>
<td>Otkazivanje rezervacija</td>
<td align="left">Kao korisnik želim otkazati rezervaciju</td>
<td>Mogućnost otkazivanja postojeće rezervacije</td>
<td>Feature</td>
<td>Medium</td>
<td>2</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB14</td>
<td>Izmjena rezervacije</td>
<td align="left">Kao korisnik želim izmijeniti postojeću rezervaciju</td>
<td>Uređivanje rezervacije</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB15</td>
<td>Trenutno korištenje</td>
<td align="left">Kao administrator želim vidjeti ko trenutno koristi opremu</td>
<td>Praćenje trenutno aktivne opreme</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB16</td>
<td>Izvještaji</td>
<td align="left">Kao administrator želim generisati grafički izvještaj o korištenosti opreme i eksportovati ga kao PDF</td>
<td>Web izvještaj s KPI karticama, bar/line chartovima i tabelama; PDF eksport kroz window.print()</td>
<td>Feature</td>
<td>Low</td>
<td>5</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB17</td>
<td>Održavanje opreme</td>
<td align="left">Kao administrator želim kreirati maintenance zadatke i dodijeliti ih korisnicima</td>
<td>Task management s priority/status workflowom; korisnici vide dodjeljene zadatke na /my-tasks</td>
<td>Feature</td>
<td>Low</td>
<td>5</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB18</td>
<td>Kategorije opreme</td>
<td align="left">Kao administrator želim definisati i dodijeliti kategorije opremi</td>
<td>Pokriven tagovima (PB36) i pretragom po tagovima (PB39)</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td>Implementirano kroz PB36+PB39</td>
</tr>

<tr>
<td>PB19</td>
<td>Ocjenjivanje opreme</td>
<td align="left">Kao korisnik želim ocjenjivati opremu nakon korištenja</td>
<td>Sistem feedbacka</td>
<td>Feature</td>
<td>Low</td>
<td>2</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB20</td>
<td>Export podataka</td>
<td align="left">Kao administrator želim izvoz podataka u CSV format</td>
<td>Export liste rezervacija i opreme u CSV</td>
<td>Feature</td>
<td>Low</td>
<td>3</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB21</td>
<td>Inventar repromaterijala</td>
<td align="left">Kao administrator želim voditi evidenciju zaliha potrošnog materijala u laboratoriji</td>
<td>Admin kreira stavke (naziv, jedinica, količina, prag upozorenja), ažurira zalihe s napomenom, vidi log promjena i upozorenja na nisku zalihu</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB22</td>
<td>Pravila korištenja</td>
<td align="left">Kao administrator želim definisati pravila korištenja opreme</td>
<td>Admin postavlja globalna ograničenja: maks. trajanje rezervacije, maks. broj dana unaprijed, maks. broj istovremenih rezervacija po korisniku</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB23</td>
<td>Autentifikacija korisnika</td>
<td align="left">Kao korisnik želim se prijaviti u sistem kako bih pristupio funkcionalnostima</td>
<td>Login/logout funkcionalnost</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td>Security</td>
</tr>

<tr>
<td>PB24</td>
<td>Autorizacija korisnika</td>
<td align="left">Kao sistem želim razlikovati korisničke uloge kako bih ograničio pristup funkcijama</td>
<td>Role-based access control</td>
<td>Technical</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB25</td>
<td>Logovanje aktivnosti</td>
<td align="left">Kao administrator želim vidjeti historiju aktivnosti u sistemu</td>
<td>Praćenje akcija korisnika</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td>Audit</td>
</tr>

<tr>
<td>PB26</td>
<td>Sprječavanje konflikta rezervacija</td>
<td align="left">Kao sistem želim spriječiti preklapanje rezervacija kako bi se izbjegli konflikti</td>
<td>Validacija termina rezervacije</td>
<td>Technical</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td>Kritično</td>
</tr>

<tr>
<td>PB27</td>
<td>Dashboard pregled</td>
<td align="left">Kao korisnik želim vidjeti pregled sistema na početnoj stranici</td>
<td>Statistika i kratki pregled stanja</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB28</td>
<td>Registracija korisnika</td>
<td align="left">Kao korisnik želim kreirati nalog u sistemu</td>
<td>Kreiranje korisničkog naloga</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB29</td>
<td>Profil korisnika</td>
<td align="left">Kao korisnik želim pregledati i urediti svoje podatke</td>
<td>Stranica profila s formom za izmjenu ličnih podataka i lozinke</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB31</td>
<td>Dashboard grafikoni</td>
<td align="left">Kao administrator želim vidjeti grafikone korištenosti opreme na dashboardu</td>
<td>Integracija grafičkih prikaza (bar/pie chart) za statistike rezervacija i korištenosti opreme</td>
<td>Feature</td>
<td>Medium</td>
<td>5</td>
<td>Done</td>
<td>Implementirano kroz PB47 (StatisticsPage)</td>
</tr>

<tr>
<td>PB32</td>
<td>Paginacija i sortiranje</td>
<td align="left">Kao korisnik želim listati i sortirati opremu po više kriterija</td>
<td>Pagination kontrole i sortable headeri u svim tabelama i listama</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB33</td>
<td>Favoriti opreme</td>
<td align="left">Kao korisnik želim označiti opremu kao omiljenu za brzi pristup</td>
<td>Ikonica srca na kartici opreme i posebna lista omiljene opreme</td>
<td>Feature</td>
<td>Low</td>
<td>2</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB34</td>
<td>Napredna pretraga opreme</td>
<td align="left">Kao korisnik želim pretraživati opremu po opisu i kategoriji, ne samo imenu</td>
<td>Prošireni search bar s filterima po kategoriji, statusu i opisu unutar istog UI-a</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB35</td>
<td>Lična historija aktivnosti</td>
<td align="left">Kao korisnik želim vidjeti sve svoje akcije u sistemu</td>
<td>Stranica /my-activity s timeline prikazom rezervacija, ocjena i izmjena; filter po tipu akcije</td>
<td>Feature</td>
<td>Low</td>
<td>3</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB36</td>
<td>Tagovi opreme</td>
<td align="left">Kao administrator želim dodijeliti tagove opremi radi boljeg organizovanja</td>
<td>Admin dodaje tagove opremi; badge-ovi tagova vidljivi su na karticama i detaljima opreme</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB37</td>
<td>Brzi pregled opreme</td>
<td align="left">Kao korisnik želim pregledati detalje opreme bez napuštanja liste</td>
<td>Modal/drawer koji se otvara klikom na opremu i prikazuje ključne informacije bez navigacije</td>
<td>Feature</td>
<td>Low</td>
<td>2</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB38</td>
<td>Podsjetnik na rezervaciju</td>
<td align="left">Kao korisnik želim dobiti obavijest kada mi rezervacija uskoro počinje</td>
<td>In-app notifikacija putem bell ikone i banner uoči početka rezervacije</td>
<td>Feature</td>
<td>Low</td>
<td>3</td>
<td>Done</td>
<td>Implementirano kroz PB11 (notifikacijski sistem)</td>
</tr>

<tr>
<td>PB39</td>
<td>Pretraga po tagovima</td>
<td align="left">Kao korisnik želim filtrirati opremu klikom na tagove</td>
<td>Chip/badge filteri na listi opreme; klik na tag automatski filtrira listu po odabranom tagu</td>
<td>Feature</td>
<td>Medium</td>
<td>2</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB40</td>
<td>Responsive/mobilni dizajn</td>
<td align="left">Kao korisnik želim koristiti sistem na mobilnom uređaju</td>
<td>Hamburger drawer navigacija, overflow popravci na tabelama, touch-friendly tap targets (44px), single-column card grid na mobilnom</td>
<td>Technical</td>
<td>Medium</td>
<td>5</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB41</td>
<td>Status mozaik opreme</td>
<td align="left">Kao korisnik želim vizualno vidjeti status sve opreme odjednom na dashboardu</td>
<td>Interaktivni mozaik obojenih kvadratića koji prikazuju status svake stavke opreme; hover efekt i tooltip s imenom i lokacijom</td>
<td>Feature</td>
<td>Medium</td>
<td>2</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB42</td>
<td>Timeline nadolazećih rezervacija</td>
<td align="left">Kao korisnik želim vidjeti kalendarski pregled rezervacija za narednih 7 dana</td>
<td>7-dnevni timeline na dashboardu s rezervacijama raspoređenim po danima, obojenim prema statusu; "Danas" i "Sutra" oznake</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td></td>
</tr>

<tr>
<td>PB43</td>
<td>Razlog odbijanja rezervacije</td>
<td align="left">Kao administrator želim upisati razlog odbijanja koji korisnik može vidjeti</td>
<td>Admin unosi razlog u modal pri odbijanju; razlog se sprema u bazu i prikazuje korisniku u "Moje rezervacije" i notifikaciji</td>
<td>Feature</td>
<td>Medium</td>
<td>2</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB44</td>
<td>Upravljanje korisnicima</td>
<td align="left">Kao administrator želim vidjeti sve korisnike i upravljati njihovim nalozima i ulogama</td>
<td>Nova admin stranica s tabelarnim prikazom korisnika; akcije: promjena uloge (laborant ↔ admin), deaktivacija/reaktivacija naloga</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB45</td>
<td>Lokacije laboratorije</td>
<td align="left">Kao administrator želim definisati fizičke lokacije/prostorije i dodijeliti ih opremi</td>
<td>Admin kreira lokacije (naziv, opis); opremi se dodjeljuje lokacija; lokacija vidljiva na karticama i detalj stranici; filter po lokaciji na listi opreme</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB46</td>
<td>Sigurnosne napomene opreme</td>
<td align="left">Kao administrator želim dodati sigurnosne upute opremi koje korisnik mora potvrditi pri rezervaciji</td>
<td>Admin unosi tekst sigurnosnih uputa; prikazane na detalj stranici; checkbox potvrde obavezan na formi za rezervaciju</td>
<td>Feature</td>
<td>Medium</td>
<td>2</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB47</td>
<td>Stranica statistika i analitike</td>
<td align="left">Kao administrator želim imati zasebnu stranicu s grafikonima i agregatnim podacima o korištenosti sistema</td>
<td>Nova stranica /admin/statistics s bar chartom top 5 opreme, line chartom trenda rezervacija, donut chartom distribucije statusa i KPI karticama</td>
<td>Feature</td>
<td>Medium</td>
<td>5</td>
<td>Done</td>
<td>Sprint 9</td>
</tr>

<tr>
<td>PB48</td>
<td>Komparacija opreme</td>
<td align="left">Kao korisnik želim odabrati 2-3 komada opreme i vidjeti njihovu usporedbu radi lakše odluke</td>
<td>"+" dugme na karticama; floating bar "Poredi [N]"; full-screen modal s tabelarnom usporedbom (model, status, lokacija, ocjena, tagovi, safety notes); direktan "Rezerviraj" link</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB49</td>
<td>Lista čekanja — Waitlist</td>
<td align="left">Kao korisnik, kada je oprema zauzeta, želim se staviti na listu čekanja i dobiti notifikaciju kad postane slobodna</td>
<td>Nova tabela waitlist; dugme "Stavi na listu čekanja" na EquipmentDetailPage; automatska notifikacija pri promjeni statusa u available; prikaz pozicije u redu</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB50</td>
<td>QR kod za opremu</td>
<td align="left">Kao administrator želim generirati QR kod za svaki komad opreme koji se može printati i zalijepiti na fizički uređaj</td>
<td>"QR" dugme na karticama u ManageEquipmentPage; modal s QR kodom (react-qr-code); QR kodira URL /equipment/:id; "Preuzmi PNG" dugme</td>
<td>Feature</td>
<td>Low</td>
<td>2</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB51</td>
<td>Nadolazeći planirani servisi</td>
<td align="left">Kao administrator želim vidjeti listu opreme čiji planirani servis pada u narednih 30 dana s vizualnim upozorenjem za prekoračene rokove</td>
<td>Sekcija na /admin/maintenance s listom opreme sortiranom po datumu servisa; colour coding: crveno za prekoračeno, žuto za &lt;7 dana; klik vodi na equipment detail; backend endpoint /api/maintenance/upcoming-services</td>
<td>Feature</td>
<td>Medium</td>
<td>2</td>
<td>Done</td>
<td>Sprint 10</td>
</tr>

<tr>
<td>PB52</td>
<td>Direktne poruke korisnik ↔ administratori</td>
<td align="left">Kao korisnik, želim slati poruke administratorima i primati njihove odgovore unutar sistema</td>
<td>Chat sučelje na /messages (korisnik) i inbox s konverzacijama na /admin/messages; unread badge u navigaciji; in-app notifikacije pri primljenim porukama; read receipts</td>
<td>Feature</td>
<td>High</td>
<td>5</td>
<td>Done</td>
<td>Sprint 11</td>
</tr>

<tr>
<td>PB53</td>
<td>Pitanje o opremi (Equipment Inquiry)</td>
<td align="left">Kao korisnik, želim direktno s kartice opreme poslati pitanje administratoru uz automatski priložen kontekst te opreme</td>
<td>"Pošalji pitanje adminu" dugme na EquipmentDetailPage; sessionStorage prenosi equipment kontekst; equipment chip vidljiv u compose formi; equipment_id FK na messages tabeli</td>
<td>Feature</td>
<td>Medium</td>
<td>2</td>
<td>Done</td>
<td>Sprint 11</td>
</tr>

<tr>
<td>PB54</td>
<td>Admin broadcast obavijesti</td>
<td align="left">Kao administrator, želim slati obavijesti svim korisnicima sistema odjednom</td>
<td>Tab "Nova obavijest" na /admin/messages s formom (naslov + tekst); broadcasts + broadcast_reads tabela; korisnici vide obavijesti u "Obavijesti" tabu s unread highlighted žuto; "Pročitano" po stavci</td>
<td>Feature</td>
<td>Medium</td>
<td>3</td>
<td>Done</td>
<td>Sprint 11</td>
</tr>

</table>


# Raspodjela po sprintovima 

Sprint 5 (Osnovne funkcionalnosti):
- PB1, PB2, PB3, PB4, PB5, PB23, PB27

Sprint 6 (Kontrola i validacija):
- PB6, PB7, PB26, PB24, PB28

Sprint 7 (Korisnički interfejs i upravljanje rezervacijama):
- PB8, PB9, PB10, PB13, PB14

Sprint 8 (Administracija, notifikacije i vizualni dashboard):
- PB11, PB15, PB25, PB19, PB29, PB36, PB41, PB42

Sprint 9 (Administracija korisnika, sigurnost, analitika i inventar):
- PB20, PB21, PB22, PB43, PB44, PB45, PB46, PB47

Sprint 10 (Analitika, održavanje i finalizacija):
- PB16, PB17, PB35, PB40, PB48, PB49, PB50, PB51

Sprint 11 (Sistem poruka i komunikacija):
- PB52, PB53, PB54

# Preliminarne tehnologije za realizaciju projekta

Backend
- Node.js (Express) 
- REST API za komunikaciju između klijenta i servera


Frontend
- React
- Komponentni pristup (UI podijeljen na manje cjeline)
- Dinamički prikaz podataka (oprema, rezervacije, dashboard)

Baza podataka:
- PostgreSQL (relaciona baza pogodna za: opremu, korisnike, rezervacije...)
  

Autentifikacija i sigurnost:
- JWT (JSON Web Token)
- Role-based access control (admin / korisnik)

Dev alati:
- Git (verzionisanje)
- Docker (opciono, za deployment)
- Postman (testiranje API-ja)
