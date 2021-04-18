const O = [[
	"##",
	"##"]];

const I = [[
	"    ",
	"####"], [
	" #",
	" #",
	" #",
	" #",
]];

const S = [[
	" ##",
	"## "], [
	" # ",
	" ##",
	"  #"]];

const Z = [[
	"## ",
	" ##"], [
	" #",
	"##",
	"# "]];

const J = [[
	"#  ",
	"###",
	"   "], [
	" ##",
	" # ",
	" # "], [
	"   ",
	"###",
	"  #"], [
	" # ",
	" # ",
	"## "]];

const L = [[
	"  #",
	"###",
	"   "], [
	" # ",
	" # ",
	" ##"], [
	"   ",
	"###",
	"#  "], [
	"## ",
	" # ",
	" # "]];

const T = [[
	" # ",
	"###"], [
	" # ",
	" ##",
	" # "], [
	"   ",
	"###",
	" # "], [
	" # ",
	"## ",
	" # "]];

const MINOS = [I, J, L, O, S, T, Z]
	.map((mino, id) =>
		mino.map(rot =>
			rot.map(row => [...row]
				.map(cell => cell === "#" ? id + 1 : 0))));

export default MINOS;