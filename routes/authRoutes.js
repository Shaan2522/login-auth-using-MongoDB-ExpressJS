const express = require('express');
const router = express.Router();
const { signup, login } = require('../models/auth');

// redirect root / to /login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup
router.post('/signup', async (req, res) => {
  const { username, password, verifyPassword } = req.body;

  if (password !== verifyPassword) {
    return res.json({ success: false, message: "Passwords do not match" });
  }

  try {
    await signup(username, password);
    return res.json({ success: true, message: "User created successfully!" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.username) return res.redirect('/home');
  res.render('login');
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const user = await login(req.body.username, req.body.password);
    req.session.username = user.username;
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Home page
router.get('/home', (req, res) => {
  if (!req.session.username) return res.redirect('/login');
  res.render('home', { username: req.session.username });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Editor redirect
router.get('/editor', (req, res) => {
  res.render('editor', { username: req.session.username });
});

module.exports = router;
