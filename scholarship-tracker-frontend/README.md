# 🎓 Scholarship Tracker Application

A full-stack web application built to help users seamlessly organize, track, and manage scholarship applications. The application provides secure authentication, real-time application status tracking, document management links, and structured filtering to stay on top of upcoming application deadlines.

---

## 🚀 Features

* **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT) and `bcrypt` password hashing.
* **Scholarship Management:** Full CRUD (Create, Read, Delete) capabilities for scholarship records.
* **Track Application Details:** Keep track of scholarship providers, awarded amounts, application URLs, deadlines, status states (*Pending*, *Approved*, *Rejected*), and required documents.
* **User Isolation:** Database-level isolation via Prisma relational models to ensure users only access their own tracked scholarships.
* **Cloud Infrastructure:** Backend API deployed on Render with PostgreSQL database integration; Frontend client hosted on Vercel.

---

## 🛠 Tech Stack

### **Frontend**
* **Framework / Library:** React.js (built with Vite)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios (with request interceptors for JWT Bearer token management)

### **Backend**
* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **ORM:** Prisma ORM
* **Database:** PostgreSQL
* **Authentication:** JSON Web Tokens (`jsonwebtoken`), `bcrypt`

---

## 📁 Project Structure

```text
FINAL PROJECT/
├── scholarship-tracker-frontend/    # React + Vite Client Application
│   ├── public/                      # Static assets
│   └── src/
│       ├── api.js                   # Axios setup & API endpoint definitions
│       ├── components/              # UI Components (Forms, Cards, Lists)
│       ├── App.jsx                  # Main application layout and routes
│       └── main.jsx                 # Vite application entry point
│
└── server/backend/                  # Express API Server
    ├── controller/
    │   ├── authController.js        # User signup & login logic
    │   └── scholarshipController.js # CRUD controller operations for scholarships
    ├── middleware/
    │   └── authMiddleware.js        # JWT protection middleware for private routes
    ├── prisma/
    ├── schema.prisma            # Database schema & entity definitions
    ├── routes/
    │   ├── authRoutes.js            # Auth endpoints (/api/auth)
    │   └── scholarshipRoutes.js     # Protected endpoints (/api/scholarships)
    ├── db.js                        # Centralized Prisma Client instance
    └── index.js                     # Express server boot & middleware setup


 Local Development Setup1. PrerequisitesNode.js (v18+ recommended)npm or yarnPostgreSQL database instance2. Backend SetupBash# Navigate to backend directory
cd server/backend

# Install dependencies
npm install

# Apply Prisma database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start development server
npm start
# Server will run at http://localhost:5000
3. Frontend SetupBash# Navigate to frontend directory
cd scholarship-tracker-frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
# Frontend will run at http://localhost:5173

🌐 Deployment Details
Live Frontend: Hosted on Vercel

Live Backend API: Hosted on Render

Database: Cloud PostgreSQL Instance