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

##  Lab-03 — Pregled zauzeća opreme
Kada korisnik otvori pregled zauzeća za određenu opremu, tada sistem mora prikazati evidentirane rezervacije za tu opremu po terminima.
Kada za opremu postoje budući termini rezervacije, tada sistem mora prikazati datum, vrijeme početka i vrijeme završetka svakog zauzetog termina.
Kada za izabranu opremu nema aktivnih ili budućih rezervacija, tada korisnik treba dobiti poruku da nema evidentiranog zauzeća.
Kada korisnik pregleda zauzeće opreme, tada sistem mora omogućiti jasan uvid u slobodne i zauzete termine.
Kada korisnik odabere određeni datum ili vremenski period, ako postoje rezervacije u tom periodu, tada sistem mora prikazati samo zauzeća iz tog perioda.
Sistem ne smije prikazivati zauzete termine kao slobodne.
Sistem mora prikazivati zauzeće na osnovu ažurnih i aktivnih rezervacija evidentiranih u sistemu.
Korisnik treba dobiti dovoljno informacija da može procijeniti da li je željeni termin dostupan za novu rezervaciju.

## Lab-04 — Evidentiranje potrošnje repromaterijala
Kada je korisnik prijavljen u sistem i repromaterijal postoji u evidenciji, ako unese količinu potrošenog materijala i potvrdi unos, tada sistem mora evidentirati potrošnju.
Kada je potrošnja uspješno evidentirana, tada sistem mora automatski umanjiti trenutno stanje zalihe za unesenu količinu.
Kada korisnik unese količinu potrošnje koja je jednaka nuli ili manja od nule, tada sistem ne smije dozvoliti evidentiranje i mora prikazati poruku o grešci.
Kada korisnik unese količinu veću od trenutno raspoložive količine na zalihi, tada sistem ne smije dozvoliti evidentiranje potrošnje.
Kada je evidentiranje potrošnje uspješno završeno, korisnik treba dobiti potvrdu sa informacijom o nazivu materijala, unešenoj količini i preostalom stanju zalihe.
Kada repromaterijal nije evidentiran u sistemu, tada sistem ne smije dozvoliti unos potrošnje za taj materijal.
Sistem mora omogućiti evidentiranje datuma unosa i korisnika koji je izvršio unos potrošnje.
Kada stanje zalihe padne ispod minimalno definisane granice, tada sistem treba prikazati upozorenje o niskom stanju zalihe.

## Lab-05 — Pretraga laboratorijske opreme

-Kada korisnik unese puni ili djelimični naziv opreme u polje za pretragu, tada sistem mora prikazati sve stavke koje odgovaraju unesenom pojmu.
-Kada korisnik odabere kategoriju opreme kao kriterij pretrage, tada sistem mora prikazati samo opremu iz odabrane kategorije.
-Kada korisnik koristi više kriterija pretrage istovremeno, tada sistem mora prikazati samo rezultate koji zadovoljavaju sve odabrane kriterije.
-Kada za uneseni pojam ili odabrane kriterije ne postoji nijedan rezultat, tada korisnik treba dobiti poruku da nema pronađene opreme.
-Kada korisnik ostavi polje za pretragu prazno, tada sistem treba prikazati kompletnu listu evidentirane opreme.
-Sistem ne smije prikazivati opremu koja ne odgovara zadanim kriterijima pretrage.
-Sistem mora omogućiti da rezultat pretrage sadrži najmanje naziv opreme, kategoriju i trenutni status opreme.
-Kada korisnik izvrši pretragu, rezultat treba biti prikazan jasno i pregledno kako bi korisnik mogao nastaviti sa pregledom ili rezervacijom opreme.


