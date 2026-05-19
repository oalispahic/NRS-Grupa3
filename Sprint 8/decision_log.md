# Decision Log — Sprint 5

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


# Decision Log — Sprint 6

> **Sprint 6** · 06.05.2026.  
> Evidentiranje svjesnih projektnih, arhitektonskih i tehničkih odluka. Ovaj dokument pokazuje evoluciju sistema i rješavanje tehničkog duga iz prethodnih faza.

---

## Sumarni pregled

| ID | Naziv odluke | Datum | Oblast | Status |
|---|---|---|---|---|
| OD-009 | Uvođenje Playwright-a za E2E testiranje | 2026-05-12 | Kvalitet / QA | Aktivna |
| OD-010 | Implementacija Audit Log sistema (Trigger/Table) | 2026-05-12 | Backend / Sigurnost | Aktivna |
| OD-011 | Rate Limiting na Login ruti | 2026-05-12 | Sigurnost | Aktivna |
| OD-012 | Standardizacija Error Handling-a u repozitorijima | 2026-05-12 | Arhitektura | Aktivna |
| OD-013 | Versionirana SQL migracija baze podataka | 2026-05-12 | DevOps / DB | Aktivna |

---

## Detaljan pregled odluka

### OD-009 — Uvođenje Playwright-a za E2E testiranje

**Opis problema:** Ručno testiranje kritičnih putanja (Login, CRUD opreme) postalo je usko grlo. Potrebna je automatizacija koja simulira stvarnog korisnika.

**Odabrana opcija:** Playwright framework.  
**Razlog izbora:** Bolja podrška za moderne web aplikacije u odnosu na Cypress/Selenium i lakša integracija sa CI/CD alatima.  
**Posljedice:** Povećana stabilnost aplikacije; duže vrijeme trajanja build procesa zbog izvršavanja testova.

---

### OD-010 — Implementacija Audit Log sistema

**Opis problema:** Sistem nije pratio ko je izvršio promjene na opremi, što je ključno za laboratorijsko okruženje (compliance).

**Odabrana opcija:** Namjenska `audit_logs` tabela sa JSONB strukturom.  
**Razlog izbora:** JSONB omogućava čuvanje stanja "prije" i "poslije" bez obzira na broj polja koja su mijenjana.  
**Posljedice:** Omogućena potpuna sljedivost akcija administratora i osoblja.

---

### OD-011 — Rate Limiting na Login ruti

**Opis problema:** Ranjivost na brute-force napade identifikovana u Sprintu 5 zahtijeva tehničko rješenje.

**Odabrana opcija:** Middleware za ograničavanje broja zahtjeva po IP adresi.  
**Razlog izbora:** Najbrži način za sprječavanje automatizovanih pokušaja prijave bez uvođenja kompleksnih CAPTCHA sistema u ovoj fazi.  
**Posljedice:** Poboljšana sigurnost profila korisnika.

---

### OD-012 — Standardizacija Error Handling-a

**Opis problema:** Greške iz baze podataka (Supabase) su se direktno prosljeđivale do frontenda, otkrivajući internu strukturu i pružajući loš UX.

**Odabrana opcija:** Custom `AppError` klasa i centralizovani error handler.  
**Razlog izbora:** Konzistentnost odgovora API-ja i lakše debagovanje u produkciji.  
**Posljedice:** Frontend dobija jasne, lokalizovane poruke o greškama.

---

### OD-013 — Versionirana SQL migracija

**Opis problema:** Ručne izmjene sheme baze podataka na Supabase dashboard-u su uzrokovale konflikte među developerima.

**Odabrana opcija:** Skladištenje `.sql` skripti unutar `/database/migrations` foldera.  
**Razlog izbora:** Omogućava verzionalnost baze kroz Git i lakšu rekreaciju okruženja za nove članove tima.  
**Posljedice:** "Source of truth" za bazu je sada u kodu, a ne u eksternom UI-ju.




# Decision Log — Sprint 7

> **Sprint 7** · 14.05.2026.  
> Evidentiranje svjesnih projektnih, arhitektonskih i tehničkih odluka fokusiranih na korisnički interfejs rezervacija i poslovnu logiku dostupnosti termina.

---

## Sumarni pregled

| ID | Naziv odluke | Datum | Oblast | Status |
|---|---|---|---|---|
| OD-014 | Kalendarski (Grid) prikaz umjesto liste termina | 2026-05-14 | Frontend / UX | Aktivna |
| OD-015 | Dvostruka validacija (Blazor + FluentValidation) | 2026-05-14 | Backend / Sigurnost | Aktivna |
| OD-016 | Implementacija "Lock" perioda od 24h za otkazivanje | 2026-05-14 | Biznis logika | Aktivna |
| OD-017 | Korištenje Enuma za status rezervacije (PostgreSQL) | 2026-05-14 | Database / Arhitektura | Aktivna |
| OD-018 | Lazy Loading za historiju rezervacija korisnika | 2026-05-14 | Frontend / Performanse | Aktivna |

---

## Detaljan pregled odluka

---

### OD-014 — Kalendarski (Grid) prikaz umjesto liste termina

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-14 |
| **Status** | Aktivna |

**Opis problema:**
Potrebno je odabrati vizuelni format prikaza dostupnih termina koji je najintuitivniji za korisnike laboratorije.

**Razmatrane opcije:**
1. Linearna lista slobodnih termina (hronološki)
2. Kalendarski grid layout (sedmični/mjesečni prikaz)
3. Dropdown selektor sa filtrima

**Odabrana opcija:** Kalendarski grid layout (sedmični prikaz)

**Razlog izbora:**
Linearna lista termina zahtijeva previše skrolovanja i otežava vizuelnu identifikaciju slobodnih "rupa" u rasporedu. Grid omogućava brzi uvid u cijelu radnu sedmicu i lakše planiranje.

**Posljedice odluke:**
Kompleksnija CSS implementacija (CSS Grid/Flexbox), ali značajno bolji UX (smanjen broj klikova do rezervacije).

---

### OD-015 — Dvostruka validacija (Blazor + FluentValidation)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-14 |
| **Status** | Aktivna |

**Opis problema:**
Kako osigurati integritet rezervacija i spriječiti preklapanje termina uz zadržavanje brzog feedbacka na UI-u.

**Razmatrane opcije:**
1. Samo klijentska validacija (brzo, ali nesigurno)
2. Samo backend validacija (sigurno, ali spor UX)
3. Dvostruka validacija (Blazor + FluentValidation na API-ju)

**Odabrana opcija:** Dvostruka validacija

**Razlog izbora:**
Klijentska validacija rješava trivijalne greške (prazna polja), dok backend validacija rješava kompleksne konflikte (npr. ako dva korisnika pokušaju rezervisati isti termin u istoj sekundi).

**Posljedice odluke:**
Sigurniji sistem; eliminisana mogućnost "double-bookinga" u bazi podataka.

---

### OD-016 — Implementacija "Lock" perioda od 24h za otkazivanje

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-14 |
| **Status** | Aktivna |

**Opis problema:**
Korisnici često otkazuju termine neposredno prije početka, što ostavlja laboratorijsku opremu neiskorištenom.

**Razmatrane opcije:**
1. Dozvoliti otkazivanje u bilo kojem trenutku
2. Uvesti kaznene poene za kasna otkazivanja
3. Onemogućiti samostalno otkazivanje unutar 24h od termina

**Odabrana opcija:** Onemogućavanje otkazivanja unutar 24h (Lock period)

**Razlog izbora:**
Zaštita resursa laboratorije i optimizacija rasporeda. Korisnici se moraju direktno javiti administratoru za hitna otkazivanja u ovom periodu.

**Posljedice odluke:**
Smanjen broj "no-show" termina; fiksna biznis logika ugrađena u backend middleware.

---

### OD-017 — Korištenje Enuma za status rezervacije (PostgreSQL)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-14 |
| **Status** | Aktivna |

**Opis problema:**
Rezervacije prolaze kroz više faza (Pending, Approved, Rejected, Cancelled), te je potrebno definisati stabilan način pohrane tih stanja.

**Odabrana opcija:** PostgreSQL `Enum` tip mapiran kroz EF Core

**Razlog izbora:**
Sprječava unos nevažećih statusa direktno u bazu i poboljšava čitljivost SQL upita u poređenju sa običnim Integer poljima. Osigurava tipsku sigurnost (Type safety).

**Posljedice odluke:**
Lakša filtracija historije na frontendu; jasna i čitljiva struktura tabele u bazi podataka.

---

### OD-018 — Lazy Loading za historiju rezervacija korisnika

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-14 |
| **Status** | Aktivna |

**Opis problema:**
Korisnici s velikim brojem rezervacija mogu uzrokovati sporo učitavanje stranice "Moje Rezervacije" ako se svi podaci povlače odjednom.

**Razmatrane opcije:**
1. Učitavanje svih podataka odjednom (full fetch)
2. Klasična paginacija sa brojevima stranica
3. Lazy Loading / Infinite scroll pristup

**Odabrana opcija:** Lazy Loading (paginacija na zahtjev)

**Razlog izbora:**
API vraća samo manji set podataka (npr. zadnjih 10 rezervacija) inicijalno, ostale se učitavaju samo ako korisnik to zatraži. Smanjuje pritisak na bazu i ubrzava inicijalni render.

**Posljedice odluke:**
Smanjen mrežni saobraćaj; brži odziv aplikacije za krajnjeg korisnika na mobilnim i desktop uređajima.

---
# Decision Log — Sprint 8

> **Sprint 8** · 19.05.2026.  
> Evidentiranje svjesnih projektnih, arhitektonskih i tehničkih odluka u sklopu proširenja sistema administracijskim modulima, korisničkim feedbackom i vizualnim poboljšanjima dashboarda.

---

## Sumarni pregled

| ID | Naziv odluke | Datum | Oblast | Status |
|---|---|---|---|---|
| OD-019 | JSON agregacija tagova direktno u SQL upitu (json_agg) | 2026-05-19 | Backend / Performanse | Aktivna |
| OD-020 | Fire-and-forget pattern za logovanje aktivnosti | 2026-05-19 | Backend / Arhitektura | Aktivna |
| OD-021 | Rating vezan za rezervaciju (UNIQUE constraint) | 2026-05-19 | Backend / Podaci | Aktivna |
| OD-022 | Notifikacijski bell kao full-width dugme s tekstom u sidebaru | 2026-05-19 | Frontend / UX | Aktivna |
| OD-023 | Timeline prikazuje samo odobrene rezervacije (ne pending) | 2026-05-19 | Frontend / UX | Aktivna |
| OD-024 | Akcije odobravanja/odbijanja premještene iz zasebne kolone u Status ćeliju | 2026-05-19 | Frontend / UX | Aktivna |
| OD-025 | Boja taga slobodno definisana hex inputom (admin-managed) | 2026-05-19 | Frontend / UX | Aktivna |
| OD-026 | Proširenje korisničkog profila s nullable kolonama (ALTER TABLE) | 2026-05-19 | Database / Arhitektura | Aktivna |

---

## Detaljan pregled odluka

---

### OD-019 — JSON agregacija tagova direktno u SQL upitu (json_agg)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Svaki aparat može imati više tagova (many-to-many relacija kroz `equipment_tags`). Potrebno je prikazati tagove uz svaki aparat na listi opreme bez N+1 problema upita.

**Razmatrane opcije:**
1. N+1 pristup — za svaki aparat poseban API poziv za dohvat tagova
2. Aplikacijski JOIN — dohvatiti sve tagove, spojiti u JS kodu
3. PostgreSQL `json_agg` — ugraditi tagove kao JSON niz direktno u SQL upit

**Odabrana opcija:** PostgreSQL `json_agg` s `FILTER (WHERE t.id IS NOT NULL)` i `COALESCE(..., '[]')`

**Razlog izbora:**
Jedan upit vraća kompletan objekat opreme s ugniježđenim tagovima. Nema dodatnih round-tripova prema bazi ni skupog JS joinanja. `COALESCE` garantira prazan niz umjesto `null` za opremu bez tagova.

**Posljedice odluke:**
Manji broj upita prema bazi pri listanju opreme. Tagovi su uvijek dostupni u odgovoru bez zasebnog fetchanja, ali izmjena SQL upita zahtijeva razumijevanje PostgreSQL JSON funkcija.

---

### OD-020 — Fire-and-forget pattern za logovanje aktivnosti

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Logovanje aktivnosti (kreiranje, odobravanje, odbijanje rezervacija, login) ne smije usporiti primarne poslovne operacije niti uzrokovati njihov neuspjeh ako log zapis ne uspije.

**Razmatrane opcije:**
1. Sinhron log — `await activityService.log(...)` u servisima; greška loga propada prema korisniku
2. Fire-and-forget — `activityService.log(...).catch(() => {})` bez čekanja
3. Message queue (Redis/Bull) — asinhron worker koji procesira logove

**Odabrana opcija:** Fire-and-forget (`activityService.log(...).catch(() => {})`)

**Razlog izbora:**
Logovanje je sekundarna operacija — greška loga ne smije prekinuti odobravanje rezervacije. Message queue bi unio nepotrebnu infrastrukturnu kompleksnost za akademski projekat. Fire-and-forget je dovoljno robustan za trenutni obim.

**Posljedice odluke:**
Moguć gubitak log zapisa pri privremenim DB greškama. Prihvatljivo za ovaj tip sistema — log nije kritičan za poslovnu logiku. Greška se tiho ignorira.

---

### OD-021 — Rating vezan za rezervaciju (UNIQUE constraint)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Korisnik ne smije moći ocijeniti isti aparat više puta za istu rezervaciju, ali može ocijeniti isti aparat u okviru različitih rezervacija.

**Razmatrane opcije:**
1. UNIQUE(user_id, equipment_id) — jedan korisnik, jedna ocjena po aparatu zauvijek
2. UNIQUE(reservation_id) — jedna ocjena po rezervaciji
3. Aplikacijska provjera bez DB constrainta

**Odabrana opcija:** UNIQUE(reservation_id) u tabeli `equipment_ratings`

**Razlog izbora:**
Rezervacija je prirodna granica jednog korištenja aparata. Isti korisnik može legitimno koristiti isti aparat više puta (u različitim terminima) i svaki put treba moći dati novu ocjenu. DB constraint osigurava integritet bez ovisnosti o aplikacijskoj logici.

**Posljedice odluke:**
Ocjene su direktno vezane za kontekst konkretnog korištenja aparata, a ne za korisnika ili aparat općenito. Frontend prikazuje formu za ocjenu samo ako korisnik ima završenu rezervaciju bez postojeće ocjene.

---

### OD-022 — Notifikacijski bell kao full-width dugme s tekstom u sidebaru

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Inicijalna implementacija notifikacijskog dugmeta bila je uska ikonična tipka (34×34px) na tamnoj pozadini sidebara — korisnici nisu prepoznavali njenu funkciju niti vidjeli promjenu stanja pri otvaranju dropdowna.

**Razmatrane opcije:**
1. Ikonično dugme s badge-om — manji footprint, ali nepovezano s funkcijom
2. Full-width dugme s ikonom + labelom "Notifikacije" + broj badge — jasno i skladno s ostatkom sidebar UI-a
3. Posebna notifikacijska stranica umjesto dropdowna

**Odabrana opcija:** Full-width dugme s labelom, brojem unread notifikacija i aktivnim (plavi) stilom pri otvorenom dropdownu

**Razlog izbora:**
Full-width dugme konzistentno je s logout dugmetom ispod — korisnici razumiju interakcijski model. Broj umjesto točke (dot) jasno komunicira koliko notifikacija čeka. Plavi obrub i pozadina pri otvorenom stanju daju jasnu povratnu informaciju.

**Posljedice odluke:**
Veći footprint u sidebaru, ali znatno bolja uočljivost i jasnoća funkcije. Dropdown se otvara prema gore (jer je dugme na dnu sidebara) kako bi bio vidljiv unutar viewporta.

---

### OD-023 — Timeline prikazuje samo odobrene rezervacije (ne pending)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Inicijalni timeline na dashboardu prikazivao je i pending i approved rezervacije, što je korisnicima sugeriralo da je oprema zauzeta i za neodobrene zahtjeve — zbunjujući i netačan prikaz.

**Razmatrane opcije:**
1. Prikazivati sve statuse s različitim bojama
2. Prikazivati samo approved rezervacije
3. Prikazivati approved + upozorenje za pending

**Odabrana opcija:** Samo `status === 'approved'` rezervacije na timelineu

**Razlog izbora:**
Pending zahtjevi nisu potvrđena zauzeća — oprema formalno nije blokirana dok admin ne odobri zahtjev. Prikaz pending kao "zauzetog" mogao bi odvratiti korisnika od rezervisanja slobodnog termina. Timeline treba prikazivati samo faktičko stanje, ne potencijalno.

**Posljedice odluke:**
Timeline je konzistentan s poslovnom logikom. Widget se sakriva ako nema odobrenih rezervacija u narednih 7 dana, čime se izbjegava prazni sadržaj koji zbunjuje korisnike.

---

### OD-024 — Akcije odobravanja/odbijanja premještene iz zasebne kolone u Status ćeliju

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Tabela rezervacija imala je zasebnu "Akcije" kolonu koja je sadržavala dugmad "Odobri"/"Odbij" za pending stavke, ali praznu crticu (—) za sve ostale statuse. Korisnici su bili zbunjeni jer kolona ne prikazuje iste informacije za sve redove.

**Razmatrane opcije:**
1. Ostaviti zasebnu "Akcije" kolonu, ali dodati tooltip koji objašnjava da se prikazuje samo za pending
2. Premjestiti dugmad u Status ćeliju — za pending: badge + dugmad inline; za ostale: samo badge
3. Ukloniti dugmad iz tabele i koristiti modal/side panel

**Odabrana opcija:** Premještanje dugmadi u Status ćeliju

**Razlog izbora:**
Uklanjanjem zasebne kolone tabela postaje urednija i bez "rupa". Postavljanjem akcija neposredno uz status badge korisnici prirodno asociraju dugmad s promjenom statusa — vizualna blizina komunicira semantičku vezu.

**Posljedice odluke:**
Status ćelija za pending redove postaje šira (badge + dva dugmeta), ali tabelarni prikaz je čišći i razumljiviji. Na mobilnim karticama dugmad su postavljena direktno ispod status badge-a.

---

### OD-025 — Boja taga slobodno definisana hex inputom (admin-managed)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Tagovi opreme trebaju biti vizualno prepoznatljivi — potrebno je odlučiti kako se definišu boje tagova i ko ih kontrolira.

**Razmatrane opcije:**
1. Fiksna paleta predefinisanih boja (5–10 opcija)
2. Slobodan hex color picker — admin bira bilo koju boju
3. Automatska dodjela boje iz hash naziva taga

**Odabrana opcija:** Slobodan hex color picker (HTML `<input type="color">`) dostupan samo adminu

**Razlog izbora:**
Laboratorije imaju različite konvencije obilježavanja opreme. Slobodan picker daje adminu maksimalnu fleksibilnost za usklađivanje s postojećim vizualnim sustavima. Boja se sprema kao VARCHAR(7) u bazi.

**Posljedice odluke:**
Admin je odgovoran za konzistentnost palete — sistem ne provjerava kontrast ni čitljivost odabrane boje. Potencijalni problem dostupnosti (accessibility) ako se odaberu boje s lošim kontrastom na bijeloj pozadini kartica.

---

### OD-026 — Proširenje korisničkog profila s nullable kolonama (ALTER TABLE)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-19 |
| **Status** | Aktivna |

**Opis problema:**
Korisnički profil trebalo je proširiti s bio, institucijom, odsjekom, telefonom i stepenom obrazovanja, a da se pri tome ne naruše postojeći korisnički zapisi.

**Razmatrane opcije:**
1. Nova tabela `user_profiles` s 1:1 vezom prema `users`
2. Dodavanje kolona direktno u `users` tabelu kao NOT NULL s DEFAULT vrijednosti
3. Dodavanje kolona kao nullable bez DEFAULT-a (ALTER TABLE ... ADD COLUMN IF NOT EXISTS)

**Odabrana opcija:** `ALTER TABLE users ADD COLUMN IF NOT EXISTS` za svih 5 novih nullable kolona

**Razlog izbora:**
Zasebna tabela za profil uvela bi nepotreban JOIN pri svakom dohvatu korisnika. NOT NULL s DEFAULT-om bi popunio bazu lažnim podacima. Nullable kolone su najčišće rješenje — postoje korisnici bez ovih podataka i to je legalno stanje.

**Posljedice odluke:**
Svi postojeći korisnici imaju `NULL` za nova polja — sistem to tretira kao nepopunjen profil i prikazuje progress bar kompletnosti koji motivira korisnike na dopunu podataka.

---
