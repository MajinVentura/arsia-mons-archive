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

const navSoundFiles: Record<NavSoundType, string> = {
  type1: "/manus-storage/type1_77d4abe4.wav",
  type2: "/manus-storage/type2_ea017c89.wav",
  type3: "/manus-storage/type3_108fe906.wav",
  type4: "/manus-storage/type4_51be6aa6.wav",
  type5: "/manus-storage/type5_61caffdf.wav",
  transrev: "/manus-storage/transrev_065da611.wav",
  secret_found: "/manus-storage/secret_found_e71f13e4.wav",
  menu_select: "/manus-storage/menu_select_1_3496193a.wav",
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
    audio.play().catch(() => {});
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
    audio.play().catch(() => {});
  }, []);

  const playMenuClick = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(navSoundFiles.menu_select);
    audio.volume = 0.25;
    audioRef.current = audio;
    audio.play().catch(() => {});
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
