# VSK Connect AI - Real-Time Chat Application

This is Task 6 of the TechnoHacks Internship: a complete, real-time chat application with an integrated AI Assistant.

## Project Structure

The repository is structured as a full-stack application with distinct client and server directories:

- **`frontend/`**: The React/Vite client application providing a modern, dynamic, and responsive UI.
- **`backend/`**: The Spring Boot server providing REST APIs, WebSocket connections (Socket.IO), AI integration (Groq API), and database management (MySQL/Hibernate).

## Features

- **Real-Time Messaging**: Built using Socket.IO for seamless, instantaneous communication.
- **Public Channels**: Create and join channels for group discussions.
- **AI Integration**: A dedicated "AI Chat" tab that connects directly to a highly capable AI assistant (Llama 3 via Groq) that remembers the context of your conversations.
- **User Authentication**: Secure JWT-based authentication.
- **Modern UI**: A polished, responsive interface built with React, Tailwind CSS, and Framer Motion.

## Getting Started

To run this project locally, follow the instructions in the respective directories:
1. Navigate to the `backend` folder and follow the `README.md` to start the Spring Boot server.
2. Navigate to the `frontend` folder and follow the `README.md` to start the React development server.
