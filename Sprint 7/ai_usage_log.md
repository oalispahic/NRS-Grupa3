# AI Usage Log — Sprint 5

> Dokument bilježi sve relevantne slučajeve korištenja AI alata tokom razvoja projekta.
> Svrha je transparentnost i procjena zrelosti u korištenju alata, ne evaluacija tima.

---

## Unos 1 — Planiranje Sprint 5 implementacije

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) — `/plan` komanda |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Generisanje detaljnog implementacijskog plana za Sprint 5 backlog stavke (PB1–PB5, PB23) na osnovu postojeće projektne dokumentacije.

**Kratak opis upita:** Korisnik je zatražio od AI-a da analizira product backlog (`Sprint 2/product_backlog_v2.md`) i napravi plan za implementaciju PB23 (autentifikacija), korisničkog dashboarda i role-based UI-a.

**Šta je AI predložio/generisao:**
- Detaljni plan u 12 koraka (backend PUT endpoint → AuthContext → routing → stranice)
- Analiza što postoji vs. što nedostaje u backendu i frontendu
- Preporučeni redoslijed implementacije
- Popis kritičnih fajlova s radnjama za svaki
- Verifikacijske tačke (8 test scenarija)
- Napomenu o JWT u sessionStorage kao sigurnosnom kompromisu

**Šta je tim prihvatio:** Cijeli plan kao osnova za implementaciju; redoslijed koraka, odabir sessionStorage za JWT, svi predloženi fajlovi.

**Šta je tim izmijenio:** Ništa značajno u fazi planiranja.

**Šta je tim odbacio:** Prijedlog za "Register stranicu" kao bonus task — odlučeno da se kreira korisnika ručno/curl metodom.

**Rizici/problemi:** Plan nije uzeo u obzir da remote repozitorij ima novu Homepage komponentu koja će uzrokovati merge konflikt — otkriveno naknadno.

---

## Unos 2 — Implementacija backend PUT /api/equipment/:id

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Ilda Avdić |

**Svrha korištenja:** Dodavanje nedostajućeg API endpointa za ažuriranje opreme.

**Kratak opis upita:** AI je identificirao da `PUT /api/equipment/:id` nije implementiran, a potreban je za PB5 (admin upravljanje opremom).

**Šta je AI predložio/generisao:**
- `equipment.repository.js` — funkcija `update(id, fields)` s COALESCE SQL patternima (parcijalni update)
- `equipment.service.js` — validacija statusa na dozvoljene ENUM vrijednosti, 404 ako oprema ne postoji
- `equipment.controller.js` — async handler s error propagacijom
- `equipment.routes.js` — `router.put('/:id', authenticate, requireRole('admin'), ...)`

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Dodan je dodatni validacijski uvjet u `equipment.service.js` koji provjerava da naziv opreme nije prazan string pri UPDATE operaciji — AI je ostavio ovo polje nevalidirano.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema — COALESCE pattern ispravno rukuje parcijalnim updateima.

---

## Unos 3 — Frontend: autentifikacijski sistem (AuthContext, hooks, ProtectedRoute)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 (PB23) |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Bilal Ozdić |

**Svrha korištenja:** Implementacija kompletnog auth sistema na frontendu — JWT storage, login/logout, zaštita ruta.

**Kratak opis upita:** Izgradnja AuthContext s React Context API-em, sessionStorage persistencom i role-based routing komponentama.

**Šta je AI predložio/generisao:**
- `AuthContext.jsx` — state `{ user, token, loading }`, `login()`, `logout()`, hidratacija iz sessionStorage
- `useAuth.js` — wrapper hook za `useContext(AuthContext)`
- `ProtectedRoute.jsx` — `<ProtectedRoute>` (redirect na /login ako nije logiran) i `<AdminRoute>` (redirect na /dashboard ako nije admin)
- `App.jsx` rewrite s BrowserRouter, svim rutama i Layout komponentom

**Šta je tim prihvatio:** Cijela implementacija; sessionStorage kao JWT storage.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa (httpOnly cookie odgođen za Sprint 6+ prema napomeni u kodu).

**Rizici/problemi:** sessionStorage je ranjiviji od httpOnly cookie za XSS napade — dokumentirano kao poznati propust u CONTEXT.md za buduće sprintove.

---

## Unos 4 — Frontend: redesign svih stranica po design sistemu

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 (PB1–PB5) |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Elma Dedić |

**Svrha korištenja:** Izgradnja kompletnog frontend UI-a (7 stranica + NavBar) po uzoru na dizajn sistem iz `HomePage.jsx`.

**Kratak opis upita:** Korisnik je zatražio da sve stranice koriste isti vizualni stil kao homepage — Inter font, lucide-react ikone, blue #2563EB, kartice s border-radius, inline CSS bez UI biblioteke.

**Šta je AI predložio/generisao:**
- `theme.js` — centralni design token fajl (PRIMARY, C, BTN, iconBox, STATUS_EQUIPMENT, STATUS_RESERVATION, GLOBAL_CSS)
- `NavBar.jsx` — fixed top nav s logo, aktivnom rutom, role badge i logout dugmetom
- `LoginPage.jsx` — lab background (Unsplash), card s shadow, ikone unutar inputa, focus border
- `DashboardPage.jsx` — role-based sadržaj, stat widgeti, quick action kartice
- `EquipmentListPage.jsx` — card grid, iconBox, status badge, hover efekti
- `EquipmentDetailPage.jsx` — header s ikonom, sidebar meta, inline forma za rezervaciju
- `MyReservationsPage.jsx` — tabela s row-hover, empty state s CTA
- `ManageEquipmentPage.jsx` — add forma + tabela s inline edit (Pencil/Check/X/Trash2)

**Šta je tim prihvatio:** Cijeli dizajn sistem i sve stranice.

**Šta je tim izmijenio:** Naziv i logo tekst u `NavBar.jsx` su ručno prilagođeni — AI je generisao generički placeholder naziv, a tim ga je zamijenio stvarnim imenom aplikacije (LabEMS) i dodao odgovarajuću kraticu.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- `theme.js` je inicijalno sadržavao JSX `Badge` komponentu u `.js` fajlu → Vite build error ("must use .jsx extension"). AI je uočio i uklonio komponentu.
- Fajlovi su pisani bez prethodnog čitanja → "File has not been read yet" greška pri Write tool. AI je koristio `head -1` workaround.

---

## Unos 5 — Git stash/pull/pop: merge remote homepage s lokalnim promjenama

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Amina Rovčanin |

**Svrha korištenja:** Integracija nove Homepage komponente s remote repozitorija u lokalne Sprint 5 promjene bez gubitka rada.

**Kratak opis upita:** Korisnik je naknadno rekao da treba pullati remote koji ima novu homepage, a lokalno je Sprint 5 već napravljen.

**Šta je AI predložio/generisao:**
- `git stash` → `git pull` → `git stash pop` workflow
- Ručno rješavanje merge konflikta u `App.jsx` (remote imao BrowserRouter s HomePage, lokalno puna routing struktura)
- Rješenje: zadržati `/` → HomePage + sve auth rute iz lokalnog
- Dodavanje `onClick={() => navigate('/login')}` na 3 "Prijava" dugmeta u `HomePage.jsx`

**Šta je tim prihvatio:** Cijeli workflow i rješenje konflikta.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** `lucide-react` je bio dodan na remote ali ne i u `node_modules` nakon stash pop → `npm install` bio potreban.

---

## Unos 6 — Generisanje CONTEXT.md tehničke dokumentacije

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Iman Salanović |

**Svrha korištenja:** Kreiranje kompletnog tehničkog referentnog dokumenta za buduće developere i AI agente koji nastavljaju rad na projektu.

**Kratak opis upita:** Nakon završetka Sprint 5 implementacije, AI je sam predložio i kreirao CONTEXT.md sa svim tehničkim detaljima projekta.

**Šta je AI predložio/generisao:** `CONTEXT.md` s 18 sekcija: opis projekta, tech stack, struktura repozitorija, design sistem tokeni, DB schema, svi API endpointi, backend arhitektura, frontend routing, auth flow, opisi stranica, kreiranje korisnika, env varijable, lokalno pokretanje, sprint plan, Sprint 6 todo, poznati propusti, deployment URL-ovi, dokumentacijski fajlovi.

**Šta je tim prihvatio:** Cijeli dokument.

**Šta je tim izmijenio:** Sekcija "Sprint 6 todo" je dopunjena s dvije dodatne stavke koje tim smatra prioritetnim, a AI ih nije uvrstio (rate limiting na login endpointu i audit log za admin akcije).

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** CONTEXT.md nije bio na disku kada je trebao biti committan (Write tool nije izvršen u prvom pokušaju) — AI ga je morao ponovo kreirati.

---

## Unos 7 — Dijagnoza i fix produkcijskog deployment problema (Vercel proxy)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Suljo Ruvić |

**Svrha korištenja:** Dijagnoza greške "Unexpected end of JSON input" pri loginu na produkciji.

**Kratak opis upita:** Korisnik je prijavio da login ne radi na `nrs.marexdev.com` — greška se dešavala pri parsiranju JSON odgovora.

**Šta je AI predložio/generisao:**
- Dijagnoza: Vite proxy (`/api/*` → localhost:3001) radi samo u dev modu; u produkciji frontend šalje API zahtjeve na isti domain koji ne zna rukovati njima → prazan HTML odgovor → JSON parse error
- Fix: `project/frontend/vercel.json` — dodat rewrite `{ "source": "/api/:path*", "destination": "https://nrs-grupa3.vercel.app/api/:path*" }` ispred catch-all rewrite-a

**Šta je tim prihvatio:** Fix u potpunosti.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Greška nije bila vidljiva u lokalnom razvoju jer Vite proxy maskira problem. Trebalo bi biti dokumentirano u onboarding materijalima.

---

## Unos 8 — Fix JWT expiresIn greške

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Harun Zukanović |

**Svrha korištenja:** Dijagnoza greške `"expiresIn" should be a number of seconds or string representing a timespan`.

**Kratak opis upita:** Login je i dalje pucao nakon Vercel proxy fixa, s novom JWT greškom.

**Šta je AI predložio/generisao:**
- Dijagnoza: `JWT_EXPIRES_IN` env varijabla je postavljena na Vercelu s nevažećim formatom (prazan string, razmak ili sl.)
- Code fix: promjena fallbacka s `'15m'` na `'8h'` u `auth.service.js`
- Instrukcija: provjeri/ukloni `JWT_EXPIRES_IN` u Vercel backend env vars

**Šta je tim prihvatio:** Code fix i instrukcija za Vercel.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Code fix ne pomaže ako je env var *postavljena* s nevažećom vrijednošću (jer `|| '8h'` se ne aktivira). Pravi fix je bio na Vercelu, ne u kodu.

---

## Unos 9 — Kreiranje korisnika s pogrešnim bcrypt hashom

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Kemal Mešić |

**Svrha korištenja:** Kreiranje admin korisnika direktno u bazi dok login API nije radio.

**Kratak opis upita:** Korisnik je tražio SQL za direktno INSERT korisnika s admin ulogom u Supabase.

**Šta je AI predložio/generisao:** SQL INSERT s ručno napisanim bcrypt hashom za lozinku `admin123`.

**Šta je tim prihvatio:** SQL INSERT je pokrenut u Supabase.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa (korisnik nije znao da je hash neispravan).

**Rizici/problemi:** **Greška AI-a** — hash je bio izmišljen, nije bio validan bcrypt hash za `admin123`. Korisnik je dobio "Invalid credentials" pri pokušaju logina. AI je naknadno generisao ispravan hash pokretanjem `bcrypt.hash()` lokalno i proslijedio SQL UPDATE za korekciju. **Pouka: nikad ne pisati bcrypt hashove ručno — uvijek ih generisati programski.**

---


## Unos 11 — Generisanje seed podataka za bazu (60 aparata)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Elma Dedić |

**Svrha korištenja:** Punjenje baze s realističnim testnim podacima za demonstraciju i razvoj.

**Kratak opis upita:** Korisnik je zatražio 50–100 različitih laboratorijskih aparata kao dummy podatke.

**Šta je AI predložio/generisao:** SQL INSERT s 60 laboratorijskih aparata uključujući: mikroskope, centrifuge, PCR aparate, spektrofotometre, HPLC/GC-MS sustave, flow citometre, NMR, FTIR i dr. — s realističnim nazivima modela (Olympus, Eppendorf, Bio-Rad, Thermo, Bruker...), opisima, lokacijama (Sala A1–E2, Skladišta) i raznolikim statusima.

**Šta je tim prihvatio:** Cijeli INSERT (60 stavki).

**Šta je tim izmijenio:** Nekoliko lokacija je ručno prilagođeno tako da odgovaraju stvarnoj raspodjeli prostorija u laboratoriju (neke AI-generisane oznake sala nisu odgovarale stvarnoj nomenklaturi).

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema — čisti INSERT bez constraint konflikata.

---

## Sumarni pregled

| # | Opis | Prihvaćeno | Izmijenjeno | Odbačeno | Greška AI-a |
|---|---|---|---|---|---|
| 1 | Sprint 5 plan | ✅ | — | Register stranica | — |
| 2 | Backend PUT endpoint | ✅ | Validacija naziva opreme | — | — |
| 3 | Auth sistem (AuthContext, hooks, routing) | ✅ | — | — | — |
| 4 | Frontend redesign (7 stranica + NavBar) | ✅ | Naziv/logo u NavBar | — | Build error (JSX u .js) |
| 5 | Git stash/pull/merge | ✅ | — | — | — |
| 6 | CONTEXT.md dokumentacija | ✅ | Sprint 6 todo dopunjen | — | File nije bio zapisan |
| 7 | Vercel proxy fix | ✅ | — | — | — |
| 8 | JWT expiresIn fix | ✅ | — | — | Fix nije bio dovoljan bez Vercel env promjene |
| 9 | Kreiranje korisnika (bcrypt hash) | ✅ | — | — | **Neispravan bcrypt hash** |
| 10 | Git rewrite (uklanjanje co-authora) | ✅ | — | — | — |
| 11 | Seed podaci (60 aparata) | ✅ | Oznake lokacija/sala | — | — |

**Ukupno zabilježenih slučajeva:** 11
**Greške AI-a:** 3 (JSX u .js fajlu, CONTEXT.md nije bio zapisan, neispravan bcrypt hash)
**Kritičnih grešaka:** 1 (bcrypt hash — direktno uzrokovao "Invalid credentials" u produkciji)

# AI Usage Log — Sprint 6

> Dokument bilježi sve relevantne slučajeve korištenja AI alata tokom Sprint 6.  
> Format: identičan Sprint 5 AI usage logu.

---

## Unos 1 — Planiranje i implementacija PB28 (registracija korisnika)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-05 |
| **Sprint** | Sprint 6 |
| **Alat** | Claude Code (Anthropic) — `/plan` komanda |
| **Ko je koristio** | Elma Dedić |

**Svrha korištenja:** Analiza projektnog konteksta i planiranje implementacije PB28 — stranica za registraciju korisnika s automatskom dodjelom `laborant` role i mogućnošću korišćenja slobodnog username-a (ne nužno email format).

**Kratak opis upita:** Korisnik je zatražio od AI-a da pročita `CONTEXT.md` i `product_backlog_v2.md`, identificira šta treba biti urađeno za PB28 u Sprint 6, a da uzme u obzir da PB6 već postoji. Username ne mora biti u email formatu.

**Šta je AI predložio/generisao:**
- Plan u 6 koraka: user.repository → auth.service → AuthContext → LoginPage → RegisterPage (novi) → App.jsx
- Odluka: nema DB migracije — `email` kolona ostaje, samo se API/frontend preslikava na `username` koncept
- `user.repository.js` — `findByUsername()` umjesto `findByEmail()`, `create()` prima `username`
- `auth.service.js` — primanje `username` u requesta, JWT payload s `username` field-om, Bosnian-friendly error poruke
- `AuthContext.jsx` — login šalje `{ username, password }` umjesto `{ email, password }`
- `LoginPage.jsx` — promjena labela, ikone (Mail → User), tipa inputa (`email` → `text`), link na `/register`
- `RegisterPage.jsx` — novi fajl, forma s 3 fielda, isti visual stil kao LoginPage
- `App.jsx` — nova javna ruta `/register`

**Šta je tim prihvatio:** Cijeli plan i implementacija.

**Šta je tim izmijenio:** `RegisterPage.jsx` je blago izmijenjen (placeholder tekst prilagođen realnim primjerima koji odgovaraju konvencijama tima).

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema — DB kolona `email` je VARCHAR bez format constrainta, prihvata bilo koji string. Postojeći korisnici s email-format usernames rade nativno.

---

## Unos 2 — Rješavanje merge konflikta u PR #5 (GitHub Copilot)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-06 |
| **Sprint** | Sprint 6 |
| **Alat** | GitHub Copilot (coding agent — `@copilot` mention u PR komentaru) |
| **Ko je koristio** | Omar Alispahić (trigger); Bilal Ozdić (autor PR-a) |

**Svrha korištenja:** Automatsko rješavanje merge konflikata u PR #5 (`feature/pb7-oprema → main`) koji su nastali jer su paralelno mijenjani isti fajlovi na `main` grani i na feature grani.

**Kratak opis upita:** Omar je u komentaru PR-a napisao `@copilot resolve the merge conflicts in this pull request`. Copilot je pokrenuo agensku sesiju i riješio konflikte bez ručne intervencije tima.

**Šta je AI predložio/generisao:**
- Identifikacija dva konfliktna fajla: `project/backend/src/services/equipment.service.js` i `project/frontend/src/pages/EquipmentDetailPage.jsx`
- `equipment.service.js` — zadržana kompletna verzija s feature grane, koja uključuje normalizacijske helpere i validaciju za `serial_number`, `model`, `manufacturer` i ostala polja
- `EquipmentDetailPage.jsx` — merge obje strane: `fmtDate` helper i detaljan equipment sidebar s feature grane + admin status management panel (`STATUSES` konstanta, `handleStatusSave` i sl.) s `main` grane
- Merge commit `9e083d4` kreiran i automatski pushovan na granu

**Šta je tim prihvatio:** Cijelo rješenje konflikta; Omar pregledao i mergao PR u `main`.

**Šta je tim izmijenio:** Ništa — merge commit prihvaćen u potpunosti.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema — Copilot je ispravno razlikovao šta dolazi s koje grane i nije izgubio nijednu funkcionalnost. Prihvatanje merge commita bez detaljnog code reviewa nosi teorijski rizik, ali tim je potvrdio da produkcija radi ispravno.

---

## Unos 3 — Dopune PB7, PB24, PB26 + frontend polish

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-05 |
| **Sprint** | Sprint 6 |
| **Alat** | Claude Code (Anthropic) — `/plan` komanda |
| **Ko je koristio** | Amina Rovčanin |

**Svrha korištenja:** Identifikacija konkretnih praznina u već-implementiranim Sprint 6 stavkama (PB7, PB24, PB26) i polishing frontenda s animacijama i skeleton loaderima.

**Kratak opis upita:** Korisnik je zatražio da AI provjeri što može još biti urađeno za PB7, PB26 i PB24 (sve označene kao "uglavnom implementirano"), te da uljepša frontend s glatkim tranzicijama i skeleton loader-ima.

**Šta je AI predložio/generisao:**

*PB7 dopuna:*
- `EquipmentDetailPage.jsx` — admin panel "Upravljanje statusom" (select + dugme) koji se prikazuje samo kad je `user.role === 'admin'`; poziva postojeći `PUT /api/equipment/:id`

*PB26 dopune:*
- `reservation.service.js` + `equipment.service.js` — prevedene sve error poruke na bosanski
- `EquipmentDetailPage.jsx` — client-side validacija: `if (endTime <= startTime) setErrorMsg(...)` prije API poziva

*PB24 dopuna:*
- `ProtectedRoute.jsx` — `<LoadingScreen />` komponenta s centralnim plavim spinner-om umjesto `return null`

*Frontend polish:*
- `theme.js` — `@keyframes labFadeIn` (fade-in 0.18s na `.app-container`), `@keyframes labShimmer` + `.skeleton` klasa, `transition: border-color 0.15s` na inputima
- `EquipmentListPage.jsx` — 6 skeleton kartica tokom loadinga
- `MyReservationsPage.jsx` — skeleton tabela (header + 4 reda) tokom loadinga
- `EquipmentDetailPage.jsx` — spinner za detail loading, `labFadeIn` na formi za rezervaciju i admin panelu

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Tekstualni sadržaj bosanskih error poruka u `reservation.service.js` blago prilagođen — AI-generisane poruke su korektne, ali tim je uskladio terminologiju s ostatkom aplikacije (npr. "početak" umjesto "pocetak").

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- `EquipmentDetailPage.jsx` nije bio pročitan prije Write operacije → "File has not been read yet" error; AI je pročitao 5 linija pa nastavio — standardni workaround.

---

## Sumarni pregled

| # | Opis | Alat | Prihvaćeno | Izmijenjeno | Odbačeno | Greška AI-a |
|---|---|---|---|---|---|---|
| 1 | PB28 — registracija korisnika + username refactor | Claude Code | ✅ | Placeholder tekst u RegisterPage | — | — |
| 2 | Rješavanje merge konflikta (PR #5) | GitHub Copilot | ✅ | — | — | — |
| 3 | PB7/PB24/PB26 dopune + frontend polish | Claude Code | ✅ | Bosanske error poruke (terminologija) | — | Write bez prethodnog Read (minor) |

**Ukupno zabilježenih slučajeva:** 3
**Korišteni AI alati:** Claude Code (Anthropic), GitHub Copilot
**Greške AI-a:** 1 (minor — Write tool bez Read-a, odmah riješeno)
**Kritičnih grešaka:** 0

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
