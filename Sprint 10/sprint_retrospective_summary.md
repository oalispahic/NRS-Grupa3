# Sprint Retrospective Summary — Sprint 10

> **Sprint 10** · 31.05.2026.  
> Finalna retrospektiva projekta. Tim reflektira na završni sprint i cjelokupni projekat.

---

## Što je išlo dobro

### 1. Konzistentnost arhitekturalnih odluka kroz sve sprintove
Repo/service/controller/routes pattern uveden u Sprintu 5 dosledno je primijenjen u svim kasnijim sprintovima, uključujući Sprint 10. Novi moduli (maintenance, waitlist, reports) integrirani su bez refaktoriranja postojećeg koda. Svaki novi feature je "dropnut" u isti kalup — novi developer bi lako pronašao gdje šta pripada.

### 2. QR kod i waitlist kao value-added featuresi
Dva nova user storija (QR kod i waitlist) koja nisu bila u originalnom backlogu su ideje generisane tokom planiranja Sprint 10 i ocijenjene kao najcooler featuresi sprinta od strane tima. QR kod spaja fizički laboratorijski prostor s digitalnim sistemom — nešto što konkurentski sistemi naplate kao premium feature.

### 3. AI-assisted development ubrzao kompleksne feature-e
Maintenance task module (tabela, CRUD, assignment, notifikacije, korisničke stranice) bi normalno zahtijevao 2-3 dana rada. S AI podrškom implementiran je u jednoj sesiji. Slično za Reports endpoint s agregatnim upitima i print CSS-om.

---

## Što nije išlo dobro

### 1. Scope puzanje u planiranju novih US
Inicijalni prijedlozi za zamjenu PB18/PB31/PB38 bili su preuzimani (bulk odobravanje, pregled slobodne opreme) i odbijeni jer nisu dovoljno bogati featureom. Tim je izgubio iteraciju planiranja koja je mogla biti posvećena implementaciji.

**Akcija za buduće projekte:** Unaprijed definisati kriterij za "bogat feature" — min. 2 SP i korisničko iskustvo koje mijenja workflow, ne samo nova query.

### 2. Responsive dizajn ostavljen za zadnji sprint
PB40 (Responsive/mobilni dizajn) je bio u backlogu od početka, ali se konzistentno pomicao za sljedeći sprint. U Sprint 10 smo morali retrofittati responsive behaviour na ~15 stranica odjednom, umjesto da je svaka stranica bila responsive od trenutka kreiranja.

**Akcija za buduće projekte:** Dodati "responsive" kao Definition of Done kriterij za svaki UI user story od Sprint 1.

### 3. Nedostatak end-to-end testova
Sve testiranje je funkcionalno/manualno. Nema Jest integration testova za backend endpointe ni React Testing Library testova za ključne komponente. Regresije otkrivene tek vizualnim pregledom.

**Akcija za buduće projekte:** Minimalno 1 backend integration test po endpointu i 1 RTL snapshot test po stranici.

---

## Akcije za sljedeći projekat

| # | Akcija | Odgovornost | Rok |
|---|---|---|---|
| 1 | Responsive = Definition of Done od Dana 1 | Tim | Početak projekta |
| 2 | CI pipeline s automatskim testovima pri svakom pushu | Dev lead | Sprint 1 |
| 3 | Kriterij "bogatog feature-a" (min 2 SP, workflow promjena) u sprint planiranju | Scrum master | Sprint planiranje |

---

## Finalna ocjena projekta

| Dimenzija | Ocjena | Komentar |
|---|---|---|
| Tehnička kvaliteta | 4/5 | Čista arhitektura, dobar separation of concerns; nedostaju automatski testovi |
| Funkcionalnost | 5/5 | Svih ~47 user storija implementirano kroz 6 sprintova |
| UX/UI | 4/5 | Konzistentan dizajn, responsive funkcionira; bottom tab bar bio bi bolji od hamburgera |
| Dokumentacija | 5/5 | Kompletni decision logovi, AI usage logovi, sprint review/retro za svaki sprint |
| Timska saradnja | 4/5 | AI-assisted workflow efikasan; ponekad scope nejasan bez detaljnih acceptance kriterija |

**Ukupna ocjena: 4.4/5**
