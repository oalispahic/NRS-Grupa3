# Use Case Model - Sistem za upravljanje medicinskom laboratorijskom opremom

Use Case Model opisuje funkcionalnosti sistema kroz scenarije korištenja, te definiše rezultirajuce entitete, njihove kljucne atribute i medjusobne relacije koji proizlaze iz analize use case-ova. Dokument je izveden iz [User Stories](../Sprint%202/user_stories.md) i [Acceptance Criteria](../Sprint%202/acceptance_criteria.md).

---

## Akteri sistema

| Akter | Opis |
| :--- | :--- |
| **Korisnik (Laborant)** | Prijavljeni korisnik koji pregledava opremu, kreira i upravlja rezervacijama. |
| **Administrator** | Korisnik sa prosirenim ovlastenjima koji upravlja opremom, odobrava rezervacije i administrira sistem. |
| **Sistem** | Automatizovane funkcije (provjera konflikata, autorizacija, notifikacije). |

---

## Use Case specifikacije

### UC-1: Prijava u sistem (US-6)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik ima kreiran nalog i nije prijavljen. |
| :--- | :--- |
| **Postuslov:** Korisnik je prijavljen i preusmjeren na dashboard. | **Okidac:** Korisnik otvara stranicu za prijavu. |

**Osnovni tok:** 1) Korisnik otvara stranicu za prijavu. 2) Sistem prikazuje formu za unos korisnickog imena i lozinke. 3) Korisnik unosi podatke i potvrdjuje. 4) Sistem validira podatke i utvrdjuje ulogu. 5) Sistem kreira sesiju i preusmjerava na dashboard.

**Alternativni tok:** A1 - Neispravni podaci: sistem prikazuje poruku o neuspjesnoj prijavi. A2 - Prazna polja: sistem trazi popunjavanje obaveznih polja.

**Rezultirajuci entiteti:** Korisnik (autentifikacija), Dnevnik Aktivnosti (evidencija prijave)

---

### UC-2: Odjava iz sistema (US-6)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik je prijavljen. |
| :--- | :--- |
| **Postuslov:** Sesija zavrsena, preusmjeravanje na login. | **Okidac:** Korisnik odabere odjavu. |

**Osnovni tok:** 1) Korisnik odabere odjavu. 2) Sistem zavrsava sesiju i preusmjerava na stranicu za prijavu.

---

### UC-3: Pregled opreme (US-1)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik je prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazana lista aktivne opreme. | **Okidac:** Korisnik otvara pregled opreme. |

**Osnovni tok:** 1) Korisnik otvara sekciju za pregled opreme. 2) Sistem dohvaca listu aktivne opreme. 3) Sistem prikazuje listu sa nazivom i statusom svake stavke.

**Alternativni tok:** A1 - Nema opreme: sistem prikazuje poruku da oprema trenutno nije dostupna.

**Rezultirajuci entiteti:** Oprema (naziv, status, lokacija)

---

### UC-4: Pregled detalja opreme (US-2)

| **Akter:** Korisnik, Administrator | **Preduslov:** Lista opreme je prikazana. |
| :--- | :--- |
| **Postuslov:** Prikazani detaljni podaci o opremi. | **Okidac:** Korisnik odabere stavku iz liste. |

**Osnovni tok:** 1) Korisnik odabere stavku opreme. 2) Sistem prikazuje naziv, opis, status i dodatne podatke (specifikacije, pravila, ocjene). 3) Ako oprema nije dostupna, sistem prikazuje razlog nedostupnosti.

**Rezultirajuci entiteti:** Oprema (svi atributi), Servisni Karton (historija odrzavanja), Repromaterijal (povezani materijali)

---

### UC-5: Pretraga i filtriranje opreme (US-12, US-13)

| **Akter:** Korisnik, Administrator | **Preduslov:** Sekcija za pregled opreme otvorena. |
| :--- | :--- |
| **Postuslov:** Prikazani filtrirani/pretrazeni rezultati. | **Okidac:** Korisnik unosi pojam ili odabire filter. |

**Osnovni tok:** 1) Korisnik unosi naziv u polje za pretragu ili odabire kategoriju/tip kao filter. 2) Sistem prikazuje stavke koje odgovaraju kriterijima. 3) Korisnik moze kombinovati vise filtera.

**Alternativni tok:** A1 - Nema rezultata: sistem prikazuje poruku. A2 - Brisanje filtera/pretrage: sistem vraca puni prikaz.

---

### UC-6: Rezervacija opreme (US-3, US-9)

| **Akter:** Korisnik | **Preduslov:** Korisnik prijavljen, oprema u statusu "Dostupna". |
| :--- | :--- |
| **Postuslov:** Zahtjev za rezervaciju kreiran sa statusom "na cekanju". | **Okidac:** Korisnik otvara formu za rezervaciju. |

**Osnovni tok:** 1) Korisnik otvara detalje opreme i bira opciju za rezervaciju. 2) Sistem prikazuje formu za unos termina (datum, vrijeme pocetka/zavrsetka). 3) Korisnik unosi termin i potvrdjuje. 4) Sistem provjerava preklapanje sa postojecim odobrenim rezervacijama. 5) Sistem evidentira zahtjev i prikazuje potvrdu.

**Alternativni tok:** A1 - Konflikt termina: sistem prikazuje poruku da je termin zauzet. A2 - Nevazeci termin: sistem prikazuje gresku. A3 - Oprema nedostupna (na odrzavanju/van upotrebe): sistem ne dozvoljava rezervaciju.

**Rezultirajuci entiteti:** Rezervacija (vrijeme_pocetka, vrijeme_kraja, status_zahtjeva, id_korisnika, id_opreme)

---

### UC-7: Pregled mojih rezervacija (US-4)

| **Akter:** Korisnik | **Preduslov:** Korisnik prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazane korisnikove rezervacije. | **Okidac:** Korisnik otvara "Moje rezervacije". |

**Osnovni tok:** 1) Korisnik otvara "Moje rezervacije". 2) Sistem prikazuje listu sa nazivom opreme, datumom, terminom i statusom svake rezervacije.

**Alternativni tok:** A1 - Nema rezervacija: sistem prikazuje odgovarajucu poruku.

---

### UC-8: Otkazivanje rezervacije (US-14)

| **Akter:** Korisnik | **Preduslov:** Postoji aktivna rezervacija koja nije zapocela. |
| :--- | :--- |
| **Postuslov:** Rezervacija otkazana, termin oslobodjen. | **Okidac:** Korisnik bira otkazivanje. |

**Osnovni tok:** 1) Korisnik odabere rezervaciju i bira otkazivanje. 2) Sistem trazi potvrdu. 3) Korisnik potvrdjuje. 4) Sistem mijenja status u "otkazana" i oslobadja termin.

**Alternativni tok:** A1 - Rezervacija vec zapocela: sistem ne dozvoljava otkazivanje. A2 - Korisnik odustaje: nema promjena.

**Rezultirajuci entiteti:** Rezervacija (promjena statusa), Dnevnik Aktivnosti (evidencija otkazivanja)

---

### UC-9: Izmjena rezervacije (US-15)

| **Akter:** Korisnik | **Preduslov:** Postoji rezervacija koja nije zapocela. |
| :--- | :--- |
| **Postuslov:** Podaci rezervacije azurirani. | **Okidac:** Korisnik bira izmjenu. |

**Osnovni tok:** 1) Korisnik odabere rezervaciju i bira izmjenu. 2) Sistem prikazuje formu sa trenutnim podacima. 3) Korisnik mijenja podatke. 4) Sistem provjerava dostupnost novog termina i sprema izmjene.

**Alternativni tok:** A1 - Konflikt novog termina: sistem prikazuje poruku o konfliktu. A2 - Rezervacija vec zapocela: izmjena nije dozvoljena.

---

### UC-10: Pregled kalendara zauzeća (US-11)

| **Akter:** Korisnik, Administrator | **Preduslov:** Korisnik prijavljen. |
| :--- | :--- |
| **Postuslov:** Prikazan kalendar sa zauzetim/slobodnim terminima. | **Okidac:** Korisnik otvara kalendar za opremu. |

**Osnovni tok:** 1) Korisnik odabere opremu. 2) Sistem prikazuje kalendar sa jasno oznacenim zauzetim i slobodnim terminima.

**Alternativni tok:** A1 - Nema rezervacija: sistem prikazuje poruku da nema zauzeca.

---

### UC-11: Upravljanje opremom (US-5)

| **Akter:** Administrator | **Preduslov:** Administrator prijavljen. |
| :--- | :--- |
| **Postuslov:** Oprema dodana ili uklonjena iz inventara. | **Okidac:** Administrator otvara upravljanje opremom. |

**Osnovni tok (dodavanje):** 1) Administrator bira dodavanje. 2) Unosi obavezne podatke (naziv, serijski broj, model, lokacija, status). 3) Sistem validira i sprema.

**Osnovni tok (brisanje):** 1) Administrator bira brisanje stavke. 2) Sistem provjerava aktivne rezervacije. 3) Sistem uklanja stavku.

**Alternativni tok:** A1 - Nepotpuni podaci: sistem trazi popunjavanje. A2 - Aktivne rezervacije: brisanje nije dozvoljeno.

**Rezultirajuci entiteti:** Oprema (kreiranje/brisanje), Dnevnik Aktivnosti (evidencija promjene)

---

### UC-12: Izmjena statusa opreme (US-8)

| **Akter:** Administrator | **Preduslov:** Oprema postoji u sistemu. |
| :--- | :--- |
| **Postuslov:** Status/detalji opreme azurirani. | **Okidac:** Administrator uredjuje opremu. |

**Osnovni tok:** 1) Administrator otvara uredjivanje opreme. 2) Mijenja status ili detalje. 3) Sistem validira i sprema izmjene.

**Alternativni tok:** A1 - Nevazeci status: sistem prikazuje gresku.

---

### UC-13: Odobravanje/Odbijanje rezervacija (US-7)

| **Akter:** Administrator | **Preduslov:** Postoje rezervacije sa statusom "na cekanju". |
| :--- | :--- |
| **Postuslov:** Status promijenjen u "odobrena" ili "odbijena". | **Okidac:** Administrator otvara zahtjeve. |

**Osnovni tok:** 1) Sistem prikazuje zahtjeve "na cekanju". 2) Administrator pregledava i odobrava zahtjev. 3) Sistem provjerava konflikt termina i mijenja status u "odobrena".

**Alternativni tok:** A1 - Odbijanje: status se mijenja u "odbijena". A2 - Konflikt: odobravanje nije dozvoljeno.

**Rezultirajuci entiteti:** Rezervacija (promjena statusa), Dnevnik Aktivnosti (evidencija odluke)

---

### UC-14: Pregled svih rezervacija (US-17)

**Akter:** Administrator | **Tok:** Sistem prikazuje sve rezervacije (korisnik, oprema, datum, termin, status). Administrator filtrira po potrebi.

### UC-15: Pregled trenutnog koristenja (US-18)

**Akter:** Administrator | **Tok:** Sistem na osnovu odobrenih rezervacija i aktuelnog vremena prikazuje opremu u upotrebi sa korisnikom i vremenima.

### UC-16: Slanje notifikacija (US-16)

**Akter:** Administrator | **Tok:** Administrator odabere kontekst (rezervaciju/korisnika), unosi sadrzaj i potvrdjuje slanje. Sistem validira, isporucuje i prikazuje potvrdu.

### UC-17: Pregled historije aktivnosti (US-19)

**Akter:** Administrator | **Tok:** Sistem prikazuje log zapise hronoloski (vrsta akcije, korisnik, vrijeme). Administrator filtrira po potrebi.

### UC-18: Pracenje potrosnje repromaterijala (US-20)

**Akter:** Administrator | **Tok:** Administrator odabere materijal i unosi kolicinu potrosnje. Sistem validira (pozitivan broj), evidentira i azurira stanje. Ako zaliha padne ispod minimuma, prikazuje upozorenje.

**Rezultirajuci entiteti:** Repromaterijal (kolicina_na_stanju, minimalni_prag_zaliha)

### UC-19: Definisanje pravila koristenja (US-21)

**Akter:** Administrator | **Tok:** Administrator unosi/mijenja pravila za opremu. Sistem validira (nije prazno) i sprema uz opremu.

### UC-20: Generisanje izvjestaja (US-22)

**Akter:** Administrator | **Tok:** Administrator odabere period i filtere. Sistem kreira izvjestaj sa podacima o koristenju opreme.

### UC-21: Evidencija odrzavanja (US-23)

**Akter:** Administrator | **Tok:** Administrator unosi datum i opis (servis, kvar, kalibracija). Sistem sprema zapis i po potrebi azurira status opreme na "Na odrzavanju".

**Rezultirajuci entiteti:** Servisni Karton (datum_servisa, opis_kvara, cijena_popravke, tehnicar_info)

### UC-22: Dashboard pregled (US-24)

**Akter:** Korisnik, Administrator | **Tok:** Sistem utvrdjuje ulogu. Laborantu prikazuje nadolazece rezervacije i dostupnu opremu. Administratoru prikazuje zahtjeve na cekanju, koristenje opreme i upozorenja o zalihama.

### UC-23: Specifikacije opreme (US-25)

**Akter:** Administrator | **Tok:** Administrator unosi tehnicke specifikacije i slike opreme. Sistem sprema i prikazuje u detaljima.

### UC-24: Ocjenjivanje opreme (US-26)

**Akter:** Korisnik | **Tok:** Korisnik otvara zavrsenu rezervaciju, unosi ocjenu i opcioni komentar. Sistem sprema. Preduslov: korisnik je prethodno koristio opremu.

### UC-25: Izvoz podataka (US-27)

**Akter:** Administrator | **Tok:** Administrator odabere podatke, filtere i format (PDF/Excel). Sistem generira datoteku za preuzimanje.

---

## Rezultirajuci model podataka

Na osnovu analize use case-ova identifikovani su sljedeci glavni entiteti, njihovi kljucni atributi i medjusobne relacije.

### Glavni entiteti

**Korisnik (User)** je centralni entitet za pristup sistemu. Nastaje kroz UC-1 (prijava) i koristi se u gotovo svim use case-ovima. Kljucni atributi su: korisnicko_ime, lozinka_hash, uloga (Administrator ili Laborant), email i datum_kreiranja. Uloga korisnika odredjuje koje funkcionalnosti su mu dostupne - laborant moze pregledati opremu i upravljati svojim rezervacijama, dok administrator ima pristup svim administrativnim funkcijama.

**Oprema (Equipment)** predstavlja fizicke resurse laboratorije i pojavljuje se u UC-3, UC-4, UC-5, UC-6, UC-11, UC-12 i UC-13. Kljucni atributi su: serijski_broj, naziv, model, trenutni_status (Dostupna, Na odrzavanju, Van upotrebe, Rezervisana) i lokacija. Status opreme direktno utice na mogucnost rezervacije - samo oprema u statusu "Dostupna" moze biti rezervisana.

**Rezervacija (Reservation)** je kljucni procesni entitet koji nastaje u UC-6 i koristi se u UC-7 do UC-10, UC-13 do UC-15. Kljucni atributi su: vrijeme_pocetka, vrijeme_kraja, status_zahtjeva (Na cekanju, Odobrena, Odbijena, Otkazana), id_korisnika i id_opreme. Sistem mora osigurati da se termini ne preklapaju za istu opremu.

**Repromaterijal (Inventory/Supplies)** prati potrosni materijal i pojavljuje se u UC-18. Kljucni atributi su: naziv_materijala, kolicina_na_stanju, mjerna_jedinica i minimalni_prag_zaliha. Kada kolicina padne ispod praga, sistem generise upozorenje.

**Dnevnik Aktivnosti (Audit Log)** evidentira sve vazne akcije u sistemu (UC-1, UC-8, UC-11, UC-13, UC-17). Kljucni atributi su: vrijeme_akcije, opis_promjene, id_korisnika i ip_adresa.

**Servisni Karton (Maintenance Record)** biljezi historiju odrzavanja opreme (UC-21). Kljucni atributi su: datum_servisa, opis_kvara, cijena_popravke i tehnicar_info.

### Relacije izmedju entiteta

**Korisnik - Rezervacija (1:N):** Jedan korisnik moze kreirati vise rezervacija, ali svaka rezervacija pripada tacno jednom korisniku. Ova relacija proizlazi iz UC-6 i UC-7.

**Oprema - Rezervacija (1:N):** Jedan komad opreme moze imati vise rezervacija u razlicitim terminima, ali se jedna rezervacija odnosi na tacno jednu opremu. Ova relacija proizlazi iz UC-6, a sistem mora validirati da se termini ne preklapaju (UC-6, A1).

**Oprema - Servisni Karton (1:N):** Svaki komad opreme ima svoju historiju odrzavanja. Proizlazi iz UC-21 i direktno utice na status opreme u UC-12.

**Korisnik - Dnevnik Aktivnosti (1:N):** Svaka kriticna akcija u sistemu vezana je za korisnika koji ju je izvrsio. Proizlazi iz UC-17.

**Oprema - Repromaterijal (N:M):** Jedan uredjaj moze trositi vise vrsta materijala, a isti materijal se moze koristiti na vise uredjaja. Proizlazi iz UC-18.

### Poslovna pravila koja proizlaze iz use case-ova

Na osnovu alternativnih tokova i sistemskih provjera definisanih u use case-ovima, identifikovana su sljedeca poslovna pravila:

1. **Pravilo validacije termina (UC-6, UC-9, UC-13):** Sistem ne smije dozvoliti kreiranje ili odobravanje rezervacije ako se termin preklapa sa vec odobrenom rezervacijom za istu opremu.
2. **Pravilo dostupnosti opreme (UC-6, UC-12):** Rezervacija se moze kreirati samo ako je oprema u statusu "Dostupna". Oprema na odrzavanju ili van upotrebe se automatski izuzima.
3. **Pravilo integriteta brisanja (UC-11):** Nije dozvoljeno brisanje opreme za koju postoje aktivne ili buduce rezervacije.
4. **Pravilo minimalnih zaliha (UC-18):** Kada kolicina repromaterijala padne ispod definisanog praga, sistem mora prikazati upozorenje.
5. **Pravilo autorizacije (UC-1, svi admin UC):** Samo korisnik sa ulogom Administrator ima pristup administrativnim funkcijama sistema.

---

## Matrica pokrivanja: Use Case - User Story

| Use Case | User Story | Use Case | User Story |
| :--- | :--- | :--- | :--- |
| UC-1: Prijava | US-6 | UC-14: Pregled svih rezervacija | US-17 |
| UC-2: Odjava | US-6 | UC-15: Trenutno koristenje | US-18 |
| UC-3: Pregled opreme | US-1 | UC-16: Notifikacije | US-16 |
| UC-4: Detalji opreme | US-2 | UC-17: Historija aktivnosti | US-19 |
| UC-5: Pretraga/Filtriranje | US-12, US-13 | UC-18: Potrosnja repromaterijala | US-20 |
| UC-6: Rezervacija | US-3, US-9 | UC-19: Pravila koristenja | US-21 |
| UC-7: Moje rezervacije | US-4 | UC-20: Izvjestaji | US-22 |
| UC-8: Otkazivanje | US-14 | UC-21: Odrzavanje | US-23 |
| UC-9: Izmjena rezervacije | US-15 | UC-22: Dashboard | US-24 |
| UC-10: Kalendar zauzeca | US-11 | UC-23: Specifikacije | US-25 |
| UC-11: Upravljanje opremom | US-5 | UC-24: Ocjenjivanje | US-26 |
| UC-12: Status opreme | US-8 | UC-25: Izvoz podataka | US-27 |
| UC-13: Odobravanje rezervacija | US-7 | | |

---

### Autor
- Harun Zukanovic (239-ST)
