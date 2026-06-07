# Decision Log — Sprint 11

> Dokument bilježi ključne arhitekturalne i dizajnerske odluke tokom Sprint 11.

---

## Odluka 1 — Polling umjesto WebSocket za real-time poruke

**Datum:** 2026-06-07  
**Kontekst:** Messaging sistem zahtijeva neki mehanizam za ažuriranje novih poruka bez ručnog refresha.  
**Opcije razmatrane:**
1. WebSocket (Socket.IO) — real-time, ali zahtijeva sticky sessions ili poseban server (nije kompatibilno s Vercel serverless)
2. Server-Sent Events (SSE) — jednosmjerni push, kompliciran s JWT autentikacijom u Vercel funkcijama
3. Polling svakih 30s — jednostavno, pouzdano, identično postojećem pattern za notifikacije

**Odabrano:** Polling svakih 30s (opcija 3)  
**Razlog:** Vercel serverless okruženje ne podržava persistent connections; polling je isti pattern koji već koristimo za `NotificationBell` (svakih 30s). Prihvatljivo za akademski projekt.  
**Trade-off:** Korisnik ne vidi novu poruku odmah — vidljiva tek pri sljedećem poll-u (do 30s kašnjenje) ili navigaciji.

---

## Odluka 2 — `recipient_user_id = NULL` za "poruke svim adminima"

**Datum:** 2026-06-07  
**Kontekst:** Potrebno modelirati koncept "korisnik šalje poruku adminima" bez znanja o konkretnom admin korisniku.  
**Opcije razmatrane:**
1. Posebna `message_recipients` many-to-many tabela — skalabilno ali kompleksno
2. `to_admin = BOOLEAN` kolona — jednostavno, ali ne podržava admin-to-user replies
3. `recipient_user_id = NULL` znači "svim adminima", `recipient_user_id = userId` znači "konkretnom korisniku" — elegantno i jednostavno

**Odabrano:** Opcija 3 — nullable FK  
**Razlog:** Jedna tabela, jedan endpoint, jasna semantika. Thread = sve poruke gdje `sender_id = user OR recipient_user_id = user`.  
**Trade-off:** Ako je potrebno da poruka ide samo jednom specifičnom adminu, to nije podržano — svi admini dijele isti inbox.

---

## Odluka 3 — sessionStorage za prenošenje equipment konteksta na MessagesPage

**Datum:** 2026-06-07  
**Kontekst:** Dugme "Pošalji pitanje adminu" na EquipmentDetailPage treba prenijeti kontekst opreme na MessagesPage.  
**Opcije razmatrane:**
1. URL query param (`/messages?equipmentId=5`) — vidljivo, bookmarkable, ali komplicira MessagesPage routing
2. React context/global state — zahtijeva lift state up, coupling između nepovezanih komponenti
3. sessionStorage — kratkoživući, per-tab, čist pattern za "jednosmjerni prijelaz s kontekstom"

**Odabrano:** sessionStorage (opcija 3)  
**Razlog:** MessagesPage čita i odmah briše `msgEquipCtx` iz sessionStorage — nema rizika stale state-a. Isti pattern se koristi u drugim web aplikacijama za "flash state".  
**Trade-off:** Kontekst je izgubljen pri refreshu stranice ili otvaranju u novom tabu — prihvatljivo za ovu use-case.

---

## Odluka 4 — Broadcasts kao zasebna tabela, ne kao tip u `messages`

**Datum:** 2026-06-07  
**Kontekst:** Admin treba moći slati poruke svim korisnicima odjednom.  
**Opcije razmatrane:**
1. INSERT jedne poruke po korisniku u `messages` tabelu pri broadcast slanju — N INSERT-a za N korisnika
2. Posebna `broadcasts` tabela + `broadcast_reads` join tabela — jedan INSERT, čitanje per-user

**Odabrano:** Opcija 2 — zasebna tabela  
**Razlog:** Opcija 1 bi duplicirala tekst N puta i zahtijevala N INSERT-a (= N DB transakcija na max:1 pool). Opcija 2 skalira: 1 INSERT za broadcast, 1 row u `broadcast_reads` pri čitanju.  
**Trade-off:** Zasebni API endpoint i UI tab za broadcasts (ne integrirani u isti chat thread). Korisnici vide broadcasts odvojeno od direktnih poruka — lakše razlikovati sistemske od ličnih poruka.

---

## Odluka 5 — Unread badge polling u AdminLayout, ne u NavItem

**Datum:** 2026-06-07  
**Kontekst:** Svaki nav item s `badge: true` treba prikazivati unread count.  
**Opcije razmatrane:**
1. Svaki NavItem sam fetchuje unread count — N fetch-eva paralelno, reduntdantno
2. Centralni fetch u AdminLayout koji se proslijeđuje kao prop do Sidebar → NavItem — jedan fetch, propagacija

**Odabrano:** Opcija 2 — centralni fetch  
**Razlog:** Samo jedan `/api/messages/unread-count` poziv svakih 30s za cijelu aplikaciju. Kompatibilno s max:1 DB pool.  
**Trade-off:** Sva badge nav itema dijele isti broj (messages unread). Ako budu potrebni zasebni counteri po tipovima, trebat će refactor.
