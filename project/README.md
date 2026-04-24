# NRS-Grupa3 — Medical Laboratory Equipment Management System

Full-stack aplikacija: Node.js/Express backend + React/Vite frontend, PostgreSQL baza podataka.

## Preduslovi

- Node.js 18+
- PostgreSQL baza podataka ([Neon](https://neon.tech) ili [Supabase](https://supabase.com) — besplatni tier je dovoljan)

---

## 1. Setup baze podataka

1. Kreirati besplatnu bazu na [neon.tech](https://neon.tech) ili [supabase.com](https://supabase.com)
2. Kopirati connection string (format: `postgresql://user:pass@host/db?sslmode=require`)
3. Pokrenuti migraciju:
   - Otvoriti SQL editor u Neon/Supabase dashboardu
   - Zalijepiti i izvršiti sadržaj fajla `migrations/001_initial_schema.sql`

---

## 2. Backend — lokalni razvoj

```bash
cd project/backend
cp .env.example .env
# Urediti .env: postaviti DATABASE_URL i JWT_SECRET
npm install
npm run dev
# Server sluša na http://localhost:3001
```

Provjera: `curl http://localhost:3001/api/health`

---

## 3. Frontend — lokalni razvoj

```bash
cd project/frontend
npm install
npm run dev
# Aplikacija dostupna na http://localhost:5173
```

Vite dev server automatski proxira `/api/*` zahtjeve na `http://localhost:3001`.

---

## 4. Deploy na Vercel

### Backend

1. Push repozitorij na GitHub
2. Otvoriti [vercel.com](https://vercel.com) → New Project → importovati repo
3. Postaviti **Root Directory** na `project/backend`
4. Dodati environment varijable:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN` (npr. `15m`)
   - `FRONTEND_URL` (URL deployovanog frontenda)
5. Deploy

### Frontend

1. Vercel → New Project → importovati isti repo
2. Postaviti **Root Directory** na `project/frontend`
3. Dodati environment varijablu: `VITE_API_URL=https://your-backend.vercel.app`
4. Deploy

> Napomena: Deplouj backend prvi, pa onda frontend kako bi imao URL za `VITE_API_URL`.

---

## API Endpointi

| Metoda | Putanja                  | Auth       | Opis                        |
|--------|--------------------------|------------|-----------------------------|
| GET    | /api/health              | —          | Health check                |
| POST   | /api/auth/register       | —          | Registracija novog korisnika|
| POST   | /api/auth/login          | —          | Login, vraća JWT token      |
| GET    | /api/equipment           | —          | Lista sve opreme            |
| GET    | /api/equipment/:id       | —          | Detalji opreme              |
| POST   | /api/equipment           | Admin JWT  | Dodaj novu opremu           |
| DELETE | /api/equipment/:id       | Admin JWT  | Obriši opremu               |
| POST   | /api/reservations        | JWT        | Kreiraj rezervaciju         |
| GET    | /api/reservations/my     | JWT        | Moje rezervacije            |

### Autentifikacija

Za zaštićene endpointe slati JWT token u headeru:

```
Authorization: Bearer <token>
```

Token se dobija putem `POST /api/auth/login`.

---

## Arhitektura

Backend koristi **Controller → Service → Repository** pattern:

- **Controller** — prima HTTP request, poziva service, vraća response
- **Service** — business logika i validacija
- **Repository** — SQL upiti, direktan pristup bazi

Greške se propagiraju kroz `next(err)` prema centralnom `errorHandler` middlewareu.
