import { useRef, useCallback, useState, useEffect } from "react";

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

const soundFiles: Record<SoundType, string> = {
  blaster: "/manus-storage/blaster_bdd37c83.wav",
  laser: "/manus-storage/laser_8f432223.wav",
  rocket: "/manus-storage/rocket1_f64dcc5f.wav",
  flamer: "/manus-storage/flamer_845db15e.wav",
  emp: "/manus-storage/emp_shield_down_10162366.wav",
  shaped_bomb: "/manus-storage/shaped_bomb_5ade1e1d.wav",
  plasma_bomb: "/manus-storage/plasma_bomb_2b38501f.wav",
  neutron: "/manus-storage/neutron_bomb_071a4767.wav",
  cannon: "/manus-storage/fixed_cannon_188f0201.wav",
  flare: "/manus-storage/flare_d8ef6d4d.wav",
  poison: "/manus-storage/poison_a7563d68.wav",

  health: "/manus-storage/health_pack_c544fa8c.wav",
  lazarus: "/manus-storage/Lazarus_tract_3e8133cb.wav",
  security: "/manus-storage/security_pass_27158b5b.wav",
  virus: "/manus-storage/virus_f75cb299.wav",
  disguise: "/manus-storage/disguise_module_3a01093a.wav",
  jetpack: "/manus-storage/jetpak1_94e6f466.wav",
  camera: "/manus-storage/camera_5f4b55e1.wav",
  insider: "/manus-storage/insider_info_20045a78.wav",
  door: "/manus-storage/base_door_4a908daa.wav",
  detonator: "/manus-storage/plasma_detonator_679029ae.wav",
};

export function useWeaponSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((type: SoundType) => {
    // Stop any currently playing sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(soundFiles[type]);
    audio.volume = 0.35; // Lower volume as requested
    audioRef.current = audio;
    audio.play().catch(() => {});
  }, []);

  return { playSound };
}

export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/manus-storage/closer2_83535161.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
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
