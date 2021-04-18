const atx = new (window.AudioContext || window.webkitAudioContext)();
const gain = atx.createGain();
const osc = atx.createOscillator();
osc.connect(gain).connect(atx.destination);