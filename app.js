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
  { number: 5, title: 'C++ Ниво 5' }
];

// Level contents
const levelContent = {
  1: {
    instructions: `
        <h3>Мисия</h3>
        <p>
          Довършете едноредовата инструкция <strong>cout<<</strong> между <strong>main()</strong> и <strong>return 0;</strong>.<br>
          Тя трябва да изведе точно <strong>Hello, C++ World!</strong> и да завършва с точка и запетая.<br>
           <ol>
          <p><strong>1. cout<<"Hello, C++ World!"; </strong> за въвеждане на вход от потребителя.</p>
        </ol>
        </p>
      `,
    playground:  `
        <div id="codeWrapper">
          <pre class="codeLine">#include &lt;iostream&gt;</pre>
          <pre class="codeLine">using namespace std;</pre>
          <pre class="codeLine">int main() {</pre>
           <input type="text" id="line1" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
          <pre class="codeLine">    return 0;</pre>
          <pre class="codeLine">}</pre>
        </div>
        <button id="runBtn" class="btn btn-primary mt-3">Стартирай кода</button>
        <div id="outputWindow"></div>
        <div id="levelButtons">
          <button id="nextLevelBtn" class="btn btn-success" style="display:none;">Следващо ниво</button>
          <button id="prevLevelBtn" class="btn btn-warning" style="display:none;">Предишно ниво</button>
          <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
        </div>
      `,
    scripts: `
      <script>
        document.addEventListener("DOMContentLoaded", () => {
          const input = document.getElementById('line1');
          const output = document.getElementById('outputWindow');
          const runBtn = document.getElementById('runBtn');
          const nextBtn = document.getElementById('nextLevelBtn');
          const pattern = /^\\s*cout\\s*<<\\s*"Hello,\\s*C\\+\\+\\s*World!"\\s*;\\s*$/;

          runBtn.addEventListener('click', () => {
            const code = input.value.trim();
            if (pattern.test(code)) {
              output.innerHTML ='✅ Правилно! <br> <span class="success">Hello, C++ World!</span>';
              nextBtn.style.display = 'inline-block';
            } else {
              output.innerHTML = '<span class="error">⛔ Имате грешка!</span>';
            }
          });
          nextBtn.addEventListener('click', () => {
        window.location.href = '/levels/2';
      });
        });
      </script>
    `
  },
  2: {
      instructions: `
        <h3>Мисия</h3>
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
          <pre class="codeLine">string name;</pre>
       <input type="text" id="line1" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <input type="text" id="line2" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
          <pre class="codeLine">return 0;</pre>
          <pre class="codeLine">}</pre>
        </div>
        <button id="runBtn" class="btn btn-primary mt-3">Стартирай кода</button>
        <div id="nameInputWrapper" style="display:none;" class="mt-3">
          <input type="text" id="userInput" class="form-control" placeholder="Въведете име..." />
          <button id="sayHelloBtn" class="btn btn-success mt-2">Изведи поздрав</button>
        </div>
        <div id="outputWindow"></div>
        <div id="levelButtons">
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
     
      const check = (cin1, cin2) => {
      const c1 = /^\\s*cin\\s*>>\\s*name\\s*;\\s*$/.test(cin1);
      const c2= /^\\s*cout\\s*<<\\s*"Hello,\\s*"\\s*<<\\s*name\\s*<<\\s*"!"\\s*;\\s*$/.test(cin2);
        if (c1 && c2) return { ok: true };
        if (!c1) return { ok: false, msg: 'на ред 1' };
        if (!c2) return { ok: false, msg: 'на ред 2' };
        return { ok: false, msg: 'Напишете код!' };
      }

      runBtn.addEventListener('click', () => {
        const code1 = input1.value.trim();
        const code2 = input2.value.trim();
        
        const result = check(code1, code2);

        if (result.ok) {
          output.innerHTML = '✅ Правилно! Въведете име:';
          userInputWrapper.style.display = 'block';
        } else {
          output.innerHTML = \`<span class="error">⛔Грешка \${result.msg}</span>\`;
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
  },
  3: {
      instructions: `
        <h3>Мисия</h3>
    <p>Напишете програма, която въвежда две цели числа и извежда тяхната сума.</p>
    <ol>
      <p><strong>1. cin >> a;</strong> – за въвеждане на първото число</p>
      <p><strong>2. cin >> b;</strong> – за въвеждане на второто число</p>
      <p><strong>3. cout << a + b;</strong> – за извеждане на резултата</p>
     
    </ol>
      
      `,
    playground: `
       <div id="codeWrapper">
      <pre class="codeLine">#include &lt;iostream&gt;</pre>
      <pre class="codeLine">using namespace std;</pre>
      <pre class="codeLine">int main() {</pre>
      <pre class="codeLine">int a, b;</pre>
      <input type="text" id="codeInput1" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <input type="text" id="codeInput2" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <input type="text" id="codeInput3" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <pre class="codeLine">return 0;</pre>
      <pre class="codeLine">}</pre>
    </div>

    <button id="runBtn">Стартирай кода</button>

    <div id="nameInputWrapper" style="display:none; margin-top: 0.5rem;">
      <input type="number" id="inputA" placeholder="Първо число" />
      <input type="number" id="inputB" placeholder="Второ число" />
      <button id="sayHelloBtn" style="margin-left:0.5rem;">Изведи сбор</button>
    </div>

    <div id="outputWindow"></div>

    <div id="levelButtons">
      <button id="nextLevelBtn" class="btn btn-success" style="display: none;">Следващо ниво</button>
      <button id="prevLevelBtn" class="btn btn-warning" style="display: block;">Предишно ниво</button>
        <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
    </div>
  `,
    scripts: `
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const input1 = document.getElementById('codeInput1');
      const input2 = document.getElementById('codeInput2');
      const input3 = document.getElementById('codeInput3');
      const runBtn = document.getElementById('runBtn');
      const output = document.getElementById('outputWindow');
      const nextBtn = document.getElementById('nextLevelBtn');
      const prevBtn = document.getElementById('prevLevelBtn');
      const nameWrapper = document.getElementById('nameInputWrapper');
      const inputA = document.getElementById('inputA');
      const inputB = document.getElementById('inputB');
      const sayHelloBtn = document.getElementById('sayHelloBtn');

      const check = (cin1, cin2, coutLine) => {
        const c1 = /^\\s*cin\\s*>>\\s*a\\s*;\\s*$/.test(cin1);
        const c2 = /^\\s*cin\\s*>>\\s*b\\s*;\\s*$/.test(cin2);
        const c3 = /^\\s*cout\\s*<<\\s*a\\s*\\+\\s*b\\s*;\\s*$/.test(coutLine);
        if (c1 && c2 && c3) return { ok: true };
        if (!c1) return { ok: false, msg: 'на ред 1' };
        if (!c2) return { ok: false, msg: 'на ред 2' };
        if (!c3) return { ok: false, msg: 'на ред 3' };
        return { ok: false, msg: 'Напишете код!' };
      };

      runBtn.addEventListener('click', () => {
  const code1 = input1.value.trim();
  const code2 = input2.value.trim();
  const code3 = input3.value.trim();

  const result = check(code1, code2, code3);

  if (result.ok) {
    output.innerHTML = '✅ Правилно! Въведете числа:';
    nameWrapper.style.display = 'block';
  } else {
    output.innerHTML = \`<span class="error">⛔Грешка \${result.msg}</span>\`;
    nameWrapper.style.display = 'none';
  }
});


      sayHelloBtn.addEventListener('click', () => {
        const a = parseInt(inputA.value);
        const b = parseInt(inputB.value);
        if (isNaN(a) || isNaN(b)) {
          output.innerHTML = '<span class="error">⛔ Въведете валидни цели числа!</span>';
          return;
        }
        const sum = a + b;
        output.innerHTML = '<span class="success">' + a + ' + ' + b + ' = ' + sum + '</span><br>✅ Нивото е преминато!';
        nextBtn.style.display = 'inline-block';
      });

      nextBtn.addEventListener('click', () => {
        window.location.href = '/levels/4';
      });

      prevBtn.addEventListener('click', () => {
        window.location.href = '/levels/2';
      });
    });
  </script>`
  },
  4: {
      instructions: `
  <h3>Мисия</h3>
  <p>
    Използвай <strong>while</strong> цикъл, за да отпечаташ числата от <strong>1 до 5</strong>.<br><br>
    Добави 4 реда между <b>int i = 1;</b> и <b>return 0;</b>
  </p>
  <ol>
    <p>1. while (i &lt;= 5) {</p>
    <p>2. cout << i;</p>
    <p>3. i++;</p>
    <p>4. }</p>
  </ol>
  <p>
    Увери се, че използваш правилно синтаксиса:<br>
    - Всички редове завършват с <strong>точка и запетая</strong>, освен отварящия { и затварящия }.<br>
    - Няма допълнителни интервали, символи или липсващи елементи.
  </p>
      
      `,
    playground: `
  <div id="codeWrapper">
    <pre class="codeLine">#include &lt;iostream&gt;</pre>
    <pre class="codeLine">using namespace std;</pre>
    <pre class="codeLine">int main() {</pre>
    <pre class="codeLine">int i = 1;</pre>
    <input type="text" id="codeInput1" class="codeInput" placeholder="Пишете тук..." autocomplete="off"/>
    <input type="text" id="codeInput2" class="codeInput" placeholder="Пишете тук..." autocomplete="off"/>
    <input type="text" id="codeInput3" class="codeInput" placeholder="Пишете тук..." autocomplete="off"/>
    <input type="text" id="codeInput4" class="codeInput" placeholder="Пишете тук..." autocomplete="off"/>
    <pre class="codeLine">return 0;</pre>
    <pre class="codeLine">}</pre>
  </div>

  <button id="runBtn">Стартирай кода</button>

  <div id="outputWindow"></div>

  <div id="levelButtons">
    <button id="nextLevelBtn" class="btn btn-success" style="display: none;">Следващо ниво</button>
    <button id="prevLevelBtn" class="btn btn-warning" style="display: block;">Предишно ниво</button>
      <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
  </div>
`,
   scripts: `
 <script>
 document.addEventListener("DOMContentLoaded", () => {
      const inputs = [
        document.getElementById('codeInput1'),
        document.getElementById('codeInput2'),
        document.getElementById('codeInput3'),
        document.getElementById('codeInput4')
      ].filter(Boolean);

      const runBtn = document.getElementById('runBtn');
      const output = document.getElementById('outputWindow');
      const nextBtn = document.getElementById('nextLevelBtn');
      const prevBtn = document.getElementById('prevLevelBtn'); 

      inputs.forEach((input, i) => {
        input.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (i < inputs.length - 1) inputs[i + 1].focus();
            else runBtn.click();
          }
        });
      });

      const patterns = [
        /^\\s*while\\s*\\(\\s*i\\s*<=\\s*5\\s*\\)\\s*\\{\\s*$/,  
        /^\\s*cout\\s*<<\\s*i\\s*;\\s*$/, 
        /^\\s*i\\s*\\+\\+\\s*;\\s*$/,
        /^\\s*\\}\\s*$/ 
      ];

      runBtn.addEventListener('click', () => {
        let ok = true;

        for (let i = 0; i < inputs.length; i++) {
          const code = inputs[i].value.trim();
          
          if (!patterns[i]?.test(code)) {
            ok = false;
            output.innerHTML = \`<span class="error">⛔ Грешка в ред \${i + 1}</span>\`;
            break;
          }
        }

        if (ok) {
     
          output.innerHTML = '<span class="success">12345</span><br><br>✅ Правилно! Нивото е преминато!';
          nextBtn.style.display = 'inline-block';
        } else {
          nextBtn.style.display = 'none';
        }
      });

      nextBtn.addEventListener('click', () => {
        window.location.href = '/levels/5';
      });

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          window.location.href = '/levels/3';
        });
      }
    });
  </script>
      `
  },
  5: {
      instructions: `
  <h3>Мисия</h3>
  <p>
    Сега ще добавим вход от потребителя!<br><br>
    <strong>1.</strong> Използвай <b>cin >> n;</b> за да въведеш число от потребителя.<br>
    <strong>2.</strong> Използвай <b>for</b> цикъл, за да отпечаташ числата от 1 до <b>n</b>.<br><br>

    <strong>Пример:</strong> ако въведеш 4, изходът трябва да е <b>1 2 3 4</b>
  </p>
  <ol>
    <p>1. cin >> n;</p>
    <p>2. for (i = 1; i &lt;= n; i++) {</p>
    <p>3. cout << i << " ";</p>
    <p>4. }</p>
  </ol>
  <p>
    Увери се, че всички редове завършват с <b>;</b>или <b>{ }</b>, както е нужно.
  </p>
      
      `,
    playground:`
  <div id="codeWrapper">
    <pre class="codeLine">#include &lt;iostream&gt;</pre>
    <pre class="codeLine">using namespace std;</pre>
    <pre class="codeLine">int main() {</pre>
    <pre class="codeLine">int i, n;</pre>
    <input type="text" id="codeInput1" class="codeInput" placeholder="Пишете тук..." autocomplete="off"/>
    <input type="text" id="codeInput2" class="codeInput" placeholder="Пишете тук..." autocomplete="off"/>
    <input type="text" id="codeInput3" class="codeInput" placeholder='Пишете тук...' autocomplete="off"/>
    <input type="text" id="codeInput4" class="codeInput" placeholder="Пишете тук..." autocomplete="off"/>
    <pre class="codeLine">return 0;</pre>
    <pre class="codeLine">}</pre>
  </div>

  <button id="runBtn">Стартирай кода</button>

  <div id="userInputWrapper" style="display: none; margin-top:1rem;">
  <input type="number" id="userInput" placeholder="Въведи число n..." style="padding:0.5rem;border-radius:6px;width:100%;" />
  <button id="sayHelloBtn" style="margin-top:0.5rem;">Изпълни</button>
</div>


  <div id="outputWindow"></div>

  <div id="levelButtons">
    <button id="nextLevelBtn" class="btn btn-success" style="display: none;">Следващо ниво</button>
    <button id="prevLevelBtn" class="btn btn-warning" style="display: block;">Предишно ниво</button>
     <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
  </div>
`,
   scripts: `
<script>
document.addEventListener("DOMContentLoaded", () => {
  const [in1, in2, in3, in4] = [
    document.getElementById('codeInput1'),
    document.getElementById('codeInput2'),
    document.getElementById('codeInput3'),
    document.getElementById('codeInput4')
  ];
  const userInputWrapper = document.getElementById('userInputWrapper');
  const runBtn = document.getElementById('runBtn');
  const output = document.getElementById('outputWindow');
  const nextBtn = document.getElementById('nextLevelBtn');
  const prevBtn = document.getElementById('prevLevelBtn');
  const userInput = document.getElementById('userInput');
  const sayHelloBtn = document.getElementById('sayHelloBtn');

  const inputs = [in1, in2, in3, in4];

 inputs.forEach((input, i) => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (i < inputs.length - 1) inputs[i + 1].focus();
        else runBtn.click();
      }
    });
  });

  const patterns = [
    // 1. cin >> n;
    /^\\s*cin\\s*>>\\s*n\\s*;\\s*$/,                       
    // 2. for (i = 1; i <= n; i++) {
    /^\\s*for\\s*\\(\\s*i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*n\\s*;\\s*i\\+\\+\\s*\\)\\s*\\{\\s*$/, 
    // 3. cout << i << " "; 
    /^\\s*cout\\s*<<\\s*i\\s*<<\\s*"\\s*"\\s*;\\s*$/,           
    // 4. }
    /^\\s*\\}\\s*$/,                                      
  ];

  runBtn.addEventListener('click', () => {
    let ok = true;
    for (let i = 0; i < inputs.length; i++) {
      const code = inputs[i].value.trim();
      if (!patterns[i].test(code)) {
        ok = false;
        output.innerHTML = \`<span class="error">⛔ Грешка в ред \${i + 1}</span>\`;
        break;
      }
    }
    if (ok) {
      output.innerHTML = '✅ Правилно! Въведи число:';
      if (userInputWrapper) userInputWrapper.style.display = 'block';
      nextBtn.style.display = 'none'; // next only after user input
    } else {
      nextBtn.style.display = 'none';
      if (userInputWrapper) userInputWrapper.style.display = 'none';
    }
  });

  // Execute program simulation
  sayHelloBtn.addEventListener('click', () => {
    const val = parseInt(userInput.value, 10);
    if (isNaN(val) || val < 1) {
      output.innerHTML = \`<span class="error">⛔ Моля въведи число по-голямо от 0</span>\`;
      return;
    }
    let result = '';
    for (let i = 1; i <= val; i++) {
      result += i + ' ';
    }
    output.innerHTML = \`<span class="success">\${result.trim()}</span><br><br>✅ Нивото е преминато!\`;
    if (userInputWrapper) userInputWrapper.style.display = 'none';
  });

    prevBtn.addEventListener('click', () => {
      window.location.href = '/levels/4';
    });
});
</script>
`
  },
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

app.post('/register', (req, res) => {
  const { names, email, passwords } = req.body;
  console.log('Register:', names, email, passwords);
  res.redirect('/auth/login');
});

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


  const content = levelContent[levelNumber]

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
