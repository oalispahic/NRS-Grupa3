## Sprint 6 goal
Cilj sprinta 6 je unaprijediti kontrolu nad korištenjem laboratorijske opreme kroz odobravanje rezervacija, upravljanje statusom opreme, razlikovanje korisničkih uloga i sprječavanje konflikta pri rezervisanju termina.

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

### ID storyja
US-28

### Naziv storyja
Registracija korisnika

**Opis**  
Kao korisnik želim kreirati nalog u sistemu kako bih mogao pristupiti funkcionalnostima.

**Poslovna vrijednost**  
Omogućava novim korisnicima da se uključe u sistem na standardizovan i siguran način, što povećava broj aktivnih korisnika i omogućava praćenje aktivnosti.

**Prioritet**  
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Registracija zahtijeva minimalne podatke (ime, email/korisničko ime, lozinka).
- Pretpostavka: Sistem validira jedinstvenost emaila/korisničkog imena i jačinu lozinke.
- Pretpostavka: Nakon registracije se dodjeljuje podrazumijevana uloga „korisnik“.
- Otvoreno pitanje: Da li je potrebna verifikacija emaila prije prve prijave?
- Otvoreno pitanje: Da li je potrebna administratorska potvrda registracije?
- Otvoreno pitanje: Da li se koristi CAPTCHA/anti-bot zaštita?

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa: autentifikacijom korisnika
- Zavisi od: modela korisnika i pravila validacije lozinki

Komentari iz proslog sprinta:

- Dodati vise detalja za opremu.
- Funkcijonalnost "Dostupnost" ne ispunjava svoju svrhu u trenutnoj izvedbi te se treba reimplementirati.

