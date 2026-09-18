document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('ft_list');
  var newBtn = document.getElementById('new-btn');
  var COOKIE_NAME = 'ft_todo_list';


  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  }

  function getCookie(name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var c = cookies[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  }

  
  function getTodos() {
    var raw = getCookie(COOKIE_NAME);
    if (!raw) {
      return [];
    }
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveTodos(todos) {
    setCookie(COOKIE_NAME, JSON.stringify(todos), 365);
  }

  function createTodoElement(text) {
    var item = document.createElement('div');
    item.className = 'todo-item';
    item.textContent = text;

    item.addEventListener('click', function () {
      var confirmed = confirm('Remove "' + text + '" from the list?');
      if (confirmed) {
        var todos = getTodos();
        var index = todos.indexOf(text);
        if (index !== -1) {
          todos.splice(index, 1);
          saveTodos(todos);
        }
        item.remove();
      }
    });

    return item;
  }

  function renderTodos() {
    var todos = getTodos();
    list.innerHTML = '';
    // Stored with newest first already, so just append in order.
    todos.forEach(function (text) {
      list.appendChild(createTodoElement(text));
    });
  }

  function addTodo(text) {
    var todos = getTodos();
    todos.unshift(text);
    saveTodos(todos);
    list.insertBefore(createTodoElement(text), list.firstChild);
  }


  newBtn.addEventListener('click', function () {
    var text = prompt('New to-do:');
    if (text !== null && text.trim() !== '') {
      addTodo(text.trim());
    }
  });


  renderTodos();
});