# User Stories
Ovdje se nalaze objašnjenja funkcionalnosti softvera napisana iz perspektive krajnjeg korisnika. User Stories pomažu da se funkcionalnosti ne posmatraju samo kroz to kako aplikacija radi, nego i kroz to ko koristi određenu funkciju i koju vrijednost ona donosi u svakodnevnom radu.

# SPRINT 6 
## Sprint goal
Omogućiti osnovni pristup sistemu, pregled laboratorijske opreme i rezervaciju opreme, uz početno upravljanje opremom od strane administratora.

## ID storyja
US-1 

## Naziv storyja
Pregled opreme

## Opis
Kao korisnik, želim pregledati svu dostupnu laboratorijsku opremu, kako bih mogao vidjeti koje su opcije dostupne za korištenje.

## Poslovna vrijednost
Ovaj story je važan jer korisnicima daje osnovni pregled opreme koja postoji u sistemu. Na taj način se lakše snalaze, brže pronalaze ono što im je potrebno i imaju bolji uvid u raspoložive resurse laboratorije.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
- Pretpostavka: Sva laboratorijska oprema je evidentirana u sistemu.
- Pretpostavka: Korisnik ima pristup listi opreme nakon ulaska u sistem.
- Otvoreno pitanje: Da li korisnik vidi svu opremu ili samo onu koja je trenutno dostupna?
- Otvoreno pitanje: Da li će pregled opreme sadržavati samo osnovne informacije ili i status svake stavke?

## Veze sa drugim storyjima ili zavisnostima
- Povezano sa: detaljima opreme i rezervacijom opreme
- Zavisi od: evidencije laboratorijske opreme u sistemu


## ID storyja
US-2 

## Naziv storyja
Detalji opreme

## Opis
Kao korisnik, želim vidjeti detaljne informacije o opremi, kako bih imao jasniji uvid u njen status i osnovne podatke prije korištenja ili rezervacije.

## Poslovna vrijednost
Ovaj story je važan jer korisnicima daje više informacija o pojedinačnoj opremi i olakšava donošenje odluke o njenom korištenju. Na taj način korisnik može bolje procijeniti da li mu određena oprema odgovara i da li je trenutno dostupna.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
- Pretpostavka: Svaka stavka opreme u sistemu sadrži osnovne informacije i status.
- Pretpostavka: Korisnik može otvoriti detaljan prikaz odabrane opreme iz liste opreme.
- Otvoreno pitanje: Koje tačno informacije će biti prikazane u detaljima opreme?
- Otvoreno pitanje: Da li detalji opreme uključuju i trenutni status dostupnosti za rezervaciju?

## Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme
- Povezano sa: rezervacijom opreme


## ID storyja
US-3 

## Naziv storyja
Rezervacija opreme

## Opis
Kao korisnik, želim rezervisati opremu za odgovarajući termin, kako bih mogla planirati korištenje opreme bez preklapanja sa drugim korisnicima.

## Poslovna vrijednost
Ovaj story je važan jer korisnicima omogućava da unaprijed organizuju svoj rad i osiguraju korištenje potrebne opreme u željenom terminu. Na taj način se smanjuju nesporazumi, čekanja i problemi oko dostupnosti opreme.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik može vidjeti dostupne termine za odabranu opremu.
- Pretpostavka: Sistem evidentira svaku uspješno kreiranu rezervaciju.
- Otvoreno pitanje: Da li rezervacija mora biti automatski odobrena ili je potrebno dodatno odobrenje?
- Otvoreno pitanje: Može li jedan korisnik imati više aktivnih rezervacija u isto vrijeme?

## Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme i detalja opreme
- Povezano sa: mojim rezervacijama


## ID storyja
US-4 

## Naziv storyja
Moje rezervacije

## Opis
Kao korisnik, želim vidjeti podatke o svojim rezervacijama, kako bih mogao imati pregled aktivnih i prethodnih rezervacija.

## Poslovna vrijednost
Ovaj story je važan jer korisniku omogućava bolju organizaciju i lakši pregled vlastitih rezervacija. Na taj način korisnik može pratiti koje rezervacije ima, kada su planirane i izbjeći dodatne zabune oko termina.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem čuva podatke o svim rezervacijama korisnika.
- Pretpostavka: Korisnik može pristupiti samo svojim rezervacijama.
- Otvoreno pitanje: Da li korisnik može vidjeti samo aktivne rezervacije ili i prethodne?
- Otvoreno pitanje: Da li korisnik iz ovog prikaza može otkazati ili izmijeniti rezervaciju?

## Veze sa drugim storyjima ili zavisnostima
- Zavisi od: rezervacije opreme
- Povezano sa: pregledom opreme


## ID storyja
US-5 

## Naziv storyja
Upravljanje opremom

## Opis
Kao administrator, želim dodavati i brisati opremu iz inventara, kako bih imao ažuriran i tačan pregled laboratorijske opreme u sistemu.

## Poslovna vrijednost
Ovaj story je važan jer administratoru omogućava da vodi tačnu evidenciju opreme koja postoji u laboratoriji. Na taj način sistem ostaje ažuran, a korisnici imaju pouzdan pregled resursa koji su im dostupni.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
- Pretpostavka: Administrator ima pristup funkcijama za upravljanje inventarom.
- Pretpostavka: Svaka nova stavka opreme mora imati osnovne podatke prije unosa u sistem.
- Otvoreno pitanje: Koji su obavezni podaci pri dodavanju nove opreme?
- Otvoreno pitanje: Da li se obrisana oprema trajno uklanja iz sistema ili se samo označava kao neaktivna?

## Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije korisnika
- Povezano sa: pregledom i detaljima opreme


## ID storyja
US-6 

## Naziv storyja
Autentifikacija korisnika

## Opis
Kao korisnik, želim se prijaviti u sistem, kako bih mogao pristupiti funkcionalnostima koje su mi dostupne.

## Poslovna vrijednost
Ovaj story je značajan jer omogućava siguran pristup sistemu i zaštitu podataka. Na taj način se osigurava da samo prijavljeni korisnici mogu koristiti funkcionalnosti sistema u skladu sa svojim ovlaštenjima.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik ima prethodno kreiran korisnički nalog u sistemu.
- Pretpostavka: Sistem podržava prijavu pomoću korisničkog imena i lozinke.
- Otvoreno pitanje: Da li sistem treba ograničiti broj neuspjelih pokušaja prijave?
- Otvoreno pitanje: Da li korisnik ostaje prijavljen u sistemu nakon zatvaranja aplikacije?

## Veze sa drugim storyjima ili zavisnostima
- Povezano sa: pregledom opreme
- Povezano sa: rezervacijom opreme
- Povezano sa: upravljanjem opremom
