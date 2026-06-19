# VSK Connect AI - Backend

The backend of the VSK Connect AI Chat Application is built with **Spring Boot** and **Java 21**. It serves REST APIs for authentication and room management, integrates **Socket.IO** for real-time messaging, and connects to the **Groq API** to provide an intelligent AI assistant.

## Tech Stack
- **Java 21**
- **Spring Boot 3.x**
- **Spring Security & JWT** (Authentication)
- **Spring Data JPA & Hibernate** (ORM)
- **MySQL** (Database)
- **Netty Socket.IO** (Real-time WebSockets)
- **Groq API (Llama 3)** (AI Integration)

## Core File Structure
The `src/main/java/com/vskconnect` package is structured as follows:
- `ai/`: Contains AI integration logic (`AIChatService`, `PromptBuilder`), Groq configuration, and API calls.
- `config/`: Application configuration including Socket.IO setups and Database seeding (`DataSeeder`).
- `controller/`: REST endpoints (`AuthController` for login/register, `ChatController` for room fetching).
- `dto/`: Data Transfer Objects used for API responses and WebSocket payloads (`ApiDto`).
- `entity/`: Database Models (`User`, `Room`, `Message`, and Enums).
- `memory/`: Services for the AI's conversation history (`MemoryService`, `MemoryContextBuilder`, `MemorySummarizer`).
- `repository/`: Spring Data JPA interfaces for database operations.
- `security/`: JWT authentication logic (`JwtAuthFilter`, `JwtUtil`, `SecurityConfig`).
- `service/`: Core business logic (`AuthService`, `ChatService`).
- `socket/`: The `SocketIOService` that acts as the entry point for all real-time events (connecting, sending messages).
- `util/`: Helper utilities (`AvatarUtil`).

## Setup and Execution
1. Ensure you have **MySQL** installed and running. Create a database named `vskconnect`.
2. Review the `src/main/resources/application.properties` and ensure your `spring.datasource` credentials match your local setup.
3. Obtain a Groq API Key and set it in your environment or properties file (`groq.api.key`).
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on port `8080` (HTTP) and `9092` (Socket.IO).
