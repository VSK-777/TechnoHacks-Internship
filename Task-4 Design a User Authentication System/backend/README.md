# 🛡️ Backend - User Authentication System

This module contains the enterprise-grade Spring Boot API responsible for managing secure user authentication, password hashing, and token issuance.

## 📌 Technical Highlights
- **Spring Security 6+:** Fully modernized security configuration using the new Lambda DSL, completely removing deprecated `WebSecurityConfigurerAdapter` patterns.
- **JWT Filters:** Implements a custom `OncePerRequestFilter` that intercepts HTTP requests, extracts the `Bearer` token, validates the cryptographic signature, and explicitly hydrates the `SecurityContextHolder`.
- **BCrypt Encryption:** Intercepts plain-text passwords during registration and securely hashes them.
- **Defensive Design:** Implements explicit database checks to prevent race conditions or unique constraint violations (e.g., duplicate emails).
- **Clean Architecture:** Strictly decoupled Controllers, Services, and Repositories heavily documented with Javadocs and SLF4J logging.

## 🔌 Core API Endpoints

| HTTP Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | **Public** | Creates a new user, hashes password, and returns initial JWT. |
| `POST` | `/api/auth/login` | **Public** | Validates credentials and generates a new session JWT. |
| `GET` | `/api/user/profile` | **Protected** | Requires Bearer Token. Returns decrypted user details for the dashboard. |

## 🚀 Running the API

Ensure your PostgreSQL server is running or you have connected to Neon PostgreSQL.

```bash
# Navigate to the backend directory
cd auth-system

# Clean and start the Spring Boot server
mvn clean spring-boot:run
```
