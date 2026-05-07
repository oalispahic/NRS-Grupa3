-- Seed: 75 medicinskih/hemijskih instrumenata

INSERT INTO equipment
  (name, model, manufacturer, serial_number, description, status, location, purchase_date,
   supplier, last_service, planned_service, warranty_expiry, service_company)
VALUES

-- Centrifuge (4 jedinice)
('Centrifuga', 'Centrifuge 5430 R', 'Eppendorf', 'EPP-5430R-001',
 'Refrigerovana mikro centrifuga za odvajanje bioloških uzoraka, max 30.130 × g, 24 pozicije.',
 'available', 'Sala 1', '2021-03-15',
 'Eppendorf SEE d.o.o.', '2024-09-10', '2025-09-10', '2026-03-15', 'BioServis d.o.o.'),

('Centrifuga', 'Centrifuge 5810 R', 'Eppendorf', 'EPP-5810R-002',
 'Visokokapacitetna refrigerovana centrifuga za mikrotitre ploče i falcon tube, max 4.500 rpm.',
 'available', 'Sala 2', '2020-11-20',
 'Eppendorf SEE d.o.o.', '2024-11-05', '2025-11-05', '2025-11-20', 'BioServis d.o.o.'),

('Centrifuga', 'Mikro 200R', 'Hettich', 'HTT-200R-003',
 'Kompaktna refrigerovana mikro centrifuga, idealna za PCR tubice i Eppendorf tube.',
 'maintenance', 'Sala 1', '2019-06-10',
 'LabTech BiH d.o.o.', '2024-06-08', '2025-06-08', '2024-06-10', 'LabMaintenance d.o.o.'),

('Centrifuga', 'Universal 320 R', 'Hettich', 'HTT-320R-004',
 'Univerzalna laboratorijska centrifuga za standardne aplikacije, kapacitet do 4 × 750 mL.',
 'available', 'Sala 3', '2022-01-18',
 'LabTech BiH d.o.o.', '2025-01-15', '2026-01-15', '2027-01-18', 'LabMaintenance d.o.o.'),

-- Spektrofotometri (3 jedinice)
('Spektrofotometar', 'NanoDrop One', 'Thermo Fisher Scientific', 'TFS-ND1-001',
 'Mikro-volumetrijski UV-Vis spektrofotometar za mjerenje koncentracije DNA, RNA i proteina, bez kivete.',
 'available', 'Kabinet A', '2022-05-12',
 'ThermoFisher Direct', '2024-12-01', '2025-12-01', '2027-05-12', 'MediTeh Sarajevo d.o.o.'),

('Spektrofotometar', 'Evolution 201', 'Thermo Fisher Scientific', 'TFS-EV201-002',
 'UV-Vis dvozračni spektrofotometar sa rasponom talasnih dužina 190–1100 nm za kvantitativnu analizu.',
 'available', 'Kabinet B', '2020-09-08',
 'ThermoFisher Direct', '2024-09-05', '2025-09-05', '2025-09-08', 'MediTeh Sarajevo d.o.o.'),

('Spektrofotometar', 'Cary 60', 'Agilent Technologies', 'AGT-CARY60-003',
 'Brzi UV-Vis spektrofotometar sa Xenon blicom, bez pokretnih dijelova, za kinetička mjerenja.',
 'available', 'Sala 2', '2023-02-20',
 'Sigma-Aldrich BiH', '2025-02-18', '2026-02-18', '2028-02-20', 'BioServis d.o.o.'),

-- Mikroskopi (4 jedinice)
('Mikroskop', 'Eclipse Ci-L', 'Nikon', 'NKN-CIL-001',
 'Biološki ispravan mikroskop sa LED osvjetljenjem, povećanje 4×–100×, za rutinsku analizu tkiva.',
 'available', 'Sala 3', '2021-07-14',
 'Biomedica d.o.o.', '2024-07-10', '2025-07-10', '2026-07-14', 'BioServis d.o.o.'),

('Mikroskop', 'Axiovert 200M', 'Zeiss', 'ZSS-AV200M-002',
 'Invertni istraživački mikroskop za živu ćelijsku kulturu, sa fluorescencijskim modulom.',
 'available', 'Kabinet A', '2019-04-22',
 'VWR International', '2024-04-20', '2025-04-20', '2024-04-22', 'MediTeh Sarajevo d.o.o.'),

('Mikroskop', 'DM2000', 'Leica', 'LCA-DM2000-003',
 'Multifunkcionalni upright mikroskop sa automatskim filterskim kolicom za patološku analizu uzoraka.',
 'available', 'Sala 1', '2022-10-05',
 'Biomedica d.o.o.', '2024-10-03', '2025-10-03', '2027-10-05', 'BioServis d.o.o.'),

('Mikroskop', 'CX43', 'Olympus', 'OLY-CX43-004',
 'Ergonomski biološki mikroskop za klinička ispitivanja, sivi LED sistem osvjetljenja, 4× do 100× oil.',
 'out_of_service', 'Kabinet B', '2018-12-01',
 'MediSupply Sarajevo', '2023-11-28', NULL, '2023-12-01', 'LabMaintenance d.o.o.'),

-- Autoklave (3 jedinice)
('Autoklav', 'Systec V-65', 'Systec', 'SYS-V65-001',
 'Vertikalni autoklav za sterilizaciju laboratorijskog posuđa i medicinskog materijala, kapacitet 65 L.',
 'available', 'Sterilizaciona soba', '2021-08-30',
 'Biomedica d.o.o.', '2024-08-28', '2025-08-28', '2026-08-30', 'MediTeh Sarajevo d.o.o.'),

('Autoklav', 'Varioklav 500 EP-Z', 'HP Medizintechnik', 'HPM-500EPZ-002',
 'Horizontalni parni autoklav klase B za sterilizaciju poroznih materijala i šupljih instrumenata.',
 'available', 'Sterilizaciona soba', '2020-03-15',
 'MediSupply Sarajevo', '2024-03-12', '2025-03-12', '2025-03-15', 'MediTeh Sarajevo d.o.o.'),

('Autoklav', 'Tuttnauer 3870 EL', 'Tuttnauer', 'TTN-3870EL-003',
 'Automatski horizontalni autoklav sa elektroničkom kontrolom ciklusa, za kliničku upotrebu.',
 'reserved', 'Sterilizaciona soba', '2023-01-10',
 'Biomedica d.o.o.', '2025-01-08', '2026-01-08', '2028-01-10', 'BioServis d.o.o.'),

-- PCR aparati (3 jedinice)
('PCR aparat', 'T100 Thermal Cycler', 'Bio-Rad', 'BRD-T100-001',
 'Termalni cycler za standardnu PCR reakciju, 96-well blok, gradijent do 24°C za optimizaciju protokola.',
 'available', 'Kabinet A', '2022-06-05',
 'Sigma-Aldrich BiH', '2024-12-10', '2025-12-10', '2027-06-05', 'BioServis d.o.o.'),

('PCR aparat', 'CFX96 Touch', 'Bio-Rad', 'BRD-CFX96-002',
 'Real-time qPCR sistem sa 96-well blokionom, 6-kanalna detekcija fluorescencije, za gensku ekspresiju.',
 'available', 'Kabinet B', '2021-11-18',
 'Sigma-Aldrich BiH', '2024-11-15', '2025-11-15', '2026-11-18', 'BioServis d.o.o.'),

('PCR aparat', 'StepOnePlus', 'Applied Biosystems', 'ABI-SOPLUS-003',
 'Brzi real-time PCR sistem sa 96-well formatom i SDS softverom za analizu genskog izražavanja.',
 'maintenance', 'Sala 2', '2019-09-22',
 'ThermoFisher Direct', '2024-09-20', '2025-09-20', '2024-09-22', 'MediTeh Sarajevo d.o.o.'),

-- ELISA čitači (2 jedinice)
('ELISA čitač', 'Multiskan SkyHigh', 'Thermo Fisher Scientific', 'TFS-MSKY-001',
 'Mikroploča čitač apsorbancije sa brzim modom mjerenja, opseg 200–1000 nm, za imunoenzimske analize.',
 'available', 'Sala 1', '2022-04-20',
 'ThermoFisher Direct', '2024-10-18', '2025-10-18', '2027-04-20', 'MediTeh Sarajevo d.o.o.'),

('ELISA čitač', 'Infinite M200 Pro', 'Tecan', 'TCN-IM200P-002',
 'Višemodalni mikroploča čitač — fluorescencija, luminescencija i apsorbancija, za proteinsku analizu.',
 'available', 'Kabinet A', '2020-12-08',
 'VWR International', '2024-12-05', '2025-12-05', '2025-12-08', 'BioServis d.o.o.'),

-- pH-metri (3 jedinice)
('pH-metar', 'Seven Excellence S400', 'Mettler Toledo', 'MTL-S400-001',
 'Precizni laboratorijski pH/mV/temp metar sa automatskom kalibracijom i USB prijenosom podataka.',
 'available', 'Kabinet B', '2021-02-14',
 'Sigma-Aldrich BiH', '2024-08-12', '2025-08-12', '2026-02-14', 'LabMaintenance d.o.o.'),

('pH-metar', 'FiveEasy F20', 'Mettler Toledo', 'MTL-F20-002',
 'Kompaktni benchtop pH metar sa automatskim prepoznavanjem pufera, 3-točkovna kalibracija.',
 'available', 'Sala 3', '2023-05-09',
 'Sigma-Aldrich BiH', '2025-05-07', '2026-05-07', '2028-05-09', 'LabMaintenance d.o.o.'),

('pH-metar', 'Orion Star A211', 'Thermo Fisher Scientific', 'TFS-OSA211-003',
 'Benchtop pH metar sa dvostrukim prikazom, pohranjuje 100 rezultata mjerenja, pogodno za GLP okruženje.',
 'available', 'Kabinet A', '2020-07-30',
 'ThermoFisher Direct', '2024-07-28', '2025-07-28', '2025-07-30', 'MediTeh Sarajevo d.o.o.'),

-- Analitičke vage (3 jedinice)
('Analitička vaga', 'XPE205', 'Mettler Toledo', 'MTL-XPE205-001',
 'Mikro analitička vaga sa tačnošću 0,01 mg, automatskom kalibracijom i anti-statičkim kompletom.',
 'available', 'Kabinet B', '2021-10-11',
 'Sigma-Aldrich BiH', '2024-10-09', '2025-10-09', '2026-10-11', 'LabMaintenance d.o.o.'),

('Analitička vaga', 'AUX220', 'Shimadzu', 'SHM-AUX220-002',
 'Precizna analitička vaga 220 g/0,1 mg, UniBloc senzor, stabilizacija u 2 sekunde.',
 'available', 'Sala 1', '2022-03-25',
 'LabTech BiH d.o.o.', '2025-03-23', '2026-03-23', '2027-03-25', 'BioServis d.o.o.'),

('Analitička vaga', 'Practum313-1S', 'Sartorius', 'SRT-P313-003',
 'Kompaktna analitička vaga 310 g/0,001 g, ionizator zraka ugrađen, idealna za rutinska mjerenja.',
 'available', 'Kabinet A', '2020-01-16',
 'VWR International', '2024-01-14', '2025-01-14', '2025-01-16', 'LabMaintenance d.o.o.'),

-- Inkubatori (3 jedinice)
('Inkubator', 'Innova 44R', 'New Brunswick Scientific', 'NBS-IN44R-001',
 'Refrigerovana inkubator-treskalica za rast mikroorganizama, kapacitet 16 L, -20°C do 80°C.',
 'available', 'Sala 2', '2021-06-18',
 'Biomedica d.o.o.', '2024-06-15', '2025-06-15', '2026-06-18', 'BioServis d.o.o.'),

('Inkubator', 'Galaxy 170 S CO2', 'New Brunswick Scientific', 'NBS-G170S-002',
 'CO2 inkubator sa direktnom toplotom, kapacitet 170 L, za ćelijsku kulturu i tkivno inženjerstvo.',
 'available', 'Sala 3', '2022-09-14',
 'Biomedica d.o.o.', '2024-09-11', '2025-09-11', '2027-09-14', 'MediTeh Sarajevo d.o.o.'),

('Inkubator', 'Heratherm IMH60', 'Thermo Fisher Scientific', 'TFS-IMH60-003',
 'Suhi inkubator sa gravitacijskom konvekcijom, 60 L, temperatura 5°C iznad ambijentalnog do 105°C.',
 'available', 'Kabinet B', '2020-04-09',
 'ThermoFisher Direct', '2024-04-07', '2025-04-07', '2025-04-09', 'MediTeh Sarajevo d.o.o.'),

-- Laminarne komore (2 jedinice)
('Laminarna komora', 'Safe 2020', 'Thermo Fisher Scientific', 'TFS-S2020-001',
 'Biološka sigurnosna komora klase II, tip A2, zaštita operatora, uzorka i okoline od aerosola.',
 'available', 'Sala 1', '2021-12-05',
 'ThermoFisher Direct', '2024-12-03', '2025-12-03', '2026-12-05', 'MediTeh Sarajevo d.o.o.'),

('Laminarna komora', 'Microbiological Safety Cabinet MSC-Advantage', 'Thermo Fisher Scientific', 'TFS-MSCA-002',
 'MSC klase II tip A2 sa integriranim UV sistemom i HEPA filtracijom za sterilni rad sa kulturama.',
 'available', 'Sala 2', '2023-03-22',
 'ThermoFisher Direct', '2025-03-20', '2026-03-20', '2028-03-22', 'MediTeh Sarajevo d.o.o.'),

-- Hematološki analizatori (2 jedinice)
('Hematološki analizator', 'XN-1000', 'Sysmex', 'SYX-XN1000-001',
 'Automatski hematološki analizator, 29 parametara, 100 uzoraka/sat, SNCS tehnologija detekcije.',
 'available', 'Sala 1', '2022-02-28',
 'MediSupply Sarajevo', '2024-08-25', '2025-08-25', '2027-02-28', 'MediTeh Sarajevo d.o.o.'),

('Hematološki analizator', 'ABX Micros 60', 'Horiba Medical', 'HRB-M60-002',
 'Kompaktni hematološki analizator 18 parametara, 60 uzoraka/sat, idealan za manje laboratorije.',
 'available', 'Kabinet A', '2020-08-13',
 'Biomedica d.o.o.', '2024-08-10', '2025-08-10', '2025-08-13', 'BioServis d.o.o.'),

-- Mokraćni analizatori (2 jedinice)
('Analizator mokraće', 'Cobas u 411', 'Roche', 'RCH-CU411-001',
 'Automatski urinanalizator, 11 parametara reagentnih traka, 500 uzoraka/sat, za urinalni skrining.',
 'available', 'Sala 3', '2021-05-19',
 'Biomedica d.o.o.', '2024-11-16', '2025-11-16', '2026-05-19', 'MediTeh Sarajevo d.o.o.'),

('Analizator mokraće', 'DIRUI FUS-200', 'DIRUI', 'DRU-FUS200-002',
 'Automatski strip čitač mokraće, 11 parametara, 500 traka/sat, baza podataka 40.000 rezultata.',
 'available', 'Kabinet B', '2022-11-30',
 'MediSupply Sarajevo', '2024-11-28', '2025-11-28', '2027-11-30', 'LabMaintenance d.o.o.'),

-- Analizatori glukoze/elektrolita (2 jedinice)
('Analizator glukoze i laktata', 'YSI 2900D', 'YSI Life Sciences', 'YSI-2900D-001',
 'Enzimski bioanalitički sistem za precizno mjerenje glukoze, laktata, etanola i saharoze u uzorcima.',
 'available', 'Sala 2', '2021-09-14',
 'VWR International', '2024-09-11', '2025-09-11', '2026-09-14', 'BioServis d.o.o.'),

('Analizator elektrolita', 'OPTI CCA-TS2', 'Roche', 'RCH-CCTS2-002',
 'Point-of-care analizator kritičnih parametara: pH, pCO2, pO2, Na⁺, K⁺, Ca²⁺, Hct, glukoze.',
 'available', 'Sala 1', '2023-06-08',
 'Biomedica d.o.o.', '2025-06-06', '2026-06-06', '2028-06-08', 'MediTeh Sarajevo d.o.o.'),

-- Gasni hromatografi (2 jedinice)
('Gasni hromatograf', '7820A GC', 'Agilent Technologies', 'AGT-7820A-001',
 'Gasni hromatograf za rutinsku analizu organskih jedinjenja, FID i TCD detektori, EPC modul.',
 'available', 'Kabinet A', '2020-10-05',
 'Sigma-Aldrich BiH', '2024-10-03', '2025-10-03', '2025-10-05', 'BioServis d.o.o.'),

('Gasni hromatograf', 'TRACE 1310', 'Thermo Fisher Scientific', 'TFS-TR1310-002',
 'Modularni GC sistem sa do 3 injekciona porta i 2 detektora, PTV i split/splitless injektori.',
 'available', 'Kabinet B', '2022-07-25',
 'ThermoFisher Direct', '2024-07-23', '2025-07-23', '2027-07-25', 'MediTeh Sarajevo d.o.o.'),

-- HPLC sistemi (2 jedinice)
('HPLC sistem', 'Prominence UFLC', 'Shimadzu', 'SHM-UFLC-001',
 'Ultra-brzi tečni hromatograf za separaciju i kvantifikaciju lijekova, vitamina i peptida u uzorcima.',
 'available', 'Sala 2', '2021-04-28',
 'Sigma-Aldrich BiH', '2024-04-25', '2025-04-25', '2026-04-28', 'BioServis d.o.o.'),

('HPLC sistem', 'Agilent 1260 Infinity II', 'Agilent Technologies', 'AGT-1260-002',
 'Modularni HPLC sistem s binarnom pumpom, autosamplerom i DAD detektorom za farmaceutsku analizu.',
 'maintenance', 'Sala 3', '2019-11-12',
 'VWR International', '2024-11-10', '2025-11-10', '2024-11-12', 'LabMaintenance d.o.o.'),

-- Elektroforeza (2 jedinice)
('Elektroforezni sistem', 'Mini-PROTEAN Tetra Cell', 'Bio-Rad', 'BRD-MPT-001',
 'Sistem za vertikalnu gel elektroforezu proteina (PAGE), do 4 gela istovremeno, dielektrično polje.',
 'available', 'Kabinet A', '2022-08-16',
 'Sigma-Aldrich BiH', '2025-02-14', '2026-02-14', '2027-08-16', 'BioServis d.o.o.'),

('Elektroforezni sistem', 'Sub-Cell GT', 'Bio-Rad', 'BRD-SCGT-002',
 'Horizontalni sistem za agaroznu gel elektroforezu DNA/RNA fragmenata, do 96 uzoraka po gelu.',
 'available', 'Kabinet B', '2021-01-20',
 'Sigma-Aldrich BiH', '2024-07-18', '2025-07-18', '2026-01-20', 'BioServis d.o.o.'),

-- Zamrzivači -80°C (2 jedinice)
('Zamrzivač -80°C', 'MDF-U5386S', 'Panasonic', 'PNS-MDF5386-001',
 'Ultra-niskotemperaturni zamrzivač 500 L za dugoročno čuvanje bioloških uzoraka, enzima i reagenata.',
 'available', 'Hladna soba', '2020-05-30',
 'Biomedica d.o.o.', '2024-05-28', '2025-05-28', '2025-05-30', 'MediTeh Sarajevo d.o.o.'),

('Zamrzivač -80°C', 'VWR ULUF 390', 'VWR', 'VWR-ULUF390-002',
 'Ultra-niskotemperaturni zamrzivač 390 L, dvostruki kompresori, alarm temperatura za sigurnu pohranu.',
 'available', 'Hladna soba', '2022-12-14',
 'VWR International', '2024-12-12', '2025-12-12', '2027-12-14', 'MediTeh Sarajevo d.o.o.'),

-- Vodene kupelji (2 jedinice)
('Vodena kupelj', 'Polyscience AD15R-40', 'Polyscience', 'PLS-AD15R-001',
 'Refrigerovana cirkulacijska vodena kupelj za preciznu temperaturnu kontrolu od -40°C do 200°C.',
 'available', 'Sala 1', '2021-07-08',
 'VWR International', '2024-07-05', '2025-07-05', '2026-07-08', 'LabMaintenance d.o.o.'),

('Vodena kupelj', 'SW22', 'Julabo', 'JLB-SW22-002',
 'Vodena kupelj sa treskalicama, 22 L, temperatura 20–99°C, 3D kretanje za inkubaciju uzoraka.',
 'available', 'Sala 2', '2023-04-11',
 'LabTech BiH d.o.o.', '2025-04-09', '2026-04-09', '2028-04-11', 'LabMaintenance d.o.o.'),

-- Digestori (2 jedinice)
('Digestor', 'Sentry Pro', 'AirClean Systems', 'ACS-SP-001',
 'Sigurnosni digestor za rad sa hlapljivim hemikalijama i kiselinama, brzina zraka 0,5 m/s, 120 cm radna površina.',
 'available', 'Sala 3', '2020-11-02',
 'MediSupply Sarajevo', '2024-11-01', '2025-11-01', '2025-11-02', 'MediTeh Sarajevo d.o.o.'),

('Digestor', 'Delta Classic 1500', 'Waldner', 'WLD-DC1500-002',
 'Hemijski digestor sa varijabilnim protokom zraka, radna širina 150 cm, E-motor regulacija.',
 'available', 'Kabinet A', '2022-06-22',
 'LabTech BiH d.o.o.', '2024-06-20', '2025-06-20', '2027-06-22', 'LabMaintenance d.o.o.'),

-- Bioreaktori (2 jedinice)
('Bioreaktor', 'BIOSTAT B plus', 'Sartorius', 'SRT-BSTBP-001',
 'Stakleni bioreaktor 2–30 L za fermentaciju i ćelijsku kulturu, integrisana kontrola pH, DO i temperature.',
 'available', 'Sala 3', '2021-03-04',
 'Biomedica d.o.o.', '2024-03-02', '2025-03-02', '2026-03-04', 'BioServis d.o.o.'),

('Bioreaktor', 'Labfors 5', 'Infors HT', 'INF-LF5-002',
 'Kompaktni laboratorijski fermenter 0,5–3 L sa touchscreen kontrolerom i modulom za DO mjerenje.',
 'available', 'Sala 2', '2023-09-18',
 'VWR International', '2025-03-16', '2026-03-16', '2028-09-18', 'BioServis d.o.o.'),

-- Višekanalne pipete (3 jedinice)
('Višekanalna pipeta', 'Research Plus 8-channel', 'Eppendorf', 'EPP-RP8-001',
 '8-kanalna pipeta za 96-well ploče, volumen 10–300 µL, ergonomski dizajn za serijsko pipetiranje.',
 'available', 'Kabinet B', '2022-10-14',
 'Eppendorf SEE d.o.o.', '2025-04-12', '2026-04-12', '2027-10-14', 'BioServis d.o.o.'),

('Višekanalna pipeta', 'Voyager 12-channel', 'Integra Biosciences', 'ITG-VG12-002',
 '12-kanalna električna pipeta, volumen 5–125 µL, sa memorijom za 10 protokola aspiracije/dispenzije.',
 'available', 'Kabinet A', '2021-08-26',
 'LabTech BiH d.o.o.', '2024-08-24', '2025-08-24', '2026-08-26', 'LabMaintenance d.o.o.'),

('Višekanalna pipeta', 'VIAFLO 96', 'Integra Biosciences', 'ITG-VF96-003',
 '96-kanalni elektronski pipeter za potpuno punjenje i pražnjenje mikrotitre ploča, volumen 0,5–200 µL.',
 'available', 'Sala 1', '2023-11-06',
 'LabTech BiH d.o.o.', '2025-05-04', '2026-05-04', '2028-11-06', 'LabMaintenance d.o.o.'),

-- Hemostaza analizatori (2 jedinice)
('Hemostaza analizator', 'Sysmex CA-600', 'Sysmex', 'SYX-CA600-001',
 'Automatski koagulometar za mjerenje PT, APTT, Fbg, D-dimera i faktora zgrušavanja, 60 testa/sat.',
 'available', 'Sala 1', '2022-01-14',
 'MediSupply Sarajevo', '2024-07-12', '2025-07-12', '2027-01-14', 'MediTeh Sarajevo d.o.o.'),

('Hemostaza analizator', 'ACL TOP 500', 'Instrumentation Laboratory', 'ILB-AT500-002',
 'Potpuno automatizovani hemostaza analizator, 400 testova/sat, integrisan modul za optičke i mehaničke detekcije.',
 'available', 'Sala 2', '2020-06-28',
 'Biomedica d.o.o.', '2024-06-25', '2025-06-25', '2025-06-28', 'MediTeh Sarajevo d.o.o.'),

-- Rendgen difraktometri / specijalisti (2 jedinice)
('Fluorescencijski čitač', 'CLARIOstar Plus', 'BMG Labtech', 'BMG-CLSP-001',
 'Višemodalni mikroploča čitač — fluorescencija, TRF, luminescencija i FP, za high-throughput skrining.',
 'available', 'Kabinet B', '2022-05-17',
 'VWR International', '2024-11-15', '2025-11-15', '2027-05-17', 'BioServis d.o.o.'),

('Fluorescencijski čitač', 'Varioskan LUX', 'Thermo Fisher Scientific', 'TFS-VLUX-002',
 'Višemodalni fluorescencijski čitač sa monochromatskim monokromatorima za opseg 230–1000 nm.',
 'available', 'Sala 3', '2021-03-29',
 'ThermoFisher Direct', '2024-09-27', '2025-09-27', '2026-03-29', 'MediTeh Sarajevo d.o.o.'),

-- Imager western blot (2 jedinice)
('Western Blot imager', 'ChemiDoc MP', 'Bio-Rad', 'BRD-CDMP-001',
 'Sistem za snimanje hemiluminescencije, fluorescencije i vidljive boje za WB i gel dokumentaciju.',
 'available', 'Sala 1', '2022-07-12',
 'Sigma-Aldrich BiH', '2024-07-10', '2025-07-10', '2027-07-12', 'BioServis d.o.o.'),

('Western Blot imager', 'iBright FL1500', 'Invitrogen', 'INV-IBFL1500-002',
 'Imaging sistem za fluorescenciju i hemiluminescenciju, 4 kanala, rezolucija 26 MP, za Western Blot.',
 'available', 'Kabinet A', '2023-10-04',
 'ThermoFisher Direct', '2025-04-02', '2026-04-02', '2028-10-04', 'MediTeh Sarajevo d.o.o.'),

-- Flow citometri (2 jedinice)
('Flow citometar', 'FACSCanto II', 'BD Biosciences', 'BDB-FCII-001',
 'Flow citometar sa 2 lasera i 8 detekcijskih kanala za imunofenotipizaciju i staničnu analizu.',
 'available', 'Sala 2', '2021-02-06',
 'Biomedica d.o.o.', '2024-08-04', '2025-08-04', '2026-02-06', 'MediTeh Sarajevo d.o.o.'),

('Flow citometar', 'CytoFLEX S', 'Beckman Coulter', 'BCK-CFLS-002',
 'Kompaktni flow citometar sa do 13 boja i 4 lasera, za analizu staničnih površinskih markera.',
 'reserved', 'Sala 3', '2022-09-02',
 'VWR International', '2024-09-01', '2025-09-01', '2027-09-02', 'BioServis d.o.o.'),

-- Sonikatori (2 jedinice)
('Sonikator', 'Branson SFX550', 'Branson Ultrasonics', 'BRN-SFX550-001',
 'Ultrasonični homogenizator 550W za dezintegraciju ćelija, emulgifikaciju i otapanje uzoraka.',
 'available', 'Kabinet B', '2021-11-24',
 'LabTech BiH d.o.o.', '2024-11-22', '2025-11-22', '2026-11-24', 'LabMaintenance d.o.o.'),

('Sonikator', 'Hielscher UP200Ht', 'Hielscher', 'HLS-UP200HT-002',
 'Ručni ultrasonični procesor 200W za ćelijsku lizu i nano-čestice, titanova sonda 14 mm.',
 'available', 'Sala 1', '2023-04-15',
 'Sigma-Aldrich BiH', '2025-04-13', '2026-04-13', '2028-04-15', 'LabMaintenance d.o.o.'),

-- Liofilizator (1 jedinica)
('Liofilizator', 'Alpha 1-2 LDplus', 'Martin Christ', 'MCH-A12LD-001',
 'Benchtop liofilizator za sušenje zamrzavanjem bioloških uzoraka, lijekova i reagenata, kondenzator -55°C.',
 'available', 'Hladna soba', '2020-08-17',
 'Biomedica d.o.o.', '2024-08-15', '2025-08-15', '2025-08-17', 'MediTeh Sarajevo d.o.o.'),

-- Dispenzeri za reagense (2 jedinice)
('Automatski dispenzer', 'Repeater M4', 'Eppendorf', 'EPP-RM4-001',
 'Motorni repetirni dispenzer za precizno doziranje od 1 µL do 50 mL, kompatibilan sa Combitips plus.',
 'available', 'Kabinet A', '2022-02-08',
 'Eppendorf SEE d.o.o.', '2025-02-06', '2026-02-06', '2027-02-08', 'BioServis d.o.o.'),

('Automatski dispenzer', 'HandyStep Electronic', 'Brand', 'BRD-HSE-002',
 'Elektronski dispenzer za tečnosti, programabilni volumen 1 µL–50 mL, 8 brzinskih koraka.',
 'available', 'Kabinet B', '2021-12-19',
 'LabTech BiH d.o.o.', '2024-12-17', '2025-12-17', '2026-12-19', 'LabMaintenance d.o.o.'),

-- Aparat za destilaciju vode (2 jedinice)
('Aparat za destiliranu vodu', 'Milli-Q IQ 7000', 'Merck Millipore', 'MRK-MIIQ7-001',
 'Sistem za ultra-čistu vodu Tip 1, produkcija 1 L/min, TOC < 5 ppb, za HPLC i molekularne aplikacije.',
 'available', 'Sala 3', '2021-05-24',
 'Sigma-Aldrich BiH', '2024-11-22', '2025-11-22', '2026-05-24', 'MediTeh Sarajevo d.o.o.'),

('Aparat za destiliranu vodu', 'ELGA PURELAB Quest', 'ELGA LabWater', 'ELG-PLQST-002',
 'Sistem za pročišćavanje vode Tip 1/Tip 2, kombinovani RO i DI moduli, nadzor kvalitete u realnom vremenu.',
 'available', 'Kabinet B', '2023-07-31',
 'VWR International', '2025-07-29', '2026-07-29', '2028-07-31', 'LabMaintenance d.o.o.'),

-- Magnetne miješalice (2 jedinice)
('Magnetna miješalica', 'IKAMAG RCT Basic', 'IKA', 'IKA-RCTB-001',
 'Magnetna miješalica sa grijanjem do 340°C, snaga 15 L, digitalni prikaz temperature i brzine.',
 'available', 'Sala 1', '2022-04-08',
 'Sigma-Aldrich BiH', '2025-04-06', '2026-04-06', '2027-04-08', 'LabMaintenance d.o.o.'),

('Magnetna miješalica', 'SB162-3', 'Stuart', 'STR-SB162-002',
 'Kombinovana magnetna miješalica sa grijnom pločom, do 550°C, 3 L kapacitet, keramička ploča.',
 'available', 'Sala 2', '2020-10-20',
 'LabTech BiH d.o.o.', '2024-10-18', '2025-10-18', '2025-10-20', 'LabMaintenance d.o.o.'),

-- Rotacioni evaporator (1 jedinica)
('Rotacioni evaporator', 'Hei-VAP Advantage', 'Heidolph', 'HDL-HVADV-001',
 'Rotacioni evaporator za uklanjanje otapala, brzina rotacije 10–280 rpm, grijanje vodene kupelji do 95°C.',
 'available', 'Kabinet A', '2021-09-03',
 'Sigma-Aldrich BiH', '2024-09-01', '2025-09-01', '2026-09-03', 'BioServis d.o.o.'),

-- Automatski biohemijski analizator (2 jedinice)
('Biohemijski analizator', 'Cobas c 311', 'Roche', 'RCH-CBC311-001',
 'Automatski biohemijski analizator 400 testova/sat za rutinsku kliničku hemiju, ISE modul za elektrolite.',
 'available', 'Sala 1', '2022-03-14',
 'Biomedica d.o.o.', '2024-09-12', '2025-09-12', '2027-03-14', 'MediTeh Sarajevo d.o.o.'),

('Biohemijski analizator', 'Mindray BS-200', 'Mindray', 'MND-BS200-002',
 'Kompaktni biohemijski analizator 200 testova/sat, 45 pozicija za reagens, reflotron sistem.',
 'available', 'Sala 3', '2020-12-22',
 'MediSupply Sarajevo', '2024-12-20', '2025-12-20', '2025-12-22', 'MediTeh Sarajevo d.o.o.'),

-- Imunoanalizator (1 jedinica)
('Imunoanalizator', 'cobas e 411', 'Roche', 'RCH-CE411-001',
 'Elektrohemiluminescencijski imunoanalizator za hormonal, tumorske markere i kardiovaskularne parametre.',
 'available', 'Sala 2', '2021-07-26',
 'Biomedica d.o.o.', '2024-07-24', '2025-07-24', '2026-07-26', 'MediTeh Sarajevo d.o.o.'),

-- Kolorimetar (1 jedinica)
('Kolorimetar', 'DR 3900', 'Hach', 'HCH-DR3900-001',
 'Laboratorijski VIS spektrofotometar za analizu vode i hemikalija, 420 ugrađenih metoda, RFID tehnologija.',
 'available', 'Kabinet B', '2023-08-09',
 'Sigma-Aldrich BiH', '2025-02-07', '2026-02-07', '2028-08-09', 'LabMaintenance d.o.o.'),

-- Titrator (1 jedinica)
('Automatski titrator', '905 Titrando', 'Metrohm', 'MTR-905TD-001',
 'Automatski titrator za potenciometrijsku, Karl Fischer i fotometrijsku titraciju, DET i SET metode.',
 'available', 'Sala 3', '2020-02-15',
 'Sigma-Aldrich BiH', '2024-02-13', '2025-02-13', '2025-02-15', 'LabMaintenance d.o.o.'),

-- Elektroluminescencijski detektor (1 jedinica)
('Plinska stanica za detekciju', 'MultiRae Pro', 'RAE Systems', 'RAE-MRP-001',
 'Višegazni detektor za laboratorijsku sigurnost: CO, H2S, O2, VOC (PID), za nadgledanje hemijskog prostora.',
 'available', 'Sala 1', '2022-11-28',
 'MediSupply Sarajevo', '2024-11-26', '2025-11-26', '2027-11-28', 'MediTeh Sarajevo d.o.o.');
