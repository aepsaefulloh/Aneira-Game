import Phaser from "phaser";
import { getStorageBoolean, setStorageBoolean } from "../utils/storage";

export class AudioManager {
  private static readonly muteStorageKey = "audio-muted";
  private static muted = false;
  private static initialized = false;

  static initialize(): void {
    if (this.initialized) {
      return;
    }

    this.muted = getStorageBoolean(this.muteStorageKey, false);
    this.initialized = true;
  }

  static isMuted(): boolean {
    this.initialize();
    return this.muted;
  }

  static setMuted(value: boolean): void {
    this.initialize();
    this.muted = value;
    setStorageBoolean(this.muteStorageKey, value);
  }

  static toggleMuted(): boolean {
    this.setMuted(!this.isMuted());
    return this.muted;
  }

  static play(scene: Phaser.Scene, key: string): void {
    this.initialize();

    if (this.muted) {
      return;
    }

    try {
      if (scene.cache.audio.exists(key)) {
        scene.sound.play(key, { volume: this.getVolumeForKey(key) });
        return;
      }
    } catch {
      // Fall through to synthesized fallback.
    }

    this.playFallbackTone(key);
  }

  private static getVolumeForKey(key: string): number {
    if (key.includes("wrong")) {
      return 0.22;
    }

    if (key.includes("tap")) {
      return 0.14;
    }

    if (key.includes("animal")) {
      return 0.18;
    }

    return 0.28;
  }

  private static playFallbackTone(key: string): void {
    const audioContext = this.getAudioContext();

    if (!audioContext) {
      return;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const now = audioContext.currentTime;
    const tone = this.getFallbackTone(key);

    oscillator.type = tone.type;
    oscillator.frequency.setValueAtTime(tone.frequency, now);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(tone.volume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);

    oscillator.start(now);
    oscillator.stop(now + tone.duration);
  }

  private static getAudioContext(): AudioContext | null {
    const AudioCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtor) {
      return null;
    }

    try {
      const context = new AudioCtor();
      if (context.state === "suspended") {
        void context.resume();
      }
      return context;
    } catch {
      return null;
    }
  }

  private static getFallbackTone(key: string): {
    frequency: number;
    duration: number;
    volume: number;
    type: OscillatorType;
  } {
    if (key.includes("wrong")) {
      return { frequency: 240, duration: 0.16, volume: 0.028, type: "triangle" };
    }

    if (key.includes("tap")) {
      return { frequency: 520, duration: 0.06, volume: 0.018, type: "sine" };
    }

    if (key.includes("animal")) {
      return { frequency: 460, duration: 0.18, volume: 0.022, type: "triangle" };
    }

    return { frequency: 660, duration: 0.2, volume: 0.03, type: "sine" };
  }
}
