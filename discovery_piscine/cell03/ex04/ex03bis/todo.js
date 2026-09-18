$(document).ready(function () {
  var $list = $('#ft_list');
  var COOKIE_NAME = 'ft_todo_list';

  // ---- Cookie helpers (native, no jQuery cookie plugin used) ----
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

  // ---- Persistence ----
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

  // ---- DOM helpers ----
  function createTodoElement(text) {
    var $item = $('<div>', {
      class: 'todo-item',
      text: text
    });

    $item.on('click', function () {
      var confirmed = confirm('Remove "' + text + '" from the list?');
      if (confirmed) {
        var todos = getTodos();
        var index = todos.indexOf(text);
        if (index !== -1) {
          todos.splice(index, 1);
          saveTodos(todos);
        }
        $item.remove();
      }
    });

    return $item;
  }

  function renderTodos() {
    var todos = getTodos();
    $list.empty();
    // Stored with newest first already, so just append in order.
    todos.forEach(function (text) {
      $list.append(createTodoElement(text));
    });
  }

  function addTodo(text) {
    var todos = getTodos();
    todos.unshift(text);
    saveTodos(todos);
    $list.prepend(createTodoElement(text));
  }

  // ---- Events ----
  $('#new-btn').on('click', function () {
    var text = prompt('New to-do:');
    if (text !== null && text.trim() !== '') {
      addTodo(text.trim());
    }
  });

  // ---- Init ----
  renderTodos();
});