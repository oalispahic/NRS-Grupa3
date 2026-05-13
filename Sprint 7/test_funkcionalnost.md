# Test funkcionalnost — Sprint 7

## Opseg
Ovaj dokument opisuje proceduru i rezultate testiranja funkcionalnosti implementiranih u okviru Sprinta 7. Fokus testiranja je na reimplementaciji modula za dostupnost opreme (kalendarski prikaz), validaciji unosa (FluentValidation), proširenju detalja opreme, te administrativnom upravljanju životnim ciklusom rezervacija (odobravanje i restrikcije otkazivanja).

## Automatizovani testovi
- Backend: Jest unit testovi za service i middleware sloj. Repozitoriji i vanjske zavisnosti su mock-ovani (nema potrebe za DB).
- Frontend: Vitest + React Testing Library za UI tokove. Mrezni pozivi su mock-ovani.

## Testni pristup i okruženje
- **Tip testova:** Unit (kalkulacija slotova, validacija), Component (kalendarski grid, dashboard) i Integration (komunikacija frontend-backend).
- **Izolacija:** API pozivi su mock-ovani na klijentskoj strani kako bi se osigurala stabilnost UI testova.
- **Fokus:** Tačnost prikaza slobodnih termina, detekcija konflikata (collision detection), provjera 24h restrikcije za otkazivanje i renderska tačnost proširenih detalja opreme.

## Testni podaci (mock)
- **Oprema:** Prošireni objekti sa serijskim brojevima, lokacijom i tehničkim specifikacijama.
- **Slotovi:** Setovi preklapajućih i uzastopnih termina za testiranje algoritma dostupnosti.
- **Rezervacije:** Testni korisnici sa ulogama `Admin` i `Korisnik` sa različitim statusima zahtjeva.

## Kriterij prolaza
- Svi automatizovani testovi (unit i component) prolaze sa 100% uspjehom.
- Funkcionalnost "Dostupnost" (US-11) ispravno blokira preklapanja u svim rubnim slučajevima.
- Restrikcija otkazivanja (24h lock) baca predviđenu grešku pri pokušaju kršenja pravila.

## Kako pokrenuti
**Backend:**
1) `cd src/Backend/NRS.Tests`
2) `dotnet test`

**Frontend:**
1) `cd src/Frontend/NRS.Frontend.Tests`
2) `dotnet test`

## Testovi po user story-ju

| User story | Opis | Automatski testovi |
| --- | --- | --- |
| **US-11** | Kalendarski pregled dostupnosti | `AvailabilityServiceTests.cs`, `CalendarGrid.razor.tests` |
| **US-8** | Detalji opreme (Dopuna) | `EquipmentServiceTests.cs` (UpdateDetails), `EquipmentDetailView.razor.tests` |
| **US-5** | Rezervacija (Validacija) | `ReservationValidatorTests.cs` (FluentValidation rules) |
| **US-7** | Odobravanje rezervacija | `AdminServiceTests.cs` (StatusChange), `AdminDashboard.razor.tests` |
| **US-13** | Historija rezervacija | `HistoryPage.razor.tests` (Filtering logic) |
| **US-14** | Otkazivanje (Lock period) | `ReservationServiceTests.cs` (CheckLockPeriod) |

## Detaljni test scenariji — Backend

### AvailabilityServiceTests.cs (US-11)
- **Collision Detection:** Pokušaj kreiranja rezervacije koja se preklapa sa postojećom (makar i jednu minutu) -> sistem vraća `Conflict (409)`.
- **Gap Calculation:** Ako postoji rupa od 30 minuta između dvije rezervacije, sistem je mora ispravno označiti kao slobodnu u kalendarskom gridu.
- **RealTime Refresh:** Nakon što Admin odobri zahtjev, status slota se momentalno mijenja iz 'Pending' u 'Occupied'.

### ReservationValidatorTests.cs (US-5)
- **Past Booking:** Pokušaj rezervacije termina u prošlosti -> Validacijska greška (Status 400).
- **Incomplete Data:** Slanje forme bez odabrane opreme ili opisa svrhe -> Blokada unosa na nivou modela.
- **Duration Check:** Rezervacije kraće od 15 minuta ili duže od maksimalno dozvoljenog (ako postoji limit) -> Validacijska greška.

### Admin & Lifecycle (US-7, US-14)
- **Status Transition:** Provjera da li status 'Pending' ispravno prelazi u 'Approved' ili 'Rejected' bez gubitka integriteta podataka.
- **24h Cancellation Lock:** Pokušaj otkazivanja rezervacije 12 sati prije početka -> Sistem odbija zahtjev uz poruku o restrikciji.
- **Release Resources:** Otkazivanjem termina (više od 24h unaprijed), oprema mora postati trenutno dostupna za druge korisnike.

## Detaljni test scenariji — Frontend

### CalendarGrid.razor.tests (US-11)
- **Responsive Layout:** Provjera da li se kalendar prilagođava različitim veličinama ekrana (Mobile vs Desktop).
- **Color Logic:** Slotovi sa statusom 'Approved' se renderuju u crvenoj boji, 'Pending' u žutoj, a slobodni u zelenoj.

### EquipmentDetailView.razor.tests (US-8)
- **Attribute Rendering:** Potvrda da su nova polja (Serijski broj, Tehnički detalji) vidljiva na UI-u nakon povlačenja podataka sa API-ja.

### HistoryPage.razor.tests (US-13)
- **Status Filtering:** Odabir filtera "Odbijeno" mora rezultirati prikazom isključivo onih rezervacija koje imaju taj status.

## Napomene
- Sprint 7 testiranje je fokusirano na **ispravku propusta iz Sprinta 6**, sa posebnim akcentom na robusnost algoritma dostupnosti.
- Svi klijentski testovi koriste `MockAuthenticationStateProvider` kako bi se testirali različiti nivoi pristupa (Admin vs Korisnik) bez potrebe za pravom autentifikacijom.
