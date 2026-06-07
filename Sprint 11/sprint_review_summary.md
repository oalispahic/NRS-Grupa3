# Sprint Review Summary — Sprint 11

> **Sprint 11** · 07.06.2026.  
> Završni sprint projekta. Implementiran sistem direktne komunikacije korisnika s administratorima.

---

## Sprint goal

Uvesti sistem direktne poruke između korisnika i administratora — chat inbox, odgovaranje na poruke, kontekstualne upite vezane za konkretnu opremu i broadcast obavijesti — čime se zatvara zadnji jaz u korisničkom iskustvu.

---

## Deliverables — šta je isporučeno

| US | Naziv | SP | Status | Napomena |
|---|---|---|---|---|
| US-40 | Direktne poruke korisnik ↔ administratori | 5 | ✅ Done | `/messages` (user) + `/admin/messages` (admin inbox) + unread badge u navigaciji |
| US-41 | Pitanje o opremi (Equipment Inquiry) | 2 | ✅ Done | "Pošalji pitanje adminu" dugme na EquipmentDetailPage; equipment kontekst prenesen u messages |
| US-42 | Admin broadcast obavijesti | 3 | ✅ Done | Admin šalje broadcast; korisnici vide u "Obavijesti" tabu; unread highlighted žuto |

**Ukupno:** 10/10 SP isporučeno (100%)

---

## Demo scenariji

### US-40 — Direktne poruke

1. Korisnik navigira na `/messages`
2. Vidljiv chat sučelje — prazno stanje s "Pošaljite pitanje administratoru"
3. Korisnik upisuje: "Kada će Centrifuga Eppendorf biti dostupna za rezervaciju?" i pritisne Enter
4. Poruka se pojavljuje desno s plavom pozadinom (korisnikova strana)
5. Administrator otvara `/admin/messages` — vidi korisnika u lijevom panelu s unread badge "1"
6. Klikne na korisnika — otvara se konverzacija s porukom
7. Administrator upisuje odgovor i šalje
8. Korisnik osvježava `/messages` — vidi adminov odgovor s "read" checkmark (✔✔ zeleno)
9. Unread badge na "Poruke" nav itemu se gasi na obje strane

### US-41 — Pitanje o opremi

1. Korisnik je na `/equipment/5` (Centrifuga Eppendorf)
2. Vidljivo dugme "Pošalji pitanje adminu" ispod status badge-ova
3. Klik → navigira na `/messages`
4. Textarea je automatski popunjena: "Pitanje o opremi "Centrifuga Eppendorf 5424 R":"
5. Plavi chip "Pitanje o: Centrifuga Eppendorf 5424 R" vidljiv iznad forme
6. Korisnik nastavlja pisati i šalje
7. Admin vidi poruku u inboxu s plavim "Re: Centrifuga Eppendorf 5424 R" oznakom iznad svakog mjehurića

### US-42 — Broadcast obavijesti

1. Admin otvara `/admin/messages` → tab "Nova obavijest"
2. Upisuje: Naslov: "Planirano održavanje servera — subota 08.06.2026." i detalje
3. Klikne "Pošalji obavijest svim korisnicima"
4. Korisnik otvara `/messages` → tab "Obavijesti (1)"
5. Vidljiva žuta kartice s naslovom i tekstom; žuta točkica nepročitano
6. Korisnik klikne "Pročitano" — kartica postaje bijela, badge se gasi

---

## Feedback stakeholdera

- Chat s adminima ocijenjen kao "konačno pravi problem riješen" — sva komunikacija sada unutar sistema
- Pitanje o opremi je hvaljeno kao intuitivno — kontekst se prenosi bez dodatnog pisanja
- Broadcast obavijesti su korisne za laboratorijsko planiranje (servisi, zatvoreni dani)
- Prijedlog za budućnost: emoji reakacije na poruke i prikaz "admin tipka..." bubble

---

## Tehnički dug identificiran

| Oblast | Opis | Prioritet |
|---|---|---|
| WebSocket real-time | Poruke se osvježavaju samo pri navigaciji/manualni refresh | Nizak |
| File attachments | Korisnici ne mogu priložiti slike/PDF uz poruku | Nizak |
| Brisanje poruka | Admin ne može obrisati poruku niti broadcast | Nizak |
| Email notifikacija | Poruke ne generišu email — samo in-app notifikacija | Srednji |
| Pretraga poruka | Nema pretraživanja historije konverzacija | Nizak |
