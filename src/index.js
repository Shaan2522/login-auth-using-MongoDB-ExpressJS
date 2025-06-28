const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('../routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/admin')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
