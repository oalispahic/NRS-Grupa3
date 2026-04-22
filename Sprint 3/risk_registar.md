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

## R-11

**ID:** R-11  
**Kategorija:** Sigurnost / Autentifikacija

**Opis rizika:**  
Postoji rizik od brute-force napada, korištenja slabih lozinki ili kompromitacije korisničkih naloga zbog nedovoljne politike autentifikacije.

**Uzrok:**  
Rizik može nastati ako sistem ne ograničava broj neuspješnih pokušaja prijave, ne zahtijeva dovoljno jake lozinke ili ne prati sumnjivo ponašanje korisnika na login ruti.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je definisati politiku kompleksnosti lozinki, uvesti rate limiting i privremeno zaključavanje naloga nakon više neuspjelih pokušaja, logovati sumnjive prijave i po potrebi razmotriti MFA za administratorske naloge.

**Odgovorna osoba ili uloga:** Security Lead, Backend Lead  
**Status:** Otvoren

---

## R-12

**ID:** R-12  
**Kategorija:** Arhitektura / Dostupnost

**Opis rizika:**  
Postoji rizik da kvar jednog modula ili jednog servera obori cijeli sistem, jer je MVP zasnovan na monolitnoj arhitekturi i jednom serveru bez redundancije.

**Uzrok:**  
Rizik proizlazi iz centralizovanog deployment modela, zajedničkog procesa za više modula i nedostatka failover mehanizama u ranoj fazi projekta.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je uvesti process manager sa automatskim restartom, health check-ove, odvajanje kritičnih poslova u pozadinske radnike gdje je moguće, redovan monitoring resursa i plan za buduću redundanciju ili horizontalno skaliranje.

**Odgovorna osoba ili uloga:** DevOps Lead, Backend Lead  
**Status:** Otvoren

---

## R-13

**ID:** R-13  
**Kategorija:** Sigurnost / Upravljanje ulogama

**Opis rizika:**  
Postoji rizik da promjena korisničke uloge ili odjava ne budu odmah efektivne zbog stateless JWT pristupa, pa korisnik privremeno zadrži stara ovlaštenja.

**Uzrok:**  
Ovaj rizik proizlazi iz činjenice da token može ostati važeći do isteka čak i ako je korisniku u međuvremenu promijenjena uloga ili je nalog deaktiviran.

**Vjerovatnoća:** Srednja  
**Uticaj:** Srednji do visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je koristiti kratkotrajne tokene, mehanizam refresh tokena, opcionalnu blacklistu za kritične situacije i dodatnu provjeru statusa korisnika za visoko rizične administrativne akcije.

**Odgovorna osoba ili uloga:** Security Lead, Backend Lead  
**Status:** Otvoren

---

## R-14

**ID:** R-14  
**Kategorija:** Performanse / Skala podataka

**Opis rizika:**  
Postoji rizik da pretraga, filtriranje, dashboard i izvještaji postanu spori kako broj opreme, rezervacija i audit log zapisa raste.

**Uzrok:**  
Rizik može nastati zbog nedostatka indeksa, neoptimizovanih JOIN upita, neefikasne paginacije ili generisanja teških izvještaja direktno nad produkcionim tabelama bez optimizacije.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je planirati indeksiranje od početka, koristiti paginaciju i filtriranje na serveru, profilisati upite, odvojiti teške izvještaje u asinhrone procese i provoditi load testove na realističnim setovima podataka.

**Odgovorna osoba ili uloga:** Backend Lead, DBA / DevOps, QA Lead  
**Status:** Otvoren

---

## R-15

**ID:** R-15  
**Kategorija:** Operacije / Monitoring

**Opis rizika:**  
Postoji rizik da tim prekasno primijeti incidente, spor rad sistema, neuspjele backup-e ili rast sigurnosnih prijetnji jer monitoring i alerting nisu dovoljno razvijeni.

**Uzrok:**  
Rizik nastaje kada se oslanja isključivo na ručno uočavanje problema ili prijave korisnika, bez centralizovanog prikupljanja logova, metrika i automatskih upozorenja.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je uvesti centralizovano logovanje, dashboard za metrike, alarme za pad servisa, greške login-a, spore upite i neuspjele backup-e, te definisati procedure reagovanja na incidente.

**Odgovorna osoba ili uloga:** DevOps Lead, Security Lead  
**Status:** Otvoren

---

## R-16

**ID:** R-16  
**Kategorija:** Kvalitet / Testiranje

**Opis rizika:**  
Postoji rizik da kritične putanje sistema ne budu dovoljno testirane, zbog čega ozbiljne greške mogu ostati neotkrivene do kasnih faza razvoja ili produkcije.

**Uzrok:**  
Ovaj rizik može nastati zbog ograničenog vremena, nedovoljno definisanog test plana, oslanjanja samo na ručno testiranje ili manjka automatizovanih testova za RBAC, rezervacije, audit log i rad sa zalihama.

**Vjerovatnoća:** Visoka  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je prioritetno automatizovati testove za najrizičnije scenarije, uvesti minimalni prag test coverage-a, testirati konkurentne scenarije rezervacija i napraviti jasnu vezu između acceptance kriterija i test slučajeva.

**Odgovorna osoba ili uloga:** QA Lead, Backend Lead, Frontend Lead  
**Status:** Otvoren

---

## R-17

**ID:** R-17  
**Kategorija:** Dokumentacija / Tehnička usklađenost

**Opis rizika:**  
Postoji rizik od konfuzije u timu i pogrešnog planiranja implementacije zato što tehnička dokumentacija nije u potpunosti usklađena oko tehnološkog stacka i alata za testiranje.

**Uzrok:**  
Rizik nastaje kada jedan dio dokumentacije opisuje Node.js/Express/React/PostgreSQL arhitekturu, a drugi koristi terminologiju i alate karakteristične za Spring Boot, JPA, Mockito ili JaCoCo. To može uzrokovati pogrešne procjene zadataka, pogrešan izbor alata i neujednačen rad tima.

**Vjerovatnoća:** Visoka  
**Uticaj:** Srednji  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je hitno uskladiti svu projektnu dokumentaciju sa stvarno odabranim stackom, jasno označiti koji dokument je “source of truth”, ukloniti zastarjele reference i potvrditi tooling za razvoj i testiranje na nivou cijelog tima.

**Odgovorna osoba ili uloga:** Arhitekta sistema, Documentation Lead, QA Lead  
**Status:** Otvoren

---

## R-18

**ID:** R-18  
**Kategorija:** Tehničke odluke / Arhitektura

**Opis rizika:**  
Postoji rizik da ključne tehničke odluke budu donesene prekasno ili nedovoljno jasno, što može usporiti razvoj i dovesti do naknadnih prepravki.

**Uzrok:**  
Otvorena pitanja oko refresh token strategije, storage-a slika opreme, notifikacija, export biblioteka, deployment modela i load testing pristupa mogu ostati neriješena duže nego što je zdravo za projekat.

**Vjerovatnoća:** Srednja  
**Uticaj:** Srednji  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je evidentirati sva otvorena tehnička pitanja, postaviti rokove za odluke, dokumentovati trade-offe i zabraniti paralelnu implementaciju više kontradiktornih pristupa bez arhitektonske odluke.

**Odgovorna osoba ili uloga:** Arhitekta sistema, Backend Lead, Frontend Lead  
**Status:** Otvoren

---

## R-19

**ID:** R-19  
**Kategorija:** Podaci / Migracija

**Opis rizika:**  
Postoji rizik da inicijalni unos ili migracija podataka o opremi, korisnicima i zalihama iz postojećih evidencija bude netačna ili nepotpuna.

**Uzrok:**  
Rizik može nastati ako postojeći podaci dolaze iz Excel tabela, ručnih evidencija ili neformalnih spiskova sa nekonzistentnim nazivima, duplikatima ili nedostajućim poljima.

**Vjerovatnoća:** Visoka  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je definisati šablone za import, validirati obavezna polja, provoditi čišćenje podataka prije uvoza, raditi probni import na testnom okruženju i imenovati osobu odgovornu za poslovnu validaciju migriranih podataka.

**Odgovorna osoba ili uloga:** Product Owner, Backend Lead, Domenski vlasnik procesa  
**Status:** Otvoren

---

## R-20

**ID:** R-20  
**Kategorija:** Rezervacije / Datum i vrijeme

**Opis rizika:**  
Postoji rizik od pogrešnog tumačenja datuma, vremena i vremenskih zona, što može uzrokovati rezervacije u pogrešnom terminu, posebno pri eksportu, izvještajima ili radu na više uređaja.

**Uzrok:**  
Rizik može nastati zbog neujednačenog formata datuma između frontenda, backenda i baze, lokalnih postavki preglednika, server timezone-a ili nekonzistentne upotrebe UTC/lokalnog vremena.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je standardizovati format datuma i vremena, čuvati vrijeme u UTC formatu gdje je prikladno, jasno prikazivati lokalno vrijeme korisniku i testirati granične scenarije kao što su prelaz dana, promjene termina i eksport podataka.

**Odgovorna osoba ili uloga:** Backend Lead, Frontend Lead, QA Lead  
**Status:** Otvoren

---

## R-21

**ID:** R-21  
**Kategorija:** Notifikacije / Workflow

**Opis rizika:**  
Postoji rizik da korisnici ne dobiju pravovremeno obavještenje o promjeni statusa rezervacije, održavanju opreme ili niskim zalihama, što može poremetiti rad laboratorije.

**Uzrok:**  
Rizik proizlazi iz polling pristupa u MVP-u, mogućeg kašnjenja u obradi notifikacija, nedovoljne preglednosti notifikacija u interfejsu ili nepostojanja alternativnih kanala obavještavanja.

**Vjerovatnoća:** Srednja  
**Uticaj:** Srednji  
**Prioritet rizika:** Srednji do visok

**Plan mitigacije:**  
Potrebno je definisati jasna SLA očekivanja za notifikacije, prikazivati vidljive statuse u aplikaciji i periodično osvježavati podatke. Za kritične događaje treba planirati email ili drugi dodatni kanal obavještavanja u kasnijim iteracijama.

**Odgovorna osoba ili uloga:** Frontend Lead, Backend Lead, Product Owner  
**Status:** Otvoren

---

## R-22

**ID:** R-22  
**Kategorija:** Integritet podataka / Oprema

**Opis rizika:**  
Postoji rizik da brisanje ili arhiviranje opreme sa aktivnim ili budućim rezervacijama naruši integritet podataka i ostavi “viseće” rezervacije bez validne reference.

**Uzrok:**  
Rizik nastaje ako poslovna pravila i database ograničenja ne blokiraju takvu operaciju ili ako administrator nema dovoljno jasan pregled posljedica prije potvrde brisanja.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je zabraniti brisanje opreme sa aktivnim ili budućim rezervacijama, koristiti foreign key ograničenja i preferirati “soft delete” ili arhiviranje. Također, treba korisniku prikazati jasnu poruku sa listom zavisnih rezervacija.

**Odgovorna osoba ili uloga:** Backend Lead, DBA  
**Status:** Otvoren

---


**Odgovorna osoba ili uloga:** Security Lead, Backend Lead  
**Status:** Otvoren

---

## R-23

**ID:** R-23  
**Kategorija:** Master podaci / Kvalitet evidencije

**Opis rizika:**  
Postoji rizik od duplih serijskih brojeva, nekompletnih tehničkih podataka ili nekonzistentnih naziva opreme, što može otežati pretragu, rezervaciju i održavanje.

**Uzrok:**  
Rizik može nastati zbog nepostojanja obaveznih polja, nedostatka jedinstvenih ograničenja u bazi ili ručnog unosa bez jasnih pravila imenovanja.

**Vjerovatnoća:** Visoka  
**Uticaj:** Srednji  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je definisati obavezna polja za opremu, uvesti unique constraint za serijski broj gdje je primjenjivo, standardizovati šifre i nazive opreme i provoditi periodične revizije kvaliteta master podataka.

**Odgovorna osoba ili uloga:** Product Owner, Backend Lead, Administrator sistema  
**Status:** Otvoren

---

## R-24

**ID:** R-24  
**Kategorija:** Privatnost / Povjerljivost

**Opis rizika:**  
Postoji rizik da audit log, izvještaji ili istorija aktivnosti sadrže više osjetljivih podataka nego što je potrebno i da budu dostupni širem krugu korisnika nego što bi smjeli.

**Uzrok:**  
Rizik nastaje kada se u logovima čuvaju osjetljivi detalji bez potrebe, kada nisu definisana pravila maskiranja podataka ili kada pristup logovima nije strogo ograničen na administratore.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je minimizirati količinu osjetljivih podataka u logovima, primijeniti maskiranje gdje je moguće, jasno ograničiti pristup audit logu i definisati politiku retention-a i brisanja log zapisa u skladu sa regulatornim zahtjevima.

**Odgovorna osoba ili uloga:** Security / Compliance Lead, Backend Lead  
**Status:** Otvoren

---

## R-25

**ID:** R-25  
**Kategorija:** Compliance / Regulatorni zahtjevi

**Opis rizika:**  
Postoji rizik da sistem ne ispuni zahtjeve GDPR-a, ISO 15189 ili drugih relevantnih sigurnosnih i laboratorijskih standarda, što može dovesti do pravnih i reputacijskih posljedica.

**Uzrok:**  
Rizik nastaje kada compliance zahtjevi nisu prevedeni u konkretne tehničke i procesne kontrole, ili kada se regulatorni aspekt provjerava tek pred kraj projekta.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Kritičan

**Plan mitigacije:**  
Potrebno je rano mapirati sve regulatorne zahtjeve na konkretne funkcionalne i nefunkcionalne kontrole, uključiti compliance provjeru u review cikluse i voditi trag dokaza o implementaciji sigurnosti, sljedivosti i privatnosti.

**Odgovorna osoba ili uloga:** Compliance Lead, Product Owner, Security Lead  
**Status:** Otvoren

---

## R-26

**ID:** R-26  
**Kategorija:** Upotrebljivost / Pristupačnost

**Opis rizika:**  
Postoji rizik da sistem bude težak za korištenje laborantima i administratorima, što može povećati broj operativnih grešaka, usporiti rad i smanjiti prihvaćenost rješenja.

**Uzrok:**  
Rizik može nastati zbog složenih formi, loše hijerarhije informacija, nedovoljne prilagođenosti tabletima ili nepridržavanja pristupačnosti i WCAG smjernica.

**Vjerovatnoća:** Srednja  
**Uticaj:** Srednji  
**Prioritet rizika:** Srednji do visok

**Plan mitigacije:**  
Potrebno je uključiti korisnike u rane UX provjere, provoditi usability testove, pojednostaviti najčešće radnje i provjeravati pristupačnost interfejsa automatskim i ručnim metodama.

**Odgovorna osoba ili uloga:** UX / Frontend Lead, Product Owner, QA Lead  
**Status:** Otvoren

---

## R-27

**ID:** R-27  
**Kategorija:** Održavanje / Sigurnost rada

**Opis rizika:**  
Postoji rizik da servisni kartoni, historija kvarova i podaci o kalibraciji opreme budu nepotpuni ili neažurni, pa se oprema koristi iako nije tehnički spremna.

**Uzrok:**  
Rizik nastaje kada održavanje nije integrisano u svakodnevni workflow, kada ne postoje obavezna polja za servisne intervencije ili kada nema podsjetnika za periodične preglede i kalibracije.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je uvesti obavezne evidencije servisa i kalibracije, definisati statusne blokade za opremu kojoj je istekao servisni interval i redovno provjeravati usklađenost stvarnog stanja sa servisnim kartonima.

**Odgovorna osoba ili uloga:** Service Lead, Administrator sistema, Product Owner  
**Status:** Otvoren

---

## R-28

**ID:** R-28  
**Kategorija:** Tehnički dug / Ovisnosti

**Opis rizika:**  
Postoji rizik da biblioteke, framework-i i zavisnosti koje aplikacija koristi sadrže poznate sigurnosne ranjivosti ili postanu zastarjele tokom razvoja.

**Uzrok:**  
Rizik može nastati zbog izostanka redovnog ažuriranja paketa, nekontrolisanog dodavanja ovisnosti ili nedostatka automatizovanog skeniranja zavisnosti.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je uvesti dependency scanning, redovne sigurnosne revizije paketa, politiku minimalnog broja eksternih biblioteka i planirano ažuriranje ključnih ovisnosti između sprintova.

**Odgovorna osoba ili uloga:** Backend Lead, Frontend Lead, Security Lead  
**Status:** Otvoren

---

## R-29

**ID:** R-29  
**Kategorija:** Tim / Koordinacija

**Opis rizika:**  
Postoji rizik od usporene koordinacije, nejasnog donošenja odluka i dupliranja posla zato što tim radi zajednički bez formalno imenovanog vođe, a uključuje veći broj članova.

**Uzrok:**  
Rizik nastaje kada nije jasno ko finalno donosi odluku u slučaju neslaganja, ko prati blokere i ko osigurava da tehničke i dokumentacijske aktivnosti ostanu usklađene između više paralelnih zadataka.

**Vjerovatnoća:** Srednja  
**Uticaj:** Srednji  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je formalno definisati ko je odgovoran za koordinaciju sprinta, tehničke odluke, kvalitet i dokumentaciju, te koristiti kratke sedmične sync sastanke sa jasno evidentiranim zaključcima i vlasnicima akcija.

**Odgovorna osoba ili uloga:** Projektni koordinator / cijeli tim  
**Status:** Otvoren

---

## R-30

**ID:** R-30  
**Kategorija:** Tim / Kontinuitet znanja

**Opis rizika:**  
Postoji rizik da ključna znanja o arhitekturi, testiranju ili domenskim pravilima ostanu koncentrisana kod malog broja članova tima, što povećava zavisnost od pojedinaca.

**Uzrok:**  
Rizik nastaje kada dokumentacija nije dovoljno detaljna, kada nema code review kulture i kada samo jedan ili dva člana dubinski razumiju određeni modul ili proces.

**Vjerovatnoća:** Srednja  
**Uticaj:** Srednji  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je dijeliti znanje kroz code review, zajedničke walkthrough-e, kratke interne demo sesije i dokumentovati ključne odluke, API-je i poslovna pravila tako da svaki kritični modul ima najmanje dvije osobe koje ga razumiju.

**Odgovorna osoba ili uloga:** Arhitekta sistema, QA Lead, Documentation Lead  
**Status:** Otvoren

---

## R-31

**ID:** R-31  
**Kategorija:** Izvještaji / Export podataka

**Opis rizika:**  
Postoji rizik da PDF/Excel export i izvještaji prikažu pogrešne ili previše široke podatke, što može dovesti do curenja osjetljivih informacija ili donošenja pogrešnih odluka.

**Uzrok:**  
Rizik može nastati zbog loše implementiranih filtera, nedosljedne provjere uloga, grešaka pri mapiranju podataka u export format ili nejasno definisanih poslovnih pravila za izvještavanje.

**Vjerovatnoća:** Srednja  
**Uticaj:** Visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je striktno kontrolisati koje role imaju pravo na koje izvještaje, testirati export nad različitim skupovima podataka, uvesti preview prije preuzimanja i jasno evidentirati generisanje osjetljivih izvještaja u audit log.

**Odgovorna osoba ili uloga:** Backend Lead, QA Lead, Security Lead  
**Status:** Otvoren

---

## R-32

**ID:** R-32  
**Kategorija:** Inventar / Poslovna pravila

**Opis rizika:**  
Postoji rizik da minimalni pragovi zaliha, pravila upozorenja i obračun potrošnje budu pogrešno podešeni, pa sistem generiše lažne alarme ili propusti stvarni manjak repromaterijala.

**Uzrok:**  
Rizik može nastati ako pragovi nisu definisani po tipu materijala, ako se koriste generičke vrijednosti bez domenske provjere ili ako nije jasno kako se trošak i potrošnja vežu za određenu opremu i radni proces.

**Vjerovatnoća:** Srednja  
**Uticaj:** Srednji do visok  
**Prioritet rizika:** Visok

**Plan mitigacije:**  
Potrebno je validirati pragove zaliha sa domenskim stručnjacima, omogućiti pregled i odobravanje pravila obračuna, periodično revidirati potrošnju po uređaju i testirati alarmne scenarije na realnim ili simuliranim podacima.

**Odgovorna osoba ili uloga:** Product Owner, Domenski vlasnik procesa, Backend Lead  
**Status:** Otvoren

---

