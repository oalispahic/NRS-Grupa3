# Sprint Review Summary - Sprint 8

Ovaj dokument sumira povratne informacije nakon demonstracije rada na Sprintu 8 (Administrativni pregled, Notifikacije i Logovanje).

## Rezultati sprinta
* **Demonstracija Sistema Notifikacija:** Uspješno prikazan modul za kreiranje i automatsko slanje obavijesti korisnicima prilikom promjene statusa njihovih rezervacija (US-16). Demonstriran je i vizuelni indikator unutar Blazora za nepročitane poruke.
* **Centralizovani pregled svih rezervacija:** Prikazana nova administrativna tabela sa naprednim klijentskim filtriranjem i pretragom po korisniku, datumu i tipu opreme, što administratoru daje potpunu kontrolu nad sistemom (US-17).
* **Praćenje trenutnog korištenja:** Demonstriran "Live Dashboard" panel za administratore koji u realnom vremenu (na osnovu trenutnog serverskog vremena) markira koja je oprema zauzeta i ko su njeni trenutni aktivni korisnici (US-18).
* **Logovanje aktivnosti (Audit Log):** Uspješno demonstriran pozadinski mehanizam koji u bazu podataka trajno bilježi ključne akcije (prijave, izmjene statusa opreme, brisanje), sa tačnim vremenom izvršenja, čime je obezbijeđen visok nivo prativosti (US-19).

## Povratne informacije (Konsultacije)
* **Pohvala za Audit Log:** Asistent je pohvalio implementaciju historije aktivnosti (Audit Log/Logovanje), istakavši da je struktura log tabela u bazi podataka pravilno normalizovana.
* **Pitanje perzistentnosti i opterećenja notifikacija:** Skrenuta je pažnja na to da slanje notifikacija unutar sistema radi stabilno, ali da treba razmisliti o asinhronom slanju (npr. preko pozadinskih servisa/Background Services) ukoliko se u kasnijim fazama uvede integracija sa e-mail servisom, kako se ne bi blokirao klijentski navoj (thread).
* **Validacija i prava pristupa:** Sugerisano je da se u sklopu logovanja aktivnosti striktno provjeri da li se bilježe i neuspješni pokušaji pristupa zaštićenim rutama, kako bi se lakše uočile potencijalne anomalije ili greške na frontendu.

## Zaključak
Sve ključne funkcionalnosti planirane za Sprint 8 su uspješno demonstrirane i prihvaćene bez kritičnih primjedbi. Odobren je prelazak na **Sprint 9**, sa fokusom na praćenje potrošnje repromaterijala, definisanje pravila korištenja opreme i pripremu sistema za završne module analitike.