# 🎓 Task 2: Student Management RESTful API

<div align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
</div>

## 📌 Project Overview
The Student Management API is a comprehensive, production-ready Full-Stack application. It demonstrates the ability to build a secure, efficient REST backend seamlessly integrated with a modern React frontend. The project utilizes a **Bundled Architecture**, where the compiled React application is served directly by the Spring Boot `.jar`, eliminating CORS issues and simplifying cloud deployment.

## ✨ Features
- **Complete CRUD Operations:** Fully functional Create, Read, Update, and Delete capabilities.
- **Intelligent Upserts:** When a student with an existing email attempts to enroll, the backend natively intercepts the constraint violation and elegantly appends the new course to their profile (comma-separated), preventing duplicate rows.
- **Modern Dashboard UI:** A highly responsive, SaaS-style interface featuring CSS glassmorphism, floating labels, and dynamic state feedback.
- **Clean Error Handling:** Graceful exception interception on the backend, delivering sanitized, human-readable error alerts to the frontend.

## 🛠️ Tech Stack
- **Backend:** Java 21, Spring Boot 4.0.6, Spring Data JPA, Hibernate ORM
- **Frontend:** React.js (Vite build system), Axios, Vanilla CSS Variables
- **Database:** MySQL Server
- **Build Tools:** Maven, `frontend-maven-plugin` (for automated Node.js bundling)

## 📂 Project Structure
```text
Task-2 Build a RESTful API/
│
├── backend/
│   ├── src/main/java/com/technohacks/studentapi/
│   │   ├── controller/      # REST API Endpoints
│   │   ├── exception/       # Global Error Handling
│   │   ├── model/           # JPA Entities
│   │   ├── repository/      # Database Interfaces
│   │   └── service/         # Business Logic & Upsert Logic
│   └── pom.xml              # Maven & Bundling Config
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable React UI Components
    │   ├── services/        # Axios API fetch logic
    │   └── App.jsx          # Main UI Layout
    └── package.json
```

## 🔌 API Endpoints
| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/students` | Fetch all registered students |
| `GET` | `/api/students/{id}` | Fetch a specific student by ID |
| `POST` | `/api/students` | Register a new student (or update courses if email exists) |
| `PUT` | `/api/students/{id}` | Update existing student details |
| `DELETE` | `/api/students/{id}` | Permanently delete a student record |

## 🗄️ Database Configuration
The application dynamically connects to MySQL via **Environment Variables**, making it instantly cloud-ready. 
To run locally, ensure these variables are set in your OS (or modify `application.properties`):
- `DB_URL` (e.g., `jdbc:mysql://localhost:3306/student_api_db`)
- `DB_USERNAME`
- `DB_PASSWORD`

## 🚀 Setup Instructions
Thanks to the bundled architecture, you do not need to run two separate development servers!

**1. Clone the repository:**
```bash
git clone https://github.com/VSK-777/TechnoHacks-Internship.git
cd "TechnoHacks-Internship/Task-2 Build a RESTful API/student-rest-api/backend"
```

**2. Build the Full-Stack Executable:**
```bash
mvn clean package
```
*(This automatically downloads Node.js, compiles the React UI, and bundles it into the Java resources).*

**3. Run the Application:**
```bash
java -jar target/student-rest-api-0.0.1-SNAPSHOT.jar
```
**Access the live application at:** `http://localhost:8080`

## 🌐 Live Demo
**[Click here to access the live application!](https://techno-hacks-internship.vercel.app/)**
