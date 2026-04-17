# Domain Model – Sistem za upravljanje medicinskom laboratorijskom opremom

Domain model predstavlja centralnu tačku razumijevanja sistema, jer kroz njega definišemo sve važne objekte, njihova svojstva i načine na koji su ti objekti međusobno povezani. Nije to samo tehnička dokumentacija – domain model je zapravo konceptualna "mapa" cijelog poslovnog problema koji pokušavamo riješiti softverskim rješenjem. Bez jasno definisanog domain modela, razvoj softvera postaje kaotičan, jer programeri i analitičari nemaju zajednički jezik kojim opisuju problem.

U kontekstu upravljanja medicinskom laboratorijskom opremom, ova mapa je posebno važna. Medicinska laboratorija nije kao običan ured – radi se o okruženju u kojem preciznost, sljedivost i sigurnost podataka nisu samo poželjne osobine, nego i zakonska obaveza. Svaki instrument mora biti pravilno evidentiran, svaka rezervacija mora biti transparentna, a svaka aktivnost korisnika mora ostaviti digitalni trag koji se kasnije može provjeriti i analizirati. Upravo iz tih razloga, domain model je direktno izveden iz zahtjeva definisanih u **[Product Backlogu](https://github.com/oalispahic/NRS-Grupa3/blob/main/Sprint%202/product_backlog_v2.md)**, sa posebnim fokusom na integritet podataka i pouzdanost u medicinskom laboratorijskom okruženju.

U nastavku su detaljno opisani svi ključni entiteti sistema, njihovi atributi, međusobne veze i poslovna pravila koja upravljaju njihovim ponašanjem.

---

## Glavni entiteti (Domain Entities)

Na osnovu temeljite analize funkcionalnih i nefunkcionalnih zahtjeva laboratorije, te kroz razgovore sa potencijalnim korisnicima sistema (laborantima i šefovima laboratorija), identifikovani su sljedeći osnovni entiteti koji čine srž domene:

### 1. Korisnik (User)

Korisnik je centralni entitet za upravljanje pristupom cijelom sistemu. Svaka osoba koja na bilo koji način stupa u interakciju sa sistemom mora biti evidentirana kao korisnik. Entitet Korisnik obuhvata dvije ključne kategorije korisnika: **laborante**, koji su primarni korisnici sistema i svakodnevno koriste opremu u laboratoriji, te **administratore** (šefove laboratorije), koji imaju proširena ovlaštenja i odgovorni su za nadzor cjelokupnog rada laboratorije.

Razlikovanje korisničkih uloga nije samo tehničko pitanje – radi se o suštinskom poslovnom zahtjevu koji osigurava da svako može raditi samo ono za šta je ovlašten. Laborant može da kreira rezervacije i evidentira potrošnju materijala, ali nema pravo mijenjati statuse opreme ili pristupati dnevniku aktivnosti. Administrator, s druge strane, ima puni uvid u rad sistema i može odobriti ili odbiti zahtjeve za rezervacijom, kao i pokrenuti servisne procedure za opremu koja je u kvaru.

### 2. Medicinska Oprema (Equipment)

Entitet Medicinska Oprema predstavlja sve fizičke resurse laboratorije koji se evidentiraju i kojima se upravlja kroz sistem. To uključuje analizatore, mikroskope, centrifuge, spektrofotometre, i svaku drugu laboratorijsku aparaturu koja podliježe procesu rezervacije i servisiranja.

Svaki komad opreme u sistemu mora biti jednoznačno identifikovan, što se postiže kombinacijom serijskog broja i internog identifikatora. Pored identifikacije, sistem prati i trenutni operativni status svake jedinice opreme – da li je dostupna za korištenje, da li je u servisu, ili je možda privremeno van upotrebe zbog planiranog pregleda. Ovaj status direktno utiče na mogućnost kreiranja rezervacija, čime se osigurava da laboranti ne mogu zakazati aparaturu koja objektivno nije dostupna.

### 3. Rezervacija (Reservation)

Rezervacija je ključni procesni entitet koji definiše zauzeće određenog komada opreme u tačno određenom vremenskom periodu. Svaka rezervacija bilježi ko je napravio zahtjev, za koju opremu, u kom vremenskom intervalu i koji je trenutni status tog zahtjeva.

Kroz entitet Rezervacija sistem implementira jedan od najvažnijih poslovnih zahtjeva – spriječavanje sukoba termina. Sistem ne može dozvoliti da dva laboranta istovremeno rezervišu isti aparat za isti period, jer bi to dovelo do fizičkog konflikta u laboratoriji i potencijalno ugrozilo kvalitet laboratorijskih analiza. Upravo zato je validacija termina implementirana na nivou domain logike, a ne samo na nivou korisničkog interfejsa.

### 4. Repromaterijal / Zalihe (Inventory / Supplies)

Entitet Repromaterijal prati sve potrošne resurse koji se koriste u radu sa laboratorijskom opremom. Laboratorijski reagensi, jednokratni pribor, potrošni dijelovi – sve to mora biti evidentirano kako bi laboratorija mogla planirati nabavku i izbjeći situaciju u kojoj se rad mora zaustaviti zbog nedostatka materijala.

Ovo je posebno kritično u medicinskim laboratorijama, gdje nedostatak određenog reagensa može direktno uticati na mogućnost provođenja dijagnostičkih pretraga. Sistem stoga prati ne samo trenutnu količinu zaliha, nego i minimalni prag ispod kojeg te zalihe ne smiju pasti bez pokretanja upozorenja.

### 5. Dnevnik Aktivnosti (Audit Log)

Dnevnik Aktivnosti je digitalni trag svih kritičnih radnji koje se izvode unutar sistema. Svaki put kada korisnik napravi neku značajnu izmjenu – odobri rezervaciju, promijeni status opreme, obriše zapis ili izvrši bilo koju drugu akciju koja utiče na podatke sistema – ta akcija se automatski evidentira u dnevniku.

Ovaj entitet nije namijenjen svakodnevnom korištenju od strane laboranata – njime pristupa isključivo administrator kada treba provjeriti ko je i kada napravio određenu promjenu. U medicinskim okruženjima, ovakva sljedivost podataka nije luksuz, nego neophodnost. Ukoliko se naknadno utvrdi greška ili nepravilnost, administrator mora biti u stanju rekonstruisati tačan slijed događaja.

### 6. Servisni Karton (Maintenance Record)

Servisni Karton je entitet koji bilježi kompletnu historiju kvarova, servisa i održavanja svakog komada opreme. Svaki put kada se aparat pošalje na servis, taj događaj se evidentira zajedno sa opisom kvara, datumom servisa, imenom tehničara koji je obavio popravku i troškovima koji su nastali.

Servisni karton nije samo administrativna evidencija – on je i alat za donošenje poslovnih odluka. Na osnovu historije servisa, administrator može procijeniti da li je određeni aparat pouzdan ili je možda ekonomičnije uložiti u nabavku novog. Redovni servisi i kalibracije instrumenata su u laboratorijama obavezni po standardima kvaliteta, pa sistem mora moći podsjetiti na predstojeće servisne termine.

---

## Ključni atributi

U tabeli ispod su navedeni najvažniji podaci koje svaki entitet mora čuvati u sistemu, kao i tipovi tih podataka koji određuju način pohrane u bazi podataka:

| Entitet | Ključni atributi |
| --- | --- |
| **Korisnik** | korisnicko\_ime, lozinka\_hash, uloga (Admin/Laborant), email, datum\_kreiranja, ime, prezime, kontakt\_broj |
| **Oprema** | serijski\_broj, naziv, model, trenutni\_status (Dostupno/Servis/Van upotrebe), lokacija, datum\_nabavke, naziv\_proizvodjaca |
| **Rezervacija** | vrijeme\_pocetka, vrijeme\_kraja, status\_zahtjeva (Na čekanju/Odobreno/Odbijeno/Otkazano), id\_korisnika, id\_opreme, napomena, datum\_kreiranja |
| **Repromaterijal** | naziv\_materijala, kolicina\_na\_stanju, mjerna\_jedinica, minimalni\_prag\_zaliha, dobavljac, datum\_zadnje\_nabavke |
| **Dnevnik Aktivnosti** | vrijeme\_akcije, opis\_promjene, id\_korisnika, ip\_adresa, naziv\_entiteta, stara\_vrijednost, nova\_vrijednost |
| **Servisni Karton** | datum\_servisa, opis\_kvara, cijena\_popravke, tehnicar\_info, datum\_sljedeceg\_servisa, tip\_servisa (Hitni/Planirani) |

### Detaljan opis odabranih atributa

Nekoliko atributa zaslužuje posebno pojašnjenje zbog njihove uloge u poslovnoj logici sistema:

**lozinka\_hash** – Lozinke korisnika se nikada ne pohranjuju u izvornom obliku. Umjesto toga, sistem pohrani samo kriptografski sažetak (hash) lozinke, što znači da ni administrator sistema ne može saznati pravu lozinku korisnika. Ovo je standardna sigurnosna praksa u svim modernim aplikacijama.

**trenutni\_status** – Status opreme nije prost tekst, nego enum vrijednost s tačno definisanim skupom mogućih stanja. To znači da sistem ne može prihvatiti nevalidan status poput "u popravci" ili "slobodno" – jedino što je dozvoljeno je "Dostupno", "Servis" ili "Van upotrebe". Ovime se eliminiše mogućnost grešaka prouzrokovanih slobodnim unosom teksta.

**stara\_vrijednost / nova\_vrijednost** – Ova dva atributa u Dnevniku Aktivnosti omogućavaju tzv. "before/after" snimak svake promjene. Ako administrator želi vidjeti šta je tačno promijenjeno na nekoj rezervaciji, sistem može prikazati stanje before (npr. status = "Na čekanju") i after (npr. status = "Odobreno"), zajedno sa informacijom ko je tu promjenu napravio i kada.

**datum\_sljedeceg\_servisa** – Ovaj atribut u Servisnom Kartonu omogućava proaktivno upravljanje održavanjem. Sistem može automatski upozoriti administratora kada se datum sljedećeg servisa bliži, čime se sprečavaju situacije u kojima se obavezna kalibracija propusti zbog zaborava.

---

## Veze između entiteta

Logička povezanost sistema definisana je sljedećim relacijama, od kojih svaka nosi određeno poslovno značenje:

### Korisnik – Rezervacija (1:N)

Jedan laborant može kreirati neograničen broj rezervacija tokom svog rada u laboratoriji. Međutim, svaka pojedinačna rezervacija u sistemu pripada isključivo jednom korisniku – onome ko ju je kreirao. Ovo je osnovna relacija koja osigurava sljedivost: uvijek je jasno ko je i kada zatražio određenu aparaturu.

Ova relacija ima i praktičnu implikaciju za korisničko iskustvo: laborant koji se prijavi u sistem može odmah vidjeti pregled svih svojih aktivnih i prošlih rezervacija, bez da mora pretraživati kroz podatke ostalih korisnika.

### Oprema – Rezervacija (1:N)

Jedan instrument može biti predmet mnogih rezervacija u različitim terminima. Analizator krvi koji se koristi svakodnevno može imati desine ili stotine rezervacija evidentiranih u sistemu tokom vremena. Međutim, jedna konkretna rezervacija odnosi se isključivo na jedan komad opreme – ne može se jednom rezervacijom zakazati više aparata istovremeno.

Ova relacija je ključna za implementaciju provjere dostupnosti. Kada laborant pokuša kreirati novu rezervaciju za određeni aparat, sistem mora pregledati sve postojeće rezervacije tog aparata u traženom vremenskom intervalu i provjeriti da li postoji preklapanje.

### Oprema – Servisni Karton (1:N)

Svaki komad opreme ima svoju historiju servisa. Tokom životnog vijeka jednog aparata, može biti zabilježeno više servisnih intervencija – od redovnih godišnjih kalibracija do hitnih popravki uslijed kvara. Ova relacija omogućava uvid u pouzdanost uređaja kroz duže vremensko razdoblje i pomaže administratoru da donese informisane odluke o upravljanju opremom.

### Korisnik – Dnevnik Aktivnosti (1:N)

Svaka kritična akcija u sistemu – brisanje opreme, odobravanje termina, promjena korisničke uloge – vezana je za ID korisnika koji je tu akciju izvršio. Jedan korisnik može biti autor mnogih zapisa u dnevniku, a svaki zapis pripada tačno jednom korisniku. Ova relacija osigurava puni audit trail sistema.

### Oprema – Repromaterijal (N:M)

Ovo je jedina relacija tipa više-prema-više (N:M) u sistemu. Jedan medicinski uređaj može trošiti više vrsta potrošnog materijala – na primjer, hematološki analizator koristi i reagense za lizu eritrocita i reagense za bojenje, kao i jednokratne kuvete. S druge strane, određene vrste materijala mogu se koristiti na više različitih uređaja. Ova relacija se u bazi podataka implementira kroz posredničku tabelu koja bilježi i količinu materijala koja se tipično troši po jednoj upotrebi aparata.

---

## Poslovna pravila važna za domain model

Poslovna pravila su srž domain logike – ona definišu šta sistem smije, a šta ne smije da uradi, bez obzira na to ko pokušava pokrenuti određenu akciju. Ova pravila direktno su vezana za zahtjeve iz Product Backloga, naročito **PB26** (validacija termina) i **PB22** (upravljanje zalihama):

### Pravilo 1: Validacija termina rezervacije

Sistem ne smije dozvoliti kreiranje nove rezervacije ako se `vrijeme_pocetka` ili `vrijeme_kraja` preklapa sa već postojećom odobrenom rezervacijom za tu istu opremu. Provjera mora biti sveobuhvatna i pokriti sve scenarije preklapanja: nova rezervacija počinje unutar postojeće, nova rezervacija završava unutar postojeće, nova rezervacija u potpunosti obuhvata postojeću, i slično.

Kršenje ovog pravila neprihvatljivo je s poslovnog aspekta jer direktno uzrokuje fizički konflikt u laboratoriji – dva laboranta ne mogu koristiti isti aparat u isto vrijeme.

### Pravilo 2: Dostupnost opreme kao preduvjet rezervacije

Rezervacija se može kreirati samo ako je status odabrane opreme postavljen na **"Dostupno"**. Ako je oprema u statusu **"Servis"** ili **"Van upotrebe"**, ona se automatski izuzima iz procesa rezervacije i laborant ne može ni pokušati da je rezerviše. System bi trebao prikazati jasnu poruku o razlogu nedostupnosti.

Ovo pravilo štiti laborante od kreiranja rezervacija za aparaturu koja objektivno nije u stanju rada, čime se sprečavaju situacije u kojima laborant dođe do aparata i tek tada sazna da nije funkcionalan.

### Pravilo 3: Automatsko upozorenje o minimalnim zalihama

Svaki put kada se evidentira potrošnja određenog repromaterijala, sistem mora automatski provjeriti da li je preostala količina pale ispod definisanog minimalnog praga (`minimalni_prag_zaliha`). Ako jeste, taj materijal se automatski označava kao prioritet za nabavku, a administrator dobija odgovarajuće upozorenje. Ovo pravilo osigurava proaktivno upravljanje zalihama umjesto reaktivnog, što je posebno važno u medicinskom okruženju gdje nedostatak reagensa može imati ozbiljne posljedice.

### Pravilo 4: Stroga kontrola pristupa prema ulozi

Samo korisnik sa ulogom **Administrator** ima pravo pristupa entitetu **Dnevnik Aktivnosti**. Laborant uopće ne može vidjeti sadržaj dnevnika, ni vlastite aktivnosti u njemu – to je isključivo alat za administratorski nadzor. Slično, samo administrator ima pravo na promjenu statusa u entitetu **Servisni Karton** i pravo na odobravanje ili odbijanje zahtjeva za rezervacijom. Laborant može kreirati zahtjev, ali ne može sam sebi odobriti rezervaciju.

### Pravilo 5: Zaštita integriteta pri brisanju opreme

Nije dozvoljeno brisanje entiteta **Oprema** iz sistema ukoliko za nju postoje aktivne ili buduće **Rezervacije**. Ovo pravilo štiti integritet podataka i sprečava situaciju u kojoj bi rezervacija "visila" u bazi bez referentnog aparata. Ako administrator želi povući opremu iz upotrebe, mora je prethodno arhivirati ili otkazati sve buduće rezervacije, pa tek onda izvršiti brisanje.

### Pravilo 6: Automatsko bilježenje u Dnevnik Aktivnosti

Sistem mora automatski kreirati zapis u Dnevniku Aktivnosti za svaku od sljedećih radnji: odobravanje ili odbijanje rezervacije, promjena statusa opreme, izmjena korisničke uloge, brisanje bilo kojeg entiteta iz sistema, te evidentiranje servisne intervencije. Ovo bilježenje mora biti transparentno korisniku – sistem ga radi u pozadini bez traženja posebne potvrde, jer bi u suprotnom korisnici mogli zaobići nadzor.

---

## Vizuelni prikaz domene – UML dijagram klasa

UML dijagram klasa služi kao vizuelni nacrt kompletne strukture podataka sistema. On prikazuje sve entitete, njihove atribute s tipovima podataka, te sve relacije između entiteta zajedno s multiplicitima koji precizno opisuju poslovne veze.

[![UML Dijagram Klasa](https://github.com/oalispahic/NRS-Grupa3/raw/main/Sprint%203/img/uml-white.png)](https://github.com/oalispahic/NRS-Grupa3/blob/main/Sprint%203/img/uml-white.png)

### Opis ključnih relacija prikazanih u dijagramu

**Korisnik → Rezervacija (1 : 0..\*):** Relacija pokazuje da jedan korisnik (laborant) može kreirati nula ili više rezervacija tokom vremena, dok svaka pojedinačna rezervacija mora imati tačno jednog vlasnika, tj. odgovornu osobu. Multiplicitet `0..*` na strani Rezervacije znači da novi korisnik koji tek počne koristiti sistem ne mora imati ni jednu rezervaciju, ali s vremenom ih može akumulirati neograničen broj.

**Oprema → Rezervacija (1 : 0..\*):** Jedan komad medicinske opreme može biti predmet nule ili više rezervacija u različitim terminima. Multiplicitet na strani Opreme je strogo **1**, što znači da se jedna rezervacija ne može odnositi na više aparata istovremeno – svaka rezervacija zauzima tačno jedan aparat.

**Oprema → Servisni Karton (1 : 0..\*):** Svaki aparat posjeduje nula ili više zapisa u servisnoj historiji. Nova oprema koja je tek nabavljena nema ni jednog servisnog zapisa, ali s godinama upotrebe ta historija raste. Ova relacija omogućava administratoru da prati pouzdanost uređaja i planira obavezne kalibracije prema propisanim rokovima.

**Korisnik → Audit Log (1 : 0..\*):** Svaka akcija u sistemu koja mijenja podatke vezana je za korisnički ID. Ovo garantuje da svaka promjena podataka ima digitalni potpis koji ne može biti falsifikovan, što je ključna sigurnosna garancija u medicinskom okruženju.

**Oprema ↔ Repromaterijal (N:M):** Relacija više-prema-više pokazuje da jedan medicinski uređaj može trošiti više vrsta materijala, dok se ista vrsta materijala može koristiti na više različitih uređaja. U implementaciji, ova relacija se razrješava kroz posredničku tabelu koja može sadržavati i dodatne atribute poput tipične količine potrošnje po upotrebi.

### Tehnička napomena o implementaciji atributa

Svi entiteti koriste jednoznačne identifikatore (**id**) tipa UUID ili auto-inkrementni cijeli broj kao primarne ključeve za međusobno povezivanje. Strani ključevi (npr. `id_korisnika` u Rezervaciji) omogućavaju referencijalnu integritet na nivou baze podataka, što znači da sistem automatski odbija operacije koje bi narušile konzistentnost podataka.

Atributi su prikazani prema standardima tipiziranih podataka: `String` za tekstualne vrijednosti poput naziva i opisa, `DateTime` za vremenske oznake rezervacija i akcija, `Decimal` za novčane iznose servisnih troškova, te `Enum` za statusne vrijednosti koje imaju tačno definirani skup dozvoljenih stanja. Ova precizna tipizacija nije samo formalni zahtjev – ona direktno omogućava implementaciju validacija na nivou baze podataka, što je dodatni sloj zaštite pored validacija u aplikacijskom kodu.

---

### Autor

1. [Kemal Mešić](https://github.com/mesicc) (236-ST)

---

### Alati korišteni za ovaj .md file

[1] Mermaid Live Editor – Official Website. Dostupno na: [mermaid.live](https://mermaid.live)