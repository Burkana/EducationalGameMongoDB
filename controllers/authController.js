// GET / - Homepage
exports.getHomepage = (req, res) => {
    // Renders the view 'index.ejs'
     res.render('layouts/index');
};

// GET /auth/register
exports.getRegisterPage = (req, res) => {
    // Renders the view 'auth/register.ejs' (You need to update your views folder structure)
    res.render('auth/register');
};

// GET /auth/login
exports.getLoginPage = (req, res) => {
    res.render('auth/login');
};

// POST /register
exports.registerUser = (req, res) => {
    const { names, email, passwords } = req.body;
    console.log('Register:', names, email, passwords);
    res.redirect('/auth/login');
};

// POST /login
exports.loginUser = (req, res) => {
    const { email, passwords } = req.body;
    console.log('Login:', email, passwords);
    res.redirect('/main');
};