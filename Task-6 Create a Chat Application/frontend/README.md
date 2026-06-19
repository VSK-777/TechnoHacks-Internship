# 🎨 Frontend - VSK Connect AI Chat

This module contains the highly responsive, modern React application that interfaces with the Spring Boot Security API and WebSocket server.

## 📌 Technical Highlights
- **Vite Build System:** Utilizes Vite for lightning-fast HMR (Hot Module Replacement) and optimized production bundles.
- **Socket.IO Context:** Manages persistent WebSocket connections using a dedicated React Context provider, broadcasting events efficiently across the application.
- **Advanced State Management:** Implements isolated global state managers (`AuthContext`, `ChatContext`, `SocketContext`) with custom hooks (`useAuth`, `useChat`, `useSocket`) to ensure clean dependency injection.
- **Axios Interceptors:** Automatically attaches the `Authorization: Bearer <token>` header to all outgoing requests to protected backend routes.
- **Premium UI/UX:** Features a high-end CSS design system built from scratch with Tailwind CSS and Framer Motion, incorporating smooth micro-animations, glassmorphism, and responsive grids.

## 📂 Architecture

- `/api`: Axios configurations and endpoints mapping (`auth.js`, `messages.js`, `rooms.js`, `ai.js`).
- `/components`: The building blocks. Contains everything from the core `ChatArea.jsx` to the `CreateRoomModal.jsx`.
- `/contexts`: Houses all global providers.
- `/hooks`: Custom React hooks designed to consume the global contexts elegantly.
- `/pages`: High-level page components like `LoginPage.jsx` and `ChatPage.jsx`.

## 🚀 Running the Frontend

Ensure you have Node.js installed.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Your browser will automatically open at `http://localhost:5173`. To create an optimized production build, run `npm run build`.
