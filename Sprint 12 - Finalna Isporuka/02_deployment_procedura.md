# Deployment Procedura — LabManager

**Aplikacija:** LabManager (Sistem za upravljanje medicinskom laboratorijskom opremom)  
**Verzija:** 1.0.0 (Sprint 12)  
**Datum:** Juni 2026

---

## 1. Naziv i arhitektura

**LabManager** je three-tier web aplikacija:

```
Browser (React SPA)
      ↓ HTTPS REST API
Express.js API (Node.js)
      ↓ SQL
PostgreSQL (Supabase hosted)
```

Tri odvojena servisa:
- **Frontend** — React/Vite SPA, deployan na Vercel
- **Backend** — Node.js/Express API, deployan na Vercel (serverless)
- **Baza podataka** — PostgreSQL 15, hostovana na Supabase (cloud)

---

## 2. Tehnologije

| Sloj | Tehnologija | Verzija |
|---|---|---|
| Frontend | React | 18.x |
| Frontend bundler | Vite | 5.x |
| Frontend routing | React Router DOM | 6.x |
| Frontend HTTP | Axios | 1.x |
| Frontend charts | Recharts | 3.8.1 |
| Frontend QR | react-qr-code | latest |
| Backend runtime | Node.js | 18+ |
| Backend framework | Express.js | 4.19.2 |
| Autentifikacija | JSON Web Token (jsonwebtoken) | 9.0.2 |
| Lozinke | bcrypt | 5.1.1 |
| Baza | PostgreSQL | 15 (Supabase) |
| DB driver | pg (node-postgres) | 8.12.0 |
| Testiranje | Jest + Supertest | 29.7.0 |
| Deployment | Vercel | — |

---

## 3. Potrebni alati i verzije

Za **lokalni razvoj**:
- Node.js 18 ili noviji (`node --version`)
- npm 9+ (dolazi s Node.js)
- Git

Za **pristup bazi** (Supabase — cloud):
- Pristup Supabase projektu (pitati voditelja tima `oalispahic` za `.env` podatke)
- Alternativa: pokrenuti vlastiti PostgreSQL 14+ lokalno

Opcionalno:
- Postman ili curl za testiranje API-ja
- psql CLI (alternativno, Supabase SQL Editor)

---

## 4. Environment varijable

### Backend (`.env` u `project/backend/`)

Kopiraj iz `.env.example` i popuni:

```env
# Baza podataka (Supabase connection pooler)
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=5432
DB_USER=postgres.<supabase_project_ref>
DB_PASSWORD=<lozinka_iz_supabase>
DB_NAME=postgres

# JWT konfiguracija
JWT_SECRET=<min_32_karaktera_random_string>
JWT_EXPIRES_IN=8h

# Server
PORT=3001

# CORS
FRONTEND_URL=http://localhost:5173
```

**Važno:** `.env` fajl se nikad ne commituje u git. Svako ga kreira lokalno.  
**Produkcija:** Environment varijable se postavljaju u Vercel Dashboard → Project Settings → Environment Variables.

### Frontend

Frontend nema `.env` fajl za lokalni razvoj. Vite automatski proxy-ira `/api/*` na `http://localhost:3001`.  
Za produkciju, `project/frontend/vercel.json` sadrži URL rewrite koji usmjerava `/api/*` na backend Vercel URL.

---

## 5. Lokalno pokretanje — Backend

```bash
# 1. Idi u backend direktorij
cd project/backend

# 2. Kopiraj .env.example u .env i popuni podatke
cp .env.example .env
# Uredi .env s podacima od voditelja tima

# 3. Instaliraj dependencies
npm install

# 4. Pokreni backend u development modu (auto-restart pri promjeni)
npm run dev
# Server sluša na http://localhost:3001

# Provjera da radi:
curl http://localhost:3001/api/health
# Treba vratiti: {"status":"ok"}
```

---

## 6. Lokalno pokretanje — Frontend

```bash
# 1. Idi u frontend direktorij
cd project/frontend

# 2. Instaliraj dependencies
npm install

# 3. Pokreni frontend development server
npm run dev
# Dostupno na http://localhost:5173

# Vite automatski proxira /api/* na http://localhost:3001
# (konfiguracija u vite.config.js)
```

Aplikacija je dostupna na `http://localhost:5173`. Backend mora biti pokrenut za sve API pozive.

---

## 7. Pokretanje baze

Sistem koristi Supabase (cloud PostgreSQL) — ne treba instalirati PostgreSQL lokalno.

Alternativa za potpuno lokalni setup:
```bash
# Instaliraj PostgreSQL 14+
brew install postgresql  # macOS
# ili: sudo apt-get install postgresql  # Ubuntu

# Kreiraj bazu
createdb labmanager_local

# Ažuriraj .env:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=
# DB_NAME=labmanager_local
```

---

## 8. Migracije i seed podaci

### Pokretanje migracija

Migracije su u `project/migrations/` (fajlovi `001_*.sql` do `021_*.sql`).

**Metoda 1 — Node.js skripta** (preporučeno, psql nije potreban):
```bash
cd project/backend

# Kreiraj privremeni migracijski skript:
node -e "
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});
const migrationsDir = path.join(__dirname, '../../migrations');
const files = fs.readdirSync(migrationsDir).sort();
(async () => {
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log('Running:', file);
    await pool.query(sql);
  }
  console.log('Done!');
  await pool.end();
})();
"
```

**Metoda 2 — psql CLI**:
```bash
# Pokretanje svih migracija sekvencijalno
for f in project/migrations/*.sql; do psql $DATABASE_URL -f "$f"; done
```

**Metoda 3 — Supabase SQL Editor**:
Kopiraj sadržaj svakog `.sql` fajla (abecednim redom) u Supabase Dashboard → SQL Editor.

### Seed podaci

Seed podaci su uključeni u migraciju `004_seed_equipment.sql` — 60+ laboratorijskih aparata uključujući mikroskope, centrifuge, PCR aparate, spektrofotometre i dr.

Korisnici se kreiraju kroz `/register` endpoint ili ručno:
```bash
# Primjer: kreiranje admin korisnika (nakon pokretanja backenda)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin2","password":"admin123"}'

# Promijeniti rolu na admin direktno u bazi:
# UPDATE users SET role = 'admin' WHERE username = 'admin2';
```

**Testni korisnici za Supabase produkcijsku bazu:**
- Admin: `admin2` / `admin123`
- Laborant: `korisnik1` / `korisnik123`

---

## 9. Pokretanje testova

```bash
cd project/backend

# Pokretanje svih testova
npm test

# Pokretanje s coverage izvještajem
npm run test:coverage

# Pokretanje jednog test fajla
npx jest tests/auth.service.test.js

# Pokretanje s verbose outputom
npx jest --verbose
```

Testovi ne zahtijevaju aktivnu bazu — koriste mock `pg` connection.

Za frontend (ako su testovi dodani):
```bash
cd project/frontend
npm test
```

---

## 10. Produkcijski deployment (Vercel)

### Automatski deployment

Svaki push na `main` granu automatski triggeruje Vercel deployment (konfiguracija u `vercel.json`).

**Backend Vercel konfiguracija** (`project/backend/vercel.json`):
```json
{
  "version": 2,
  "builds": [{ "src": "src/app.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/app.js" }]
}
```

**Frontend Vercel konfiguracija** (`project/frontend/vercel.json`):
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://nrs-grupa3.vercel.app/api/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Ručni deployment (Vercel CLI)

```bash
# Instaliraj Vercel CLI
npm install -g vercel

# Backend
cd project/backend
vercel --prod

# Frontend
cd project/frontend
vercel --prod
```

### Environment varijable na Vercelu

Postavljaju se u Vercel Dashboard → Project Settings → Environment Variables:

```
DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
JWT_SECRET, JWT_EXPIRES_IN
PORT, FRONTEND_URL
```

**Važno:** `JWT_EXPIRES_IN` mora biti validan format (`8h`, `15m`, `86400`). Prazan string uzrokuje grešku pri loginu.

---

## 11. Link na produkcijski deployment

| Servis | URL |
|---|---|
| **Frontend** | https://nrs.marexdev.com/ |
| **Backend health check** | https://api.nrs.marexdev.com/api/health |
| **Backend API** | https://api.nrs.marexdev.com/api/ |

---

## 12. Poznata ograničenja deploymenta

- **Vercel serverless nema persistent connections** — WebSocket nije moguć; messaging koristi polling.
- **Supabase free tier ima connection limit** — Backend koristi connection pool s `max: 1` da bi ostao u limitima.
- **Cold starts** — Vercel serverless funkcija se "uspava" nakon perioda neaktivnosti; prvi request može potrajati 1-3s.
- **Supabase free tier** — 500MB storage, 50.000 DB operacija/dan. Sistem nema automatsko čišćenje starih logova.
- **PDF eksport** — Koristi `window.print()` (browser print dialog), ne server-side PDF generisanje.
- **Email notifikacije** — Nisu implementirane; sve notifikacije su in-app.

---

## 13. Česti problemi pri pokretanju i rješenja

### Problem: `Cannot find module 'pg'`
```bash
cd project/backend && npm install
```

### Problem: `Error: getaddrinfo ENOTFOUND aws-0-eu-west-1...`
Backend ne može se spojiti na Supabase. Provjeri:
1. Je li `.env` popunjen ispravno
2. Je li Internet konekcija aktivna
3. Je li Supabase projekt aktivan (free tier pauzira neaktivne projekte)

### Problem: `"expiresIn" should be a number`
`JWT_EXPIRES_IN` u `.env` ili na Vercelu ima nevažeću vrijednost. Postavi na `8h`.

### Problem: `Unexpected end of JSON input` pri loginu (produkcija)
Frontend šalje API pozive na pogrešan URL. Provjeri `vercel.json` rewrite na frontend projektu.

### Problem: Port 3001 je zauzet
```bash
lsof -i :3001  # Find process
kill -9 <PID>
```

### Problem: Migracija puca s "column already exists"
Sve migracije koriste `IF NOT EXISTS` — bezbezbedno je pokrenuti ih više puta. Ako problem i dalje postoji, provjeri sql grešku ručno.
