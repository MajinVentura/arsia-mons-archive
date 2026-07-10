import { useRef, useCallback, useState, useEffect } from "react";

// ============================================================
// Web Audio API-based sound engine for Chrome compatibility
// Uses AudioContext + pre-fetched ArrayBuffers for instant playback
// ============================================================

// Weapon sound file mapping
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

// Navigation sound types
type NavSoundType =
  | "type1"
  | "type2"
  | "type3"
  | "type4"
  | "type5"
  | "transrev"
  | "secret_found"
  | "menu_select";

const soundFiles: Record<SoundType, string> = {
  blaster: "/assets/blaster_9998be4c.wav",
  laser: "/assets/laser_ac0087f4.wav",
  rocket: "/assets/rocket1_89dfad3d.wav",
  flamer: "/assets/flamer_ee593747.wav",
  emp: "/assets/emp_shield_down_ddfc2cad.wav",
  shaped_bomb: "/assets/shaped_bomb_58d8f378.wav",
  plasma_bomb: "/assets/plasma_bomb_50c628b2.wav",
  neutron: "/assets/neutron_bomb_59b13d28.wav",
  cannon: "/assets/fixed_cannon_a994a187.wav",
  flare: "/assets/flare_d0449c55.wav",
  poison: "/assets/poison_7e194282.wav",
  health: "/assets/health_pack_4a8eadb3.wav",
  lazarus: "/assets/Lazarus_tract_24356333.wav",
  security: "/assets/security_pass_294f663a.wav",
  virus: "/assets/virus_9485e695.wav",
  disguise: "/assets/disguise_module_e3421a3c.wav",
  jetpack: "/assets/jetpak1_6989cdf8.wav",
  camera: "/assets/camera_541ae5c8.wav",
  insider: "/assets/insider_info_0bf38885.wav",
  door: "/assets/base_door_bec1671e.wav",
  detonator: "/assets/plasma_detonator_9dd88b2b.wav",
};

const navSoundFiles: Record<NavSoundType, string> = {
  type1: "/assets/type1_0115caad.wav",
  type2: "/assets/type2_10dbef38.wav",
  type3: "/assets/type3_db83556b.wav",
  type4: "/assets/type4_73cd8b11.wav",
  type5: "/assets/type5_dd767ebd.wav",
  transrev: "/assets/transrev_82935a08.wav",
  secret_found: "/assets/secret_found_97bf6e4b.wav",
  menu_select: "/assets/menu_select_1_aa853c3c.wav",
};

// Map nav tab IDs to their sound
const navTabSounds: Record<string, NavSoundType> = {
  home: "type1",
  agencies: "type2",
  timeline: "type3",
  equipment: "type4",
  districts: "type5",
  conspiracies: "transrev",
  classified: "secret_found",
};

// ============================================================
// Singleton AudioContext — shared across all hooks
// ============================================================
let audioCtx: AudioContext | null = null;
const bufferCache: Map<string, AudioBuffer> = new Map();

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume if suspended (Chrome autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Ensure AudioContext is resumed on first user interaction (Chrome requirement)
function ensureAudioUnlocked() {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    ctx.resume();
  }
}

// Set up global listener to unlock audio on first interaction
let unlockListenerAdded = false;
function addUnlockListener() {
  if (unlockListenerAdded) return;
  unlockListenerAdded = true;
  const unlock = () => {
    ensureAudioUnlocked();
    document.removeEventListener("click", unlock);
    document.removeEventListener("keydown", unlock);
    document.removeEventListener("touchstart", unlock);
  };
  document.addEventListener("click", unlock, { capture: true });
  document.addEventListener("keydown", unlock, { capture: true });
  document.addEventListener("touchstart", unlock, { capture: true });
}

// Fetch and decode audio buffer, with caching
async function loadBuffer(url: string): Promise<AudioBuffer | null> {
  if (bufferCache.has(url)) {
    return bufferCache.get(url)!;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    const ctx = getAudioContext();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    bufferCache.set(url, audioBuffer);
    return audioBuffer;
  } catch {
    return null;
  }
}

// Play a buffer immediately through the AudioContext
function playBuffer(buffer: AudioBuffer, volume: number): AudioBufferSourceNode {
  const ctx = getAudioContext();
  const source = ctx.createBufferSource();
  const gainNode = ctx.createGain();
  gainNode.gain.value = volume;
  source.buffer = buffer;
  source.connect(gainNode);
  gainNode.connect(ctx.destination);
  source.start(0);
  return source;
}

// ============================================================
// Pre-load critical sounds (nav + menu_select) on mount
// ============================================================
let preloadStarted = false;
function preloadCriticalSounds() {
  if (preloadStarted) return;
  preloadStarted = true;
  // Preload nav sounds
  Object.values(navSoundFiles).forEach((url) => loadBuffer(url));
  // Preload first few weapon sounds
  const priorityWeapons: SoundType[] = ["blaster", "laser", "rocket", "flamer"];
  priorityWeapons.forEach((key) => loadBuffer(soundFiles[key]));
}

// ============================================================
// Hooks
// ============================================================

export function useWeaponSound() {
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    addUnlockListener();
    preloadCriticalSounds();
  }, []);

  const playSound = useCallback((type: SoundType) => {
    // Stop any currently playing sound
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch {}
    }

    const src = soundFiles[type];
    if (!src) return;

    ensureAudioUnlocked();

    // Try to play from cache first (instant), otherwise fetch then play
    const cached = bufferCache.get(src);
    if (cached) {
      sourceRef.current = playBuffer(cached, 0.35);
    } else {
      loadBuffer(src).then((buffer) => {
        if (buffer) {
          sourceRef.current = playBuffer(buffer, 0.35);
        }
      });
    }
  }, []);

  return { playSound };
}

export function useNavSound() {
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    addUnlockListener();
    preloadCriticalSounds();
  }, []);

  const playNavSound = useCallback((tabId: string) => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch {}
    }

    const soundType = navTabSounds[tabId];
    const src = soundType ? navSoundFiles[soundType] : navSoundFiles.menu_select;

    ensureAudioUnlocked();

    const cached = bufferCache.get(src);
    if (cached) {
      sourceRef.current = playBuffer(cached, 0.3);
    } else {
      loadBuffer(src).then((buffer) => {
        if (buffer) {
          sourceRef.current = playBuffer(buffer, 0.3);
        }
      });
    }
  }, []);

  const playMenuClick = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch {}
    }

    const src = navSoundFiles.menu_select;
    ensureAudioUnlocked();

    const cached = bufferCache.get(src);
    if (cached) {
      sourceRef.current = playBuffer(cached, 0.4);
    } else {
      loadBuffer(src).then((buffer) => {
        if (buffer) {
          sourceRef.current = playBuffer(buffer, 0.4);
        }
      });
    }
  }, []);

  return { playNavSound, playMenuClick };
}

export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default to ON
  const hasAutoStarted = useRef(false);

  useEffect(() => {
    addUnlockListener();

    // Use HTMLAudioElement for ambient music (long-running, looped)
    const audio = new Audio("/assets/closer2_83535161.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    // Auto-start: attempt to play immediately
    const tryAutoPlay = () => {
      if (hasAutoStarted.current) return;
      hasAutoStarted.current = true;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay — wait for first user interaction
        setIsPlaying(false);
        const startOnInteraction = () => {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
          document.removeEventListener("click", startOnInteraction);
          document.removeEventListener("keydown", startOnInteraction);
          document.removeEventListener("touchstart", startOnInteraction);
        };
        document.addEventListener("click", startOnInteraction, { once: true });
        document.addEventListener("keydown", startOnInteraction, { once: true });
        document.addEventListener("touchstart", startOnInteraction, { once: true });
      });
    };

    tryAutoPlay();

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

// Global menu click player for App.tsx (uses Web Audio API)
export function playGlobalMenuClick() {
  ensureAudioUnlocked();
  const src = navSoundFiles.menu_select;
  const cached = bufferCache.get(src);
  if (cached) {
    playBuffer(cached, 0.4);
  } else {
    loadBuffer(src).then((buffer) => {
      if (buffer) {
        playBuffer(buffer, 0.4);
      }
    });
  }
}

export type { SoundType, NavSoundType };
