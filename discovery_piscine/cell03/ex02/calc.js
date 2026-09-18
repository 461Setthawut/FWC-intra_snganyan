document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('calc-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var leftValue = document.getElementById('left').value;
    var rightValue = document.getElementById('right').value;
    var operator = document.getElementById('operator').value;

    // Only positive integers (>= 0) are allowed: digits only, no sign, no decimal point.
    var positiveIntegerRegex = /^\d+$/;

    if (!positiveIntegerRegex.test(leftValue) || !positiveIntegerRegex.test(rightValue)) {
      alert('Error :(');
      return;
    }

    var left = parseInt(leftValue, 10);
    var right = parseInt(rightValue, 10);

    if ((operator === '/' || operator === '%') && right === 0) {
      alert("It's over 9000!");
      return;
    }

    var result;

    switch (operator) {
      case '+':
        result = left + right;
        break;
      case '-':
        result = left - right;
        break;
      case '*':
        result = left * right;
        break;
      case '/':
        result = left / right;
        break;
      case '%':
        result = left % right;
        break;
      default:
        alert('Error :(');
        return;
    }

    console.log(result);
    alert(result);
  });

  // Every 30 seconds, remind the user to use the calculator.
  setInterval(function () {
    alert('Please, use me...');
  }, 30000);
});