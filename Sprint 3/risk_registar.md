## R-01

**ID:** R-01

**Opis rizika:**
Postoji rizik da dođe do preklapanja rezervacija za istu laboratorijsku opremu u istom vremenskom terminu. Takva situacija može izazvati probleme u organizaciji rada laboratorije, nezadovoljstvo korisnika i smanjenu efikasnost korištenja resursa.

**Uzrok:**
Ovaj rizik može nastati ako sistem ne provjerava dovoljno precizno dostupnost termina prije kreiranja ili odobravanja rezervacije. Dodatni uzrok može biti izostanak mehanizama za zaključavanje zapisa u bazi podataka kada više korisnika istovremeno pokušava rezervisati istu opremu.

**Vjerovatnoća:** Visoka <br>
**Uticaj:** Visok <br>
**Prioritet rizika:** Kritičan <br>

**Plan mitigacije:**
Potrebno je implementirati automatsku provjeru konflikta termina prije spremanja svake rezervacije, kao i mehanizme transakcija i zaključavanja u bazi podataka. Pored toga, potrebno je provesti integraciona i sistemska testiranja za scenarije istovremenih rezervacija, te korisnicima jasno prikazivati zauzete i slobodne termine kako bi se smanjila mogućnost greške.

**Odgovorna osoba ili uloga:** Backend Lead, QA Lead

**Status:** Otvoren

---

## R-02

**ID:** R-02

**Opis rizika:**
Postoji rizik da neovlašteni korisnici dobiju pristup administratorskim funkcijama ili mogućnost odobravanja i odbijanja rezervacija. Takva situacija može ugroziti sigurnost sistema, integritet podataka i povjerenje korisnika u aplikaciju.

**Uzrok:**
Rizik može nastati zbog neadekvatno implementirane autentifikacije i autorizacije, nejasno definisanih korisničkih uloga ili nedovoljno testiranih pravila pristupa. Problem može dodatno biti izražen ako sistem ne ograničava pristup osjetljivim funkcijama na backend nivou.

**Vjerovatnoća:** Visoka <br>
**Uticaj:** Visok <br>
**Prioritet rizika:** Kritičan <br>

**Plan mitigacije:**
Potrebno je jasno definisati korisničke uloge i dozvole za svaku funkcionalnost sistema. Također, potrebno je implementirati provjeru ovlaštenja na svim osjetljivim dijelovima sistema, izvršiti sigurnosno testiranje i redovno provjeravati da li korisnici imaju pristup isključivo funkcijama koje odgovaraju njihovoj ulozi.

**Odgovorna osoba ili uloga:** Security Lead, Backend Lead

**Status:** Otvoren

---

## R-03

**ID:** R-03

**Opis rizika:**
Postoji rizik od gubitka podataka ili duže nedostupnosti sistema, što može ozbiljno narušiti svakodnevni rad laboratorije. U slučaju prekida rada, korisnici ne bi mogli pregledati opremu, upravljati rezervacijama niti pratiti statuse uređaja.

**Uzrok:**
Ovaj rizik može biti posljedica nedovoljno pouzdanog hosting okruženja, nepostojanja adekvatnih backup mehanizama ili neprovjerenog plana oporavka sistema nakon greške ili pada servera. Problem se dodatno povećava ako se backup pravi neredovno ili ako se nikada ne testira povrat podataka.

**Vjerovatnoća:** Srednja <br>
**Uticaj:** Visok <br>
**Prioritet rizika:** Kritičan <br>

**Plan mitigacije:**
Neophodno je uspostaviti redovne automatske backup-e baze podataka i aplikacionih podataka, te periodično testirati postupak vraćanja podataka iz backup-a. Pored toga, potrebno je uvesti monitoring dostupnosti sistema, definisati plan oporavka nakon incidenta i jasno odrediti odgovorne osobe za reagovanje u slučaju prekida rada.

**Odgovorna osoba ili uloga:** DevOps / IT Administrator

**Status:** Otvoren

---
## R-04

**ID:** R-04

**Opis rizika:**
Postoji rizik da sistem neće imati potpun i pouzdan audit trail, odnosno zapis o svim važnim akcijama koje su korisnici izvršili u aplikaciji. To može otežati praćenje grešaka, sigurnosnih incidenata i provjeru odgovornosti za izmjene u sistemu.

**Uzrok:**
Rizik nastaje kada sistem ne evidentira dovoljno detaljno prijave korisnika, promjene statusa opreme, odobravanja rezervacija i druge administrativne akcije. Također, problem može biti uzrokovan nejasno definisanim pravilima o tome koje aktivnosti se moraju logovati i koliko dugo se logovi čuvaju.

**Vjerovatnoća:** Srednja <br>
**Uticaj:** Visok <br>
**Prioritet rizika:** Kritičan <br>

**Plan mitigacije:**
Potrebno je definisati jasna pravila za audit log i osigurati da sve važne korisničke i administrativne aktivnosti budu automatski evidentirane. Također, potrebno je redovno pregledati logove, zaštititi ih od neovlaštenih izmjena i osigurati usklađenost sistema sa sigurnosnim i regulatornim zahtjevima.

**Odgovorna osoba ili uloga:** Security / Compliance Lead, Backend Lead <br>
**Status:** Otvoren

---

## R-05

**ID:** R-05

**Opis rizika:**
Postoji rizik da laboratorijska oprema u sistemu bude pogrešno označena kao dostupna, iako je u stvarnosti na održavanju, van upotrebe ili servisno blokirana. Takva greška može dovesti do pogrešnih rezervacija, prekida rada i dodatnih organizacionih problema u laboratoriji.

**Uzrok:**
Rizik može nastati zbog neusklađenosti između procesa održavanja opreme i njenog statusa u sistemu. Problem se može javiti i ako ne postoje jasno definisana pravila za promjenu statusa opreme ili ako se status ne ažurira pravovremeno nakon servisa, kvara ili povlačenja opreme iz upotrebe.

**Vjerovatnoća:** Srednja <br>
**Uticaj:** Visok <br>
**Prioritet rizika:** Visok <br>

**Plan mitigacije:**
Potrebno je jasno definisati sve moguće statuse opreme i pravila prelaska iz jednog statusa u drugi. Također, sistem treba automatski blokirati rezervaciju opreme koja je označena kao nedostupna, a korisnicima prikazivati jasan razlog nedostupnosti kako bi imali tačne informacije prilikom planiranja rada.

**Odgovorna osoba ili uloga:** Product Owner, Backend Lead <br>
**Status:** Otvoren

---

## R-06

**ID:** R-06

**Opis rizika:**
Postoji rizik da sistem prikazuje netačne podatke o potrošnji repromaterijala i stanju zaliha. To može dovesti do pogrešnog planiranja nabavke, nestašice materijala ili prekomjernog naručivanja.

**Uzrok:**
Ovaj rizik može biti uzrokovan ručnim unosom bez validacije, nepravilno implementiranom logikom obračuna potrošnje ili neusklađenošću između stvarnog stanja u laboratoriji i podataka evidentiranih u sistemu. Dodatni problem može nastati ako korisnici ne unose podatke dosljedno i na vrijeme.

**Vjerovatnoća:** Srednja <br>
**Uticaj:** Visok <br>
**Prioritet rizika:** Visok <br>

**Plan mitigacije:**
Potrebno je uvesti validaciju unosa i automatske kontrole konzistentnosti podataka. Pored toga, preporučuje se testiranje logike obračuna potrošnje, redovno poređenje sistemskih i stvarnih zaliha, kao i definisanje odgovornosti za ažuriranje i provjeru ovih podataka.

**Odgovorna osoba ili uloga:** Backend Lead, QA Lead, Domenski vlasnik procesa <br>
**Status:** Otvoren

---

