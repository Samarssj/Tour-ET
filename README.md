# 🌍 Tour ET : Explore Ethiopia

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue.svg" alt="MERN Stack">
  <img src="https://img.shields.io/badge/Deployed-Render-brightgreen.svg" alt="Deployed on Render">
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-green.svg" alt="Database MongoDB Atlas">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License MIT">
</p>

**Tour ET** is a premium, full-stack travel platform designed to showcase the majestic beauty of Ethiopia. From the ancient rock-hewn churches of Lalibela to the dramatic Simien Mountains, this application offers an immersive discovery and booking experience.

---

## 🚀 Tech Stack

### Frontend
<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Lucide_Icons-2563EB?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide Icons">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

### Backend & Database
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT">
</p>

---

## ✨ Premium Features

### 🌙 Adaptive Dark Mode
A fully integrated dark mode system that ensures 100% readability and a modern aesthetic across all pages.

### 🗺️ Interactive Discovery
Clickable exploration cards and discovery modals that provide in-depth historical and cultural context for Ethiopia's top destinations.

### 🏨 Advanced Booking System
Real-time price calculation, multi-room selection (Single, Double, Suite), and a secure checkout flow with local payment integrations (Telebirr, CBE Birr).

---

## 📸 UI Preview

### 🏠 Home Page & Discovery
Discover the heart of Ethiopia with our modern, animated interface.
<p align="center">
  <img src="./screenshots/home.jpg" width="800" alt="Home Page">
</p>

### 🌓 Dark Mode Experience
Optimized for low-light environments with high-contrast typography.
<p align="center">
  <img src="./screenshots/packages_dark.jpg" width="800" alt="Packages Dark Mode">
</p>

### 🇪T Destination Highlights
Explore the Land of Origins through our dedicated cultural sections.
<p align="center">
  <img src="./screenshots/ethiopia_hero.jpg" width="800" alt="Ethiopia Hero">
</p>

### 📦 Package Details
Comprehensive tour information with high-quality visual galleries.
<p align="center">
  <img src="./screenshots/package_detail.jpg" width="800" alt="Package Details">
</p>

### 🛌 Room Selection
Choose the perfect accommodation from our curated hotel partners.
<p align="center">
  <img src="./screenshots/room_selection.jpg" width="800" alt="Room Selection">
</p>

### ✅ Booking Confirmation
Seamless reservation process with instant digital confirmation.
<p align="center">
  <img src="./screenshots/booking_confirmed.jpg" width="800" alt="Booking Confirmed">
</p>

---

## 🛠️ Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/Samarssj/Tour-ET.git
   ```
2. **Install dependencies**
   ```sh
   # Backend
   cd backend && npm install
   # Frontend
   cd ../frontend && npm install
   ```
3. **Environment Setup**
   Create the backend environment file from the provided template:
   ```sh
   cd backend
   cp .env.example .env
   ```
   Set `MONGODBURL`, `KEY` (JWT), `PORT=5000`, and `GEMINI_API_KEY` in `backend/.env`. The Gemini key should be a Google AI Studio API key and must remain server-side.
4. **Run Application**
   Start the backend and frontend in separate terminals:
   ```sh
   # Terminal 1
   cd backend && npm start

   # Terminal 2
   cd frontend && npm start
   ```

### Gemini Travel Assistant
The site includes an **Ask TourET** toggle throughout the main browsing experience. Travelers can ask natural-language questions about Ethiopian places, TourET packages, hotels, duration, travel style, and budget. For example:

> I have $700 for five days in Ethiopia. Which places and TourET hotels would work best for a relaxed cultural trip?

The browser sends the conversation to the server-side endpoint below; the Gemini API key is never exposed to the browser.

```text
POST /api/assistant/chat
```

The backend loads the current TourET package and hotel catalog from MongoDB and instructs Gemini to ground suggestions in that data. It does not invent package prices, hotel prices, availability, or booking confirmations. Suggestions remain informational, and travelers should confirm current availability before booking.

The assistant dynamically calls Gemini's [model-listing endpoint](https://ai.google.dev/api/models), filters for compatible chat models that support `generateContent`, and selects the newest available model based on version, stability, and capability. The selected model is cached for ten minutes, so newer compatible models can be picked up automatically without a frontend code change. See Google's [Gemini models guide](https://ai.google.dev/gemini-api/docs/models) for current model availability.

### Render Deployment
The repository's `render.yaml` defines two services:

| Render service | Configuration |
| --- | --- |
| `tesystem` | Node/Express backend rooted at `backend`, listening on port `5000`. |
| `tesystem-frontend` | Static React frontend rooted at `frontend`, built with `npm install && npm run build`. |

After pushing changes to GitHub, add the following variable in **Render → tesystem → Environment** and redeploy the backend:

```text
GEMINI_API_KEY=your-google-ai-studio-api-key
```

Keep the existing backend variables `MONGODBURL`, `KEY`, and `PORT=5000`. The frontend already has the following value in `render.yaml`, so no new frontend variable is required:

```text
REACT_APP_BACKEND_URL=https://tesystem.onrender.com/api
```

Redeploy the frontend as well so Render rebuilds the latest React code. Once both services are running, open the deployed frontend, select **Ask TourET**, and send a budget-aware trip question. If `GEMINI_API_KEY` is missing or invalid, the assistant displays a configuration or API error rather than exposing the credential.

---
<p align="center">
  Made with ❤️ for Ethiopia
</p>
