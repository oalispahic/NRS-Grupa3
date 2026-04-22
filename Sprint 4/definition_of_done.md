# Definition of Done — Sprint 4

## Svrha dokumenta

Ovim dokumentom definišu se kriteriji na osnovu kojih se određeni zadatak, tehnička aktivnost ili isporučivi rezultat u okviru Sprinta 4 može smatrati završenim. Uloga ovog dokumenta nije samo formalno označavanje statusa zadatka, nego prvenstveno uspostavljanje zajedničkog standarda kvaliteta koji će svi članovi tima primjenjivati tokom daljeg razvoja sistema.

Poseban značaj ovog dokumenta proizlazi iz činjenice da Sprint 4 predstavlja fazu u kojoj se ranije donesene projektne odluke počinju pretvarati u konkretnu tehničku osnovu. Zbog toga pojam „završeno“ u ovom sprintu ne podrazumijeva samo da je određeni dio koda napisan, nego da je implementiran na način koji je funkcionalan, provjerljiv, dokumentovan i dovoljno stabilan da na njemu mogu nastaviti raditi i ostali članovi tima bez dodatnih improvizacija.

Iako ovaj sprint još nije usmjeren na punu realizaciju poslovnih funkcionalnosti, njegov značaj je direktno vezan za osnovnu temu projekta, a to je razvoj sistema za upravljanje medicinskom laboratorijskom opremom. Takav sistem u kasnijim fazama mora omogućiti pouzdano evidentiranje opreme, pregled njenog statusa, rezervacije, kontrolu pristupa i obradu osjetljivih podataka, zbog čega već u ovoj fazi tehnički temelji moraju biti postavljeni uredno, konzistentno i dovoljno kvalitetno.


## Definition of Done

Zadatak, user story ili tehnički deliverable u okviru Sprinta 4 smatra se završenim tek kada su ispunjeni svi kriteriji navedeni u nastavku.

### 1. Usklađenost sa ciljem sprinta

Zadatak se može smatrati završenim samo ako je realizovan u okviru ciljeva definisanih za Sprint 4. To znači da njegov rezultat mora biti direktno povezan sa postavljanjem tehničke infrastrukture, organizacijom projekta, pravilima timskog rada ili pripremom stabilne osnove za naredne razvojne aktivnosti.

Pri tome nije dovoljno da zadatak bude djelimično implementiran ili samo konceptualno razrađen. Potrebno je da rezultat bude u onom stepenu dovršenosti koji omogućava njegovu konkretnu upotrebu u projektu, bez potrebe da drugi član tima dodatno nagađa šta je autor želio postići ili šta još nedostaje da bi isporuka bila upotrebljiva.

Drugim riječima, zadatak nije završen zato što „postoji“, nego zato što je doveden do nivoa na kojem se može smatrati pouzdanim dijelom zajedničke projektne osnove.

### 2. Struktura projekta i arhitektonska dosljednost

Svaki rezultat nastao u okviru Sprinta 4 mora poštovati dogovorenu strukturu projekta i arhitektonske odluke koje su prethodno definisane. Posebno je važno da se u ovoj fazi uspostavi jasna tehnička disciplina, jer se upravo na tim obrascima kasnije razvijaju svi poslovni moduli sistema.

To podrazumijeva da projekat mora imati jasno razdvojene cjeline za frontend i backend, te da unutar tih cjelina postoji logična podjela odgovornosti. Na backend strani to uključuje odvajanje ruta, kontrolera, servisa, repozitorija, middleware-a i validacijskih mehanizama, dok frontend treba biti organizovan kroz stranice, komponente, context, hooks, API sloj i routing logiku.

Pored same tehničke podjele, važna je i preglednost implementacije. Nazivi fajlova, funkcija, komponenti i foldera moraju biti dosljedni i smisleni, kako bi bilo odmah jasno kojem dijelu sistema pripadaju i koju ulogu imaju. U projektu čija je tema upravljanje laboratorijskom opremom to je posebno važno, jer će se u narednim sprintovima broj modula povećavati, a nejasna struktura bi vrlo brzo otežala održavanje i snalaženje u kodu.

### 3. Mogućnost lokalnog pokretanja i reprodukcije okruženja

Jedan od osnovnih kriterija završenosti u ovom sprintu jeste mogućnost da se projekat ili njegov dio može reproducibilno pokrenuti u lokalnom razvojnom okruženju. To znači da implementacija ne smije zavisiti od skrivenih lokalnih podešavanja, ručnih intervencija ili neobjašnjenih koraka koje zna samo osoba koja je zadatak radila.

U tom smislu, zadatak se smatra završenim tek kada drugi član tima može preuzeti repozitorij, instalirati potrebne zavisnosti, postaviti konfiguraciju prema dostupnim uputama i pokrenuti projekat bez dodatnog traženja objašnjenja. Ovaj kriterij je posebno važan jer problem „radi kod mene“ može ozbiljno ugroziti kontinuitet timskog rada i usporiti sve naredne faze razvoja.

Minimalni uslovi koji moraju biti ispunjeni jesu postojanje odgovarajućeg `.env.example` fajla, jasno definisan postupak instalacije zavisnosti, ispravna konekcija sa bazom podataka, mogućnost izvršavanja migracija i podizanja razvojnih servera bez kritičnih grešaka. Na taj način se osigurava da sprint ne rezultira samo fragmentima koda, nego stvarnim i dijeljivim razvojnim okruženjem.

### 4. Kvalitet koda i tehnička urednost
Kvalitet isporuke u ovom sprintu ne procjenjuje se isključivo kroz funkcionalnost, nego i kroz
tehničku urednost implementacije. Dobro postavljena osnova projekta mora biti čista,
konzistentna i dovoljno razumljiva da ne generiše tehnički dug već u početnoj fazi razvoja.
To znači da kod mora prolaziti kroz dogovorene provjere kvaliteta, uključujući linting i
formatiranje, te da ne smije sadržavati haotično raspoređene privremene blokove, nejasne
nazive ili nedovršene dijelove koji remete preglednost sistema. U situaciji kada se projekat
kasnije širi na module kao što su evidencija opreme, rezervacijski tokovi, statusi uređaja,
servisna historija i notifikacije, početna neurednost se vrlo brzo multiplicira.
Pored toga, kvalitet koda podrazumijeva i čitljivost. Nije dovoljno da kod funkcioniše;
potrebno je da druga osoba može relativno lako razumjeti osnovnu logiku implementacije,
pratiti tok odgovornosti i nastaviti razvoj bez nepotrebnog gubljenja vremena na dešifrovanje
tuđeg rada.
### 5. Testiranje i osnovna provjera ispravnosti
Iako Sprint 4 još nije usmjeren na kompleksne poslovne tokove, to ne znači da se može
odustati od osnovnih provjera ispravnosti. Naprotiv, upravo u ovoj fazi potrebno je postaviti
naviku da svaka relevantna promjena bude provjerena prije nego što se prihvati kao
završena.
To podrazumijeva da nova logika, kada je to opravdano i tehnički smisleno, treba imati
odgovarajuće testove, posebno ako se radi o pomoćnim funkcijama, validaciji,
konfiguracijskim modulima ili dijelovima koda koji će se koristiti kao osnova za kasnije
funkcionalnosti. Osim automatskih testova, potrebno je izvršiti i osnovnu ručnu provjeru da
projekat radi stabilno nakon izmjene.

Ovaj kriterij je posebno važan u kontekstu budućeg sistema upravljanja laboratorijskom
opremom, jer će kasniji moduli zavisiti od tačne validacije podataka, pravilnog upravljanja
pristupom i stabilnog rada aplikacije. Zbog toga je već sada opravdano insistirati na tome da
„done“ uključuje i dokaz da promjena nije unijela novu nestabilnost u sistem.
### 6. GitHub workflow i timska validacija
U okviru ovog projekta zadatak se ne smatra završenim sve dok ne prođe kroz predviđeni
način timske provjere. Drugim riječima, lokalno završena implementacija još uvijek nije
stvarno završena dok nije integrisana u zajednički repozitorij i validirana kroz dogovoreni
GitHub workflow.
To podrazumijeva da promjena mora biti postavljena na repozitorij, predstavljena kroz pull
request i pregledana od strane najmanje jednog drugog člana tima. Na taj način se ne
osigurava samo tehnička kontrola kvaliteta, nego i transparentnost procesa rada, što je
posebno važno u sprintu koji postavlja pravila za sve naredne sprintove.
Autor zadatka ne bi trebao samostalno odobravati vlastitu promjenu bez nezavisnog
pregleda, jer bi to umanjilo svrhu code review procesa. Komentari i sugestije iz pregleda
moraju biti riješeni ili obrazloženi prije nego što se zadatak konačno zatvori. Time se dodatno
potvrđuje da rezultat nije samo individualno, nego i timski prihvaćen kao dovoljno kvalitetan.
### 7. Dokumentacija kao sastavni dio isporuke
U Sprintu 4 dokumentacija ne predstavlja dodatnu ili sporednu aktivnost, nego sastavni dio
završene isporuke. Budući da se u ovoj fazi definišu tehničke postavke projekta, način
pokretanja sistema, organizacija foldera i razvojna pravila, izostanak dokumentacije bi
značio da važan dio znanja ostaje neformalno vezan za pojedinca, umjesto da bude
prenesen timu.
Zato se zadatak može smatrati završenim tek kada su ažurirani README ili drugi
odgovarajući dokumenti koji objašnjavaju način pokretanja sistema, korištenje
konfiguracijskih fajlova, eventualne zavisnosti i sve tehničke odluke koje su važne za
razumijevanje projekta. Ako je došlo do promjene arhitekture, strukture baze, organizacije
repozitorija ili načina izvršavanja određenih skripti, to mora biti jasno zapisano.
Kvalitetna dokumentacija u ovom kontekstu ima dvostruku ulogu. S jedne strane, ona
omogućava drugim članovima tima da efikasno nastave rad. S druge strane, ona služi kao
dokaz da projektni tim ne razvija sistem stihijski, nego planski, uz jasnu evidenciju tehničkih
odluka i razvojnih pravila.
### 8. Osnovna relevantnost za domenu projekta
Iako Sprint 4 nije sprint pune implementacije poslovne logike, opravdano je očekivati da
tehnička osnova već bude oblikovana u skladu s potrebama domene za koju se sistem
razvija. U ovom slučaju riječ je o sistemu za upravljanje medicinskom laboratorijskom
opremom, što podrazumijeva osjetljivost podataka, potrebu za preglednim praćenjem
statusa opreme, rezervacija i kasnijih servisnih procesa.

Zbog toga tehnička rješenja postavljena u ovom sprintu ne bi trebala biti potpuno generička.
Naprimjer, struktura foldera, imenovanje modula, planirane rute, konekcija prema bazi i
opšta organizacija projekta trebaju pokazivati da je sistem zamišljen za konkretan domen, a
ne kao proizvoljan šablon bez veze sa stvarnim predmetom projekta.
Drugim riječima, domena jeste relevantna za ovaj sprint, ali na posredan način. Ona ne
određuje još detaljne korisničke tokove, ali određuje kakav nivo pouzdanosti, sigurnosti,
konzistentnosti i preglednosti mora imati tehnička osnova koja se sada uspostavlja.
## Kada se zadatak ne smatra završenim
Bez obzira na stepen uloženog rada, zadatak se ne može označiti kao završen ukoliko je
implementacija ostala samo na lokalnom računaru autora, ukoliko nije moguće
reproducibilno pokretanje projekta, ako promjena nije prošla pregled drugog člana tima ili
ako nisu ažurirani relevantni dokumenti.
Također, zadatak nije završen ako postoje kritične greške pri podizanju sistema, ako
struktura koda odstupa od dogovorenih principa ili ako su ostavljeni nedovršeni dijelovi koji
otežavaju dalji razvoj.
Posebno je važno naglasiti da privremeno rješenje, improvizovani workaround ili
neobjašnjena konfiguracija ne mogu biti prihvaćeni kao završena isporuka. Takva rješenja
mogu eventualno poslužiti kao radna verzija, ali ne ispunjavaju standard potreban da bi se
zadatak legitimno označio statusom `Done`.
## Završna formulacija
U okviru Sprinta 4 zadatak se smatra završenim tek onda kada je tehnički implementiran,
integrisan u postojeću strukturu projekta, dostupan ostatku tima putem repozitorija, provjeren
kroz osnovne procedure kvaliteta i uredno dokumentovan. Tek takva isporuka predstavlja
stvarni doprinos razvoju sistema i može služiti kao stabilna osnova za naredne sprintove u
kojima će se razvijati konkretne funkcionalnosti vezane za upravljanje laboratorijskom
opremom.
## Kontrolna lista za označavanje zadatka kao `Done`
Prije zatvaranja zadatka potrebno je provjeriti da li su ispunjeni sljedeći uslovi:
- [ ] Zadatak je realizovan u skladu sa ciljem Sprinta 4 i ne izlazi iz definisanog scope-a
tehničke infrastrukture.
- [ ] Implementacija je usklađena sa dogovorenom strukturom projekta i ne narušava
postojeću arhitekturu.
- [ ] Kod je postavljen u odgovarajuće foldere i prati dogovorenu organizaciju frontend i
backend dijela sistema.
- [ ] Projekat se može preuzeti iz repozitorija i lokalno pokrenuti bez dodatnih skrivenih
podešavanja.
- [ ] `.env.example` je ažuriran ukoliko su uvedene nove konfiguracijske varijable.

- [ ] Instalacija zavisnosti i pokretanje projekta mogu se izvršiti prema dokumentovanim
koracima.
- [ ] Konekcija sa bazom podataka je provjerena i funkcioniše bez kritičnih grešaka.
- [ ] Migracije baze se izvršavaju uredno i bez ručnih intervencija.
- [ ] Seed podaci, ukoliko postoje, mogu se pokrenuti bez problema.
- [ ] Backend server se podiže stabilno.
- [ ] Frontend aplikacija se učitava i osnovni skeleton sistema funkcioniše očekivano.
- [ ] Kod prolazi linting i formatiranje prema dogovorenim pravilima.
- [ ] Testovi su napisani tamo gdje su primjenjivi i prolaze lokalno.
- [ ] Promjena je ručno provjerena nakon implementacije.
- [ ] Nisu ostavljeni kritični `TODO` dijelovi, privremeni workaround-i ili neobjašnjena rješenja.
- [ ] README ili druga relevantna dokumentacija je ažurirana ako je došlo do promjene u
strukturi, konfiguraciji ili načinu pokretanja projekta.
- [ ] Važne tehničke odluke i izmjene su evidentirane na jasan i pregledan način.
- [ ] Promjena je postavljena na GitHub repozitorij.
- [ ] Otvoren je pull request sa jasnim opisom urađenog.
- [ ] Pull request je pregledao najmanje jedan drugi član tima.
- [ ] Komentari iz code review procesa su riješeni ili adekvatno obrazloženi.
- [ ] Zadatak je spreman da posluži kao stabilna osnova za naredne sprintove razvoja
sistema za upravljanje laboratorijskom opremom.
