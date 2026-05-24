INSERT INTO consumables (name, unit, quantity, low_stock_threshold, notes) VALUES
  ('Etanol 96%', 'ml', 2500, 500, 'Pohraniti na tamnom i hladnom mjestu. Zapaljivo.'),
  ('Destilirana voda', 'L', 20, 5, 'Koristiti samo za analitičke procedure.'),
  ('Latex rukavice M', 'kom', 150, 50, NULL),
  ('Latex rukavice L', 'kom', 45, 30, NULL),
  ('Zaštitne naočale', 'kom', 8, 10, NULL),
  ('Petri šolje (plastične)', 'kom', 300, 100, 'Sterilne, jednokratne.'),
  ('Eppendorf tubice 1.5ml', 'kom', 500, 100, NULL),
  ('Eppendorf tubice 2.0ml', 'kom', 60, 50, NULL),
  ('NaCl (natrijev klorid)', 'g', 1000, 200, 'Analitička čistoća (p.a.).'),
  ('HCl 37% (klorovodična kiselina)', 'ml', 80, 100, 'Korozivno. Rad isključivo u digestoru.'),
  ('NaOH granule', 'g', 300, 100, 'Korozivno. Nositi zaštitne rukavice i naočale.'),
  ('PBS pufer (1x)', 'ml', 1000, 250, 'Pohraniti na 4°C.'),
  ('Agar (mikrobiologijski)', 'g', 200, 50, 'Pohraniti na suhom i tamnom mjestu.'),
  ('Sterilne šprice 5ml', 'kom', 40, 20, NULL),
  ('Filter papir (kvantitativni)', 'kom', 100, 30, NULL)
ON CONFLICT DO NOTHING;
