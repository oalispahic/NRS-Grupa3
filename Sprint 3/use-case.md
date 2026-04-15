# Use Case specifikacija - Sistem za upravljanje medicinskom laboratorijskom opremom

Use Case specifikacija opisuje interakcije između korisnika (aktera) i sistema kroz konkretne scenarije korištenja. Dokument je izveden iz [User Stories](../Sprint%202/user_stories.md) i [Acceptance Criteria](../Sprint%202/acceptance_criteria.md).

---

## Akteri sistema

| Akter | Opis |
| :--- | :--- |
| **Korisnik (Laborant)** | Prijavljeni korisnik koji pregledava opremu, kreira i upravlja rezervacijama. |
| **Administrator** | Korisnik sa proširenim ovlaštenjima koji upravlja opremom, odobrava rezervacije i administrira sistem. |
| **Sistem** | Automatizovane funkcije (provjera konflikata, autorizacija, notifikacije). |

---

## UC-1: Prijava u sistem (US-6)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik ima kreiran nalog i nije prijavljen. |
| :--- | :--- |
| **Postuslov:** Korisnik je prijavljen i preusmjeren na dashboard. | **Okidač:** Korisnik otvara stranicu za prijavu. |

**Osnovni tok:** 1) Korisnik otvara stranicu za prijavu. 2) Sistem prikazuje formu za unos korisničkog imena i lozinke. 3) Korisnik unosi podatke i potvrđuje. 4) Sistem validira podatke i utvrđuje ulogu. 5) Sistem kreira sesiju i preusmjerava na dashboard.

**Alternativni tok:** A1 — Neispravni podaci: sistem prikazuje poruku o neuspješnoj prijavi. A2 — Prazna polja: sistem traži popunjavanje obaveznih polja.

---

## UC-2: Odjava iz sistema (US-6)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik je prijavljen. |
| :--- | :--- |
| **Postuslov:** Sesija završena, preusmjeravanje na login. | **Okidač:** Korisnik odabere odjavu. |

**Osnovni tok:** 1) Korisnik odabere odjavu. 2) Sistem završava sesiju. 3) Sistem preusmjerava na stranicu za prijavu.

---

## UC-3: Pregled opreme (US-1)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik je prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazana lista aktivne opreme. | **Okidač:** Korisnik otvara pregled opreme. |

**Osnovni tok:** 1) Korisnik otvara sekciju za pregled opreme. 2) Sistem dohvaća listu aktivne opreme. 3) Sistem prikazuje listu sa nazivom i statusom svake stavke.

**Alternativni tok:** A1 — Nema opreme: sistem prikazuje poruku da oprema trenutno nije dostupna.

---

## UC-4: Pregled detalja opreme (US-2)

| **Akter:** Korisnik, Administrator | **Preduslov:** Lista opreme je prikazana. |
| :--- | :--- |
| **Postuslov:** Prikazani detaljni podaci o opremi. | **Okidač:** Korisnik odabere stavku iz liste. |

**Osnovni tok:** 1) Korisnik odabere stavku opreme. 2) Sistem prikazuje naziv, opis, status i dodatne podatke (specifikacije, pravila, ocjene). 3) Ako oprema nije dostupna, sistem prikazuje razlog nedostupnosti.

**Alternativni tok:** A1 — Nepostojeća oprema: sistem prikazuje poruku o grešci.

---

## UC-5: Pretraga i filtriranje opreme (US-12, US-13)

| **Akter:** Korisnik, Administrator | **Preduslov:** Sekcija za pregled opreme otvorena. |
| :--- | :--- |
| **Postuslov:** Prikazani filtrirani/pretraženi rezultati. | **Okidač:** Korisnik unosi pojam ili odabire filter. |

**Osnovni tok:** 1) Korisnik unosi naziv u polje za pretragu ili odabire kategoriju/tip kao filter. 2) Sistem prikazuje stavke koje odgovaraju kriterijima. 3) Korisnik može kombinovati više filtera.

**Alternativni tok:** A1 — Nema rezultata: sistem prikazuje poruku. A2 — Brisanje filtera/pretrage: sistem vraća puni prikaz.

---

## UC-6: Rezervacija opreme (US-3, US-9)

| **Akter:** Korisnik | **Preduslov:** Korisnik prijavljen, oprema u statusu „Dostupna". |
| :--- | :--- |
| **Postuslov:** Zahtjev za rezervaciju kreiran sa statusom „na čekanju". | **Okidač:** Korisnik otvara formu za rezervaciju. |

**Osnovni tok:** 1) Korisnik otvara detalje opreme i bira opciju za rezervaciju. 2) Sistem prikazuje formu za unos termina (datum, vrijeme početka/završetka). 3) Korisnik unosi termin i potvrđuje. 4) Sistem provjerava preklapanje sa postojećim odobrenim rezervacijama. 5) Sistem evidentira zahtjev i prikazuje potvrdu.

**Alternativni tok:** A1 — Konflikt termina: sistem prikazuje poruku da je termin zauzet. A2 — Nevažeći termin: sistem prikazuje grešku. A3 — Oprema nedostupna (na održavanju/van upotrebe): sistem ne dozvoljava rezervaciju.

---

## UC-7: Pregled mojih rezervacija (US-4)

| **Akter:** Korisnik | **Preduslov:** Korisnik prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazane korisnikove rezervacije. | **Okidač:** Korisnik otvara „Moje rezervacije". |

**Osnovni tok:** 1) Korisnik otvara „Moje rezervacije". 2) Sistem prikazuje listu sa nazivom opreme, datumom, terminom i statusom svake rezervacije.

**Alternativni tok:** A1 — Nema rezervacija: sistem prikazuje odgovarajuću poruku.

---

## UC-8: Otkazivanje rezervacije (US-14)

| **Akter:** Korisnik | **Preduslov:** Postoji aktivna rezervacija koja nije započela. |
| :--- | :--- |
| **Postuslov:** Rezervacija otkazana, termin oslobođen. | **Okidač:** Korisnik bira otkazivanje. |

**Osnovni tok:** 1) Korisnik odabere rezervaciju i bira otkazivanje. 2) Sistem traži potvrdu. 3) Korisnik potvrđuje. 4) Sistem mijenja status u „otkazana" i oslobađa termin.

**Alternativni tok:** A1 — Rezervacija već započela: sistem ne dozvoljava otkazivanje. A2 — Korisnik odustaje: nema promjena.

---

## UC-9: Izmjena rezervacije (US-15)

| **Akter:** Korisnik | **Preduslov:** Postoji rezervacija koja nije započela. |
| :--- | :--- |
| **Postuslov:** Podaci rezervacije ažurirani. | **Okidač:** Korisnik bira izmjenu. |

**Osnovni tok:** 1) Korisnik odabere rezervaciju i bira izmjenu. 2) Sistem prikazuje formu sa trenutnim podacima. 3) Korisnik mijenja podatke. 4) Sistem provjerava dostupnost novog termina i sprema izmjene.

**Alternativni tok:** A1 — Konflikt novog termina: sistem prikazuje poruku o konfliktu. A2 — Rezervacija već započela: izmjena nije dozvoljena.

---

## UC-10: Pregled kalendara zauzeća (US-11)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazan kalendar sa zauzetim/slobodnim terminima. | **Okidač:** Korisnik otvara kalendar za opremu. |

**Osnovni tok:** 1) Korisnik odabere opremu. 2) Sistem prikazuje kalendar sa jasno označenim zauzetim i slobodnim terminima.

**Alternativni tok:** A1 — Nema rezervacija: sistem prikazuje poruku da nema zauzeća.

---

## UC-11: Upravljanje opremom (US-5)

| **Akter:** Administrator | **Preduslov:** Administrator prijavljen. |
| :--- | :--- |
| **Postuslov:** Oprema dodana ili uklonjena iz inventara. | **Okidač:** Administrator otvara upravljanje opremom. |

**Osnovni tok (dodavanje):** 1) Administrator bira dodavanje. 2) Unosi obavezne podatke (naziv, serijski broj, model, lokacija, status). 3) Sistem validira i sprema.

**Osnovni tok (brisanje):** 1) Administrator bira brisanje stavke. 2) Sistem provjerava aktivne rezervacije. 3) Sistem uklanja stavku.

**Alternativni tok:** A1 — Nepotpuni podaci: sistem traži popunjavanje. A2 — Aktivne rezervacije: brisanje nije dozvoljeno.

---

## UC-12: Izmjena statusa opreme (US-8)

| **Akter:** Administrator | **Preduslov:** Oprema postoji u sistemu. |
| :--- | :--- |
| **Postuslov:** Status/detalji opreme ažurirani. | **Okidač:** Administrator uređuje opremu. |

**Osnovni tok:** 1) Administrator otvara uređivanje opreme. 2) Mijenja status ili detalje. 3) Sistem validira i sprema izmjene.

**Alternativni tok:** A1 — Nevažeći status: sistem prikazuje grešku.

---

## UC-13: Odobravanje/Odbijanje rezervacija (US-7)

| **Akter:** Administrator | **Preduslov:** Postoje rezervacije sa statusom „na čekanju". |
| :--- | :--- |
| **Postuslov:** Status promijenjen u „odobrena" ili „odbijena". | **Okidač:** Administrator otvara zahtjeve. |

**Osnovni tok:** 1) Sistem prikazuje zahtjeve „na čekanju". 2) Administrator pregledava i odobrava zahtjev. 3) Sistem provjerava konflikt termina i mijenja status u „odobrena".

**Alternativni tok:** A1 — Odbijanje: status se mijenja u „odbijena". A2 — Konflikt: odobravanje nije dozvoljeno.

---

## UC-14: Pregled svih rezervacija (US-17)

| **Akter:** Administrator | **Preduslov:** Administrator prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazane sve rezervacije sa mogućnošću filtriranja. | **Okidač:** Administrator otvara pregled. |

**Osnovni tok:** 1) Sistem prikazuje sve rezervacije (korisnik, oprema, datum, termin, status). 2) Administrator primjenjuje filtere po potrebi.

---

## UC-15: Pregled trenutnog korištenja (US-18)

| **Akter:** Administrator | **Preduslov:** Administrator prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazana oprema koja se trenutno koristi. | **Okidač:** Administrator otvara pregled korištenja. |

**Osnovni tok:** 1) Sistem na osnovu odobrenih rezervacija i aktuelnog vremena prikazuje opremu u upotrebi sa korisnikom, vremenom početka i planiranim završetkom.

**Alternativni tok:** A1 — Nema aktivnog korištenja: sistem prikazuje poruku.

---

## UC-16: Slanje notifikacija (US-16)

| **Akter:** Administrator | **Preduslov:** Administrator prijavljen. |
| :--- | :--- |
| **Postuslov:** Notifikacija poslana i evidentirana. | **Okidač:** Administrator šalje obavijest. |

**Osnovni tok:** 1) Administrator odabere kontekst (rezervaciju/korisnika). 2) Unosi sadržaj i potvrđuje slanje. 3) Sistem validira, isporučuje i prikazuje potvrdu.

**Alternativni tok:** A1 — Prazan sadržaj: slanje nije dozvoljeno.

---

## UC-17: Pregled historije aktivnosti (US-19)

| **Akter:** Administrator | **Preduslov:** Administrator prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazana historija aktivnosti. | **Okidač:** Administrator otvara historiju. |

**Osnovni tok:** 1) Sistem prikazuje log zapise hronološki (vrsta akcije, korisnik, vrijeme). 2) Administrator filtrira po potrebi.

---

## UC-18: Praćenje potrošnje repromaterijala (US-20)

| **Akter:** Administrator | **Preduslov:** Repromaterijal evidentiran u sistemu. |
| :--- | :--- |
| **Postuslov:** Potrošnja evidentirana, zaliha ažurirana. | **Okidač:** Administrator unosi potrošnju. |

**Osnovni tok:** 1) Administrator odabere materijal i unosi količinu potrošnje. 2) Sistem validira (pozitivan broj), evidentira i ažurira stanje.

**Alternativni tok:** A1 — Nevažeća vrijednost: sistem ne dozvoljava spremanje. A2 — Niske zalihe: sistem prikazuje upozorenje.

---

## UC-19: Definisanje pravila korištenja (US-21)

| **Akter:** Administrator | **Preduslov:** Oprema postoji u sistemu. |
| :--- | :--- |
| **Postuslov:** Pravila sačuvana i vidljiva korisnicima. | **Okidač:** Administrator uređuje pravila. |

**Osnovni tok:** 1) Administrator otvara pravila za opremu. 2) Unosi/mijenja pravilo i potvrđuje. 3) Sistem validira (nije prazno) i sprema.

---

## UC-20: Generisanje izvještaja (US-22)

| **Akter:** Administrator | **Preduslov:** Postoje podaci o korištenju. |
| :--- | :--- |
| **Postuslov:** Izvještaj generisan i prikazan. | **Okidač:** Administrator bira generisanje izvještaja. |

**Osnovni tok:** 1) Administrator odabere period i filtere. 2) Sistem kreira izvještaj sa podacima o korištenju opreme.

**Alternativni tok:** A1 — Nema podataka: sistem prikazuje poruku.

---

## UC-21: Evidencija održavanja (US-23)

| **Akter:** Administrator | **Preduslov:** Oprema postoji u sistemu. |
| :--- | :--- |
| **Postuslov:** Zapis o održavanju evidentiran. | **Okidač:** Administrator evidentira servis/kvar. |

**Osnovni tok:** 1) Administrator unosi datum i opis (servis, kvar, kalibracija). 2) Sistem sprema zapis i po potrebi ažurira status opreme na „Na održavanju".

---

## UC-22: Dashboard pregled (US-24)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik uspješno prijavljen. |
| :--- | :--- |
| **Postuslov:** Dashboard prikazan prema ulozi. | **Okidač:** Prijava u sistem. |

**Osnovni tok:** 1) Sistem utvrđuje ulogu. 2) Laborantu prikazuje nadolazeće rezervacije i dostupnu opremu. Administratoru prikazuje zahtjeve na čekanju, korištenje opreme i upozorenja o zalihama.

---

## UC-23: Specifikacije opreme (US-25)

**Akter:** Administrator | **Osnovni tok:** Administrator otvara uređivanje opreme, unosi specifikacije/slike, sistem sprema i prikazuje u detaljima.

## UC-24: Ocjenjivanje opreme (US-26)

**Akter:** Korisnik | **Osnovni tok:** Korisnik otvara završenu rezervaciju, unosi ocjenu i opcioni komentar, sistem sprema. **Preduslov:** Korisnik je prethodno koristio opremu.

## UC-25: Izvoz podataka (US-27)

**Akter:** Administrator | **Osnovni tok:** Administrator odabere podatke, filtere i format (PDF/Excel), sistem generira datoteku za preuzimanje.

---

## Matrica pokrivanja: Use Case ↔ User Story

| Use Case | User Story | Use Case | User Story |
| :--- | :--- | :--- | :--- |
| UC-1: Prijava | US-6 | UC-14: Pregled svih rezervacija | US-17 |
| UC-2: Odjava | US-6 | UC-15: Trenutno korištenje | US-18 |
| UC-3: Pregled opreme | US-1 | UC-16: Notifikacije | US-16 |
| UC-4: Detalji opreme | US-2 | UC-17: Historija aktivnosti | US-19 |
| UC-5: Pretraga/Filtriranje | US-12, US-13 | UC-18: Potrošnja repromaterijala | US-20 |
| UC-6: Rezervacija | US-3, US-9 | UC-19: Pravila korištenja | US-21 |
| UC-7: Moje rezervacije | US-4 | UC-20: Izvještaji | US-22 |
| UC-8: Otkazivanje | US-14 | UC-21: Održavanje | US-23 |
| UC-9: Izmjena rezervacije | US-15 | UC-22: Dashboard | US-24 |
| UC-10: Kalendar zauzeća | US-11 | UC-23: Specifikacije | US-25 |
| UC-11: Upravljanje opremom | US-5 | UC-24: Ocjenjivanje | US-26 |
| UC-12: Status opreme | US-8 | UC-25: Izvoz podataka | US-27 |
| UC-13: Odobravanje rezervacija | US-7 | | |

---

### Autor
- Harun Zukanovic (239-ST)
