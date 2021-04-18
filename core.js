import MINOS from "/minos.js"

const HIDDEN_ROWS = 2;
const ROWS = 20 + HIDDEN_ROWS;
const COLS = 10;
const EDGE = 2;

const WALL = -1;

const blankrow = () => [WALL, WALL, ...Array(COLS).fill(0), WALL, WALL];
const wallrow = () => Array(COLS + EDGE * 2).fill(WALL);
const blank = () =>
	[...Array(ROWS).fill([]).map(_ => blankrow()),
	wallrow(),
	wallrow()];

const turncate = mtx => mtx.slice(HIDDEN_ROWS, - EDGE).map(row => row.slice(EDGE, - EDGE));

const lap = (mtx, mino) => {
	const lapped = mtx.map(row => [...row]);
	const pat = MINOS[mino.type][mino.rot];

	for (let row = 0; row < pat.length; ++row) {
		for (let col = 0; col < pat[0].length; ++col) {
			if (lapped[mino.y + row][mino.x + col] && pat[row][col])
				return false;
			lapped[mino.y + row][mino.x + col] ||= pat[row][col];
		}
	}
	return lapped;
};


const down = (mtx, mino) => {
	const moved = { ...mino, y: mino.y + 1 };
	return lap(mtx, moved) && moved;
}
const left = (mtx, mino) => {
	const moved = { ...mino, x: mino.x - 1 };
	return lap(mtx, moved) && moved;
};
const right = (mtx, mino) => {
	const moved = { ...mino, x: mino.x + 1 };
	return lap(mtx, moved) && moved;
};
const rot = (mtx, mino) => {
	const rotMino = { ...mino, rot: (mino.rot + 1) % MINOS[mino.type].length };
	if (lap(mtx, rotMino)) return rotMino;
	return right(mtx, rotMino) || left(mtx, rotMino) || mino;
}

const rnd = n => Math.floor(Math.random() * n);
const rndMino = () => {
	const type = rnd(MINOS.length);
	const width = MINOS[type][0][0].length;
	const x = rnd(COLS - width + 1) + EDGE;
	return { type, x, y: 0, rot: 0 };
};

const clear = mtx => {
	const remain = mtx.filter(
		row => row.slice(1, - 1).some(cell => cell === 0)
			|| row.every(cell => cell === WALL));
	const lines = mtx.length - remain.length;
	const newRows = Array(lines).fill([]).map(_ => blankrow());

	return { mtx: [...newRows, ...remain], lines };
};

const isDead = mtx => mtx.slice(0, 3).some(row => row.some(cell => cell > 0));

export default { blank, turncate, lap, down, left, right, rot, rndMino, clear, isDead };