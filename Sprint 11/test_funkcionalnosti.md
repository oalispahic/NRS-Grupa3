# Test Funkcionalnosti — Sprint 11

> Dokument opisuje manuelne test scenarije za verifikaciju Sprint 11 isporučenih feature-a.

---

## US-40 — Direktne poruke korisnik ↔ administratori

### Test 1: Korisnik šalje prvu poruku adminima

**Preduslovi:** Korisnik je logiran kao laborant. Nema prethodnih poruka.

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Klikne "Poruke" u navigaciji | Navigira na `/messages`, vidljivo prazno stanje |
| 2 | Tab "Chat s adminima" je aktivan po defaultu | Prikazan chat panel s "Nema poruka" stanjem |
| 3 | Upisuje poruku u textarea | Dugme "Pošalji" postaje aktivan |
| 4 | Pritisne Enter (bez Shift) | Poruka se šalje, pojavljuje se desno s plavom pozadinom |
| 5 | Pritisne Shift+Enter | Novi red unutar textarea, poruka se ne šalje |

### Test 2: Admin vidi poruku i odgovara

**Preduslovi:** Korisnik je poslao poruku (Test 1). Admin je logiran.

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Admin navigira na `/admin/messages` | Vidljiva lista korisnika s korisnikovim imenom |
| 2 | Unread badge "1" vidljiv pored korisnikovog imena | Potvrđen unread count |
| 3 | Admin klikne na korisnika | Otvara se konverzacija u desnom panelu |
| 4 | Unread badge nestaje | Poruke označene kao pročitane |
| 5 | Admin upisuje odgovor i šalje | Odgovor se pojavljuje desno (plava pozadina, "Ti (admin)" label) |
| 6 | Admin osvježava stranicu konverzacija | Odgovor ostaje vidljiv |

### Test 3: Unread badge u navigaciji

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Admin šalje poruku korisniku | Korisnikov "Poruke" nav item pokazuje "1" badge |
| 2 | Korisnik otvori `/messages` | Badge nestaje (poruke označene kao pročitane) |
| 3 | Admin pogleda `/admin/messages` bez novih poruka | Badge je 0 (bez badge-a) |

---

## US-41 — Pitanje o opremi (Equipment Inquiry)

### Test 4: Slanje pitanja s EquipmentDetailPage

**Preduslovi:** Korisnik je logiran kao laborant. Na stranici `/equipment/:id`.

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Korisnik gleda EquipmentDetailPage | Vidljivo dugme "Pošalji pitanje adminu" ispod status badge-ova |
| 2 | Admin korisnik gleda EquipmentDetailPage | Dugme NIJE vidljivo (samo za ne-admin korisnike) |
| 3 | Korisnik klikne dugme | Navigira na `/messages`, tab "Chat s adminima" |
| 4 | Chip "Pitanje o: [naziv opreme]" vidljiv | Equipment kontekst prenesen |
| 5 | Textarea popunjena predloškom | "Pitanje o opremi "[naziv]":\n\n" vidljivo |
| 6 | Korisnik šalje poruku | Poruka se šalje s equipment_id |
| 7 | Korisnik klikne X na chipu | Chip nestaje, equipment_id se uklanja iz payload-a |

### Test 5: Admin vidi equipment kontekst u poruci

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Admin otvori konverzaciju s korisnikom koji je poslao equipment inquiry | Plavi chip "Re: [naziv opreme]" vidljiv iznad poruke |
| 2 | Admin šalje odgovor bez equipment konteksta | Odgovor nema Re: chip |

---

## US-42 — Admin broadcast obavijesti

### Test 6: Admin šalje broadcast

**Preduslovi:** Admin je logiran.

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Admin navigira na `/admin/messages` | Vidljivi tabovi "Konverzacije" i "Nova obavijest" |
| 2 | Klikne tab "Nova obavijest" | Vidljiva forma s naslovom i textarea |
| 3 | Pokuša kliknuti "Pošalji" bez popunjene forme | Dugme disabled, nije moguće slati |
| 4 | Popunjava naslov i tekst | Dugme postaje aktivan |
| 5 | Klikne "Pošalji obavijest svim korisnicima" | Zelena success poruka "Obavijest je uspješno poslana" |
| 6 | Forma se resetuje | Naslov i tekst su prazni |

### Test 7: Korisnik vidi broadcast

**Preduslovi:** Admin je poslao broadcast (Test 6). Korisnik je logiran.

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Korisnik ima "Poruke (1)" badge u navigaciji | Unread count uključuje unread broadcast |
| 2 | Navigira na `/messages` | Tab "Obavijesti (1)" vidljiv |
| 3 | Klikne tab "Obavijesti" | Žuta kartica s naslovom, tekstom i datumom |
| 4 | Žuta točkica (unread indikator) vidljiva | Potvrđen unread state |
| 5 | Klikne "Pročitano" | Kartica postaje bijela, žuta točkica nestaje |
| 6 | Badge u navigaciji se ažurira | Oduzima se 1 od unread count-a |

### Test 8: Edge case — Admin vidi vlastiti broadcast

| # | Akcija | Očekivani rezultat |
|---|---|---|
| 1 | Admin navigira na `/messages` (user tab) | Broadcast je vidljiv i adminu koji ga je kreirao |
| 2 | Admin klikne "Pročitano" | Broadcast se označava kao pročitan za tog admina |

---

## Regresija — provjera postojećih funkcionalnosti

| # | Funkcionalnost | Status |
|---|---|---|
| R1 | NotificationBell i dalje radi (30s polling) | ✅ Nije dirnuto |
| R2 | EquipmentDetailPage — rezervacija i waitlist i dalje rade | ✅ Dodan samo novi dugme |
| R3 | Navigacija (sidebar) i dalje radi za sve role | ✅ Dodan badge, nije promijenjen routing |
| R4 | `/admin/maintenance`, `/admin/reports` i ostale admin stranice | ✅ Nisu dirnute |
| R5 | Profil korisnika i moje aktivnosti | ✅ Nisu dirnute |
