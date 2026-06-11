# Continuous Deployment Pipeline — LabManager

**Projekat:** LabManager  
**CD sistem:** Vercel automatski deployment + GitHub Actions health check  
**Verzija dokumenta:** 1.0 (Sprint 12)

---

## Pregled

LabManager koristi **Vercel Platform CD** koji automatski deploya svaki push na `main` granu. Pored toga, postoji GitHub Actions workflow koji provjerava zdravlje deployment-a nakon svakog push-a.

---

## 1. Vercel automatski deployment (primarni CD)

### Gdje se nalazi

Konfiguracija je u repozitoriju na dvije lokacije:
- `project/backend/vercel.json` — backend build i routing konfiguracija
- `project/frontend/vercel.json` — frontend build i URL rewrite pravila

### Kako radi

```
git push origin main
       ↓
Vercel detektuje push
       ↓
┌─────────────────────────────────────┐
│  Backend build (project/backend/)   │
│  - npm install                      │
│  - node -c src/server.js (syntax)   │
│  - Deploy kao serverless function   │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  Frontend build (project/frontend/) │
│  - npm install                      │
│  - npm run build (vite build)       │
│  - Deploy statičke fajlove na CDN   │
└─────────────────────────────────────┘
       ↓
Frontend → Backend veza kroz vercel.json rewrite
```

### Backend vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/app.js"
    }
  ]
}
```

### Frontend vercel.json

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://nrs-grupa3.vercel.app/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Šta se deploya:** Svaki push na `main` granu deploya i backend i frontend.  
**Gdje se može provjeriti:** Vercel Dashboard → Project → Deployments

---

## 2. GitHub Actions Health Check Workflow

### Lokacija skripte

```
.github/workflows/health-check.yml
```

### Sadržaj workflow fajla

```yaml
name: Post-Deployment Health Check

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Wait for Vercel deployment
        run: sleep 60

      - name: Check backend health
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" \
            https://api.nrs.marexdev.com/api/health)
          if [ "$response" != "200" ]; then
            echo "Backend health check failed: HTTP $response"
            exit 1
          fi
          echo "Backend OK: HTTP $response"

      - name: Check frontend availability
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" \
            https://nrs.marexdev.com/)
          if [ "$response" != "200" ]; then
            echo "Frontend check failed: HTTP $response"
            exit 1
          fi
          echo "Frontend OK: HTTP $response"

      - name: Verify API login endpoint
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" \
            -X POST https://api.nrs.marexdev.com/api/auth/login \
            -H "Content-Type: application/json" \
            -d '{"username":"__healthcheck__","password":"__invalid__"}')
          # Očekujemo 401 (endpoint radi, credentials su neispravni)
          if [ "$response" != "401" ] && [ "$response" != "400" ]; then
            echo "Login endpoint unexpected status: HTTP $response"
            exit 1
          fi
          echo "Login endpoint reachable: HTTP $response"

      - name: Deployment summary
        if: always()
        run: |
          echo "=== Deployment Health Check Summary ==="
          echo "Backend: https://api.nrs.marexdev.com"
          echo "Frontend: https://nrs.marexdev.com"
          echo "Timestamp: $(date -u)"
```

### Napomena za kreiranje workflow fajla

Ako `.github/workflows/` direktorij ne postoji u repozitoriju, kreiraj ga:

```bash
mkdir -p .github/workflows
# Kopiraj sadržaj gore u .github/workflows/health-check.yml
git add .github/workflows/health-check.yml
git commit -m "ci: add post-deployment health check workflow"
git push origin main
```

---

## 3. Preduvjeti

| Preduvjet | Kako provjeriti |
|---|---|
| Vercel projekti konfigurirani | Vercel Dashboard — oba projekta (`nrs-grupo3-backend`, `nrs-grupo3-frontend`) su linked na GitHub |
| Environment varijable postavljene | Vercel Dashboard → Project Settings → Environment Variables |
| GitHub Actions dozvole | Repository Settings → Actions → Enable |
| `main` grana zaštićena | Opcjonalno: Settings → Branches → Require status checks |

---

## 4. Varijable i secrets

### Vercel (environment varijable — nije GitHub Secrets)

Postavljaju se u Vercel Dashboard za svaki projekt posebno:

```
DB_HOST          — Supabase PostgreSQL host
DB_PORT          — 5432
DB_USER          — postgres.<project_ref>
DB_PASSWORD      — (Supabase lozinka)
DB_NAME          — postgres
JWT_SECRET       — (min 32 karaktera random string)
JWT_EXPIRES_IN   — 8h
PORT             — 3001
FRONTEND_URL     — https://nrs.marexdev.com
```

### GitHub Actions Secrets (opcionalno)

Health check workflow koristi samo javno dostupne URL-ove, pa nema potrebe za secrets. Ako se dodaju privatni health check endpointi, kreirati:
- `VERCEL_TOKEN` — za Vercel API provjere
- `HEALTH_CHECK_TOKEN` — za protected health endpoint

---

## 5. Šta se tačno deploya

| Deployment | Šta se deploya |
|---|---|
| Backend | `project/backend/src/` — Express API kao Vercel serverless function; `src/app.js` kao entrypoint |
| Frontend | `project/frontend/src/` + `index.html` — Vite build output (statički fajlovi na Vercel CDN) |
| Baza podataka | **Ne deploya se automatski** — Supabase cloud baza je odvojena; migracije se pokreću ručno |

---

## 6. Kako pokrenuti deployment ručno

```bash
# Instalacija Vercel CLI
npm install -g vercel
vercel login

# Backend deployment
cd project/backend
vercel --prod

# Frontend deployment
cd project/frontend
vercel --prod
```

Alternativno, workflow se može pokrenuti ručno:
GitHub → Actions → "Post-Deployment Health Check" → "Run workflow"

---

## 7. Gdje provjeriti rezultat deploymenta

| Provjera | Lokacija |
|---|---|
| Build status | https://vercel.com/dashboard (Deployments tab) |
| Backend health | https://api.nrs.marexdev.com/api/health |
| Frontend dostupnost | https://nrs.marexdev.com/ |
| GitHub Actions log | GitHub → Actions → "Post-Deployment Health Check" |
| Runtime logs | Vercel Dashboard → Project → Functions → Logs |

---

## 8. Ručni koraci koji nisu automatizovani

Sljedeći koraci su ručni i moraju biti dokumentovani:

| Korak | Zašto je ručni | Kako se izvodi |
|---|---|---|
| SQL migracije | Vercel ne može pokretati SQL na Supabase automatski | `node run_migrations.js` iz `project/backend/` — vidjeti `02_deployment_procedura.md` |
| Kreiranje admin korisnika | Nema seed skripta za korisnike iz sigurnosnih razloga | `POST /api/auth/register` + SQL `UPDATE users SET role='admin'` |
| Vercel env varijable | Moraju biti ručno postavljene u Vercel Dashboard | Vercel Dashboard → Project Settings → Environment Variables |
| Ažuriranje backend URL-a u `frontend/vercel.json` | Ako se backend URL promijeni, `vercel.json` rewrite se mora ažurirati ručno | Uredi `destination` u `project/frontend/vercel.json` |

---

## 9. Rollback procedura

```bash
# Vercel automatski čuva prethodni deployment
# Rollback kroz Vercel Dashboard:
# Deployments → odaberi prethodni deployment → "Promote to Production"

# Ili kroz CLI:
vercel rollback --yes
```
