# Known Issues / Limitations — LabManager

**Projekat:** LabManager v1.0  
**Datum:** Juni 2026

> Ova lista je iskrena i potpuna. Navođenje ograničenja nije nedostatak tima — prikrivanje ih bi bilo.

---

## Poznati bugovi

### BUG-01: Admini vide vlastite broadcast obavijesti

**Opis:** Administrator koji pošalje broadcast obavijest vidi je u vlastitom "Obavijesti" tabu, zajedno s ostalim korisnicima.  
**Ozbiljnost:** Nizak — samo UX problem, ne funkcionalni  
**Uzrok:** Query za broadcasts ne filtrira na osnovu `sender_id`  
**Workaround:** Nema; admin može označiti kao pročitano  
**Lokacija koda:** `project/backend/src/routes/messages.routes.js` (GET /broadcasts)

---

### BUG-02: Deaktivacija korisnika ne otkazuje aktivne rezervacije

**Opis:** Kada admin deaktivira korisnika, njegove pending i approved rezervacije ostaju u sistemu s originalnim statusom. Admin mora ih ručno otkazati.  
**Ozbiljnost:** Srednji — uzrokuje administrativnu zabunu  
**Uzrok:** `setActive(false)` ne triggeruje kaskadnu kancellaciju  
**Workaround:** Admin manualmente pronađe i otkaže sve rezervacije deaktiviranog korisnika  
**Lokacija koda:** `project/backend/src/services/user.service.js` (setActive funkcija)

---

### BUG-03: Timezone neslaganje pri prikazu datuma

**Opis:** Datumi se čuvaju u UTC, ali browser ih prikazuje u lokalnom vremenu. Za korisnike koji su više od 1-2h od UTC, datumi mogu izgledati netačno (npr. rezervacija od "14.06." izgleda kao "13.06." u UTC).  
**Ozbiljnost:** Nizak — estetski problem za korisnike izvan CET/CEST zone  
**Uzrok:** Dokumentovano u Sprint 7 retrospektivi kao poznato ograničenje  
**Workaround:** Sistem pretpostavlja da su svi korisnici u CET/CEST zoni  
**Lokacija koda:** Svaki `toLocaleDateString()` i `toLocaleTimeString()` poziv u frontend komponentama

---

### BUG-04: Navigacijski link pokazuje pogrešnu aktivnu rutu pri nested URL-ovima

**Opis:** Sidebar navigacija ponekad označi pogrešnu stavku kao "aktivnu" za duboke URL-ove (npr. `/admin/maintenance/task/5`).  
**Ozbiljnost:** Nizak — vizualni bug  
**Uzrok:** React Router `NavLink` koristi `startsWith` matching što uzrokuje kolizije za slične prefixe  
**Workaround:** Nema; ne utječe na funkcionalnost

---

## Tehnička ograničenja

### TECH-01: JWT čuvan u sessionStorage (sigurnosni rizik)

**Opis:** JSON Web Token se čuva u `sessionStorage`, što ga čini dostupnim JavaScript kodu u browseru. Ranjivo na XSS napade ako treća strana injektira skriptu.  
**Preporučeno rješenje:** Migracija na `httpOnly` cookie za JWT storage  
**Status:** Dokumentovano od Sprint 5; nije prioritizovano  
**Utjecaj:** Sistem ne koristi third-party skripte koje bi predstavljale realan XSS rizik u produkciji, ali ranjivost postoji

---

### TECH-02: Polling umjesto real-time komunikacije

**Opis:** Notifikacijski bell, chat i unread count koriste polling interval od 30 sekundi. Poruke i notifikacije se ne pojavljuju odmah.  
**Uzrok:** Vercel serverless hosting ne podržava WebSocket ili Server-Sent Events  
**Preporučeno rješenje:** Migracija na Railway, Render ili drugi hosting koji podržava persistent connections, pa implementacija WebSocket  
**Utjecaj:** Korisnik može čekati do 30 sekundi da vidi novu poruku

---

### TECH-03: Vercel serverless cold start

**Opis:** Backend koji nije korišten u ~10+ minuta "uspava" se na Vercelu. Sljedeći request može potrajati 1-3 sekunde (cold start).  
**Uzrok:** Vercel free tier nema "always-on" opciju  
**Preporučeno rješenje:** Upgrade na Vercel Pro ili migracija na druge servise  
**Utjecaj:** Sporadično sporo učitavanje za prvog korisnika koji posjeti sistem

---

### TECH-04: Connection pool ograničenje (max: 1)

**Opis:** Backend koristi Supabase connection pooler s `max: 1` (jedna DB konekcija istovremeno). Za simultane zahtjeve, requests čekaju u redu.  
**Uzrok:** Supabase free tier ima ograničen broj konekcija  
**Preporučeno rješenje:** Upgrade Supabase tiera, ili migracija na direktnu PostgreSQL konekciju s `max: 5+`  
**Utjecaj:** Pod opterećenjem (>5 simultanih korisnika), responzivnost API-ja degradira

---

### TECH-05: PDF eksport koristi browser print dialog

**Opis:** "Eksportuj PDF" dugme otvara browser `window.print()` dialog. Korisnik mora ručno odabrati "Save as PDF" ili printer.  
**Uzrok:** Nije implementiran server-side PDF generator (jsPDF, Puppeteer, ili slično)  
**Preporučeno rješenje:** Integracija jsPDF biblioteke ili server-side PDF endpoint  
**Utjecaj:** Lošije korisničko iskustvo; neautomatizirano

---

### TECH-06: Klijentsko filtriranje opreme

**Opis:** Pretraga i filtriranje opreme rade na klientskoj strani — sve oprema se učitava jedanput i filtrira u browseru.  
**Uzrok:** Dizajnerska odluka u Sprint 7 (odbijena server-side pretraga kao nepotrebna)  
**Preporučeno rješenje:** Server-side pretraga s query parametrima za >200 aparata  
**Utjecaj:** Sa trenutnih ~60-75 aparata nema performansnih problema. Za >500 aparata može biti sporo.

---

## Sigurnosna ograničenja

### SEC-01: Nema rate limiting-a na login endpointu

**Opis:** Endpoint `POST /api/auth/login` nema ograničenja broja pokušaja. Brute-force napad je moguć.  
**Preporučeno rješenje:** `express-rate-limit` middleware (npr. 5 pokušaja/minuti po IP adresi)

---

### SEC-02: Registracija je otvorena (bez invitacija)

**Opis:** Bilo ko može kreirati nalog na `/register` bez potvrde administratora. Novi korisnici dobivaju `laborant` ulogu automatski.  
**Preporučeno rješenje:** Admin confirmation workflow ili invitation code sistem

---

### SEC-03: Bez HTTPS enforcement lokalno

**Opis:** Lokalni razvoj koristi HTTP (localhost). U produkciji Vercel automatski enforces HTTPS, ali postavljanje novog servera bez SSL konfiguracije ostavlja podatke nezaštićenim.  
**Utjecaj:** Samo za lokalni razvoj; produkcija je HTTPS

---

## Nedovršene funkcionalnosti

| Funkcionalnost | Status | Razlog |
|---|---|---|
| Email notifikacije | ❌ Nije implementirano | Zahtijeva SMTP (SendGrid, Nodemailer) |
| Upload fajlova/slika za opremu | ❌ Nije implementirano | Odloženo kao preopširno |
| httpOnly cookie za JWT | ❌ Nije implementirano | Odloženo od Sprint 5 |
| Rate limiting | ❌ Nije implementirano | Identificirano kao nedostatak, nije prioritizovano |
| Automatska kancellacija pri deaktivaciji | ❌ Nije implementirano | Tehnički dug (BUG-02) |
| i18n (engleski jezik) | ❌ Nije implementirano | NFR-20 planiran, nikad implementiran |
| WebSocket real-time | ❌ Nije implementirano | Vercel serverless ograničenje |
| Server-side paginacija | ❌ Nije implementirano | Nije potrebno za trenutni obim |

---

## Pretpostavke koje sistem pravi

1. **Svi korisnici su u CET/CEST timezone** — datumi se ne konvertuju eksplicitno
2. **Korisnici su trustworthy** — nema limita na broj rezervacija (osim globalnih ograničenja admina)
3. **Baza podataka je dostupna** — nema retry logike za DB connection failures
4. **Browser podržava sessionStorage** — sistem ne radi u incognito modu bez sessionStorage
5. **Supabase projekt je aktivan** — free tier Supabase projekti se pauziraju nakon perioda neaktivnosti (1-2 sedmice)

---

## Dijelovi sistema koje ne treba predstavljati kao potpuno završene

- **Testni sloj** — coverage je ~40-50%, ne ~80% kako NFR-12 zahtijeva
- **Sigurnost autentifikacije** — JWT u sessionStorage je kompromis, ne best practice
- **Real-time komunikacija** — polling s 30s intervalima se ne može zvati real-time
- **PDF eksport** — window.print() je workaround, ne pravi PDF generator
- **Formalizacija `test` uloge** — u DB shemi nije ENUM; kreira se direktno kroz SQL
