const SCALE = 20;
const ROWS = 20;
const COLS = 10;
const COLORS = ["black", "turquoise", "blue", "orange", "yellow", "green", "purple", "red"];

const cv = document.querySelector("canvas");
const ctx = cv.getContext("2d");
cv.width = SCALE * COLS;
cv.height = SCALE * ROWS;

const draw = mtx => {
	mtx.forEach((row, y) => {
		row.forEach((cell, x) => {
			ctx.fillStyle = COLORS[cell];
			ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
		})
	});
}

export default draw;