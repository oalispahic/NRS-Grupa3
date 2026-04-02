## User Stories

Ovdje se nalaze objašnjenja funkcionalnosti softvera napisana iz perspektive krajnjeg korisnika. User Stories pomažu tako što ne opisujemo samo kako radi aplikacija, nego govore o tome ko koristi funkciju i koju će vrijednost postići u svakodnevnom radu. Fokus nije samo na kodu, nego se daje značaj stvarnim potrebama korisnika.

## Story ID: Lab - 01

## Naziv Storyja:

Prijava kvara na analizatoru krvi

## Opis

Recimo imamo kvar unutar aplikacije gdje pri analizi nečije krvi dođe do neke greške. Laborant je dužan da pošalje digitalni izvještaj kvara koji se desio. Da ga popuni detaljno da ne dođe do zabuna niti dvoumica. Pri tome da spriječi korištenje neispravnog uređaja da ne bi došlo do daljnjeg širenja problema.

## Poslovna Vrijednost
Vrijednost jeste upravo što pri ovakvoj komunikaciji dostižemo jedan korak više što se tiče sporazuma između laboranta i tehničara. Da koristimo ručno, usmeno ili da šaljemo izvještaj mailom, bio bi dosta sporiji proces i čak bi došlo do gubitka informacija, velikih zastoja u analizama i tako bi lanac problema nastao ukoliko ne bismo uveli ovaj vid izvještavanja.

## Prioritet

Visok (Must-Have). Smatramo da je ovo osnovna funkcija za ovu aplikaciju. Održavanje opreme je na top prioritetu!

## Pretpostavke i otvorena pitanja
Pretpostavljamo da korisnici (laborant i tehničar) imaju aktivno korisničko ime i lozinku za pristup.

Otvoreno pitanje: Mora li laborant pri slanju izvještaja da popuni polje za opis kvara ili može da ga ostavi prazno?

Otvoreno pitanje: Da li postoji opcija da korisnik može da ima opciju pri kreiranju izvještaja da odredi ozbiljnost kvara (hitan / nije hitan)?

## Veze sa drugim storyjima i zavisnostima
Zavisi od: Registracije korisnika (Login sistem) i Baze podataka opreme (Inventar).

Povezano sa: Storyjem za pregled i obradu kvara od strane tehničara



## Story ID Lab: Lab - 02

## Naziv Storyja:

Pregledanje i prihvatanje kvara od strane Tehničara

## Opis

Tehničar dobije prijavu kvara na svom računaru. On treba da odreaguje tako što će se pojaviti u toj laboratoriji i brzo odgovoriti na izvještaj tako što će označiti da je popravka u toku. Pri tome treba da ukloni kvar ako je moguće. Ako nije moguće, treba da ostavi nalog u statusu "u toku popravke". Pri okončanju popravke, kada je uređaj stabilan, na izvještaju treba da označi da je problem riješen.Tehničar u aplikaciji mijenja status kvara iz Prijavljeno u U toku, a po završetku u Zatvoreno/Riješeno. 

## Poslovna Vrijednost

Ovim procesom stvara se bolja i vještija komunikacija između laboranta i tehničara (kao što je navedeno u Lab - 01). Tehničari dobijaju bolji alat i efikasniji način rada na terenu, što ubrzava vraćanje opreme u funkciju.

## Prioritet

Visok (Must-Have): Također osnovna funkcija unutar ove aplikacije kako bismo što efikasnije riješili problem!

## Pretpostavke i otvorena pitanja

Pretpostavka: Tehničar ima pristup listi svih otvorenih prijava kvara.

Otvoreno pitanje: Da li tehničar treba da unese opis šta je tačno popravio prije nego što zatvori nalog?

Otvoreno pitanje: Da li sistem treba automatski da obavijesti šefa laboratorije kada je uređaj ponovo spreman za rad?

Otvoreno pitanje: Da li sistem treba tražiti od tehničara da unese serijski broj zamjenskog dijela ako je nešto promijenjeno?

## Veze sa drugim storyjima i zavisnostima

Direktno zavisi od: Lab - 01 (Prijava kvara na analizatoru krvi)

Povezano sa: Lab - 03 (Preventivni servis i održavanje)  jer popravka kvara može uticati na planiranje budućih redovnih servisa
