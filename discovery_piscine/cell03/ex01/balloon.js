const balloon = document.getElementById("balloon");

const colors = ["red", "green", "blue"];
let colorIndex = 0;

const ORIGINAL_SIZE = 200;
const MAX_SIZE = 420;
const GROW_STEP = 10;
const SHRINK_STEP = 5;

let size = ORIGINAL_SIZE;

function applyBalloon() {
	balloon.style.width = size + "px";
	balloon.style.height = size + "px";
	balloon.style.backgroundColor = colors[colorIndex];
}

balloon.addEventListener("click", function () {
	size += GROW_STEP;
	colorIndex = (colorIndex + 1) % colors.length;

	if (size > MAX_SIZE) {
		size = ORIGINAL_SIZE;
	}

	applyBalloon();
});

balloon.addEventListener("mouseleave", function () {
	size -= SHRINK_STEP;
	if (size < ORIGINAL_SIZE) {
		size = ORIGINAL_SIZE;
	}

	colorIndex = (colorIndex - 1 + colors.length) % colors.length;

	applyBalloon();
});