const express = require('express');
const passport = require('passport');
const router = express.Router();
const { handleLogin, handleLogout } = require('../controllers/userController');
const validateLogout = require('../validations/userValidation');

// Route for Google OAuth login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// OAuth callback URL
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), handleLogin);

// Logout route with email notification
router.get('/logout', validateLogout, handleLogout);

module.exports = router;
