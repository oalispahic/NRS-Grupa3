# AI Usage Log — LabEMS (NRS-Grupa3)

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

## Unos 10 — Rewrite git historije (uklanjanje Claude Co-Authored-By)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Sprint** | Sprint 5 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Uklanjanje `Co-Authored-By: Claude Sonnet 4.6` iz commit poruka koje je AI automatski dodavao.

**Kratak opis upita:** Korisnik je zatražio da se ukloni Claude kao contributor u GitHub historiji.

**Šta je AI predložio/generisao:**
- Non-interactive git rebase workflow: `git diff` u patch fajlove → `git reset --hard` → `git apply` + novi commit bez co-author → force push
- Feedback da se ovo ne ponavlja u budućim commitima

**Šta je tim prihvatio:** Cijeli workflow; force push na main.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Force push repisuje javnu historiju — kolaboratori trebaju `git pull --rebase` ili `git fetch + reset`. U kontekstu ovog projekta prihvatljivo jer je tim manji i koordiniran.

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
