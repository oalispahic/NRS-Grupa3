# Acceptance Criteria

> Napomena: Acceptance kriteriji su formulisani tako da budu jasni, mjerljivi i testabilni.  
> Radi dosljednosti, u kriterijima su korišteni tipični statusi kao što su: **dostupna**, **rezervisana**, **zauzeta**, **van upotrebe**, **na održavanju**, te statusi rezervacije **na čekanju**, **odobrena**, **odbijena** i **otkazana**.

---

## Sprint 6

### US-1 — Pregled opreme

- Kada je korisnik prijavljen u sistem, ako otvori pregled opreme, tada sistem mora prikazati listu sve evidentirane aktivne opreme.
- Kada je oprema prikazana u listi, tada sistem mora za svaku stavku prikazati najmanje naziv opreme i njen trenutni status.
- Kada u sistemu ne postoji nijedna aktivna stavka opreme, tada korisnik treba dobiti poruku da oprema trenutno nije dostupna.
- Sistem ne smije prikazivati obrisanu ili neaktivnu opremu u standardnom korisničkom prikazu.
- Kada korisnik odabere pojedinačnu stavku sa liste, tada sistem mora omogućiti prelazak na detalje opreme.

### US-2 — Detalji opreme

- Kada korisnik iz liste opreme otvori pojedinačnu stavku, tada sistem mora prikazati detaljan pregled odabrane opreme.
- Kada se prikažu detalji opreme, tada sistem mora prikazati najmanje naziv, opis i trenutni status opreme.
- Kada oprema ima dodatne evidentirane podatke, tada sistem treba prikazati i te podatke u detaljima opreme.
- Kada oprema nije dostupna za rezervaciju, tada sistem mora jasno prikazati razlog nedostupnosti kroz status ili odgovarajuću oznaku.
- Sistem ne smije prikazivati detalje nepostojeće ili neaktivne opreme bez odgovarajuće poruke o grešci.

### US-3 — Rezervacija opreme

- Kada je korisnik prijavljen i otvori detalje dostupne opreme, tada sistem mora omogućiti odabir termina za rezervaciju.
- Kada korisnik odabere slobodan termin i potvrdi rezervaciju, tada sistem mora evidentirati zahtjev za rezervaciju sa pripadajućim statusom.
- Kada je rezervacija uspješno kreirana, tada korisnik mora dobiti potvrdu sa informacijama o opremi, datumu, vremenu početka i vremenu završetka.
- Kada korisnik pokuša rezervisati opremu za nevažeći ili već zauzet termin, tada sistem ne smije sačuvati rezervaciju i mora prikazati poruku o grešci.
- Kada korisnik nije prijavljen, tada sistem ne smije dozvoliti kreiranje rezervacije.

### US-4 — Moje rezervacije

- Kada je korisnik prijavljen i otvori prikaz svojih rezervacija, tada sistem mora prikazati samo rezervacije tog korisnika.
- Kada sistem prikaže korisnikove rezervacije, tada za svaku rezervaciju mora prikazati najmanje naziv opreme, datum, termin i status rezervacije.
- Kada korisnik nema nijednu rezervaciju, tada sistem treba prikazati poruku da nema evidentiranih rezervacija.
- Sistem ne smije prikazivati rezervacije drugih korisnika u prikazu „Moje rezervacije“.
- Kada postoje aktivne i prethodne rezervacije, tada sistem treba omogućiti jasan pregled statusa svake rezervacije.

### US-5 — Upravljanje opremom

- Kada je administrator prijavljen, tada sistem mora omogućiti dodavanje nove stavke opreme u inventar.
- Kada administrator unosi novu opremu, tada sistem mora zahtijevati unos obaveznih podataka prije spremanja stavke.
- Kada administrator ispravno unese obavezne podatke i potvrdi unos, tada sistem mora sačuvati novu stavku opreme i prikazati je u inventaru.
- Kada administrator obriše postojeću stavku opreme, tada sistem mora ukloniti tu stavku iz aktivnog prikaza opreme.
- Sistem ne smije dozvoliti korisniku bez administratorskih ovlaštenja pristup funkcijama za dodavanje i brisanje opreme.

### US-6 — Autentifikacija korisnika

- Kada korisnik unese ispravno korisničko ime i lozinku, tada sistem mora omogućiti prijavu i pristup funkcionalnostima u skladu sa ulogom korisnika.
- Kada korisnik unese neispravno korisničko ime ili lozinku, tada sistem ne smije dozvoliti prijavu i mora prikazati poruku o neuspješnoj prijavi.
- Kada korisnik nije prijavljen, tada sistem ne smije dozvoliti pristup zaštićenim funkcionalnostima sistema.
- Kada se korisnik uspješno prijavi, tada sistem mora otvoriti početni prikaz ili dashboard u skladu sa njegovom ulogom.
- Sistem mora omogućiti sigurno odjavljivanje korisnika iz sistema.

---

## Sprint 7

### US-7 — Odobravanje rezervacija

- Kada administrator otvori pregled zahtjeva za rezervaciju, tada sistem mora prikazati sve rezervacije sa statusom „na čekanju“.
- Kada administrator odobri zahtjev za rezervaciju, tada sistem mora promijeniti status rezervacije u „odobrena“.
- Kada administrator odbije zahtjev za rezervaciju, tada sistem mora promijeniti status rezervacije u „odbijena“.
- Kada je status rezervacije promijenjen, tada korisnik mora moći vidjeti novi status u prikazu svojih rezervacija.
- Sistem ne smije dozvoliti korisniku bez administratorskih ovlaštenja odobravanje ili odbijanje rezervacija.

### US-8 — Status opreme

- Kada administrator otvori uređivanje opreme, tada sistem mora omogućiti izmjenu statusa i osnovnih detalja za odabranu opremu.
- Kada administrator promijeni status opreme, tada sistem mora sačuvati novi status i prikazati ga u listi i detaljima opreme.
- Kada je oprema označena kao „van upotrebe“ ili „na održavanju“, tada sistem mora jasno prikazati da oprema nije dostupna za rezervaciju.
- Kada administrator izmijeni detalje opreme, tada izmjene moraju biti vidljive korisnicima pri sljedećem prikazu opreme.
- Sistem ne smije dozvoliti unos nevažećeg ili nedefinisanog statusa opreme.

### US-9 — Sprječavanje konflikta rezervacija

- Kada korisnik ili administrator pokuša kreirati ili odobriti rezervaciju za termin koji se preklapa sa već odobrenom rezervacijom iste opreme, tada sistem ne smije dozvoliti takvu rezervaciju.
- Kada se termin rezervacije vremenski ne preklapa sa postojećim rezervacijama iste opreme, tada sistem mora dozvoliti spremanje ili odobravanje rezervacije.
- Kada dođe do konflikta rezervacija, tada sistem mora prikazati jasnu poruku da je termin već zauzet.
- Sistem mora provjeravati konflikt termina prije konačnog spremanja ili odobravanja rezervacije.
- Sistem ne smije prikazivati zauzet termin kao dostupan za novu rezervaciju.

### US-10 — Autorizacija korisnika

- Kada je korisnik prijavljen u sistem, tada sistem mora odrediti dostupne funkcionalnosti na osnovu korisničke uloge.
- Kada obični korisnik pokuša pristupiti administratorskoj funkciji, tada sistem ne smije dozvoliti pristup i mora prikazati poruku o nedovoljnom ovlaštenju.
- Kada administrator pristupi administratorskim funkcijama, tada sistem mora omogućiti korištenje funkcija u skladu sa dodijeljenom ulogom.
- Sistem ne smije prikazivati opcije za koje prijavljeni korisnik nema ovlaštenje.
- Kada korisnička uloga bude promijenjena u sistemu, tada sistem mora primijeniti nova ovlaštenja pri sljedećoj prijavi ili osvježavanju sesije.

## Sprint 8

### US-11 — Kalendar zauzeća

- Kada korisnik otvori kalendar zauzeća za određenu opremu, tada sistem mora prikazati zauzete termine za tu opremu.
- Kada za odabranu opremu postoje rezervacije, tada sistem mora prikazati datum, vrijeme početka i vrijeme završetka svakog zauzetog termina.
- Kada za odabranu opremu ne postoje rezervacije, tada sistem treba prikazati poruku da nema evidentiranog zauzeća.
- Sistem ne smije prikazivati zauzete termine kao slobodne u kalendaru.
- Kada korisnik pregleda kalendar zauzeća, tada mora moći jasno razlikovati slobodne i zauzete termine.
  
### US-12 — Pretraga opreme

- Kada korisnik unese puni naziv opreme u polje za pretragu, tada sistem mora prikazati odgovarajuću opremu.
- Kada korisnik unese djelimičan naziv opreme, tada sistem mora prikazati sve stavke koje odgovaraju unesenom pojmu.
- Kada za uneseni pojam ne postoji nijedan rezultat, tada sistem treba prikazati poruku da nema pronađene opreme.
- Kada korisnik očisti polje za pretragu, tada sistem mora prikazati kompletnu listu opreme.
- Sistem ne smije prikazivati rezultate koji ne odgovaraju unesenom pojmu pretrage.

### US-13 — Filtriranje opreme
- Kada korisnik odabere kategoriju ili tip opreme kao filter, tada sistem mora prikazati samo opremu koja odgovara odabranom filteru.
- Kada korisnik primijeni više filtera istovremeno, tada sistem mora prikazati samo opremu koja zadovoljava sve odabrane kriterije.
- Kada nijedna stavka ne odgovara odabranim filterima, tada sistem treba prikazati poruku da nema rezultata.
- Kada korisnik ukloni aktivne filtere, tada sistem mora vratiti puni prikaz opreme.
- Sistem ne smije prikazivati stavke koje ne pripadaju odabranim kategorijama ili tipovima.
### US-14 — Otkazivanje rezervacija
- Kada korisnik otvori svoje aktivne rezervacije, tada sistem mora omogućiti otkazivanje rezervacije koja još nije započela.
- Kada korisnik potvrdi otkazivanje rezervacije, tada sistem mora promijeniti status rezervacije u „otkazana“.
- Kada rezervacija bude otkazana, tada oslobođeni termin mora ponovo postati dostupan za rezervaciju.
- Kada korisnik pokuša otkazati rezervaciju koja je već započela ili završena, tada sistem ne smije dozvoliti otkazivanje i mora prikazati odgovarajuću poruku.
- Sistem treba tražiti potvrdu prije konačnog otkazivanja rezervacije.
### US-15 — Izmjena rezervacije
- Kada korisnik otvori svoju postojeću rezervaciju prije početka termina, tada sistem mora omogućiti izmjenu dozvoljenih podataka rezervacije.
- Kada korisnik izmijeni termin rezervacije, tada sistem mora prije spremanja provjeriti dostupnost novog termina.
- Kada novi termin nije dostupan, tada sistem ne smije sačuvati izmjene i mora prikazati poruku o konfliktu termina.
- Kada su izmjene uspješno sačuvane, tada sistem mora ažurirati podatke rezervacije i prikazati potvrdu o uspješnoj izmjeni.
- Kada korisnik pokuša izmijeniti rezervaciju koja je već započela ili završena, tada sistem ne smije dozvoliti izmjenu.


