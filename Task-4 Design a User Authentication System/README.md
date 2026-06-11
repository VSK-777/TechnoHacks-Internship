# 🎓 Task 4: Secure User Authentication System

<div align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-151515?logo=springboot&logoColor=white&labelColor=6DB33F" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Frontend-React-151515?logo=react&logoColor=black&labelColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-151515?logo=postgresql&logoColor=white&labelColor=4169E1" alt="PostgreSQL" />
</div>

## 📌 Project Overview
The User Authentication System is an enterprise-grade, full-stack application designed to demonstrate secure registration, stateless session management, and protected resource access. It features a robust **Spring Security** API implementing JSON Web Tokens (JWT) for authentication, seamlessly integrated with a modern, dynamic **React** frontend.

## ✨ Features
- **Stateless JWT Authentication:** Highly scalable authentication leveraging encrypted JSON Web Tokens.
- **Secure Password Hashing:** User passwords are automatically salted and hashed using `BCrypt` before entering the database.
- **Protected Routes & APIs:** Backend endpoints and frontend React routes strictly enforce authentication. Unauthenticated users are swiftly intercepted and redirected.
- **Dynamic Glassmorphism UI:** A beautiful, responsive interface featuring dynamic geometric backgrounds, modern CSS micro-animations, and aesthetic form validations.
- **Professional Error Handling:** Structured JSON error payloads from the backend are parsed to deliver graceful UI alerts (e.g., "Email already in use") instead of generic crashes.

## 🛠️ Tech Stack
- **Backend:** Java 21, Spring Boot 4.0.6, Spring Security, Spring Data JPA, JWT (io.jsonwebtoken)
- **Frontend:** React.js (Vite build system), React Router DOM, Axios, Context API
- **Database:** Neon PostgreSQL (Hibernate ORM)
- **Architecture:** Decoupled Monorepo

## 📂 Project Structure
```text
Task-4 Design a User Authentication System/
│
├── backend/                 # Spring Boot API & Security Layer
│   └── auth-system/
│       ├── config/          # JWT Filters & Spring Security config
│       ├── controller/      # Auth & Protected REST Endpoints
│       ├── service/         # Token Generation & Business Logic
│       └── ...
│
└── frontend/                # React Vite Application
    ├── src/
    │   ├── components/      # Login, Register, & Dashboard UI
    │   ├── context/         # AuthContext for global state
    │   └── index.css        # Premium Glassmorphism design system
    └── ...
```

## 🚀 Setup Instructions

Because this is a decoupled architecture, you will run the backend and frontend separately.

### 1. Database Configuration
The application is securely connected to a remote Neon PostgreSQL cluster. Ensure you have injected your `NEON_DB_URL`, `NEON_DB_USERNAME`, and `NEON_DB_PASSWORD` in the `application.yaml` or as system environment variables.

### 2. Start the Backend API
```bash
cd "backend/auth-system"
mvn clean spring-boot:run
```
The API will launch securely on `http://localhost:8080`.

### 3. Start the Frontend Application
Open a new terminal window:
```bash
cd "frontend"
npm install
npm run dev
```
The beautiful UI will instantly launch at `http://localhost:5173`. 

## 🌐 Live Demo
[**techno-hacks-internship-task-4.vercel.app**](https://techno-hacks-internship-task-4.vercel.app)
