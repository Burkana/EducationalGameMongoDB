const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

// Main menu (shows levels)
router.get('/main', levelController.getMainMenu);

// Dynamic level route
router.get('/levels/:number', levelController.getLevelPage);

module.exports = router;