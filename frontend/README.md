# Expense Tracker Frontend

This is the React frontend for the Expense Tracker application.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

The application will be available at http://localhost:3000

## Features

- User authentication (login/register)
- Dashboard with expense summary
- Add new expenses
- View and delete expenses
- Responsive design with TailwindCSS

## Tech Stack

- React 18
- React Router v6
- TailwindCSS
- Axios for API requests
- Lucide React for icons
- React Hot Toast for notifications

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Dashboard.jsx
│   ├── DashboardHeader.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseTable.jsx
│   ├── ProtectedRoute.jsx
│   └── SummaryCards.jsx
├── services/
│   └── api.js
├── App.jsx
├── index.css
└── main.jsx
```

## API Integration

The frontend is configured to work with the backend API running on http://localhost:5000. The proxy is set up in `vite.config.js` to forward `/api` requests to the backend.

## Design System

- Primary color: #3ECF8E (153 60% 53% HSL)
- Card layout with rounded corners and shadows
- Responsive grid system
- Consistent spacing and typography