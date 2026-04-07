# Acceptance Criteria

## Lab-01 — Rezervacija laboratorijske opreme

- Kada je korisnik prijavljen u sistem, ako otvori detalje opreme, tada sistem mora prikazati dostupne termine za rezervaciju.
- Kada je oprema dostupna u izabranom terminu, ako korisnik odabere termin i potvrdi rezervaciju, tada sistem mora evidentirati rezervaciju i prikazati poruku o uspješnoj rezervaciji.
- Kada je rezervacija uspješno kreirana, tada sistem mora prikazati osnovne informacije o rezervaciji: naziv opreme, datum, vrijeme početka i vrijeme završetka.
- Kada korisnik pokuša rezervisati opremu za termin koji je već zauzet, tada sistem ne smije dozvoliti potvrdu rezervacije i mora prikazati odgovarajuću poruku o grešci.
- Kada korisnik nije prijavljen u sistem, ako pokuša izvršiti rezervaciju, tada sistem ne smije dozvoliti rezervaciju.
- Kada korisnik unese nepotpune ili neispravne podatke prilikom rezervacije, tada sistem ne smije sačuvati rezervaciju i mora jasno označiti grešku.
- Sistem mora omogućiti da ista oprema ne može imati dvije aktivne rezervacije koje se vremenski preklapaju.
- Kada rezervacija bude potvrđena, tada sistem mora za izabrani termin ažurirati zauzeće opreme.

## Lab-02 — Pregled statusa laboratorijske opreme

- Kada korisnik otvori listu laboratorijske opreme, tada sistem mora prikazati status svake evidentirane stavke opreme.
- Kada je oprema označena određenim statusom, tada sistem mora jasno prikazati taj status uz odgovarajuću stavku opreme.
- Kada se status opreme promijeni u sistemu, tada novi status mora biti vidljiv korisniku pri sljedećem prikazu liste ili nakon osvježavanja stranice.
- Kada je oprema u kvaru ili van upotrebe, tada sistem mora jasno prikazati da ta oprema nije dostupna za korištenje ili rezervaciju.
- Kada u sistemu ne postoji nijedna evidentirana stavka opreme, tada korisnik treba dobiti poruku da oprema trenutno nije dostupna u evidenciji.
- Sistem ne smije prikazivati nevažeće ili nedefinisane statuse opreme.
- Sistem mora omogućiti brz i jasan pregled statusa bez potrebe za otvaranjem detalja svake pojedinačne stavke.
