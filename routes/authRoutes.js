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
    return res.send("Passwords do not match. Please try again.");
  }

  try {
    await signup(username, password);
    res.redirect('/login');
  } catch (err) {
    res.send(err.message);
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
    res.redirect('/home');
  } catch (err) {
    res.send(err.message);
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
