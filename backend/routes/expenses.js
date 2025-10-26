const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// All routes below require authentication
router.use(auth);


router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    if (!title || amount === undefined || !category || !date) {
      return res.status(400).json({ message: 'All fields required' });
    }

   
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const expense = new Expense({
      title,
      amount: amountValue,
      category,
      date: new Date(date),
      notes,
      user: userObjectId
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

 //GET ALL THE USER EXPENSES
router.get('/', async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.userId);
    const expenses = await Expense.find({ user: userObjectId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/summary/total', async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized - missing userId' });
    }

    
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

   
    const result = await Expense.aggregate([
      { $match: { user: userObjectId } },
      { $project: { amount: { $toDouble: "$amount" } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const total = result.length > 0 ? result[0].total : 0;
  
    res.json({ total: Math.round(total * 100) / 100 });
  } catch (err) {
    // Removed console.error for production readiness
    res.status(500).json({ message: err.message });
  }
});

// Get category breakdown 
router.get('/summary/categories', async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized - missing userId' });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const categories = await Expense.aggregate([
      { $match: { user: userObjectId } },
      { $project: { category: 1, amount: { $toDouble: "$amount" } } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Round totals to 2 decimal places
    const formattedCategories = categories.map(cat => ({
      ...cat,
      total: Math.round(cat.total * 100) / 100
    }));

    res.json(formattedCategories);
  } catch (err) {
    // Removed console.error for production readiness
    res.status(500).json({ message: err.message });
  }
});

//  Get expenses by date range
router.get('/summary/range', async (req, res) => {
  try {
    const { start, end } = req.query;
    const startDate = new Date(start);
    const endDate = new Date(end);

    
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const expenses = await Expense.find({
      user: userObjectId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅Delete an expense by ID 
router.delete('/:id', async (req, res) => {
  try {
  
    const userObjectId = new mongoose.Types.ObjectId(req.userId);
    
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: userObjectId
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or not yours' });
    }

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;