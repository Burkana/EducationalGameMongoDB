document.addEventListener('DOMContentLoaded', () => {
  
  const levels = [
    {
      number: 1,
      title: 'C++ Ниво 1',
      instructions: `
        <h2>Мисия</h2>
        <p>
          Довършете едноредовата инструкция <strong>cout<<</strong> между <strong>main()</strong> и <strong>return 0;</strong>.<br>
          Тя трябва да изведе точно <strong>Hello, C++ World!</strong> и да завършва с точка и запетая.<br>
          За да изведете текста в командата той трябва да е в кавички <strong>" "</strong> <br>
          и след тях да завършите с точка и запетая <strong>;</strong>
        </p>
      
      `,
      code: `
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
      pattern: /^\s*cout\s*<<\s*"Hello,\s*C\+\+\s*World!"\s*;\s*$/
    },
    {
      number: 2,
      title: 'C++ Ниво 2',
      instructions: `
        <h2>Мисия</h2>
        <p>Добавете два реда C++ код между <strong>main()</strong> и <strong>return 0;</strong></p>
        <ol>
          <p><strong>1. cin >> name;</strong> за въвеждане на вход от потребителя.</p>
          <p><strong>2. cout << "Hello, " << name << "!";</strong> за поздрав.</p>
          Трябва да изведе точно <strong>Hello, "въведеното от вас име"</strong>
        </ol>
      
      `,
      code: `
        <div id="codeWrapper">
          <pre class="codeLine">#include &lt;iostream&gt;</pre>
          <pre class="codeLine">using namespace std;</pre>
          <pre class="codeLine">int main() {</pre>
          <pre class="codeLine">    string name;</pre>
          <input type="text" id="codeInput1" class="codeInput form-control my-2" placeholder='Пишете тук...' />
          <input type="text" id="codeInput2" class="codeInput form-control my-2" placeholder='Пишете тук...' />
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
      pattern: {
        cin: /^\s*cin\s*>>\s*name\s*;\s*$/,
        cout: /^\s*cout\s*<<\s*"Hello,\s*"\s*<<\s*name\s*<<\s*"!"\s*;\s*$/
      }
    }
  ];

  // Взимане на нивата от Експрес
  const pathParts = window.location.pathname.split('/');
  const levelNum = parseInt(pathParts[pathParts.length - 1]);
  const level = levels.find(l => l.number === levelNum);

  if (!level) {
    document.body.innerHTML = '<h2 class="text-center text-danger mt-5">❌ Невалидно ниво!</h2>';
    return;
  }

  //Показване на елементите
  document.getElementById('levelTitle').innerText = level.title;
  document.getElementById('instructions').innerHTML = level.instructions;
  document.getElementById('playground').innerHTML = level.code;

  // Логика към нивата за проверка
  if (level.number === 1) bindLevel1(level);
  if (level.number === 2) bindLevel2(level);

  // Ниво 1
  function bindLevel1(level) {
    const input = document.getElementById('codeInput');
    const runBtn = document.getElementById('runBtn');
    const output = document.getElementById('outputWindow');
    const nextBtn = document.getElementById('nextLevelBtn');
    const prevBtn = document.getElementById('prevLevelBtn');
    const hintBtn = document.getElementById('hintBtn');

    prevBtn.style.display = 'none';

    runBtn.addEventListener('click', () => {
      const code = input.value.trim();
      if (level.pattern.test(code)) {
        output.innerHTML = '<span class="success">Hello, C++ World!</span><br>✅ Нивото е преминато!';
        nextBtn.style.display = 'inline-block';
      } else {
        output.innerHTML = '<span class="error">⛔ Проверете синтаксиса.</span>';
      }
    });

    nextBtn.addEventListener('click', () => {
      window.location.href = `/levels/2`;
    });

  }

  // Ниво 2
  function bindLevel2(level) {
    const input1 = document.getElementById('codeInput1');
    const input2 = document.getElementById('codeInput2');
    const runBtn = document.getElementById('runBtn');
    const output = document.getElementById('outputWindow');
    const userInputWrapper = document.getElementById('nameInputWrapper');
    const userInput = document.getElementById('userInput');
    const sayHelloBtn = document.getElementById('sayHelloBtn');
    const nextBtn = document.getElementById('nextLevelBtn');
    const prevBtn = document.getElementById('prevLevelBtn');
    const hintBtn = document.getElementById('hintBtn');

    runBtn.addEventListener('click', () => {
      const code1 = input1.value.trim();
      const code2 = input2.value.trim();
      if (level.pattern.cin.test(code1) && level.pattern.cout.test(code2)) {
        output.innerHTML = '<span class="success">✅ Правилно! Въведете име:</span>';
        userInputWrapper.style.display = 'block';
      } else {
        output.innerHTML = '<span class="error">⛔ Грешка! Проверете кода.</span>';
      }
    });

    sayHelloBtn.addEventListener('click', () => {
      const name = userInput.value.trim();
      if (name) {
        output.innerHTML = `<span class="success">Hello, ${name}!</span>`;
        nextBtn.style.display = 'inline-block';
      } else {
        output.innerHTML = '<span class="error">⛔ Въведете име!</span>';
      }
    });

    prevBtn.addEventListener('click', () => {
      window.location.href = `/levels/1`;
    });

    nextBtn.addEventListener('click', () => {
      window.location.href = `/levels/3`;
    });

  }
});
