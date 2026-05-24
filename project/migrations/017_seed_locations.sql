INSERT INTO locations (name, description) VALUES
  ('Laboratorij A', 'Hemijska analiza i sinteza — vaga, digestor, rotovapor'),
  ('Laboratorij B', 'Mikrobiologijski laboratorij — inkubatori, laminar, autoklav'),
  ('Sala za mikroskopiju', 'Optička, fluorescentna i elektronska mikroskopija'),
  ('Instrumentalna soba', 'HPLC, GC-MS, NMR, FTIR i spektrofotometri'),
  ('PCR soba', 'Molekularno-biološke analize — PCR, elektroforeza, gel dokumentacija'),
  ('Sala za kulturu ćelija', 'Sterilni rad s ćelijskim kulturama — CO₂ inkubator, biološki sigurnosni kabinet'),
  ('Hladna soba', 'Pohrana reagensa i uzoraka pri 4°C'),
  ('Skladište opreme', 'Neaktivna, rezervna i oprema na čekanju servisa')
ON CONFLICT (name) DO NOTHING;
