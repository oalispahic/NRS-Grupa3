# User Stories
Ovdje se nalaze objašnjenja funkcionalnosti softvera napisana iz perspektive krajnjeg korisnika. User Stories pomažu da se funkcionalnosti ne posmatraju samo kroz to kako aplikacija radi, nego i kroz to ko koristi određenu funkciju i koju vrijednost ona donosi u svakodnevnom radu.


## Sprint 6 goal
Omogućiti osnovni pristup sistemu, pregled laboratorijske opreme i rezervaciju opreme, uz početno upravljanje opremom od strane administratora.
---
### ID storyja
US-1 

### Naziv storyja
Pregled opreme

**Opis**
Kao korisnik želim pregledati svu dostupnu opremu

**Poslovna vrijednost**
Ovaj story je značajan jer korisnicima daje osnovni pregled opreme koja postoji u sistemu. Na taj način se lakše snalaze, brže pronalaze ono što im je potrebno i imaju bolji uvid u raspoložive resurse laboratorije.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sva laboratorijska oprema je evidentirana u sistemu.
- Pretpostavka: Korisnik ima pristup listi opreme nakon ulaska u sistem.
- Otvoreno pitanje: Da li korisnik vidi svu opremu ili samo onu koja je trenutno dostupna?
- Otvoreno pitanje: Da li će pregled opreme sadržavati samo osnovne informacije ili i status svake stavke?

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa: detaljima opreme i rezervacijom opreme
- Zavisi od: evidencije laboratorijske opreme u sistemu

---

### ID storyja
US-2 

### Naziv storyja
Detalji opreme

**Opis**
Kao korisnik želim vidjeti informacije o opremi (status, opis).

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima daje više informacija o pojedinačnoj opremi i olakšava donošenje odluke o njenom korištenju. Na taj način korisnik može bolje procijeniti da li mu određena oprema odgovara i da li je trenutno dostupna.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Svaka stavka opreme u sistemu sadrži osnovne informacije i status.
- Pretpostavka: Korisnik može otvoriti detaljan prikaz odabrane opreme iz liste opreme.
- Otvoreno pitanje: Koje tačno informacije će biti prikazane u detaljima opreme?
- Otvoreno pitanje: Da li detalji opreme uključuju i trenutni status dostupnosti za rezervaciju?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme
- Povezano sa: rezervacijom opreme

---

### ID storyja
US-3 

### Naziv storyja
Rezervacija opreme

**Opis**
Kao korisnik želim moći rezervisati opremu za odgovarajući termin.

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima omogućava da unaprijed organizuju svoj rad i osiguraju korištenje potrebne opreme u željenom terminu. Na taj način se smanjuju nesporazumi, čekanja i problemi oko dostupnosti opreme.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik može vidjeti dostupne termine za odabranu opremu.
- Pretpostavka: Sistem evidentira svaku uspješno kreiranu rezervaciju.
- Otvoreno pitanje: Da li rezervacija mora biti automatski odobrena ili je potrebno dodatno odobrenje?
- Otvoreno pitanje: Može li jedan korisnik imati više aktivnih rezervacija u isto vrijeme?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme i detalja opreme
- Povezano sa: mojim rezervacijama

---

### ID storyja
US-4 

### Naziv storyja
Moje rezervacije

**Opis**
Kao korisnik želim vidjeti podatke o svojim rezervacijama.

**Poslovna vrijednost**
Ovaj story je važan jer korisniku omogućava bolju organizaciju i lakši pregled vlastitih rezervacija. Na taj način korisnik može pratiti koje rezervacije ima, kada su planirane i izbjeći dodatne zabune oko termina.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem čuva podatke o svim rezervacijama korisnika.
- Pretpostavka: Korisnik može pristupiti samo svojim rezervacijama.
- Otvoreno pitanje: Da li korisnik može vidjeti samo aktivne rezervacije ili i prethodne?
- Otvoreno pitanje: Da li korisnik iz ovog prikaza može otkazati ili izmijeniti rezervaciju?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: rezervacije opreme
- Povezano sa: pregledom opreme

---

### ID storyja
US-5 

### Naziv storyja
Upravljanje opremom

**Opis**
Kao administrator želim dodavati i brisati opremu iz inventara.

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava da vodi tačnu evidenciju opreme koja postoji u laboratoriji. Na taj način sistem ostaje ažuran, a korisnici imaju pouzdan pregled resursa koji su im dostupni.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Administrator ima pristup funkcijama za upravljanje inventarom.
- Pretpostavka: Svaka nova stavka opreme mora imati osnovne podatke prije unosa u sistem.
- Otvoreno pitanje: Koji su obavezni podaci pri dodavanju nove opreme?
- Otvoreno pitanje: Da li se obrisana oprema trajno uklanja iz sistema ili se samo označava kao neaktivna?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije korisnika
- Povezano sa: pregledom i detaljima opreme

---

### ID storyja
US-6 

### Naziv storyja
Autentifikacija korisnika

**Opis**
Kao korisnik želim se prijaviti u sistem kako bih pristupio funkcionalnostima.

**Poslovna vrijednost**
Ovaj story je značajan jer omogućava siguran pristup sistemu i zaštitu podataka. Na taj način se osigurava da samo prijavljeni korisnici mogu koristiti funkcionalnosti sistema u skladu sa svojim ovlaštenjima.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik ima prethodno kreiran korisnički nalog u sistemu.
- Pretpostavka: Sistem podržava prijavu pomoću korisničkog imena i lozinke.
- Otvoreno pitanje: Da li sistem treba ograničiti broj neuspjelih pokušaja prijave?
- Otvoreno pitanje: Da li korisnik ostaje prijavljen u sistemu nakon zatvaranja aplikacije?

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa: pregledom opreme
- Povezano sa: rezervacijom opreme
- Povezano sa: upravljanjem opremom

---

## Sprint 7 goal
Cilj sprinta 7 je unaprijediti kontrolu nad korištenjem laboratorijske opreme kroz odobravanje rezervacija, upravljanje statusom opreme, razlikovanje korisničkih uloga i sprječavanje konflikta pri rezervisanju termina.

### ID storyja
US-7 

### Naziv storyja
Odobravanje rezervacija

**Opis**
Kao administrator želim odobravati/odbijati zahtjeve za korištenje opreme.

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava bolju kontrolu nad korištenjem opreme i organizacijom rezervacija.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik može poslati zahtjev za rezervaciju kroz sistem.
- Pretpostavka: Administrator ima pristup svim zahtjevima za rezervaciju.
- Otvoreno pitanje: Da li administrator mora unijeti razlog kada odbije rezervaciju?
- Otvoreno pitanje: Da li korisnik dobija obavijest nakon odobrene ili odbijene rezervacije?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: rezervacije opreme
- Povezano sa: sprječavanjem konflikta rezervacija

---

### ID storyja
US-8 

### Naziv storyja
Status opreme

**Opis**
Kao administrator želim mijenjati statuse i detalje vezane za opremu

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava da održava tačne i ažurne informacije o opremi. Na taj način korisnici mogu imati bolji pregled nad tim da li je određena oprema dostupna, zauzeta ili van upotrebe.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Oprema je već evidentirana u sistemu.
- Pretpostavka: Administrator ima pristup opcijama za izmjenu statusa i detalja opreme.
- Otvoreno pitanje: Koji statusi će biti dostupni u sistemu?
- Otvoreno pitanje: Da li se svaka promjena statusa treba evidentirati u historiji sistema?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom
- Povezano sa: odobravanjem rezervacija

---

### ID storyja
US-9 

### Naziv storyja
Sprječavanje konflikta rezervacija

**Opis**
Kao sistem želim spriječiti preklapanje rezervacija kako bi se izbjegli konflikti

**Poslovna vrijednost**
Ovaj story je važan jer pomaže da ne dođe do preklapanja rezervacija za istu opremu u istom terminu. Na taj način se smanjuju greške, nesporazumi i problemi u organizaciji korištenja opreme.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem čuva podatke o svim postojećim rezervacijama.
- Pretpostavka: Svaka rezervacija ima definisan datum i vremenski termin.
- Otvoreno pitanje: Da li sistem automatski odbija konfliktnu rezervaciju ili samo prikazuje upozorenje?
- Otvoreno pitanje: Da li administrator može ručno odobriti rezervaciju koja se preklapa sa drugom?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: rezervacije opreme
- Povezano sa: odobravanjem rezervacija

---

### ID storyja
US-10 

### Naziv storyja
Autorizacija korisnika

**Opis**
Kao sistem želim razlikovati korisničke uloge kako bih ograničio pristup funkcijama

**Poslovna vrijednost**
Ovaj story je važan jer omogućava da svaki korisnik ima pristup samo onim funkcijama koje su mu namijenjene. Na taj način se povećava sigurnost sistema i jasnije razdvajaju ovlaštenja između korisnika i administratora.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik je prethodno prijavljen u sistem.
- Pretpostavka: U sistemu su definisane korisničke uloge.
- Otvoreno pitanje: Koje korisničke uloge će postojati u sistemu?
- Otvoreno pitanje: Da li sistem treba prikazati poruku kada korisnik pokuša pristupiti funkciji za koju nema ovlaštenje?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije korisnika
- Povezano sa: odobravanjem rezervacija
- Povezano sa: statusom opreme

---


## Sprint 8 goal
Omogućiti korisnicima lakše upravljanje rezervacijama i jednostavnije snalaženje u sistemu kroz pregled zauzeća, pretragu, filtriranje, otkazivanje i izmjenu rezervacija.

### ID storyja
US-11 

### Naziv storyja
Kalendar zauzeća

**Opis**
Kao korisnik želim vidjeti kalendar zauzeća opreme

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima omogućava pregled zauzeća opreme po terminima na jednostavniji i pregledniji način. Na taj način lakše planiraju rezervacije i izbjegavaju preklapanja.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem sadrži podatke o postojećim rezervacijama opreme.
- Pretpostavka: Korisnik može pristupiti prikazu zauzeća za odabranu opremu.
- Otvoreno pitanje: Da li će kalendar prikazivati dnevni, sedmični ili mjesečni pregled?
- Otvoreno pitanje: Da li korisnik može iz kalendara direktno preći na kreiranje rezervacije?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: rezervacije opreme
- Povezano sa: pregledom opreme

---

### ID storyja
US-12 

### Naziv storyja
Pretraga opreme

**Opis**
Kao korisnik želim pretraživati opremu po nazivu

**Poslovna vrijednost**
Ovaj story je značajan jer korisnicima omogućava da brže pronađu opremu koja im je potrebna bez pregledanja cijele liste. Na taj način se štedi vrijeme i olakšava snalaženje u sistemu.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Oprema je evidentirana u sistemu sa osnovnim podacima.
- Pretpostavka: Sistem omogućava unos naziva opreme u polje za pretragu.
- Otvoreno pitanje: Da li pretraga treba podržavati djelimičan unos naziva opreme?
- Otvoreno pitanje: Da li se rezultati pretrage prikazuju odmah tokom unosa ili tek nakon potvrde pretrage?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme
- Povezano sa: filtriranjem opreme

---

### ID storyja
US-13 

### Naziv storyja
Filtriranje opreme

**Opis**
Kao korisnik želim filtrirati opremu po kategoriji ili tipu

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima omogućava da lakše suze prikaz opreme i brže pronađu ono što im je potrebno. Na taj način se olakšava pregled većeg broja stavki i poboljšava korištenje sistema.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Oprema u sistemu ima definisanu kategoriju ili tip.
- Pretpostavka: Sistem podržava izbor jednog ili više filtera.
- Otvoreno pitanje: Da li korisnik može kombinovati više filtera istovremeno?
- Otvoreno pitanje: Da li se filtriranje odnosi samo na listu opreme ili i na rezultate pretrage?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme
- Povezano sa: pretragom opreme

---

### ID storyja
US-14 

### Naziv storyja
Otkazivanje rezervacija

**Opis**
Kao korisnik želim otkazati rezervaciju

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima omogućava da otkažu rezervaciju kada im oprema više nije potrebna. Na taj način se termin može osloboditi za druge korisnike i poboljšava se iskorištenost laboratorijske opreme.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik može pristupiti svojim aktivnim rezervacijama.
- Pretpostavka: Sistem omogućava otkazivanje rezervacije prije početka termina.
- Otvoreno pitanje: Da li korisnik može otkazati rezervaciju u bilo kojem trenutku ili samo do određenog roka?
- Otvoreno pitanje: Da li sistem treba tražiti potvrdu prije konačnog otkazivanja rezervacije?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: mojih rezervacija
- Povezano sa: izmjenom rezervacije

---

### ID storyja
US-15 

### Naziv storyja
Izmjena rezervacije

**Opis**
Kao korisnik želim izmijeniti postojeću rezervaciju

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima omogućava da prilagode postojeću rezervaciju kada dođe do promjene plana ili termina. Na taj način se smanjuje potreba za brisanjem i ponovnim kreiranjem rezervacije, što olakšava korištenje sistema.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik može pristupiti svojim postojećim rezervacijama.
- Pretpostavka: Sistem omogućava izmjenu rezervacije prije početka termina.
- Otvoreno pitanje: Koje podatke korisnik može mijenjati u rezervaciji?
- Otvoreno pitanje: Da li se nakon izmjene rezervacije ponovo provjerava dostupnost termina?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: mojih rezervacija
- Povezano sa: otkazivanjem rezervacija

---


## Sprint 9 goal
Omogućiti bolji administrativni pregled sistema kroz notifikacije, pregled svih rezervacija, praćenje trenutnog korištenja opreme i logovanje aktivnosti.

### ID storyja
US-16 

### Naziv storyja
Notifikacije

**Opis**
Kao administrator želim slati obavijesti o rezervacijama

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava da korisnike na vrijeme obavijesti o bitnim promjenama vezanim za rezervacije. Na taj način se poboljšava komunikacija i smanjuje mogućnost nesporazuma.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem sadrži podatke o korisnicima i njihovim rezervacijama.
- Pretpostavka: Administrator ima mogućnost slanja obavijesti kroz sistem.
- Otvoreno pitanje: Da li se obavijesti šalju svim korisnicima ili samo onima na koje se rezervacija odnosi?
- Otvoreno pitanje: Da li se notifikacije prikazuju unutar sistema ili se šalju i putem e-maila?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: odobravanja rezervacija
- Povezano sa: pregledom svih rezervacija

---

### ID storyja
US-17 

### Naziv storyja
Pregled svih rezervacija

**Opis**
Kao administrator želim vidjeti sve rezervacije u sistemu

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava centralizovan pregled svih rezervacija i bolju kontrolu nad korištenjem opreme. Na taj način se lakše prati zauzeće i organizuje rad u laboratoriji.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem čuva podatke o svim kreiranim rezervacijama.
- Pretpostavka: Administrator ima pristup prikazu svih rezervacija u sistemu.
- Otvoreno pitanje: Da li se rezervacije prikazuju kao lista, tabela ili kalendar?
- Otvoreno pitanje: Da li administrator može filtrirati rezervacije po korisniku, opremi ili datumu?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: rezervacije opreme
- Povezano sa: notifikacijama
- Povezano sa: trenutnim korištenjem

---

### ID storyja
US-18 

### Naziv storyja
Trenutno korištenje

**Opis**
Kao administrator želim vidjeti ko trenutno koristi opremu

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava bolji uvid u trenutno korištenje laboratorijske opreme. Na taj način se lakše prati zauzeće opreme i poboljšava organizacija rada u laboratoriji.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem raspolaže ažurnim podacima o aktivnim rezervacijama i korištenju opreme.
- Pretpostavka: Administrator ima pristup prikazu trenutnog korištenja opreme.
- Otvoreno pitanje: Da li sistem prikazuje samo trenutno aktivne korisnike ili i nedavno korištenje opreme?
- Otvoreno pitanje: Da li administrator može vidjeti vrijeme početka i planirani završetak korištenja opreme?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda svih rezervacija
- Povezano sa: notifikacijama

---

### ID storyja
US-19 

### Naziv storyja
Logovanje aktivnosti

**Opis**
Kao administrator želim vidjeti historiju aktivnosti u sistemu

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava pregled aktivnosti koje su izvršene u sistemu. Na taj način se lakše prati rad korisnika, uočavaju eventualne greške i povećava preglednost rada unutar sistema.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem evidentira važne aktivnosti korisnika i administratora.
- Pretpostavka: Administrator ima pristup prikazu historije aktivnosti.
- Otvoreno pitanje: Koje aktivnosti će se evidentirati u sistemu?
- Otvoreno pitanje: Da li će historija aktivnosti sadržavati i vrijeme izvršenja svake akcije?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije korisnika
- Povezano sa: pregledom svih rezervacija
- Povezano sa: statusom opreme

---


## Sprint 10 goal
Omogućiti bolju kontrolu nad laboratorijskom opremom kroz praćenje potrošnje repromaterijala i definisanje pravila korištenja.

### ID storyja
US-20 

### Naziv storyja
Potrošnja repromaterijala

**Opis**
Kao administrator želim pratiti potrošnju repromaterijala

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava bolji pregled nad korištenjem potrošnog materijala u laboratoriji. Na taj način se lakše prati stanje zaliha i na vrijeme planira nabavka potrebnog materijala.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Repromaterijal je evidentiran u sistemu.
- Pretpostavka: Administrator može unositi ili pratiti količine potrošenog materijala.
- Otvoreno pitanje: Da li se potrošnja unosi ručno ili se automatski povezuje sa korištenjem opreme?
- Otvoreno pitanje: Da li sistem treba upozoriti kada količina nekog materijala padne ispod minimalne granice?

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa: upravljanjem opremom
- Povezano sa: logovanjem aktivnosti

---

### ID storyja
US-21 

### Naziv storyja
Pravila korištenja

**Opis**
Kao administrator želim definisati pravila korištenja opreme

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava da postavi jasna pravila i ograničenja za korištenje laboratorijske opreme. Na taj način se smanjuje mogućnost nepravilnog korištenja opreme i poboljšava organizacija rada u laboratoriji.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Administrator ima mogućnost unosa i izmjene pravila korištenja opreme.
- Pretpostavka: Pravila korištenja mogu biti povezana sa određenom opremom.
- Otvoreno pitanje: Da li svaka stavka opreme ima svoja posebna pravila ili postoje i opšta pravila za sve korisnike?
- Otvoreno pitanje: Da li korisnik mora potvrditi da je pročitao pravila prije korištenja opreme?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom
- Povezano sa: odobravanjem rezervacija
- Povezano sa: statusom opreme

---


## Sprint 11 goal
Omogućiti bolji pregled sistema kroz dashboard, izvještaje i evidenciju održavanja opreme.

### ID storyja
US-22 

### Naziv storyja
Izvještaji

**Opis**
Kao administrator želim generisati izvještaje o korištenju opreme

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava bolji pregled načina korištenja laboratorijske opreme. Na taj način se lakše prate podaci, uočavaju obrasci korištenja i donose bolje odluke o organizaciji rada.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem čuva podatke o korištenju i rezervacijama opreme.
- Pretpostavka: Administrator ima pristup opciji za generisanje izvještaja.
- Otvoreno pitanje: Koje podatke izvještaji treba da sadrže?
- Otvoreno pitanje: Da li se izvještaji prikazuju samo unutar sistema ili ih je moguće i preuzeti?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda svih rezervacija
- Povezano sa: dashboard pregledom
- Povezano sa: logovanjem aktivnosti

---

### ID storyja
US-23 

### Naziv storyja
Održavanje opreme

**Opis**
Kao administrator želim voditi evidenciju o održavanju opreme

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava da prati servisiranje i kvarove laboratorijske opreme. Na taj način se lakše održava tačno stanje opreme i smanjuje mogućnost korištenja neispravnih uređaja.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Oprema je već evidentirana u sistemu.
- Pretpostavka: Administrator može unositi podatke o servisima i kvarovima.
- Otvoreno pitanje: Da li sistem treba čuvati datum svakog servisa i opis kvara?
- Otvoreno pitanje: Da li oprema koja je na održavanju automatski dobija poseban status?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom
- Povezano sa: statusom opreme
- Povezano sa: logovanjem aktivnosti

---

### ID storyja
US-24 

### Naziv storyja
Dashboard pregled

**Opis**
Kao korisnik želim vidjeti pregled sistema na početnoj stranici

**Poslovna vrijednost**
Ovaj story je važan jer korisniku omogućava brz uvid u osnovne informacije o sistemu odmah nakon ulaska. Na taj način se štedi vrijeme i olakšava snalaženje u najvažnijim podacima i funkcijama.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem raspolaže podacima koji se mogu prikazati na početnoj stranici.
- Pretpostavka: Korisnik ima pristup dashboard prikazu nakon prijave u sistem.
- Otvoreno pitanje: Koje informacije će biti prikazane na dashboardu?
- Otvoreno pitanje: Da li će dashboard biti isti za sve korisnike ili prilagođen korisničkoj ulozi?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije korisnika
- Povezano sa: izvještajima
- Povezano sa: pregledom opreme

---


## Sprint 12 goal
Omogućiti dodatne funkcionalnosti sistema kroz prikaz specifikacija opreme, ocjenjivanje nakon korištenja i izvoz podataka.


### ID storyja
US-25 

### Naziv storyja
Specifikacije opreme

**Opis**
Kao administrator želim dodavati slike i specifikacije opreme

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava da unese dodatne informacije o opremi, kao što su slike i tehnički podaci. Na taj način korisnici mogu imati potpuniji pregled opreme prije njenog korištenja.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Oprema je već evidentirana u sistemu.
- Pretpostavka: Administrator ima mogućnost dodavanja i uređivanja specifikacija opreme.
- Otvoreno pitanje: Koje tehničke podatke će biti moguće unositi za opremu?
- Otvoreno pitanje: Da li sistem podržava dodavanje više slika za jednu stavku opreme?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom
- Povezano sa: detaljima opreme

---

### ID storyja
US-26 

### Naziv storyja
Ocjenjivanje opreme

**Opis**
Kao korisnik želim ocjenjivati opremu nakon korištenja

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima omogućava da daju povratnu informaciju o opremi nakon korištenja. Na taj način administrator može imati bolji uvid u iskustva korisnika i eventualne probleme u radu sa opremom.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik može ocijeniti samo opremu koju je prethodno koristio.
- Pretpostavka: Sistem čuva unesene ocjene i povezuje ih sa određenom opremom.
- Otvoreno pitanje: Da li korisnik daje samo brojčanu ocjenu ili može ostaviti i komentar?
- Otvoreno pitanje: Da li su ocjene vidljive svim korisnicima ili samo administratoru?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: mojih rezervacija
- Povezano sa: detaljima opreme
- Povezano sa: logovanjem aktivnosti

---

### ID storyja
US-27 

### Naziv storyja
Export podataka

**Opis**
Kao administrator želim izvoz podataka (PDF/Excel)

**Poslovna vrijednost**
Ovaj story je važan jer administratoru omogućava da podatke iz sistema sačuva i koristi izvan aplikacije. Na taj način se olakšava analiza podataka, dijeljenje informacija i priprema dodatne dokumentacije.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem raspolaže podacima koji se mogu izvesti u odgovarajuće formate.
- Pretpostavka: Administrator ima pristup opciji izvoza podataka.
- Otvoreno pitanje: Koje vrste podataka će biti moguće izvoziti iz sistema?
- Otvoreno pitanje: Da li će biti podržan izvoz samo u PDF i Excel ili i u druge formate?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda svih rezervacija
- Povezano sa: izvještajima
- Povezano sa: logovanjem aktivnosti
