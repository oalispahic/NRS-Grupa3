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

<table style="width: 100%; border-collapse: separate; border-spacing: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 20px 0; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
  <thead>
    <tr style="background-color: #2c3e50; color: #ffffff; text-align: left;">
      <th style="padding: 18px; width: 20%; font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em; border-right: 1px solid rgba(255,255,255,0.1);">Nivo</th>
      <th style="padding: 18px; font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.05em;">Konkretne funkcije (Stories / Zahtjevi)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #ffffff;">
      <td style="padding: 20px; border-bottom: 1px solid #eee; font-weight: bold; color: #2c3e50; vertical-align: middle;">
        <div style="display: flex; align-items: center;">
          <span style="width: 10px; height: 10px; background-color: #3498db; border-radius: 50%; margin-right: 10px;"></span>Unit
        </div>
      </td>
      <td style="padding: 20px; border-bottom: 1px solid #eee;">
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <span style="background: #ebf5fb; color: #2980b9; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #d6eaf8;">Provjera lozinki <b>(US-23)</b></span>
          <span style="background: #ebf5fb; color: #2980b9; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #d6eaf8;">Logika trošenja zaliha <b>(US-21)</b></span>
          <span style="background: #ebf5fb; color: #2980b9; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #d6eaf8;">ID kodovi <b>(NFR-13)</b></span>
        </div>
      </td>
    </tr>
    <tr style="background-color: #fcfcfc;">
      <td style="padding: 20px; border-bottom: 1px solid #eee; font-weight: bold; color: #2c3e50; vertical-align: middle;">
        <div style="display: flex; align-items: center;">
          <span style="width: 10px; height: 10px; background-color: #e67e22; border-radius: 50%; margin-right: 10px;"></span>Integraciono
        </div>
      </td>
      <td style="padding: 20px; border-bottom: 1px solid #eee;">
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <span style="background: #fef5e7; color: #d35400; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #fae5d3;">Rad sa opremom <b>(US-5)</b></span>
          <span style="background: #fef5e7; color: #d35400; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #fae5d3;">Dozvole pristupa <b>(US-24)</b></span>
          <span style="background: #fef5e7; color: #d35400; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #fae5d3;">Backup sistema <b>(FR-10)</b></span>
        </div>
      </td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="padding: 20px; border-bottom: 1px solid #eee; font-weight: bold; color: #2c3e50; vertical-align: middle;">
        <div style="display: flex; align-items: center;">
          <span style="width: 10px; height: 10px; background-color: #2ecc71; border-radius: 50%; margin-right: 10px;"></span>Sistemsko
        </div>
      </td>
      <td style="padding: 20px; border-bottom: 1px solid #eee;">
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <span style="background: #eafaf1; color: #27ae60; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #d4efdf;">Rezervacija end-to-end <b>(US-3)</b></span>
          <span style="background: #eafaf1; color: #27ae60; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #d4efdf;">Statusi kvarova <b>(US-8)</b></span>
          <span style="background: #eafaf1; color: #27ae60; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #d4efdf;">Interaktivni kalendar <b>(US-11)</b></span>
        </div>
      </td>
    </tr>
    <tr style="background-color: #fcfcfc;">
      <td style="padding: 20px; font-weight: bold; color: #2c3e50; vertical-align: middle;">
        <div style="display: flex; align-items: center;">
          <span style="width: 10px; height: 10px; background-color: #9b59b6; border-radius: 50%; margin-right: 10px;"></span>Prihvatno
        </div>
      </td>
      <td style="padding: 20px;">
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <span style="background: #f5eef8; color: #8e44ad; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #ebdef0;">Izvještaji <b>(US-16)</b></span>
          <span style="background: #f5eef8; color: #8e44ad; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; border: 1px solid #ebdef0;">Praćenje korištenja <b>(US-18)</b></span>
        </div>
      </td>
    </tr>
  </tbody>
</table>


### Vizuelni prikaz strukture testiranja
Donja piramida ilustruje našu strategiju raspodjele resursa. Temelj sistema čine **Unit testovi** jer su najbrži za izvršavanje i omogućavaju nam da rano otkrijemo logičke greške u kodu. Kako se krećemo ka vrhu, broj testova se smanjuje, ali njihova kompleksnost raste, završavajući sa **Prihvatnim testovima** koji verifikuju sistem iz perspektive krajnjeg korisnika.

<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 30px auto; text-align: center;">
  
  <div style="background-color: #a5d6a7; border: 2px solid #2e7d32; padding: 15px; margin: 0 auto 5px auto; width: 40%; clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);">
    <b style="color: #1b5e20; font-size: 0.85rem;">Prihvatno UAT</b><br>
    <span style="font-size: 0.75rem; color: #1b5e20;">US-16, US-18</span>
  </div>

  <div style="background-color: #fff59d; border: 2px solid #fbc02d; padding: 15px; margin: 0 auto 5px auto; width: 70%; clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);">
    <b style="color: #f57f17; font-size: 0.9rem;">Integraciono</b><br>
    <span style="font-size: 0.8rem; color: #f57f17;">US-5, US-24, FR-10</span>
  </div>

  <div style="background-color: #90caf9; border: 2px solid #1565c0; padding: 20px; margin: 0 auto; width: 100%; border-radius: 0 0 8px 8px;">
    <b style="color: #0d47a1; font-size: 1rem;">Unit Baza Kvaliteta</b><br>
    <span style="font-size: 0.85rem; color: #0d47a1;">US-23, US-21, NFR-13</span>
  </div>

  <p style="font-style: italic; color: #666; font-size: 0.85rem; margin-top: 15px;">
    Slika: Hijerarhija testiranja od najbržih Unit do najkompleksnijih UAT
  </p>
</div>

## 4. Kako znamo da je test prošao? 
Svaki test mora odgovarati onome što smo napisali u Backlog-u. Ako smo rekli da laborant ne smije vidjeti admin panel, test to mora potvrditi. Također, ako neka funkcija radi, ali joj treba 10 sekundi da učita, to smatramo padom testa jer smo u NFR-ovima zacrtali da sve mora biti brzo ispod 1.5s.

---

## 5. Gdje zapisujemo rezultate?
Sve bugove koje nađemo idu direktno na **GitHub Issues** uz kratak opis šta ne valja. Za unit i sistemske testove koristimo automatske izvještaje koje izbace Jest i Cypress, a za bazu ćemo ručno provjeriti `Audit_Log` tabelu da vidimo je li se sve dobro snimilo.

---

## 6. Na šta moramo najviše paziti? 
* **Duple rezervacije:** To nam je najveći rizik, da se ne preklopi termin. Rješavamo to kroz lock mehanizme u bazi.
* **Dozvole:** Da se ne desi da obični korisnik može brisati opremu. Zato RBAC testiramo do detalja.
* **Pad sistema:** Laboratorija radi stalno, pa moramo biti sigurni da backup radi NFR-14 i da možemo brzo vratiti podatke.
* **Pogrešne zalihe:** Ako sistem kaže da imamo epruveta, a fizički ih nema, to je problem. Zato matematiku oko zaliha US-21 testiramo posebno pažljivo.

