## Sprint 11 goal
Uvesti sistem direktne komunikacije između korisnika i administratora — chat inbox, odgovaranje na poruke, kontekstualne upite vezane za konkretnu opremu i broadcast obavijesti svim korisnicima — čime se zatvara zadnji jaz u korisničkom iskustvu i smanjuje potreba za komunikacijom izvan sistema.

---

### ID storyja
US-40

### Naziv storyja
Direktne poruke korisnik ↔ administratori

**Opis**
Kao korisnik, želim slati poruke administratorima direktno unutar sistema i primati njihove odgovore, a kao administrator, želim vidjeti sve korisničke konverzacije i odgovarati na njih iz jednog inboxa

**Poslovna vrijednost**
Ovaj story je važan jer korisnici trenutno nemaju sistemski način postavljanja pitanja administratorima o opremi, rezervacijama ili pravilima — e-mail i verbalna komunikacija ne ostavljaju trag ni historiju. Interni chat eliminiše taj problem i čuva svu komunikaciju na jednom mjestu.

**Prioritet**
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavka: Nova tabela `messages (id, sender_id, recipient_user_id, body, equipment_id, created_at, read_at)`.
- Pretpostavka: `recipient_user_id = NULL` znači da je poruka upućena svim adminima (korisnik → admini).
- Pretpostavka: Admin vidi stranicu `/admin/messages` s listom svih korisnika koji su poslali poruke + unread badge.
- Pretpostavka: Korisnik vidi stranicu `/messages` s chat sučeljem — sve poruke kronološki.
- Pretpostavka: Send notifikacija: admin dobiva in-app notifikaciju kad korisnik pošalje poruku; korisnik dobiva notifikaciju kad admin odgovori.
- Pretpostavka: Unread count badge vidljiv u navigacijskoj traci za oba smjera.
- Pretpostavka: Poruke se označavaju kao pročitane automatski pri otvaranju konverzacije.
- Otvoreno pitanje: Da li treba podrška za fajl-attachmente u porukama?
- Otvoreno pitanje: Da li admin može dodijeliti konverzaciju drugom adminu?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije (US-9), notifikacija (US-16)
- Povezano sa: pitanjem o opremi (US-41), broadcast porukama (US-42)

---

### ID storyja
US-41

### Naziv storyja
Pitanje o opremi (Equipment Inquiry)

**Opis**
Kao korisnik, želim direktno s kartice opreme poslati pitanje administratoru uz automatski priložen kontekst te opreme, bez ručnog upisivanja naziva

**Poslovna vrijednost**
Ovaj story je važan jer korisnik koji gleda detalje mikroskopa ili centrifuge i ima pitanje o korištenju, servisu ili dostupnosti ne treba napuštati stranicu, tražiti admin kontakt i posebno opisivati o kojoj opremi govori — jedan klik šalje pitanje s opremom kao kontekstom.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Dugme "Pošalji pitanje adminu" vidljivo svim korisnicima na EquipmentDetailPage (ne adminima).
- Pretpostavka: Klik sprema kontekst opreme u sessionStorage i navigira na `/messages`.
- Pretpostavka: Na `/messages` stranici se automatski popunjava textarea s predloškom i prikazuje se plaveni chip "Pitanje o: [naziv opreme]".
- Pretpostavka: Poruka se šalje s `equipment_id` FK — admin vidi naziv opreme uz svaku takvu poruku.
- Otvoreno pitanje: Da li admin treba link koji direktno otvara EquipmentDetailPage dotične opreme iz inboxa?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: direktnih poruka (US-40), detalja opreme (US-2)
- Nema dodatnih backend zavisnosti (koristi messages endpoint)

---

### ID storyja
US-42

### Naziv storyja
Admin broadcast obavijesti

**Opis**
Kao administrator, želim slati obavijesti svim korisnicima sistema odjednom — za planirano održavanje, nova pravila ili važne informacije — a korisnici ih vide u svom inbox-u s mogućnošću označavanja kao pročitano

**Poslovna vrijednost**
Ovaj story je važan jer administrator trenutno nema sistemski kanal za komunikaciju prema svim korisnicima — svaku obavijest mora slati pojedinačno ili koristiti e-mail izvan sistema. Broadcast funkcionalnost omogućava brze i transparentne najave bez napuštanja aplikacije.

**Prioritet**
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavka: Nova tabela `broadcasts (id, sender_id, title, body, created_at)` i `broadcast_reads (broadcast_id, user_id, read_at)`.
- Pretpostavka: Admin na `/admin/messages` ima tab "Nova obavijest" s formom (naslov + tekst).
- Pretpostavka: Broadcast je vidljiv svim korisnicima u tabu "Obavijesti" na `/messages` stranici.
- Pretpostavka: Nepročitane obavijesti prikazuju se žuto (highlighted); korisnik klikne "Pročitano" za svaku zasebno.
- Pretpostavka: Unread broadcast count ulazi u messages badge u navigaciji.
- Otvoreno pitanje: Da li admin može uređivati ili brisati broadcast nakon slanja?
- Otvoreno pitanje: Da li je potrebna push notifikacija za broadcast?

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od: autentifikacije (US-9), sistema poruka (US-40)
- Nema veze s equipment tablom

---
