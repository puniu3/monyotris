const atx = new (window.AudioContext || window.webkitAudioContext)();

const noiseBuffer = (seed => {
	const buf = atx.createBuffer(1, atx.sampleRate, atx.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < data.length; ++i) {
		data[i] = seed / 2147483647 * 2 - 1;
		seed = seed * 48271 % 2147483647;
	}
	return buf;
})(114514);

export default function noise(pitch = 300.0, length = 1.0) {
	const noise = atx.createBufferSource();
	noise.buffer = noiseBuffer;

	const filter = atx.createBiquadFilter();
	filter.type = 'bandpass';
	filter.frequency.value = pitch;

	const gain = atx.createGain();

	noise.connect(filter).connect(gain).connect(atx.destination);
	noise.start();
	gain.gain.exponentialRampToValueAtTime(0.000000001, atx.currentTime + length);
}