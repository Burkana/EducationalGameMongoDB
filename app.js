const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Body parser for POST forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// LEVELS DATA
// ======================
const levels = [
  { number: 1, title: 'C++ Ниво 1' },
  { number: 2, title: 'C++ Ниво 2' },
  { number: 3, title: 'C++ Ниво 3' },
  { number: 4, title: 'C++ Ниво 4' },
  { number: 5, title: 'C++ Ниво 5' },
  { number: 6, title: 'C++ Ниво 6' },
  { number: 7, title: 'C++ Ниво 7' },
  { number: 8, title: 'C++ Ниво 8' },
  { number: 9, title: 'C++ Ниво 9' },
  { number: 10, title: 'C++ Ниво 10' }
];

// ======================
// ROUTES
// ======================

// Homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Auth routes
app.get('/auth/register', (req, res) => {
  res.render('auth/register');
});

app.get('/auth/login', (req, res) => {
  res.render('auth/login');
});

// Handle registration (dummy example)
app.post('/register', (req, res) => {
  const { names, email, passwords } = req.body;
  console.log('Register:', names, email, passwords);
  res.redirect('/auth/login');
});

// Handle login (dummy example)
app.post('/login', (req, res) => {
  const { email, passwords } = req.body;
  console.log('Login:', email, passwords);
  res.redirect('/main');
});

// Main menu (shows levels)
app.get('/main', (req, res) => {
  const isGuest = req.query.guest === 'true';
  res.render('main', { levels, guest: isGuest });
});

// ✅ Dynamic level route (used by scriptlevel.js and level.ejs)
app.get('/levels/:number', (req, res) => {
  const levelNumber = parseInt(req.params.number);
  const level = levels.find(l => l.number === levelNumber);
  if (!level) return res.status(404).send('Невалидно ниво!');
  res.render('level', { level });
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 <!-- ✅ Pass level number from backend to JS -->