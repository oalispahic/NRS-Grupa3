# AI Usage Log — Sprint 10

> **Sprint 10** · 31.05.2026.  
> Evidencija korišćenja AI alata (Claude Sonnet 4.6 / Claude Code) tokom planiranja i implementacije finalizacijskih feature-a sistema.

---

## Upotreba po aktivnostima

### 1. Sprint 10 planiranje — Definisanje novih user storija

**Datum:** 2026-05-31  
**AI alat:** Claude Sonnet 4.6 (Claude Code)  
**Aktivnost:** Planiranje

**Opis:**
AI je analizirao Product Backlog v4 i identifikovao koje su stavke planirane za Sprint 10. Korisnik je naveo da su PB18, PB31 i PB38 već implementirani te da trebaju biti zamijenjeni novim user storijama. AI je predložio inicijalni set (PB48: pregled slobodne opreme, PB49: bulk akcije) koje je korisnik odbio kao "tanke". U drugoj iteraciji AI je predložio 4 opcije (ponavljajuće rezervacije, waitlist, komparacija opreme, import CSV), od kojih je korisnik odabrao Komparacija opreme i Waitlist. QR kod za opremu (PB50) ostao je u planu kao treći novi user story.

**Broj iteracija:** 3  
**Ishod:** Finalna lista 7 user storija (US-32 do US-38, ukupno 26 SP)

**AI greška/napomena:** Prva dva prijedloga (bulk odobravanje, pregled slobodne opreme) odbačena jer nedovoljno bogati featureom.

---

### 2. Backend implementacija

**Datum:** 2026-05-31  
**AI alat:** Claude Sonnet 4.6 (Claude Code)  
**Aktivnost:** Implementacija

**Opis:**
AI je implementirao backend sloj za Sprint 10 feature-e:
- SQL migracija `018_waitlist.sql` — nova tabela waitlist s FK na equipment i users
- SQL migracija `019_maintenance_tasks.sql` — tabela maintenance_tasks s priority enum, status enum, FK vezama
- Waitlist routes, controller, service, repository (`POST/DELETE/GET /api/equipment/:id/waitlist`)
- Reports endpoint `GET /api/reports?from=&to=` s Promise.all agregatnim upitima (KPI, top oprema, trend, status breakdown, top korisnici)
- Maintenance CRUD (`POST/GET/PATCH/DELETE /api/maintenance`)
- Activity mine endpoint `GET /api/activity/mine`

**Broj iteracija:** 2  
**Ishod:** Svi backend endpointi implementirani i pushani

---

### 3. Frontend implementacija

**Datum:** 2026-05-31  
**AI alat:** Claude Sonnet 4.6 (Claude Code)  
**Aktivnost:** Implementacija

**Opis:**
AI je implementirao frontend komponente:
- `ReportsPage.jsx` — date range picker, 5 KPI kartica, bar/line chart, tabele, print CSS
- `MaintenancePage.jsx` (admin) — lista taskova s filterima, forma za kreiranje
- `MyTasksPage.jsx` (korisnik) — timeline prikaz, "Označi kao završeno"
- `MyActivityPage.jsx` — timeline historije s filterom po tipu
- Waitlist dugme i badge na `EquipmentDetailPage.jsx`
- Komparator na `EquipmentListPage.jsx` — floating bar, full-screen modal
- QR modal na `ManageEquipmentPage.jsx` — react-qr-code + PNG download
- Responsive navbar — hamburger + side drawer za ≤768px
- Responsive popravci na svim admin stranicama

**Broj iteracija:** 3  
**Ishod:** Sve komponente implementirane

---

### 4. Dokumentacija Sprint 10

**Datum:** 2026-05-31  
**AI alat:** Claude Sonnet 4.6 (Claude Code)  
**Aktivnost:** Dokumentacija

**Opis:**
AI je generirao sprint dokumentaciju u formatu identičnom Sprint 8 i Sprint 9:
- `sprint_backlog.md` — 7 user storija (US-32 do US-38) s potpunim opisima
- `decision_log.md` — 8 arhitektonskih odluka (OD-035 do OD-042)
- `ai_usage_log.md` — ovaj fajl
- `sprint_review_summary.md` — rezultati sprinta i demo scenariji
- `sprint_retrospective_summary.md` — retrospektiva
- `test_funkcionalnosti.md` — scenariji testiranja po user storiju
- `product_backlog_v5.md` — ažurirani backlog s novim stavkama i statusima

**Broj iteracija:** 1  
**Ishod:** Kompletna dokumentacija

---

## Sumarni pregled

| Aktivnost | Iteracije | Ishod | AI greška |
|---|---|---|---|
| Sprint 10 planiranje | 3 | Finalna lista 7 US | Prva 2 prijedloga odbačena |
| Backend implementacija | 2 | Svi endpointi | — |
| Frontend implementacija | 3 | Sve komponente | — |
| Dokumentacija | 1 | Kompletna | — |

**Ukupno iteracija:** 9  
**Ukupno AI-generirani fajlovi:** 20+  
**Procjena uštede vremena:** ~18-22 sata razvoja

---

## Napomene o korišćenju AI alata

- AI konzistentno poštuje projektne konvencije (repo/service/controller/routes pattern)
- AI ne commituje `.env` fajlove ni kredencijale
- AI ne dodaje `Co-Authored-By: Claude` u commit poruke (projektni dogovor)
- AI predlaže alternativu kad inicijalni prijedlog nije zadovoljavajući
- AI prati pool connection ograničenja Supabase (max 3 per Pool od Sprint 9 fixa)
