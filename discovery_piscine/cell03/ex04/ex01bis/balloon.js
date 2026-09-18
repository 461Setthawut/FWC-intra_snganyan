$(document).ready(function () {
  var $balloon = $('#balloon');

  var MIN_SIZE = 200;
  var MAX_SIZE = 420;
  var GROW_STEP = 10;
  var SHRINK_STEP = 5;
  var colors = ['red', 'green', 'blue'];

  var size = MIN_SIZE;
  var colorIndex = 0;

  function applyStyle() {
    $balloon.css({
      width: size + 'px',
      height: size + 'px',
      backgroundColor: colors[colorIndex]
    });
  }

  $balloon.on('click', function () {
    size += GROW_STEP;
    colorIndex = (colorIndex + 1) % colors.length;

    if (size > MAX_SIZE) {
      // The balloon explodes and returns to its original state.
      size = MIN_SIZE;
      colorIndex = 0;
    }

    applyStyle();
  });

  $balloon.on('mouseleave', function () {
    size -= SHRINK_STEP;
    if (size < MIN_SIZE) {
      size = MIN_SIZE;
    }
    colorIndex = (colorIndex - 1 + colors.length) % colors.length;

    applyStyle();
  });

  applyStyle();
});