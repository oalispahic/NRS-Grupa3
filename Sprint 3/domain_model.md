# 1. Domain Model - Sistem za upravljanje medicinskom laboratorijskom opremom

Domain model definiše glavnu poentu sistema kroz analizu ključnih objekata i njihovih međusobnih odnosa. Model je direktno izveden iz zahtjeva definisanih u **[Product Backlogu](../Sprint%202/product_backlog_v2.md)**, sa posebnim fokusom na integritet podataka u medicinskom laboratorijskom okruženju. Ukratko to je “mapa” svih važnih stvari u našoj aplikaciji i prikaz kako su povezane.


## 1.1. Glavni entiteti (Domain Entities)

Na osnovu funkcionalnih potreba laboratorije, identifikovani su sljedeći osnovni entiteti:

1. **Korisnik (User):** Glavni entitet za upravljanje pristupom. Obuhvata laborante i administratore (šefove laboratorije).
2. **Medicinska Oprema (Equipment):** Predstavlja fizičke resurse laboratorije (npr. analizatori, mikroskopi).
3. **Rezervacija (Reservation):** Ključni procesni entitet koji definiše zauzeće opreme u datom trenutku / određenom vremenu.
4. **Repromaterijal (Inventory/Supplies):** Prati fizičke resurse koji se troše prilikom rada sa opremom.
5. **Dnevnik Aktivnosti (Audit Log):** Digitalni trag svih aktivnosti, što je ključno za sigurnost i naknadnu provjeru laboratorijskih radnji.
6. **Servisni Karton (Maintenance Record):** Bilježi historiju kvarova i održavanja instrumenata.


## 1.2 Ključni atributi

U tabeli ispod su navedeni najbitniji podaci koje svaki entitet mora čuvati:

| Entitet | Ključni atributi |
| :--- | :--- |
| **Korisnik** | korisnicko_ime, lozinka_hash, uloga (Admin/Laborant), email, datum_kreiranja |
| **Oprema** | serijski_broj, naziv, model, trenutni_status (Dostupno/Servis), lokacija |
| **Rezervacija** | vrijeme_pocetka, vrijeme_kraja, status_zahtjeva (Na čekanju/Odobreno), id_korisnika, id_opreme |
| **Repromaterijal** | naziv_materijala, kolicina_na_stanju, mjerna_jedinica, minimalni_prag_zaliha |
| **Dnevnik Aktivnosti** | vrijeme_akcije, opis_promjene, id_korisnika, ip_adresa |
| **Servisni Karton** | datum_servisa, opis_kvara, cijena_popravke, tehnicar_info |