const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenses');
const authRoutes = require('./routes/auth'); 

const app = express();

// Configure CORS with specific origin from environment variables
app.use(cors({
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Removed console.log for production readiness
  })
  .catch(err => {
    // Removed console.log for production readiness
  });

app.get('/', (req, res) => res.send('API running'));

app.use('/api/expenses', expenseRoutes); // Expense API (secured)
app.use('/api/auth', authRoutes);        // Auth API (login, register)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Removed console.log for production readiness
});