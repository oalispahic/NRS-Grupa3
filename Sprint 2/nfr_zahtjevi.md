# Nefunkcionalni zahtjevi (NFR Zahtjevi) 

Kako već znamo Product Backlog definiše šta aplikacija radi (npr. rezervacija opreme), NFR definišu kvalitet i sigurnost tih operacija. Prošli sprint smo proširili temu na "Sistem za upravljanje medicinskom laboratorijskom opremom" i samim tim kako se radi o medicinskom sistemu, ovi zahtjevi su rigorozniji kako bi se održao integritet laboratorijskih nalaza, jer mala greška sigurnosti operacija može biti kobna za zdravlje pacijenta. <br>


## Tabela detaljnih nefunkcionalnih zahtjeva 

| ID | Kategorija | Opis zahtjeva | Metoda provjere (Verifikacija) | Prioritet | Povezanost / Napomena |
|:---------- |:---|:---|:---|:---|:---|
| **NFR-01** | Sigurnost | Svi podaci o pacijentima i rezultatima (PB2, PB6) moraju biti kriptovani u mirovanju (**AES-256**) i u tranzitu (**TLS 1.3**). | Skeniranje mrežnog saobraćaja (Wireshark) i audit baze podataka. | **Kritičan** | Osnova za medicinsku povjerljivost. |
| **NFR-02** | Autentifikacija | Pristup sistemu (PB9-PB20) zahtijeva kompleksne lozinke i automatski **session timeout** nakon 15 minuta neaktivnosti. | Ručno testiranje sesije i provjera politike lozinki u kodu. | **Visok** | Sprečava neovlašteni uvid na javnim PC-ovima. |
| **NFR-03** | Dostupnost | Sistem mora biti dostupan **99.9%** vremena. Za stavke poput PB3 i PB6, zastoj ne smije biti duži od 5 min. | Monitoring servera (npr. UptimeRobot) tokom 30 dana. | **Visok** | Medicinske dežure zahtijevaju 24/7 pristup. |
| **NFR-04** | Performanse | Pretraga opreme (PB9, PB10) mora vratiti rezultate za manje od **1.5s** pri bazi od 5,000 stavki. | Load testing (JMeter) sa 50 istovremenih korisnika. | **Srednji** | Brzina rada direktno utiče na izdavanje nalaza. |
| **NFR-05** | Integritet | Svaka promjena statusa (PB7) ili odobrenje (PB6) mora biti trajno zabilježena u **Audit Log** tabeli. | Provjera baze podataka nakon svake administrativne akcije. | **Kritičan** | Neophodno za akreditaciju i pravnu odgovornost. |
| **NFR-06** | Pouzdanost | **RTO** (Recovery Time Objective) manji od 2 sata uz povrat svih podataka (PB4, PB12). | Simulacija kvara i proces vraćanja podataka iz backup-a. | **Visok** | Gubitak podataka uzrokuje zastoj laboratorije. |
| **NFR-07** | Responzivnost | Interfejs kalendara (PB8) mora biti prilagođen za **tablet uređaje** (responsive design). | Testiranje na uređajima različitih rezolucija (Chrome DevTools). | **Srednji** | Laboranti koriste tablete uz medicinske uređaje. |
| **NFR-08** | Skalabilnost | Sistem mora podržati pohranu do **50,000** historijskih rezervacija (PB4) bez pada performansi. | Analiza SQL upita (Explain plan) na velikim setovima podataka. | **Nizak** | Bitno za praćenje životnog vijeka opreme. |
