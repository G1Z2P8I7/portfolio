"use client";

class AudioController {
  private ctx: AudioContext | null = null;
  private isUnlocked: boolean = false;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("portfolio-sound-muted");
      this.isMuted = savedMute === "true";
      this.initUnlock();
    }
  }

  private initUnlock() {
    const unlock = () => {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.isUnlocked = true;
      ["pointerdown", "keydown"].forEach((ev) => window.removeEventListener(ev, unlock));
    };

    ["pointerdown", "keydown"].forEach((ev) => window.addEventListener(ev, unlock, { once: true }));
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-sound-muted", String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playClick();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 1. Crisp Mechanical Click
  public playClick(freq = 820) {
    if (this.isMuted || !this.ctx || !this.isUnlocked) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.028);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // AudioContext safe catch
    }
  }

  // 2. Micro Tactile Hover Tick
  public playHover() {
    if (this.isMuted || !this.ctx || !this.isUnlocked) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.018);
    } catch {}
  }

  // 3. Globe Inertial Whoosh / Drag Swipe
  public playWhoosh(speed = 1) {
    if (this.isMuted || !this.ctx || !this.isUnlocked) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      filter.type = "lowpass";

      const now = this.ctx.currentTime;
      const baseFreq = 160 * Math.min(Math.max(speed, 0.5), 2.5);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(baseFreq * 0.7, now + 0.12);

      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.12);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }

  // 4. Harmonic Theme-Switch Chord
  public playThemeChord(index = 0) {
    if (this.isMuted || !this.ctx || !this.isUnlocked) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 987.77];
      const freq = notes[index % notes.length];
      const now = this.ctx.currentTime;

      [freq, freq * 1.5].forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + i * 0.02);

        gain.gain.setValueAtTime(0.08, now + i * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.02);
        osc.stop(now + 0.2);
      });
    } catch {}
  }

  // 5. Collision Audio for Physics
  public playCollision(velocity = 1) {
    if (this.isMuted || !this.ctx || !this.isUnlocked) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const now = this.ctx.currentTime;
      const v = Math.min(Math.max(velocity, 0.5), 3);
      osc.type = "sine";
      osc.frequency.setValueAtTime(120 + v * 60, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.06);

      gain.gain.setValueAtTime(Math.min(v * 0.04, 0.15), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }
}

export const sound = new AudioController();
