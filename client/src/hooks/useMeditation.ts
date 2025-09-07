import { useContext } from 'react';
import { MeditationContext } from '../contexts/MeditationContext';
export function useMeditation() {
  const context = useContext(MeditationContext);
  if (context === undefined) {
    throw new Error('useMeditation must be used within a MeditationProvider');
  }
  return context;
}