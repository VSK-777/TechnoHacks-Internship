# 💬 Task 6: Real-Time Chat Application with AI Integration

<div align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Security-JWT-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/WebSockets-Socket.IO-010101?logo=socket.io&logoColor=white" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/AI-Llama%203%20(Groq)-F58025?logo=meta&logoColor=white" alt="Llama 3" />
</div>

## 📌 Project Overview
The VSK Connect AI Chat Application is an enterprise-grade, full-stack application designed to demonstrate real-time, bi-directional communication using WebSockets. It features secure JWT authentication, public and private messaging channels, and a powerful, deeply integrated AI assistant capable of remembering context. 

## ✨ Features
- **Real-Time WebSockets:** Instantaneous messaging leveraging Socket.IO for low-latency, scalable bi-directional events.
- **AI Integration (Groq & Llama 3):** An intelligent AI assistant embedded directly into the chat. It possesses contextual memory, allowing it to remember past interactions and assist seamlessly.
- **Dynamic Channel Management:** Users can instantly create dedicated public rooms or secure private spaces to collaborate.
- **Secure Authentication:** Robust JWT-based stateless authentication safeguarding endpoints and socket connections.
- **Modern Responsive UI:** A deeply polished React frontend utilizing Tailwind CSS and Framer Motion for smooth animations and a premium look.

## 🛠️ Tech Stack
- **Backend:** Java 21, Spring Boot 3.x, Spring Security, Spring Data JPA, Socket.IO Server (Netty), Groq API
- **Frontend:** React 18 (Vite build system), Tailwind CSS, Framer Motion, Socket.IO Client, Axios
- **Database:** MySQL Server (Hibernate ORM)
- **Architecture:** Decoupled Monorepo

## 📂 Project Structure
```text
Task-6 Create a Chat Application/
│
├── backend/                 # Spring Boot API & Socket.IO Server
│   ├── src/main/java/com/vskconnect/
│   │   ├── ai/              # Groq API integration and prompt building
│   │   ├── controller/      # Auth & REST Endpoints
│   │   ├── memory/          # AI contextual memory management
│   │   ├── socket/          # Real-time WebSocket event listeners
│   │   └── ...
│   └── ...
│
└── frontend/                # React Vite Application
    ├── src/
    │   ├── api/             # Axios configurations and API services
    │   ├── components/      # Chat UI, modals, and AI views
    │   ├── contexts/        # Global state (Auth, Chat, Socket)
    │   ├── hooks/           # Custom React Hooks
    │   └── ...
    └── ...
```

## 🚀 Setup Instructions

Because this is a decoupled architecture, you will run the backend and frontend separately.

### 1. Database Configuration
Ensure you have MySQL installed and running locally. Create a database named `vskconnect`. Inject your `spring.datasource.username` and `spring.datasource.password` in the `application.properties` file.

### 2. Start the Backend Server
```bash
cd "backend"
mvn clean spring-boot:run
```
The REST API will launch securely on `http://localhost:8080` and the WebSocket server will start on `http://localhost:9092`.

### 3. Start the Frontend Application
Open a new terminal window:
```bash
cd "frontend"
npm install
npm run dev
```
The beautiful UI will instantly launch at `http://localhost:5173`. 
