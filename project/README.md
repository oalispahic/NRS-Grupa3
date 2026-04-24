# NRS-Grupa3 — Medical Laboratory Equipment Management System

Full-stack aplikacija: Node.js/Express backend + React/Vite frontend, PostgreSQL baza podataka.

---

## Produkcijski URL-ovi

| Servis   | URL |
|----------|-----|
| Frontend | https://nrs.marexdev.com/        |
| Backend  | https://api.nrs.marexdev.com/    |

> Frontend je React aplikacija koju korisnici otvaraju u browseru.
> Backend je Express API — ne otvara se u browseru, koristi se za API pozive.
> `/api/health` na backend URL-u treba vraćati `{"status":"ok"}`.

---

## Struktura projekta

```
project/
├── migrations/          # SQL migracije za bazu podataka
├── backend/             # Node.js/Express API server
└── frontend/            # React/Vite aplikacija
```

---

## Lokalni razvoj

### Preduslovi

- Node.js 18+
- Pristup Supabase projektu (pitaj voditelja tima za `.env` podatke)

### 1. Backend

```bash
cd project/backend
cp .env.example .env
# Popuniti .env sa podacima od voditelja tima
npm install
npm run dev
# Server sluša na http://localhost:3001
```

Provjera da radi: `curl http://localhost:3001/api/health` → treba vratiti `{"status":"ok"}`

### 2. Frontend

```bash
cd project/frontend
npm install
npm run dev
# Aplikacija dostupna na http://localhost:5173
```

Vite automatski proxira `/api/*` pozive na `http://localhost:3001` tokom lokalnog razvoja — nije potrebno ništa dodatno konfigurirati.

### .env fajl

Kopiraj `.env.example` u `.env` i popuni vrijednosti:

```
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=5432
DB_USER=postgres.<project_ref>
DB_PASSWORD=<lozinka>
DB_NAME=postgres

JWT_SECRET=<tajni_kljuc>
JWT_EXPIRES_IN=15m
PORT=3001
FRONTEND_URL=http://localhost:5173
```

> `.env` se nikad ne commituje u git. Sadrži tajne podatke i svako ga kreira lokalno.

---

## Git workflow

Radimo po feature branchevima:

```bash
# 1. Kreirati branch za svoju funkcionalnost
git checkout -b feature/naziv-featurea

# 2. Raditi na kodu, commitovati
git add .
git commit -m "Kratak opis promjene"

# 3. Pushati branch
git push origin feature/naziv-featurea

# 4. Otvoriti Pull Request na GitHubu prema main branchu
```

### Automatski deployment

| Akcija | Rezultat |
|--------|----------|
| Push na bilo koji branch / otvaranje PR-a | Vercel kreira **preview deployment** sa privremenim URL-om |
| Merge PR-a u `main` | Vercel automatski deploya na **produkciju** |

Preview deployment URL se pojavljuje direktno u PR-u na GitHubu kao komentar od Vercel bota — možeš testirati promjene prije mergea u main.

---

## API Endpointi

Base URL (produkcija): `https://www.api.nrs.marexdev.com/`

Base URL (lokalno): `http://localhost:3001`

| Metoda | Putanja                 | Auth       | Opis                         |
|--------|-------------------------|------------|------------------------------|
| GET    | /api/health             | —          | Health check                 |
| POST   | /api/auth/register      | —          | Registracija novog korisnika |
| POST   | /api/auth/login         | —          | Login, vraća JWT token       |
| GET    | /api/equipment          | —          | Lista sve opreme             |
| GET    | /api/equipment/:id      | —          | Detalji opreme               |
| POST   | /api/equipment          | Admin JWT  | Dodaj novu opremu            |
| DELETE | /api/equipment/:id      | Admin JWT  | Obriši opremu                |
| POST   | /api/reservations       | JWT        | Kreiraj rezervaciju          |
| GET    | /api/reservations/my    | JWT        | Moje rezervacije             |

### Autentifikacija

Zaštićeni endpointi zahtijevaju JWT token u headeru:

```
Authorization: Bearer <token>
```

Token se dobija putem `POST /api/auth/login`. Admin rola je potrebna za upravljanje opremom.

---

## Arhitektura backenda

Pattern: **Controller → Service → Repository**

| Sloj       | Odgovornost                                  |
|------------|----------------------------------------------|
| Controller | Prima HTTP request, poziva service, vraća response |
| Service    | Business logika i validacija                 |
| Repository | SQL upiti, direktan pristup bazi             |

Greške se propagiraju kroz `next(err)` prema centralnom `errorHandler` middlewareu.

---

## Baza podataka

Tabele: `users`, `equipment`, `reservations`

