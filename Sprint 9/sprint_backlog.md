## Sprint 9 goal
Proširiti administrativne mogućnosti sistema kroz: eksport podataka, upravljanje zalihama repromaterijala, globalna pravila rezervacija, razloge odbijanja, upravljanje korisnicima, fizičke lokacije opreme, sigurnosne napomene i analitičke grafikone — sve s ciljem podizanja operativne zrelosti laboratorijskog sistema.

---

### ID storyja
US-24

### Naziv storyja
Export podataka (CSV)

**Opis**
Kao administrator želim eksportovati listu rezervacija i opreme u CSV format kako bih mogao analizu podataka vršiti van sistema

**Poslovna vrijednost**
Ovaj story je važan jer administratorima i laborantima omogućava preuzimanje podataka za eksternu analizu (Excel, Google Sheets), izvještavanje rukovodstvu i arhiviranje van sistema — bez potrebe za direktnim pristupom bazi podataka.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: CSV eksport uključuje BOM prefiks (UTF-8 BOM) kako bi Windows Excel ispravno prikazao bosanska slova.
- Pretpostavka: Eksport rezervacija sadrži: ID, oprema, korisnik, period, status, razlog odbijanja.
- Pretpostavka: Eksport opreme sadrži: ID, naziv, model, proizvođač, status, lokacija, tagovi.
- Otvoreno pitanje: Da li se eksportuju sve rezervacije ili samo filtrirane po statusu?
- Otvoreno pitanje: Da li je potreban eksport i za repromaterijal?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja rezervacijama (US-7), upravljanja opremom (US-3)
- Povezano sa: statistikama i analitikom (US-31)

---

### ID storyja
US-25

### Naziv storyja
Inventar repromaterijala

**Opis**
Kao administrator želim pratiti zalihe repromaterijala (hemikalije, pribor, potrošni materijal) s upozorenjima kada zaliha padne ispod praga

**Poslovna vrijednost**
Ovaj story je važan jer laboratorija mora osigurati dostupnost potrošnog materijala za nesmetano odvijanje eksperimenata — sistem upozorenja na nisku zalihu sprečava iznenadne nestašice bez ikakve najave.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Administrator kreira stavke s nazivom, jedinicom (kom/ml/g/l), količinom i pragom upozorenja.
- Pretpostavka: Svaka promjena količine (dodavanje/oduzimanje) bilježi se u log s napomenom i timestampom.
- Pretpostavka: UI jasno označava stavke s količinom ispod praga (žuta ikonica upozorenja).
- Otvoreno pitanje: Da li se repromaterijal može vezati uz konkretnu opremu?
- Otvoreno pitanje: Da li korisnici (ne-admin) imaju read-only pristup zalihi?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije i admin rola (US-9)
- Nema direktne veze s modulom rezervacija

---

### ID storyja
US-26

### Naziv storyja
Pravila korištenja opreme

**Opis**
Kao administrator želim definisati globalna ograničenja za kreiranje rezervacija koja se primjenjuju na sve korisnike sistema

**Poslovna vrijednost**
Ovaj story je važan jer bez centralnih pravila korisnici mogu kreirati predugo ili previše rezervacija, što opterećuje sistem i smanjuje dostupnost opreme za ostale korisnike laboratorije.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Pravila se čuvaju u tabeli `system_settings` kao key-value parovi s opisom.
- Pretpostavka: Primjenjuju se tri pravila: maksimalno trajanje rezervacije, maksimalno unaprijed za booking i maksimalan broj istovremenih aktivnih rezervacija.
- Pretpostavka: Backend primjenjuje pravila pri svakom kreiranju rezervacije, neovisno o frontendu.
- Otvoreno pitanje: Da li se pravila primjenjuju i retroaktivno na već odobrene rezervacije?
- Otvoreno pitanje: Da li je potrebna različita pravila za različite uloge?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: kreiranja rezervacija (US-7)
- Povezano sa: upravljanjem korisnicima (US-28)

---

### ID storyja
US-27

### Naziv storyja
Razlog odbijanja rezervacije

**Opis**
Kao administrator, kada odbijem rezervaciju, želim upisati razlog koji korisnik može vidjeti uz svoju odbijenu rezervaciju

**Poslovna vrijednost**
Ovaj story je važan jer korisnik bez objašnjenja ne zna zašto je zahtjev odbijen, što uzrokuje ponovljene neprihvatljive zahtjeve i nezadovoljstvo. Transparentnost razloga poboljšava komunikaciju i smanjuje nepotrebnu prepisku.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Polje `rejection_reason` je opciono — admin može odbiti bez razloga, ali treba moći upisati.
- Pretpostavka: Razlog se prikazuje u "Moje rezervacije" kao istaknuti okvir pored odbijene rezervacije.
- Pretpostavka: Razlog se uključuje u in-app notifikaciju o odbijanju.
- Otvoreno pitanje: Da li se razlog može naknadno izmijeniti nakon odbijanja?
- Otvoreno pitanje: Da li postoji maksimalna dužina teksta razloga?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja rezervacijama admin strane (US-7)
- Povezano sa: in-app notifikacijama (US-16), "Moje rezervacije" (US-5)

---

### ID storyja
US-28

### Naziv storyja
Upravljanje korisnicima

**Opis**
Kao administrator želim vidjeti sve korisnike sistema i upravljati njihovim nalozima — mijenjati uloge i aktivirati/deaktivirati naloge

**Poslovna vrijednost**
Ovaj story je važan jer administrator mora imati kontrolu nad pristupom sistemu — deaktivacija naloga za napuštene korisnike i promjena uloge pri promjeni radnog mjesta su svakodnevne operativne potrebe laboratorije.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Admin vidi tablicu s: imenom, emailom, ulogom, datumom registracije i statusom (aktivan/deaktiviran).
- Pretpostavka: Admin može promijeniti ulogu (laborant ↔ admin) svim korisnicima osim sebi.
- Pretpostavka: Deaktivirani korisnik dobija 403 grešku pri pokušaju logina.
- Pretpostavka: Admin ne može deaktivirati vlastiti nalog.
- Otvoreno pitanje: Da li deaktivacija otkazuje i aktivne rezervacije tog korisnika?
- Otvoreno pitanje: Da li se može promijeniti i email korisnika?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije (US-9), pravila korištenja (US-26)
- Nema direktne veze s modulom opreme

---

### ID storyja
US-29

### Naziv storyja
Lokacije laboratorije

**Opis**
Kao administrator želim definisati fizičke lokacije/prostorije u laboratoriji i dodijeliti ih opremi kako bi korisnici znali gdje se oprema nalazi

**Poslovna vrijednost**
Ovaj story je važan jer korisnici koji dolaze u laboratoriju moraju znati gdje je smještena oprema koja žele koristiti — bez strukturiranih lokacija dolazi do konfuzije i gubi se vrijedno laboratorijsko vrijeme.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Lokacije su entitet za sebe (naziv + opis) koji admin kreira/mijenja/briše.
- Pretpostavka: Opremi se dodjeljuje lokacija pri kreiranju ili editovanju.
- Pretpostavka: Lokacija je vidljiva na kartici opreme i stranici detalja.
- Pretpostavka: Korisnik može filtrirati opremu po lokaciji na listi opreme.
- Otvoreno pitanje: Što se dešava s opremom ako se lokacija izbriše?
- Otvoreno pitanje: Da li lokacija može imati koordinate ili fotografiju?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom (US-3)
- Povezano sa: pretraživanjem i filtriranjem opreme (US-12, US-13)

---

### ID storyja
US-30

### Naziv storyja
Sigurnosne napomene opreme

**Opis**
Kao administrator želim dodati sigurnosne upute opremi koje korisnik mora potvrditi prije nego što može kreirati rezervaciju

**Poslovna vrijednost**
Ovaj story je važan jer laboratorijska oprema može biti opasna bez odgovarajuće zaštitne opreme ili certifikata — prisilna potvrda čitanja uputa smanjuje rizik od nesreća i pravno štiti laboratoriju.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Admin unosi slobodan tekst sigurnosnih uputa u formi za upravljanje opremom.
- Pretpostavka: Na stranici detalja opreme upute su istaknute žutim informativnim okvirom.
- Pretpostavka: Forma za rezervaciju sadrži obavezni checkbox "Pročitao sam sigurnosne upute" koji blokira slanje rezervacije ako nije označen — ali samo ako su upute postavljene.
- Otvoreno pitanje: Da li se u log bilježi da je korisnik potvrdio čitanje uputa?
- Otvoreno pitanje: Da li je potrebna mogućnost postavljanja PDF dokumenta uz upute?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja opremom (US-3), kreiranja rezervacija (US-7)
- Nema direktnih veza s upravljanjem korisnicima

---

### ID storyja
US-31

### Naziv storyja
Stranica statistika i analitike

**Opis**
Kao administrator želim imati zasebnu stranicu s grafikonima i agregatnim podacima o korištenosti sistema

**Poslovna vrijednost**
Ovaj story je važan jer rukovodstvo laboratorije donosi odluke o nabavci opreme, raspoređivanju resursa i politikama rezervacija na osnovu podataka — bez vizualnih analitičkih alata te odluke se donose nagađanjem.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Stranica sadrži 5 KPI kartica: ukupno opreme, ukupno rezervacija, registrovanih korisnika, prosječno trajanje i stopu odobrenja.
- Pretpostavka: Horizontalni bar chart prikazuje top 7 najrezerviranijih komada opreme.
- Pretpostavka: Pie/donut chart prikazuje distribuciju statusa rezervacija (odobrene/odbijene/otkazane/na čekanju).
- Pretpostavka: Line chart prikazuje trend broja rezervacija po sedmicama za posljednjih 12 sedmica.
- Otvoreno pitanje: Da li se može filtrirati po vremenskom periodu?
- Otvoreno pitanje: Da li je potreban eksport statističkog izvještaja?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: upravljanja rezervacijama (US-7), upravljanja opremom (US-3)
- Povezano sa: eksportom podataka (US-24)

---
