## Sprint 10 goal
Finalizirati sistem kroz: grafičke izvještaje s PDF eksportom, maintenance task management s dodjeljvanjem korisnicima, ličnu historiju aktivnosti, responsive mobilni dizajn, komparaciju opreme, listu čekanja za zauzetu opremu, QR kodove za fizičko označavanje opreme i pregled nadolazećih servisnih termina — čime se sistem zaokružuje u potpunu, produkcijski zrelu aplikaciju.

---

### ID storyja
US-32

### Naziv storyja
Izvještaji o korištenosti (web + PDF export)

**Opis**
Kao administrator želim generirati grafički izvještaj o korištenosti sistema za odabrani vremenski period i eksportovati ga kao PDF dokument

**Poslovna vrijednost**
Ovaj story je važan jer rukovodstvo zahtijeva periodične izvještaje o korištenosti opreme i aktivnosti korisnika — vizualni web izvještaj s mogućnošću PDF eksporta omogućava lako dijeljenje s nadređenima i arhiviranje bez pristupa sistemu.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Admin bira period (od-do datum) i sistem generira izvještaj za taj raspon.
- Pretpostavka: Izvještaj sadrži: KPI header (ukupno rezervacija, stopa odobrenja, prosječno trajanje, najkorištenija oprema), bar chart top 10 opreme po rezervacijama, line chart trenda rezervacija, tabelarni breakdown po statusima i top 5 korisnika.
- Pretpostavka: PDF eksport koristi `window.print()` s print-optimiziranim CSS-om koji skriva navigaciju.
- Pretpostavka: Backend endpoint `GET /api/reports?from=&to=` vraća agregatne podatke.
- Otvoreno pitanje: Da li je potreban eksport u Excel formatu pored PDF-a?
- Otvoreno pitanje: Da li admin može sačuvati generisane izvještaje u sistemu?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja rezervacijama (US-7), statistika i analitike (US-31)
- Povezano sa: eksportom podataka (US-24)

---

### ID storyja
US-33

### Naziv storyja
Održavanje opreme — task assignment

**Opis**
Kao administrator želim kreirati maintenance zadatke, dodijeliti ih korisnicima s uputama i rokom, te pratiti njihov status izvršenja

**Poslovna vrijednost**
Ovaj story je važan jer servisiranje i preventivno održavanje laboratorijske opreme mora biti sistemski praćeno — neplanirani kvarovi dovode do gubitka eksperimentalnih podataka i zastoja u radu laboratorije. Dodjela taskova konkretnim osobama uspostavlja odgovornost.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Nova tabela `maintenance_tasks` s poljima: equipment_id, assigned_to, title, description, priority (low/medium/high/urgent), status (open/in_progress/completed), due_date.
- Pretpostavka: Admin stranica `/admin/maintenance` prikazuje sve taskove s filterima po statusu, opremi i korisniku.
- Pretpostavka: Korisnik vidi "Moji zadaci" badge u navigaciji i stranicu `/my-tasks` s timeline prikazom.
- Pretpostavka: Korisnik može promijeniti status taska u in_progress ili completed.
- Pretpostavka: Notifikacija se šalje korisniku pri dodjeli novog taska.
- Otvoreno pitanje: Da li admin može priložiti fajlove uz task?
- Otvoreno pitanje: Da li korisnik može ostaviti komentar pri završavanju taska?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom (US-3), upravljanja korisnicima (US-28)
- Povezano sa: notifikacijama (US-16), ličnom historijom aktivnosti (US-34)

---

### ID storyja
US-34

### Naziv storyja
Lična historija aktivnosti

**Opis**
Kao korisnik želim vidjeti timeline svojih akcija u sistemu — kreirane rezervacije, ocjene, izmjene profila, završene maintenance taskove

**Poslovna vrijednost**
Ovaj story je važan jer korisnici trebaju transparentnost o svom korišćenju sistema — lična historija omogućava pregled vlastitih akcija, otkrivanje grešaka i praćenje vlastitog rada u laboratoriji bez kontaktiranja admina.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Nova stranica `/my-activity` dostupna svakom autentificiranom korisniku.
- Pretpostavka: Backend endpoint `GET /api/activity/mine` vraća activity_logs filtrirane po logged-in korisniku.
- Pretpostavka: Timeline dizajn: ikona tipa akcije, opis, timestamp (relativno + apsolutno na hoveru).
- Pretpostavka: Filter po tipu akcije (rezervacije, ocjene, profil, maintenance).
- Otvoreno pitanje: Da li je potrebna paginacija ili infinite scroll?
- Otvoreno pitanje: Da li korisnik može eksportovati svoju historiju?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: logovanja aktivnosti (US-20), autentifikacije (US-9)
- Povezano sa: održavanjem opreme (US-33), "Moje rezervacije" (US-5)

---

### ID storyja
US-35

### Naziv storyja
Responsive/mobilni dizajn

**Opis**
Kao korisnik želim nesmetano koristiti sistem na mobilnom uređaju — bez horizontalnog scrolla, nepristupačnih dugmadi ili izlomljenih layouta

**Poslovna vrijednost**
Ovaj story je važan jer laboratorijsko osoblje često provjerava sistem na mobilnom uređaju (npr. u prostoriji s opremom) — neresponsivan dizajn stvara frustraciju i smanjuje stopu korišćenja sistema.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Hamburger menu u navigaciji za ekrane ≤768px.
- Pretpostavka: Admin tabele dobivaju `overflow-x: auto` za horizontalni scroll ili collapsible detalje.
- Pretpostavka: Touch-friendly tap target minimalno 44px za sva interaktivna dugmad.
- Pretpostavka: Equipment card grid se prilagođava na single-column za mobile.
- Pretpostavka: Modalovi postaju full-screen na mobilnom.
- Otvoreno pitanje: Da li je potrebna posebna mobilna navigacija (bottom tab bar) ili je hamburger dovoljan?
- Otvoreno pitanje: Da li se vrši testiranje na pravim uređajima ili samo browser DevTools?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: svih UI stranica (US-1 do US-34)
- Nema specifičnih backend zavisnosti

---

### ID storyja
US-36

### Naziv storyja
Komparacija opreme

**Opis**
Kao korisnik želim odabrati 2-3 komada opreme i vidjeti njihovu tabelarnu usporedbu po ključnim parametrima

**Poslovna vrijednost**
Ovaj story je važan jer laboratorija često ima više sličnih komada opreme (npr. tri mikroskopa različitih specifikacija) — korisnik bez usporedbe ne zna koji je slobodan, koji ima bolju ocjenu ili koji nema sigurnosnih ograničenja, pa gubi vrijeme na obilaženje stranica jedne po jedne.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Svaka kartica na EquipmentListPage dobiva "+" dugme za dodavanje u komparator (max 3 stavke).
- Pretpostavka: Floating bar na dnu ekrana pokazuje broj odabranih stavki i dugme "Poredi".
- Pretpostavka: Komparacija prikazuje: naziv, model, manufacturer, status (badge), lokacija, prosječna ocjena, tagovi, sigurnosne napomene (da/ne), datum zadnjeg servisa.
- Pretpostavka: Direktan "Rezerviraj" link za svaku opremu unutar komparacije.
- Pretpostavka: Čisto frontend feature — koristi podatke već učitane iz `GET /api/equipment`.
- Otvoreno pitanje: Da li odabir za komparaciju treba biti persistiran u localStorage?
- Otvoreno pitanje: Da li se komparacija otvara u modalu ili zasebnoj stranici?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: pregleda opreme (US-1), detalja opreme (US-2)
- Nema backend zavisnosti

---

### ID storyja
US-37

### Naziv storyja
Lista čekanja — Waitlist

**Opis**
Kao korisnik, kada je oprema zauzeta, želim se staviti na listu čekanja i automatski dobiti notifikaciju kada oprema postane slobodna

**Poslovna vrijednost**
Ovaj story je važan jer korisnik trenutno mora ručno osvježavati stranicu opreme dok ne vidi da je slobodna — waitlist mehanizam eliminiše tu neugodnost i smanjuje broj zahtjeva na server. Korisnici koji su zaista zainteresirani bivaju automatski obavješteni.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Nova tabela `waitlist (id, equipment_id, user_id, created_at)` — migracija 018.
- Pretpostavka: Dugme "Stavi na listu čekanja" vidljivo na EquipmentDetailPage kad je status `reserved`, `in_use` ili `maintenance`.
- Pretpostavka: Backend endpointi: `POST /api/equipment/:id/waitlist`, `DELETE /api/equipment/:id/waitlist`, `GET /api/equipment/:id/waitlist`.
- Pretpostavka: Kada admin promijeni status opreme u `available`, backend automatski šalje notifikacije svim korisnicima na waitlisti za tu opremu.
- Pretpostavka: Korisnik vidi "Na listi čekanja" badge na EquipmentDetailPage i poziciju u redu.
- Otvoreno pitanje: Da li se waitlist automatski čisti kada korisnik kreira rezervaciju za tu opremu?
- Otvoreno pitanje: Da li admin vidi cijelu listu čekanja za svaku opremu?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: detalja opreme (US-2), notifikacija (US-16)
- Povezano sa: rezervacijom opreme (US-3)

---

### ID storyja
US-39

### Naziv storyja
Nadolazeći planirani servisi

**Opis**
Kao administrator želim vidjeti listu opreme čiji planirani servis pada u narednih 30 dana s vizualnim upozorenjem za prekoračene i hitne rokove

**Poslovna vrijednost**
Ovaj story je važan jer administratori moraju proaktivno planirati servisne aktivnosti — bez sistematskog pregleda, planirani servisi se lako propuste, što dovodi do kvara i zastoja u radu laboratorije.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Sekcija se prikazuje na vrhu `/admin/maintenance` stranice ako ima opreme s upcoming servisom.
- Pretpostavka: Colour coding: crveno = prekoračen rok, žuto = ≤7 dana, normalno = ostalo.
- Pretpostavka: Backend endpoint `GET /api/maintenance/upcoming-services?days=30` vraća sortiranu listu.
- Pretpostavka: Klik na stavku vodi na `/equipment/:id`.
- Pretpostavka: Sekcija se skriva ako nema opreme s upcoming servisom u 30 dana.
- Otvoreno pitanje: Da li admin može kreirati maintenance task direktno iz ove sekcije?
- Otvoreno pitanje: Da li se window može proširiti na 60/90 dana?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom (US-3), maintenance modula (US-33)
- Koristi existing `planned_service` polje u tabeli equipment

---

### ID storyja
US-38

### Naziv storyja
QR kod za opremu

**Opis**
Kao administrator želim generirati QR kod za svaki komad opreme koji se može printati i zalijepiti na fizički uređaj, a koji direktno vodi na stranicu te opreme

**Poslovna vrijednost**
Ovaj story je važan jer laboratorijsko osoblje može skenirati QR kod mobilnim telefonom direktno pored opreme i odmah vidjeti status, lokaciju i sigurnosne napomene — bez traženja opreme u sistemu. Smanjuje barijeru pristupa informacijama u fizičkom prostoru laboratorije.

**Prioritet**
Nizak

### Pretpostavke i otvorena pitanja
- Pretpostavka: Na karticama opreme u ManageEquipmentPage pojavljuje se "QR" dugme.
- Pretpostavka: Klik otvara modal s generisanim QR kodom (react-qr-code library — čisto frontend).
- Pretpostavka: QR kodira URL `{APP_URL}/equipment/:id` — javno dostupna stranica.
- Pretpostavka: "Preuzmi PNG" dugme koristi canvas API za download slike.
- Pretpostavka: EquipmentDetailPage već je javno dostupna (ne zahtijeva login za pregled).
- Otvoreno pitanje: Da li QR modal treba sadržavati i naziv opreme za lakšu identifikaciju pri printanju?
- Otvoreno pitanje: Da li je potrebna podrška za batch print svih QR kodova?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom (US-3), detalja opreme (US-2)
- Nema backend zavisnosti

---
