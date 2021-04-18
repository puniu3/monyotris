import draw from "/draw.js";
import core from "/core.js";
import noise from "/noise.js";

let mtx = core.blank();
let mino = core.rndMino();
let score = 0;
let totalMinos = 0;
let running = true;

window.addEventListener("keydown", onKeydown);
window.addEventListener("load", tick);
document.querySelector("#down").addEventListener("mousedown", () => handleInput("d"));
document.querySelector("#up").addEventListener("mousedown", () => handleInput("u"));
document.querySelector("#left").addEventListener("mousedown", () => handleInput("l"));
document.querySelector("#right").addEventListener("mousedown", () => handleInput("r"));

function update() { draw(core.turncate(core.lap(mtx, mino) || mtx), score); }

function onKeydown(e) {
	if (e.key === "ArrowDown") handleInput("d");
	else if (e.key === "ArrowUp") handleInput("u");
	else if (e.key === "ArrowLeft") handleInput("l");
	else if (e.key === "ArrowRight") handleInput("r");
	else return;

	e.preventDefault();
}

function handleInput(dir) {
	if (!running) return;

	if (dir === "d") fall();
	else if (dir === "u") rotate();
	else if (dir === "l") moveLeft();
	else if (dir === "r") moveRight();

	update();
}

function rotate() { mino = core.rot(mtx, mino) || mino; }
function moveLeft() { mino = core.left(mtx, mino) || mino; }
function moveRight() { mino = core.right(mtx, mino) || mino; }

function drop() {
	const dropped = core.down(mtx, mino);
	if (dropped) mino = dropped;
	else land();
}

function land() {
	mtx = core.lap(mtx, mino);

	let lines;
	({ mtx, lines } = core.clear(mtx));
	if (lines) {
		score += lines ** 2 * 100;
		noise(600, 2);
	} else {
		noise();
	}

	if (core.isDead(mtx))
		running = false;
	else {
		mino = core.rndMino();
		++totalMinos;
	}
}

function fall() {
	let dropped;
	while (dropped = core.down(mtx, mino))
		mino = dropped;

	land();
}

function tick() {
	if (!running) return;
	drop();
	update();
	setTimeout(tick, interval(totalMinos));
}

function interval(progress) {
	const level = Math.floor(progress / 15);
	return [1500, 1300, 1100, 900, 800, 700, 600, 550][level] || 500;
}