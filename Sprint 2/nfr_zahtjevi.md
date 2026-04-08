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

7. **Interoperabilnost (eng. Interoperability)** - Sposobnost sistema da komunicira sa drugim medicinskim softverima i uređajima kroz standardizovane protokole (npr. **HL7**, **FHIR**, **ASTM E1394**). Ključno za razmjenu podataka između LIMS-a, HIS-a (Hospital Information System) i laboratorijskih analizatora.

8. **Održavanje (eng. Maintainability)** - Mjeri koliko je lako modifikovati, ispraviti ili unaprijediti sistem bez uvođenja novih grešaka. Uključuje čistoću koda, pokrivenost testovima i kvalitet dokumentacije.

9. **Usklađenost sa propisima (eng. Compliance)** - Osigurava da sistem zadovoljava zakonske i industrijske standarde poput **GDPR** (EU), **HIPAA** (SAD), **ISO 15189** (medicinske laboratorije) i **ISO/IEC 27001** (sigurnost informacija).

10. **Prenosivost (eng. Portability)** - Sposobnost sistema da radi na različitim operativnim sistemima, bazama podataka i cloud platformama bez većih izmjena.

> **Napomena:** U medicinskom softveru, ovi zahtjevi su često prioritetniji od samih funkcionalnosti jer direktno utiču na sigurnost pacijenata i zakone države.

### 1.2 Zašto su važni u medicinskom sektoru?
U medicinskim sistemima (poput laboratorija), NFR-ovi nisu samo "lijep dodatak", već zakonska i etička obaveza:

1. **Integritet**: Podaci o pacijentu se ne smiju slučajno promijeniti.

2. **Privatnost**: Podaci moraju biti kriptovani jer su zakonski zaštićeni.

3. **Audit Trail**: Svaki ulazak u sistem mora biti zabilježen (ko je šta gledao/mijenjao) zbog pravne odgovornosti.

4. **Sljedivost (Traceability)**: Svaki uzorak, rezultat i izmjena moraju se moći pratiti od trenutka prijema do izdavanja nalaza — zakonski zahtjev za akreditaciju po **ISO 15189**.

5. **Validacija**: Sistem mora proći formalne procese **IQ/OQ/PQ** (Installation/Operational/Performance Qualification) prije puštanja u produkciju.

### 1.3 Primjer iz Senaite LIMS
Ako je funkcionalni zahtjev "Odobravanje rezervacije opreme", prateći NFR-ovi bi bili:

1. **Integritet**: Svako odobrenje se zapisuje u neizbrisiv log (Audit Log).

2. **Sigurnost**: Samo administrator smije vidjeti to dugme.

3. **Performanse**: Akcija se mora procesuirati u realnom vremenu.

4. **Interoperabilnost**: Odobrena rezervacija se automatski sinhronizuje sa kalendarom analizatora putem HL7 poruke.

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
| **NFR-09** | Autorizacija | Sistem mora implementirati **RBAC** (Role-Based Access Control) sa najmanje 4 nivoa pristupa: *Administrator*, *Supervizor*, *Laborant*, *Gost*. Svaka rola mora imati strogo definisane CRUD dozvole nad resursima (PB6, PB7, PB11). | Penetration testing i matrica pristupa (access matrix) za svaku rolu. | **Kritičan** | Sprečava horizontalnu eskalaciju privilegija — laborant ne smije odobravati sopstvene rezervacije. |
| **NFR-10** | Interoperabilnost | Sistem mora podržati razmjenu podataka sa laboratorijskim analizatorima putem **HL7 v2.5** i **ASTM E1394** protokola. Eksport nalaza u **FHIR R4** formatu za PB17. | Integracioni testovi sa simulatorom analizatora (npr. HAPI HL7 simulator). | **Visok** | Bez ovoga, LIMS je izolovano "ostrvo" nepovezano sa ostatkom bolnice. |
| **NFR-11** | Usklađenost | Sistem mora biti usklađen sa **GDPR** članovima 17 (pravo na zaborav), 25 (privacy by design) i 32 (sigurnost obrade), te sa standardom **ISO 15189** za medicinske laboratorije. | Zvanični pravni audit i GDPR DPIA (Data Protection Impact Assessment). | **Kritičan** | Neusklađenost = kazne do 4% godišnjeg prometa firme. |
| **NFR-12** | Održavanje | Kod mora imati minimum **80% test coverage** (unit + integration testovi) i ciklomatsku složenost metoda ispod 10. Svaka javna API ruta mora biti dokumentovana kroz **OpenAPI 3.0** specifikaciju. | SonarQube statička analiza i JaCoCo izvještaj o pokrivenosti. | **Srednji** | Smanjuje "technical debt" i olakšava onboarding novih developera. |
| **NFR-13** | Sljedivost | Svaki laboratorijski uzorak mora imati jedinstveni **UUID** koji se može pratiti kroz sve faze (prijem → analiza → nalaz → arhiva), uključujući vremenske oznake (timestamps) u **UTC** formatu (PB2, PB6, PB17). | Testiranje end-to-end scenarija prijema uzorka i verifikacija lanca događaja u bazi. | **Kritičan** | Obavezno za akreditaciju po ISO 15189 — bez ovoga nalazi nisu pravno validni. |
| **NFR-14** | Backup & DR | Automatski **inkrementalni backup** svakih 6 sati i **puni backup** svakih 24h, sa geografski odvojenom replikacijom. **RPO** (Recovery Point Objective) ne smije prelaziti 1 sat. | Mjesečni Disaster Recovery drill i provjera integriteta backup fajlova. | **Visok** | Gubitak čak i 1 dana podataka o pacijentima je pravno i etički neprihvatljiv. |
| **NFR-15** | Logging & Monitoring | Sistem mora implementirati centralizovano logovanje (npr. **ELK stack** ili **Grafana Loki**) sa alertima u realnom vremenu za kritične događaje (neuspjele prijave, pad servisa, spore upite >3s). | Simulacija incidenta i mjerenje vremena do alerta (MTTD — Mean Time To Detect). | **Visok** | Omogućava proaktivno otkrivanje problema prije nego što ih korisnici prijave. |
| **NFR-16** | Pristupačnost | Interfejs mora zadovoljavati **WCAG 2.1 nivo AA** (kontrast, navigacija tastaturom, screen reader podrška) zbog laboranata sa oštećenjima vida ili motorike. | Automatsko testiranje (axe DevTools) + ručno testiranje sa NVDA screen readerom. | **Srednji** | Zakonska obaveza u EU (*European Accessibility Act*, 2025). |
| **NFR-17** | Prenosivost | Aplikacija mora biti **kontejnerizovana** (Docker) i deployabilna na Linux (Ubuntu 22.04+), sa podrškom za **PostgreSQL 14+** kao primarnu bazu i mogućnošću migracije na cloud (AWS, Azure). | Uspješan deployment na tri različita okruženja (lokalno, staging, cloud). | **Nizak** | Smanjuje "vendor lock-in" i olakšava skaliranje. |
| **NFR-18** | Validacija unosa | Svi korisnički unosi (PB2, PB8) moraju biti validirani i na klijentu i na serveru uz zaštitu od **SQL Injection**, **XSS** i **CSRF** napada. | OWASP ZAP automatizovano skeniranje + ručni penetration test. | **Kritičan** | OWASP Top 10 ranjivosti su najčešći vektor napada na web aplikacije. |
| **NFR-19** | Kapacitet istovremenih korisnika | Sistem mora podržati minimum **200 istovremenih aktivnih korisnika** bez degradacije performansi (response time <2s na 95-tom percentilu). | Stress testing kroz **k6** ili **Gatling** alat sa postupnim povećanjem opterećenja. | **Visok** | Veće laboratorije imaju više smjena koje rade paralelno. |
| **NFR-20** | Lokalizacija | Sistem mora podržavati minimum dva jezika (**bosanski** i **engleski**) sa mogućnošću lakog dodavanja novih jezika kroz **i18n** mehanizam. Svi datumi u **ISO 8601** formatu. | Ručno testiranje prebacivanja jezika i provjera prevoda svih UI stringova. | **Nizak** | Omogućava rad međunarodnih istraživačkih timova i stranih specijalista. |

## 3. Dodatno obrazloženje u medicinskom kontekstu

Za razliku od standardnih sistema za inventar, ovaj sistem implementira specifične medicinske standarde:

* **Audit Trail & Odgovornost (PB6):** NFR-05 i NFR-13 zajedno osiguravaju da se tačno zna koji administrator je odobrio korištenje uređaja i kroz koje faze je uzorak prošao. U slučaju greške u nalazu, sistem pruža neoboriv dokaz o toku rada.
* **Sinhronizacija Održavanja (PB17):** Visoke performanse i dostupnost su ključni jer medicinski analizatori zahtijevaju stalnu komunikaciju sa softverom kako bi se izbjegli zastarjeli podaci. NFR-10 (HL7/FHIR) direktno omogućava ovu sinhronizaciju.
* **Zaštita Privatnosti:** NFR-02 i NFR-11 direktno podržavaju *Product Vision* (bolja organizacija) osiguravajući da digitalizacija ne ugrozi privatnost pacijenata čiji se uzorci obrađuju, uz punu GDPR usklađenost.
* **Kontinuitet poslovanja (NFR-14):** Medicinska laboratorija ne smije stati — backup i disaster recovery strategija garantuju da čak i u slučaju katastrofalnog kvara hardvera, rad se može nastaviti u roku od 2 sata.
* **Pristupačnost kao etički imperativ (NFR-16):** Zdravstveni radnici dolaze iz različitih pozadina i sa različitim sposobnostima; sistem koji isključuje bilo koga od njih je sistem koji indirektno utiče na kvalitet zdravstvene zaštite.

### 3.1 Prioritizacija NFR-ova prema MoSCoW metodi

Da bi tim znao šta implementirati prvo, NFR-ovi se mogu grupisati po MoSCoW prioritetima:

- **Must Have (Kritični za MVP):** NFR-01, NFR-05, NFR-09, NFR-11, NFR-13, NFR-18
- **Should Have (Visoki prioritet):** NFR-02, NFR-03, NFR-06, NFR-10, NFR-14, NFR-15, NFR-19
- **Could Have (Poželjno):** NFR-04, NFR-07, NFR-12, NFR-16
- **Won't Have (Za sljedeće iteracije):** NFR-08, NFR-17, NFR-20

> ### Napomena
> Prilikom definisanja nefunkcionalnih zahtjeva, izvršeno je detaljno poređenje sa vodećim rješenjem otvorenog koda **Senaite LIMS**, kao i analiza zahtjeva standarda **ISO 15189** i **HL7 FHIR** dokumentacije.


### Autori
1. [Kemal Mešić](https://github.com/mesicc)
2. Harun Zukanović (239-ST)


### Literatura korištena za ovaj .md file
[1] SENAITE LIMS - Official Website. Dostupno na: [Internet](https://www.senaite.com/) <br>
[2] SENAITE Core Repository. GitHub. Dostupno na: [GitHub](https://github.com/senaite/senaite.core) <br>
[3] HL7 International - FHIR R4 Specification. Dostupno na: [HL7.org](https://www.hl7.org/fhir/) <br>
[4] ISO 15189:2022 - Medical laboratories — Requirements for quality and competence. <br>
[5] OWASP Top 10 - Web Application Security Risks. Dostupno na: [OWASP.org](https://owasp.org/www-project-top-ten/) <br>
[6] W3C Web Content Accessibility Guidelines (WCAG) 2.1. Dostupno na: [W3C](https://www.w3.org/TR/WCAG21/)
