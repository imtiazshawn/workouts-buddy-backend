const express = require('express');
const { loginUser, signupUser } = require('../Controllers/userControllers');
const router = express.Router();

// Login User
router.post('/login', loginUser);

// Signup
router.post('/signup', signupUser);

module.exports = router;