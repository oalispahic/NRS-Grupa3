# AI Usage Log — Sprint 8

> Dokument bilježi sve relevantne slučajeve korištenja AI alata tokom razvoja projekta.
> Svrha je transparentnost i procjena zrelosti u korištenju alata, ne evaluacija tima.

---

## Unos 1 — Kreiranje Product Backlog V3.0

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Sprint** | Sprint 8 |
| **Alat** | Claude Code (Anthropic) — `/plan` komanda |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Restrukturiranje product backloga — redistribucija Sprint 11 stavki (PB18, PB19, PB20) u Sprintove 8–10 jer Sprint 11 neće biti realizovan, te dodavanje 12 novih PB stavki.

**Kratak opis upita:** Korisnik je zatražio od AI-a da preuzme format iz `Sprint 2/product_backlog_v2.md`, doda 12 novih PB stavki s frontend feedbackom, zamijeni PB18 (slike opreme — prezahtijevano) s nečim primjerenijim, te rasporedi stavke tako da Sprintovi 8, 9 i 10 imaju tačno po 8 stavki.

**Šta je AI predložio/generisao:**
- 12 novih PB stavki (PB29–PB40) s naglaskom na vizualne i frontend feature (profil, toast, grafikoni, paginacija, favoriti, napredna pretraga, historija, tagovi, brzi pregled, podsjetnici, mobilni dizajn)
- Zamjena PB18 s "Kategorije opreme" (manje kompleksno od file uploada)
- Zamjena PB39 (CSV import) s "Pretraga po tagovima" jer je CSV import već bio implementiran ranije
- Uravnotežena raspodjela po sprintovima (po 8 stavki za Sprintove 8–10)
- Kompletan HTML table format identičan V2 predlošku

**Šta je tim prihvatio:** Cijela struktura; svih 12 novih stavki; raspodjela po sprintovima.

**Šta je tim izmijenio:** PB30 (Toast notifikacije) i PB12 (Pregled svih rezervacija) naknadno izbačeni iz Sprint 8 plana jer su bili implementirani u ranijim sprintovima. Zamijenjeni s PB41 (Status mozaik) i PB42 (Timeline rezervacija).

**Šta je tim odbacio:** Prijedlog za PB39 kao CSV import — tim je potvrdio da je ova funkcionalnost već ranije bila implementirana.

**Rizici/problemi:** Inicijalni prijedlog nije uzeo u obzir da su neke stavke već bile implementirane prije Sprinta 8.

---

## Unos 2 — Implementacija backend infrastrukture (PB11, PB15, PB25, PB19, PB36)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Sprint** | Sprint 8 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Kompletna backend implementacija za 5 Sprint 8 stavki — notifikacije, trenutno korištenje, log aktivnosti, ocjenjivanje i tagovi.

**Kratak opis upita:** Korisnik je zatražio implementaciju svih backend modula za Sprint 8 po uobičajenoj repository/service/controller arhitekturi projekta.

**Šta je AI predložio/generisao:**
- SQL migracije 005–008: `notifications`, `activity_logs`, `equipment_ratings`, `tags` + `equipment_tags`
- Kompletni repository, service i controller slojevi za sve module
- `json_agg` agregacija tagova direktno u `equipment.repository.js` (findAll i findById)
- Fire-and-forget pattern za logovanje (`activityService.log(...).catch(() => {})`)
- `reservation.repository.js` — nova funkcija `findCurrentlyActive()` za trenutno aktivne rezervacije
- Aktivnostni logging u `auth.service.js` (register, login) i `reservation.service.js` (create, approve, reject, cancel)
- Notifikacije pri odobravanju i odbijanju rezervacija
- Validacija ocjene: rezervacija mora biti odobrena, termin završen, bez duplicirane ocjene

**Šta je tim prihvatio:** Cijela arhitektura i implementacija.

**Šta je tim izmijenio:** Ništa značajno.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- Inicijalno `approveReservation` i `rejectReservation` nisu proslijeđivali `userId` admina u log — u aktivnostnom logu polje "Korisnik" je ostajalo prazno za ove akcije. Otkriveno i ispravljeno naknadno (vidjeti Unos 6).
- Ruta `GET /reservations/current` morala je biti registrirana ispred `GET /reservations/:id` kako bi se izbjegao routing konflikt.

---

## Unos 3 — Implementacija frontend modula (PB11, PB15, PB25)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Sprint** | Sprint 8 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Bilal Ozdić |

**Svrha korištenja:** Implementacija frontend stranica i komponenti za notifikacije, log aktivnosti i prikaz trenutnog korištenja.

**Kratak opis upita:** Kreiranje `ActivityLogPage.jsx` i `CurrentUsagePage.jsx` te integracija `NotificationBell` komponente u `AdminLayout.jsx`.

**Šta je AI predložio/generisao:**
- `ActivityLogPage.jsx` — tabela s color-coded action badge-ovima, paginacijom (50/stranica), mobilnim karticama
- `CurrentUsagePage.jsx` — statistički bar s brojem aktivnih sesija i zadnjim osvježenjem, tabela s opremom/korisnikom/trajanjem, "preostalo vrijeme" u crvenoj boji ako < 1h, dugme za refresh s animacijom
- `NotificationBell` u `AdminLayout.jsx` — polling svakih 30s, click-outside-to-close, mark-all-read, crvena točkica za unread
- Integracija novih ruta u `App.jsx` i navigacijskih linkova u sidebar

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- `NotificationBell` je inicijalno pristupao `user._token` (nepostojeće svojstvo) — token je morao biti eksplicitno proslijeđen kao prop iz `AdminLayout` gdje je dostupan kroz `useAuth()`.

---

## Unos 4 — Implementacija PB36 (Tagovi) i PB29 (Profil korisnika)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Sprint** | Sprint 8 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Elma Dedić |

**Svrha korištenja:** Implementacija sustava tagova za opremu na frontendu i kompletne stranice korisničkog profila.

**Kratak opis upita:** Korisnik je zatražio interaktivne tagove na listi opreme i detalju opreme, admin upravljanje tagovima te stranicu profila s formom za izmjenu podataka i promjenom lozinke.

**Šta je AI predložio/generisao:**

*Tagovi:*
- `EquipmentListPage.jsx` — chip filteri za tagove, klik na tag filtrira listu, "Poništi" dugme, tagovi vidljivi na karticama opreme
- `EquipmentDetailPage.jsx` — tag badge-ovi uz status badge
- `ManageEquipmentPage.jsx` — "Upravljanje tagovima" sekcija s color inputom, inline toggle za dodjelu tagova po aparatu

*Profil:*
- `ProfilePage.jsx` — avatar s gradijentom, role badge, forma za izmjenu imena, forma za promjenu lozinke (zahtijeva trenutnu)
- `user.service.js` + `user.repository.js` — `getProfile` i `updateProfile` funkcije

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema.

---

## Unos 5 — Implementacija PB41 (Status mozaik) i PB42 (Timeline) + proširenje profila

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Sprint** | Sprint 8 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Dodavanje dva nova vizualna feature-a na dashboard te proširenje profila s dodatnim osobnim podacima.

**Kratak opis upita:** Korisnik je zatražio od AI-a da smisli dva "kul i vizualno privlačna" feature-a koji odgovaraju temi, implementira ih i ažurira backlog. Zatim proširenje profila s bio, institutcijom, odsjekom, telefonom i stepenom obrazovanja.

**Šta je AI predložio/generisao:**

*PB41 — Status mozaik:*
- `EquipmentMosaic` komponenta u `DashboardPage.jsx` — 18×18px kvadratići za svaki aparat, obojeni prema statusu, hover efekt skaliranja, fixed-position tooltip s imenom i lokacijom, legenda s brojačima
- `STATUS_COLORS` konstanta mapira statuse na boje

*PB42 — Timeline:*
- `ReservationTimeline` komponenta — 7-kolona horizontalni grid, prikazuje zauzetu (approved) opremu po danima, "Danas"/"Sutra" labele, prazni dani s dashed okvirom

*Proširenje profila:*
- Migracija `009_user_profile_fields.sql` — 5 nullable kolona (bio, institution, department, phone, degree)
- Ažuriran `user.repository.js` i `user.service.js` za nova polja
- Redizajniran `ProfilePage.jsx` s ikonama, bojama, progress barom kompletnosti, 2-kolona layout za kratka polja

**Šta je tim prihvatio:** Cijela implementacija; pristup s progress barom kompletnosti profila.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** `EquipmentMosaic` i `ReservationTimeline` su definirani ali nisu bili odmah integrirani u `AdminDashboard` i `LaborantDashboard` — wiring je dodan u sljedećem koraku.

---

## Unos 6 — Fix grešaka: dupli timeline, activity log userId, akcije u rezervacijama

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Sprint** | Sprint 8 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Ispravka 4 uočene greške/UX propusta nakon inicijalnog pregleda implementacije.

**Kratak opis upita:** Korisnik je prijavio: (1) dashboard timeline se pojavljuje dva puta, (2) activity log ne prikazuje ko je odobrio rezervaciju, (3) akcije kolona u rezervacijama nije jasna, (4) notifikacijski bell nije jasno vidljiv niti komunicira svoju funkciju.

**Šta je AI predložio/generisao:**

*(1) Dupli timeline:*
- Uklonjen `<ReservationTimeline>` iz `LaborantDashboard` — ostaje samo u `AdminDashboard`
- `ReservationTimeline` vraćen na horizontalni 7-kolona grid (korisnik je potvrdio da je original bio vizualno bolji)

*(2) Activity log userId:*
- `reservation.controller.js` — proslijeđen `req.user.id` u `approveReservation` i `rejectReservation`
- `reservation.service.js` — `approveReservation(id, adminUserId)` i `rejectReservation(id, adminUserId)` primaju i proslijeđuju `userId` u `activityService.log()`

*(3) Akcije kolona:*
- Zasebna "Akcije" kolona uklonjena iz tabele rezervacija
- "Odobri"/"Odbij" dugmad premještena inline u Status ćeliju, vidljiva samo za pending stavke

*(4) Notifikacijski bell:*
- Redesigniran u full-width dugme s labelom "Notifikacije" + numerički unread badge
- Aktivan (otvoren) state označen plavim obrubom i pozadinom umjesto jedva vidljive rgba promjene
- Dropdown se otvara prema gore (bottom: 46px) jer je dugme na dnu sidebara

**Šta je tim prihvatio:** Sva 4 fixa.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema.

---

## Unos 7 — Pokretanje DB migracija na Supabase

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Sprint** | Sprint 8 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Primjena SQL migracija 005–009 na produkcijsku Supabase bazu podataka.

**Kratak opis upita:** Korisnik je zatražio pokretanje migracija nakon završetka implementacije.

**Šta je AI predložio/generisao:**
- Dijagnoza: `psql` nije instaliran na sistemu; brew instalacija pokrenuta u pozadini
- Alternativno rješenje: privremeni Node.js skript koji koristi `pg` paket već instaliran u backendu
- Skript `run_migrations.js` pokrenut iz `project/backend/` direktorija s DB kredencijalima iz `.env`

**Šta je tim prihvatio:** Node.js workaround za pokretanje migracija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Čekanje na brew instalaciju psql-a.

**Rizici/problemi:** `.env` fajl s kredencijalima je pročitan direktno od AI-a — prihvatljivo u lokalnom razvoju, ali naglašava važnost da `.env` nikad ne dođe u git historiju. Privremeni skript je obrisan nakon uspješnog izvršavanja.

---

## Sumarni pregled

| # | Opis | Alat | Prihvaćeno | Izmijenjeno | Odbačeno | Greška AI-a |
|---|---|---|---|---|---|---|
| 1 | Kreiranje Product Backlog V3.0 | Claude Code | ✅ | PB30/PB12 zamijenjeni s PB41/PB42 | PB39 kao CSV import | Nije uzeo u obzir ranije implementirane stavke |
| 2 | Backend infrastruktura (5 modula) | Claude Code | ✅ | — | — | userId nije proslijeđen za approve/reject log; routing konflikt |
| 3 | Frontend (notifikacije, log, korištenje) | Claude Code | ✅ | — | — | NotificationBell pristupao `user._token` umjesto prop-a |
| 4 | Tagovi + Profil korisnika | Claude Code | ✅ | — | — | — |
| 5 | PB41 (mozaik), PB42 (timeline), proširenje profila | Claude Code | ✅ | — | — | Komponente definirane ali ne i wired u dashboard |
| 6 | Fix: dupli timeline, activity log, akcije, bell | Claude Code | ✅ | — | — | — |
| 7 | DB migracije na Supabase | Claude Code | ✅ | — | psql čekanje | — |

**Ukupno zabilježenih slučajeva:** 7  
**Korišteni AI alati:** Claude Code (Anthropic)  
**Greške AI-a:** 4 (userId nije proslijeđen u log; routing konflikt; pogrešan token pristup; komponente nisu bile wired — sve odmah uočene i ispravljene)  
**Kritičnih grešaka:** 0
