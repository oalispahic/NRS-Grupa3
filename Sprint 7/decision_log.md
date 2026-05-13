# Decision Log - Sprint 7

Ovaj dokument bilježi ključne tehničke i dizajnerske odluke donesene tokom Sprinta 7, sa fokusom na korisnički interfejs i sistem upravljanja rezervacijama.

---

## [D7.1] Izbor prikaza dostupnih termina (PB8)
- **Odluka:** Umjesto obične tekstualne liste, odlučeno je da se koristi **kalendarski prikaz** (grid layout) za mobilne uređaje.
- **Obrazloženje:** Testiranjem je utvrđeno da korisnici brže pronalaze slobodne slotove ako vide cijelu sedmicu odjednom.
- **Status:** Implementirano.

## [D7.2] Strategija validacije forme za rezervaciju (PB9)
- **Odluka:** Implementirana je **dvostruka validacija** (Client-side i Server-side).
- **Obrazloženje:** Client-side validacija omogućava trenutni feedback korisniku (npr. pogrešan format datuma), dok Server-side osigurava da ne dođe do preklapanja termina u bazi u slučaju istovremenih zahtjeva (Race conditions).
- **Status:** Implementirano.

## [D7.3] Upravljanje statusima rezervacija (PB13)
- **Odluka:** Uvedena je enumeracija statusa: `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`.
- **Obrazloženje:** Ovakav pristup omogućava lakše filtriranje historije (PB10) i automatizaciju slanja notifikacija korisnicima nakon što administrator odobri termin.
- **Status:** Implementirano.

## [D7.4] Restrikcije za otkazivanje rezervacija (PB14)
- **Odluka:** Korisnicima je omogućeno otkazivanje rezervacije najkasnije **24 sata** prije termina.
- **Obrazloženje:** Kako bismo spriječili gubitke u rasporedu, sistem onemogućava dugme "Otkaži" unutar kritičnog perioda, osim ako korisnik direktno ne kontaktira podršku.
- **Status:** Implementirano.

## [D7.5] Arhitektura Frontenda za historiju (PB10)
- **Odluka:** Korištenje "Lazy Loading" pristupa za učitavanje starih rezervacija.
- **Obrazloženje:** Kako bi se poboljšale performanse aplikacije, inicijalno se učitavaju samo aktivne rezervacije, dok se historija povlači iz baze tek na zahtjev korisnika.
- **Status:** Implementirano.

---
