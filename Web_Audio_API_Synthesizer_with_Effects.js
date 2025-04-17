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

        const wetGain = this.audioCtx.createGain();
        wetGain.gain.value = 0.3;

        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(wetGain);

        return wetGain;
    }

    createReverb() {
        const convolver = this.audioCtx.createConvolver();

        const wetGain = this.audioCtx.createGain();
        wetGain.gain.value = 0.2;

        const sampleRate = this.audioCtx.sampleRate;
        const length = sampleRate * 2;
        const impulse = this.audioCtx.createBuffer(2, length, sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            left[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
            right[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);

        }
        convolver.buffer = impulse;
        convolver.connect(wetGain);

        return wetGain;
    }

    noteOn(note, velocity = 1.0) {
        if (this.oscillators.has(note)) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = this.waveform;
        osc.frequency.value = this.noteToFrequency(note);
        gain.gain.value = 0;

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();

        const now = this.audioCtx.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(velocity, now + this.envelope.attack);

        gain.gain.linearRampToValueAtTime(
            velocity *this.envelope.attack + this.envelope.decay
        );

        this.oscillators.set(note, { osc, gain });
    }
    noteOff(note) {
        if (!this.oscillators.has(note)) return;

        const { osc, gain } = this.oscillators.get(note);
        const now = this.audioCtx.currentTime;

        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, now + this.envelope.release);

        osc.stop(now + this.envelope.release);
        this.oscillators.delete(note);
    } 

    noteToFrequency(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    setWaveform(type) {
        this.waveform = type;
        this.oscillators.forEach(( { osc }) => {
            osc.type = type;
        })
    }

    setDelayTime(time) {
        this.delay.delayTime.value = time;
    }

    setReverbAmount(amount) {
        this.reverb.gain.value = amount;
    }
}

const synth = new Synthesizer();

synth.noteOn(60);
synth.noteOn(64);
synth.noteOn(67);

synth.setWaveform('square');
synth.setDelayTime(0.5);
synth.setReverbAmount(0.4);

setTimeout(() => {
    synth.noteOff(60);
    synth.noteOff(64);
    synth.noteOff(67);

}, 1000);