import { useState } from 'react';
import { Plus, Receipt } from 'lucide-react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    'Food', 'Transport', 'Shopping', 'Bills', 'Health',
    'Entertainment', 'Education', 'Investment', 'Other'
  ];

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onAddExpense({
        title: formData.title,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date
      });
      
      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 shadow">
      <div className="flex items-center mb-4">
        <Receipt className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Add New Expense</h2>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={onChange}
            className="input w-full mt-1"
            placeholder="Enter expense title"
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="label">
            Amount ($)
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            value={formData.amount}
            onChange={onChange}
            className="input w-full mt-1"
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={onChange}
            className="input w-full mt-1"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
       <div className="flex w-full flex-col items-start justify-between">
  <label htmlFor="date" className="label">
    Date
  </label>
  <div className="relative w-full mt-1">
    <input
      id="date"
      name="date"
      type="date"
      required
      value={formData.date}
      onChange={onChange}
      className="input w-full pr-10"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        
      </svg>
    </div>
  </div>
</div>

        
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary py-3 px-3 w-full flex items-center justify-center"
        >
          
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;