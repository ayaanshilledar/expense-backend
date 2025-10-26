# Expense Tracker Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking expenses.

## Project Structure

```
.
├── backend/          # Node.js + Express backend
└── frontend/         # React + TailwindCSS frontend
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MongoDb=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at http://localhost:3000 and is configured to proxy API requests to the backend running on http://localhost:5000.

## Features

### Backend
- User authentication (register/login) with JWT
- Expense management (CRUD operations)
- Expense summaries (total, by category)
- MongoDB integration
- RESTful API design

### Frontend
- User authentication (login/register)
- Dashboard with expense summary
- Add new expenses
- View and delete expenses
- Responsive design with TailwindCSS
- Protected routes
- Toast notifications

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Expenses
- `POST /api/expenses` - Add a new expense
- `GET /api/expenses` - Get all expenses for the authenticated user
- `DELETE /api/expenses/:id` - Delete an expense by ID
- `GET /api/expenses/summary/total` - Get total expenses for the authenticated user
- `GET /api/expenses/summary/categories` - Get expense breakdown by category

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

### Frontend
- React 18
- React Router v6
- TailwindCSS
- Axios for API requests
- Lucide React for icons
- React Hot Toast for notifications

## Design System

- Primary color: #3ECF8E (153 60% 53% HSL)
- Card layout with rounded corners and shadows
- Responsive grid system
- Consistent spacing and typography