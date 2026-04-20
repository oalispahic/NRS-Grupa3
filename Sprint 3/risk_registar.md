# Risk Registar

## Sistem za upravljanje medicinskom laboratorijskom opremom
---

## R-01

**ID:** R-01  
**Kategorija:** Rezervacije / Poslovna logika

**Opis rizika:**  
Postoji rizik da dođe do preklapanja rezervacija za istu laboratorijsku opremu u istom vremenskom terminu. Takva situacija može izazvati probleme u organizaciji rada laboratorije, nezadovoljstvo korisnika i smanjenu efikasnost korištenja resursa.

**Uzrok:**  
Ovaj rizik može nastati ako sistem ne provjerava dovoljno precizno dostupnost termina prije kreiranja ili odobravanja rezervacije. Dodatni uzrok može biti izostanak mehanizama za zaključavanje zapisa u bazi podataka kada više korisnika istovremeno pokušava rezervisati istu opremu.

**Vjerovatnoća:** Visoka  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je implementirati automatsku provjeru konflikta termina prije spremanja svake rezervacije, kao i mehanizme transakcija i zaključavanja u bazi podataka. Pored toga, potrebno je provesti integraciona i sistemska testiranja za scenarije istovremenih rezervacija, te korisnicima jasno prikazivati zauzete i slobodne termine kako bi se smanjila mogućnost greške.

**Odgovorna osoba ili uloga:** Backend Lead, QA Lead  
**Status:** Otvoren

---

## R-02

**ID:** R-02  
**Kategorija:** Sigurnost / Autorizacija

**Opis rizika:**  
Postoji rizik da neovlašteni korisnici dobiju pristup administratorskim funkcijama ili mogućnost odobravanja i odbijanja rezervacija. Takva situacija može ugroziti sigurnost sistema, integritet podataka i povjerenje korisnika u aplikaciju.

**Uzrok:**  
Rizik može nastati zbog neadekvatno implementirane autentifikacije i autorizacije, nejasno definisanih korisničkih uloga ili nedovoljno testiranih pravila pristupa. Problem može dodatno biti izražen ako sistem ne ograničava pristup osjetljivim funkcijama na backend nivou.

**Vjerovatnoća:** Visoka  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je jasno definisati korisničke uloge i dozvole za svaku funkcionalnost sistema. Također, potrebno je implementirati provjeru ovlaštenja na svim osjetljivim dijelovima sistema, izvršiti sigurnosno testiranje i redovno provjeravati da li korisnici imaju pristup isključivo funkcijama koje odgovaraju njihovoj ulozi.

**Odgovorna osoba ili uloga:** Security Lead, Backend Lead  
**Status:** Otvoren

---

## R-03

**ID:** R-03  
**Kategorija:** Dostupnost / Disaster Recovery

**Opis rizika:**  
Postoji rizik od gubitka podataka ili duže nedostupnosti sistema, što može ozbiljno narušiti svakodnevni rad laboratorije. U slučaju prekida rada, korisnici ne bi mogli pregledati opremu, upravljati rezervacijama niti pratiti statuse uređaja.

**Uzrok:**  
Ovaj rizik može biti posljedica nedovoljno pouzdanog hosting okruženja, nepostojanja adekvatnih backup mehanizama ili neprovjerenog plana oporavka sistema nakon greške ili pada servera. Problem se dodatno povećava ako se backup pravi neredovno ili ako se nikada ne testira povrat podataka.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Neophodno je uspostaviti redovne automatske backup-e baze podataka i aplikacionih podataka, te periodično testirati postupak vraćanja podataka iz backup-a. Pored toga, potrebno je uvesti monitoring dostupnosti sistema, definisati plan oporavka nakon incidenta i jasno odrediti odgovorne osobe za reagovanje u slučaju prekida rada.

**Odgovorna osoba ili uloga:** DevOps / IT Administrator  
**Status:** Otvoren

---

## R-04

**ID:** R-04  
**Kategorija:** Audit / Usklađenost

**Opis rizika:**  
Postoji rizik da sistem neće imati potpun i pouzdan audit trail, odnosno zapis o svim važnim akcijama koje su korisnici izvršili u aplikaciji. To može otežati praćenje grešaka, sigurnosnih incidenata i provjeru odgovornosti za izmjene u sistemu.

**Uzrok:**  
Rizik nastaje kada sistem ne evidentira dovoljno detaljno prijave korisnika, promjene statusa opreme, odobravanja rezervacija i druge administrativne akcije. Također, problem može biti uzrokovan nejasno definisanim pravilima o tome koje aktivnosti se moraju logovati i koliko dugo se logovi čuvaju.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je definisati jasna pravila za audit log i osigurati da sve važne korisničke i administrativne aktivnosti budu automatski evidentirane. Također, potrebno je redovno pregledati logove, zaštititi ih od neovlaštenih izmjena i osigurati usklađenost sistema sa sigurnosnim i regulatornim zahtjevima.

**Odgovorna osoba ili uloga:** Security / Compliance Lead, Backend Lead  
**Status:** Otvoren

---

## R-05

**ID:** R-05  
**Kategorija:** Oprema / Statusi

**Opis rizika:**  
Postoji rizik da laboratorijska oprema u sistemu bude pogrešno označena kao dostupna, iako je u stvarnosti na održavanju, van upotrebe ili servisno blokirana. Takva greška može dovesti do pogrešnih rezervacija, prekida rada i dodatnih organizacionih problema u laboratoriji.

**Uzrok:**  
Rizik može nastati zbog neusklađenosti između procesa održavanja opreme i njenog statusa u sistemu. Problem se može javiti i ako ne postoje jasno definisana pravila za promjenu statusa opreme ili ako se status ne ažurira pravovremeno nakon servisa, kvara ili povlačenja opreme iz upotrebe.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je jasno definisati sve moguće statuse opreme i pravila prelaska iz jednog statusa u drugi. Također, sistem treba automatski blokirati rezervaciju opreme koja je označena kao nedostupna, a korisnicima prikazivati jasan razlog nedostupnosti kako bi imali tačne informacije prilikom planiranja rada.

**Odgovorna osoba ili uloga:** Product Owner, Backend Lead  
**Status:** Otvoren

---

## R-06

**ID:** R-06  
**Kategorija:** Inventar / Podaci

**Opis rizika:**  
Postoji rizik da sistem prikazuje netačne podatke o potrošnji repromaterijala i stanju zaliha. To može dovesti do pogrešnog planiranja nabavke, nestašice materijala ili prekomjernog naručivanja.

**Uzrok:**  
Ovaj rizik može biti uzrokovan ručnim unosom bez validacije, nepravilno implementiranom logikom obračuna potrošnje ili neusklađenošću između stvarnog stanja u laboratoriji i podataka evidentiranih u sistemu. Dodatni problem može nastati ako korisnici ne unose podatke dosljedno i na vrijeme.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je uvesti validaciju unosa i automatske kontrole konzistentnosti podataka. Pored toga, preporučuje se testiranje logike obračuna potrošnje, redovno poređenje sistemskih i stvarnih zaliha, kao i definisanje odgovornosti za ažuriranje i provjeru ovih podataka.

**Odgovorna osoba ili uloga:** Backend Lead, QA Lead, Domenski vlasnik procesa  
**Status:** Otvoren

---

## R-07

**ID:** R-07  
**Kategorija:** Upravljanje zahtjevima / Scope

**Opis rizika:**  
Postoji rizik od širenja obima projekta i kašnjenja u realizaciji zbog nejasnih poslovnih pravila i otvorenih pitanja u zahtjevima. Ovakva situacija može dovesti do dodatnih izmjena tokom razvoja, probijanja rokova i otežanog planiranja sprintova.

**Uzrok:**  
Rizik nastaje kada ključne funkcionalnosti nisu dovoljno precizno definisane, na primjer pravila odobravanja rezervacija, mogućnosti otkazivanja, detalji prikaza opreme ili način upravljanja statusima. Ako takva pitanja ostanu nerazriješena do početka implementacije, vrlo je vjerovatno da će tim naknadno mijenjati zahtjeve.

**Vjerovatnoća:** Visoka  
**Uticaj:** Srednji  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je prije početka implementacije razjasniti otvorena pitanja sa stakeholderima i dopuniti user storyje i acceptance kriterije. Također, korisno je voditi evidenciju donesenih odluka, formalno potvrđivati scope po sprintu i ograničiti izmjene zahtjeva nakon početka razvoja osim u opravdanim slučajevima.

**Odgovorna osoba ili uloga:** Product Owner, Scrum Master / Projektni koordinator  
**Status:** Otvoren

---

## R-08

**ID:** R-08  
**Kategorija:** Performanse / UX

**Opis rizika:**  
Postoji rizik da sistem neće zadovoljiti zahtjeve performansi i upotrebljivosti, posebno pri radu sa većim brojem korisnika, većim brojem rezervacija i pristupom sa različitih uređaja. To može negativno uticati na korisničko iskustvo i smanjiti efikasnost rada u laboratoriji.

**Uzrok:**  
Rizik može nastati zbog neoptimizovanih upita prema bazi podataka, nedovoljno testiranog rada pod opterećenjem ili neadekvatno prilagođenog korisničkog interfejsa za različite veličine ekrana. Problem je izraženiji ako se performanse prate tek pri kraju razvoja umjesto od ranijih faza projekta.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je provoditi performance i load testove tokom razvoja, optimizovati rad sa bazom podataka i definisati prihvatljive granice vremena odziva sistema. Također, potrebno je testirati korisnički interfejs na desktop, tablet i mobilnim uređajima kako bi sistem ostao pregledan, responzivan i jednostavan za korištenje u svim relevantnim scenarijima.

**Odgovorna osoba ili uloga:** Frontend Lead, Backend Lead, QA Lead  
**Status:** Otvoren

---

## R-09

**ID:** R-09  
**Kategorija:** Sigurnost / Sesije

**Opis rizika:**  
Postoji rizik da JWT token ili korisnička sesija budu kompromitovani, što može omogućiti preuzimanje korisničkog naloga i neovlašten pristup osjetljivim funkcijama sistema.

**Uzrok:**  
Rizik može nastati zbog slabe zaštite tokena na klijentu, neadekvatnog session timeout-a, nedostatka HTTPS-a, curenja tokena kroz logove ili nepažljivog rukovanja autentifikacijskim podacima na javnim ili dijeljenim računarima u laboratoriji.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je koristiti isključivo HTTPS, kratki životni vijek tokena, sigurnu pohranu tokena, automatski session timeout nakon neaktivnosti i reviziju pristupa nakon promjene lozinke ili sumnjive aktivnosti. Dodatno, potrebno je osigurati da se tokeni nikada ne loguju niti prikazuju kroz debug izlaze.

**Odgovorna osoba ili uloga:** Security Lead, Frontend Lead, Backend Lead  
**Status:** Otvoren

---

## R-10

**ID:** R-10  
**Kategorija:** Sigurnost / Validacija unosa

**Opis rizika:**  
Postoji rizik od uspješnih SQL Injection, XSS ili CSRF napada nad sistemom, što može dovesti do kompromitacije podataka, izmjene zapisa ili potpunog preuzimanja dijela aplikacije.

**Uzrok:**  
Rizik nastaje kada validacija i sanitizacija ulaza nije dosljedno implementirana na svim API rutama i korisničkim formama. Posebno su rizični moduli za login, upravljanje opremom, komentare, izvještaje i pretragu.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je implementirati server-side validaciju svih ulaza, koristiti parametrizovane upite i ORM/Query Builder mehanizme, uvesti escaping izlaza na frontendu, CSRF zaštitu gdje je primjenjivo, sigurnosne HTTP headere i redovno OWASP sigurnosno testiranje.

**Odgovorna osoba ili uloga:** Security Lead, Backend Lead  
**Status:** Otvoren

---
