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

<table style="width: 100%; border-collapse: separate; border-spacing: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 20px 0; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <thead>
    <tr style="background-color: #2c3e50; color: #ffffff; text-align: left;">
      <th style="padding: 15px; width: 25%; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Nivo Testiranja</th>
      <th style="padding: 15px; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Konkretne funkcije (Stories / Zahtjevi)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #ffffff;">
      <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #2c3e50;">
        <span style="display: inline-block; width: 8px; height: 8px; background-color: #3498db; border-radius: 50%; margin-right: 10px;"></span>Unit
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee; color: #444; line-height: 1.6;">
        Provjera lozinki <strong>(US-23)</strong>, logika trošenja zaliha <strong>(US-21)</strong>, ID kodovi <strong>(NFR-13)</strong>.
      </td>
    </tr>
    <tr style="background-color: #fdfdfd;">
      <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #2c3e50;">
        <span style="display: inline-block; width: 8px; height: 8px; background-color: #e67e22; border-radius: 50%; margin-right: 10px;"></span>Integraciono
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee; color: #444; line-height: 1.6;">
        Rad sa opremom u bazi <strong>(US-5)</strong>, ko ima koje dozvole <strong>(US-24)</strong>, backup sistema <strong>(FR-10)</strong>.
      </td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #2c3e50;">
        <span style="display: inline-block; width: 8px; height: 8px; background-color: #2ecc71; border-radius: 50%; margin-right: 10px;"></span>Sistemsko
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee; color: #444; line-height: 1.6;">
        Rezervacija od početka do kraja <strong>(US-3)</strong>, mijenjanje statusa kvarova <strong>(US-8)</strong>, kalendar <strong>(US-11)</strong>.
      </td>
    </tr>
    <tr style="background-color: #fdfdfd;">
      <td style="padding: 15px; font-weight: bold; color: #2c3e50;">
        <span style="display: inline-block; width: 8px; height: 8px; background-color: #9b59b6; border-radius: 50%; margin-right: 10px;"></span>Prihvatno (UAT)
      </td>
      <td style="padding: 15px; color: #444; line-height: 1.6;">
        Generisanje izvještaja <strong>(US-16)</strong>, pregled trenutnog korištenja aparata <strong>(US-18)</strong>.
      </td>
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