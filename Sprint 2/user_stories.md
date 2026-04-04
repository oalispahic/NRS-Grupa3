# User Stories

Ovdje se nalaze objašnjenja funkcionalnosti softvera napisana iz perspektive krajnjeg korisnika. User Stories pomažu da se funkcionalnosti ne posmatraju samo kroz to kako aplikacija radi, nego i kroz to ko koristi određenu funkciju i koju vrijednost ona donosi u svakodnevnom radu.

## ID storyja
Lab-01

## Naziv storyja
Rezervacija laboratorijske opreme

## Opis
Kao laboratorijsko osoblje, želim rezervisati opremu za određeni termin, kako bih mogla na vrijeme organizovati rad i izbjeći preklapanje korištenja opreme.

## Poslovna vrijednost
Ovaj story je važan zato što omogućava bolju organizaciju rada u laboratoriji. Kada korisnici mogu unaprijed rezervisati opremu, smanjuje se mogućnost nesporazuma, čekanja i preklapanja termina.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
Pretpostavka: Svaka stavka opreme ima evidentiran status i dostupne termine.
Pretpostavka: Korisnik mora biti prijavljen u sistem da bi mogao izvršiti rezervaciju.
Otvoreno pitanje: Da li rezervacija mora biti automatski odobrena ili je potrebno dodatno odobrenje?
Otvoreno pitanje: Može li jedan korisnik imati više aktivnih rezervacija u isto vrijeme?

## Veze sa drugim storyjima ili zavisnostima
Zavisi od: pregleda opreme i prikaza njenog statusa
Povezano sa: pregledom zauzeća opreme i odobravanjem rezervacija

## ID storyja
Lab-02

## Naziv storyja
Pregled statusa laboratorijske opreme

## Opis
Kao laboratorijsko osoblje, želim vidjeti status laboratorijske opreme, kako bih znala koja je oprema dostupna za korištenje a koja nije.

## Poslovna vrijednost
Ovaj story je važan jer korisnicima daje brz i jasan pregled nad opremom. Na taj način se lakše planira rad, izbjegavaju se zabune i smanjuje mogućnost da neko pokuša koristiti opremu koja je već zauzeta ili van funkcije.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
Pretpostavka: Svaka stavka opreme ima evidentiran trenutni status.
Pretpostavka: Status opreme se redovno ažurira u sistemu.
Otvoreno pitanje: Ko sve ima pravo mijenjati status opreme?
Otvoreno pitanje: Koji statusi će biti dostupni u sistemu, npr. dostupna, zauzeta, u kvaru, van upotrebe?

## Veze sa drugim storyjima ili zavisnostima
Zavisi od: evidencije laboratorijske opreme
Povezano sa: rezervacijom opreme i pregledom zauzeća


## ID storyja
Lab-03

## Naziv storyja
Pregled zauzeća opreme

## Opis
Kao laboratorijsko osoblje, želim pregledati zauzeće opreme po terminima, kako bih mogla bolje planirati korištenje laboratorijskih resursa.

## Poslovna vrijednost
Ovaj story je važan jer omogućava korisnicima da unaprijed vide kada je određena oprema slobodna, a kada zauzeta. Tako se lakše organizuje rad, izbjegavaju se preklapanja i smanjuju nepotrebni zastoji.

## Prioritet
Visok

## Pretpostavke i otvorena pitanja
Pretpostavka: Sistem sadrži tačne i ažurne podatke o svim aktivnim rezervacijama opreme.
Otvoreno pitanje: Da li se zauzeće opreme prikazuje samo kao lista termina ili se prikazuje i kroz kalendarski pregled?
Otvoreno pitanje: Da li korisnici mogu vidjeti ko je rezervisao opremu ili samo da je termin zauzet?

## Veze sa drugim storyjima ili zavisnostima
Zavisi od: rezervacije opreme
Povezano sa: pregledom statusa opreme


## ID storyja
Lab-04

## Naziv storyja
Evidentiranje potrošnje repromaterijala

## Opis
Kao laboratorijsko osoblje, želim evidentirati potrošnju repromaterijala nakon korištenja opreme, kako bih imala tačan pregled nad stanjem zaliha.

## Poslovna vrijednost
Ovaj story je važan jer omogućava bolju kontrolu nad repromaterijalom koji se koristi u radu sa laboratorijskom opremom. Na taj način se lakše prati stanje zaliha, izbjegava se nestašica materijala i olakšava planiranje nabavke.

## Prioritet
Srednji

## Pretpostavke i otvorena pitanja
Pretpostavka: Repromaterijal je unaprijed evidentiran u sistemu.
Pretpostavka: Korisnik može unijeti količinu potrošenog materijala.
Otvoreno pitanje: Da li se potrošnja unosi ručno ili se automatski povezuje sa korištenjem određene opreme?
Otvoreno pitanje: Da li sistem treba upozoriti kada količina nekog materijala padne ispod minimalne granice?

## Veze sa drugim storyjima ili zavisnostima
Zavisi od: evidencije repromaterijala u sistemu
Povezano sa: pregledom laboratorijske opreme i pretragom podataka
