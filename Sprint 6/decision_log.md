
# Decision Log — LabEMS (NRS-Grupa3)

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
