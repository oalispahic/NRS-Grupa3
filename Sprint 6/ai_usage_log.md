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
