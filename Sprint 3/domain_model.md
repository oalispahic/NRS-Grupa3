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

