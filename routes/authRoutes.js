const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Homepage
router.get('/', authController.getHomepage);

// Auth GET routes
router.get('/auth/register', authController.getRegisterPage);
router.get('/auth/login', authController.getLoginPage);

// Auth POST routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;