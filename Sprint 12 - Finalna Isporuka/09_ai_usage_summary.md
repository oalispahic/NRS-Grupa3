# Final AI Usage Summary — LabManager

**Projekat:** LabManager  
**Period:** Sprint 5–12 (April–Juni 2026)  
**AI alati korišteni:** Claude Code (Anthropic), GitHub Copilot

---

## Pregled korištenja

Tim je koristio AI alate sistematski i transparentno kroz sve implementacijske sprintove (5–11). Svaka sesija je dokumentovana u `ai_usage_log.md` fajlovima u svakom sprint folderu.

---

## Za šta je AI korišten

| Kategorija | Opseg korištenja | Primjeri |
|---|---|---|
| **Planiranje i arhitektura** | Sprint 5–11, svaki sprint | Generisanje implementacijskog plana, odabir redosljeda, identifikacija ključnih fajlova |
| **Generisanje koda** | Sprint 5–11, svaki sprint | Backend: repository/service/controller/routes; Frontend: stranice, komponente, hooks |
| **SQL migracije** | Sprint 5–11 | 21 migracija, ALTER TABLE, CREATE TABLE, seed podaci |
| **Debugging** | Sprint 5–9 | Dijagnoza Vercel proxy greške, JWT expiresIn greška, event propagation bug, routing konflikt |
| **Merge konflikti** | Sprint 6 | GitHub Copilot automatski riješio PR #5 konflikt |
| **Dokumentacija** | Sprint 5–11 | CONTEXT.md, sprint review/retrospektiva, backlog verzije |
| **DB migracije na produkciji** | Sprint 8–9 | Node.js skripta za pokretanje SQL migracija (workaround za nedostatak psql) |

---

## Što je prihvaćeno

Velika većina AI-generisanog koda je prihvaćena bez izmjena ili s minimalnim prilagodbama:

- Kompletni backend moduli (repo/service/controller/routes) za sve feature-e od Sprint 5–11
- Frontend stranice i komponente (login, dashboards, tabele, kalendar, modali)
- SQL migracije (sve 21 migracija)
- Design sistem (`theme.js` s design tokenima)
- Arhitekturalne odluke (COALESCE pattern za parcijalni update, fire-and-forget log pattern, json_agg za tagove)
- CONTEXT.md tehnička dokumentacija
- Sprint dokumentacija (review, retrospektiva, backlog)

**Procjenjena ušteda vremena:** ~50-60 sati razvoja kroz svih 7 implementacijskih sprintova.

---

## Što je izmijenjeno

| Sprint | Izmjena | Razlog |
|---|---|---|
| Sprint 5 | Naziv i logo u NavBar | AI generisao generički placeholder |
| Sprint 5 | Validacija naziva opreme pri UPDATE | AI ostavio polje nevalidirano |
| Sprint 5 | Oznake prostorija u seed podacima | AI-generisane oznake sala nisu odgovarale stvarnoj nomenklaturi |
| Sprint 5 | CONTEXT.md Sprint 6 todo | Dodate 2 stavke koje tim smatra prioritetnim |
| Sprint 6 | Placeholder tekst u RegisterPage | Prilagođen konvencijama tima |
| Sprint 6 | Bosanske error poruke (terminologija) | AI-generirane su korektne ali terminologija neusklađena s aplikacijom |
| Sprint 7 | Confirmation dialog tekst | Prilagođen bosanskom jeziku |
| Sprint 7 | Badge boje za istekle datume | Usklađene s postojećim theme.js tokenima |
| Sprint 7 | Redosljed nav grupe u sidebar | AI stavio "Korisnici" kao prvu grupu, tim premjestio na kraj |
| Sprint 8 | PB30/PB12 zamijenjeni s PB41/PB42 | AI nije uzeo u obzir već implementirane stavke |
| Sprint 10 | Odbačeni prijedlozi za bulk odobravanje | "Tanke" funkcionalnosti, nedovoljno bogate featureom |

---

## Što je odbačeno

| Sprint | Odbačeno | Razlog |
|---|---|---|
| Sprint 5 | "Register stranica" kao bonus | Korisnici se kreiraju ručno/curl metodom |
| Sprint 5 | HTTP Only cookie | Odabran sessionStorage iz pragmatičnih razloga |
| Sprint 7 | Paginacija na MyReservations | Prikazuje se kompletna lista zbog jednostavnosti |
| Sprint 7 | Server-side pretraga | Client-side dovoljna za obim podataka |
| Sprint 7 | Email notifikacija pri otkazivanju | Nije u opsegu Sprint 7 |
| Sprint 7 | Cron job za `in_use` status | Preopširno za sprint |
| Sprint 7 | Upload tehničke dokumentacije | Odloženo, preopširno |
| Sprint 9 | Foto opreme | Previše posla s podacima |
| Sprint 9 | Lista čekanja (inicijalni prijedlog) | Implementirana u Sprint 10 u boljem obliku |
| Sprint 9 | CSV eksport s tokenom u URL-u | Sigurnosni propust — zamjenjeno fetch+Blob pristupom |

---

## Greške koje je AI napravio

Sve greške su odmah uočene i ispravljene, bez produkcijskog incidenata osim jednog:

| Sprint | Greška | Ozbiljnost | Rješenje |
|---|---|---|---|
| Sprint 5 | **Neispravan bcrypt hash** u SQL INSERT | 🔴 Kritična | Admin korisnik nije mogao da se prijavi. Ispravljen generisanjem hasha programski |
| Sprint 5 | JSX komponenta u `.js` fajlu (Vite build error) | 🟡 Minor | AI odmah uočio i uklonio komponentu |
| Sprint 5 | CONTEXT.md nije bio zapisan (Write tool propust) | 🟡 Minor | AI ponovo kreirao fajl |
| Sprint 5 | JWT expiresIn: code fix nije bio dovoljan bez Vercel env promjene | 🟡 Minor | Tim ručno uklonio env varijablu na Vercelu |
| Sprint 7 | Event propagation bug u kalendaru (klik aktivirao formu) | 🟡 Minor | Odmah fixano s `stopPropagation()` |
| Sprint 7 | Nepotpuna `NAV_TEST` u prvom commitu | 🟡 Minor | Fix commit s dodanim nav linkovima |
| Sprint 8 | userId nije proslijeđen u activity log za approve/reject | 🟡 Minor | Popravljen u istom sprintu |
| Sprint 8 | Routing konflikt `GET /current` vs `GET /:id` | 🟡 Minor | Specifičnija ruta registrirana ispred parametarske |
| Sprint 8 | NotificationBell pristupao `user._token` (nepostojeće) | 🟡 Minor | Token proslijeđen kao prop |
| Sprint 8 | Komponente definirane ali ne i wired u dashboard | 🟡 Minor | Wiring dodan u istom sprintu |
| Sprint 9 | CSV eksport s tokenom u URL-u (sigurnosni propust) | 🔴 Potencijalno kritična | Odmah zamijenjen fetch+Blob pristupom |
| Sprint 9 | Edit tool "string not found" (višekratno) | 🟢 Trivijalana | Odmah riješeno čitanjem sadržaja fajla |
| Sprint 10 | Prva 2 prijedloga user storija "presvrsishodna" | 🟡 Minor | 3 iteracije planiranja do finalnog |

**Ukupno grešaka:** 13  
**Kritičnih (s produkcijskim utjecajem):** 1 (bcrypt hash — uzrokovao Invalid credentials)  
**Potencijalno kritičnih (sigurnosnih):** 1 (CSV eksport s tokenom u URL-u — odmah ispravljen prije deploya)

---

## Koji dijelovi sistema su razvijani uz AI pomoć (moraju se znati objasniti)

Svi ključni dijelovi sistema su razvijani uz AI asistenciju. Tim mora biti u stanju objasniti:

1. **JWT autentifikacijski flow** — kako se token generiše, šta je u payloadu, kako middleware validira
2. **Rezervacijski konflikt algoritam** — SQL query koji provjerava preklapanje termina
3. **COALESCE pattern za parcijalni update** — zašto se koristi umjesto `SET name = $1`
4. **json_agg za tagove** — GROUP BY s agregacijom tagova u jednom SQL upitu
5. **ReservationCalendar.jsx** — state management s range selekcijom, kalendar grid generisanje
6. **Fire-and-forget activity log pattern** — zašto `.catch(() => {})` a ne await
7. **Broadcast race condition fix** — `ON CONFLICT DO NOTHING` s composite PK
8. **Polling umjesto WebSocket** — arhitekturno obrazloženje za serverless ograničenje

---

## Transparentna ocjena korištenja AI alata

**Pozitivno:**
- AI je konzistentno poštovao projektne konvencije (repo/service/controller/routes)
- AI je prepoznavao kontekst između sesija kroz CONTEXT.md
- AI je predlagao alternativu kada inicijalni prijedlog nije odgovarao
- AI je sam identifikovao sigurnosne propuste (bcrypt hash, CSV token u URL-u) u kasnijim sesijama

**Negativno:**
- AI nije uvijek uzimao u obzir već implementirane stavke → potrebne su eksplicitne napomene
- AI je pisao fajlove bez prethodnog čitanja → "File has not been read yet" greške (minor, ali ponavljajuće)
- AI je ponekad predlagao "tanke" user storije koje tim nije smatrao vrijednima

**Zaključak:** Tim je koristio AI kao alat za ubrzanje implementacije, ne kao zamjenu za razumijevanje. Svaka AI-generisana linija koda je pregledana, testirana i modificirana prema potrebi. Tim može objasniti i odbraniti svaki dio koda.
