# Test Strategy

## 1. Cilj testiranja 
Glavni cilj testiranja je da sistem bude pouzdan, siguran i funkcionalan u svakodnevnom radu laboratorije. Važno je spriječiti probleme kao što su duple rezervacije, neovlašten pristup administratorskim funkcijama i netačno evidentiranje aktivnosti u sistemu. Testiranjem želimo na vrijeme uočiti greške i potvrditi da sistem radi u skladu sa definisanim zahtjevima.

---

## 2. Nivoi testiranja 
- **Unit testiranje**
  
   Ovaj nivo testiranja koristi se za provjeru pojedinačnih dijelova sistema, odnosno funkcija i logike unutar aplikacije.

- **Integraciono testiranje**
  
   Na ovom nivou provjerava se da li različiti dijelovi sistema ispravno rade zajedno, na primjer aplikacija, baza podataka i API.

- **Sistemsko testiranje**
  
   Sistemsko testiranje obuhvata provjeru kompletnog sistema kao cjeline, odnosno rada svih glavnih funkcionalnosti zajedno.

- **Prihvatno testiranje**
  
   Ovaj nivo testiranja služi da se provjeri da li sistem ispunjava očekivanja korisnika i acceptance kriterije definisane za user storyje.



---

## 3. Šta se testira u kojem nivou
Na nivou unit testiranja pažnja je usmjerena na pojedinačne dijelove sistema. Tu se provjerava da li osnovne funkcije rade ispravno same za sebe, bez uticaja drugih dijelova aplikacije. To uključuje prijavu korisnika, provjeru korisničkih uloga, validaciju rezervacija, kao i funkcije za pretragu i filtriranje opreme.

Kod integracionog testiranja fokus je na tome da različiti dijelovi sistema pravilno sarađuju. Ovdje je važno provjeriti da li se podaci ispravno prenose između aplikacije, baze podataka i ostalih dijelova sistema. Na ovom nivou testiraju se tokovi kao što su rezervacija opreme, odobravanje rezervacija, promjena statusa opreme i razmjena podataka između korisničkog interfejsa i baze.

Sistemsko testiranje obuhvata rad sistema kao cjeline. Tu se provjerava kako sve glavne funkcionalnosti rade zajedno u realnim uslovima korištenja. Posebna pažnja se posvećuje funkcijama kao što su pregled opreme, rezervacije, kalendar zauzeća, notifikacije i upravljanje opremom, kako bi se potvrdilo da sistem kao cjelina radi stabilno i logično.

Na kraju, kroz prihvatno testiranje provjerava se da li su funkcionalnosti sistema usklađene sa acceptance kriterijima definisanim za user storyje. Cilj ovog nivoa testiranja je potvrditi da sistem ispunjava ono što je planirano i da su funkcionalnosti spremne za korištenje iz ugla krajnjeg korisnika.


---

## 4. Veza sa acceptance kriterijima
Acceptance kriteriji predstavljaju direktnu osnovu za testiranje funkcionalnosti sistema, jer jasno definišu šta sistem treba uraditi u određenim situacijama i koji rezultat se očekuje. Na osnovu njih se za svaki user story može provjeriti da li je funkcionalnost ispravno implementirana, odnosno da li sistem reaguje onako kako je planirano. Na taj način postoji jasna veza između zahtjeva, user storyja i samog procesa testiranja.

U praksi to znači da se svaki acceptance kriterij može posmatrati kao uslov koji treba potvrditi kroz testiranje. Ako sistem ispuni definisane kriterije, funkcionalnost se može smatrati prihvaćenom, a ako ih ne ispuni, potrebno je izvršiti dorade prije nego što se funkcionalnost smatra završenom. Ovakav pristup omogućava da testiranje bude jasnije, mjerljivije i direktno povezano sa onim što je unaprijed definisano u dokumentaciji.

---

## 5. Način evidentiranja rezultata testiranja
Rezultati testiranja evidentiraju se kroz provjeru user storyja i pripadajućih acceptance kriterija, tako da se za svaku funkcionalnost može jasno utvrditi da li je ispunila očekivano ponašanje sistema. Za svaki test potrebno je zabilježiti koji user story i koji acceptance kriterij se provjerava, koji je očekivani rezultat, šta je stvarno dobijeno i da li je test uspješno prošao ili nije. Na taj način se može pratiti koje funkcionalnosti su spremne, a koje zahtijevaju doradu ili ponovno testiranje.

---

## 6. Glavni rizici kvaliteta 
Glavni rizici kvaliteta u ovom sistemu odnose se na mogućnost duplih rezervacija, odnosno preklapanja termina za istu opremu, jer bi to direktno uticalo na organizaciju rada i dostupnost laboratorijskih resursa. Pored toga, važan rizik predstavlja i neispravno upravljanje dozvolama pristupa, odnosno situacija u kojoj bi korisnik bez odgovarajućih ovlaštenja mogao pristupiti administratorskim funkcijama ili mijenjati važne podatke u sistemu.

Dodatni rizici kvaliteta odnose se na mogući pad sistema i probleme sa oporavkom podataka, kao i na netačno evidentiranje stanja zaliha repromaterijala. Ako sistem ne prikazuje stvarno stanje zaliha ili ne evidentira promjene ispravno, to može dovesti do problema u svakodnevnom radu laboratorije. Zbog toga je posebno važno obratiti pažnju na tačnost rezervacija, sigurnost pristupa, pouzdanost sistema i ispravno vođenje podataka o potrošnji materijala.
