const express = require('express');
const { login, register } = require('../controller/authController');

const router = express.Router();

// Resolves to /api/auth/login
router.post('/login', login);

// Resolves to /api/auth/register
router.post('/register', register);

module.exports = router;