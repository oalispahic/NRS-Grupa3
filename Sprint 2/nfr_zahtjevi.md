# Nefunkcionalni zahtjevi (NFR Zahtjevi) 

## 1. Šta su Nefunkcionalni Zahtjevi (NFR)?
Dok Funkcionalni zahtjevi definišu ŠTA sistem radi (npr. "Korisnik može rezervisati mikroskop"), Nefunkcionalni zahtjevi (NFR) definišu KAKO sistem radi (npr. "Rezervacija se mora izvršiti za manje od 2 sekunde").

NFR-ovi postavljaju ograničenja i standarde kvaliteta koji osiguravaju da je sistem upotrebljiv, siguran i skalabilan. Bez njih, softver može biti funkcionalno ispravan, ali potpuno neupotrebljiv u stvarnom svijetu (npr. prespor je ili stalno pada).

### 1.1. Ključne kategorije NFR-a

Nefunkcionalni zahtjevi osiguravaju kvalitet sistema kroz sljedeće stubove:

1. **Sigurnost (eng.Security)** - Definiše kako štitimo osjetljive podatke. Fokus je na **enkripciji** (zaštita podataka), **autentifikaciji** (provjera identiteta) i **autorizaciji** (kontroli pristupa).

2. **Dostupnost (eng. Availability)** - Određuje koliko je sistem operativan. Na primjer, **uptime od 99.9%** garantuje da sistem smije biti nedostupan svega nekoliko minuta tokom cijelog mjeseca.

3. **Performanse (eng. Performance)** - Mjeri brzinu sistema pod opterećenjem. Fokusira se na **vrijeme odziva** (response time) i sposobnost rada sa velikim brojem istovremenih korisnika.

4. **Pouzdanost (eng. Reliability)** - Definiše učestalost grešaka i brzinu oporavka nakon kvara. Ključni parametar je **RTO** (*Recovery Time Objective*), odnosno vrijeme potrebno za potpuni povrat podataka.

5. **Upotrebljivost / Responzivnost (eng. Usability)** - Osigurava da je interfejs intuitivan i prilagođen različitim uređajima. To uključuje **Responsive Design** koji omogućava rad na tabletima i mobilnim telefonima bez gubitka funkcionalnosti.

6. **Skalabilnost (eng. Scalability)** - Mogućnost sistema da raste zajedno sa obimom podataka. Osigurava da povećanje baze (npr. sa 1,000 na 50,000 zapisa) ne uzrokuje usporavanje aplikacije.

> **Napomena:** U medicinskom softveru, ovi zahtjevi su često prioritetniji od samih funkcionalnosti jer direktno utiču na sigurnost pacijenata i zakone države.

### 1.2 Zašto su važni u medicinskom sektoru?
U medicinskim sistemima (poput laboratorija), NFR-ovi nisu samo "lijep dodatak", već zakonska i etička obaveza:

1. **Integritet**: Podaci o pacijentu se ne smiju slučajno promijeniti.

2. **Privatnost**: Podaci moraju biti kriptovani jer su zakonski zaštićeni.

3. **Audit Trail**: Svaki ulazak u sistem mora biti zabilježen (ko je šta gledao/mijenjao) zbog pravne odgovornosti.

### 1.3 Primjer iz Senaite LIMS
Ako je funkcionalni zahtjev "Odobravanje rezervacije opreme", prateći NFR-ovi bi bili:

1. **Integritet**: Svako odobrenje se zapisuje u neizbrisiv log (Audit Log).

2. **Sigurnost**: Samo administrator smije vidjeti to dugme.

3. **Performanse**: Akcija se mora procesuirati u realnom vremenu.

## 2. Tabela detaljnih nefunkcionalnih zahtjeva

Kako već znamo Product Backlog definiše šta aplikacija radi (npr. rezervacija opreme), NFR definišu kvalitet i sigurnost tih operacija. Prošli sprint smo proširili temu na "Sistem za upravljanje medicinskom laboratorijskom opremom" i samim tim kako se radi o medicinskom sistemu, ovi zahtjevi su rigorozniji kako bi se održao integritet laboratorijskih nalaza, jer mala greška može biti kobna za zdravlje pacijenta. <br>

| ID | Kategorija | Opis zahtjeva | Metoda provjere (Verifikacija) | Prioritet | Povezanost / Napomena |
|:---------- |:---|:---|:---|:---|:---|
| **NFR-01** | Sigurnost | Svi podaci o pacijentima i rezultatima (PB2, PB6) moraju biti kriptovani u mirovanju (**AES-256**) i u tranzitu (**TLS 1.3**). | Skeniranje mrežnog saobraćaja (Wireshark) i audit baze podataka. | **Kritičan** | Osnova za medicinsku povjerljivost. |
| **NFR-02** | Autentifikacija | Pristup sistemu (PB9-PB20) zahtijeva kompleksne lozinke i automatski **session timeout** nakon 15 minuta neaktivnosti. | Ručno testiranje sesije i provjera politike lozinki u kodu. | **Visok** | Sprečava neovlašteni uvid na javnim PC-ovima. |
| **NFR-03** | Dostupnost | Sistem mora biti dostupan **99.9%** vremena. Za stavke poput PB3 i PB6, zastoj ne smije biti duži od 5 min. | Monitoring servera (npr. UptimeRobot) tokom 30 dana. | **Visok** | Medicinske dežure zahtijevaju 24/7 pristup. |
| **NFR-04** | Performanse | Pretraga opreme (PB9, PB10) mora vratiti rezultate za manje od **1.5s** pri bazi od 5,000 stavki. | Load testing (JMeter) sa 50 istovremenih korisnika. | **Srednji** | Brzina rada direktno utiče na izdavanje nalaza. |
| **NFR-05** | Integritet | Svaka promjena statusa (PB7) ili odobrenje (PB6) mora biti trajno zabilježena u **Audit Log** tabeli. | Provjera baze podataka nakon svake administrativne akcije. | **Kritičan** | Neophodno za akreditaciju i pravnu odgovornost. |
| **NFR-06** | Pouzdanost | **RTO** (Recovery Time Objective) manji od 2 sata uz povrat svih podataka (PB4, PB12). | Simulacija kvara i proces vraćanja podataka iz backup-a. | **Visok** | Gubitak podataka uzrokuje zastoj laboratorije. |
| **NFR-07** | Responzivnost | Interfejs kalendara (PB8) mora biti prilagođen za **tablet uređaje** (responsive design). | Testiranje na uređajima različitih rezolucija (Chrome DevTools). | **Srednji** | Laboranti koriste tablete uz medicinske uređaje. |
| **NFR-08** | Skalabilnost | Sistem mora podržati pohranu do **50,000** historijskih rezervacija (PB4) bez pada performansi. | Analiza SQL upita (Explain plan) na velikim setovima podataka. | **Nizak** | Bitno za praćenje životnog vijeka opreme. |


## 3. Dodatno obrazloženje u medicinskom kontekstu

Za razliku od standardnih sistema za inventar, ovaj sistem implementira specifične medicinske standarde:

* **Audit Trail & Odgovornost (PB6):** NFR-05 osigurava da se tačno zna koji administrator je odobrio korištenje uređaja. U slučaju greške u nalazu, sistem pruža neoboriv dokaz o toku rada.
* **Sinhronizacija Održavanja (PB17):** Visoke performanse i dostupnost su ključni jer medicinski analizatori zahtijevaju stalnu komunikaciju sa softverom kako bi se izbjegli zastarjeli podaci.
* **Zaštita Privatnosti:** NFR-02 direktno podržava *Product Vision* (bolja organizacija) osiguravajući da digitalizacija ne ugrozi privatnost pacijenata čiji se uzorci obrađuju.


> ### Napomena
> Prilikom definisanja nefunkcionalnih zahtjeva, izvršio sam detaljno poređenje sa vodećim rješenjima otvorenog koda **Senaite LIMS**. 
> 
>


### Autor
1. [Kemal Mešić](https://github.com/mesicc)


### Literatura korištena za ovaj .md file
[1] SENAITE LIMS - Official Website. Dostupno na: - [Internet](https://www.senaite.com/) <br>
[2] SENAITE Core Repository. GitHub. Dostupno na: [GitHub](https://github.com/senaite/senaite.core)

