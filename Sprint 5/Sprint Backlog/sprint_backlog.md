## Sprint 5 goal
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
