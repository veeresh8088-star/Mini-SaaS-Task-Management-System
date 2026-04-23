# 🚀 TaskFlow - Mini SaaS Task Management System

TaskFlow is a modern, full-stack Task Management System designed for productivity. It features a premium UI with glassmorphism effects, secure authentication, and real-time task tracking.

**🔗 [Live Demo](https://mini-saas-task-management-v2.vercel.app)**

## ✨ Features
- **Secure Authentication**: JWT-based login and signup with protected routes.
- **Task Management**: Create, view, filter (All/Pending/Completed), and manage tasks seamlessly.
- **Premium UI**: Modern design using Tailwind CSS 4, Framer Motion animations, and Lucide icons.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Database Integration**: Persistent storage using PostgreSQL and Sequelize ORM.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS 4, Framer Motion, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL (hosted on Render).
- **ORM**: Sequelize.
- **Deployment**: Vercel (Frontend), Render (Backend).

## 🚀 Getting Started

### 1. Database Setup
1. Create a PostgreSQL database (e.g., on Render).
2. Set your `DATABASE_URL` and `JWT_SECRET` in the `.env` file in the `server` directory.

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
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
├── client/              # Frontend (React + Tailwind 4)
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

---
Built with ❤️ for the Product Space Assignment.
