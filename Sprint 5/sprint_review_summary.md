# Sprint 5 Review Summary

**Projekat:** LabEMS - Sistem za upravljanje medicinskom laboratorijskom opremom
**Sprint:** Sprint 5
**Datum:** 2026-04-28
**Tim:** NRS Grupa 3

---

## Sprint Goal

Omoguciti osnovni pristup sistemu, pregled laboratorijske opreme i rezervaciju opreme, uz pocetno upravljanje opremom od strane administratora.

Ovaj sprint predstavlja pocetak AI-Enabled faze projekta (Sprintovi 5-11) u kojoj tim prelazi sa planiranja i dokumentacije na aktivnu implementaciju sistema. Sprint 5 je fokusiran na MVP Core funkcionalnosti koje cine minimalno upotrebljiv sistem - korisnik se moze prijaviti, pregledati opremu, rezervisati je, a administrator moze upravljati inventarom.

---

## Planirane User Stories

| ID | Naziv | Prioritet | Status |
|---|---|---|---|
| US-6 | Autentifikacija korisnika | Visok | Zavrseno |
| US-1 | Pregled opreme | Visok | Zavrseno |
| US-2 | Detalji opreme | Visok | Zavrseno |
| US-3 | Rezervacija opreme | Visok | Zavrseno |
| US-4 | Moje rezervacije | Visok | Zavrseno |
| US-5 | Upravljanje opremom (admin) | Visok | Zavrseno |
| US-24 | Dashboard pregled | Srednji | Zavrseno |

**Ukupno:** 7/7 user storija zavrseno (100%)

Svih 6 high-priority storija (US-1 do US-6) je kompletno implementirano, sto znaci da je MVP Core u potpunosti funkcionalan. US-24 (Dashboard) je bila dodatna stavka srednjeg prioriteta koja je takodjer zavrsena, cime je sprint zavrsen iznad minimalnih ocekivanja.

---

## Implementirane funkcionalnosti

### Autentifikacija i autorizacija (US-6)

Implementiran je kompletan auth sistem koji pokriva i backend i frontend. Na backendu su kreirani dva API endpointa: POST /api/auth/register za registraciju i POST /api/auth/login za prijavu korisnika. Lozinke se hashiraju sa bcrypt algoritmom (12 rundi) prije pohrane u bazu, a pri uspjesnoj prijavi sistem generise JWT token sa korisnickim podacima (id, email, uloga). Middleware za autentifikaciju (authenticate) provjerava validnost tokena pri svakom zasticenom zahtjevu i postavlja korisnicke podatke na request objekat. Dodatni middleware (requireRole) ogranicava pristup admin funkcijama na osnovu korisnicke uloge.

Na frontendu je implementiran AuthContext koristeci React Context API koji upravlja kompletnom korisnickom sesijom. Kontekst pruza login i logout funkcije, te cuva podatke o trenutnom korisniku i tokenu. JWT token se cuva u sessionStorage, sto znaci da sesija ne prezivljava zatvaranje browser taba - svjesna odluka dokumentovana u Decision Logu (OD-001). Kreirane su ProtectedRoute i AdminRoute wrapper komponente koje stite rute od neprijavljenih korisnika, odnosno od korisnika bez admin uloge.

Korisnici se trenutno kreiraju rucno putem curl komande ili direktno u bazi, posto Register stranica nije bila u opsegu ovog sprinta (OD-002).

### Pregled opreme (US-1)

Korisnik nakon prijave moze pregledati kompletnu listu laboratorijske opreme. Stranica prikazuje kartice (card grid) sa nazivom, modelom, trenutnim statusom i lokacijom svake stavke. Status opreme je vizualno naglašen kroz razlicite boje badge-ova (zeleno za dostupno, zuto za na servisu, crveno za van upotrebe). Implementirani su hover efekti na karticama za bolji korisnicki dozivljaj. Baza je popunjena sa 60 realnih laboratorijskih aparata kao seed podaci, ukljucujuci mikroskope, centrifuge, PCR aparate, spektrofotometre, HPLC i GC-MS sisteme, flow citometre, NMR i FTIR aparate - sa realisticnim nazivima modela (Olympus, Eppendorf, Bio-Rad, Thermo Fisher, Bruker) i lokacijama (Sala A1-E2, Skladista).

### Detalji opreme (US-2)

Svaka stavka opreme ima detaljan prikaz koji se otvara klikom na karticu iz liste. Stranica prikazuje header sa ikonom opreme, kompletne informacije (naziv, model, serijski broj, opis, lokacija), sidebar sa meta podacima i trenutni status dostupnosti. Ako je oprema dostupna, korisnik direktno sa ove stranice moze pristupiti formi za rezervaciju.

### Rezervacija opreme (US-3)

Korisnik moze kreirati zahtjev za rezervacijom opreme odabirom datuma i vremenskog termina (pocetak i kraj) kroz inline formu na stranici detalja opreme. Sistem evidentira svaku rezervaciju sa statusom "na cekanju" i povezuje je sa korisnikom koji je kreirao zahtjev i opremom koja se rezervise. Backend API endpoint (POST /api/reservations) prima podatke o terminu i kreira zapis u bazi.

### Moje rezervacije (US-4)

Korisnik ima pristup pregledu svih svojih rezervacija kroz zasebnu stranicu "Moje rezervacije". Prikazana je tabela sa nazivom opreme, datumom, vremenskim terminom i trenutnim statusom svake rezervacije. Implementiran je row-hover efekat na tabeli i empty state sa CTA (call-to-action) dugmetom koje vodi na pregled opreme u slucaju da korisnik nema nijednu rezervaciju.

### Upravljanje opremom (US-5)

Administrator ima pristup stranici za upravljanje inventarom opreme sa kompletnim CRUD operacijama. Dodavanje nove opreme se vrsi kroz formu sa obaveznim poljima: naziv, serijski broj, model, lokacija i status. Uredjivanje postojece opreme je implementirano kroz inline edit sa Pencil/Check/X ikonama, sto omogucava brzu izmjenu podataka bez napustanja stranice. Brisanje opreme je dostupno kroz Trash ikonu sa konfirmacijom. Backend podrzava parcijalni update kroz COALESCE SQL pattern u repository sloju, sto omogucava slanje samo promijenjenih polja bez brisanja ostalih vrijednosti. Tim je naknadno dodao validaciju praznog naziva opreme koju AI nije pokrio u inicijalnoj generaciji (Unos 2 u AI Usage Logu).

### Dashboard pregled (US-24)

Implementiran je role-based dashboard koji prikazuje razlicit sadrzaj u zavisnosti od korisnicke uloge. Laborant vidi svoje nadolazece rezervacije, pregled dostupne opreme i licne obavijesti. Administrator vidi statisticke widgete (broj opreme, aktivne rezervacije, zahtjevi na cekanju), pregled trenutnog koristenja opreme i quick action kartice za brz pristup administratorskim funkcijama poput upravljanja opremom i pregleda svih rezervacija.

### Login stranica

Kreirana je vizualno profesionalna login stranica sa LabManager brendingom. Stranica koristi pozadinsku sliku laboratorije (Unsplash) sa niskom opacitetom, card layout sa shadow efektom, ikone unutar input polja (Mail za email, Lock za lozinku), focus border animaciju i error message prikaz sa AlertCircle ikonom. Dugme za prijavu prikazuje loading state ("Prijava u toku...") tokom API poziva.

---

## Tehnicke isporuke van user storija

| Isporuka | Opis |
|---|---|
| Design sistem (theme.js) | Centralni fajl sa design tokenima - PRIMARY boja (#2563EB), C objekt sa bojama za heading/body/muted/border, BTN stilovi, iconBox helper, STATUS_EQUIPMENT i STATUS_RESERVATION mapiranja, GLOBAL_CSS |
| NavBar komponenta | Fixed top navigacija sa logom, navigacijskim linkovima sa aktivnom rutom, role badge-om (Admin/Laborant) i logout dugmetom |
| 7 frontend stranica | LoginPage, DashboardPage, EquipmentListPage, EquipmentDetailPage, MyReservationsPage, ManageEquipmentPage, HomePage |
| Backend API endpointi | auth (register, login), equipment (GET lista, GET detalji, POST, PUT, DELETE), reservations (GET moje, POST kreiranje) |
| Vercel deployment | Frontend i backend deployani na Vercel sa rewrite pravilima za API proxy u produkciji |
| Seed podaci | 60 laboratorijskih aparata uneseno u bazu za demonstraciju i razvoj |
| CONTEXT.md | Tehnicka dokumentacija sa 18 sekcija - opis projekta, tech stack, struktura repozitorija, DB schema, API endpointi, auth flow, poznati propusti, sprint plan |
| Migracija baze | 001_initial_schema.sql sa users, equipment i reservations tabelama |

---

## Problemi i kako su rijeseni

| # | Problem | Uzrok | Rjesenje | Uticaj |
|---|---|---|---|---|
| 1 | "Unexpected end of JSON input" pri loginu na produkciji | Vite proxy (/api/* -> localhost:3001) ne radi u produkcijskom buildu, frontend salje API zahtjeve na isti domain koji vraca HTML umjesto JSON | Kreiran vercel.json sa rewrite pravilom: /api/:path* -> backend URL, postavljeno ispred catch-all rewrita | Visok - login nije radio na produkciji dok nije fixano |
| 2 | JWT expiresIn greska | JWT_EXPIRES_IN env varijabla na Vercelu postavljena sa nevazecim formatom (prazan string ili razmak) | Code fix: fallback promijenjen na '8h'. Pravi fix: uklonjena nevazeca env varijabla sa Vercela | Visok - login nije radio ni nakon proxy fixa |
| 3 | "Invalid credentials" za admin korisnika | AI generisao nevazeci bcrypt hash pri rucnom SQL INSERT-u u Supabase | Ispravan hash generisan programski putem bcrypt.hash() i azuriran u bazi putem SQL UPDATE | Srednji - admin se nije mogao prijaviti |
| 4 | Vite build error | JSX Badge komponenta u theme.js fajlu (treba .jsx ekstenzija) | Komponenta uklonjena iz theme.js | Nizak - otkriveno odmah pri buildu |
| 5 | Merge konflikt sa HomePage | Remote repo imao novu HomePage komponentu, lokalno Sprint 5 vec napravljen | Git stash -> pull -> stash pop workflow sa rucnim rjesavanjem konflikta u App.jsx | Nizak - rijeseno bez gubitka koda |

---

## Donesene odluke (iz Decision Loga)

| ID | Odluka | Razlog | Posljedice |
|---|---|---|---|
| OD-001 | JWT u sessionStorage umjesto httpOnly cookie | Jednostavnost implementacije, prihvatljivo za akademski projekat | Poznat XSS rizik, dokumentiran kao tehnicki dug za buduce sprintove |
| OD-002 | Bez Register stranice - korisnici se kreiraju curl metodom | Registracija nije eksplicitni zahtjev nijednog user storyja u Sprintu 5 | Sistem ne moze samostalno onboardovati nove korisnike |
| OD-003 | Inline CSS sa centralnim design tokenima (theme.js) | Vizualna konzistentnost bez vanjskih zavisnosti, puna kontrola nad stilovima | Vise rucnog pisanja CSS-a, ali bez ovisnosti o trecim bibliotekama |
| OD-005 | COALESCE pattern za parcijalni UPDATE opreme | Elegantno rjesenje za parcijalne update-ove bez promjene API kontrakta | Nije moguce eksplicitno postaviti polje na NULL kroz ovaj endpoint |
| OD-007 | JWT fallback trajanje 8h | Odgovara tipicnoj radnoj sesiji laboranta, prakticnije od 15 minuta | Korisnici ostaju prijavljeni do 8 sati bez ponovne prijave |
| OD-008 | CONTEXT.md kao living document | Centralno mjesto za tehnicku dokumentaciju, optimizirano za AI agente i developere | Zahtijeva azuriranje svakog sprinta, rizik zastarjelosti |

---

## AI Usage - sazetak

Tokom Sprinta 5 evidentirano je **11 slucajeva koristenja AI alata** (Claude Code od Anthropic-a). AI je koristen za planiranje implementacije, generisanje backend i frontend koda, rjesavanje deployment problema, kreiranje dokumentacije i seed podataka.

| Metrika | Vrijednost |
|---|---|
| Ukupno AI interakcija | 11 |
| Prihvaceno bez izmjena | 7 |
| Prihvaceno uz izmjene tima | 4 |
| Odbaceno | 1 (Register stranica) |
| Greske AI-a | 3 |
| Kriticne greske | 1 |

**Prihvaceno uz izmjene tima (4 slucaja):** Tim je dodao validaciju naziva opreme u PUT endpointu, prilagodio naziv i logo u NavBar-u, dopunio Sprint 6 plan u CONTEXT.md sa dvije dodatne stavke (rate limiting, audit log), i prilagodio oznake lokacija/sala u seed podacima.

**Odbaceno (1 slucaj):** AI je predlozio implementaciju Register stranice kao bonus task, ali je tim odlucio da to nije u opsegu sprinta i da se korisnici kreiraju rucno.

**Greske AI-a (3 slucaja):** JSX komponenta u .js fajlu (build error, otkriveno odmah), CONTEXT.md nije bio zapisan na disk u prvom pokusaju (ponovljeno kreiranje), i nevazeci bcrypt hash pri rucnom SQL INSERT-u (jedina kriticna greska koja je uzrokovala "Invalid credentials" u produkciji).

Tim je koristio AI kao razvojni alat uz aktivnu superviziju - svaki AI output je pregledan prije prihvatanja, a u 4 slucaja tim je unosio vlastite izmjene ili dopune koje AI nije predvidio. Kriticna greska sa bcrypt hashom posluzila je kao pouka da se hashovi nikada ne pisu rucno nego uvijek generisu programski.

---

## Demonstracija

Sistem je dostupan na: **nrs.marexdev.com**

Pristupni podaci za demonstraciju:
- Admin: (kreiran u bazi)
- Laborant: (kreiran u bazi)

Kljucni tokovi za demonstraciju:
1. Prijava u sistem sa admin i laborant kredencijalima
2. Pregled liste opreme i detalja pojedinacne opreme
3. Kreiranje rezervacije za dostupnu opremu (laborant)
4. Pregled mojih rezervacija (laborant)
5. Dodavanje, uredjivanje i brisanje opreme (admin)
6. Dashboard prikaz prilagodjen ulozi korisnika

---

## Plan za naredni sprint (Sprint 6)

Prema Product Backlogu i Initial Release Planu, Sprint 6 zavrsava Inkrement 2 (MVP Core) sa fokusom na kontrolu pristupa i validaciju rezervacija:

| ID | Funkcionalnost | Prioritet |
|---|---|---|
| PB24 | Autorizacija - Role-Based Access Control (prosirenje) | Must Have |
| PB26 | Sprjecavanje konflikta rezervacija - validacija preklapanja termina | Must Have |
| PB6 | Odobravanje i odbijanje zahtjeva za rezervacijom (admin) | Must Have |
| PB7 | Promjena statusa opreme - Dostupno / Servis / Van upotrebe (admin) | Must Have |

Dodatno planirano na osnovu identificiranih potreba tokom Sprinta 5:
- Rate limiting na login endpointu (sigurnosno poboljsanje)
- Audit log za admin akcije (priprema za PB25 u Sprintu 8)

---

### Autor
- Harun Zukanovic
