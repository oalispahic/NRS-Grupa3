# AI Usage Log — Sprint 11

> Dokument bilježi sve relevantne slučajeve korištenja AI alata tokom Sprint 11.
> Svrha je transparentnost i procjena zrelosti u korištenju alata, ne evaluacija tima.

---

## Unos 1 — Planiranje Sprint 11 i osmišljavanje messaging sistema

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-06-07 |
| **Sprint** | Sprint 11 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Definisanje arhitekture messaging sistema i osmišljavanje 2 dodatna feature-a uz glavni (chat s adminima).

**Kratak opis upita:** Korisnik je zatražio da AI implementira sistem slanja poruka adminima s chatom, mogućnošću slanja pitanja o opremi kao kontekst, i 2 dodatna feature-a vezana za ovaj sistem.

**Šta je AI predložio/generisao:**
- Arhitektura: `messages` tabela s `recipient_user_id = NULL` patternorm za "poruke svim adminima"
- `broadcasts` + `broadcast_reads` tabela za admin obavijesti
- `equipment_id` FK na messages za kontekstualne upite
- 3 user storija: US-40 (direktne poruke), US-41 (equipment inquiry), US-42 (broadcast)
- Polling model za unread count umjesto WebSocket (kompatibilno sa serverless)

**Šta je tim prihvatio:** Cijela arhitektura i svi user storiji.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema — arhitektura je jednostavna i kompatibilna s postojećim pooling/serverless constraintima.

---

## Unos 2 — Implementacija backend messages.routes.js

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-06-07 |
| **Sprint** | Sprint 11 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Implementacija kompletnog backend API-ja za messaging i broadcast sistem.

**Kratak opis upita:** Korisnik je zatražio implementaciju 8 API endpointa: inbox, unread-count, send, conversations (admin), conversation/:userId (admin), broadcasts (GET/POST), broadcasts/:id/read.

**Šta je AI predložio/generisao:**
- `messages.routes.js` (117 linija) — svih 8 endpointa s autentikacijom i RBAC
- `messages` tabela (`020_messages.sql`) — s indeksima na sender_id, recipient_user_id, created_at
- `broadcasts` + `broadcast_reads` tabele (`021_broadcasts.sql`) s composite PK
- Sequential DB queries (max:1 pool kompatibilnost)
- In-app notifikacija pri slanju poruke u oba smjera (user→admins, admin→user)
- `is_active = true` filter pri slanju notifikacija adminima

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema — svi SQL upiti su sequential, bez Promise.all, kompatibilno s max:1 pool konfiguracijom.

---

## Unos 3 — Implementacija frontend MessagesPage i AdminMessagesPage

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-06-07 |
| **Sprint** | Sprint 11 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Kreiranje korisničke i admin stranice za messaging sistem.

**Kratak opis upita:** Korisnik je zatražio chat sučelje za korisnike (tab "Chat s adminima" + "Obavijesti") i admin inbox s left panel (lista korisnika s unread badge-ovima) i right panel (konverzacija + reply forma).

**Šta je AI predložio/generisao:**

*MessagesPage.jsx (user):*
- Tab "Chat s adminima" — mjehurić layout (plavi za korisnika, sivi za admin), read receipt (✔✔ zeleno), auto-scroll na dno
- Tab "Obavijesti" — žute kartice za unread broadcasts, bijele za pročitano, "Pročitano" dugme
- Equipment context chip s X dugmetom za uklanjanje konteksta
- Keyboard shortcut: Enter = pošalji, Shift+Enter = novi red

*AdminMessagesPage.jsx (admin):*
- Lijevi panel: lista korisnika s avatarima (inicijal), red dot unread count badge, preview zadnje poruke
- Desni panel: konverzacija thread s reply formom, "Ti (admin)" oznaka
- Tab "Nova obavijest" — forma s naslovom i textarea, success/error poruke

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:**
- Inicijalni `Messages unread badge` u navigacijskoj traci zahtijevao je refactor NavItem komponente da prihvata `unreadCount` prop i polling u `AdminLayout` — oboje implementirani u istoj sesiji.

---

## Unos 4 — Integracija u navigaciju i EquipmentDetailPage

| Polje | Vrijednost |
|---|---|
| **Datum** | 2026-06-07 |
| **Sprint** | Sprint 11 |
| **Alat** | Claude Code (Anthropic) |
| **Ko je koristio** | Omar Alispahić |

**Svrha korištenja:** Dodavanje "Poruke" nav itema s live unread count badge-om i "Pošalji pitanje adminu" dugmeta na EquipmentDetailPage.

**Kratak opis upita:** Korisnik je zatražio da AI integrira messaging sistem u navigaciju i equipment detail stranicu.

**Šta je AI predložio/generisao:**
- `AdminLayout.jsx` — `NavItem` proširen s `unreadCount` prop; `Sidebar` prihvata `msgUnread` prop; `AdminLayout` fetchuje `/api/messages/unread-count` svakih 30s i proslijeđuje u `Sidebar`
- `NAV_GROUPS_LABORANT` i oba admin nav groups prošireni s `{ to: '/messages', badge: true }` i `{ to: '/admin/messages', badge: true }`
- `EquipmentDetailPage.jsx` — dodan import `useNavigate` i `MessageSquare`, dugme "Pošalji pitanje adminu" vidljivo samo za ne-admin korisnike, sessionStorage pattern za prenošenje equipment konteksta

**Šta je tim prihvatio:** Cijela implementacija.

**Šta je tim izmijenio:** Ništa.

**Šta je tim odbacio:** Ništa.

**Rizici/problemi:** Nema.

---

## Sumarni pregled

| # | Opis | Alat | Prihvaćeno | Izmijenjeno | Odbačeno | Greška AI-a |
|---|---|---|---|---|---|---|
| 1 | Planiranje i arhitektura messaging sistema | Claude Code | ✅ | — | — | — |
| 2 | Backend messages.routes.js (8 endpointa, 2 migracije) | Claude Code | ✅ | — | — | — |
| 3 | Frontend MessagesPage + AdminMessagesPage | Claude Code | ✅ | — | — | — |
| 4 | Integracija u navigaciju i EquipmentDetailPage | Claude Code | ✅ | — | — | — |

**Ukupno zabilježenih slučajeva:** 4
**Korišteni AI alati:** Claude Code (Anthropic)
**Greške AI-a:** 0
**Kritičnih grešaka:** 0
