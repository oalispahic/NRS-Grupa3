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
