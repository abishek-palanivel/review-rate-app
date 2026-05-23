# Review&amp;RATE

## Overview
**Review&amp;RATE** is a premium full‑stack MERN application that lets users discover, sort, and review companies. It features a stunning, glass‑morphism UI, dynamic star‑rating components, modal‑based CRUD, and responsive design for desktop and mobile.

---

## Demo
- **Frontend (Vercel)**: https://review-rate-app.vercel.app/
- **Backend (Render)**: https://review-rate-app.onrender.com/api

---

## Features
- Company list with search, city filter and multi‑criteria sorting (Name, Average Rating, Location).
- Company detail page that shows all reviews with sortable columns (Name, Date, Rating).
- Add‑Company and Add‑Review modals with smooth animations, validation, and automatic UI refresh.
- Interactive 5‑star rating input with hover effects and descriptive labels.
- Server‑side aggregation to compute `avgRating` and `reviewCount` per company.
- Fully responsive layout using custom CSS variables and a curated color palette.
- SEO‑friendly markup (semantic HTML, proper headings, meta tags via Vite.
- Secure production deployment: **Render** for the Node/Express API and **Vercel** for the React/Vite frontend.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, React Router DOM, Axios |
| Backend | Node.js, Express, Mongoose, MongoDB Atlas |
| Styling | Vanilla CSS with custom design tokens |
| Deployment | Render (API) & Vercel (Frontend) |

---

## Project Structure
```
/Zoronal
│   .gitignore
│   README.md
│
├─ client               # React Vite app
│   ├─ src
│   │   ├─ components   # Navbar, CompanyCard, ReviewCard, Modals
│   │   ├─ pages        # HomePage, CompanyDetailPage
│   │   ├─ api.js       # Axios instance (uses VITE_API_URL)
│   │   ├─ index.css    # Design system & styles
│   │   └─ main.jsx
│   └─ vite.config.js
│
└─ server               # Express API
    ├─ models          # Company.js, Review.js
    ├─ controllers     # companyController.js, reviewController.js
    ├─ routes          # companies.js (all routes under /api)
    ├─ seed.js         # Seed script with 4 companies + 3 reviews each
    ├─ .env            # MongoDB connection string (never committed)
    └─ server.js       # Express server, cors, json, DB connection
```

---

## Local Development
```bash
# Clone repo
git clone https://github.com/abishek-palanivel/review-rate-app.git
cd review-rate-app

# Backend (server)
cd server
cp .env.example .env   # add your MongoDB Atlas URI
npm install
node seed.js           # optional – populate demo data
npm start                # runs on http://localhost:5000

# Frontend (client)
cd ../client
npm install
npm run dev             # runs on http://localhost:5173
```
The frontend automatically reads `VITE_API_URL` from a `.env` file in the `client` folder or from Vercel environment variables.

---

## Production Deployment
### 1. MongoDB Atlas
- Create a cluster, add a database user, whitelist `0.0.0.0/0` (or Render IPs).
- Copy the connection string, e.g. `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/reviewrate?retryWrites=true&w=majority`.

### 2. Render (Backend)
1. Create a **Web Service**.
2. Set **Root Directory** to `server`.
3. Build command: `npm install`
4. Start command: `node server.js`
5. Environment variable:
   - `MONGO_URI` → *your Atlas connection string*
   - `PORT` → `5000`
6. Deploy – Render will expose `https://<service>.onrender.com`.

### 3. Vercel (Frontend)
1. Import the same GitHub repo.
2. Set **Root Directory** to `client`.
3. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://<render‑service>.onrender.com/api`
4. Deploy – Vercel builds the Vite bundle and serves it at a public URL.

---

## API Reference
All routes are prefixed with `/api`.
### Companies
- `GET /companies` – list, supports `search`, `city`, `sort` query params.
- `POST /companies` – create a new company.
- `GET /companies/:id` – single company with `avgRating` & `reviewCount`.
- `GET /companies/:id/reviews` – list reviews, `sort` query param.
- `POST /companies/:id/reviews` – add a review.

---

## Screenshots
*(Add screenshots of the navbar, company cards, modals, and detail page in the `docs/` folder for the readme.)*

---

## License
MIT © 2026 Abishek Palanivel

---

## Author & Contact
**Abishek Palanivel** – Full‑stack Engineer
- GitHub: https://github.com/abishek-palanivel
- Email: abishek.palanivel@example.com

Feel free to open issues or submit PRs for enhancements!
