# Inicijalna struktura repozitorija i osnovni tehnički setup

## 1. Uvod

Ovaj dokument opisuje inicijalnu strukturu repozitorija i osnovni tehnički setup projekta za sistem za upravljanje medicinskom laboratorijskom opremom. Njegova svrha je da objasni kako je projekat organizovan na tehničkom nivou, kako su raspoređeni najvažniji dijelovi sistema i na koji način takva organizacija olakšava dalji razvoj, testiranje i održavanje aplikacije.

U prethodnim sprintovima fokus projekta bio je prvenstveno na analizi problema, definisanju funkcionalnosti i razradi sistema kroz backlog, user storyje, acceptance kriterije, arhitekturu i druge projektne artefakte. U ovoj fazi rada fokus se pomjera sa planiranja na konkretniju tehničku pripremu projekta. To znači da je sada potrebno pokazati kako će se sve ono što je ranije definisano pretvoriti u preglednu i upotrebljivu tehničku osnovu.

Kada se govori o inicijalnoj strukturi repozitorija, ne misli se samo na to da postoje određeni folderi i fajlovi. Ovdje je važno pokazati da projekat ima logičan raspored, da svaki dio ima svoju svrhu i da je već na početku jasno gdje pripadaju dokumentacija, frontend dio, backend dio, konfiguracija i ostali tehnički elementi sistema. Na taj način se smanjuje konfuzija u radu, posebno kada više članova tima radi na istom projektu.

Osnovni tehnički setup je važan i zato što postavlja temelje za sve naredne sprintove. Ako je početna organizacija loša, dalji razvoj vrlo brzo postaje neuredan, jer se kod i dokumentacija počinju miješati, iste stvari se rade na više mjesta, a timu postaje teže da prati vlastiti rad. Zbog toga ovaj dokument predstavlja važan korak između faze idejnog oblikovanja sistema i njegove stvarne implementacije.

Ovaj dokument, dakle, ne predstavlja finalnu implementaciju sistema, nego njegovu početnu tehničku osnovu. Cilj je da se pokaže kako je projekat organizovan i kako ta organizacija podržava funkcionalnosti koje su ranije definisane, kao što su pregled opreme, rezervacije, statusi opreme, potrošnja repromaterijala, izvještaji i kontrola pristupa.

---

## 2. Svrha dokumenta

Svrha ovog dokumenta je da na jednom mjestu objedini osnovne tehničke odluke vezane za organizaciju projekta i njegov početni setup. Dokument treba da pojasni kako je strukturiran repozitorij, koje cjeline postoje unutar projekta i zašto je odabran upravo takav pristup.

Pored toga, dokument treba da posluži kao smjernica svim članovima tima. Kada član tima otvori repozitorij, treba da mu bude jasno gdje se nalazi dokumentacija, gdje implementacija, gdje backend, gdje frontend, a gdje pomoćni ili konfiguracioni fajlovi. Drugim riječima, cilj nije samo da repozitorij postoji, nego da on bude razumljiv.

Ovaj dokument također ima ulogu da uskladi tehnički dio rada sa ostatkom projektne dokumentacije. Pošto su ranije već definisani business zahtjevi, user storyji i acceptance kriteriji, sada je potrebno pokazati da postoji tehnička osnova koja podržava realizaciju tih zahtjeva. Na taj način se vidi kontinuitet između planiranja sistema i njegove implementacije.

Može se reći da ovaj dokument ima tri glavne uloge. Prva je organizaciona, jer definiše raspored projekta. Druga je tehnička, jer opisuje osnovni setup i odabrane tehnologije. Treća je komunikaciona, jer svim članovima tima daje zajednički okvir za rad.

---

## 3. Kontekst projekta

Projekat koji razvijamo odnosi se na sistem za upravljanje medicinskom laboratorijskom opremom. Takav sistem mora podržavati više različitih funkcionalnosti i ne može se posmatrati kao jednostavna aplikacija sa jednom ili dvije stranice. Kroz prethodni rad već je definisano da sistem treba omogućiti pregled laboratorijske opreme, prikaz detalja opreme, rezervaciju opreme, pregled vlastitih rezervacija, upravljanje opremom, odobravanje rezervacija, upravljanje statusima, pregled zauzeća, potrošnju repromaterijala, pravila korištenja, izvještaje, održavanje, dashboard pregled i druge funkcionalnosti.

To znači da projekat od početka ima više međusobno povezanih cjelina. Postoji korisnički dio sistema, postoje administratorske funkcije, postoji baza podataka, postoji potreba za autentifikacijom i autorizacijom, postoji logika rezervacija i postoji potreba za evidencijom aktivnosti. Takav sistem mora imati repozitorij koji odražava njegovu složenost na jedan uredan i jasan način.

Važno je napomenuti i da se radi o laboratorijskom okruženju, gdje su podaci i procesi osjetljiviji nego u nekim jednostavnijim studentskim projektima. Nije dovoljno samo omogućiti prikaz podataka, nego i osigurati da sistem bude pregledan, da kontroliše pristup, da podrži tačne informacije o opremi i da omogući pouzdan dalji razvoj.

Zbog toga je tehnički setup važan ne samo kao priprema za implementaciju, nego i kao pokazatelj da projekat ima ozbiljnu osnovu. Dobro organizovan repozitorij pokazuje da tim nije nasumično započeo izradu sistema, nego da postoji jasan plan kako se projekat tehnički razvija.

---

## 4. Zašto je važna inicijalna struktura repozitorija

Na početku svakog projekta često postoji utisak da struktura repozitorija nije presudna i da se sve može organizovati usput. Međutim, kako projekat raste, upravo se na tom mjestu često javljaju prvi problemi. Ako na početku nije definisano gdje pripadaju određeni dijelovi sistema, članovi tima vrlo brzo počinju praviti različite pristupe, dodavati fajlove na različita mjesta i razvijati projekat bez zajedničkog tehničkog standarda.

Takva situacija dovodi do nekoliko problema. Prvo, repozitorij postaje nepregledan. Drugo, otežano je održavanje projekta, jer se teško pronalaze relevantni dijelovi koda ili dokumentacije. Treće, članovi tima troše vrijeme na snalaženje umjesto na stvarni razvoj funkcionalnosti. Četvrto, kada se projekat treba pregledati ili braniti, struktura ne pokazuje jasnu logiku razvoja.

Sa druge strane, dobro postavljena inicijalna struktura repozitorija donosi niz prednosti. Prije svega, olakšava timski rad jer svi znaju gdje šta pripada. Zatim, doprinosi tome da projekat djeluje urednije i profesionalnije. Također, pojednostavljuje kasniji razvoj, jer se nove funkcionalnosti dodaju na već postojeću logiku organizacije, umjesto da se cijeli projekat stalno reorganizuje.

Može se reći da inicijalna struktura repozitorija predstavlja tehnički kostur projekta. Kao što kostur daje osnovni oblik i stabilnost tijelu, tako i repozitorij daje oblik i stabilnost razvoju projekta. Bez toga bi projekat postojao, ali bi njegov razvoj bio znatno haotičniji.

---

## 5. Osnovni principi organizacije repozitorija

Prilikom definisanja repozitorija vodili smo se principom da projekat mora biti organizovan tako da podržava i dokumentaciju i implementaciju, ali da te dvije cjeline ne budu pomiješane. Ovaj princip je posebno važan u studentskom projektu gdje se paralelno rade i tekstualni artefakti i tehnički dio sistema.

### 5.1 Preglednost

Preglednost je prvi i možda najvažniji princip. Svaki član tima treba moći otvoriti repozitorij i bez većih poteškoća razumjeti osnovni raspored projekta. To znači da nazivi foldera trebaju biti jasni, da ne smiju postojati nepotrebno komplikovane ili zbunjujuće putanje i da struktura treba odražavati stvarnu logiku sistema.

Preglednost ne znači samo da projekat izgleda uredno, nego da takva urednost ima praktičnu vrijednost. Kada su folderi dobro raspoređeni, lakše je pronaći dokument, lakše je pronaći komponentu frontenda, lakše je pronaći backend rutu ili model baze podataka. Na taj način se štedi vrijeme i smanjuje broj grešaka.

U našem slučaju preglednost je posebno važna jer projekat ima više sprintova, više vrsta dokumentacije i više tehničkih cjelina. Zbog toga repozitorij mora biti organizovan tako da ne djeluje zatrpano, nego da već na prvi pogled pokaže osnovne dijelove projekta.

### 5.2 Razdvajanje odgovornosti

Drugi važan princip jeste razdvajanje odgovornosti. To znači da različiti dijelovi projekta treba da budu smješteni u odvojene cjeline prema njihovoj ulozi. Frontend ne treba biti pomiješan sa backendom, backend ne treba biti pomiješan sa bazom, a dokumentacija ne treba biti pomiješana sa implementacijom.

Razdvajanje odgovornosti je važno zato što svaka od tih cjelina ima svoju logiku rada. Frontend je fokusiran na korisnički interfejs i iskustvo korisnika. Backend je fokusiran na logiku sistema, obradu zahtjeva i kontrolu pristupa. Baza podataka je fokusirana na čuvanje i organizaciju podataka. Dokumentacija ima sasvim drugu ulogu, jer služi za objašnjenje i praćenje razvoja projekta.

Ako bi sve te stvari bile pomiješane, projekat bi vrlo brzo postao teško razumljiv. Zbog toga je od samog početka potrebno jasno razdvojiti šta pripada kojoj tehničkoj oblasti.

### 5.3 Dosljednost

Dosljednost znači da se jednom uspostavljena pravila strukture koriste kroz cijeli projekat. Nije dovoljno samo jednom postaviti uredan repozitorij ako se kasnije novi fajlovi dodaju proizvoljno. Dosljednost omogućava da projekat zadrži preglednost i kada postane veći.

Na primjer, ako se odluči da dokumentacija ide u određene foldere, onda se nova dokumentacija treba dodavati u skladu s tim pravilom. Ako backend ima određenu podjelu na rute, kontrolere i servise, onda se nova logika treba uklapati u taj obrazac. Tako se postepeno stvara projekat koji djeluje jedinstveno i logično.

U kontekstu našeg rada dosljednost je važna i zato što više članova tima doprinosi istom repozitoriju. Bez dosljednosti bi svako radio na svoj način, a to bi se brzo odrazilo na tehnički kvalitet projekta.

### 5.4 Proširivost

Početni setup ne smije biti postavljen samo za potrebe trenutnog trenutka, nego mora ostaviti prostor za dalji razvoj. To je posebno važno jer je kroz backlog već jasno da će sistem s vremenom obuhvatiti više funkcionalnosti i modula.

Proširivost znači da se struktura repozitorija postavlja tako da podrži dodavanje novih modula bez velikih reorganizacija. Ako kasnije dođe potreba da se doda novi administratorski prikaz, novi dio izvještaja ili dodatna logika vezana za održavanje opreme, projekat bi to trebao moći primiti bez rušenja postojeće organizacije.

Upravo zbog toga se u ovoj fazi bira struktura koja je dovoljno jednostavna za početak, ali nije previše uska. Time se ostavlja prostor da projekat raste prirodno.

### 5.5 Podrška timskom radu

Pošto projekat razvija tim, struktura repozitorija mora biti prilagođena saradnji. To znači da treba omogućiti da različiti članovi istovremeno rade na različitim dijelovima projekta, a da pri tome ne dolazi do nepotrebnog preklapanja ili konfuzije.

Kada je repozitorij dobro organizovan, jedan član može raditi na frontend komponentama, drugi na backend rutama, treći na bazi podataka, a četvrti na dokumentaciji, i svima je jasno gdje pripada njihov doprinos. Takva organizacija ne samo da olakšava rad, nego i čini timski proces efikasnijim.

### 5.6 Usklađenost sa projektom kao cjelinom

Posljednji važan princip jeste usklađenost sa ostatkom projekta. Tehnička struktura ne smije biti odvojena od onoga što je već definisano kroz backlog, arhitekturu i user storyje. Ako je projekat zamišljen kao sistem sa više modula, i repozitorij to mora odražavati. Ako je kroz arhitekturu definisano odvajanje slojeva, i repozitorij mora pratiti tu logiku.

Drugim riječima, organizacija repozitorija nije proizvoljna tehnička odluka, nego odraz ukupne logike projekta.

---

## 6. Inicijalna struktura repozitorija

Početna struktura repozitorija zamišljena je jednostavno i pregledno, bez nepotrebne komplikacije.

```text
NRS-Grupa3/
│
├── Sprint 1/
├── Sprint 2/
├── Sprint 3/
├── Sprint 4/
│
├── frontend/
├── backend/
├── database/
├── docs/
│
├── README.md
├── .gitignore
└── .env.example
```

---


## 7. Objašnjenje glavnih foldera
### 7.1 Sprint folderi

Sprint folderi imaju posebnu vrijednost u ovom projektu jer omogućavaju da se razvoj prati kroz faze. U njima se nalaze dokumenti koji su nastajali tokom rada i koji pokazuju kako se projekat razvijao od ideje do tehničke razrade.

Ovi folderi nisu samo arhiva, nego i važan pregled procesa rada. Kroz njih se može vidjeti kako su definisani problemi sistema, kako su razvijeni user storyji, acceptance kriteriji, testna strategija i drugi elementi. Time sprint folderi imaju i organizacionu i obrazovnu vrijednost.

Zadržavanje tih foldera u repozitoriju ima smisla jer pokazuje kontinuitet projekta i vezu između planiranja i implementacije.

### 7.2 Frontend

Frontend folder je mjesto gdje se razvija korisnički interfejs sistema. On treba da podrži prikaze koji su korisniku i administratoru potrebni za svakodnevni rad sa sistemom. To uključuje pregled opreme, detalje opreme, prikaz rezervacija, kalendar zauzeća, dashboard, pregled notifikacija i druge funkcionalnosti.

Važno je naglasiti da frontend nije samo “vizuelni dio”, nego ključna tačka komunikacije između korisnika i sistema. Zbog toga i njegova organizacija mora biti logična, kako bi se mogla podržati različita prava pristupa, više korisničkih tokova i različiti tipovi prikaza.

Početni frontend setup treba da omogući jednostavno dodavanje novih stranica i komponenti bez potrebe da se kasnije cijeli frontend reorganizuje.

### 7.3 Backend

Backend folder sadrži logiku sistema. Tu će se nalaziti API rute, obrada zahtjeva, autentifikacija, autorizacija, logika rezervacija, upravljanje statusima opreme i svi drugi procesi koji ne pripadaju direktno korisničkom interfejsu.

Backend je posebno važan jer povezuje korisničke akcije sa bazom podataka i poslovnim pravilima sistema. Na primjer, kada korisnik rezerviše opremu, backend provjerava da li je termin slobodan, da li korisnik ima pravo pristupa i da li rezervacija može biti evidentirana.

Zbog toga backend mora biti organizovan dovoljno ozbiljno i pregledno još od početka, jer na njemu počiva veliki dio stvarne funkcionalnosti sistema.

### 7.4 Database

Database folder predstavlja mjesto gdje se planira i organizuje baza podataka. Pošto je naš sistem zasnovan na jasnim entitetima i odnosima među njima, baza podataka igra ključnu ulogu. Tu se čuvaju korisnici, oprema, rezervacije, statusi, repromaterijal, logovi aktivnosti i drugi važni podaci.

Iako baza na početku možda neće imati konačan oblik, važno je da od samog starta postoji jasno mjesto za rad sa šemom, migracijama i drugim baznim resursima. To pokazuje da baza nije sporedna stvar, nego jedna od glavnih komponenti projekta.

### 7.5 Docs

Docs folder služi kao dodatni prostor za dokumentaciju koja nije nužno vezana za jedan sprint. U njemu se mogu nalaziti tehnička objašnjenja, dodatne odluke, pomoćne bilješke ili stabilniji dokumenti koji traju kroz više faza razvoja.

Ovaj folder pomaže da repozitorij ne bude sveden samo na sprint artefakte i implementaciju, nego da postoji i mjesto za širu tehničku dokumentaciju projekta.

### 8. Osnovni tehnički stack

Tehnički stack projekta treba biti u skladu sa onim što je već definisano kroz ranije sprintove i arhitekturu sistema.

Za korisnički interfejs koristi se React, jer omogućava komponentni pristup i razvoj interaktivnog web interfejsa. Pošto sistem ima više vrsta prikaza i različite tokove korištenja, React je pogodan izbor za organizaciju takvog interfejsa.

Za backend dio koristi se Node.js sa Express okruženjem. Ovaj izbor ima smisla zato što omogućava jednostavnu izgradnju API sloja i dobru povezanost sa frontend dijelom. Express je dovoljno fleksibilan da podrži rute za opremu, rezervacije, autentifikaciju, status opreme, izvještaje i ostale funkcionalnosti.

Za bazu podataka koristi se PostgreSQL. To je logičan izbor jer projekat ima više međusobno povezanih entiteta i zahtijeva stabilnu relacijsku strukturu podataka.

Takav stack je dovoljno ozbiljan da podrži razvoj sistema, a istovremeno dovoljno poznat i praktičan za studentski projekat.

### 9. Osnovni tehnički setup

Početni tehnički setup obuhvata nekoliko važnih koraka. Prvi je uspostavljanje repozitorija sa jasnom strukturom i osnovnim konfiguracionim fajlovima. Drugi je postavljanje osnovnog skeletona za frontend i backend. Treći je priprema prostora za bazu podataka i povezane fajlove. Četvrti je definisanje osnovnih pravila za lokalno pokretanje projekta.

Važno je da setup ne ostane samo na ideji, nego da omogući stvarni početak razvoja. To znači da projekat treba imati dovoljno dobru osnovu da članovi tima mogu lokalno raditi, dodavati nove funkcionalnosti i nadograđivati postojeću strukturu.

Početni setup ne mora sadržavati sve implementirane funkcionalnosti, ali mora pokazati da je projekat tehnički spreman za nastavak rada.

### 10. Veza sa ostalim projektnim artefaktima

Ovaj dokument je usko povezan sa ostalim artefaktima projekta. On treba da prati logiku product backloga, user storyja i acceptance kriterija, jer tehnička struktura mora podržati ono što je funkcionalno planirano. Također, treba biti usklađen sa arhitekturnim pregledom i domain modelom, jer repozitorij ne može biti organizovan nasumično ako je arhitektura već definisana.

Pored toga, dokument je povezan i sa skeletonom projekta i Definition of Done, jer početna struktura i setup predstavljaju praktičnu osnovu za ono što se kasnije smatra ispunjenim i tehnički spremnim.

Drugim riječima, ovaj dokument nije izolovan. On je direktno povezan sa cjelokupnom logikom projekta.

### 11. Očekivani rezultat ove faze

Od ove faze ne očekuje se završena aplikacija, nego uspostavljena tehnička osnova. To znači da repozitorij treba biti organizovan jasno, da mora postojati početni raspored tehničkih cjelina i da mora biti postavljena logika daljeg razvoja.

Očekivani rezultat je da projekat više ne bude samo skup projektnih dokumenata, nego da dobije stvarni tehnički okvir. Taj okvir treba biti dovoljno dobar da omogući dalje proširivanje sistema bez haotičnog reorganizovanja.

Praktično posmatrano, rezultat ove faze treba da bude repozitorij koji izgleda smisleno, tehnički logično i dovoljno ozbiljno da se na njemu mogu graditi naredni inkrementi sistema.

## 12. Zaključak

Inicijalna struktura repozitorija i osnovni tehnički setup predstavljaju važan korak u razvoju sistema za upravljanje medicinskom laboratorijskom opremom. Ovim dokumentom definisana je osnova na kojoj će se graditi dalji razvoj projekta, pri čemu je poseban fokus stavljen na preglednost, razdvajanje odgovornosti, proširivost i podršku timskom radu.

Dobro organizovan repozitorij doprinosi ne samo tehničkom kvalitetu projekta, nego i kvalitetu saradnje među članovima tima. On omogućava da projekat bude razumljiv, da se lakše održava i da se nove funkcionalnosti dodaju bez nepotrebnog haosa.

Zbog toga se ovaj dokument može posmatrati kao važan most između svega što je ranije isplanirano i onoga što će se u narednim fazama konkretno implementirati. Tek kada projekat dobije jasnu tehničku osnovu, može se očekivati stabilan i smislen dalji razvoj sistema.
