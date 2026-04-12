## R-01

**ID:** R-01

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
