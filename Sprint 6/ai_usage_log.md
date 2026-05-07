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
