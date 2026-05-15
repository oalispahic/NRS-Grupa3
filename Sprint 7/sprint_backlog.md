## Sprint 7 goal
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
