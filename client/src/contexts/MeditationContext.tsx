// File: client/src/contexts/MeditationContext.tsx

import  { createContext,  useState, type ReactNode } from 'react';
import type { BackgroundSound } from '../components/meditation/BackgroundSounds';

// 1. Define the shape of the data we need to store
export interface MeditationSettings {
  durationSeconds: string | number;
  meditationTechnique: string;
  mood: {
    preSession: string;
  };
  goals: string;
  backgroundSound: BackgroundSound;
}

// 2. Define the shape of our context
interface MeditationContextType {
  settings: MeditationSettings | null;
  setSessionSettings: (settings: MeditationSettings) => void;
}

// 3. Create the actual React Context
export const MeditationContext = createContext<MeditationContextType | undefined>(undefined);

// 4. Create the Provider component
// This component will wrap our meditation pages (Setup, Guide, Timer)
export function MeditationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<MeditationSettings | null>(null);

  const setSessionSettings = (newSettings: MeditationSettings) => {
    setSettings(newSettings);
  };

  const value = { settings, setSessionSettings };

  return (
    <MeditationContext.Provider value={value}>
      {children}
    </MeditationContext.Provider>
  );
}

// 5. Create the custom hook
// This is what our pages will use to access the data
