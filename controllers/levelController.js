const LevelModel = require('../models/level');

// GET /main - Main menu (shows levels)
exports.getMainMenu = (req, res) => {
    const levels = LevelModel.getAllLevels();
    const isGuest = req.query.guest === 'true';
    // Renders the view 'main.ejs'
    res.render('layouts/main', { levels, guest: isGuest });
};

// GET /levels/:number - Dynamic level page
exports.getLevelPage = (req, res) => {
    const levelNumber = parseInt(req.params.number);
    
    // Use the model to fetch combined level data
    const level = LevelModel.getLevelByNumber(levelNumber);
    
    if (!level) {
        // You should create a 'views/errors/error.ejs' file for a clean error page
        return res.status(404).render('error', { message: 'Невалидно ниво!' });
    }

    const allLevels = LevelModel.getAllLevels();

    // Renders the view 'level.ejs'
    res.render('levels/level', { level, levels: allLevels });
};