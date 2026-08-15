# 🌍 Tour ET : Explore Ethiopia

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue.svg" alt="MERN Stack">
  <img src="https://img.shields.io/badge/Deployed-Render-brightgreen.svg" alt="Deployed on Render">
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-green.svg" alt="Database MongoDB Atlas">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License MIT">
</p>

**Tour ET** is a state-of-the-art, full-stack interactive travel platform designed to showcase the beauty of Ethiopia. From the historical rock-hewn churches of Lalibela to the modern vibes of Addis Ababa, this application provides a seamless experience for discovering, booking, and reviewing travel packages.

---

## 🚀 Tech Stack

### Frontend
<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

### Backend & Database
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT">
</p>

---

## 🏗️ Architecture Overview

![Project Architecture](./architecture.png)

The application follows a modern **Decoupled Architecture**:
- **Frontend**: A React Single Page Application (SPA) serving as the interactive client.
- **Backend**: A Node.js/Express RESTful API handling business logic and authentication.
- **Database**: A cloud-hosted MongoDB Atlas instance for persistent storage.
- **DevOps**: Fully automated CI/CD pipeline integrated with GitHub and Render.

---

## ✨ New Features

### 🌙 Dynamic Dark Mode
Experience the beauty of Ethiopia in any lighting. We've implemented a global **Dark Mode** toggle using React Context and CSS Variables. Your preference is automatically saved to your local storage.

### 🛡️ Production-Ready Security
- **JWT Authentication**: Secure user sessions with JSON Web Tokens.
- **Bcrypt Hashing**: Industry-standard password encryption.
- **CORS Protection**: Secure cross-origin communication between the frontend and backend.

---

## 📸 UI Preview

**Signin/signup page**
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(611).png" height="auto" width="600"/>
</p>

**Home page**
###### Users can see recent package and most popular package lists and also search by location or name
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(595).png" alt="Course Page" height="auto" width="400" />
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(596).png" alt="Course Page" height="auto" width="400" />
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(597).png" alt="Course Page" height="auto" width="400" />
</p>

**Package page**
###### Users can see packages and also can filter using different parametes
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(598).png" alt="Course Page" height="auto" width="500" />
</p>

**Package detail page**
###### Users can see package's description, reviews, location, can add to cart, book the package, 
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(599).png" alt="Course Page" height="auto" width="500" />
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(602).png" alt="Course Page" height="auto" width="500" />
</p>

**Review page**
###### Authenticated user can give review/comment, rate the package, like/dislike other's review
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(601).png" alt="Course Page" height="auto" width="500" />
</p>

**Book page**
###### Customers check out payment, choose hotel, and room
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(603).png" alt="Course Page" height="auto" width="500" />
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(604).png" alt="Course Page" height="auto" width="500" />
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(605).png" alt="Course Page" height="auto" width="500" />
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(606).png" alt="Course Page" height="auto" width="500" />
</p>

**Witshlist page**
###### Customers can see packages stored in wishlist, remove from here, book here
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(607).png" alt="Course Page" height="auto" width="500" />
</p>

**Contact page**
###### Customers can reach us 
<p align="center">
<img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(608).png" alt="Course Page" height="auto" width="500" />
</p>

**About page**
###### users can know about us
<p align="center">
  <img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(609).png" alt="Course Page" height="auto" width="500" />
  <img src="https://github.com/bemnet16/Tour_ET--MERN--/blob/UI-Preview/screenshots/Screenshot%20(610).png" alt="Course Page" height="auto" width="500" />
</p>

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas Account

### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/Samarssj/Tour-ET.git
   ```
2. Install dependencies for both Frontend and Backend
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up your `.env` variables
4. Start the development server
   ```sh
   # In backend
   npm start
   # In frontend
   npm start
   ```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
<p align="center">
  Made with ❤️ for Ethiopia
</p>
