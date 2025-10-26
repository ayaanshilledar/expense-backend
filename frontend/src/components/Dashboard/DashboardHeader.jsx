import { useState, useEffect } from 'react';
import { Wallet, LogOut } from 'lucide-react';

const DashboardHeader = ({ onLogout }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserName(payload.name || 'User');
      } catch (err) {
        // Removed console.error for production readiness
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gray-900">ExpenseTracker</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {userName}!</span>
            <button
              onClick={onLogout}
              className="btn flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;