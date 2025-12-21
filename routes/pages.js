const express = require('express');
const router = express.Router();
const path = require('path');

// Route for the main index page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'guest', 'main', 'index.html'));
});

// Route for login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'guest', 'login', 'login.html'));
});

// Route for signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'guest', 'signup', 'signup.html'));
});

// Route for events page
router.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'events.html'));
});

// Route for forgot password page
router.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'guest', 'forgot-password', 'forgot-password.html'));
});

// Route for reset password page
router.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'guest', 'reset-password', 'reset-password.html'));
});

// Route for verify 2FA page
router.get('/verify-2fa', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'guest', 'verify-2fa', 'verify-2fa.html'));
});

// Route for admin dashboard
router.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'admin', 'admin-dashboard.html'));
});

// Route for athlete dashboard
router.get('/athlete-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'athlete', 'athlete-dashboard.html'));
});

// Route for member dashboard
router.get('/member-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'member', 'member-dashboard.html'));
});

// Route for chatbot page
router.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'chatbot.html'));
});

module.exports = router;
