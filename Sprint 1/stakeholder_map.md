## **Stakeholder Map - Sistem za upravljanje laboratorijskom opremom**

### 1. Šta je Stakeholder Map?

#### 1.1 Definicija i koncept Stakeholder Mape

*Stakeholder Mapa* (u slobodnnom prevodu - Mapa zainteresovanih strana) - predstavlja proces identifikacije i kategorizacije osoba koje imaju interes u procesu razvoja i ishoda projekta [1].

U softverskom inžinjerstvu, "stakeholder" nije samo krajnji korisnik nego sve osobe koje mogu uticati na zahtjeve sistema.


#### 1.2 Zašto je Stakeholder Mapa toliko važna? 

*Mapiranje nam pomaže da otkrijemo potrebe koje nisu očigledne na prvi pogled.*

1. Identifikacije skrivenih funkcionalnih zahtjeva <br>
        Pomaže pri shvatanju administratorskih potreba, npr. adminu treba izvještaj o potršnji a ne samo dumge za rezervaciju.

        Primjer: Krajnji korisnik (istraživač) vidi samo potrebu za akcijom "Rezervacije" dok administrator to gleda iz drugog ugla i vidi potrebu za npr. automatskim izveštajem o potrošnji materijala.

2. Upravljanja konfliktima <br>
        Različiti stakeholderi imaju i različite potrebe. Mapa drži balanas između različitih stakeholdera.

        Primjer: krajnji korisnik želi brzu pretragu dok admin želi maksimalnu sigurnost.

3. Prioriteta MVP <br>
        > *MVP (Minimum Viable Product - Minimalno održiv proizvod) u softverskom inženjeringu je početna verzija proizvoda koja sadrži samo najosnovnije funkcije potrebne za rješavanje ključnog problema korisnika. Služi za brzo lansiranje, validaciju ideje na tržištu uz minimalne troškove i prikupljanje povratnih informacija za dalji razvoj. [2]* 
        --- <br>
        Omogućava nam određivanje kritičnih potreba za prvu verziju proizvoda, a čije potrebe mogu čekati naredne verzije.<br> <br>
        **Glvani cilj izrade Stakehloder Mape za ovu temu je osigurati da nijedan kritični zahtjev ne bude izostavljen (npr. sigurnost rezultata pretrage).**
<br> <br>

### 2. Kategorije Stakeholdera

#### 2.1 Klasifikacija zainteresovanih strana 
Da bih nnapravio uvid u Stakeholdere, podijelio sam ih u 3 grupe:

1. Direktni korisnici: <br>
**Laborant** - Najviše koristiti sistem i radi stalni upis u bazu podataka. Koristi sistem za rezervaciju i unos rezultata. <br>
**Šef Laboratorije** - Naagleda radi Laaboranta, ima stalni uvid u termine i kontroliše resurse laboratorije. <br>

2. Podrška: <br>
**IT Administrator** - Osigurava rad baze podataka i aplikacije da rade beez prestanka. <br>
**Služba za servis** - Reaguje na kvarove i u slučaju kvara blokiraju opremu. <br>

3. Logistika: <br>
**Služba nabavke** - Prati izvještaj o potršnji materijala i vrše nabavku novog materijala. <br>

<br>

#### 2.2 Prikaz Entity Relationship Diagrama

*Ovaj dijagram prikazuje logičku povezanost između korisnika i ključnih kategorija sistema / aplikacije [3].*
![Entity Relationship Diagram](img/ERD.png)




### 3. Detaljna tabela Stakeholder Mape
*Ova tabela prikaazuje korisnike sistema, njihove uloge i očekivanja.*

| Stakeholder | Šta radi?| Glavni cilj | Očekivanja od sistema | MVP |
| :--- | :--- | :--- | :--- | :---: |
| **Istraživač / Laborant** | Koristi operemu iz labaratorije | Da završi posao u labaratoriji bez čekanja. | Unos rezultata napravljenih u labaratoriji | **Visok** |
| **Šef laboratorije** | Pita se za sve i ima maksimalnu kontorulu na laboratoriji | Da sve bude kako treba. | Da odobrava ili odbija termine i ima uvid u statistiku termina. | **Visok** |
| **Služba za serivs** | Popravljaju sve što ne valja. | Da spriječi kvarove. | Da blokiraju opremu tokom servisa. | **Srednji** |
| **Služba nabavke** | Nabalja opremu i unose u sistem. | Da nikad ne dođe do nestanka labaratorijskog pribora. npr. epruveta | Da imaju uvid u izvještaj o zalihama. | **Nizak** |
| **IT Administrator** | Održavanje servera gdje se nalazi sistem. | Sigurnost podataka. | Siguran login i redovan backup baze. | **Visok** |

---
<br>
*Kratak opis tabele i MVP* <br>
        Ako laborant nema mogućnost unosa podataka/rezultata u sistem, sistem je beskoristan jer on puni aplikaciju podacima i zato je MVP Visok. Šef laboratorije mora imati detaljan uvid u termine (da ne bi dolazilo do preklapanja) i da sve u laboratoriji bude kako treba. Služba za servis mora biti dostupna 24/7 ako npr. dođe do pucanja veze između apilkacije/sistema i baze podataka sistem prestaje raditi. IT Administrator u MVP-u je jako visok jer je potrebna zaštita podataka i bez toga ne smijemo čuvati stvarne rezultate pretrage.

<br>



### 4. Specifični zahtjevi za upravljanje laboratorijskom opremom


#### harun







<br> <br>
#### Autori:
1. Kemal Mešić (236-ST)


<br> <br>
#### Literatura korištena za ovaj .md file
1. Ian Sommerville - *Software Engineering, 9th Edition*
        Dostupno na: - [Internet](https://engineering.futureuniversity.com/BOOKS%20FOR%20IT/Software-Engineering-9th-Edition-by-Ian-Sommerville.pdf)
2. Darren Alderman - *What is an MVP?*  - Dostupno na: [YouTube](https://www.youtube.com/watch?v=H6bHuZ7gjv0)
3. Korišten online alat Canva za izradu ERD - [Canva](https://www.canva.com/)



pregled .md fajla u vs code - shift + cmd + v
