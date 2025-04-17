class Synthesizer {
    constructor() {

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillators = new Map();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = 0.3;

        this.delay = this.createDelay();
        this.reverb = this.createReverb();

        this.masterGain.connect(this.delay);
        this.delay.connect(this.reverb);
        this.reverb.connect(this.audioCtx.destination);

        this.waveform = 'sawtooth';
        this.envelope = {
            attack: 0.1,
            decay : 0.3,
            sustain: 0.7,
            release: 0.5
        };
    }

    createDelay() {
        const delay = this.audioCtx.createDelay(2.0);
        delay.delayTime.value=0.3;

        const feedback = this.audioCtx.createGain();
        feedback.gain.value = 0.5;
    }
}