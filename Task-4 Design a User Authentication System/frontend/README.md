# 🎨 Frontend - User Authentication System

This module contains the highly responsive, modern React application that interfaces with the Spring Boot Security API.

## 📌 Technical Highlights
- **Vite Build System:** Utilizes Vite for lightning-fast HMR (Hot Module Replacement) and optimized production bundles.
- **Context API (`AuthContext`):** Implements a global state manager that securely handles the JWT token, automatically persisting it to `localStorage` and orchestrating login/logout flows.
- **Axios Interceptors:** Automatically attaches the `Authorization: Bearer <token>` header to all outgoing requests to protected backend routes.
- **Protected Routing:** Utilizes custom wrapper components to intercept unauthenticated users attempting to access the `/dashboard` and seamlessly redirects them to `/login`.
- **Premium Glassmorphism UI:** Features a high-end CSS design system built from scratch, incorporating volumetric shapes, drop-shadows, and micro-animations to deliver a SaaS-like user experience.

## 📂 Architecture

- `/components`: Contains `Login.jsx`, `Register.jsx`, `Dashboard.jsx`, and `ProtectedRoute.jsx`.
- `/context`: Houses the global `AuthContext.jsx` provider.
- `index.css`: The central design system defining all CSS variables, animations, and responsive grids.

## 🚀 Running the Frontend

Ensure you have Node.js installed.

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Your browser will automatically open at `http://localhost:5173`.
