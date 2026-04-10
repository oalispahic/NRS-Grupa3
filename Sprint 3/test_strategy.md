# Test Strategy

## 1. Šta želimo postići testiranjem? 
Glavna stvar nam je da sistem bude pouzdan i da u laboratoriji nema haosa. Ne smije se desiti da dvoje ljudi rezerviše isti aparat u isto vrijeme ili da neko ko nije admin mijenja važne podatke. Također, pošto radimo s medicinskom opremom, svaki "trag" u sistemu mora ostati zabilježen u Audit Log-u da bismo znali ko je šta radio.

---

## 2. Nivoi testiranja koje ćemo koristiti

* **Unit testiranje**
    * Tu ćemo provjeravati sitne dijelove koda, tipa da li validacija lozinke radi kako treba, da li se dobro računa potrošnja epruveta i da li sistem ispravno generiše one UUID kodove. Za ovo koristimo **Jest**.
* **Integraciono testiranje**
    * Ovdje gledamo kako sve skupa radi sa bazom. Bitno nam je da li API stvarno upiše rezervaciju u PostgreSQL i da li JWT tokeni dobro čuvaju "zaključane" rute.
* **Sistemsko testiranje**
    * Testiramo aplikaciju "od glave do pete". Koristimo **Cypress** da prođemo kroz cijeli put laboranta od logina, preko traženja opreme u kalendaru, pa do konačne potvrde.
* **Prihvatno testiranje UAT**
    * Ovo je onaj završni korak gdje mi ili kolege koji glume laborante i šefove prođemo kroz sistem da vidimo da li on stvarno rješava probleme iz svakodnevnog rada.

---

## 3. Šta se testira u kojem nivou

<table style="width:100%; border-collapse: collapse; font-family: sans-serif; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #34495e; color: white; text-align: left;">
      <th style="padding: 12px; border: 1px solid #ddd;">Nivo</th>
      <th style="padding: 12px; border: 1px solid #ddd;">Konkretne funkcije Stories / Zahtjevi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2; font-weight: bold;">Unit</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Provjera lozinki US-23, logika trošenja zaliha US-21, ID kodovi NFR-13.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Integraciono</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Rad sa opremom u bazi US-5, ko ima koje dozvole US-24, backup sistema FR-10.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2; font-weight: bold;">Sistemsko</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Rezervacija od početka do kraja US-3, mijenjanje statusa kvarova US-8, kalendar US-11.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Prihvatno</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Generisanje izvještaja za US-16, gledanje ko trenutno koristi aparate US-18.</td>
    </tr>
  </tbody>
</table>

---

## 4. Kako znamo da je test prošao? 
Svaki test mora odgovarati onome što smo napisali u Backlog-u. Ako smo rekli da laborant ne smije vidjeti admin panel, test to mora potvrditi. Također, ako neka funkcija radi, ali joj treba 10 sekundi da učita, to smatramo padom testa jer smo u NFR-ovima zacrtali da sve mora biti brzo ispod 1.5s.

---

## 5. Gdje zapisujemo rezultate?
Sve bugove koje nađemo idu direktno na **GitHub Issues** uz kratak opis šta ne valja. Za unit i sistemske testove koristimo automatske izvještaje koje izbace Jest i Cypress, a za bazu ćemo ručno provjeriti `Audit_Log` tabelu da vidimo je li se sve dobro snimilo.

---

## 6. Na šta moramo najviše paziti? 
* **Duple rezervacije:** To nam je najveći rizik, da se ne preklopi termin. Rešavamo to kroz lock mehanizme u bazi.
* **Dozvole:** Da se ne desi da obični korisnik može brisati opremu. Zato RBAC testiramo do detalja.
* **Pad sistema:** Laboratorija radi stalno, pa moramo biti sigurni da backup radi NFR-14 i da možemo brzo vratiti podatke.
* **Pogrešne zalihe:** Ako sistem kaže da imamo epruveta, a fizički ih nema, to je problem. Zato matematiku oko zaliha US-21 testiramo posebno pažljivo.