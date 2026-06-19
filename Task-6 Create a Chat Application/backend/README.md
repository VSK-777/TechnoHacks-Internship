# 🛡️ Backend - VSK Connect AI Chat

This module contains the enterprise-grade Spring Boot API and Socket.IO server responsible for managing real-time communications, secure user authentication, and advanced AI interactions.

## 📌 Technical Highlights
- **Spring Boot & Socket.IO:** Integrates a robust Netty-based Socket.IO server within the Spring ecosystem, handling hundreds of concurrent bi-directional connections effortlessly.
- **Groq API Integration:** Connects directly to Groq's insanely fast inference engine running the Llama 3 model, providing split-second AI responses.
- **Contextual AI Memory:** Implements a custom `MemoryService` that aggregates chat history, creating a seamless, long-term conversational context for the AI.
- **Defensive Design:** Implements explicit database checks to prevent race conditions or unique constraint violations, ensuring secure private channel architectures.
- **Clean Architecture:** Strictly decoupled Controllers, Services, Repositories, and Socket listeners, heavily documented with SLF4J logging.

## 🔌 Core API & Socket Events

### REST Endpoints
| HTTP Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | **Public** | Creates a new user, hashes password, and returns initial JWT. |
| `POST` | `/api/auth/login` | **Public** | Validates credentials and generates a new session JWT. |
| `GET` | `/api/rooms` | **Protected** | Requires Bearer Token. Returns all public/visible rooms. |
| `GET` | `/api/rooms/ai` | **Protected** | Requires Bearer Token. Retrieves or creates the user's dedicated AI room. |

### Socket.IO Events
| Event Name | Direction | Description |
| :--- | :--- | :--- |
| `join_room` | **Client -> Server** | Authenticates user into a specific chat channel. |
| `send_message` | **Client -> Server** | Transmits a payload. AI parses and responds if mentioned or if in a private AI room. |
| `receive_message`| **Server -> Client** | Broadcasts incoming messages to all connected clients in the room. |

## 🚀 Running the API

Ensure your PostgreSQL server is running and your `vskconnect` database is created. You will also need to place your Groq API key in the `application.properties`.

```bash
# Navigate to the backend directory
cd backend

# Clean and start the Spring Boot server
mvn clean spring-boot:run
```
