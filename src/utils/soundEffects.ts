/**
 * Procedural Web Audio API sound generator for realistic grill sizzle & seasoning
 * 100% procedural with zero external audio file dependencies.
 */

class GrillAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx?.currentTime || 0);
    }
    return this.isMuted;
  }

  public startSizzle() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    // Create continuous sizzle white noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Highpass & Bandpass filtering to imitate fat sizzling on hot cast iron
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(2400, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime);

    whiteNoise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();

    this.noiseNode = whiteNoise;
    this.filterNode = bandpass;
    this.gainNode = gain;
    this.isPlaying = true;
  }

  public setHeatIntensity(intensity: number) {
    if (!this.ctx || !this.gainNode || !this.filterNode) return;
    const targetGain = this.isMuted ? 0 : 0.08 + intensity * 0.12;
    const targetFreq = 1800 + intensity * 1500;
    const t = this.ctx.currentTime;
    this.gainNode.gain.setTargetAtTime(targetGain, t, 0.2);
    this.filterNode.frequency.setTargetAtTime(targetFreq, t, 0.2);
  }

  public triggerBasteBurst() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    // Create a sudden sizzle flare burst
    const burstDuration = 0.8;
    const bufferSize = this.ctx.sampleRate * burstDuration;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.25));
    }

    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + burstDuration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    source.start();
  }

  public stop() {
    if (this.noiseNode && 'stop' in this.noiseNode) {
      try {
        (this.noiseNode as AudioScheduledSourceNode).stop();
      } catch {
        // ignore
      }
    }
    this.isPlaying = false;
  }
}

export const grillSound = new GrillAudioEngine();
