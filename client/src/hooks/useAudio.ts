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
  blaster: "/manus-storage/blaster_9998be4c.wav",
  laser: "/manus-storage/laser_ac0087f4.wav",
  rocket: "/manus-storage/rocket1_89dfad3d.wav",
  flamer: "/manus-storage/flamer_ee593747.wav",
  emp: "/manus-storage/emp_shield_down_ddfc2cad.wav",
  shaped_bomb: "/manus-storage/shaped_bomb_58d8f378.wav",
  plasma_bomb: "/manus-storage/plasma_bomb_50c628b2.wav",
  neutron: "/manus-storage/neutron_bomb_59b13d28.wav",
  cannon: "/manus-storage/fixed_cannon_a994a187.wav",
  flare: "/manus-storage/flare_d0449c55.wav",
  poison: "/manus-storage/poison_7e194282.wav",
  health: "/manus-storage/health_pack_4a8eadb3.wav",
  lazarus: "/manus-storage/Lazarus_tract_24356333.wav",
  security: "/manus-storage/security_pass_294f663a.wav",
  virus: "/manus-storage/virus_9485e695.wav",
  disguise: "/manus-storage/disguise_module_e3421a3c.wav",
  jetpack: "/manus-storage/jetpak1_6989cdf8.wav",
  camera: "/manus-storage/camera_541ae5c8.wav",
  insider: "/manus-storage/insider_info_0bf38885.wav",
  door: "/manus-storage/base_door_bec1671e.wav",
  detonator: "/manus-storage/plasma_detonator_9dd88b2b.wav",
};

const navSoundFiles: Record<NavSoundType, string> = {
  type1: "/manus-storage/type1_0115caad.wav",
  type2: "/manus-storage/type2_10dbef38.wav",
  type3: "/manus-storage/type3_db83556b.wav",
  type4: "/manus-storage/type4_73cd8b11.wav",
  type5: "/manus-storage/type5_dd767ebd.wav",
  transrev: "/manus-storage/transrev_82935a08.wav",
  secret_found: "/manus-storage/secret_found_97bf6e4b.wav",
  menu_select: "/manus-storage/menu_select_1_aa853c3c.wav",
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

export function useWeaponSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((type: SoundType) => {
    // Stop any currently playing sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const src = soundFiles[type];
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = 0.35;
    audioRef.current = audio;
    audio.play().catch((err) => {
      console.warn("Weapon SFX play failed:", err);
    });
  }, []);

  return { playSound };
}

export function useNavSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playNavSound = useCallback((tabId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const soundType = navTabSounds[tabId];
    const src = soundType ? navSoundFiles[soundType] : navSoundFiles.menu_select;
    
    const audio = new Audio(src);
    audio.volume = 0.3;
    audioRef.current = audio;
    audio.play().catch((err) => {
      console.warn("Nav SFX play failed:", err);
    });
  }, []);

  const playMenuClick = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(navSoundFiles.menu_select);
    audio.volume = 0.25;
    audioRef.current = audio;
    audio.play().catch((err) => {
      console.warn("Menu click SFX play failed:", err);
    });
  }, []);

  return { playNavSound, playMenuClick };
}

export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default to ON
  const hasAutoStarted = useRef(false);

  useEffect(() => {
    const audio = new Audio("/manus-storage/closer2_83535161.mp3");
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
        };
        document.addEventListener("click", startOnInteraction, { once: true });
        document.addEventListener("keydown", startOnInteraction, { once: true });
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

export type { SoundType, NavSoundType };
