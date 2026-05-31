# Sprint Review Summary

**Sprint:** 9  
**Datum:** 24.05.2026.  
**Tim:** NRS-Grupa3  

---

## 1. Cilj sprinta i ostvarenje

**Sprint cilj:** Proširiti administrativne mogućnosti sistema kroz eksport podataka, upravljanje zalihama, globalna pravila rezervacija, razloge odbijanja, upravljanje korisnicima, fizičke lokacije, sigurnosne napomene i analitičke grafikone.

**Status:** Sve 8 stavki implementirane i isporučene.

---

## 2. Pregled isporučenih funkcionalnosti

| US | Naziv | Status | Napomena |
|---|---|---|---|
| US-24 | Export podataka (CSV) | Isporučeno | Eksport rezervacija i opreme s UTF-8 BOM, fetch+Blob pristup |
| US-25 | Inventar repromaterijala | Isporučeno | CRUD s log promjena i AlertTriangle za nisku zalihu |
| US-26 | Pravila korištenja opreme | Isporučeno | 3 globalna ograničenja u system_settings tabeli, backend validacija |
| US-27 | Razlog odbijanja rezervacije | Isporučeno | Modal za unos razloga, vidljiv u "Moje rezervacije" i notifikaciji |
| US-28 | Upravljanje korisnicima | Isporučeno | Tabela korisnika, promjena uloge, aktivacija/deaktivacija, login blokada |
| US-29 | Lokacije laboratorije | Isporučeno | CRUD lokacija, FK veza s opremom, filter po lokaciji |
| US-30 | Sigurnosne napomene opreme | Isporučeno | Textarea u formi opreme, obavezni checkbox pri rezervaciji |
| US-31 | Stranica statistika i analitike | Isporučeno | 5 KPI kartica, 3 grafika (recharts), paralelni upiti |

---

## 3. Demonstracija funkcionalnosti

### Export (US-24)
Admin pristupa `/admin/reservations` ili `/admin/equipment`, klika "Eksportuj CSV" dugme. Preuzima se CSV fajl s BOM prefiksom — bosanska slova ispravno prikazana u Excelu.

### Repromaterijal (US-25)
Admin kreira stavku "Etanol 96%" (ml, količina 500, prag 100). Odabire "Prilagodi količinu", unosi -250 s napomenom "Laboratorijska vježba 3A". Log prikazuje promjenu s timestampom. Zaliha ispod praga prikazuje žutu ikonu.

### Pravila korištenja (US-26)
Admin otvara "Pravila korištenja" u sidebaru, mijenja max_reservation_days na 14 i sprema. Korisnik koji pokušava kreirati rezervaciju dulje od 14 dana dobiva jasnu grešku.

### Razlog odbijanja (US-27)
Admin odbija rezervaciju — otvara se modal s textarea "Unesite razlog odbijanja (opciono)". Nakon potvrde, korisnik u "Moje rezervacije" vidi crveni okvir s razlogom. In-app notifikacija sadrži razlog.

### Upravljanje korisnicima (US-28)
Admin otvara `/admin/users` — tabela s imenom, emailom, ulogom, datumom registracije i statusom. Vlastiti nalog označen s "Ja" — nema dugmeta za deaktivaciju. Promjena uloge drugog korisnika u "Admin" i natrag — role badge se ažurira.

### Lokacije (US-29)
Admin kreira "Laboratorij A" s opisom. Otvara upravljanje opremom — u formi za edit opreme pojavljuje se dropdown "Prostorija". Korisnik na listi opreme vidi filter čipove za lokacije.

### Sigurnosne napomene (US-30)
Admin dodaje napomenu "Nositi zaštitne naočale. Oprema radi pod visokim naponom." Korisnik otvara stranicu detalja — vidi žutu sekciju "Sigurnosne napomene". U formi za rezervaciju pojavljuje se checkbox; dugme "Rezerviši" je onemogućeno dok checkbox nije označen.

### Statistike (US-31)
Admin otvara `/admin/statistics` — 5 KPI kartica (ukupno 60 aparata, 183 rezervacije, 12 korisnika, prosjek 36h, stopa odobrenja 78%). Horizontalni bar chart prikazuje top 7 opreme. Pie chart prikazuje distribuciju statusa. Line chart prikazuje sedmični trend posljednjih 12 sedmica.

---

## 4. Povratne informacije

- **Pozitivno:** Statistička stranica vizualno je upečatljiva i odmah daje smislen pregled stanja sistema — posebno istaknuta bar chart vizualizacija.
- **Pozitivno:** Razlozi odbijanja poboljšavaju komunikaciju između admina i laboranata — nema više nagađanja zašto je rezervacija odbijena.
- **Prijedlog za poboljšanje:** U statistikama dodati mogućnost filtriranja po vremenskom periodu (zadnjih 30/90 dana, cijela historija).
- **Prijedlog za poboljšanje:** U inventaru repromaterijala razmotriti opciju za set minimalne narudžbe (koliko naručiti kada se dostigne prag).

---

## 5. Tehnički dug identificiran u sprintu

- Upravljanje korisnicima ne otkazuje aktivne rezervacije deaktiviranog korisnika — ovo bi trebalo biti razmotreno u sljedećem sprintu.
- CSV eksport nema opciju filtriranja — eksportuje uvijek sve zapise.
- Lokacije i tektualno polje `location` postoje paralelno u shemi — eventualno konsolidovati u jednu kolonu.
