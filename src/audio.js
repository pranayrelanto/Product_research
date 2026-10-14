// ==========================================================================
// AUDIO SYNTHESIZER: PROCEDURAL SODA CAN CRACK, FIZZ & COKE POURING
// ==========================================================================

export class SodaAudioEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.pourLoopGain = null;
    this.pourNoiseSource = null;
    this.pourBubbleInterval = null;
    this.isPouring = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (!this.enabled && this.isPouring) {
      this.stopPourSound();
    }
    return this.enabled;
  }

  // Iconic Can Crack, Air Release & Fizz Eruption: "K-CHHH-POP-FIZZZZZ!"
  playCanOpen() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Sharp Metal Clink (High frequency bandpass pop of tab lifting)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1600, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.08);

    oscGain.gain.setValueAtTime(0.5, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);

    // 2. High-Pressure Air Release ("Psssshhhh!")
    const airBufferSize = this.ctx.sampleRate * 0.35;
    const airBuffer = this.ctx.createBuffer(1, airBufferSize, this.ctx.sampleRate);
    const airOut = airBuffer.getChannelData(0);
    for (let i = 0; i < airBufferSize; i++) {
      airOut[i] = Math.random() * 2 - 1;
    }

    const airNoise = this.ctx.createBufferSource();
    airNoise.buffer = airBuffer;

    const airFilter = this.ctx.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.setValueAtTime(5200, t);
    airFilter.frequency.exponentialRampToValueAtTime(2400, t + 0.32);
    airFilter.Q.value = 3.0;

    const airGain = this.ctx.createGain();
    airGain.gain.setValueAtTime(0.0, t);
    airGain.gain.linearRampToValueAtTime(0.65, t + 0.015);
    airGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    airNoise.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(this.ctx.destination);

    airNoise.start(t + 0.01);
    airNoise.stop(t + 0.36);
  }

  // Satisfying Ice Chime & Settling Fizz when Glass reaches 100% full
  playGlassFull() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.playIceChime();
    this.playFizzBurst(this.ctx.currentTime + 0.05, 1.2);
  }

  // Carbonation Fizz Burst (High-frequency bubbling effervescence)
  playFizzBurst(startTime, duration = 1.5) {
    if (!this.enabled || !this.ctx) return;
    const t = startTime || this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * duration;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (0.8 + 0.2 * Math.sin(i * 0.05));
    }

    const fizzSource = this.ctx.createBufferSource();
    fizzSource.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, t);

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'peaking';
    filter2.frequency.setValueAtTime(5500, t);
    filter2.Q.value = 4.0;
    filter2.gain.value = 6;

    const fizzGain = this.ctx.createGain();
    fizzGain.gain.setValueAtTime(0.4, t);
    fizzGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    fizzSource.connect(filter);
    filter.connect(filter2);
    filter2.connect(fizzGain);
    fizzGain.connect(this.ctx.destination);

    fizzSource.start(t);
    fizzSource.stop(t + duration);
  }

  // Realistic Fizzy Coke Pouring Sound (Liquid stream gurgle + continuous fizz)
  startPourSound() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx || this.isPouring) return;

    this.isPouring = true;
    const t = this.ctx.currentTime;

    // 1. Continuous liquid rushing noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.pourNoiseSource = this.ctx.createBufferSource();
    this.pourNoiseSource.buffer = noiseBuffer;
    this.pourNoiseSource.loop = true;

    // Liquid formant filter (low-mid gurgle)
    const liquidFilter = this.ctx.createBiquadFilter();
    liquidFilter.type = 'bandpass';
    liquidFilter.frequency.setValueAtTime(900, t);
    liquidFilter.Q.value = 1.8;

    // High fizz filter
    const fizzFilter = this.ctx.createBiquadFilter();
    fizzFilter.type = 'highpass';
    fizzFilter.frequency.setValueAtTime(4200, t);

    this.pourLoopGain = this.ctx.createGain();
    this.pourLoopGain.gain.setValueAtTime(0.001, t);
    this.pourLoopGain.gain.linearRampToValueAtTime(0.38, t + 0.15);

    this.pourNoiseSource.connect(liquidFilter);
    liquidFilter.connect(this.pourLoopGain);

    this.pourNoiseSource.connect(fizzFilter);
    fizzFilter.connect(this.pourLoopGain);

    this.pourLoopGain.connect(this.ctx.destination);
    this.pourNoiseSource.start(t);

    // 2. Intermittent Gurgling Bubble Pops
    this.pourBubbleInterval = setInterval(() => {
      if (!this.isPouring || !this.ctx) return;
      const bt = this.ctx.currentTime;
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();

      bOsc.type = 'sine';
      const baseFreq = 400 + Math.random() * 500;
      bOsc.frequency.setValueAtTime(baseFreq, bt);
      bOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, bt + 0.04);

      bGain.gain.setValueAtTime(0.08, bt);
      bGain.gain.exponentialRampToValueAtTime(0.001, bt + 0.05);

      bOsc.connect(bGain);
      bGain.connect(this.ctx.destination);
      bOsc.start(bt);
      bOsc.stop(bt + 0.06);
    }, 90);
  }

  stopPourSound() {
    this.isPouring = false;
    if (this.pourBubbleInterval) {
      clearInterval(this.pourBubbleInterval);
      this.pourBubbleInterval = null;
    }
    if (this.pourLoopGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.pourLoopGain.gain.linearRampToValueAtTime(0.001, t + 0.2);
      setTimeout(() => {
        if (this.pourNoiseSource) {
          try { this.pourNoiseSource.stop(); } catch (e) {}
          this.pourNoiseSource = null;
        }
      }, 250);
    }
  }

  // Soft UI click feedback
  playClick() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(680, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.04);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Chill / Ice chime
  playIceChime() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(950, t + 0.18);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // Realistic glass/crystal ice clink sound when ice rocks drop and land in tumbler
  playIceDrop(pitch = 1800) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const f0 = pitch * (0.88 + Math.random() * 0.24);
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f0 * 0.42, t + 0.09);

    gain.gain.setValueAtTime(0.24, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Smooth whoosh & crystal ring when glass glides away into background
  playGlassSlideAway() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Whoosh noise / filter glide
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.45);

    gain.gain.setValueAtTime(0.16, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.50);

    // Subtle gentle bell chime trailing off
    const bell = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();
    bell.type = 'triangle';
    bell.frequency.setValueAtTime(1100, t);
    bell.frequency.exponentialRampToValueAtTime(440, t + 0.55);
    bellGain.gain.setValueAtTime(0.08, t);
    bellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.60);

    bell.connect(bellGain);
    bellGain.connect(this.ctx.destination);

    bell.start(t);
    bell.stop(t + 0.62);
  }

  // Futuristic cybernetic audio feedback for Cyborg AI interactions
  playCyborgBeep(type = 'ack') {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    if (type === 'open') {
      // Ascending two-tone cyber greeting
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(1040, t + 0.12);
      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } else if (type === 'apply') {
      // Futuristic 3-tone technological chord for applying can changes
      [587.33, 880, 1174.66].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.035);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.25, t + idx * 0.035 + 0.09);
        gain.gain.setValueAtTime(0.11, t + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.035 + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.035);
        osc.stop(t + idx * 0.035 + 0.16);
      });
    } else {
      // Crisp tech blip for acknowledgment
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(1450, t + 0.05);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    }
  }
}

