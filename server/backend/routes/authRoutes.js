import express from 'express';
import { login, register } from '../controllers/authController.js'; // Adjust paths to your controllers

const router = express.Router();

// Resolves to /api/auth/login
router.post('/login', login);

// Resolves to /api/auth/register
router.post('/register', register);

export default router;