# Sprint Review Summary 

**Sprint:** 6  
**Datum:** 12.05.2026.  
**Tim:** NRS-Grupa3  
**Repozitorij:** [NRS-Grupa3 GitHub](https://github.com/oalispahic/NRS-Grupa3)

---

## 1. Planirani sprint goal
Glavni cilj sprinta bio je transformacija prototipa u stabilnu aplikaciju kroz implementaciju registracije korisnika, jačanje sigurnosti (RBAC i Rate Limiting), uvođenje automatizovanog testiranja (E2E) i značajno poboljšanje korisničkog iskustva (UX/UI polish).

## 2. Šta je završeno
* **PB28 — Registracija korisnika:** Implementirana `RegisterPage`, podržano korištenje `username` umjesto emaila kao identifikatora.
* **PB7 — Upravljanje statusom:** Dodat admin panel na detaljima opreme za brzu promjenu statusa.
* **PB26 — Conflict Prevention:** Lokalizovane poruke o greškama na bosanski jezik i dodata klijentska validacija termina.
* **PB24 — RBAC Stabilizacija:** Riješen problem "bijelog flasha" uvođenjem `LoadingScreen` komponente sa spinnerom.
* **Frontend Polish:** Implementirani skeleton loaderi, `labFadeIn` animacije i unificirani dizajnerski tokeni.
* **QA:** Postavljena infrastruktura za **Playwright** E2E testiranje.
* **DevOps:** Uvedene SQL migracije unutar repozitorija za konzistentnost baze podataka.

## 3. Šta nije završeno
* **Napredni Audit Log filteri:** Iako je sistem za logovanje uveden, UI filteri za pretragu logova po datumu/korisniku su ostavljeni za narednu fazu.
* **Brisanje opreme sa zavisnostima:** Logika koja sprečava brisanje opreme koja ima aktivne rezervacije je ostala kao tehnički dug.

## 4. Demonstrirane funkcionalnosti ili artefakti
* **Demo 1:** Tok registracije novog korisnika i automatska dodjela uloge `laborant`.
* **Demo 2:** Brza promjena statusa opreme od strane admina sa trenutnim osvježavanjem UI-ja.
* **Demo 3:** Vizuelni prikaz skeleton loadera na listi opreme tokom sporijeg učitavanja API-ja.
* **Artefakt:** `CONTEXT.md` sa 18 sekcija koji služi kao primarna tehnička referenca.
* **Artefakt:** Set SQL migracijskih skripti u `/database/migrations`.

## 5. Glavni problemi i blokeri
* **Vercel Env Vars:** Problem sa nevažećim formatom `JWT_EXPIRES_IN` na produkciji uzrokovao je privremeni pad login sistema (riješeno uvođenjem fallback-a i čišćenjem env varijabli).
* **Claude Code Co-authorship:** Alat je automatski dodavao meta-podatke u commit poruke, što je zahtijevalo `force push` i rebase historije radi čistoće repozitorija.

## 6. Ključne odluke donesene u sprintu
* **OD-009:** Korištenje Playwright-a kao primarnog alata za E2E testiranje.
* **OD-010:** Implementacija Audit Log sistema za praćenje svih kritičnih izmjena na opremi.
* **OD-011:** Uvođenje Rate Limitinga na login ruti kao preventivna mjera protiv brute-force napada.
* **OD-013:** "Code-first" pristup migracijama baze podataka umjesto ručnog klikanja u dashboardu.

## 7. Povratna informacija Product Ownera
* Pohvaljena je brzina učitavanja stranica i vizuelni identitet (animacije).
* PO insistira da se u narednom sprintu riješi persistentnost tokena (prelazak sa `sessionStorage` na `httpOnly cookies`) zbog sigurnosnih standarda.
* Zadovoljstvo lokalizacijom poruka na bosanski jezik, što sistem čini pristupačnijim krajnjim korisnicima.

## 8. Zaključak za naredni sprint
Sprint 6 je bio najuspješniji do sada u pogledu stabilnosti koda. U Sprintu 7 fokus će biti na **finalnom sigurnosnom ojačavanju** autentifikacijskog mehanizma (httpOnly cookies), **naprednim izvještajima** o korištenju laboratorijske opreme i **implementaciji logike za brisanje resursa** uz validaciju zavisnosti.