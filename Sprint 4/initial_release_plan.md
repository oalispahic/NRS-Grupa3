# Initial Release Plan – Sistem za upravljanje medicinskom laboratorijskom opremom
 
Initial Release Plan predstavlja strukturirani pregled svih planiranih aktivnosti, funkcionalnosti i tehničkih isporuka kroz sve sprintove projekta, sve do finalnog izdanja sistema. Ovaj dokument služi kao referentna tačka za cijeli tim – jasno definiše šta se gradi, kojim redoslijedom i na osnovu kojih prioriteta. Plan je direktno zasnovan na **[Product Backlogu](../Sprint%202/product_backlog_v2.md)** i **[Domain Modelu](../Sprint%203/domain_model.md)** koji su definisani u prethodnim sprintovima, a redoslijed implementacije određen je prema kombinaciji poslovne vrijednosti svake funkcionalnosti i tehničkih zavisnosti između njih.
 
---

## Tehnološki stack
 
| Sloj | Tehnologija | Uloga u projektu |
|---|---|---|
| **Frontend** | React | Komponentni UI, dinamički prikaz podataka, SPA arhitektura |
| **Backend** | Node.js + Express | REST API, implementacija poslovne logike, middleware |
| **Baza podataka** | PostgreSQL | Relaciona pohrana svih entiteta i njihovih veza |
| **Autentifikacija** | JWT + RBAC | Sigurna prijava korisnika, kontrola pristupa po ulozi |
| **Testiranje API-ja** | Postman | Ručno testiranje i validacija API endpointa |
| **Verzionisanje** | Git + GitHub | Upravljanje kodom, code review, branching strategija |
| **Deployment** | Docker (opcionalno) | Kontejnerizacija za konzistentno okruženje |
 
---

