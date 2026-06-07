# Sprint Retrospective Summary — Sprint 11

> **Sprint 11** · 07.06.2026.  
> Završna retrospektiva — refleksija na Sprint 11 i cjelokupni projekat.

---

## Što je išlo dobro

### 1. Jednostavan ali efikasan messaging dizajn
Umjesto kompleksnih WebSocket kanala i room sistema, odabran je jednostavan polling model (unread count svakih 30s) koji radi pouzdano u serverless okruženju Vercel. Arhitektura `recipient_user_id = NULL` (poruka adminima) i `recipient_user_id = userId` (admin reply) eliminisala je potrebu za posebnom threadTab ili room tabelom.

### 2. Equipment inquiry bez dodatnog backendu
PB53 (pitanje o opremi) implementiran je isključivo kroz sessionStorage → navigate → pre-fill pattern bez ijednog novog backenda endpointa. Isti `/api/messages` POST endpoint prima opcionalni `equipment_id` FK. Kompleksna UX funkcionalnost za 0 backend linija koda.

### 3. Broadcast + reads dizajn skalira čisto
`broadcasts` + `broadcast_reads` tabela s composite PK (`broadcast_id`, `user_id`) osigurava O(1) mark-as-read bez UPDATE na broadcast redu. `ON CONFLICT DO NOTHING` eliminisala je race condition pri dvostrukom kliku.

---

## Što nije išlo dobro

### 1. Nema real-time ažuriranja
Chat se ne ažurira automatski — korisnik mora navigirati ili manuelno refreshati stranicu. U produkcijskom sistemu ovo bi zahtijevalo WebSocket ili SSE. Polling svakih 30s je kompromis prihvatljiv za akademski projekt.

**Akcija:** Za produkcijsku verziju: implementirati Supabase Realtime (WebSocket) ili Server-Sent Events za push notifikacije novih poruka.

### 2. Admini ne vide broadcasts koje su sami poslali u svom "Obavijesti" tabu
Admin vidi broadcasts kao pošiljalac ali nema poseban "Poslano" tab — broadcasts u user tabu prikazuju se i adminu koji ih je kreirao. Nije bug, ali može biti zbunjujuće.

**Akcija:** Dodati "od tebe" oznaku na broadcasts u korisničkom pregledu.

---

## Akcije za buduće projekte

| # | Akcija | Odgovornost | Rok |
|---|---|---|---|
| 1 | WebSocket ili SSE za real-time poruke | Backend lead | Pri prvom re-deploymentu |
| 2 | Slanje email notifikacija za primljene poruke | Backend lead | Sljedeći sprint |
| 3 | Paginacija/infinite scroll za duge konverzacije | Frontend lead | Po potrebi |

---

## Finalna ocjena Sprint 11

| Dimenzija | Ocjena | Komentar |
|---|---|---|
| Tehnička kvaliteta | 4/5 | Čist dizajn tabele, polling unread count, equipment_id FK; nema real-time |
| Funkcionalnost | 5/5 | Svi 3 US isporučeni potpuno |
| UX/UI | 4/5 | Chat mjehurići, read receipts, broadcast žuta kartica — intuitivno; nema emoji/attachmenta |
| Dokumentacija | 5/5 | Kompletni sprint dokumenti |

**Ukupna ocjena Sprinta 11: 4.5/5**

---

## Ukupna ocjena projekta (11 sprintova)

| Sprint | Feature-i | SP | Ocjena |
|---|---|---|---|
| Sprint 5 | Osnova sistema (auth, equipment, rezervacije) | 24 | 4/5 |
| Sprint 6 | Kontrola pristupa, registracija, polishing | 18 | 4/5 |
| Sprint 7 | Kalendar, pretraga, otkazivanje, sidebar | 22 | 4.5/5 |
| Sprint 8 | Notifikacije, tagovi, statistike, profil | 23 | 4.5/5 |
| Sprint 9 | Admin panel, korisnici, lokacije, analitika | 28 | 4.5/5 |
| Sprint 10 | Izvještaji, maintenance, waitlist, QR, responsive | 26 | 4.5/5 |
| Sprint 11 | Chat, broadcasts, equipment inquiry | 10 | 4.5/5 |
| **Ukupno** | **~54 user storija** | **~151 SP** | **4.4/5** |
