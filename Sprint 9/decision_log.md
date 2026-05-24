# Decision Log — Sprint 9

> **Sprint 9** · 24.05.2026.  
> Evidentiranje svjesnih projektnih, arhitektonskih i tehničkih odluka u sklopu proširenja administrativnih modula, analitike i sigurnosnih mehanizama.

---

## Sumarni pregled

| ID | Naziv odluke | Datum | Oblast | Status |
|---|---|---|---|---|
| OD-027 | CSV eksport kroz fetch + Blob umjesto direktnog href linka | 2026-05-24 | Frontend / Sigurnost | Aktivna |
| OD-028 | UTF-8 BOM prefiks u CSV eksportu | 2026-05-24 | Backend / Kompatibilnost | Aktivna |
| OD-029 | Globalna pravila rezervacija u key-value tabeli (system_settings) | 2026-05-24 | Backend / Arhitektura | Aktivna |
| OD-030 | Rejection reason proslijeđen kroz modal, ne inline u tabeli | 2026-05-24 | Frontend / UX | Aktivna |
| OD-031 | is_active flag u users tabeli umjesto soft delete | 2026-05-24 | Backend / Arhitektura | Aktivna |
| OD-032 | Lokacije kao zasebna tabela s FK vezom na equipment | 2026-05-24 | Database / Arhitektura | Aktivna |
| OD-033 | Safety notes checkbox blokira rezervaciju samo ako je tekst prisutan | 2026-05-24 | Frontend / UX | Aktivna |
| OD-034 | Paralelni SQL upiti za statistike (Promise.all) | 2026-05-24 | Backend / Performanse | Aktivna |

---

## Detaljan pregled odluka

---

### OD-027 — CSV eksport kroz fetch + Blob umjesto direktnog href linka

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
CSV eksport zahtijeva autentifikaciju (JWT token) jer su podaci rezervacija osjetljivi. Direktan `<a href="/api/export/reservations">` ne šalje Authorization header, pa bi backend morao dozvoliti neautentifikovani pristup eksportu.

**Razmatrane opcije:**
1. Direktan `<a href>` s tokenom u URL query parametru (`?token=...`) — izlaže token u server logovima i browser historiji
2. `fetch()` s `Authorization: Bearer` headerom → Blob URL → programatski klik na privremeni `<a>` element
3. Poseban short-lived token endpoint za eksport

**Odabrana opcija:** `fetch()` s Authorization headerom i Blob objektom za download

**Razlog izbora:**
Token u URL-u je sigurnosni propust — pojavljuje se u access logovima, browser historiji i Referer headerima. Blob pristup prenosi autentifikacijske podatke kroz header i ne ostavlja trag u URL-u. Kratkotrajna token opcija uvela bi nepotrebnu kompleksnost.

**Posljedice odluke:**
Eksport dugme koristi JS logiku umjesto native browser download. Radi ispravno u svim modernim browserima. Download se pokreće bez otvaranja novog taba.

---

### OD-028 — UTF-8 BOM prefiks u CSV eksportu

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
CSV fajlovi generirani bez BOM prefiksa su validni UTF-8, ali Microsoft Excel na Windowsu ih otvara kao ANSI i pogrešno prikazuje bosanska slova (č, ć, š, ž, đ) — prikazuju se kao nečitljivi karakteri.

**Razmatrane opcije:**
1. Bez BOM-a — ispravan UTF-8, ali Excel ga ne prepoznaje
2. Dodati UTF-8 BOM (`\xEF\xBB\xBF`) na početak CSV sadržaja
3. Konvertovati u Windows-1250 encoding za Excel kompatibilnost

**Odabrana opcija:** UTF-8 BOM (`'﻿'`) na početku CSV stringa

**Razlog izbora:**
BOM je najjednostavnija, široko podržana metoda za signal Excelu o UTF-8 encodingu. Konverzija u Windows-1250 bi uvela potrebu za dodatnom bibliotekom i bila nepotrebna kompleksnost. BOM ne narušava UTF-8 valjanost — drugi alati ga ispravno ignorišu.

**Posljedice odluke:**
Excel automatski prepoznaje encoding i ispravno prikazuje sve bosanske karaktere. Fajlovi rade i na macOS-u bez ikakvih problema.

---

### OD-029 — Globalna pravila rezervacija u key-value tabeli (system_settings)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
Globalna ograničenja (maks. trajanje, maks. unaprijed, maks. aktivnih rezervacija) moraju biti konfigurabilna od strane admina bez deployment-a. Potrebno je odabrati gdje i kako ih pohraniti.

**Razmatrane opcije:**
1. Hardkodirane konstante u kodu — ne može se mijenjati bez deploy-a
2. Environment varijable — fleksibilne, ali zahtijevaju restart servera za promjenu
3. Namjenska tabela `system_settings` (key VARCHAR PK, value TEXT) s UI za izmjenu

**Odabrana opcija:** Tabela `system_settings` s key-value parovima i admin UI stranicom

**Razlog izbora:**
Konstante i env varijable ne dozvoljavaju dinamičnu promjenu u runtime-u. Key-value shema je fleksibilna za dodavanje novih pravila bez izmjene sheme — nova pravila se dodaju kao novi redovi. Admin može promijeniti vrijednosti bez tehničkog znanja.

**Posljedice odluke:**
Backend dohvata pravila iz baze pri svakom kreiranju rezervacije — minimalan overhead. PUT `/api/settings` endpoint zahtijeva admin token. Vrijednosti se čuvaju kao TEXT i parsiraju u Int pri korišćenju.

---

### OD-030 — Rejection reason proslijeđen kroz modal, ne inline u tabeli

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
Admin mora moći upisati razlog odbijanja pri odabiru odbijanja rezervacije. Potrebno je odlučiti gdje se unos vrši — inline u tabeli ili u zasebnom modalu.

**Razmatrane opcije:**
1. Inline tekst polje u tabeli koje se pojavljuje pri klikanju "Odbij"
2. Modal overlay s textarea poljem za razlog
3. Bez unosa razloga — razlog se dodaje naknadno kroz edit akciju

**Odabrana opcija:** Modal overlay s textarea za unos razloga pri odbijanju

**Razlog izbora:**
Inline polje u tabeli bi poremetilo layout i moglo biti previđeno. Modal jasno komunicira da je ovo posebna akcija s posljedicama — korisnik ima prostor za razmišljanje prije potvrde. Modal također sprečava slučajne klikove i nudi Cancel opciju.

**Posljedice odluke:**
Dodatan klik za odbijanje (Odbij → Modal → Potvrdi odbijanje), ali bolja UX sigurnost. Razlog je opcioni — modal se može potvrditi i bez teksta.

---

### OD-031 — is_active flag u users tabeli umjesto soft delete

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
Deaktivirani korisnici trebaju biti blokirani od logina, ali zadržani u bazi zbog historije rezervacija i log zapisa. Potrebno je odlučiti o mehanizmu deaktivacije.

**Razmatrane opcije:**
1. Hard delete — korisnik se briše iz baze; historija rezervacija puca zbog FK constraint-a
2. Soft delete (`deleted_at` timestamp) — standardni pattern, ali zahtijeva filtriranje u svim upitima
3. `is_active BOOLEAN` flag — eksplicitan, čitljiv, lako provjerlji u auth middleware-u

**Odabrana opcija:** `is_active BOOLEAN NOT NULL DEFAULT TRUE` u tabeli `users`

**Razlog izbora:**
Hard delete bi porušio integritet FK referenci. Soft delete zahtijeva da svaki upit filtrira `WHERE deleted_at IS NULL`. `is_active` flag je semantički jasniji — korisnik postoji, ali je onemogućen. Auth service provjerava `is_active === false` i vraća 403.

**Posljedice odluke:**
Deaktivirani korisnici se i dalje prikazuju u historiji rezervacija i logovima — historija ostaje intaktna. Admin vidi deaktivirane korisnike u tablici s vizualnim razlikovanjem (smanjena opacity). Reaktivacija je trivijalna — jedan PATCH poziv.

---

### OD-032 — Lokacije kao zasebna tabela s FK vezom na equipment

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
Oprema je već imala slobodan tekstualni `location` atribut. Trebalo je odlučiti kako uvesti strukturirane lokacije — zamijeniti ili dopuniti postojeće polje.

**Razmatrane opcije:**
1. Zamijeniti `location` text stupac s `location_id` FK — gubi se slobodan unos, migracija remeti postojeće podatke
2. Dodati `location_id` FK paralelno uz postojeći `location` text — oba postoje istovremeno
3. Kreirati `locations` tabelu, ali koristiti samo app logiku bez FK — nema DB integriteta

**Odabrana opcija:** Nova tabela `locations` + `location_id INTEGER FK` u `equipment`, uz zadržavanje starog `location` tekst polja

**Razlog izbora:**
Mijenjanje sheme `location` stupca bi zahtijevalo migraciju svih postojećih podataka i moglo bi poremetiti rad. Paralelni pristup dozvoljava postepenu tranziciju — nova oprema koristi `location_id`, starija zadržava textualnu lokaciju. FK osigurava referentni integritet.

**Posljedice odluke:**
`ON DELETE SET NULL` na FK znači da brisanje lokacije ne briše opremu — oprema samo ostaje bez lokacije. Filter po lokaciji na listi opreme koristi `location_id`. UI prikazuje `location_name` ako postoji, inače `location` tekst.

---

### OD-033 — Safety notes checkbox blokira rezervaciju samo ako je tekst prisutan

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
Checkbox za potvrdu sigurnosnih uputa ne smije uvijek biti prikazan — za opremu bez upisanih uputa prikazivanje praznog checkboxa je zbunjujuće i beskorisno.

**Razmatrane opcije:**
1. Uvijek prikazivati checkbox — čak i ako nema sigurnosnih uputa
2. Prikazivati checkbox i blokirati rezervaciju samo ako `safety_notes` postoji i nije prazan string
3. Backend provjera sigurnosnih uputa pri kreiranju rezervacije

**Odabrana opcija:** Checkbox se prikazuje i rezervacija se blokira samo kada `equipment.safety_notes` nije null/prazan

**Razlog izbora:**
Uvijek prikazan checkbox daje lažan utisak opasnosti za bezopasnu opremu. Backend provjera bi zahtijevala da se potvrda pošalje u API pozivu za rezervaciju — kompleksniji contract. Frontend uvjet je jasan i implementacijski jednostavan.

**Posljedice odluke:**
Za opremu bez sigurnosnih uputa: forma za rezervaciju radi identično kao prije. Za opremu s uputama: dugme "Rezerviši" je onemogućeno dok korisnik ne označi checkbox. Upute su vidljive i izvan forme — na dnu stranice detalja.

---

### OD-034 — Paralelni SQL upiti za statistike (Promise.all)

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-05-24 |
| **Status** | Aktivna |

**Opis problema:**
Stranica statistika zahtijeva 4 različita agregacijska upita (KPI, top oprema, distribucija statusa, sedmični trend). Sekvencionalno izvršavanje bi uvelo 4× latenciju baze, dok su upiti međusobno nezavisni.

**Razmatrane opcije:**
1. Sekvencionalno `await` za svaki upit — ukupno 4× DB latencija (npr. 4×50ms = 200ms)
2. `Promise.all([kpi, topEquipment, statusDist, weeklyTrend])` — paralelno izvršavanje
3. Materijalizovani pogledi / preračunate tabele — kompleksno, nepotrebno za akademski projekat

**Odabrana opcija:** `Promise.all` s paralelnim izvršavanjem sva 4 upita

**Razlog izbora:**
Upiti su potpuno nezavisni — nema podatkovnih zavisnosti. `Promise.all` svodi ukupno čekanje na latenciju najsporijeg upita umjesto zbroja svih. Implementacijski trivijalan bez ikakve infrastrukturne kompleksnosti.

**Posljedice odluke:**
Statistike stranica učitava se brže, posebno u produkcijskim uvjetima s DB latencijom. Ako jedan upit ne uspije, cijeli `Promise.all` odbija — greška se propagira prema frontendu s generalnom porukom.

---
