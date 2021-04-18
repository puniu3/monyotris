import draw from "/draw.js";
import core from "/core.js";
import noise from "/noise.js";

let mtx = core.blank();
let mino = core.rndMino();
let score = 0;
let running = true;

const scoreLabel = document.querySelector("#score");

window.addEventListener("keydown", onKeydown);
window.addEventListener("load", tick);

function update() { draw(core.turncate(core.lap(mtx, mino) || mtx)); }

function onKeydown(e) {
	if (!e.key.includes("Arrow")) return;
	e.preventDefault();
	if (!running) return;

	if (e.key === "ArrowDown")
		fall();

	else if (e.key === "ArrowUp")
		mino = core.rot(mtx, mino) || mino;

	else if (e.key === "ArrowLeft")
		mino = core.left(mtx, mino) || mino;

	else if (e.key === "ArrowRight")
		mino = core.right(mtx, mino) || mino;

	update();
}

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
		scoreLabel.innerHTML = score;
		noise(600, 2);
	} else {
		noise();
	}
	if (core.isDead(mtx))
		running = false;
	else
		mino = core.rndMino();
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
	setTimeout(tick, 1000);
}