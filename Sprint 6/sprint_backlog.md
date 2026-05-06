# Sprint 6 — Backlog 

> **Sprint 6 Goal** > Stabilizacija sistema, uvođenje registracije korisnika, napredno upravljanje statusima opreme, te poboljšanje korisničkog iskustva kroz animacije, validacije i vizuelne povratne informacije (loaders/skeletons).

---

### ID storyja: US-28
**Naziv storyja:** Registracija korisnika  
**Opis:** Kao novi korisnik, želim se moći registrovati u sistem kako bih dobio pristup funkcionalnostima bez intervencije administratora.  
**Poslovna vrijednost:** Ovaj story omogućava samostalno kreiranje naloga, što smanjuje administrativni teret i ubrzava proces onboardovanja novih korisnika u laboratorijski sistem.  
**Prioritet:** Visok  
**Pretpostavke i otvorena pitanja:** - Pretpostavka: Novi korisnici automatski dobijaju ulogu "laborant".  
- Pretpostavka: Sistem ne dozvoljava dupliranje korisničkih imena.  
- Otvoreno pitanje: Da li je potrebna verifikacija emaila? (Odlučeno: U ovoj fazi ne, koristi se običan string kao username).  
**Veze sa drugim storyjima ili zavisnostima:** - Povezano sa: US-6 (Autentifikacija korisnika)  
- Zavisi od: Postojanja baze korisnika  

---

### ID storyja: US-7 (Dopuna)
**Naziv storyja:** Admin panel na detaljima opreme  
**Opis:** Kao administrator, želim mijenjati status opreme direktno na stranici detalja, a ne samo u tabeli inventara.  
**Poslovna vrijednost:** Povećava efikasnost administratora omogućavajući brzu promjenu statusa (npr. iz "Dostupno" u "U kvaru") dok pregleda specifične detalje uređaja.  
**Prioritet:** Srednji  
**Pretpostavke i otvorena pitanja:** - Pretpostavka: Samo korisnici sa ulogom "admin" vide kontrole za promjenu statusa.  
- Otvoreno pitanje: Da li promjena statusa automatski otkazuje postojeće rezervacije? (Odlučeno: Trenutno ne, ostaje kao tehnički dug).  
**Veze sa drugim storyjima ili zavisnostima:** - Zavisi od: US-2 (Detalji opreme) i US-5 (Upravljanje opremom)  

---

### ID storyja: US-26 (Dopuna)
**Naziv storyja:** Napredna validacija i sprečavanje konflikata  
**Opis:** Kao korisnik, želim dobiti jasne poruke na svom jeziku i trenutnu validaciju termina kako bih izbjegao greške pri rezervaciji.  
**Poslovna vrijednost:** Smanjuje broj neuspješnih API poziva i frustraciju korisnika pružanjem trenutne povratne informacije o neispravnim terminima (npr. kraj termina prije početka).  
**Prioritet:** Visok  
**Pretpostavke i otvorena pitanja:** - Pretpostavka: Frontend vrši provjeru logike termina prije slanja zahtjeva serveru.  
- Otvoreno pitanje: Da li poruke trebaju biti lokalizovane na više jezika? (Odlučeno: Fokus je isključivo na bosanskom jeziku).  
**Veze sa drugim storyjima ili zavisnostima:** - Povezano sa: US-3 (Rezervacija opreme)  

---

### ID storyja: US-24 (Dopuna)
**Naziv storyja:** Poboljšanje UX-a i Loading stanja  
**Opis:** Kao korisnik, želim vidjeti indikatore učitavanja (skeletone i spinnere) umjesto praznog ekrana kako bih znao da sistem obrađuje moj zahtjev.  
**Poslovna vrijednost:** Profesionalniji izgled aplikacije i smanjenje percipiranog vremena čekanja, što direktno utiče na zadovoljstvo korisnika.  
**Prioritet:** Srednji  
**Pretpostavke i otvorena pitanja:** - Pretpostavka: Skeleton loaderi se koriste za liste i tabele, a spinneri za full-page akcije.  
- Otvoreno pitanje: Da li animacije utiču na performanse na slabijim uređajima? (Odlučeno: Koriste se lagani CSS ključni frejmovi).  
**Veze sa drugim storyjima ili zavisnostima:** - Povezano sa: Svim stranicama koje povlače podatke sa API-ja (US-1, US-4).  

---

### ID storyja: US-25
**Naziv storyja:** RBAC (Role Based Access Control) stabilizacija  
**Opis:** Kao korisnik, ne želim vidjeti "bijeli flash" ekrana prilikom osvježavanja stranice dok sistem provjerava moju ulogu.  
**Poslovna vrijednost:** Osigurava glatko korisničko iskustvo i sprečava vizuelne anomalije koje mogu djelovati kao bagovi u sistemu sigurnosti.  
**Prioritet:** Srednji  
**Pretpostavke i otvorena pitanja:** - Pretpostavka: Stanje sesije se čuva u sessionStorage.  
**Veze sa drugim storyjima ili zavisnostima:** - Zavisi od: US-6 (Autentifikacija korisnika)  

---

### ID storyja: US-29
**Naziv storyja:** Vizuelni identitet i poliranje interfejsa  
**Opis:** Kao korisnik, želim moderno i konzistentno sučelje sa glatkim tranzicijama između stranica.  
**Poslovna vrijednost:** Povećava povjerenje korisnika u sistem i čini rad u aplikaciji manje zamornim kroz upotrebu design tokena i suptilnih animacija.  
**Prioritet:** Nizak  
**Pretpostavke i otvorena pitanja:** - Pretpostavka: Svi elementi koriste centralizovane teme definisane u `theme.js`.  
**Veze sa drugim storyjima ili zavisnostima:** - Povezano sa: Globalnim CSS stilovima sistema.