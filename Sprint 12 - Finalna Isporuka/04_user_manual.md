# Korisnički priručnik — LabManager

**Sistem:** LabManager — Sistem za upravljanje laboratorijskom opremom  
**Verzija:** 1.0  
**Namjena:** Krajnji korisnici (laboranti i administratori)

---

## Kome je sistem namijenjen

LabManager je namijenjen svim zaposlenicima medicinskih i istraživačkih laboratorija:

- **Laborantima (istraživačima)** koji trebaju koristiti laboratorijsku opremu
- **Administratorima (šefovima laboratorije)** koji upravljaju opremom, odobravaju zahtjeve i prate korištenje

---

## Korisničke uloge

| Uloga | Ko je ovo | Šta može raditi |
|---|---|---|
| **Laborant** | Istraživač, tehničar | Pregledati opremu, rezervisati, otkazivati, slati poruke adminima |
| **Administrator** | Šef laboratorije, IT admin | Sve što laborant + odobravanje, upravljanje opremom/korisnicima, statistike, broadcast poruke |

---

## Pristup sistemu i prijava

### Produkcijski URL
`https://nrs.marexdev.com`

### Demo kredencijali

| Uloga | Korisničko ime | Lozinka |
|---|---|---|
| Administrator | `admin2` | `admin123` |
| Laborant | `korisnik1` | `korisnik123` |

### Koraci za prijavu

1. Otvorite `https://nrs.marexdev.com` u browseru
2. Unesite korisničko ime i lozinku
3. Kliknite **"Prijava"**

**Očekivani rezultat:** Preusmeravanje na dashboard stranicu s vašim imenom i ulogom u gornjem desnom kutu.

### Registracija novog korisnika

1. Na login stranici kliknite **"Registruj se"**
2. Unesite korisničko ime (ne mora biti email) i lozinku
3. Kliknite **"Registruj se"**
4. Novi korisnik dobiva rolu **laborant** automatski

**Napomena:** Administrator može naknadno promijeniti vašu rolu.

---

## Navigacija

Lijeva strana ekrana sadrži navigacijski meni:

**Laborant:**
- Početna (Dashboard)
- Oprema (lista svih aparata)
- Moje rezervacije
- Moja aktivnost
- Moji zadaci (maintenance zadaci koji su vam dodijeljeni)
- Poruke (chat s adminima)
- Profil

**Administrator:**
- Sve što laborant +
- Sve rezervacije
- Upravljanje opremom
- Korisnici
- Lokacije
- Repromaterijal
- Statistike
- Izvještaji
- Održavanje
- Poruke (inbox svih korisnika)

---

## Opis glavnih ekrana

### Dashboard
Prikazuje:
- **KPI kartice** — ukupno aparata, aktivnih rezervacija, dostupnih aparata
- **Status mozaik** — bojni prikaz statusa svake opreme (zeleno = dostupno, žuto = rezervisano, crveno = na servisu)
- **7-dnevni timeline** — pregled nadolazećih rezervacija

### Lista opreme (`/equipment`)
Prikazuje sve aparate u kartičnom rasporedu s:
- Imenom, lokacijom, statusom
- Filterima: pretraga po tekstu, status dropdown, tag chip filteri
- Dugmetom za komparaciju (`+`)

### Detalji opreme
Prikazuje:
- Tehničke informacije (model, proizvođač, serijski broj)
- Servisne informacije (zadnji/planirani servis, garancija)
- Sigurnosne napomene (ako postoje)
- Vizualni kalendar zauzeća
- Dugme za rezervaciju
- Dugme "Pošalji pitanje adminu"

---

## Korak-po-korak upute za važne akcije

### Rezervisanje opreme

1. Kliknite na **"Oprema"** u meniju
2. Pronađite željeni aparat (pretraga ili browsing)
3. Kliknite na kartu aparata da otvorite detalje
4. Pogledajte **kalendar zauzeća** — crveni datumi su zauzeti
5. Kliknite na **početni datum** rezervacije (klik 1)
6. Kliknite na **krajnji datum** rezervacije (klik 2) — interval je označen zeleno
7. Ako aparat ima sigurnosne napomene, pročitajte ih i **označite checkbox**
8. Kliknite **"Rezerviši"**

**Očekivani rezultat:** Poruka "Zahtjev za rezervaciju je poslan" i nova rezervacija u statusu **"Na čekanju"** vidljiva pod "Moje rezervacije".

**Napomena:** Rezervacija čeka odobrenje administratora. Dobićete notifikaciju kada bude odobrena ili odbijena.

---

### Pregled vlastitih rezervacija

1. Kliknite **"Moje rezervacije"** u meniju
2. Vidite tabelu svih vaših rezervacija s:
   - Imenom aparata i periodom
   - Statusom (Na čekanju / Odobren / Odbijen / Otkazan)
   - Razlogom odbijanja (ako je admin naveo)

---

### Otkazivanje rezervacije

1. Otvorite **"Moje rezervacije"**
2. Pronađite rezervaciju sa statusom **"Na čekanju"** ili **"Odobren"**
3. Kliknite dugme **"Otkaži"**
4. Potvrdite akciju u dijalogu

**Očekivani rezultat:** Rezervacija dobiva status **"Otkazan"**.

---

### Izmjena datuma rezervacije

1. Otvorite **"Moje rezervacije"**
2. Pronađite aktivnu rezervaciju
3. Kliknite **"Izmijeni"** — red se proširi s kalendarom
4. Odaberite novi period (klik na početni, klik na krajnji datum)
5. Kliknite **"Sačuvaj"**

**Očekivani rezultat:** Rezervacija se ažurira s novim datumima.

---

### Stavljanje na listu čekanja

Ako je aparat zauzet, možete se staviti na listu čekanja:

1. Otvorite detalje aparata
2. Kliknite **"Stavi na listu čekanja"**

**Očekivani rezultat:** Dobijate notifikaciju čim aparat postane slobodan.

---

### Komparacija opreme

1. Na listi opreme, kliknite **"+"** na 2-3 aparata koja želite porediti
2. Spušta se **floating bar** s brojem odabranih
3. Kliknite **"Poredi [N]"**

**Očekivani rezultat:** Otvara se modal s tabelarnom usporedbom: model, status, lokacija, ocjena, tagovi, sigurnosne napomene.

---

### Slanje poruke adminu

1. Kliknite **"Poruke"** u meniju
2. Na kartici **"Chat s adminima"** unesite poruku u textbox
3. Pritisnite **Enter** (ili kliknite Send)

**Za pitanje vezano uz specifičnu opremu:**
1. Na stranici detalja aparata kliknite **"Pošalji pitanje adminu"**
2. Sistem automatski priloži kontekst opreme
3. Unesite pitanje i pošaljite

**Očekivani rezultat:** Poruka je dostavljena svim administratorima. Dobijate notifikaciju kada admin odgovori.

---

### Čitanje broadcast obavijesti

1. Kliknite **"Poruke"** u meniju
2. Otvorite karticu **"Obavijesti"**
3. Neprečitane obavijesti su označene žutom bojom
4. Kliknite **"Pročitano"** da označite kao pročitano

---

## Upute za administratore

### Odobravanje / odbijanje rezervacije

1. Kliknite **"Sve rezervacije"** u meniju
2. Pronađite rezervaciju sa statusom **"Na čekanju"** (pending)
3. U status ćeliji kliknite:
   - **"Odobri"** — rezervacija se odobrava, korisnik dobija notifikaciju
   - **"Odbij"** — otvara se modal, unesite razlog odbijanja, kliknite **"Odbij"**

**Očekivani rezultat:** Korisnik dobija in-app notifikaciju s ishodom i razlogom (ako je odbijen).

---

### Dodavanje opreme

1. Kliknite **"Upravljanje opremom"**
2. Kliknite **"Dodaj opremu"**
3. Popunite formu (naziv, model, proizvođač, status, lokacija, tagovi, sigurnosne napomene)
4. Kliknite **"Sačuvaj"**

---

### Upravljanje korisnicima

1. Kliknite **"Korisnici"** u meniju
2. U tabeli vidite sve korisnike, njihove uloge i status
3. Za promjenu role: odaberi iz dropdown-a (laborant / admin)
4. Za deaktivaciju: kliknite **"Deaktiviraj"** — korisnik ne može više da se prijavi

**Napomena:** Ne možete deaktivirati sami sebe.

---

### Kreiranje maintenance zadatka

1. Kliknite **"Održavanje"**
2. Kliknite **"Novi zadatak"**
3. Odaberite aparat, unesite opis, prioritet (Low/Medium/High/Critical) i dodijelite korisniku
4. Kliknite **"Kreiraj"**

**Korisnik dobija zadatak vidljiv pod "Moji zadaci".**

---

### Slanje broadcast obavijesti

1. Kliknite **"Poruke"** → **"Nova obavijest"**
2. Unesite naslov i tekst obavijesti
3. Kliknite **"Pošalji svima"**

**Očekivani rezultat:** Svi laboranti vide novu obavijest u "Poruke" → "Obavijesti" tabu.

---

### Generisanje izvještaja

1. Kliknite **"Izvještaji"**
2. Odaberite vremenski period (od — do)
3. Sistem prikazuje KPI kartice, grafikone i tabele
4. Kliknite **"Štampaj/Eksportuj PDF"** za PDF kroz browser print dialog

---

## Ograničenja sistema

### Šta korisnik ne može raditi

- **Laborant ne može:** odobravati rezervacije, dodavati/brisati opremu, upravljati korisnicima, slati broadcast
- **Nije moguće:** rezervisati isti aparat ako je u statusu "Na servisu" ili "Van upotrebe"
- **Nije moguće:** odabrati datume u prošlosti pri kreiranju rezervacije
- **Nije moguće:** izmjeniti ili otkazati rezervaciju drugog korisnika
- **Nije moguće:** prijaviti se s deaktiviranim nalogom

### Tehička ograničenja
- Sistem ne šalje emailove — sve notifikacije su in-app (vidljive samo kad ste prijavljeni)
- Chat s adminima se osvježava svakih 30 sekundi — nije real-time
- PDF eksport koristi browser print dialog, ne generiše PDF fajl automatski
- Filtriranje opreme je klijentsko — za liste >500 aparata može biti sporije
