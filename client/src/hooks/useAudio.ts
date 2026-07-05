import { useRef, useCallback, useState, useEffect } from "react";

// Weapon sound synthesis types
type SoundType =
  | "blaster"
  | "laser"
  | "rocket"
  | "flamer"
  | "emp"
  | "shaped_bomb"
  | "plasma_bomb"
  | "neutron"
  | "cannon"
  | "flare"
  | "poison"
  | "poison_flamer"
  | "health"
  | "lazarus"
  | "security"
  | "virus"
  | "disguise"
  | "jetpack"
  | "camera"
  | "insider"
  | "door"
  | "detonator";

function createAudioContext(): AudioContext {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
}

function synthesizeWeaponSound(ctx: AudioContext, type: SoundType) {
  const now = ctx.currentTime;

  switch (type) {
    case "blaster": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    }
    case "laser": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2000, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    }
    case "rocket": {
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.5);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.5);
      break;
    }
    case "flamer": {
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.setValueAtTime(0.25, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.6);
      break;
    }
    case "emp": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.setValueAtTime(3000, now + 0.02);
      osc.frequency.setValueAtTime(50, now + 0.04);
      osc.frequency.setValueAtTime(2000, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }
    case "shaped_bomb": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    }
    case "plasma_bomb": {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, now);
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(60, now);
      osc2.frequency.exponentialRampToValueAtTime(20, now + 0.6);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.6);
      osc2.stop(now + 0.6);
      break;
    }
    case "neutron": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(40, now);
      osc.frequency.exponentialRampToValueAtTime(15, now + 0.8);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.setValueAtTime(0.4, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
      break;
    }
    case "cannon": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
      break;
    }
    case "flare": {
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(3000, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.4);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.4);
      break;
    }
    case "poison": {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();
      lfo.frequency.value = 8;
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain).connect(osc.frequency);
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      lfo.start(now);
      osc.stop(now + 0.5);
      lfo.stop(now + 0.5);
      break;
    }
    case "poison_flamer": {
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, now);
      filter.Q.value = 3;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      noise.connect(filter).connect(gain);
      osc.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      osc.start(now);
      noise.stop(now + 0.5);
      osc.stop(now + 0.5);
      break;
    }
    case "health": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.1);
      osc.frequency.setValueAtTime(784, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
      break;
    }
    case "lazarus": {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.6);
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(223, now);
      osc2.frequency.exponentialRampToValueAtTime(443, now + 0.6);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.7);
      osc2.stop(now + 0.7);
      break;
    }
    case "security": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(900, now + 0.08);
      osc.frequency.setValueAtTime(1200, now + 0.16);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
      break;
    }
    case "virus": {
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() > 0.5 ? 1 : -1) * Math.random() * (i % 100 < 50 ? 1 : 0.2);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      noise.connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.3);
      break;
    }
    case "disguise": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(1500, now + 0.4);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
      break;
    }
    case "jetpack": {
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1500, now);
      filter.frequency.setValueAtTime(2000, now + 0.1);
      filter.frequency.setValueAtTime(1500, now + 0.3);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.setValueAtTime(0.25, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.5);
      break;
    }
    case "camera": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(4000, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    }
    case "insider": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1000, now + 0.05);
      osc.frequency.setValueAtTime(800, now + 0.1);
      osc.frequency.setValueAtTime(1200, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
      break;
    }
    case "door": {
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.linearRampToValueAtTime(600, now + 0.15);
      filter.frequency.linearRampToValueAtTime(100, now + 0.4);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.4);
      break;
    }
    case "detonator": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.setValueAtTime(0, now + 0.03);
      gain.gain.setValueAtTime(0.2, now + 0.08);
      gain.gain.setValueAtTime(0, now + 0.11);
      gain.gain.setValueAtTime(0.2, now + 0.16);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
      break;
    }
  }
}

export function useWeaponSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((type: SoundType) => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    synthesizeWeaponSound(ctxRef.current, type);
  }, []);

  return { playSound };
}

export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/manus-storage/closer2_83535161.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return { isPlaying, toggle };
}

export type { SoundType };
