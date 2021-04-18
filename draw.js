const SCALE = 50;
const ROWS = 20;
const COLS = 10;
const COLORS = ["black", "turquoise", "blue", "orange", "yellow", "green", "purple", "red"];

const cv = document.querySelector("canvas");
const ctx = cv.getContext("2d");
cv.width = SCALE * COLS;
cv.height = SCALE * ROWS;

const draw = (mtx, score = 0) => {
	mtx.forEach((row, y) => {
		row.forEach((cell, x) => {
			ctx.fillStyle = COLORS[cell];
			ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
		})
	});
	if (score === 0) return;
	ctx.fillStyle = "white";
	ctx.font = "40px monospace";
	ctx.textAlign = "right";
	ctx.fillText(score, 480, 50);
};

export default draw;