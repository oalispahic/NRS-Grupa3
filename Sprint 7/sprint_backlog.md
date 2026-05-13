# Sprint Backlog - Sprint 7

## Sprint Goal
Cilj sprinta 7 je reimplementacija modula za dostupnost opreme kroz kalendarski prikaz, proširenje baze podataka detaljnijim specifikacijama opreme, te finalizacija procesa odobravanja rezervacija i upravljanja korisničkim historijatom.

---

### ID storyja
US-11 (Dopuna US-9)

### Naziv storyja
Reimplementacija dostupnosti opreme (Kalendarski pregled)

**Opis**
Kao korisnik želim imati vizuelni (kalendarski) pregled slobodnih termina kako bih lakše planirao korištenje opreme.

**Poslovna vrijednost**
Trenutna izvedba dostupnosti ne ispunjava svrhu. Reimplementacija omogućava korisnicima intuitivan uvid u zauzetost laboratorije, smanjujući broj neuspješnih pokušaja rezervacije.

**Zadaci (Tasks)**
- T7.1: Dizajniranje UI komponente kalendara u Blazoru.
- T7.2: Implementacija backend logike za kalkulaciju slobodnih slotova u realnom vremenu.
- T7.3: Vizuelno razlikovanje potvrđenih rezervacija od zahtjeva na čekanju.

**Prioritet**
Najviši (Kritično)

---

### ID storyja
US-8 (Prošireno)

### Naziv storyja
Detaljna evidencija i status opreme

**Opis**
Kao administrator želim dodati više detalja za opremu (tehničke specifikacije, uputstva, lokacija) i upravljati njenim statusom.

**Poslovna vrijednost**
Korisnici trebaju više informacija od samog naziva opreme kako bi znali da li im odgovara za rad. Precizni detalji smanjuju rizik od pogrešnog korištenja.

**Zadaci (Tasks)**
- T7.4: Proširenje baze podataka poljima za serijski broj, tehničke specifikacije i lokaciju.
- T7.5: Implementacija forme za upload/prikaz tehničke dokumentacije ili linkova.
- T7.6: UI prikaz detaljnih informacija na stranici opreme.

**Prioritet**
Visok

---

### ID storyja
US-7 

### Naziv storyja
Upravljanje zahtjevima (Odobravanje/Odbijanje)

**Opis**
Kao administrator želim obrađivati pristigle zahtjeve kako bih osigurao prioritetno korištenje opreme.

**Poslovna vrijednost**
Omogućava ljudski nadzor nad automatizovanim sistemom, sprečavajući zloupotrebe ili neadekvatno planiranje resursa.

**Zadaci (Tasks)**
- T7.7: Izrada administratorskog dashboarda sa listom "Pending" rezervacija.
- T7.8: Implementacija logike za promjenu statusa rezervacije (Approved/Rejected) u bazi.
- T7.9: Slanje klijentskih notifikacija (Toast/Email) o ishodu zahtjeva.

**Prioritet**
Visok

---

### ID storyja
US-13

### Naziv storyja
Moja historija rezervacija

**Opis**
Kao korisnik želim imati uvid u svoje prošle i buduće rezervacije na jednom mjestu.

**Poslovna vrijednost**
Pruža korisniku kontrolu nad vlastitim planovima i omogućava brz pristup informacijama o odobrenim terminima.

**Zadaci (Tasks)**
- T7.10: Izrada korisničkog profila/dashboarda sa tabelarnim prikazom rezervacija.
- T7.11: Implementacija filtera po statusu (aktivne, odbijene, završene).

**Prioritet**
Srednji

---

### ID storyja
US-14

### Naziv storyja
Otkazivanje rezervacije (Lock period)

**Opis**
Kao korisnik želim otkazati rezervaciju najkasnije 24h prije termina kako bih oslobodio resurse drugima.

**Poslovna vrijednost**
Smanjuje broj "no-show" termina (rezervisano a neiskorišteno), optimizirajući rad laboratorije.

**Zadaci (Tasks)**
- T7.12: Implementacija dugmeta za otkazivanje sa logikom provjere preostalog vremena.
- T7.13: Automatsko ažuriranje kalendara dostupnosti nakon otkazivanja.

**Prioritet**
Srednji

---

### Napomena o tehničkom dugu i komentarima:
- **Dostupnost:** Stara implementacija se u potpunosti mijenja novom (US-11).
- **Detalji opreme:** Svi novi entiteti u bazi moraju podržavati `COALESCE` pattern za parcijalne update-ove (OD-005).