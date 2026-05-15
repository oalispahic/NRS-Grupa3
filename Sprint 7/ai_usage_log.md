# AI Usage Log — Sprint 7

> Dokument bilježi sve relevantne slučajeve korištenja AI alata tokom razvoja projekta.
> Svrha je transparentnost i procjena zrelosti u korištenju alata, ne evaluacija tima.

---

## Unos 1 — Planiranje Sprint 7 implementacije

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-07 |
| **Sprint** | Sprint 7 |
| **Alat** | Claude Code (Anthropic) — `/plan` komanda |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Generisanje implementacijskog plana za Sprint 7 backlog stavke (PB8, PB9, PB10, PB13, PB14) na osnovu postojeće projektne dokumentacije i `CONTEXT.md`.

**Kratak opis upita:** Korisnik je zatražio od AI-a da analizira sprint backlog i napravi plan za PB8 (kalendar zauzeća), PB9/PB10 (pretraga i filtriranje opreme) i PB13/PB14 (otkazivanje i izmjena rezervacija).

**Šta je AI predložio/generisao:**
- Plan implementacije u fazama: backend proširenje → nova komponenta kalendara → frontend stranice
- Preporučeni redoslijed: PB8 (kalendar) kao osnova, zatim PB9/PB10 (lista opreme), na kraju PB13/PB14 (upravljanje rezervacijama)
- Identifikacija ključnih fajlova: `ReservationCalendar.jsx` (nova komponenta), `EquipmentListPage.jsx`, `MyReservationsPage.jsx`, backend `reservation.repository.js`, `reservation.service.js`
- Prijedlog novog GET endpointa za dohvat zauzetih datuma po opremi (`GET /api/equipment/:id/reservations`)
- Verifikacijske tačke za svaki PB

**Šta je tim prihvatio:** Cijeli plan kao osnova za implementaciju; predloženi redoslijed i arhitektura komponenata.

**Šta je tim izmijenio:** Odlučeno da se uz planirane PB-ove implementiraju i dodatne stavke koje nisu bile u Sprint 7 planu (proširenje modula opreme sa servisnim podacima, sidebar navigacija), jer su smatrane neophodnim za koherentnost UI-a.

**Šta je tim odbacio:** Prijedlog za paginaciju na `MyReservationsPage.jsx` — odlučeno da se prikaže kompletna lista rezervacija zbog jednostavnosti.

**Rizici/problemi:** Nema u fazi planiranja.

---

## Unos 2 — Implementacija PB8: Kalendar rezervacija

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-11 |
| **Sprint** | Sprint 7 (PB8) |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Implementacija vizualnog kalendarskog prikaza zauzetosti opreme s mogućnošću odabira termina za rezervaciju.

**Kratak opis upita:** Korisnik je zatražio airline-style kalendar koji prikazuje zauzete datume u crvenoj boji i odabrani slobodni interval u zelenoj. Trebalo je zamijeniti stare datetime inpute modernim date range pickerom.

**Šta je AI predložio/generisao:**
- `ReservationCalendar.jsx` (337 linija) — kompletna nova komponenta:
  - Prikaz jednog mjeseca s navigacijom naprijed/nazad
  - Zauzeti datumi (iz aktivnih rezervacija) prikazani u crvenoj boji
  - Odabrani slobodni interval prikazan u zelenoj boji
  - Podrška za range selekciju (klik na početak → klik na kraj)
  - Validacija: kraj mora biti nakon početka, ne mogu se odabrati prošli datumi
  - Integracija s backbone state-om (`startDate`, `endDate`) u `EquipmentDetailPage.jsx`
- `reservation.repository.js` — nova funkcija `getByEquipmentId(equipmentId)` koja vraća aktivne/odobrene rezervacije za datu opremu
- `equipment.routes.js` — novi javni endpoint `GET /api/equipment/:id/reservations` za dohvat zauzetih termina
- `theme.js` — dopuna CSS klasa za kalendar stiliziranje (`.cal-day`, `.cal-day--taken`, `.cal-day--selected`, `.cal-day--in-range`)
- `EquipmentDetailPage.jsx` — integracija kalendara, zamjena datetime inputa

**Šta je tim prihvatio:** Cijela implementacija; airline-style vizualni pristup.

**Šta je tim izmijenio:** Ništa značajno.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- Bug pronađen odmah nakon implementacije — klik na datum u kalendaru je slao i klik na forma dugme ispod (`fix: bug fix when clicking on calender`). AI je dijagnosticirao problem kao event propagation i dodao `e.stopPropagation()`.

---

## Unos 3 — Implementacija PB9/PB10: Pretraga i filtriranje opreme

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-11 |
| **Sprint** | Sprint 7 (PB9, PB10) |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Bilal Ozdić |

**Svrha korištenja:** Dodavanje pretrage po nazivu i filtriranja po statusu na stranici liste opreme.

**Kratak opis upita:** Korisnik je zatražio search input i status filter koji filtriraju kartice opreme u realnom vremenu, bez poziva API-ja (client-side filtriranje).

**Šta je AI predložio/generisao:**
- `EquipmentListPage.jsx` — proširenje s:
  - Search input poljem s ikonicom (lucide `Search`) koji filtrira po `name`, `model`, `manufacturer` i `location`
  - Dropdown filterom za status (`available`, `reserved`, `maintenance`, `out_of_service`, sve opcije)
  - `useMemo` hook za efikasno filtriranje bez ponovnog renderiranja
  - Empty state poruka kada nema rezultata koji odgovaraju pretrazi
  - Debounce logika za search input (200ms)
  - Toolbar s lijeve strane (search) i desne strane (filter dropdown)

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Tekst placeholder-a u search polju prilagođen bosanskom jeziku ("Pretraži opremu...").

**Šta je tim odbacio:** Prijedlog za server-side pretragu (GET `/api/equipment?search=`) — odlučeno da ostane client-side jer broj opreme u bazi nije toliki da bi bio problem.

**Rizici/problemi:** Nema.

---

## Unos 4 — Implementacija PB13/PB14: Otkazivanje i izmjena rezervacija

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-11 |
| **Sprint** | Sprint 7 (PB13, PB14) |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Elma Dedić |

**Svrha korištenja:** Omogućavanje korisnicima da otkazuju i mijenjaju datume postojećih rezervacija direktno s "Moje rezervacije" stranice.

**Kratak opis upita:** Korisnik je zatražio inline akcije za svaku rezervaciju: dugme za otkazivanje (s potvrdom) i dugme za izmjenu datuma koje otvara inline kalendar sličan onome pri kreiranju.

**Šta je AI predložio/generisao:**

*Backend:*
- `reservation.repository.js` — `cancel(id, userId)` (UPDATE status na `cancelled`, provjera vlasništva), `update(id, userId, fields)` za promjenu datuma
- `reservation.service.js` — validacija: nemoguće otkazati tuđu rezervaciju; validacija novih datuma pri izmjeni (kraj mora biti poslije početka, bez konflikta s drugim rezervacijama osim vlastite)
- `reservation.controller.js` — `PATCH /api/reservations/:id/cancel` i `PUT /api/reservations/:id` handleri
- `reservation.routes.js` — dodane dvije nove rute

*Frontend:*
- `MyReservationsPage.jsx` (345 linija, rewrite postojeće stranice):
  - Tabela s kolonama: oprema, period, status badge, akcije
  - Inline otkazivanje: klik na "Otkaži" → confirmation dialog → PATCH poziv
  - Inline izmjena: klik na "Izmijeni" → row se proširi s ugrađenim `ReservationCalendar`-om → Save/Cancel dugmad
  - Status badge s bojama (pending/žuta, approved/zelena, rejected/crvena, cancelled/siva)
  - Vlastite rezervacije su deblokrane u kalendaru pri izmjeni (ne broje se kao konflikt)

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Confirmation dialog tekst prilagođen ("Jesi li siguran da želiš otkazati rezervaciju?" umjesto generičkog AI prijedloga).

**Šta je tim odbacio:** Prijedlog za email notifikaciju pri otkazivanju — nije u opsegu Sprinta 7.

**Rizici/problemi:** Nema.

---

## Unos 5 — Proširenje modula opreme sa servisnim podacima

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-07 |
| **Sprint** | Sprint 7 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Ilda Avdić |

**Svrha korištenja:** Proširenje baze podataka i UI-a opreme s podacima o servisu i dobavljaču (US-8 — Detaljna evidencija i status opreme).

**Kratak opis upita:** Korisnik je zatražio dodavanje kolona `supplier`, `last_service`, `planned_service`, `warranty_expiry`, `service_company` u tabelu `equipment`, s odgovarajućim backend i frontend izmjenama.

**Šta je AI predložio/generisao:**
- `003_add_service_info.sql` — ALTER TABLE migracija koja dodaje 5 novih kolona (sve nullable)
- `004_seed_equipment.sql` — seed s 75 medicinsko-hemijskih instrumenata (napredniji set od postojećih 60)
- `equipment.repository.js` — proširenje `findAll()`, `findById()`, `create()`, `update()` za nova polja (COALESCE pattern zadržan)
- `equipment.service.js` — validacija novih polja (datumi moraju biti validni ISO format ako su proslijeđeni)
- `EquipmentDetailPage.jsx` — redizajniran prikaz: grupisane info kartice s bojama ("Servisne informacije", "Dobavljač"), smart badge-ovi koji upozoravaju na isteklu garanciju ili zakasneli servis
- `ManageEquipmentPage.jsx` — admin forma proširena s 5 novih inputa (date picker + text inputi), prilagođeno za desktop i mobilni prikaz

**Šta je tim prihvatio:** Cijela implementacija; COALESCE pattern za nova polja.

**Šta je tim izmijenio:** Boja badge-ova za istekle datume — AI je koristio generički crveni, tim je uskladio s postojećim STATUS_EQUIPMENT tokenima iz `theme.js`.

**Šta je tim odbacio:** Prijedlog za upload tehničke dokumentacije (T7.5 iz backlog-a) — odloženo za kasniji sprint.

**Rizici/problemi:**
- Seed fajl `004_seed_equipment.sql` je imao konflikte s postojećim ID-ovima iz prethodnog seeda — AI je prilagodio INSERT da koristi `ON CONFLICT DO NOTHING` pattern.

---

## Unos 6 — Sidebar navigacija (Admin i svi korisnici)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-11 |
| **Sprint** | Sprint 7 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Zamjena top navbar-a s modernim fixed sidebar-om za admin korisnika, a zatim primjena iste layout logike za sve zaštićene rute.

**Kratak opis upita:** Korisnik je zatražio dark sidebar (tamno plava, depth efekti) za admin sekciju s grupiranom navigacijom, logo-om i korisničkim panelom na dnu. Nakon toga, sidebar je trebalo proširiti i na laborant/test rolu.

**Šta je AI predložio/generisao:**

*Commit 1 — Admin sidebar:*
- `AdminLayout.jsx` (306 linija) — kompletna nova komponenta:
  - Fixed dark sidebar (#1e3a5f pozadina, grupirana navigacija s ikonama)
  - Logo sekcija na vrhu s nazivom aplikacije
  - Nav grupe: "Oprema" (lista, upravljanje), "Rezervacije" (pregled svih, kalendar), "Korisnici"
  - Korisnički panel na dnu: avatar, ime, uloga, Logout dugme
  - Mobilni fallback: hamburger meni koji otvara overlay drawer
  - Active link highlighting s plavom akcentuacijom
- `App.jsx` — admin rute omotane s `<AdminLayout>`
- `NavBar.jsx` — uklonjen prikaz za admin korisnika (NavBar ostaje samo za neautentifikovane)

*Commit 2 — Sidebar za sve korisnike:*
- `AdminLayout.jsx` — preimenovan/proširen u generički `AppLayout` koji prima `navGroups` prop
- `App.jsx` — sve zaštićene rute (laborant, admin, test) omotane s odgovarajućim layout varijantom

**Šta je tim prihvatio:** Cijeli dizajn; dark sidebar za admin, unified sidebar za sve rute.

**Šta je tim izmijenio:** Redoslijed nav grupe — AI je stavio "Korisnici" kao prvu grupu, tim je premjestio na kraj kao manje prioritetnu sekciju.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** `AdminLayout.jsx` je bio napisan bez prethodnog čitanja `App.jsx` → moralo se ručno uskladiti routing obavijanje pri integraciji.

---

## Unos 7 — Auto-update statusa opreme na osnovu rezervacija

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-07 |
| **Sprint** | Sprint 7 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Amina Rovčanin |

**Svrha korištenja:** Automatska promjena statusa opreme u `reserved` pri kreiranju rezervacije i povratak na `available` pri odbijanju, bez admin intervencije.

**Kratak opis upita:** Korisnik je primijetio da status opreme ostaje `available` i nakon kreiranja rezervacije, što zbunjuje korisnike. Zatraženo je automatsko ažuriranje statusa.

**Šta je AI predložio/generisao:**
- `reservation.repository.js` — nova funkcija `countActiveByEquipment(equipmentId)` za provjeru postoje li još aktivnih rezervacija
- `reservation.service.js` — logika u `create()`: ako je status opreme `available`, postaviti na `reserved` nakon uspješnog kreiranja rezervacije; logika u `reject()`: ako više nema aktivnih rezervacija, vratiti status na `available`
- Pravilo: statusi `maintenance` i `out_of_service` ostaju nepromijenjeni bez obzira na rezervacije

**Šta je tim prihvatio:** Cijela logika; posebno pravilo o zaštiti `maintenance`/`out_of_service` statusa.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Prijedlog za automatsko postavljanje statusa na `in_use` pri početku termina rezervacije (cron job) — ocijenjeno kao preopširno za ovaj sprint.

**Rizici/problemi:** Nema — logika je atomarna unutar jedne transakcije.

---

## Unos 8 — Implementacija 'test' role i fix navigacije

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-07 |
| **Sprint** | Sprint 7 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Harun Zukanović |

**Svrha korištenja:** Dodavanje specijalne `test` role koja kombinira privilegije admina i laboranta, za potrebe demonstracije i QA testiranja bez switching korisnika.

**Kratak opis upita:** Korisnik je zatražio novu rolu koja može sve što i admin (upravljanje opremom, pregled svih rezervacija) i sve što laborant (rezervisanje opreme, moje rezervacije), s odgovarajućom navigacijom.

**Šta je AI predložio/generisao:**
- `equipment.routes.js` i `reservation.routes.js` — `requireRole()` provjere proširene s `'test'` ulogom
- `ProtectedRoute.jsx` — `AdminRoute` proširen za `test` rolu
- `NavBar.jsx` — `NAV_TEST` konstanta s kombinovanom navigacijom (i laborant i admin linkovi)
- `DashboardPage.jsx` — test rola prikazuje i admin i laborant sekciju dashboarda
- `EquipmentDetailPage.jsx` — admin panel za upravljanje statusom vidljiv i za `test` rolu

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** U prvom commitu (`a805194`) `NAV_TEST` nije sadržavao sve linkove — u naknadnom fix commitu (`2126f76`) dodani `/reservations/my` i `/admin/reservations` koji su bili izostavljeni.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** `test` rola nije uvedena u bazi kao formalni ENUM — korisnik se kreira s `role = 'test'` direktno u SQL-u. Prihvatljivo za QA potrebe, ali nije formalizovano u shemi.

---

## Sumarni pregled

| # | Opis | Alat | Prihvaćeno | Izmijenjeno | Odbačeno | Greška AI-a |
|---|---|---|---|---|---|---|
| 1 | Sprint 7 plan (PB8, PB9, PB10, PB13, PB14) | Claude Code | ✅ | Dodate extra stavke van plana | Paginacija na MyReservations | — |
| 2 | PB8 — Kalendar rezervacija (ReservationCalendar.jsx) | Claude Code | ✅ | — | — | Event propagation bug (odmah uočen i fixan) |
| 3 | PB9/PB10 — Pretraga i filtriranje opreme | Claude Code | ✅ | Placeholder tekst na bosanski | Server-side pretraga | — |
| 4 | PB13/PB14 — Otkazivanje i izmjena rezervacija | Claude Code | ✅ | Confirmation dialog tekst | Email notifikacija | — |
| 5 | Proširenje opreme sa servisnim podacima (US-8) | Claude Code | ✅ | Badge boje usklađene s theme.js | Upload dokumentacije (T7.5) | Seed ID konflikti (odmah fixani) |
| 6 | Sidebar navigacija (admin + svi korisnici) | Claude Code | ✅ | Redoslijed nav grupe | — | — |
| 7 | Auto-update statusa opreme na osnovu rezervacija | Claude Code | ✅ | — | Cron job za `in_use` status | — |
| 8 | 'test' rola + fix navigacije | Claude Code | ✅ | Dodani izostavljeni nav linkovi u fix commitu | — | Nepotpuna NAV_TEST u prvom commitu |

**Ukupno zabilježenih slučajeva:** 8
**Korišteni AI alati:** Claude Code (Anthropic)
**Greške AI-a:** 2 (event propagation bug u kalendaru; nepotpuna `NAV_TEST` u prvom commitu — oboje odmah uočeni i ispravljeni)
**Kritičnih grešaka:** 0
