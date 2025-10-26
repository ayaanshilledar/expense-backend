import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardHeader from './DashboardHeader';
import SummaryCards from './SummaryCards';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import api from '../services/api';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshSummary, setRefreshSummary] = useState(0);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await api.post('/expenses', expenseData);
      setExpenses([res.data, ...expenses]);
      // Trigger a refresh of the summary cards
      setRefreshSummary(prev => prev + 1);
      toast.success('Expense added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add expense');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
      // Trigger a refresh of the summary cards
      setRefreshSummary(prev => prev + 1);
      toast.success('Expense deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete expense');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onLogout={() => {
        localStorage.removeItem('token');
        navigate('/login');
        toast.success('Logged out successfully');
      }} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your expenses efficiently</p>
        </div>
        
        <SummaryCards key={refreshSummary} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          <div className="lg:col-span-2">
            <ExpenseTable 
              expenses={expenses} 
              onDeleteExpense={deleteExpense} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;