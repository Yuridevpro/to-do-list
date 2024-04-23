// Declara um objeto chamado Main que contém as propriedades e métodos para manipular os elementos HTML
const Main = {
  task: [],

  // Define uma função que é chamada quando o objeto Main é inicializado
  init: function () {
    // Chama o método cacheSelectors para selecionar os elementos HTML
    this.cacheSelectors();
    // this: seleciona os elementos tanto em fora quanto dentro // Chama o método bindEvents para vincular os eventos aos elementos HTML
    this.bindEvents();

    this.getStoraged();

    this.buildTasks();
  },

  // Define uma função que seleciona os elementos HTML e armazena em propriedades do objeto Main
  cacheSelectors: function () {
    // Seleciona todos os elementos com a classe check e armazena na propriedade $checkButtons
    this.$checkButtons = document.querySelectorAll(".check");
    // Seleciona o elemento com o id inputTask e armazena na propriedade $inputTask
    this.$inputTask = document.querySelector("#inputTask");
    // Seleciona o elemento com o id list e armazena na propriedade $list
    this.$list = document.querySelector("#list");
    // Seleciona todos os elementos com a classe remove e armazena na propriedade $removeButtons
    this.$removeButtons = document.querySelectorAll(".remove");
  },

  // Define uma função que vincula os eventos aos elementos HTML
  bindEvents: function () {
    // Cria uma variável self que recebe o valor de this, para referenciar o objeto Main dentro das funções aninhadas
    const self = this;

    // Percorre o array de elementos $checkButtons com o método forEach
    this.$checkButtons.forEach(function (button) {
      // for each/para cada: para elemento button
      // Atribui a função checkButton_click como manipulador do evento onclick de cada botão
      button.onclick = self.Events.checkButton_click;
    });

    // Atribui a função inputTask_keypress como manipulador do evento onkeypress do elemento $inputTask
    // Usa o método bind para passar o valor de this (o objeto Main) como contexto da função
    this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this);

    // Percorre o array de elementos $removeButtons com o método forEach
    this.$removeButtons.forEach(function (button) {
      // Atribui a função removeButton_click como manipulador do evento onclick de cada botão
      button.onclick = self.Events.removeButton_click;
    });
  },

  getStoraged: function () {
    const task = localStorage.getItem("tasks");
    this.tasks = JSON.parse(tasks);
  },

  buildTasks: function () {
    let html = "";
    this.tasks.forEach((task) => {
      html += `
        <li>          
          <div class="check"></div>
          <label class="task">
            ${task.task}
          </label>
          <button class="remove"></button>
        </li>
      `;
    });
    this.$list.innerHTML = html;
  },

  // Define um objeto que contém as funções que manipulam os eventos dos elementos HTML
  Events: {
    // Define uma função que alterna a classe done do elemento pai do botão clicado
    checkButton_click: function (e) {
      // Cria uma variável li que recebe o elemento pai do botão clicado, que é um elemento <li>
      const li = e.target.parentElement;
      // Cria uma variável isDone que recebe um valor booleano indicando se o elemento li tem a classe done
      const isDone = li.classList.contains("done");

      // Se o elemento li não tem a classe done, adiciona a classe done e retorna a função
      if (!isDone) {
        return li.classList.add("done");
      }

      // Se o elemento li tem a classe done, remove a classe done
      li.classList.remove("done");
    },

    // Define uma função que adiciona uma nova tarefa à lista quando a tecla Enter é pressionada no elemento $inputTask
    inputTask_keypress: function (e) {
      // Cria uma variável key que recebe o valor da tecla pressionada
      const key = e.key;
      // Cria uma variável value que recebe o valor do elemento
      const value = e.target.value;

      // Se a tecla pressionada é Enter, executa o bloco de código abaixo
      if (key === "Enter") {
        // Concatena uma string que contém um elemento HTML <li> com a tarefa à propriedade innerHTML do elemento $list
        // Usa a sintaxe de template literal ${} para interpolar a variável value dentro da string
        this.$list.innerHTML += `
        <li>          
          <div class="check"></div>
          <label class="task">
            ${value}
          </label>
          <button class="remove"></button>
        </li>
      `;

        // Atribui uma string vazia ao valor do elemento $inputTask, para limpar o campo de entrada
        e.target.value = "";
        // Chama os métodos cacheSelectors e bindEvents novamente, para atualizar os elementos HTML e os eventos
        this.cacheSelectors();
        this.bindEvents();

        const savedTasks = localStorage.getItem("tasks");
        const savedTasksObj = JSON.parse(savedTasks);

        const obj = [{ task: value }, ...savedTasksObj];

        localStorage.setItem("tasks", JSON.stringify(obj));
      }
    },

    // Define uma função que remove uma tarefa da lista quando o botão de remover é clicado
    removeButton_click: function (e) {
      // Cria uma variável li que recebe o elemento pai do botão clicado, que é um elemento <li>
      let li = e.target.parentElement;

      // Adiciona a classe removed ao elemento li, para aplicar um efeito de transição
      li.classList.add("removed");

      // Usa a função setTimeout para executar uma função após 300 milissegundos
      setTimeout(function () {
        // Adiciona a classe hidden ao elemento li, para ocultá-lo da lista
        li.classList.add("hidden");
      }, 300);
    },
  },
};

// Chama o método init do objeto Main, para inicializar o programa
Main.init();
