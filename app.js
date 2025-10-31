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
// Levels Instructions
// ======================
const levels = [
  {
    number: 1,
    title: 'C++ Ниво 1',
    instructions: `
      <h2>Мисия</h2>
      <p>Довършете едноредовата инструкция <strong>cout&lt;&lt;</strong> между main() и return 0;
      Тя трябва да изведе точно <strong>Hello, C++ World!</strong></p>
    `,
    code: `
      <pre>#include &lt;iostream&gt;</pre>
      <pre>using namespace std;</pre>
      <pre>int main() {</pre>
      <input type="text" id="codeInput" placeholder='cout<<"Hello, C++ World!";' autocomplete="off" />
      <pre>return 0;</pre>
      <pre>}</pre>
    `,
    pattern: /^\s*cout\s*<<\s*"Hello,\s*C\+\+\s*World!"\s*;\s*$/
  },
  {
    number: 2,
    title: 'C++ Ниво 2',
    instructions: `
      <h2>Мисия</h2>
      <p>Изведете съобщението <strong>I love programming!</strong> с cout.</p>
    `,
    code: `
      <pre>#include &lt;iostream&gt;</pre>
      <pre>using namespace std;</pre>
      <pre>int main() {</pre>
      <input type="text" id="codeInput" placeholder='cout<<"I love programming!";' autocomplete="off" />
      <pre>return 0;</pre>
      <pre>}</pre>
    `,
    pattern: /^\s*cout\s*<<\s*"I love programming!"\s*;\s*$/
  }
];

// ======================
// Routes
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
  res.redirect('/levels');
});

// Guest access
app.get('/main', (req, res) => {
  const isGuest = req.query.guest === 'true';
  res.render('main', { guest: isGuest, levels });
});

// Menu page with all levels
app.get('/levels', (req, res) => {
  res.render('menu', { levels });
});

// Individual level page
app.get('/levels/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const level = levels.find(l => l.number === id);
  if (!level) return res.status(404).send('Level not found');
  res.render('levels', { level });
});

// ======================
// Start server
// ======================
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
