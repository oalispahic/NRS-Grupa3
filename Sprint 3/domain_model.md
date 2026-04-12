# Domain Model - Sistem za upravljanje medicinskom laboratorijskom opremom

Domain model definiše glavnu poentu sistema kroz analizu ključnih objekata i njihovih međusobnih odnosa. Model je direktno izveden iz zahtjeva definisanih u **[Product Backlogu](../Sprint%202/product_backlog_v2.md)**, sa posebnim fokusom na integritet podataka u medicinskom laboratorijskom okruženju. Ukratko to je “mapa” svih važnih stvari u našoj aplikaciji i prikaz kako su povezane.


## Glavni entiteti (Domain Entities)

Na osnovu funkcionalnih potreba laboratorije, identifikovani su sljedeći osnovni entiteti:

1. **Korisnik (User):** Glavni entitet za upravljanje pristupom. Obuhvata laborante i administratore (šefove laboratorije).
2. **Medicinska Oprema (Equipment):** Predstavlja fizičke resurse laboratorije (npr. analizatori, mikroskopi).
3. **Rezervacija (Reservation):** Ključni procesni entitet koji definiše zauzeće opreme u datom trenutku / određenom vremenu.
4. **Repromaterijal (Inventory/Supplies):** Prati fizičke resurse koji se troše prilikom rada sa opremom.
5. **Dnevnik Aktivnosti (Audit Log):** Digitalni trag svih aktivnosti, što je ključno za sigurnost i naknadnu provjeru laboratorijskih radnji.
6. **Servisni Karton (Maintenance Record):** Bilježi historiju kvarova i održavanja instrumenata.


## Ključni atributi

U tabeli ispod su navedeni najbitniji podaci koje svaki entitet mora čuvati:

| Entitet | Ključni atributi |
| :--- | :--- |
| **Korisnik** | korisnicko_ime, lozinka_hash, uloga (Admin/Laborant), email, datum_kreiranja |
| **Oprema** | serijski_broj, naziv, model, trenutni_status (Dostupno/Servis), lokacija |
| **Rezervacija** | vrijeme_pocetka, vrijeme_kraja, status_zahtjeva (Na čekanju/Odobreno), id_korisnika, id_opreme |
| **Repromaterijal** | naziv_materijala, kolicina_na_stanju, mjerna_jedinica, minimalni_prag_zaliha |
| **Dnevnik Aktivnosti** | vrijeme_akcije, opis_promjene, id_korisnika, ip_adresa |
| **Servisni Karton** | datum_servisa, opis_kvara, cijena_popravke, tehnicar_info |


## Veze između entiteta

Logička povezanost sistema definisana je sljedećim relacijama:

* **Korisnik – Rezervacija (1:N):** Jedan laborant može kreirati neograničen broj rezervacija tokom vremena, ali svaka pojedinačna rezervacija u sistemu pripada isključivo jednom korisniku.
* **Oprema – Rezervacija (1:N):** Jedan instrument može biti predmet mnogih rezervacija u različitim terminima, ali se jedna konkretna rezervacija odnosi samo na jedan komad opreme.
* **Oprema – Servisni Karton (1:1/N):** Svaki komad opreme ima svoju historiju servisa. Veza omogućava uvid u pouzdanost uređaja kroz vrijeme.
* **Korisnik – Dnevnik Aktivnosti (1:N):** Svaka kritična akcija (brisanje opreme, odobravanje termina) vezana je za ID korisnika koji je akciju izvršio.

## Poslovna pravila važna za domain model

Ova pravila osiguravaju da sistem radi ispravno i sprječava ljudske greške (direktno vezano za **PB26** i **PB22**):

* **Pravilo validacije termina:** Sistem ne smije dozvoliti kreiranje nove rezervacije ako se `vrijeme_pocetka` ili `vrijeme_kraja` preklapa sa već postojećom odobrenom rezervacijom za tu istu opremu.
* **Pravilo dostupnosti opreme:** Rezervacija se može kreirati samo ako je status opreme postavljen na **"Dostupno"**. Ako je oprema u statusu **"Servis"**, ona se automatski izuzima iz kalendara rezervacija.
* **Pravilo minimalnih zaliha:** Prilikom evidentiranja potrošnje materijala, ako `kolicina` padne ispod `minimalni_prag_zaliha`, sistem mora označiti taj materijal kao prioritet za nabavku.
* **Pravilo autorizacije:** Samo korisnik sa ulogom **Administrator** ima pravo pristupa entitetu **Dnevnik Aktivnosti** i pravo promjene statusa u entitetu **Servisni Karton**.
* **Pravilo integriteta brisanja:** Nije dozvoljeno brisanje entiteta **Oprema** iz sistema ukoliko za nju postoje aktivne ili buduće **Rezervacije**.

