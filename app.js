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

// Level contents
const levelContent = {
  1: {
    instructions: `
        <h2>Мисия</h2>
        <p>
          Довършете едноредовата инструкция <strong>cout<<</strong> между <strong>main()</strong> и <strong>return 0;</strong>.<br>
          Тя трябва да изведе точно <strong>Hello, C++ World!</strong> и да завършва с точка и запетая.<br>
          За да изведете текста в командата той трябва да е в кавички <strong>" "</strong> <br>
          и след тях да завършите с точка и запетая <strong>;</strong>
        </p>
      `,
    playground:  `
        <div id="codeWrapper">
          <pre class="codeLine">#include &lt;iostream&gt;</pre>
          <pre class="codeLine">using namespace std;</pre>
          <pre class="codeLine">int main() {</pre>
          <input type="text" id="codeInput" class="codeInput form-control my-2" placeholder='Пишете тук...' />
          <pre class="codeLine">    return 0;</pre>
          <pre class="codeLine">}</pre>
        </div>
        <button id="runBtn" class="btn btn-primary mt-3">Стартирай кода</button>
        <div id="outputWindow" class="mt-3 border p-3 rounded"></div>
        <div id="levelButtons" class="d-flex flex-wrap gap-2 mt-3">
          <button id="nextLevelBtn" class="btn btn-success" style="display:none;">Следващо ниво</button>
          <button id="prevLevelBtn" class="btn btn-warning" style="display:none;">Предишно ниво</button>
          <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
        </div>
      `,
    scripts: `
      <script>
        document.addEventListener("DOMContentLoaded", () => {
          const input = document.getElementById('codeInput');
          const output = document.getElementById('outputWindow');
          const runBtn = document.getElementById('runBtn');
          const nextBtn = document.getElementById('nextLevelBtn');
          const pattern = /^\\s*cout\\s*<<\\s*"Hello,\\s*C\\+\\+\\s*World!"\\s*;\\s*$/;

          runBtn.addEventListener('click', () => {
            const code = input.value.trim();
            if (pattern.test(code)) {
              output.innerHTML = '✅ Правилно! Hello, C++ World!';
              nextBtn.style.display = 'inline-block';
            } else {
              output.innerHTML = '⛔ Проверете синтаксиса.';
            }
          });
          nextBtn.addEventListener('click', () => {
        window.location.href = '/levels/2';
      });
        });
      </script>
    `
  },
  //level 2
  2: {
      instructions: `
        <h2>Мисия</h2>
        <p>Добавете два реда C++ код между <strong>main()</strong> и <strong>return 0;</strong></p>
        <ol>
          <p><strong>1. cin >> name;</strong> за въвеждане на вход от потребителя.</p>
          <p><strong>2. cout << "Hello, " << name << "!";</strong> за поздрав.</p>
          Трябва да изведе точно <strong>Hello, "въведеното от вас име"</strong>
        </ol>
      
      `,
    playground: `
        <div id="codeWrapper">
          <pre class="codeLine">#include &lt;iostream&gt;</pre>
          <pre class="codeLine">using namespace std;</pre>
          <pre class="codeLine">int main() {</pre>
          <pre class="codeLine">    string name;</pre>
          <input type="text" id="line1" class="codeInput form-control my-2" placeholder='Пишете тук...' />
          <input type="text" id="line2" class="codeInput form-control my-2" placeholder='Пишете тук...' />
          <pre class="codeLine">    return 0;</pre>
          <pre class="codeLine">}</pre>
        </div>
        <button id="runBtn" class="btn btn-primary mt-3">Стартирай кода</button>
        <div id="nameInputWrapper" style="display:none;" class="mt-3">
          <input type="text" id="userInput" class="form-control" placeholder="Въведете име..." />
          <button id="sayHelloBtn" class="btn btn-success mt-2">Изведи поздрав</button>
        </div>
        <div id="outputWindow" class="mt-3 border p-3 rounded"></div>
        <div id="levelButtons" class="d-flex flex-wrap gap-2 mt-3">
          <button id="nextLevelBtn" class="btn btn-success" style="display:none;">Следващо ниво</button>
          <button id="prevLevelBtn" class="btn btn-warning">Предишно ниво</button>
          <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
        </div>
      `,
    scripts: `
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const input1 = document.getElementById('line1');
      const input2 = document.getElementById('line2');
      const runBtn = document.getElementById('runBtn');
      const output = document.getElementById('outputWindow');
      const userInputWrapper = document.getElementById('nameInputWrapper');
      const userInput = document.getElementById('userInput');
      const sayHelloBtn = document.getElementById('sayHelloBtn');
      const nextBtn = document.getElementById('nextLevelBtn');
      const prevBtn = document.getElementById('prevLevelBtn');

      const cinPattern = /^\\s*cin\\s*>>\\s*name\\s*;\\s*$/;
      const coutPattern = /^\\s*cout\\s*<<\\s*"Hello,\\s*"\\s*<<\\s*name\\s*<<\\s*"!"\\s*;\\s*$/;

      runBtn.addEventListener('click', () => {
        const code1 = input1.value.trim();
        const code2 = input2.value.trim();

        if (cinPattern.test(code1) && coutPattern.test(code2)) {
          output.innerHTML = '<span class="success">✅ Правилно! Въведете име:</span>';
          userInputWrapper.style.display = 'block';
        } else {
          output.innerHTML = '<span class="error">⛔ Грешка! Проверете кода.</span>';
          userInputWrapper.style.display = 'none';
        }
      });

      sayHelloBtn.addEventListener('click', () => {
        const name = userInput.value.trim();
        if (name) {
          output.innerHTML = '<span class="success">Hello, ' + name + '!</span>';
          nextBtn.style.display = 'inline-block';
        } else {
          output.innerHTML = '<span class="error">⛔ Въведете име!</span>';
        }
      });
        nextBtn.addEventListener('click', () => {
          window.location.href = '/levels/3';
        });

        prevBtn.addEventListener('click', () => {
          window.location.href = '/levels/1';
        });
    });
  </script>
`
  }
};


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
  const baseLevel = levels.find(l => l.number === levelNumber);

  if (!baseLevel) {
    return res.status(404).render('error', { message: 'Невалидно ниво!' });
  }

  // Merge basic level info with its content (if exists)
  const content = levelContent[levelNumber] || {
    instructions: `<h2>Ниво ${levelNumber}</h2><p>Съдържанието за това ниво все още не е добавено.</p>`,
    playground: `<p>Очаквайте скоро!</p>`,
    scripts: ''
  };

  // Combine both objects
  const level = { ...baseLevel, ...content };

  res.render('level', { level, levels });
});



// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
