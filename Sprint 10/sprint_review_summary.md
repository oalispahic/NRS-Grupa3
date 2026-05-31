# Sprint Review Summary — Sprint 10

> **Sprint 10** · 31.05.2026.  
> Finalni sprint projekta. Prezentacija rezultata tima i stakeholdera.

---

## Sprint goal

Finalizirati sistem kroz: grafičke izvještaje s PDF eksportom, maintenance task management, ličnu historiju aktivnosti, responsive mobilni dizajn, komparaciju opreme, listu čekanja i QR kodove — čime se sistem zaokružuje u potpunu, produkcijski zrelu aplikaciju.

---

## Deliverables — šta je isporučeno

| US | Naziv | SP | Status | Napomena |
|---|---|---|---|---|
| US-32 | Izvještaji o korištenosti (web + PDF export) | 5 | ✅ Done | `/admin/reports` s date range filterom i window.print() PDF eksportom |
| US-33 | Održavanje opreme — task assignment | 5 | ✅ Done | Admin kreira taskove, korisnik vidi `/my-tasks` |
| US-34 | Lična historija aktivnosti | 3 | ✅ Done | `/my-activity` — timeline s filtrom po tipu |
| US-35 | Responsive/mobilni dizajn | 5 | ✅ Done | Hamburger drawer, overflow popravci, touch targets |
| US-36 | Komparacija opreme | 3 | ✅ Done | Floating bar + full-screen modal s tabelarnom usporedbom |
| US-37 | Lista čekanja — Waitlist | 3 | ✅ Done | Waitlist tabela, notifikacija na status promjenu |
| US-38 | QR kod za opremu | 2 | ✅ Done | react-qr-code + PNG download |

**Ukupno:** 26/26 SP isporučeno (100%)

---

## Demo scenariji

### US-32 — Izvještaji

1. Admin navigira na `/admin/reports`
2. Bira period: 1.1.2026. — 31.5.2026.
3. Klikne "Generiraj izvještaj"
4. Vidljivi: KPI kartice (ukupno rezervacija, stopa odobrenja, prosječno trajanje, najkorištenija oprema)
5. Bar chart top 10 opreme, line chart trenda, tabele statusa i korisnika
6. Klikne "Exportuj PDF" → otvara se print dijalog → "Spremi kao PDF"
7. PDF sadrži samo sadržaj izvještaja bez navigacije

### US-33 — Maintenance

1. Admin otvara `/admin/maintenance`
2. Klikne "Novi zadatak"
3. Bira opremu: "Centrifuga Eppendorf 5424 R", assignee: "Amina Hodžić", prioritet: High, rok: 7.6.2026.
4. Upisuje opis: "Kalibracija rotora — godišnji servis"
5. Klikne "Kreiraj" — korisnik Amina dobiva notifikaciju
6. Amina otvara `/my-tasks` — vidi task s rokom, prioritetom i opisom
7. Klikne "Označi kao in_progress", zatim "Označi kao završeno"
8. Admin vidi status "Completed" na svom pregledu

### US-34 — Lična historija

1. Korisnik otvara `/my-activity`
2. Vidljiv timeline: "Kreirana rezervacija za Mikroskop Zeiss — 28.5.2026.", "Ocjenjena oprema — 2 zvjezdice — 29.5.2026."
3. Filter po tipu: odabere "Rezervacije" — vidljive samo akcije rezervacija
4. Hover na timestamp — prikazuje apsolutno datum/vreme

### US-35 — Responsive

1. DevTools → 375px (iPhone SE)
2. Navigacija: hamburger ikonica → klik → drawer se otvara s desne strane
3. Equipment lista: single-column card grid
4. Reservations admin: tabela s horizontalnim scrollom
5. Equipment edit modal: full-screen na mobilnom

### US-36 — Komparacija

1. Korisnik na EquipmentListPage klikne "+" na Mikroskop Zeiss
2. Klikne "+" na Mikroskop Olympus
3. Na dnu ekrana: floating bar "Poredi 2 stavke ▶"
4. Klikne "Poredi" → full-screen modal
5. Vidljiva tabela: model, status, lokacija, ocjena, tagovi, safety notes
6. Direktan "Rezerviraj" link za svaku kolonu

### US-37 — Waitlist

1. Korisnik otvara EquipmentDetailPage za zauzetu opremu
2. Vidljivo dugme "Stavi na listu čekanja" (status: reserved)
3. Klikne — badge "Na listi čekanja (pozicija 1)" se pojavljuje
4. Admin mijenja status opreme u "available"
5. Korisnik dobiva in-app notifikaciju: "Centrifuga je sada slobodna!"

### US-38 — QR kod

1. Admin na ManageEquipmentPage klikne "QR" na kartici opreme
2. Modal s QR kodom se otvara
3. QR kodira: `https://app.example.com/equipment/5`
4. Klikne "Preuzmi PNG" — slika se preuzima
5. Skeniranje QR koda mobilnim — otvara EquipmentDetailPage bez login-a

---

## Feedback stakeholdera

- Izvještaji feature jako pozitivno primljen — "Ovo nam je trebalo od početka"
- QR kod ideja ocijenjena kao inovativna za laboratorijsko okruženje
- Maintenance module — komentarisano da bi bio korisniji s email notifikacijama (van scope projekta)
- Responsive dizajn — navigacija je prihvatljiva, ali bottom tab bar predložen za buduće verzije
- Waitlist — pitanje o automatskom rezervisanju kad se miejsto oslobodi (van scope)

---

## Tehnički dug identificiran

| Oblast | Opis | Prioritet |
|---|---|---|
| Email notifikacije | Sve notifikacije su in-app; email bi povećao pouzdanost | Srednji |
| WebSocket | Real-time ažuriranje statusa bez refresha stranice | Nizak |
| PDF fajlovi uz maintenance | Admin ne može priložiti PDF upute uz task | Nizak |
| Batch QR print | Printanje svih QR kodova odjednom | Nizak |
| Bottom tab bar mobile | Bolji mobilni UX od hamburger menua | Nizak |
| Automatski waitlist → rezervacija | Automatsko kreiranje rezervacije pri oslobađanju opreme | Srednji |
