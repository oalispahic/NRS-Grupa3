# Use Case specifikacija — Sistem za upravljanje medicinskom laboratorijskom opremom

Use Case specifikacija opisuje detaljne interakcije između korisnika (aktera) i sistema kroz konkretne scenarije korištenja. Svaki use case definiše **ko** pokreće akciju, **šta** sistem treba uraditi i **kako** se odvija tok događaja, uključujući osnovne i alternativne tokove. Dokument je izveden iz [User Stories](../Sprint%202/user_stories.md) i [Acceptance Criteria](../Sprint%202/acceptance_criteria.md), sa ciljem da pruži razvojnom timu jasnu specifikaciju ponašanja sistema.

---

## Akteri sistema

| Akter | Opis |
| :--- | :--- |
| **Korisnik (Laborant)** | Prijavljeni korisnik koji pregledava opremu, kreira i upravlja rezervacijama, te koristi laboratorijsku opremu. |
| **Administrator** | Korisnik sa proširenim ovlaštenjima koji upravlja opremom, odobrava rezervacije, prati potrošnju i administrira sistem. |
| **Sistem** | Automatizovane funkcije poput provjere konflikata, autorizacije i slanja notifikacija. |

---

## UC-1: Prijava u sistem

**Povezano sa:** US-6 (Autentifikacija korisnika)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik ima kreiran korisnički nalog u sistemu. Korisnik nije trenutno prijavljen. |
| **Postuslov** | Korisnik je prijavljen i preusmjeren na dashboard u skladu sa svojom ulogom. |
| **Okidač** | Korisnik otvara stranicu za prijavu. |

**Osnovni tok:**

1. Korisnik otvara stranicu za prijavu u sistem.
2. Sistem prikazuje formu za unos korisničkog imena i lozinke.
3. Korisnik unosi korisničko ime i lozinku.
4. Korisnik potvrđuje prijavu.
5. Sistem validira unesene podatke prema bazi korisnika.
6. Sistem utvrđuje korisničku ulogu (Laborant ili Administrator).
7. Sistem kreira korisničku sesiju i preusmjerava korisnika na odgovarajući dashboard.

**Alternativni tokovi:**

- **A1 — Neispravni podaci:** Ako su u koraku 5 korisničko ime ili lozinka neispravni, sistem prikazuje poruku o neuspješnoj prijavi i vraća korisnika na korak 2.
- **A2 — Prazna polja:** Ako korisnik u koraku 4 pokuša potvrditi prijavu bez popunjenih obaveznih polja, sistem prikazuje poruku da su sva polja obavezna.

---

## UC-2: Odjava iz sistema

**Povezano sa:** US-6 (Autentifikacija korisnika)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik je prijavljen u sistem. |
| **Postuslov** | Korisnička sesija je završena. Korisnik je preusmjeren na stranicu za prijavu. |
| **Okidač** | Korisnik odabere opciju za odjavu. |

**Osnovni tok:**

1. Korisnik odabere opciju za odjavu iz sistema.
2. Sistem završava korisničku sesiju.
3. Sistem preusmjerava korisnika na stranicu za prijavu.

---

## UC-3: Pregled opreme

**Povezano sa:** US-1 (Pregled opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik je prijavljen u sistem. |
| **Postuslov** | Prikazana je lista aktivne laboratorijske opreme. |
| **Okidač** | Korisnik otvara sekciju za pregled opreme. |

**Osnovni tok:**

1. Korisnik otvara sekciju za pregled opreme.
2. Sistem dohvaća listu sve aktivne opreme iz baze podataka.
3. Sistem prikazuje listu opreme sa najmanje nazivom i trenutnim statusom svake stavke.
4. Korisnik pregleda listu i odabire željenu stavku za prikaz detalja.

**Alternativni tokovi:**

- **A1 — Nema opreme:** Ako u koraku 2 u sistemu ne postoji nijedna aktivna stavka opreme, sistem prikazuje poruku da oprema trenutno nije dostupna.

---

## UC-4: Pregled detalja opreme

**Povezano sa:** US-2 (Detalji opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik je prijavljen. Lista opreme je prikazana. |
| **Postuslov** | Prikazani su detaljni podaci o odabranoj opremi. |
| **Okidač** | Korisnik odabere stavku opreme iz liste. |

**Osnovni tok:**

1. Korisnik odabere stavku opreme iz liste pregleda opreme.
2. Sistem dohvaća detaljne podatke o odabranoj opremi.
3. Sistem prikazuje naziv, opis, trenutni status, te dodatne evidentirane podatke (specifikacije, pravila korištenja, ocjene).
4. Ako oprema nije dostupna za rezervaciju, sistem jasno prikazuje razlog nedostupnosti kroz status ili odgovarajuću oznaku.

**Alternativni tokovi:**

- **A1 — Nepostojeća oprema:** Ako u koraku 2 oprema ne postoji ili je neaktivna, sistem prikazuje poruku o grešci.

---

## UC-5: Pretraga opreme

**Povezano sa:** US-12 (Pretraga opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik je prijavljen. Sekcija za pregled opreme je otvorena. |
| **Postuslov** | Prikazani su rezultati pretrage u skladu sa unesenim pojmom. |
| **Okidač** | Korisnik unosi tekst u polje za pretragu. |

**Osnovni tok:**

1. Korisnik unosi puni ili djelimičan naziv opreme u polje za pretragu.
2. Sistem pretražuje bazu opreme prema unesenom pojmu.
3. Sistem prikazuje sve stavke opreme koje odgovaraju unesenom pojmu.

**Alternativni tokovi:**

- **A1 — Nema rezultata:** Ako u koraku 2 nijedna stavka ne odgovara unesenom pojmu, sistem prikazuje poruku da nema pronađene opreme.
- **A2 — Prazno polje:** Ako korisnik očisti polje za pretragu, sistem prikazuje kompletnu listu opreme.

---

## UC-6: Filtriranje opreme

**Povezano sa:** US-13 (Filtriranje opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik je prijavljen. Sekcija za pregled opreme je otvorena. |
| **Postuslov** | Prikazana je oprema filtrirana prema odabranim kriterijima. |
| **Okidač** | Korisnik odabere kategoriju ili tip opreme kao filter. |

**Osnovni tok:**

1. Korisnik odabere jednu ili više kategorija/tipova opreme kao filter.
2. Sistem filtrira listu opreme prema odabranim kriterijima.
3. Sistem prikazuje samo opremu koja zadovoljava sve odabrane filtere.

**Alternativni tokovi:**

- **A1 — Nema rezultata:** Ako nijedna stavka ne odgovara odabranim filterima, sistem prikazuje poruku da nema rezultata.
- **A2 — Uklanjanje filtera:** Ako korisnik ukloni sve aktivne filtere, sistem vraća puni prikaz opreme.

---

## UC-7: Rezervacija opreme

**Povezano sa:** US-3 (Rezervacija opreme), US-9 (Sprječavanje konflikta rezervacija)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik |
| **Preduslov** | Korisnik je prijavljen. Oprema je u statusu „Dostupna". |
| **Postuslov** | Zahtjev za rezervaciju je kreiran i evidentiran u sistemu. |
| **Okidač** | Korisnik otvara formu za rezervaciju opreme. |

**Osnovni tok:**

1. Korisnik otvara detalje dostupne opreme.
2. Korisnik odabire opciju za kreiranje rezervacije.
3. Sistem prikazuje formu za unos termina (datum, vrijeme početka, vrijeme završetka).
4. Korisnik unosi željeni termin i potvrđuje rezervaciju.
5. Sistem provjerava da li se uneseni termin preklapa sa postojećim odobrenim rezervacijama za tu opremu.
6. Sistem evidentira zahtjev za rezervaciju sa statusom „na čekanju".
7. Sistem prikazuje korisniku potvrdu sa informacijama o opremi, datumu, vremenu početka i vremenu završetka.

**Alternativni tokovi:**

- **A1 — Konflikt termina:** Ako u koraku 5 sistem utvrdi preklapanje sa postojećom rezervacijom, prikazuje poruku da je termin već zauzet i vraća korisnika na korak 3.
- **A2 — Nevažeći termin:** Ako korisnik unese nevažeći termin (npr. vrijeme završetka prije vremena početka), sistem prikazuje poruku o grešci i vraća korisnika na korak 3.
- **A3 — Oprema nedostupna:** Ako je oprema u statusu „Na održavanju" ili „Van upotrebe", sistem ne dozvoljava kreiranje rezervacije i prikazuje razlog nedostupnosti.

---

## UC-8: Pregled mojih rezervacija

**Povezano sa:** US-4 (Moje rezervacije)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik |
| **Preduslov** | Korisnik je prijavljen u sistem. |
| **Postuslov** | Prikazane su sve rezervacije prijavljenog korisnika. |
| **Okidač** | Korisnik otvara sekciju „Moje rezervacije". |

**Osnovni tok:**

1. Korisnik otvara sekciju „Moje rezervacije".
2. Sistem dohvaća sve rezervacije koje pripadaju prijavljenom korisniku.
3. Sistem prikazuje listu rezervacija sa nazivom opreme, datumom, terminom i statusom svake rezervacije.

**Alternativni tokovi:**

- **A1 — Nema rezervacija:** Ako korisnik nema nijednu rezervaciju, sistem prikazuje poruku da nema evidentiranih rezervacija.

---

## UC-9: Otkazivanje rezervacije

**Povezano sa:** US-14 (Otkazivanje rezervacija)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik |
| **Preduslov** | Korisnik je prijavljen. Postoji aktivna rezervacija koja još nije započela. |
| **Postuslov** | Rezervacija je otkazana. Termin je oslobođen za nove rezervacije. |
| **Okidač** | Korisnik odabere opciju za otkazivanje rezervacije. |

**Osnovni tok:**

1. Korisnik otvara prikaz svojih rezervacija.
2. Korisnik odabere aktivnu rezervaciju koja još nije započela.
3. Korisnik odabere opciju za otkazivanje.
4. Sistem traži potvrdu otkazivanja.
5. Korisnik potvrđuje otkazivanje.
6. Sistem mijenja status rezervacije u „otkazana".
7. Sistem oslobađa termin za nove rezervacije.

**Alternativni tokovi:**

- **A1 — Rezervacija već započela:** Ako je rezervacija već započela ili završena, sistem ne dozvoljava otkazivanje i prikazuje odgovarajuću poruku.
- **A2 — Korisnik odustaje:** Ako korisnik u koraku 5 ne potvrdi otkazivanje, sistem vraća korisnika na prikaz rezervacije bez promjena.

---

## UC-10: Izmjena rezervacije

**Povezano sa:** US-15 (Izmjena rezervacije)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik |
| **Preduslov** | Korisnik je prijavljen. Postoji rezervacija koja još nije započela. |
| **Postuslov** | Podaci rezervacije su ažurirani. |
| **Okidač** | Korisnik odabere opciju za izmjenu rezervacije. |

**Osnovni tok:**

1. Korisnik otvara prikaz svojih rezervacija.
2. Korisnik odabere rezervaciju koja još nije započela.
3. Korisnik odabere opciju za izmjenu.
4. Sistem prikazuje formu sa trenutnim podacima rezervacije.
5. Korisnik izmijeni željene podatke (npr. termin).
6. Sistem provjerava dostupnost novog termina.
7. Sistem sprema izmjene i prikazuje potvrdu o uspješnoj izmjeni.

**Alternativni tokovi:**

- **A1 — Konflikt novog termina:** Ako u koraku 6 novi termin nije dostupan, sistem prikazuje poruku o konfliktu i vraća korisnika na korak 4.
- **A2 — Rezervacija već započela:** Ako je rezervacija već započela ili završena, sistem ne dozvoljava izmjenu.

---

## UC-11: Pregled kalendara zauzeća

**Povezano sa:** US-11 (Kalendar zauzeća)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik je prijavljen. |
| **Postuslov** | Prikazan je kalendar sa zauzetim i slobodnim terminima za odabranu opremu. |
| **Okidač** | Korisnik otvara kalendar zauzeća za određenu opremu. |

**Osnovni tok:**

1. Korisnik odabere opremu za koju želi vidjeti kalendar zauzeća.
2. Sistem dohvaća sve rezervacije za odabranu opremu.
3. Sistem prikazuje kalendar sa jasno označenim zauzetim i slobodnim terminima, uključujući datum, vrijeme početka i završetka svakog zauzetog termina.

**Alternativni tokovi:**

- **A1 — Nema rezervacija:** Ako za odabranu opremu ne postoje rezervacije, sistem prikazuje poruku da nema evidentiranog zauzeća.

---

## UC-12: Upravljanje opremom (Dodavanje/Brisanje)

**Povezano sa:** US-5 (Upravljanje opremom)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen u sistem. |
| **Postuslov** | Nova oprema je dodana ili postojeća oprema je uklonjena iz aktivnog inventara. |
| **Okidač** | Administrator otvara sekciju za upravljanje opremom. |

**Osnovni tok (dodavanje):**

1. Administrator otvara sekciju za upravljanje inventarom opreme.
2. Administrator odabere opciju za dodavanje nove opreme.
3. Sistem prikazuje formu za unos podataka o opremi.
4. Administrator unosi obavezne podatke (naziv, serijski broj, model, lokacija, status).
5. Administrator potvrđuje unos.
6. Sistem validira unesene podatke i sprema novu stavku opreme.
7. Sistem prikazuje novu opremu u inventaru.

**Osnovni tok (brisanje):**

1. Administrator odabere postojeću stavku opreme.
2. Administrator odabere opciju za brisanje.
3. Sistem provjerava da li za opremu postoje aktivne ili buduće rezervacije.
4. Sistem uklanja stavku iz aktivnog prikaza opreme.

**Alternativni tokovi:**

- **A1 — Nepotpuni podaci:** Ako administrator u koraku 5 (dodavanje) ne unese sve obavezne podatke, sistem prikazuje poruku o nedostajućim poljima.
- **A2 — Oprema ima aktivne rezervacije:** Ako u koraku 3 (brisanje) postoje aktivne ili buduće rezervacije, sistem ne dozvoljava brisanje i prikazuje poruku o postojećim rezervacijama.

---

## UC-13: Izmjena statusa opreme

**Povezano sa:** US-8 (Status opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Oprema postoji u sistemu. |
| **Postuslov** | Status ili detalji opreme su ažurirani. |
| **Okidač** | Administrator otvara uređivanje opreme. |

**Osnovni tok:**

1. Administrator otvara detalje opreme.
2. Administrator odabere opciju za uređivanje.
3. Sistem prikazuje formu sa trenutnim podacima i statusom opreme.
4. Administrator mijenja status (npr. iz „Dostupna" u „Na održavanju") ili druge detalje.
5. Administrator potvrđuje izmjene.
6. Sistem validira unesene podatke, sprema izmjene i prikazuje ažurirane podatke.

**Alternativni tokovi:**

- **A1 — Nevažeći status:** Ako administrator pokuša unijeti nedefinisan status, sistem prikazuje poruku o grešci.

---

## UC-14: Odobravanje/Odbijanje rezervacija

**Povezano sa:** US-7 (Odobravanje rezervacija)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Postoje rezervacije sa statusom „na čekanju". |
| **Postuslov** | Status rezervacije je promijenjen u „odobrena" ili „odbijena". |
| **Okidač** | Administrator otvara pregled zahtjeva za rezervaciju. |

**Osnovni tok:**

1. Administrator otvara pregled zahtjeva za rezervaciju.
2. Sistem prikazuje sve rezervacije sa statusom „na čekanju".
3. Administrator pregledava detalje zahtjeva (korisnik, oprema, termin).
4. Administrator odobrava zahtjev.
5. Sistem provjerava da li postoji konflikt termina sa već odobrenim rezervacijama.
6. Sistem mijenja status rezervacije u „odobrena".

**Alternativni tokovi:**

- **A1 — Odbijanje zahtjeva:** Ako administrator u koraku 4 odluči odbiti zahtjev, sistem mijenja status rezervacije u „odbijena".
- **A2 — Konflikt pri odobravanju:** Ako u koraku 5 postoji konflikt termina, sistem ne dozvoljava odobravanje i prikazuje poruku o preklapanju.

---

## UC-15: Pregled svih rezervacija

**Povezano sa:** US-17 (Pregled svih rezervacija)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen u sistem. |
| **Postuslov** | Prikazane su sve rezervacije u sistemu sa mogućnošću filtriranja. |
| **Okidač** | Administrator otvara pregled svih rezervacija. |

**Osnovni tok:**

1. Administrator otvara sekciju za pregled svih rezervacija.
2. Sistem dohvaća sve evidentirane rezervacije.
3. Sistem prikazuje listu rezervacija sa podacima: korisnik, oprema, datum, termin i status.
4. Administrator po potrebi primjenjuje filtere (po korisniku, opremi, statusu ili datumu).
5. Sistem prikazuje filtrirane rezultate.

**Alternativni tokovi:**

- **A1 — Nema rezultata:** Ako nijedna rezervacija ne odgovara izabranim filterima, sistem prikazuje poruku da nema rezultata.

---

## UC-16: Pregled trenutnog korištenja opreme

**Povezano sa:** US-18 (Trenutno korištenje)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen u sistem. |
| **Postuslov** | Prikazan je pregled opreme koja se trenutno koristi. |
| **Okidač** | Administrator otvara pregled trenutnog korištenja. |

**Osnovni tok:**

1. Administrator otvara sekciju za pregled trenutnog korištenja.
2. Sistem na osnovu odobrenih rezervacija i aktuelnog vremena utvrđuje koja oprema je trenutno u upotrebi.
3. Sistem prikazuje naziv opreme, korisnika, vrijeme početka i planirano vrijeme završetka za svaku aktivnu stavku.

**Alternativni tokovi:**

- **A1 — Nema aktivnog korištenja:** Ako nijedna oprema nije trenutno u upotrebi, sistem prikazuje poruku da nema aktivnog korištenja.

---

## UC-17: Slanje notifikacija

**Povezano sa:** US-16 (Notifikacije)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Postoje korisnici i rezervacije u sistemu. |
| **Postuslov** | Notifikacija je poslana i evidentirana u sistemu. |
| **Okidač** | Administrator odabere opciju za slanje obavijesti. |

**Osnovni tok:**

1. Administrator odabere rezervaciju ili korisnika kao kontekst obavijesti.
2. Administrator unosi sadržaj obavijesti.
3. Administrator potvrđuje slanje.
4. Sistem validira da obavijest ima sadržaj.
5. Sistem evidentira i isporučuje obavijest ciljnom korisniku.
6. Sistem prikazuje potvrdu o uspješnom slanju.

**Alternativni tokovi:**

- **A1 — Prazan sadržaj:** Ako administrator pokuša poslati obavijest bez sadržaja, sistem prikazuje poruku o grešci i ne dozvoljava slanje.

---

## UC-18: Pregled historije aktivnosti

**Povezano sa:** US-19 (Logovanje aktivnosti)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen u sistem. |
| **Postuslov** | Prikazana je historija aktivnosti u sistemu. |
| **Okidač** | Administrator otvara sekciju za historiju aktivnosti. |

**Osnovni tok:**

1. Administrator otvara pregled historije aktivnosti.
2. Sistem dohvaća sve evidentirane log zapise.
3. Sistem prikazuje zapise hronološki, sa vrstom akcije, korisnikom i vremenom izvršenja.
4. Administrator po potrebi primjenjuje filtere za sužavanje prikaza.

**Alternativni tokovi:**

- **A1 — Nema zapisa:** Ako ne postoji nijedna evidentirana aktivnost, sistem prikazuje poruku da nema dostupnih zapisa.

---

## UC-19: Praćenje potrošnje repromaterijala

**Povezano sa:** US-20 (Potrošnja repromaterijala)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Repromaterijal je evidentiran u sistemu. |
| **Postuslov** | Potrošnja je evidentirana i stanje zalihe je ažurirano. |
| **Okidač** | Administrator unosi potrošnju repromaterijala. |

**Osnovni tok:**

1. Administrator otvara sekciju za praćenje repromaterijala.
2. Administrator odabere stavku repromaterijala.
3. Administrator unosi količinu potrošenog materijala.
4. Sistem validira unesenu vrijednost (mora biti pozitivan broj).
5. Sistem evidentira potrošnju sa datumom i korisnikom koji je izvršio unos.
6. Sistem ažurira stanje zalihe i prikazuje novo stanje.

**Alternativni tokovi:**

- **A1 — Nevažeća vrijednost:** Ako administrator unese nulu ili negativnu vrijednost, sistem ne dozvoljava spremanje i prikazuje poruku o grešci.
- **A2 — Niske zalihe:** Ako nakon evidentirane potrošnje stanje zalihe padne ispod minimalno definirane granice, sistem prikazuje upozorenje o niskom stanju.

---

## UC-20: Definisanje pravila korištenja opreme

**Povezano sa:** US-21 (Pravila korištenja)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Oprema postoji u sistemu. |
| **Postuslov** | Pravila korištenja su sačuvana i vidljiva korisnicima u detaljima opreme. |
| **Okidač** | Administrator otvara uređivanje pravila korištenja za opremu. |

**Osnovni tok:**

1. Administrator otvara detalje opreme.
2. Administrator odabere opciju za upravljanje pravilima korištenja.
3. Sistem prikazuje formu za unos ili izmjenu pravila.
4. Administrator unosi ili mijenja pravilo korištenja.
5. Administrator potvrđuje unos.
6. Sistem validira da pravilo nije prazno i sprema ga uz odgovarajuću opremu.

**Alternativni tokovi:**

- **A1 — Prazno pravilo:** Ako administrator pokuša sačuvati prazno pravilo, sistem ne dozvoljava spremanje i prikazuje poruku o grešci.

---

## UC-21: Generisanje izvještaja

**Povezano sa:** US-22 (Izvještaji)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Postoje podaci o korištenju opreme. |
| **Postuslov** | Izvještaj je generisan i prikazan administratoru. |
| **Okidač** | Administrator odabere opciju za generisanje izvještaja. |

**Osnovni tok:**

1. Administrator otvara sekciju za izvještaje.
2. Administrator odabere vremenski raspon i opcione filtere.
3. Administrator potvrđuje generisanje izvještaja.
4. Sistem kreira izvještaj na osnovu podataka o rezervacijama i korištenju za zadane kriterije.
5. Sistem prikazuje izvještaj sa periodom, opremom i relevantnim podacima o korištenju.

**Alternativni tokovi:**

- **A1 — Nema podataka:** Ako za zadani period ne postoje podaci, sistem prikazuje poruku da nema podataka za izvještaj.

---

## UC-22: Evidencija održavanja opreme

**Povezano sa:** US-23 (Održavanje opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Oprema postoji u sistemu. |
| **Postuslov** | Zapis o održavanju je evidentiran. Oprema je po potrebi označena kao nedostupna. |
| **Okidač** | Administrator evidentira servis ili kvar opreme. |

**Osnovni tok:**

1. Administrator otvara detalje opreme.
2. Administrator odabere opciju za evidentiranje održavanja.
3. Sistem prikazuje formu za unos podataka o održavanju.
4. Administrator unosi datum i opis događaja (servis, kvar, kalibracija).
5. Administrator potvrđuje unos.
6. Sistem sprema zapis o održavanju i po potrebi ažurira status opreme na „Na održavanju".

**Alternativni tokovi:**

- **A1 — Nepostojeća oprema:** Ako oprema ne postoji u sistemu, sistem ne dozvoljava evidentiranje i prikazuje poruku o grešci.

---

## UC-23: Pregled dashboarda

**Povezano sa:** US-24 (Dashboard pregled)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik, Administrator |
| **Preduslov** | Korisnik je uspješno prijavljen u sistem. |
| **Postuslov** | Prikazan je dashboard sa relevantnim informacijama prilagođenim korisničkoj ulozi. |
| **Okidač** | Sistem prikazuje dashboard nakon uspješne prijave. |

**Osnovni tok:**

1. Korisnik se uspješno prijavi u sistem.
2. Sistem utvrđuje korisničku ulogu.
3. Sistem prikazuje dashboard prilagođen ulozi:
   - **Laborant:** prikaz nadolazećih rezervacija, dostupne opreme i ličnih obavijesti.
   - **Administrator:** prikaz zahtjeva na čekanju, trenutnog korištenja opreme, upozorenja o zalihama i prečica ka administratorskim funkcijama.

---

## UC-24: Dodavanje specifikacija opreme

**Povezano sa:** US-25 (Specifikacije opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Oprema postoji u sistemu. |
| **Postuslov** | Specifikacije i/ili slike su dodane opremi i vidljive u detaljima. |
| **Okidač** | Administrator otvara uređivanje specifikacija opreme. |

**Osnovni tok:**

1. Administrator otvara uređivanje opreme.
2. Sistem prikazuje opcije za unos tehničkih specifikacija i dodavanje slika.
3. Administrator unosi specifikacije i/ili dodaje slike.
4. Administrator potvrđuje unos.
5. Sistem sprema podatke i prikazuje ih u detaljima opreme.

---

## UC-25: Ocjenjivanje opreme

**Povezano sa:** US-26 (Ocjenjivanje opreme)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Korisnik |
| **Preduslov** | Korisnik je prijavljen. Korisnik je prethodno koristio opremu kroz evidentiranu rezervaciju. |
| **Postuslov** | Ocjena je evidentirana i povezana sa opremom i korisnikom. |
| **Okidač** | Korisnik odabere opciju za ocjenjivanje opreme nakon korištenja. |

**Osnovni tok:**

1. Korisnik otvara završenu rezervaciju ili detalje opreme koju je koristio.
2. Sistem prikazuje opciju za ocjenjivanje.
3. Korisnik unosi brojčanu ocjenu i opcioni komentar.
4. Korisnik potvrđuje ocjenu.
5. Sistem sprema ocjenu i povezuje je sa opremom i korisnikom.

**Alternativni tokovi:**

- **A1 — Oprema nije korištena:** Ako korisnik nije prethodno koristio opremu, sistem ne prikazuje opciju za ocjenjivanje.

---

## UC-26: Izvoz podataka

**Povezano sa:** US-27 (Export podataka)

| Stavka | Opis |
| :--- | :--- |
| **Akter** | Administrator |
| **Preduslov** | Administrator je prijavljen. Postoje podaci za izvoz. |
| **Postuslov** | Datoteka sa podacima je generisana u odabranom formatu. |
| **Okidač** | Administrator odabere opciju za izvoz podataka. |

**Osnovni tok:**

1. Administrator otvara sekciju za izvoz podataka.
2. Administrator odabere vrstu podataka za izvoz i primjenjuje filtere.
3. Administrator odabere format izvoza (PDF ili Excel).
4. Sistem kreira datoteku u odabranom formatu sa filtriranim podacima.
5. Sistem omogućava preuzimanje generisane datoteke.

**Alternativni tokovi:**

- **A1 — Nema podataka:** Ako za izvoz ne postoje dostupni podaci, sistem prikazuje poruku da nema podataka za izvoz.

---

## Use Case dijagram

Use Case dijagram vizuelno prikazuje odnose između aktera i funkcionalnosti sistema. Dijagram je organiziran prema korisničkim ulogama — lijevo su prikazane funkcionalnosti dostupne laborantima, desno administratorske funkcionalnosti, a u sredini zajedničke funkcionalnosti koje koriste oba aktera.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     Sistem za upravljanje lab. opremom                      │
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐    ┌───────────────────────┐  │
│  │   UC-1: Prijava   │    │  UC-2: Odjava    │    │ UC-23: Dashboard      │  │
│  └──────────────────┘    └──────────────────┘    └───────────────────────┘  │
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐    ┌───────────────────────┐  │
│  │  UC-3: Pregled   │    │ UC-5: Pretraga   │    │  UC-6: Filtriranje    │  │
│  │     opreme       │    │    opreme        │    │     opreme            │  │
│  └──────────────────┘    └──────────────────┘    └───────────────────────┘  │
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐                               │
│  │ UC-4: Detalji    │    │UC-11: Kalendar   │                               │
│  │    opreme        │    │    zauzeća       │                               │
│  └──────────────────┘    └──────────────────┘                               │
│                                                                             │
│  ╔══════════════════════════════════════════════════════════════════════╗    │
│  ║                    KORISNIK (Laborant)                              ║    │
│  ║  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐   ║    │
│  ║  │ UC-7: Rezervacija│  │ UC-8: Moje       │  │ UC-9: Otkazivanje│  ║    │
│  ║  │     opreme       │  │   rezervacije    │  │   rezervacije   │   ║    │
│  ║  └──────────────────┘  └──────────────────┘  └─────────────────┘   ║    │
│  ║  ┌──────────────────┐  ┌──────────────────┐                        ║    │
│  ║  │UC-10: Izmjena    │  │UC-25: Ocjenjivanje│                       ║    │
│  ║  │   rezervacije    │  │     opreme       │                        ║    │
│  ║  └──────────────────┘  └──────────────────┘                        ║    │
│  ╚══════════════════════════════════════════════════════════════════════╝    │
│                                                                             │
│  ╔══════════════════════════════════════════════════════════════════════╗    │
│  ║                    ADMINISTRATOR                                    ║    │
│  ║  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐   ║    │
│  ║  │UC-12: Upravljanje│  │UC-13: Izmjena    │  │UC-14: Odobravanje│  ║    │
│  ║  │    opremom       │  │  statusa opreme  │  │   rezervacija   │   ║    │
│  ║  └──────────────────┘  └──────────────────┘  └─────────────────┘   ║    │
│  ║  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐   ║    │
│  ║  │UC-15: Pregled    │  │UC-16: Trenutno   │  │UC-17: Slanje    │   ║    │
│  ║  │ svih rezervacija │  │   korištenje     │  │  notifikacija   │   ║    │
│  ║  └──────────────────┘  └──────────────────┘  └─────────────────┘   ║    │
│  ║  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐   ║    │
│  ║  │UC-18: Historija  │  │UC-19: Potrošnja  │  │UC-20: Pravila   │   ║    │
│  ║  │  aktivnosti      │  │ repromaterijala  │  │  korištenja     │   ║    │
│  ║  └──────────────────┘  └──────────────────┘  └─────────────────┘   ║    │
│  ║  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐   ║    │
│  ║  │UC-21: Generisanje│  │UC-22: Evidencija │  │UC-24: Dodavanje │   ║    │
│  ║  │   izvještaja     │  │   održavanja     │  │  specifikacija  │   ║    │
│  ║  └──────────────────┘  └──────────────────┘  └─────────────────┘   ║    │
│  ║  ┌──────────────────┐                                               ║    │
│  ║  │UC-26: Izvoz      │                                               ║    │
│  ║  │   podataka       │                                               ║    │
│  ║  └──────────────────┘                                               ║    │
│  ╚══════════════════════════════════════════════════════════════════════╝    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Matrica pokrivanja: Use Case ↔ User Story

| Use Case | User Story | Sprint |
| :--- | :--- | :--- |
| UC-1: Prijava u sistem | US-6 | Sprint 5 |
| UC-2: Odjava iz sistema | US-6 | Sprint 5 |
| UC-3: Pregled opreme | US-1 | Sprint 5 |
| UC-4: Pregled detalja opreme | US-2 | Sprint 5 |
| UC-5: Pretraga opreme | US-12 | Sprint 7 |
| UC-6: Filtriranje opreme | US-13 | Sprint 7 |
| UC-7: Rezervacija opreme | US-3, US-9 | Sprint 5, 6 |
| UC-8: Pregled mojih rezervacija | US-4 | Sprint 5 |
| UC-9: Otkazivanje rezervacije | US-14 | Sprint 7 |
| UC-10: Izmjena rezervacije | US-15 | Sprint 7 |
| UC-11: Pregled kalendara zauzeća | US-11 | Sprint 7 |
| UC-12: Upravljanje opremom | US-5 | Sprint 5 |
| UC-13: Izmjena statusa opreme | US-8 | Sprint 6 |
| UC-14: Odobravanje/Odbijanje rezervacija | US-7 | Sprint 6 |
| UC-15: Pregled svih rezervacija | US-17 | Sprint 8 |
| UC-16: Pregled trenutnog korištenja | US-18 | Sprint 8 |
| UC-17: Slanje notifikacija | US-16 | Sprint 8 |
| UC-18: Pregled historije aktivnosti | US-19 | Sprint 8 |
| UC-19: Praćenje potrošnje repromaterijala | US-20 | Sprint 9 |
| UC-20: Definisanje pravila korištenja | US-21 | Sprint 9 |
| UC-21: Generisanje izvještaja | US-22 | Sprint 10 |
| UC-22: Evidencija održavanja opreme | US-23 | Sprint 10 |
| UC-23: Pregled dashboarda | US-24 | Sprint 10 |
| UC-24: Dodavanje specifikacija opreme | US-25 | Sprint 11 |
| UC-25: Ocjenjivanje opreme | US-26 | Sprint 11 |
| UC-26: Izvoz podataka | US-27 | Sprint 11 |

---

### Autor

- Harun Z.
