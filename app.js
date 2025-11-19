const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// ======================
// APPLICATION SETUP
// ======================

// Body parser for POST forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS setup (Views)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (Public)
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// ROUTES
// ======================
const authRoutes = require('./routes/authRoutes.js');
const levelRoutes = require('./routes/levelRoutes.js');

app.use('/', authRoutes); // Handles /auth/login, /register, /
app.use('/', levelRoutes); // Handles /main, /levels/:number

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});