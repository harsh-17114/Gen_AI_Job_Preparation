# Gen AI Job Preparation

A full-stack AI-powered interview preparation application built with **React**, **Node.js**, **Express.js**, **MongoDB**, and **Google Gemini**. The application analyzes a candidate's resume, self-description, and target job description to generate a personalized interview preparation report. The generated report includes a **job match score, technical interview questions, behavioral questions, skill gaps, and a day-by-day preparation roadmap**.

## Features

* User registration and login
* JWT-based authentication
* Secure HTTP-only authentication cookies
* User logout with token blacklisting
* Resume PDF upload
* AI-powered interview report generation
* Job description and resume analysis
* Candidate-job match score
* Technical interview questions
* Behavioral interview questions
* Model answers for interview questions
* Skill gap identification
* Skill gap severity classification
* Personalized day-by-day preparation roadmap
* MongoDB database integration using Mongoose
* RESTful API architecture
* Centralized error handling
* PDF file type validation
* 10 MB resume file size validation
* CORS configuration
* Environment variable configuration using dotenv
* Responsive React frontend
* Client-side navigation using React Router

## Tech Stack

### Frontend

* **React** – Frontend library
* **React Router** – Client-side routing
* **Axios** – HTTP requests
* **Sass** – Styling and responsive UI
* **Vite** – Frontend development environment

### Backend

* **Node.js** – JavaScript runtime
* **Express.js** – Backend framework
* **MongoDB** – Database
* **Mongoose** – MongoDB object modeling
* **Multer** – Resume file upload handling
* **Google Gemini** – AI-powered interview report generation
* **JWT** – Authentication
* **bcryptjs** – Password hashing
* **cookie-parser** – Authentication cookie handling
* **CORS** – Cross-origin resource sharing
* **dotenv** – Environment variable management

## Project Structure

```text
Gen_AI_Job_Preparation/
│
├── Backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   │
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── file.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── blackList.model.js
│   │   │   ├── interviewReport.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   └── Protected.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   └── Register.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.api.js
│   │   │   │   ├── auth.context.jsx
│   │   │   │   └── auth.form.scss
│   │   │   │
│   │   │   └── interview/
│   │   │       ├── hooks/
│   │   │       │   └── useInterview.js
│   │   │       ├── pages/
│   │   │       │   ├── Home.jsx
│   │   │       │   └── Interview.jsx
│   │   │       ├── services/
│   │   │       │   └── interview.api.js
│   │   │       ├── interview.context.jsx
│   │   │       └── style/
│   │   │           ├── home.scss
│   │   │           └── interview.scss
│   │   │
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── main.jsx
│   │   └── style.scss
│   │
|   ├── .gitignore
|   ├── .oxlintrc.json
|   ├── index.html
|   ├── package-lock.json
|   ├── package.json
|   └── vite.config.js
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the project directory

```bash
cd "Gen AI Job Preparation"
```

## Backend Setup

### 3. Navigate to the backend

```bash
cd Backend
```

### 4. Install dependencies

```bash
npm install
```

### 5. Configure environment variables

Create a `.env` file in the backend root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

Replace the values with your actual MongoDB, JWT, and Google Gemini credentials.

### 6. Start the backend server

```bash
node server.js
```

The backend server will start on port `3000`.

```text
Server Started Successfully
```

The backend base URL is:

```text
http://localhost:3000
```

## Frontend Setup

### 7. Navigate to the frontend

Open a new terminal:

```bash
cd Frontend
```

### 8. Install dependencies

```bash
npm install
```

### 9. Start the frontend

```bash
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

## Authentication API

Base URL:

```text
/api/auth
```

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/register` | Register a new user |
| POST | `/login` | Login an existing user |
| POST | `/logout` | Logout the current user |
| GET | `/get-me` | Fetch the currently authenticated user |

### Register

**POST** `/api/auth/register`

Request body:

```json
{
    "username": "John",
    "email": "john@example.com",
    "password": "password123"
}
```

### Login

**POST** `/api/auth/login`

Request body:

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

The server generates a JWT token and stores it in an HTTP-only cookie.

### Logout

**POST** `/api/auth/logout`

The authentication token is added to the blacklist and the authentication cookie is cleared.

### Get Current User

**GET** `/api/auth/get-me`

Returns the currently authenticated user's information.

This endpoint requires authentication.

## Interview APIs

Base URL:

```text
/api/interview
```

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/` | Generate a new AI interview report |
| GET | `/` | Fetch all interview reports |
| GET | `/report/:interviewId` | Fetch a specific interview report |

All interview endpoints require authentication.

## Generate Interview Report

**POST** `/api/interview/`

The request uses:

```text
multipart/form-data
```

Form fields:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `resume` | PDF File | Candidate resume |
| `jobDescription` | String | Target job description |
| `selfDescription` | String | Candidate's self-description |

The resume is uploaded using Multer and processed before being sent to Gemini.

### Example Response

```json
{
    "message": "Interview report generated successfully.",
    "interviewReport": {
        "_id": "...",
        "matchScore": 85,
        "title": "Software Engineer",
        "technicalQuestions": [
            {
                "question": "How would you design a scalable REST API?",
                "intention": "Evaluate backend and system design knowledge.",
                "answer": "..."
            }
        ],
        "behavioralQuestions": [
            {
                "question": "Tell me about a challenging project.",
                "intention": "Evaluate problem-solving and ownership.",
                "answer": "..."
            }
        ],
        "skillGaps": [
            {
                "skill": "TypeScript",
                "severity": "high"
            }
        ],
        "preparationPlan": [
            {
                "day": 1,
                "focus": "TypeScript Fundamentals",
                "tasks": [
                    "Learn TypeScript types",
                    "Practice interfaces and generics"
                ]
            }
        ]
    }
}
```

## Fetch All Interview Reports

**GET** `/api/interview/`

Returns interview reports belonging to the currently authenticated user.

## Fetch Interview Report

**GET** `/api/interview/report/:interviewId`

Returns a specific interview report.

The report contains:

* Job title
* Match score
* Technical questions
* Behavioral questions
* Skill gaps
* Preparation roadmap

## Interview Report Structure

```text
Interview Report
│
├── Match Score
│
├── Title
│
├── Technical Questions
│   ├── Question
│   ├── Intention
│   └── Model Answer
│
├── Behavioral Questions
│   ├── Question
│   ├── Intention
│   └── Model Answer
│
├── Skill Gaps
│   ├── Skill
│   └── Severity
│
└── Preparation Plan
    ├── Day
    ├── Focus
    └── Tasks
```

## How It Works

The application follows a full-stack AI-powered architecture.

* **React** handles the frontend interface.
* **React Router** manages frontend navigation.
* **Axios** communicates with the backend APIs.
* **Express.js** handles API requests.
* **JWT** provides user authentication.
* **Multer** handles resume uploads.
* **Google Gemini** analyzes the candidate information and generates the interview report.
* **MongoDB** stores users and interview reports.
* **Mongoose** manages MongoDB schemas and models.
* **HTTP-only cookies** store authentication tokens.
* **Centralized middleware** handles authentication, file validation, and errors.

## Interview Report Generation Flow

1. User registers or logs into the application.
2. The user enters a target job description.
3. The user provides a self-description.
4. The user uploads a resume in PDF format.
5. React creates a `FormData` object.
6. Axios sends the data to the backend.
7. Authentication middleware verifies the user.
8. Multer validates and stores the PDF temporarily in memory.
9. The resume information is processed.
10. The resume content, self-description, and job description are sent to Google Gemini.
11. Gemini generates a structured interview preparation report.
12. The generated report is stored in MongoDB.
13. The backend returns the generated interview report.
14. React displays the generated report.

## File Upload Validation

The application uses Multer for resume validation.

### Allowed File

Only PDF files are accepted.

```text
application/pdf
```

### Maximum File Size

```text
10 MB
```

If an invalid file type or oversized file is uploaded, the error middleware returns an appropriate error response.

## Authentication

The application uses JWT-based authentication.

### Authentication Flow

```text
User
 │
 ▼
Login
 │
 ▼
JWT Generated
 │
 ▼
HTTP-Only Cookie
 │
 ▼
Authentication Middleware
 │
 ▼
JWT Verification
 │
 ▼
User Retrieved From MongoDB
 │
 ▼
Protected API Access
```

The authentication middleware:

* Reads the JWT from the cookie or Authorization header.
* Checks whether the token has been blacklisted.
* Verifies the JWT.
* Retrieves the authenticated user.
* Attaches the user to `req.user`.
* Allows access to protected routes.

## Token Blacklisting

When a user logs out, the authentication token is stored in the blacklist collection.

This prevents the logged-out token from being accepted by the authentication middleware.

```text
Logout
   │
   ▼
JWT Token
   │
   ▼
Blacklist Collection
   │
   ▼
Cookie Cleared
   │
   ▼
Token Cannot Be Used
```

## Database Models

### User Model

Stores user authentication information.

```text
User
│
├── username
├── email
└── password
```

Passwords are stored as bcrypt hashes and are excluded from normal queries using Mongoose's `select: false`.

### Interview Report Model

Stores the generated interview preparation report.

```text
InterviewReport
│
├── jobDescription
├── resume
├── selfDescription
├── matchScore
├── technicalQuestions
├── behavioralQuestions
├── skillGaps
├── preparationPlan
├── user
└── title
```

## Frontend Pages

### Login Page

Allows existing users to authenticate.

### Register Page

Allows new users to create an account.

### Home Page

Allows the user to:

* Enter a job description
* Enter a self-description
* Upload a resume
* Generate an interview preparation report
* Logout

### Interview Page

Displays the generated interview report.

The page contains three main sections:

* Technical Questions
* Behavioral Questions
* Preparation Roadmap

The sidebar also displays:

* Match score
* Skill gaps

## Error Handling

The backend uses centralized error handling middleware.

It handles:

* Multer file upload errors
* Invalid PDF file errors
* File size errors
* Authentication errors
* Invalid JWT errors
* Missing users
* Unexpected server errors

Errors are logged on the server and appropriate HTTP status codes are returned to the client.

## Main Files

### `server.js`

Starts the Express server and establishes the MongoDB connection.

### `app.js`

Configures:

* Express
* JSON parsing
* Cookie parsing
* CORS
* Authentication routes
* Interview routes
* Error handling

### `auth.controller.js`

Handles:

* User registration
* User login
* User logout
* Fetching current user

### `interview.controller.js`

Handles:

* Interview report generation
* Fetching interview reports
* Fetching all reports

### `auth.middleware.js`

Handles JWT authentication and token blacklist validation.

### `file.middleware.js`

Handles resume uploads using Multer, including:

* PDF validation
* 10 MB file size validation
* Memory storage

### `error.middleware.js`

Handles file upload errors and unexpected application errors.

### `ai.service.js`

Handles AI-related operations:

* Interview report generation
* Structured Gemini responses

### `interviewReport.model.js`

Defines the MongoDB schema for generated interview reports.

### `user.model.js`

Defines the MongoDB schema for users.

### `Home.jsx`

Provides the frontend interface for:

* Job description input
* Self-description input
* Resume upload
* Interview report generation
* Logout

### `Interview.jsx`

Displays:

* Technical questions
* Behavioral questions
* Match score
* Skill gaps
* Preparation roadmap

### `useInterview.js`

Provides frontend logic for:

* Generating interview reports
* Fetching interview reports
* Fetching all reports

### `interview.api.js`

Handles Axios requests to the interview APIs.

### `auth.api.js`

Handles Axios requests for authentication.

## Application Flow

```text
                 ┌───────────────┐
                 │    React UI   │
                 └───────┬───────┘
                         │
                         │ Axios
                         ▼
                 ┌───────────────┐
                 │  Express API  │
                 └───────┬───────┘
                         │
                  ┌──────┴──────┐
                  │             │
                  ▼             ▼
             ┌─────────┐   ┌──────────┐
             │ MongoDB │   │  Gemini  │
             │         │   │    AI    │
             └─────────┘   └──────────┘
```

## Conclusion

Gen AI Job Preparation Service is a full-stack AI-powered application designed to help candidates prepare for technical and behavioral interviews based on a specific job description. The project demonstrates the integration of **React, Node.js, Express.js, MongoDB, JWT authentication, Google Gemini** into a complete application. The system combines a candidate's resume, self-description, and target job description to generate a personalized preparation strategy containing **job matching analysis, interview questions, skill gaps, and a preparation roadmap**.