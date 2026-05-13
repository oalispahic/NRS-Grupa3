# Test funkcionalnost — Sprint 7

## Opseg
Ovaj dokument opisuje proceduru i rezultate testiranja funkcionalnosti implementiranih u okviru Sprinta 7. Fokus testiranja je na kritičnim ispravkama iz prethodnog sprinta: reimplementaciji modula za dostupnost opreme (kalendarski prikaz), naprednoj validaciji unosa (FluentValidation), proširenju tehničkih detalja opreme, te administrativnom upravljanju životnim ciklusom rezervacija sa restrikcijom otkazivanja.

## Automatizovani testovi
- **Backend:** .NET xUnit testovi za servisni sloj i validacijsku logiku. Korišten je `Moq` za simulaciju repozitorija i `FluentValidation.TestHelper` za provjeru pravila poslovne logike.
- **Frontend:** Blazor `bUnit` testovi za renderovanje komponenti i `Playwright` za kriticne E2E (End-to-End) tokove korisničkog interfejsa.

## Testni pristup i okruženje
- **Tip testova:** Unit (kalkulacija slotova, validacija), Component (kalendarski grid, dashboard) i Integration (komunikacija frontend-backend).
- **Izolacija:** API pozivi su mock-ovani na klijentskoj strani kako bi se osigurala stabilnost UI testova nezavisno od baze.
- **Fokus:** Tačnost prikaza slobodnih termina u gridu, detekcija konflikata (collision detection), provjera 24h restrikcije za otkazivanje i renderska tačnost proširenih detalja opreme.

## Testni podaci (mock)
- **Oprema:** Prošireni objekti sa serijskim brojevima, tehničkim specifikacijama i lokacijom laboratorije.
- **Slotovi:** Setovi preklapajućih i uzastopnih termina za testiranje algoritma dostupnosti u realnom vremenu.
- **Rezervacije:** Testni korisnici sa ulogama `Admin` i `Laborant` sa različitim statusima zahtjeva (Pending, Approved, Rejected).

## Kriterij prolaza
- Svi automatizovani testovi (unit i component) prolaze sa 100% uspjehom.
- Funkcionalnost "Dostupnost" (US-11) ispravno blokira preklapanja u 100% testnih scenarija.
- Restrikcija otkazivanja (24h lock) baca predviđenu `BusinessRuleException` pri pokušaju kršenja pravila.

## Kako pokrenuti
**Backend (.NET):**
1) `cd src/Backend/NRS.Tests`
2) `dotnet test`

**Frontend (Blazor):**
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
- **Collision Detection:** Pokušaj kreiranja rezervacije koja se preklapa sa postojećom (čak i za 1 minut) -> sistem vraća status 409 Conflict.
- **Gap Calculation:** Ako postoji rupa od 30 minuta između dvije rezervacije, sistem je mora ispravno prikazati kao "Slobodno" u kalendaru.
- **Status Sync:** Provjera da li 'Pending' zahtjev zauzima slot na kalendaru jednako kao i 'Approved' kako bi se spriječio "double-booking".

### ReservationValidatorTests.cs (US-5)
- **Past Date Validation:** Pokušaj rezervacije termina u prošlosti -> Validacijska greška (Status 400).
- **Required Fields:** Slanje forme bez odabrane opreme ili opisa svrhe korištenja -> Blokada unosa na nivou modela.
- **Minimum Duration:** Provjera da li sistem odbija rezervacije kraće od minimalno definisanog praga (npr. 15 min).

### Admin & Lifecycle (US-7, US-14)
- **Status Transition:** Provjera da li status 'Pending' ispravno prelazi u 'Approved' ili 'Rejected' uz ispravan upis u bazu.
- **24h Cancellation Lock:** Pokušaj otkazivanja rezervacije 12 sati prije početka -> Sistem odbija zahtjev uz poruku o restrikciji.
- **Resource Release:** Otkazivanjem termina (više od 24h unaprijed), oprema automatski postaje dostupna u kalendaru.

## Detaljni test scenariji — Frontend

### CalendarGrid.razor.tests (US-11)
- **Responsive Grid:** Provjera da li se grid ispravno renderuje na mobilnim uređajima (preslagivanje kolona).
- **Color Logic:** Slotovi sa statusom 'Approved' se renderuju u crvenoj, 'Pending' u žutoj, a slobodni u zelenoj boji.

### EquipmentDetailView.razor.tests (US-8)
- **Attribute Rendering:** Potvrda da su nova polja (Serijski broj, Lokacija, Specifikacije) vidljiva na UI-u nakon povlačenja podataka sa API-ja.

### HistoryPage.razor.tests (US-13)
- **Status Filtering:** Odabir filtera "Otkazano" mora prikazati isključivo one rezervacije koje su u statusu `Cancelled`.

## Napomene
- Testiranje u Sprintu 7 je fokusirano na **robustan ispravak kritičnih propusta** iz prethodnih faza, s akcentom na preciznost kalendara.
- Korišten je `MockAuthenticationStateProvider` kako bi se testirali različiti nivoi pristupa (Admin vs Korisnik) bez potrebe za Keycloak serverom.