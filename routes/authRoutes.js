const express = require('express');
const router = express.Router();
const { signup, login } = require('../models/auth');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const svgCaptcha = require('svg-captcha');

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again later.' }
});

// redirect root / to /login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// CAPTCHA endpoint (shared for login/signup)
router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({ noise: 2, color: true, background: '#f4f6f8' });
  req.session.captcha = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
});

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup
router.post('/signup', async (req, res) => {
  const { email, password, verifyPassword, captcha } = req.body;

  // CAPTCHA validation
  if (!captcha || !req.session.captcha || captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    req.session.captcha = null;
    return res.json({ success: false, message: 'CAPTCHA does not match' });
  }
  req.session.captcha = null;

  // Email validation (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ success: false, message: "Please enter a valid email address." });
  }

  if (password !== verifyPassword) {
    return res.json({ success: false, message: "Passwords do not match" });
  }

  try {
    await signup(email, password);
    return res.json({ success: true, message: "User created successfully!" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.email) return res.redirect('/home');
  res.render('login');
});

// Handle login
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password, captcha } = req.body;

  // CAPTCHA validation
  if (!captcha || !req.session.captcha || captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    req.session.captcha = null;
    return res.json({ success: false, message: 'CAPTCHA does not match' });
  }
  req.session.captcha = null;

  try {
    const user = await login(email, password);
    req.session.email = user.email;
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Google OAuth login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err || !user) return res.redirect('/login');
    req.logIn(user, (err) => {
      if (err) return res.redirect('/login');
      req.session.email = user.email;
      return res.redirect('/home');
    });
  })(req, res, next);
});

// GitHub OAuth login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err || !user) return res.redirect('/login');
    req.logIn(user, (err) => {
      if (err) return res.redirect('/login');
      req.session.email = user.email;
      return res.redirect('/home');
    });
  })(req, res, next);
});

// Home page
router.get('/home', (req, res) => {
  if (!req.session.email) return res.redirect('/login');
  res.render('home', { email: req.session.email });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Editor redirect
router.get('/editor', (req, res) => {
  res.render('editor', { email: req.session.email });
});

module.exports = router;
