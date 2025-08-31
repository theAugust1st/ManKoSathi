

import  { createContext,  useState, type ReactNode } from 'react';
import type { BackgroundSound } from '../components/meditation/BackgroundSounds';

export interface MeditationSettings {
  durationSeconds: string | number;
  meditationTechnique: string;
  mood: {
    preSession: string;
    postSession: string;
  };
  goals: string;
  backgroundSound: BackgroundSound;
}

interface MeditationContextType {
  settings: MeditationSettings | null;
  setSessionSettings: (settings: MeditationSettings) => void;
  resetSession:()=>void;
}

export const MeditationContext = createContext<MeditationContextType | undefined>(undefined);


export function MeditationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<MeditationSettings | null>(null);

  const setSessionSettings = (newSettings: MeditationSettings) => {
    setSettings(newSettings);
  };
  const resetSession =()=>{
    setSettings(null);
  }
  const value = { settings, setSessionSettings,resetSession };

  return (
    <MeditationContext.Provider value={value}>
      {children}
    </MeditationContext.Provider>
  );
}


