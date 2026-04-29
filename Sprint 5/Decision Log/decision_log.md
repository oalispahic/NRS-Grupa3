# Decision Log — LabEMS (NRS-Grupa3)

> Sprint 5 · 2026-04-28
> Evidentiranje svjesnih projektnih, arhitektonskih i tehničkih odluka. Decision Log pokazuje da tim ne radi nasumično, nego svjesno donosi i prati odluke.

---

## Sumarni pregled

| ID | Naziv odluke | Datum | Oblast | Status |
|---|---|---|---|---|
| OD-001 | JWT pohrana u sessionStorage umjesto httpOnly cookie | 2026-04-28 | Sigurnost / Arhitektura | Aktivna |
| OD-002 | Odbacivanje Register stranice — kreiranje korisnika curl metodom | 2026-04-28 | Zahtjevi / Opseg | Aktivna |
| OD-003 | Inline CSS s centralnim design tokenima umjesto UI biblioteke | 2026-04-28 | Frontend / UI | Aktivna |
| OD-004 | Vercel rewrite pravila za API proxy u produkciji | 2026-04-28 | Deployment / DevOps | Aktivna |
| OD-005 | COALESCE pattern za parcijalni UPDATE opreme | 2026-04-28 | Backend / API | Aktivna |
| OD-006 | Force push za uklanjanje Claude co-authorship iz git historije | 2026-04-28 | Verzionisanje / Git | Aktivna |
| OD-007 | JWT fallback trajanje 8h umjesto 15m | 2026-04-28 | Backend / Sigurnost | Aktivna |
| OD-008 | Kreiranje tehničke dokumentacije (CONTEXT.md) kao living document | 2026-04-28 | Dokumentacija | Aktivna |

---

## Detaljan pregled odluka

---

### OD-001 — JWT pohrana u sessionStorage umjesto httpOnly cookie

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
Potrebno je odabrati mehanizam pohrane JWT tokena na frontendu koji balansira sigurnost i kompleksnost implementacije u okviru Sprint 5.

**Razmatrane opcije:**
1. `sessionStorage` — jednostavna JS implementacija, token ne preživljava zatvaranje taba
2. `localStorage` — preživljava zatvaranje taba, veći XSS rizik
3. `httpOnly cookie` — najpouzdanija zaštita od XSS, zahtijeva backend promjene i CORS konfiguraciju

**Odabrana opcija:** `sessionStorage`

**Razlog izbora:**
`httpOnly cookie` odgođen zbog kompleksnosti CORS konfiguracije i vremenskih ograničenja sprinta. `sessionStorage` je dovoljan za akademski projekat u ovoj fazi — token se gubi zatvaranjem taba, što ograničava napadnu površinu.

**Posljedice odluke:**
Token nije persistentan između sesija. Poznat XSS rizik — dokumentiran u `CONTEXT.md` kao tehnički dug za Sprint 6+.

---

### OD-002 — Odbacivanje Register stranice — kreiranje korisnika curl metodom

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
Sprint 5 zahtijeva autentifikaciju, ali nije definisano da li registracija novih korisnika mora biti dostupna kroz UI.

**Razmatrane opcije:**
1. Implementacija Register stranice (UI za kreiranje naloga)
2. Kreiranje korisnika direktno u bazi (Supabase SQL INSERT ili curl)
3. Admin-only UI forma za kreiranje korisnika

**Odabrana opcija:** Kreiranje korisnika ručno/curl metodom — bez Register stranice

**Razlog izbora:**
Register stranica nije bila eksplicitni zahtjev ni jednog user storyja u Sprintu 5. Tim je procijenio da je implementacija van opsega sprinta i da curl metoda pokriva potrebe razvoja i testiranja.

**Posljedice odluke:**
Sistem ne može samostalno onboardovati nove korisnike — korisnici se kreiraju ručno od strane administratora. Prihvatljivo ograničenje za trenutnu fazu projekta.

---

### OD-003 — Inline CSS s centralnim design tokenima umjesto UI biblioteke

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
Potrebno je odabrati pristup stiliziranja koji osigurava konzistentan vizualni identitet bez dodavanja vanjskih zavisnosti.

**Razmatrane opcije:**
1. CSS framework (Tailwind CSS)
2. UI biblioteka komponenti (Material UI, Chakra UI)
3. Centralni design token fajl + inline CSS bez biblioteke

**Odabrana opcija:** Centralni design token fajl (`theme.js`) + inline CSS

**Razlog izbora:**
Tim je htio vizualnu konzistentnost bez ovisnosti o trećim bibliotekama koje bi uvele overhead. `theme.js` omogućava jedan izvor istine za boje, razmake i tipografiju, koji se može lako referencirati i mijenjati.

**Posljedice odluke:**
Stiliziranje zahtijeva više ručnog pisanja CSS-a, ali tim ima punu kontrolu. Build error pri pokretanju uzrokovan greškom (JSX `Badge` komponenta u `.js` fajlu) — otkriven i uklonjen tokom razvoja.

---

### OD-004 — Vercel rewrite pravila za API proxy u produkciji

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
Vite dev proxy (`/api/*` → `localhost:3001`) ne radi u produkcijskom deploymentu — frontend u produkciji šalje zahtjeve na isti domain, koji ne može rukovati API pozivima, što uzrokuje `"Unexpected end of JSON input"` grešku.

**Razmatrane opcije:**
1. Hardkodirati punu backend URL adresu u frontend kodu
2. Koristiti environment varijablu za backend URL s prefiksom u kodu
3. Vercel rewrite pravilo u `vercel.json` za preusmjeravanje `/api/*` na backend

**Odabrana opcija:** Vercel rewrite u `vercel.json`: `/api/:path*` → `https://nrs-grupa3.vercel.app/api/:path*`

**Razlog izbora:**
Rewrite pravilo transparentno preusmjerava API pozive bez potrebe za izmjenom frontend koda. Zadržava isti relativni URL pattern koji radi u razvoju, što minimizira razlike između okruženja.

**Posljedice odluke:**
Frontend kod ostaje nepromijenjen i ne sadrži hardkodirane URL-ove. Rješenje je specifično za Vercel — pri migraciji na drugi hosting zahtijeva prilagodbu konfiguracije.

---

### OD-005 — COALESCE pattern za parcijalni UPDATE opreme

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
`PUT /api/equipment/:id` endpoint mora podržavati slanje samo dijela polja (npr. samo status ili samo opis) bez brisanja ostalih vrijednosti u bazi.

**Razmatrane opcije:**
1. Zahtijevati sva polja pri svakom PUT zahtjevu (full replacement semantika)
2. PATCH semantika s eksplicitnom listom promijenjenih polja
3. COALESCE SQL pattern: `UPDATE SET field = COALESCE($new, field)`

**Odabrana opcija:** COALESCE SQL pattern u `equipment.repository.js`

**Razlog izbora:**
COALESCE elegantno rješava parcijalni update bez potrebe za promjenom API kontrakta ili dodavanjem posebnog PATCH endpointa. Polja koja nisu proslijeđena ostaju nepromijenjena na bazi.

**Posljedice odluke:**
Nije moguće eksplicitno postaviti polje na NULL kroz ovaj endpoint. Tim je naknadno dodao validaciju praznog naziva opreme koju AI nije pokrio u inicijalnoj generaciji.

---

### OD-006 — Force push za uklanjanje Claude co-authorship iz git historije

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
Claude Code je automatski dodavao `Co-Authored-By: Claude Sonnet 4.6` u commit poruke, što nije željeno ponašanje za projektnu historiju.

**Razmatrane opcije:**
1. Ostaviti co-authorship zapise u historiji
2. Interaktivni rebase (`git rebase -i`) s uređivanjem commit poruka
3. Non-interactive workflow: patch fajlovi → reset → apply → novi commit → force push

**Odabrana opcija:** Non-interactive patch + force push na `main`

**Razlog izbora:**
Interaktivni rebase zahtijeva editor (vim/nano) koji nije bio dostupan u Claude Code okruženju. Patch workflow je pouzdan i automatizaciji podložan bez ručne intervencije u editoru.

**Posljedice odluke:**
Javna git historija je repisana. Svi kolaboratori moraju uraditi `git pull --rebase` ili `git fetch + reset`. Prihvatljivo za manji, koordiniran tim.

---

### OD-007 — JWT fallback trajanje 8h umjesto 15m

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
`JWT_EXPIRES_IN` env varijabla na Vercelu je bila postavljena s nevažećim formatom, uzrokujući grešku pri svakom login pokušaju. Potrebno je odabrati prikladan fallback i pravi uzrok ukloniti.

**Razmatrane opcije:**
1. Kratki fallback (`'15m'`) — sigurniji, ali korisnici često moraju ponovo da se prijavljuju
2. Dugi fallback (`'8h'`) — odgovara radnom danu, praktičniji za korisnike
3. Ukloniti env varijablu s Vercela i osloniti se isključivo na hardkodirani fallback

**Odabrana opcija:** Fallback promijenjen na `'8h'`; pravi fix je brisanje nevažeće env varijable s Vercela

**Razlog izbora:**
8h odgovara tipičnoj radnoj sesiji bez potrebe za ponovnom prijavom. Samo code fix nije bio dovoljan — env var s nevažećom vrijednošću ima prednost nad `||` fallbackom, pa je pravi fix bio na Vercelu.

**Posljedice odluke:**
Korisnici ostaju prijavljeni do 8 sati. Naučena lekcija: env varijable s nevažećim vrijednostima ne smiju se tiho ignorisati — potrebna je eksplicitna validacija pri startu servera.

---

### OD-008 — Kreiranje tehničke dokumentacije (CONTEXT.md) kao living document

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-04-28 |
| **Status** | Aktivna |

**Opis problema:**
Projekat nema centralno mjesto za tehničku dokumentaciju — novi developeri i AI agenti nemaju kontekst o arhitekturi, env varijablama, API endpointima i poznatim propustima.

**Razmatrane opcije:**
1. README.md proširiti s tehničkim detaljima
2. Wiki na GitHubu
3. Poseban `CONTEXT.md` fajl optimiziran za AI agente i developere

**Odabrana opcija:** `CONTEXT.md` s 18 sekcija kao primarna tehnička referenca

**Razlog izbora:**
README je namijenjen korisnicima, ne developerima. `CONTEXT.md` može biti precizno strukturiran za strojno čitanje (AI agenti) i ručno pretraživanje. Tim je dopunio sekciju Sprint 6 planova s dodatnim stavkama koje AI nije predvidio (rate limiting na login endpointu, audit log za admin akcije).

**Posljedice odluke:**
Svaki sprint zahtijeva ažuriranje `CONTEXT.md`. Rizik zastarjelosti dokumentacije ako tim zaboravi ažurirati. Dokumentovani poznati propusti (sessionStorage) jasno označavaju tehnički dug za naredne sprintove.
