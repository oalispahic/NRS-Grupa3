# Finalni Product Backlog Status — LabManager

**Datum:** Juni 2026 (Sprint 12)  
**Verzija backlog-a:** 6.0

---

## Legenda statusa

| Status | Oznaka | Značenje |
|---|---|---|
| Done | ✅ | Potpuno implementirano i funkcioniše u produkciji |
| Partially Done | 🟡 | Osnovna funkcionalnost postoji, neke komponente nedostaju |
| Not Done | ❌ | Nije implementirano |
| Deferred | 🔵 | Planirana, ali odgođena za budući rad |

---

## Product Backlog — Potpuni status

| ID | Naziv | Status | Sprint | Napomena |
|---|---|---|---|---|
| **PB1** | Pregled opreme | ✅ Done | Sprint 5 | Lista svih aparata s karticama, search, filter |
| **PB2** | Detalji opreme | ✅ Done | Sprint 5 | Detaljan prikaz, servisni podaci, garancija |
| **PB3** | Rezervacija opreme | ✅ Done | Sprint 5 | Vizualni kalendar, date range picker |
| **PB4** | Moje rezervacije | ✅ Done | Sprint 5 | Tabela s status badge-ovima |
| **PB5** | Upravljanje opremom | ✅ Done | Sprint 5 | Admin CRUD, tagovi, lokacije, sigurnosne napomene |
| **PB6** | Odobravanje rezervacija | ✅ Done | Sprint 6 | Workflow s razlogom odbijanja, inline akcije |
| **PB7** | Status opreme | ✅ Done | Sprint 6 | Admin status promjena, smart badge-ovi |
| **PB8** | Kalendar zauzeća | ✅ Done | Sprint 7 | Airline-style, range selekcija |
| **PB9** | Pretraga opreme | ✅ Done | Sprint 7 | Client-side, pretraga po imenu/modelu/proizvođaču/lokaciji |
| **PB10** | Filtriranje opreme | ✅ Done | Sprint 7 | Status dropdown, tag chip filteri, lokacijski filteri |
| **PB11** | Notifikacije | ✅ Done | Sprint 8 | In-app bell, polling 30s, mark-all-read |
| **PB12** | Pregled svih rezervacija | ✅ Done | Sprint 8 | Admin centralizirani pregled s filterima |
| **PB13** | Otkazivanje rezervacija | ✅ Done | Sprint 7 | S potvrdom, PATCH /api/reservations/:id/cancel |
| **PB14** | Izmjena rezervacije | ✅ Done | Sprint 7 | Inline kalendar, backend konflikt provjera |
| **PB15** | Trenutno korištenje | ✅ Done | Sprint 8 | Live dashboard, "preostalo vrijeme" upozorenje |
| **PB16** | Izvještaji | ✅ Done | Sprint 10 | Date range filter, KPI kartice, bar/line chart, PDF |
| **PB17** | Održavanje opreme | ✅ Done | Sprint 10 | Task management, prioritet, status workflow |
| **PB18** | Kategorije opreme | ✅ Done | Sprint 8 | Implementirano kroz PB36 (tagovi) + PB39 (filter po tagovima) |
| **PB19** | Ocjenjivanje opreme | ✅ Done | Sprint 8 | Rating samo za završene rezervacije, bez duplikata |
| **PB20** | Export podataka | ✅ Done | Sprint 9 | CSV s UTF-8 BOM za opremu i rezervacije |
| **PB21** | Inventar repromaterijala | ✅ Done | Sprint 9 | CRUD, adjust modal, log promjena, upozorenje niske zalihe |
| **PB22** | Pravila korištenja | ✅ Done | Sprint 9 | Globalna ograničenja: trajanje, dana unaprijed, istovremene |
| **PB23** | Autentifikacija korisnika | ✅ Done | Sprint 5 | JWT, sessionStorage, login/logout/register |
| **PB24** | Autorizacija korisnika | ✅ Done | Sprint 6 | RBAC: laborant / admin / test uloga |
| **PB25** | Logovanje aktivnosti | ✅ Done | Sprint 8 | Append-only audit log, admin pregled, color-coded |
| **PB26** | Sprječavanje konflikta | ✅ Done | Sprint 6 | Server-side validacija s TSRANGE provjером |
| **PB27** | Dashboard pregled | ✅ Done | Sprint 5 | KPI kartice, mozaik, timeline, uloga-specific sadržaj |
| **PB28** | Registracija korisnika | ✅ Done | Sprint 6 | Username (ne email format), auto-laborant rola |
| **PB29** | Profil korisnika | ✅ Done | Sprint 8 | Bio, institucija, odsjek, telefon, stepen obrazovanja |
| **PB31** | Dashboard grafikoni | ✅ Done | Sprint 9 | Implementirano kroz PB47 (StatisticsPage s recharts) |
| **PB32** | Paginacija i sortiranje | ✅ Done | Sprint 8 | Paginacija u activity log (50/stranica) |
| **PB33** | Favoriti opreme | ✅ Done | Sprint 8 | Srce ikona, posebna lista omiljene opreme |
| **PB34** | Napredna pretraga | ✅ Done | Sprint 8 | Search po opisu + kategoriji u istom UI-u |
| **PB35** | Lična historija aktivnosti | ✅ Done | Sprint 10 | Timeline, filter po tipu akcije |
| **PB36** | Tagovi opreme | ✅ Done | Sprint 8 | Admin dodjela tagova, chip filteri, color picker |
| **PB37** | Brzi pregled opreme | ✅ Done | Sprint 8 | Modal/drawer bez napuštanja liste |
| **PB38** | Podsjetnik na rezervaciju | ✅ Done | Sprint 8 | Implementirano kroz PB11 (notifikacijski sistem) |
| **PB39** | Pretraga po tagovima | ✅ Done | Sprint 8 | Chip filteri, klik filtrira listu |
| **PB40** | Responsive/mobilni dizajn | ✅ Done | Sprint 10 | Hamburger drawer, single-column, 44px tap targets |
| **PB41** | Status mozaik opreme | ✅ Done | Sprint 8 | 18×18px kvadratići, hover tooltip, legenda |
| **PB42** | Timeline nadolazećih rezervacija | ✅ Done | Sprint 8 | 7-dnevni horizontal grid, "Danas"/"Sutra" labele |
| **PB43** | Razlog odbijanja rezervacije | ✅ Done | Sprint 9 | Modal, sprema se u bazu, vidljiv korisniku |
| **PB44** | Upravljanje korisnicima | ✅ Done | Sprint 9 | Tabela, promjena role, deaktivacija/reaktivacija |
| **PB45** | Lokacije laboratorije | ✅ Done | Sprint 9 | CRUD, dodjela opremi, filter na listi opreme |
| **PB46** | Sigurnosne napomene opreme | ✅ Done | Sprint 9 | Admin unos, obavezni checkbox pri rezervaciji |
| **PB47** | Stranica statistika | ✅ Done | Sprint 9 | Bar chart (top 5), line chart (trend), donut chart |
| **PB48** | Komparacija opreme | ✅ Done | Sprint 10 | Floating bar, full-screen modal, tabelarna usporedba |
| **PB49** | Lista čekanja (Waitlist) | ✅ Done | Sprint 10 | Tabela waitlist, notifikacija pri promjeni statusa |
| **PB50** | QR kod za opremu | ✅ Done | Sprint 10 | react-qr-code, modal, PNG download |
| **PB51** | Nadolazeći planirani servisi | ✅ Done | Sprint 10 | Sekcija u Maintenance, colour coding |
| **PB52** | Direktne poruke | ✅ Done | Sprint 11 | Chat sučelje, mjehurić layout, read receipts |
| **PB53** | Equipment Inquiry | ✅ Done | Sprint 11 | sessionStorage kontekst, equipment chip u compose |
| **PB54** | Admin broadcast obavijesti | ✅ Done | Sprint 11 | Forma, broadcasts tabela, unread highlighted |

---

## Stavke koje su odbačene tokom razvoja (Deferred / Not Scoped)

| Funkcionalnost | Razlog |
|---|---|
| Email notifikacije | Nije u opsegu niti jednog sprinta; zahtijeva SMTP konfiguraciju |
| Upload fajlova po aparatu | Procijenjen kao preopširno (Supabase Storage + UI upload widget) |
| WebSocket real-time | Vercel serverless ne podržava persistent connections |
| httpOnly cookie za JWT | Odloženo od Sprint 5; sessionStorage odabran iz pragmatičnih razloga |
| Rate limiting na login | Identificirano kao nedostatak, ali nije implementirano |
| i18n (engleski) | NFR-20 planiran, ali nikad prioritiziran |
| Server-side paginacija | Klijentska je dovoljna za trenutni obim podataka |
| Automatska kancellacija pri deaktivaciji korisnika | Identificirano kao tehnički dug, nije implementirano |

---

## Statistike

- **Ukupno backlog stavki:** 54 (PB1–PB54)
- **Done:** 54 (100%)
- **Partially Done:** 0
- **Not Done:** 0 (odložene funkcionalnosti su bile van opsega i nikad formalno planirane)
- **Sprintovi implementacije:** 7 (Sprint 5–11)
- **Ukupni story poeni:** ~153 SP
