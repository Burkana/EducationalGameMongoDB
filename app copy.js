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
           <input type="text" id="line1" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
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
          const input = document.getElementById('line1');
          const output = document.getElementById('outputWindow');
          const runBtn = document.getElementById('runBtn');
          const nextBtn = document.getElementById('nextLevelBtn');
          const pattern = /^\\s*cout\\s*<<\\s*"Hello,\\s*C\\+\\+\\s*World!"\\s*;\\s*$/;

          runBtn.addEventListener('click', () => {
            const code = input.value.trim();
            if (pattern.test(code)) {
              output.innerHTML = '✅ Правилно!';
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
       <input type="text" id="line1" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <input type="text" id="line2" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
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
  },
  //level 3
  3: {
      instructions: `
        <h2>Мисия</h2>
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
      <pre class="codeLine">    int a, b;</pre>
      <input type="text" id="codeInput1" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <input type="text" id="codeInput2" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <input type="text" id="codeInput3" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <pre class="codeLine">    return 0;</pre>
      <pre class="codeLine">}</pre>
    </div>

    <button id="runBtn">Стартирай кода</button>

    <div id="nameInputWrapper" style="display:none; margin-top: 1rem;">
      <input type="number" id="inputA" placeholder="Първо число" />
      <input type="number" id="inputB" placeholder="Второ число" />
      <button id="sayHelloBtn" style="margin-left:0.5rem;">Изведи сбор</button>
    </div>

    <div id="outputWindow"></div>

    <div id="levelButtons">
      <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
      <button id="prevLevelBtn" style="display: block;">Предишно ниво</button>
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
        const coutOk = /^\\s*cout\\s*<<\\s*a\\s*\\+\\s*b\\s*;\\s*$/.test(coutLine);
        if (c1 && c2 && coutOk) return { ok: true };
        if (!c1) return { ok: false, msg: 'cin редът трябва да е: cin >> a;' };
        if (!c2) return { ok: false, msg: 'cin редът трябва да е: cin >> b;' };
        if (!coutOk) return { ok: false, msg: 'cout редът трябва да е: cout << a + b;' };
        return { ok: false, msg: 'Проверете синтаксиса и форматирането.' };
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
    output.innerHTML = \`<span class="error">⛔ \${result.msg}</span>\`;
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
  //level 4
  4: {
      instructions: `
    <h2>Мисия</h2>
    <p>
      Добавете if условие в C++, което проверява дали стойността на променливата <strong>score</strong> е по-голяма или равна на 50.<br>
      Ако условието е вярно, трябва да се изведе <strong>"Passed"</strong>.
    </p>
    <p>Напишете кода между <strong>main()</strong> и <strong>return 0;</strong>.</p>
  `,
    playground: `
    <div id="codeWrapper">
      <pre class="codeLine">#include &lt;iostream&gt;</pre>
      <pre class="codeLine">using namespace std;</pre>
      <pre class="codeLine">int main() {</pre>
      <pre class="codeLine">    int score = 60;</pre>
      <input type="text" id="codeInput1" class="codeInput" placeholder="Пишете тук..." autocomplete="off" spellcheck="false" />
      <input type="text" id="codeInput2" class="codeInput" placeholder='Пишете тук...' autocomplete="off" spellcheck="false" />
      <pre class="codeLine">    return 0;</pre>
      <pre class="codeLine">}</pre>
    </div>

    <button id="runBtn">Стартирай кода</button>
    <div id="outputWindow"></div>

    <div id="levelButtons">
      <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
      <button id="prevLevelBtn" style="display: block;">Предишно ниво</button>
        <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
    </div>
  `,
    scripts: `
  <script>
  document.addEventListener("DOMContentLoaded", () => {
    const input1 = document.getElementById('codeInput1');
    const input2 = document.getElementById('codeInput2');
    const runBtn = document.getElementById('runBtn');
    const output = document.getElementById('outputWindow');
    const nextBtn = document.getElementById('nextLevelBtn');
    const prevBtn = document.getElementById('prevLevelBtn');

   // Enter key navigation
input1.addEventListener('keydown', e => {
  if (e.key === 'Enter') { 
    e.preventDefault(); 
    input2.focus(); 
  }
});

input2.addEventListener('keydown', e => {
  if (e.key === 'Enter') { 
    e.preventDefault(); 
    runBtn.click(); 
  }
});

// Regex patterns for correct answer
const ifPattern = /^\s*if\s*\(\s*score\s*>=\s*50\s*\)\s*$/;
const coutPattern = /^\s*cout\s*<<\s*"Passed"\s*;\s*$/;

runBtn.addEventListener('click', () => {
  const code1 = input1.value.trim();
  const code2 = input2.value.trim();

  const okIf = ifPattern.test(code1);
  const okCout = coutPattern.test(code2);

  if (okIf && okCout) {
    output.innerHTML = '✅ Правилно!';
    nextBtn.style.display = 'inline-block';
  } else {
    let msg = '⛔ Проверете синтаксиса.';
    if (!okIf) msg = '⛔ Проверете ред 1.';
    else if (!okCout) msg = '⛔ Проверете ред2.';
    output.innerHTML = \`<span class="error">\${msg}</span>\`;
  }
});


    // Next and previous navigation
    nextBtn.addEventListener('click', () => {
      window.location.href = '/levels/5';
    });

    prevBtn.addEventListener('click', () => {
      window.location.href = '/levels/3';
    });
  });
  </script>
  `
  },
  //level 5
  5: {
      instructions: `
        <h2>Мисия</h2>
    <p>
      Попълнете условие с <code>if</code> и <code>else</code> на два реда:<br>
      <strong>Първи ред:</strong> ако <code>score >= 50</code>, изведете <code>"Passed"</code><br>
      <strong>Втори ред:</strong> <code>else</code> изведете <code>"Failed"</code><br>
    </p>
      
      `,
    playground: `
    <div id="codeWrapper">
      <pre class="codeLine">#include &lt;iostream&gt;</pre>
      <pre class="codeLine">using namespace std;</pre>
      <pre class="codeLine">int main() {</pre>
      <pre class="codeLine">    int score = 40;</pre>
      <input type="text" id="codeInput1" class="codeInput" placeholder='' autocomplete="off"/>
      <input type="text" id="codeInput2" class="codeInput" placeholder='' autocomplete="off"/>
      <pre class="codeLine">    return 0;</pre>
      <pre class="codeLine">}</pre>
    </div>

    <button id="runBtn">Стартирай кода</button>
    <div id="outputWindow"></div>
    <div id="levelButtons">
      <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
      <button id="prevLevelBtn" style="display: block;">Предишно ниво</button>
        <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
    </div>
  `,
    scripts: `
  <script>
  document.addEventListener("DOMContentLoaded", () => {
    const input1 = document.getElementById('codeInput1');
    const input2 = document.getElementById('codeInput2');
    const runBtn = document.getElementById('runBtn');
    const output = document.getElementById('outputWindow');
    const nextBtn = document.getElementById('nextLevelBtn');
    const prevBtn = document.getElementById('prevLevelBtn');

   // Handle Enter key
input1.addEventListener('keydown', e => {
  if (e.key === 'Enter') { 
    e.preventDefault(); 
    input2.focus(); 
  }
});

input2.addEventListener('keydown', e => {
  if (e.key === 'Enter') { 
    e.preventDefault(); 
    runBtn.click(); 
  }
});

// Regex patterns
const validLine1 = /^\s*if\s*\(\s*score\s*>=\s*50\s*\)\s*cout\s*<<\s*"Passed"\s*;\s*$/;
const validLine2 = /^\s*else\s*cout\s*<<\s*"Failed"\s*;\s*$/;

runBtn.addEventListener('click', () => {
  const code1 = input1.value.trim();
  const code2 = input2.value.trim();

  const ok1 = validLine1.test(code1);
  const ok2 = validLine2.test(code2);

  if (ok1 && ok2) {
    output.innerHTML = '✅ Правилно!';
    nextBtn.style.display = 'inline-block';
  } else {
    let msg = '⛔ Проверете синтаксиса.';
    if (!ok1) msg = '⛔ Грешка в реда с if.';
    else if (!ok2) msg = '⛔ Грешка в реда с else.';
    output.innerHTML = \`<span class="error">\${msg}</span>\`;
  }
});


    // Navigation
    nextBtn.addEventListener('click', () => {
      window.location.href = '/levels/6';
    });

    prevBtn.addEventListener('click', () => {
      window.location.href = '/levels/4';
    });
  });
  </script>
  `
  },
  //level 6
  6: {
      instructions: `
    <h2>Мисия</h2>
    <p>
      Използвайте <code>switch(day)</code> конструкция и попълнете 4 случая.<br>
      Всеки <code>case</code> трябва да показва ден от седмицата.<br><br>
      Пример: <code>case 1: cout << "Monday"; break;<br>default: result = 'Invalid day';</code>
      
    </p>
  `,
    playground: `
  <div id="codeWrapper">
    <pre class="codeLine">#include &lt;iostream&gt;</pre>
    <pre class="codeLine">using namespace std;</pre>
    <pre class="codeLine">int main() {</pre>
    <pre class="codeLine">    int day;</pre>
    <pre class="codeLine">    cin >> day;</pre>
    <pre class="codeLine">    switch(day) {</pre>
    <input type="text" id="codeInput1" class="codeInput" placeholder='' autocomplete="off"/>
    <input type="text" id="codeInput2" class="codeInput" placeholder='' autocomplete="off"/>
    <input type="text" id="codeInput3" class="codeInput" placeholder='' autocomplete="off"/>
    <input type="text" id="codeInput4" class="codeInput" placeholder='' autocomplete="off"/>
    <input type="text" id="codeInput5" class="codeInput" placeholder='' autocomplete="off"/>
    <input type="text" id="codeInput6" class="codeInput" placeholder='' autocomplete="off"/>
    <input type="text" id="codeInput7" class="codeInput" placeholder='' autocomplete="off"/>
    <input type="text" id="codeInput8" class="codeInput" placeholder='default: cout << "Invalid day";' autocomplete="off"/>
    <pre class="codeLine">    }</pre>
    <pre class="codeLine">    return 0;</pre>
    <pre class="codeLine">}</pre>
  </div>

  <button id="runBtn">Стартирай кода</button>

  <div id="nameInputWrapper" style="display:none; margin-top: 1rem;">
    <input type="number" id="userInput" placeholder="Въведете число (1-7)" />
    <button id="sayHelloBtn">Провери деня</button>
  </div>

  <div id="outputWindow"></div>

  <div id="levelButtons">
    <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
    <button id="prevLevelBtn" style="display: block;">Предишно ниво</button>
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
    document.getElementById('codeInput4'),
    document.getElementById('codeInput5'),
    document.getElementById('codeInput6'),
    document.getElementById('codeInput7'),
    document.getElementById('codeInput8')
  ].filter(Boolean); // remove nulls

  const runBtn = document.getElementById('runBtn');
  const output = document.getElementById('outputWindow');
  const nextBtn = document.getElementById('nextLevelBtn');
  const prevBtn = document.getElementById('prevLevelBtn');
  const nameWrapper = document.getElementById('nameInputWrapper');
  const userInput = document.getElementById('userInput');
  const sayHelloBtn = document.getElementById('sayHelloBtn');

  // Enter navigation
  inputs.forEach((input, i) => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (i < inputs.length - 1) inputs[i + 1].focus();
        else runBtn.click();
      }
    });
  });

  // Define regex patterns for this level
  const patterns = [
  /^case\s*1\s*:\s*result\s*=\s*['"]Monday['"]\s*;\s*break\s*;\s*$/, 
  /^case\s*2\s*:\s*result\s*=\s*['"]Tuesday['"]\s*;\s*break\s*;\s*$/, 
  /^case\s*3\s*:\s*result\s*=\s*['"]Wednesday['"]\s*;\s*break\s*;\s*$/, 
  /^case\s*4\s*:\s*result\s*=\s*['"]Thursday['"]\s*;\s*break\s*;\s*$/,
  /^case\s*5\s*:\s*result\s*=\s*['"]Friday['"]\s*;\s*break\s*;\s*$/, 
  /^case\s*6\s*:\s*result\s*=\s*['"]Saturday['"]\s*;\s*break\s*;\s*$/, 
  /^case\s*7\s*:\s*result\s*=\s*['"]Sunday['"]\s*;\s*break\s*;\s*$/, 
  /^default\s*:\s*result\s*=\s*['"]Invalid\s*day['"]\s*;\s*$/,    
  ];

  // Run button: universal check
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
      output.innerHTML = '✅ Правилно!';
      nextBtn.style.display = 'inline-block';
      if (nameWrapper) nameWrapper.style.display = 'block';
    } else {
      if (nameWrapper) nameWrapper.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  });

  // Example program behavior
  sayHelloBtn?.addEventListener('click', () => {
    const val = parseInt(userInput.value.trim(), 10);
    let result = '';

    switch (val) {
      case 1: result = 'Monday'; break;
      case 2: result = 'Tuesday'; break;
      case 3: result = 'Wednesday'; break;
      case 4: result = 'Thursday'; break;
      case 5: result = 'Friday'; break;
      case 6: result = 'Saturday'; break;
      case 7: result = 'Sunday'; break;
      default: result = 'Invalid day';
    }

    output.innerHTML = \`<span class="success">\${result}</span><br><br>✅ Нивото е преминато!\`;
    nextBtn.style.display = 'inline-block';
  });

  // Navigation
  nextBtn.addEventListener('click', () => {
    window.location.href = '/levels/7';
  });

  prevBtn.addEventListener('click', () => {
    window.location.href = '/levels/5';
  });
});
  </script>
`
  },
  //level 7
  7: {
      instructions: `
  <h2>Мисия</h2>
  <p>
    Използвай <strong>while</strong> цикъл, за да отпечаташ числата от <strong>1 до 5</strong>.<br><br>
    Добави 4 реда между <code>int i = 1;</code> и <code>return 0;</code>:
  </p>
  <ol>
    <p>1. <code>while (i &lt;= 5) {</code></p>
    <p>2. <code>cout << i;</code></p>
    <p>3. <code>i++;</code></p>
    <p>4. <code>}</code></p>
  </ol>
  <p>
    Увери се, че използваш правилно синтаксиса:<br>
    - Всички редове завършват с <strong>точка и запетая</strong>, освен отварящия <code>{</code> и затварящия <code>}</code>.<br>
    - Няма допълнителни интервали, символи или липсващи елементи.
  </p>
      
      `,
    playground: `
  <div id="codeWrapper">
    <pre class="codeLine">#include &lt;iostream&gt;</pre>
    <pre class="codeLine">using namespace std;</pre>
    <pre class="codeLine">int main() {</pre>
    <pre class="codeLine">    int i = 1;</pre>
    <input type="text" id="codeInput1" class="codeInput" placeholder="" autocomplete="off"/>
    <input type="text" id="codeInput2" class="codeInput" placeholder="" autocomplete="off"/>
    <input type="text" id="codeInput3" class="codeInput" placeholder="" autocomplete="off"/>
    <input type="text" id="codeInput4" class="codeInput" placeholder="" autocomplete="off"/>
    <pre class="codeLine">    return 0;</pre>
    <pre class="codeLine">}</pre>
  </div>

  <button id="runBtn">Стартирай кода</button>

  <div id="outputWindow"></div>

  <div id="levelButtons">
    <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
    <button id="prevLevelBtn" style="display: block;">Предишно ниво</button>
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
      // Note: nameWrapper is not defined in this level's HTML, so I'll remove references to it to avoid errors.

      // Enter navigation (Kept your existing logic)
      inputs.forEach((input, i) => {
        input.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (i < inputs.length - 1) inputs[i + 1].focus();
            else runBtn.click();
          }
        });
      });

      // Define regex patterns: Double-escaped for Node/String embedding, allowing flexible whitespace.
      const patterns = [
        // 1. while (i <= 5) {
        /^\\s*while\\s*\\(\\s*i\\s*<=\\s*5\\s*\\)\\s*\\{\\s*$/, 
        
        // 2. cout << i;
        /^\\s*cout\\s*<<\\s*i\\s*;\\s*$/, 
        
        // 3. i++;
        /^\\s*i\\s*\\+\\+\\s*;\\s*$/,
        
        // 4. }
        /^\\s*\\}\\s*$/ 
      ];

     // Run button: universal check (Your .trim() logic)
      runBtn.addEventListener('click', () => {
        let ok = true;

        for (let i = 0; i < inputs.length; i++) {
          // Applying your core logic: use .trim()
          const code = inputs[i].value.trim();
          
          if (!patterns[i]?.test(code)) {
            ok = false;
            output.innerHTML = \`<span class="error">⛔ Грешка в ред \${i + 1}</span>\`;
            break;
          }
        }

        if (ok) {
          // Success output enhanced with the expected result (12345)
          output.innerHTML = '<span class="success">12345</span><br><br>✅ Правилно! Нивото е преминато!';
          nextBtn.style.display = 'inline-block';
        } else {
          nextBtn.style.display = 'none';
        }
      });

      // Navigation
      nextBtn.addEventListener('click', () => {
        window.location.href = '/levels/8';
      });

      // I'll keep the prevBtn logic since it was explicitly in your provided code block.
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          window.location.href = '/levels/6';
        });
      }
    });
  </script>
      `
},
  //level 8
  8: {
      instructions: `
  <h2>Мисия</h2>
  <p>
    Създай програма, която използва <strong>do...while</strong> цикъл и извежда "Counting: i" докато i е по-малко от <strong>въведено число</strong> от потребителя.
  </p>
  <ol>
    <p>1. Въведи вход от потребителя: <code>cin >> n;</code></p>
    <p>2. Използвай <code>int i = 0;</code></p>
    <p>3. Създай <code>do { ... } while(i < n);</code> цикъл</p>
    <p>4. В тялото на цикъла добави <code>cout << "Counting: " << i << endl;</code> и <code>i++;</code></p>
  </ol>
  <p>
    Програмата трябва да изброи от 0 до n-1.
  </p>
      
      `,
    playground:`
  <div id="codeWrapper">
    <pre class="codeLine">#include &lt;iostream&gt;</pre>
    <pre class="codeLine">using namespace std;</pre>
    <pre class="codeLine">int main() {</pre>
    <pre class="codeLine">    int n, i = 0;</pre>
    <input type="text" id="codeInput1" class="codeInput" placeholder="cin >> n;" autocomplete="off"/>
    
    <input type="text" id="codeInput2" class="codeInput" placeholder="do {" autocomplete="off"/>
    <input type="text" id="codeInput3" class="codeInput" placeholder='cout << "Counting: " << i << endl;' autocomplete="off"/>
    <input type="text" id="codeInput4" class="codeInput" placeholder="i++;" autocomplete="off"/>
    <input type="text" id="codeInput5" class="codeInput" placeholder="} while(i < n);" autocomplete="off"/>

    <pre class="codeLine">    return 0;</pre>
    <pre class="codeLine">}</pre>
  </div>

  <button id="runBtn">Стартирай кода</button>

  <div id="userInputWrapper" style="display:none; margin-top:1rem;">
    <input type="number" id="userInput" placeholder="Въведи число..." style="padding:0.5rem;border-radius:6px;width:100%;" />
    <button id="sayHelloBtn" style="margin-top:0.5rem;">Изпълни</button>
  </div>

  <div id="outputWindow"></div>

  <div id="levelButtons">
    <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
    <button id="prevLevelBtn">Предишно ниво</button>
  <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
  </div>
`,
    scripts: `
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const in1 = document.getElementById('codeInput1');
      const in2 = document.getElementById('codeInput2');
      const in3 = document.getElementById('codeInput3');
      const in4 = document.getElementById('codeInput4');
      const in5 = document.getElementById('codeInput5');
      const runBtn = document.getElementById('runBtn');
      const output = document.getElementById('outputWindow');
      const userInputWrapper = document.getElementById('userInputWrapper');
      const userInput = document.getElementById('userInput');
      const sayHelloBtn = document.getElementById('sayHelloBtn');
      const nextBtn = document.getElementById('nextLevelBtn');
      const prevBtn = document.getElementById('prevLevelBtn');

      // Run code check
      runBtn?.addEventListener('click', () => {
        const validCin = /^\\s*cin\\s*>>\\s*n\\s*;\\s*$/;
        const validDo = /^\\s*do\\s*{\\s*$/;
        const validCout = /^\\s*cout\\s*<<\\s*"Counting:\\s*"\\s*<<\\s*i\\s*<<\\s*endl\\s*;\\s*$/;
        const validInc = /^\\s*i\\+\\+\\s*;\\s*$/;
        const validWhile = /^\\s*}\\s*while\\s*\\(\\s*i\\s*<\\s*n\\s*\\)\\s*;\\s*$/;

        output.innerHTML = '';
        userInputWrapper.style.display = 'none';
        nextBtn.style.display = 'none';

        if (
          validCin.test(in1.value.trim()) &&
          validDo.test(in2.value.trim()) &&
          validCout.test(in3.value.trim()) &&
          validInc.test(in4.value.trim()) &&
          validWhile.test(in5.value.trim())
        ) {
          output.innerHTML = '✅ Кодът изглежда правилен. Въведи число и натисни "Изпълни".';
          userInputWrapper.style.display = 'block';
        } else {
          output.innerHTML = '<span class="error">⛔ Провери дали синтаксисът на do-while цикъла е коректен.</span>';
        }
      });

    
      runBtn.addEventListener('click', () => {
            const code = input.value.trim();
            if (pattern.test(code)) {
              output.innerHTML = '✅ Правилно!';
              nextBtn.style.display = 'inline-block';
            } else {
              output.innerHTML = '⛔ Проверете синтаксиса.';
            }
          });
   // Navigation
    nextBtn.addEventListener('click', () => {
      window.location.href = '/levels/9';
    });

    prevBtn.addEventListener('click', () => {
      window.location.href = '/levels/7';
    });
});
  </script>
`

  },
  //level 9
  9: {
      instructions: `
  <h2>Мисия</h2>
  <p>
    Сега ще добавим вход от потребителя! 🎯<br><br>
    <strong>1.</strong> Използвай <code>cin >> n;</code> за да въведеш число от потребителя.<br>
    <strong>2.</strong> Използвай <code>for</code> цикъл, за да отпечаташ числата от 1 до <code>n</code>.<br><br>

    <strong>Пример:</strong> ако въведеш 4, изходът трябва да е <code>1 2 3 4</code>
  </p>
  <ol>
    <p>1. <code>cin >> n;</code></p>
    <p>2. <code>for (i = 1; i &lt;= n; i++) {</code></p>
    <p>3. <code>cout << i << " ";</code></p>
    <p>4. <code>}</code></p>
  </ol>
  <p>
    ✅ Увери се, че всички редове завършват с <code>;</code> или <code>{ }</code>, както е нужно.
  </p>
      
      `,
    playground:`
  <div id="codeWrapper">
    <pre class="codeLine">#include &lt;iostream&gt;</pre>
    <pre class="codeLine">using namespace std;</pre>
    <pre class="codeLine">int main() {</pre>
    <pre class="codeLine">    int i, n;</pre>
    <input type="text" id="codeInput1" class="codeInput" placeholder="cin >> n;" autocomplete="off"/>
    <input type="text" id="codeInput2" class="codeInput" placeholder="for (i = 1; i <= n; i++) {" autocomplete="off"/>
    <input type="text" id="codeInput3" class="codeInput" placeholder='cout << i << " ";' autocomplete="off"/>
    <input type="text" id="codeInput4" class="codeInput" placeholder="}" autocomplete="off"/>
    <pre class="codeLine">    return 0;</pre>
    <pre class="codeLine">}</pre>
  </div>

  <button id="runBtn">Стартирай кода</button>

  <div id="userInputWrapper" style="display: none; margin-top:1rem;">
  <input type="number" id="userInput" placeholder="Въведи число n..." style="padding:0.5rem;border-radius:6px;width:100%;" />
  <button id="sayHelloBtn" style="margin-top:0.5rem;">Изпълни</button>
</div>


  <div id="outputWindow"></div>

  <div id="levelButtons">
    <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
    <button id="prevLevelBtn" style="display: block;">Предишно ниво</button>
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

  // Enter navigation
 inputs.forEach((input, i) => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (i < inputs.length - 1) inputs[i + 1].focus();
        else runBtn.click();
      }
    });
  });

  // Regex patterns for each line (FIXED & Double-escaped)
  const patterns = [
    // 1. cin >> n;
    /^\\s*cin\\s*>>\\s*n\\s*;\\s*$/,                       
    // 2. for (i = 1; i <= n; i++) {
    /^\\s*for\\s*\\(\\s*i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*n\\s*;\\s*i\\+\\+\\s*\\)\\s*\\{\\s*$/, 
    // 3. cout << i << " "; (Fixed string match)
    /^\\s*cout\\s*<<\\s*i\\s*<<\\s*"\\s*"\\s*;\\s*$/,           
    // 4. }
    /^\\s*\\}\\s*$/,                                      
  ];

  // Run button check
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
    nextBtn.style.display = 'inline-block';
    if (userInputWrapper) userInputWrapper.style.display = 'none';
  });

   // Navigation
    nextBtn.addEventListener('click', () => {
      window.location.href = '/levels/10';
    });

    prevBtn.addEventListener('click', () => {
      window.location.href = '/levels/8';
    });
});
</script>
`
  },
  //level 10
  10: {
      instructions: `
  <h2>Мисия: Създай калкулатор</h2>
  <p>
    Сега ще създадеш прост C++ калкулатор, който използва <code>switch</code>, за да изчисли резултата между две числа.<br><br>
    ✅ Потребителят трябва да въведе <code>число1 оператор число2</code>.<br>
    ➕ Поддържани оператори: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>.<br>
    ⚠️ Ако се дели на 0, изведи "Деление на 0!"<br>
    ❗ Ако операторът не е валиден, изведи "Невалиден оператор!"<br><br>

    <strong>Примерен вход:</strong> <code>3 + 5</code><br>
    <strong>Изход:</strong> <code>8</code>
  </p>
  <p>Въведи всички редове на програмата ръчно, включително <code>#include</code> и <code>main()</code>.</p>
  <p><strong>Увери се, че всеки ред завършва с <code>;</code> или <code>}</code>, където е нужно.</strong></p>
`,
    playground: `
  <div id="codeWrapper">
    <input type="text" class="codeInput" id="codeInput1" placeholder="#include <iostream>" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput2" placeholder="using namespace std;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput3" placeholder="int main() {" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput4" placeholder="double a, b;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput5" placeholder="char op;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput6" placeholder="cin >> a >> op >> b;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput7" placeholder="switch(op) {" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput8" placeholder="case '+': cout &lt;&lt; (a + b); break;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput9" placeholder="case '-': cout &lt;&lt; (a - b); break;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput10" placeholder="case '*': cout << (a * b); break;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput11" placeholder="case '/':" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput12" placeholder='if (b != 0) cout << (a / b);' autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput13" placeholder='else cout << "Деление на 0!";' autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput14" placeholder="break;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput15" placeholder='default: cout << "Невалиден оператор!";' autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput16" placeholder="}" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput17" placeholder="return 0;" autocomplete="off"/>
    <input type="text" class="codeInput" id="codeInput18" placeholder="}" autocomplete="off"/>
  </div>

  <button id="runBtn">Стартирай кода</button>

  <div id="userInputWrapper" style="display: none; margin-top:1rem;">
    <input type="text" id="userInput" placeholder="Въведи: 3 + 5" />
    <button id="calculateBtn" style="margin-top:0.5rem;">Изпълни</button>
  </div>

  <div id="outputWindow"></div>

  <div id="levelButtons">
    <button id="nextLevelBtn" style="display: none;">Следващо ниво</button>
    <button id="prevLevelBtn">Предишно ниво</button>
      <a href="/main"><button id="menuBtn" class="btn btn-secondary">Меню</button></a>
  </div>
`,
    scripts: `
<script>
document.addEventListener("DOMContentLoaded", () => {
  // 1. COLLECT ALL INPUTS AND ELEMENTS DEFENSIVELY
  const inputIds = Array.from({length: 18}, (_, i) => \`codeInput\${i + 1}\`);
  const inputs = inputIds.map(id => document.getElementById(id)).filter(Boolean);

  const userInputWrapper = document.getElementById('userInputWrapper');
  const runBtn = document.getElementById('runBtn');
  const output = document.getElementById('outputWindow');
  const nextBtn = document.getElementById('nextLevelBtn');
  const prevBtn = document.getElementById('prevLevelBtn');
  const userInput = document.getElementById('userInput');
  const calculateBtn = document.getElementById('calculateBtn'); 
  
  // 2. ENTER NAVIGATION
  inputs.forEach((input, i) => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (i < inputs.length - 1) inputs[i + 1].focus();
        else runBtn.click();
      }
    });
  });

  // 3. REGEX PATTERNS (Robust, simplified escaping for backticks)
  const patterns = [
    /^\\s*#include\\s*<iostream>\\s*$/,                                                         
    /^\\s*using\\s+namespace\\s+std\\s*;\\s*$/,                                                   
    /^\\s*int\\s+main\\s*\\(\\s*\\)\\s*\\{\\s*$/,                                                     
    /^\\s*double\\s+a\\s*,\\s*b\\s*;\\s*$/,                                                        
    /^\\s*char\\s+op\\s*;\\s*$/,                                                                 
    /^\\s*cin\\s*>>\\s*a\\s*>>\\s*op\\s*>>\\s*b\\s*;\\s*$/,                                           
    /^\\s*switch\\s*\\(\\s*op\\s*\\)\\s*\\{\\s*$/,                                                    
    /^\\s*case\\s*'\\+'\\s*:\\s*cout\\s*<<\\s*\\(\\s*a\\s*\\+\\s*b\\s*\\)\\s*;\\s*break\\s*;\\s*$/,        
    /^\\s*case\\s*'-'\\s*:\\s*cout\\s*<<\\s*\\(\\s*a\\s*-\\s*b\\s*\\)\\s*;\\s*break\\s*;\\s*$/,          
    /^\\s*case\\s*'\*'\\s*:\\s*cout\\s*<<\\s*\\(\\s*a\\s*\\*\\s*b\\s*\\)\\s*;\\s*break\\s*;\\s*$/,       
    /^\\s*case\\s*'\\/'\\s*:\\s*$/,                                                              
    /^\\s*if\\s*\\(\\s*b\\s*!=\\s*0\\s*\\)\\s*cout\\s*<<\\s*\\(\\s*a\\s*\\/\\s*b\\s*\\)\\s*;\\s*$/,      
    /^\\s*else\\s*cout\\s*<<\\s*"Деление\\s*на\\s*0!"\\s*;\\s*$/,                                 
    /^\\s*break\\s*;\\s*$/,                                                                     
    /^\\s*default\\s*:\\s*cout\\s*<<\\s*"Невалиден\\s*оператор!"\\s*;\\s*$/,                        
    /^\\s*\\}\\s*$/,                                                                            
    /^\\s*return\\s+0\\s*;\\s*$/,                                                                
    /^\\s*\\}\\s*$/                                                                             
  ];

  // 4. CODE VALIDATION (runBtn)
  if (runBtn) {
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
        output.innerHTML = '✅ Правилно! Въведи израз:';
        if (userInputWrapper) userInputWrapper.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'none';
      } else {
        if (nextBtn) nextBtn.style.display = 'none';
        if (userInputWrapper) userInputWrapper.style.display = 'none';
      }
    });
  }

  // 5. PROGRAM SIMULATION (calculateBtn)
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const val = userInput.value.trim();
      // Using double backslashes for special characters within the regex string definition
      const match = val.match(/^(-?\\d+(\\.\\d+)?)\\s*([+\\-*\\/])\\s*(-?\\d+(\\.\\d+)?)$/); 

      if (!match) {
        output.innerHTML = \`<span class="error">⛔ Невалиден вход. Използвай формат: 3 + 5</span>\`;
        return;
      }

      const a = parseFloat(match[1]);
      const op = match[3];
      const b = parseFloat(match[4]);

      let result;
      switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b !== 0 ? a / b : 'Деление на 0!'; break;
        default: result = 'Невалиден оператор!';
      }

      output.innerHTML = \`<span class="success">\${result}</span><br><br>✅ Нивото е преминато!\`;
      if (nextBtn) nextBtn.style.display = 'inline-block';
      if (userInputWrapper) userInputWrapper.style.display = 'none';
    });
  }

  // 6. NAVIGATION
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      window.location.href = '/levels/9';
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      window.location.href = '/levels/11';
    });
  }

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
