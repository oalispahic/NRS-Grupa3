## Sprint 8 goal
Proširiti sistem administracijskim alatima, korisničkim feedbackom i vizualnim poboljšanjima dashboarda: in-app notifikacije, log aktivnosti, praćenje trenutnog korištenja, ocjenjivanje opreme, tagovi, profil korisnika te interaktivni prikazi stanja opreme.

---

### ID storyja
US-16

### Naziv storyja
In-app notifikacije

**Opis**
Kao korisnik želim primati obavijesti unutar aplikacije kada se promijeni status moje rezervacije

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima omogućava pravovremenu informaciju o odobravanju ili odbijanju rezervacije bez napuštanja aplikacije, čime se smanjuje potreba za ručnom provjerom statusa.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Svaka promjena statusa rezervacije (odobrena/odbijena) automatski kreira notifikaciju.
- Pretpostavka: Korisnik vidi neproučene notifikacije označene crvenom tačkom u navigaciji.
- Otvoreno pitanje: Da li notifikacije imaju rok trajanja ili ostaju trajno?
- Otvoreno pitanje: Da li je potrebna email notifikacija uz in-app?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja rezervacijama (US-7)
- Povezano sa: logom aktivnosti (US-18)

---

### ID storyja
US-17

### Naziv storyja
Trenutno korištenje opreme

**Opis**
Kao administrator želim vidjeti koje su rezervacije trenutno aktivne u realnom vremenu

**Poslovna vrijednost**
Ovaj story je važan jer administratoru pruža trenutni pregled zauzenosti laboratorije bez potrebe za pretraživanjem svih rezervacija, što olakšava operativno upravljanje opremom.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Aktivna rezervacija je svaka odobrena rezervacija čiji termin obuhvata trenutno vrijeme.
- Pretpostavka: Prikaz uključuje ime opreme, korisnika i preostalo vrijeme.
- Otvoreno pitanje: Da li se prikaz osvježava automatski ili samo na zahtjev?
- Otvoreno pitanje: Da li je potrebno prikazivati upozorenje za rezervacije koje uskoro ističu?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja rezervacijama (US-7)
- Povezano sa: logom aktivnosti (US-18)

---

### ID storyja
US-18

### Naziv storyja
Log aktivnosti

**Opis**
Kao administrator želim vidjeti hronološki zapis svih akcija u sistemu

**Poslovna vrijednost**
Ovaj story je važan jer omogućava administratoru praćenje svih relevantnih akcija (prijave, kreiranje i obrada rezervacija), što je neophodno za nadzor, sigurnost i eventualno rješavanje sporova.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sistem automatski bilježi akcije bez intervencije korisnika.
- Pretpostavka: Log prikazuje akciju, korisnika koji je izvršio akciju, entitet i datum.
- Otvoreno pitanje: Da li je potrebna mogućnost filtriranja loga po tipu akcije ili korisniku?
- Otvoreno pitanje: Koliko dugo se čuvaju zapisi u logu?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije (US-9), upravljanja rezervacijama (US-7)
- Povezano sa: trenutnim korištenjem (US-17)

---

### ID storyja
US-19

### Naziv storyja
Ocjenjivanje opreme

**Opis**
Kao korisnik želim ocijeniti opremu nakon što sam je koristio

**Poslovna vrijednost**
Ovaj story je važan jer pruža povratnu informaciju o kvaliteti i stanju opreme, što pomaže administratorima u planiranju servisa i nabavke, a korisnicima u odabiru opreme.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Ocjena je moguća samo za rezervacije s odobrenim statusom čiji je termin završio.
- Pretpostavka: Svaka rezervacija može biti ocijenjena najviše jednom.
- Otvoreno pitanje: Da li se prosječna ocjena prikazuje svim korisnicima ili samo administratorima?
- Otvoreno pitanje: Da li je komentar uz ocjenu obavezan?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: mojih rezervacija (US-5), pregleda opreme (US-1)
- Povezano sa: profilom korisnika (US-20)

---

### ID storyja
US-20

### Naziv storyja
Profil korisnika

**Opis**
Kao korisnik želim pregledati i urediti svoje osobne podatke i sigurnosne postavke

**Poslovna vrijednost**
Ovaj story je važan jer korisnicima daje kontrolu nad vlastitim profilom, što povećava povjerenje u sistem i omogućava personalizaciju (institucija, odsjek, kontakt) korisnu administratorima za komunikaciju.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Korisnik može mijenjati ime, bio, instituciju, odsjek, telefon i stepen obrazovanja.
- Pretpostavka: Promjena lozinke zahtijeva unos trenutne lozinke kao potvrdu.
- Otvoreno pitanje: Da li je potrebna validacija formata broja telefona?
- Otvoreno pitanje: Da li se email adresa može mijenjati ili je fiksna?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije (US-9)
- Povezano sa: logom aktivnosti (US-18)

---

### ID storyja
US-21

### Naziv storyja
Tagovi opreme

**Opis**
Kao administrator želim dodijeliti tagove opremi kako bih je lakše kategorizirao

**Poslovna vrijednost**
Ovaj story je važan jer omogućava fleksibilno obilježavanje opreme po tematskim skupinama (npr. Mikrobiologija, Hemija, Hitno servisiranje), što olakšava pronalaženje i filtriranje relevantne opreme.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Administrator može kreirati tagove s prilagođenom bojom.
- Pretpostavka: Jedan aparat može imati više tagova.
- Otvoreno pitanje: Da li korisnici (ne-admin) mogu filtrirati opremu po tagovima?
- Otvoreno pitanje: Da li brisanje taga uklanja i sve dodjele tog taga?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom (US-3)
- Povezano sa: pretragom opreme (US-12), filtriranjem (US-13)

---

### ID storyja
US-22

### Naziv storyja
Status mozaik opreme

**Opis**
Kao korisnik želim vizualno vidjeti status sve opreme odjednom na dashboardu

**Poslovna vrijednost**
Ovaj story je važan jer administratoru daje brzi vizualni pregled stanja cijelog inventara bez scrollanja kroz listu, što pomaže u brzom uočavanju problema (puno opreme van upotrebe, mnogo rezervacija).

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Svaki kvadratić prikazuje jednu stavku opreme i obojen je prema statusu.
- Pretpostavka: Hover efekt otkriva naziv i lokaciju opreme.
- Otvoreno pitanje: Da li klik na kvadratić vodi na stranicu detalja opreme?
- Otvoreno pitanje: Da li se prikaz prilagođava mobilnim ekranima?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme (US-1)
- Povezano sa: timelineom rezervacija (US-23)

---

### ID storyja
US-23

### Naziv storyja
Timeline nadolazećih rezervacija

**Opis**
Kao korisnik želim vidjeti horizontalni kalendarski pregled odobrenih rezervacija za narednih 7 dana na dashboardu

**Poslovna vrijednost**
Ovaj story je važan jer pruža brzi uvid u zauzetu opremu u narednoj sedmici, što pomaže korisnicima i administratorima u planiranju rada laboratorije bez otvaranja zasebnih stranica.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Prikazuju se samo odobrene rezervacije (ne i one na čekanju).
- Pretpostavka: Prazni dani su vidljivi s diskretnim prikazom.
- Otvoreno pitanje: Da li admin vidi i ime korisnika pored naziva opreme?
- Otvoreno pitanje: Da li se timeline prikazuje i laborantima ili samo adminima?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja rezervacijama (US-7)
- Povezano sa: status mozaikom opreme (US-22)

---
