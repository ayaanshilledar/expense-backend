const mongoose = require('mongoose');

const allowedCategories = [
  'Food', 'Transport', 'Shopping', 'Bills', 'Health',
  'Entertainment', 'Education', 'Investment', 'Other'
];

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be a positive value']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: allowedCategories,
      message: 'Category is not valid'
    }
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: v => !isNaN(new Date(v).getTime()),
      message: 'Invalid date'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Each expense must belong to a user for security
  },
  notes: {
    type: String,
    maxlength: [100, 'Notes cannot exceed 100 characters']
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
