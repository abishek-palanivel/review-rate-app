# Review&RATE 🌟

[![Live Demo](https://img.shields.io/badge/Live_Demo-Review%26RATE-7C3AED?style=for-the-badge&logo=vercel)](https://reviewrate-app.vercel.app/)

Review&RATE is a complete, full-stack MERN application that allows users to discover IT companies, view detailed ratings, and share their own reviews. Built with a focus on premium aesthetics and responsive design.

## ✨ Features
- **Company Directory:** View a list of IT companies with dynamically generated logos and average ratings.
- **Advanced Filtering & Sorting:** Filter companies by city or search by name. Sort companies by Name, Average Rating, or Location.
- **Detailed Company Pages:** View in-depth reviews for each company, with sorting options for Date, Name, and Rating.
- **Interactive Reviews:** Add reviews with a dynamic, interactive 5-star rating system (supports half-stars in display).
- **Custom Design:** Built without external UI libraries. Features a custom glassmorphism modal system, smooth transitions, and a vibrant color palette.
- **Responsive:** Fully optimized for both mobile and desktop screens.

## 🛠️ Tech Stack
**Frontend:**
- React.js (Vite)
- React Router DOM
- Axios
- Custom CSS (No Tailwind)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Aggregation pipelines for dynamic rating calculations

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/abishek-palanivel/reviewrate-app.git
cd reviewrate-app
```

### 2. Backend Setup
```bash
cd server
npm install
```
- The backend runs on port `5000` by default.
- Seed the database with sample companies and reviews:
```bash
npm run seed
```
- Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the client folder:
```bash
cd client
npm install
```
- The frontend runs on port `5173` strictly.
- Start the frontend development server:
```bash
npm run dev
```

## 📡 API Endpoints (Backend)
All API endpoints are prefixed with `/api`.
- `GET /companies` - Get all companies (Supports `?search=`, `?city=`, `?sort=`)
- `POST /companies` - Add a new company
- `GET /companies/:id` - Get single company details with `avgRating`
- `GET /companies/:id/reviews` - Get reviews for a company (Supports `?sort=`)
- `POST /companies/:id/reviews` - Submit a new review

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
