# TaskFlow Mini-SaaS

A production-ready Task Management application with secure authentication and multi-user functionality. Built as part of a Full Stack Developer Intern screening test.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite, Framer Motion (Animations), Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL with Sequelize ORM.
- **Authentication**: JWT (JSON Web Tokens) with password hashing (Bcrypt).
- **Validation**: Express-validator.

## ✨ Features

- **Authentication System**:
  - Secure Signup and Login.
  - JWT-based authentication for protected routes.
  - Password hashing for security.
- **Task Management**:
  - Create, View, Update (Status), and Delete tasks.
  - Multi-user support: Users can only see and manage their own tasks.
  - Real-time task stats (Total, Pending, Completed).
  - Responsive design for all screen sizes.
- **Backend Architecture**:
  - Modular folder structure (Controllers, Routes, Models, Middleware).
  - Centralized error handling.
  - Input validation for all API endpoints.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL installed and running

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd Product-Space-Assignment
```

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root and add your database credentials:
   ```env
   PORT=5000
   DB_NAME=task_saas
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
├── client/              # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth state management
│   │   ├── pages/       # Page views
│   │   └── services/    # API calls (Axios)
└── server/              # Backend (Node + Express)
    ├── src/
    │   ├── config/      # Database config
    │   ├── controllers/ # Request handlers
    │   ├── middleware/  # Auth & Validation
    │   ├── models/      # Sequelize models
    │   └── routes/      # API endpoints
```
