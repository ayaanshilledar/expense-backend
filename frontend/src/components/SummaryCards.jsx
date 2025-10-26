import { useState, useEffect } from 'react';
import { DollarSign, PieChart } from 'lucide-react';
import api from '../services/api';

const SummaryCards = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ Fetch total expenses
        const totalRes = await api.get('/expenses/summary/total');
        const totalValue = Number(totalRes.data?.total || 0);
        setTotalExpenses(totalValue);

        // ✅ Fetch category breakdown
        const categoryRes = await api.get('/expenses/summary/categories');
        const sortedData = (categoryRes.data || []).sort((a, b) => b.total - a.total);
        setCategoryData(sortedData);
      } catch (err) {
        console.error('❌ Failed to fetch summary data:', err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  // ✅ Top 3 categories only
  const topCategories = categoryData.slice(0, 3);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading summary...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className=" hidden grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ✅ Total Expenses Card */}
      <div className="card bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">
              ${typeof totalExpenses === 'number' ? totalExpenses.toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Top Categories Card */}
      <div className="card bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <PieChart className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">Top Categories</p>
            <div className="mt-3 space-y-2">
              {topCategories.length > 0 ? (
                topCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span className="text-gray-900 font-medium">
                      {category._id || 'Uncategorized'}
                    </span>
                    <span className="font-semibold text-gray-800">
                      ${typeof category.total === 'number' ? category.total.toFixed(2) : '0.00'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No expenses yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
