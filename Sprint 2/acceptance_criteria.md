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

## Sprint 9
### US-16 — Notifikacije
- Kada administrator pošalje obavijest vezanu za rezervaciju, tada sistem mora evidentirati i isporučiti obavijest ciljnom korisniku ili ciljnoj grupi korisnika.
- Kada je obavijest uspješno poslana, tada sistem mora prikazati potvrdu o uspješnom slanju.
- Kada administrator odabere rezervaciju ili korisnika kao kontekst obavijesti, tada sistem mora povezati obavijest sa odgovarajućim zapisom.
- Sistem ne smije dozvoliti slanje prazne obavijesti bez sadržaja.
- Sistem ne smije dozvoliti korisniku bez administratorskih ovlaštenja slanje administrativnih obavijesti.
### US-17 — Pregled svih rezervacija
- Kada administrator otvori pregled svih rezervacija, tada sistem mora prikazati sve evidentirane rezervacije u sistemu.
- Kada se prikaže lista rezervacija, tada sistem mora za svaku rezervaciju prikazati najmanje korisnika, opremu, datum, termin i status.
-  Kada administrator primijeni filter po korisniku, opremi, statusu ili datumu, tada sistem mora prikazati samo odgovarajuće rezervacije.
- Kada ne postoji nijedna rezervacija koja odgovara izabranim kriterijima, tada sistem treba prikazati poruku da nema rezultata.
- Sistem ne smije dozvoliti običnom korisniku pristup prikazu svih rezervacija.
### US-18 — Trenutno korištenje
- Kada administrator otvori pregled trenutnog korištenja, tada sistem mora prikazati opremu koja je trenutno u aktivnom terminu korištenja.
- Kada postoji trenutno aktivno korištenje opreme, tada sistem mora prikazati najmanje naziv opreme, korisnika, vrijeme početka i planirano vrijeme završetka.
- Kada nijedna oprema nije trenutno u upotrebi, tada sistem treba prikazati poruku da nema aktivnog korištenja.
- Sistem mora određivati trenutno korištenje na osnovu odobrenih rezervacija i aktuelnog vremena.
- Sistem ne smije prikazivati završene ili buduće rezervacije kao trenutno korištenje.
### US-19 — Logovanje aktivnosti
- Kada korisnik ili administrator izvrši važnu akciju u sistemu, tada sistem mora evidentirati tu aktivnost u historiji aktivnosti.
- Kada se aktivnost evidentira, tada zapis mora sadržavati najmanje vrstu akcije, korisnika i vrijeme izvršenja.
- Kada administrator otvori pregled historije aktivnosti, tada sistem mora prikazati evidentirane zapise hronološki ili prema odabranom filteru.
- Sistem ne smije dozvoliti izmjenu ili brisanje log zapisa običnim korisnicima.
- Kada ne postoji nijedna evidentirana aktivnost, tada sistem treba prikazati poruku da nema dostupnih zapisa.

## Sprint 10
### US-20 — Potrošnja repromaterijala
- Kada administrator unese količinu potrošenog repromaterijala, tada sistem mora evidentirati promjenu i ažurirati trenutno stanje zalihe.
- Kada je unos potrošnje uspješno sačuvan, tada sistem mora prikazati novo stanje zalihe za taj repromaterijal.
- Kada administrator pokuša unijeti negativnu vrijednost ili nulu kao potrošnju, tada sistem ne smije dozvoliti spremanje i mora prikazati poruku o grešci.
- Kada stanje zalihe padne ispod minimalno definisane granice, tada sistem mora prikazati upozorenje o niskom stanju zalihe.
- Sistem mora evidentirati datum i korisnika koji je izvršio unos potrošnje.
### US-21 — Pravila korištenja
- Kada administrator unese pravilo korištenja za opremu, tada sistem mora sačuvati to pravilo i povezati ga sa odgovarajućom opremom ili opštim pravilima.
- Kada korisnik otvori detalje opreme za koju postoje pravila korištenja, tada sistem mora prikazati ta pravila.
- Kada administrator izmijeni postojeće pravilo, tada sistem mora prikazati ažuriranu verziju pravila korisnicima.
- Sistem ne smije dozvoliti spremanje praznog pravila korištenja.
- Kada su pravila povezana sa određenom opremom, tada sistem ne smije prikazivati pravila druge opreme u njenim detaljima.

## Sprint 11
### US-22 — Izvještaji
- Kada administrator odabere generisanje izvještaja o korištenju opreme, tada sistem mora kreirati izvještaj na osnovu postojećih podataka o rezervacijama i korištenju.
- Kada je izvještaj generisan, tada sistem mora prikazati najmanje period, opremu i relevantne podatke o korištenju.
- Kada administrator odabere vremenski raspon ili dodatne filtere, tada sistem mora generisati izvještaj samo za zadane kriterije.
- Kada za zadani period ne postoje podaci, tada sistem treba prikazati poruku da nema podataka za izvještaj.
- Sistem ne smije dozvoliti običnom korisniku pristup administratorskim izvještajima.
### US-23 — Održavanje opreme
- Kada administrator evidentira servis ili kvar opreme, tada sistem mora sačuvati zapis o održavanju za odabranu opremu.
- Kada se evidentira zapis održavanja, tada sistem mora sačuvati najmanje datum i opis događaja.
- Kada je oprema označena kao na održavanju, tada sistem mora jasno prikazati da oprema nije dostupna za rezervaciju.
- Kada administrator pregleda historiju održavanja opreme, tada sistem mora prikazati sve evidentirane zapise za tu opremu.
- Sistem ne smije dozvoliti evidentiranje održavanja za nepostojeću stavku opreme.
### US-24 — Dashboard pregled
- Kada se korisnik uspješno prijavi u sistem, tada sistem mora prikazati početni dashboard.
- Kada se dashboard učita, tada sistem mora prikazati osnovne informacije relevantne za prijavljenog korisnika.
- Kada je prijavljeni korisnik administrator, tada dashboard treba prikazati administratorske informacije i prečice u skladu sa ulogom.
- Kada je prijavljeni korisnik obični korisnik, tada dashboard treba prikazati korisničke informacije i funkcije u skladu sa ulogom.
- Sistem ne smije prikazivati podatke ili funkcije koje nisu dozvoljene za ulogu prijavljenog korisnika.

## Sprint 12
### US-25 — Specifikacije opreme
- Kada administrator otvori uređivanje opreme, tada sistem mora omogućiti unos tehničkih specifikacija i dodavanje slika za odabranu opremu.
- Kada administrator uspješno sačuva specifikacije ili slike, tada sistem mora prikazati te podatke u detaljima opreme.
- Kada oprema ima više dodatih specifikacija, tada sistem mora prikazati sve evidentirane tehničke podatke u preglednom formatu.
- Kada administrator doda sliku opreme, tada sistem mora povezati sliku sa odgovarajućom stavkom opreme.
- Sistem ne smije dozvoliti korisniku bez administratorskih ovlaštenja dodavanje ili izmjenu specifikacija opreme.
### US-26 — Ocjenjivanje opreme
- Kada korisnik završi korištenje opreme kroz prethodno evidentiranu rezervaciju, tada sistem mora omogućiti unos ocjene za tu opremu.
- Kada korisnik uspješno pošalje ocjenu, tada sistem mora sačuvati ocjenu i povezati je sa odgovarajućom opremom i korisnikom.
- Sistem ne smije dozvoliti ocjenjivanje opreme koju korisnik nije prethodno koristio.
- Kada sistem podržava i komentar uz ocjenu, tada sistem mora sačuvati komentar zajedno sa ocjenom.
- Kada oprema ima evidentirane ocjene, tada sistem treba omogućiti prikaz tih ocjena u skladu sa definisanim ovlaštenjima.
### US-27 — Export podataka
- Kada administrator odabere izvoz podataka, tada sistem mora omogućiti generisanje izvoza u podržanom formatu.
- Kada administrator odabere PDF ili Excel format, tada sistem mora kreirati datoteku u tom formatu sa odabranim podacima.
- Kada administrator primijeni filtere prije izvoza, tada sistem mora izvesti samo podatke koji odgovaraju zadanim kriterijima.
- Kada za izvoz ne postoje dostupni podaci, tada sistem treba prikazati poruku da nema podataka za izvoz.
- Sistem ne smije dozvoliti korisniku bez administratorskih ovlaštenja pristup funkciji izvoza podataka.


