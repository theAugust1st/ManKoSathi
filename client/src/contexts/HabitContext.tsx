import { createContext, useState } from "react";
export type Habit = {
  _id: string;
  habitName: string;
  description?: string;
  frequncy: "daily" | "weekly";
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  completedLog: string[];
};
type HabitContextType = {
  isHabits: Habit[];
  setIsHabits: (habits: Habit[]) => void;
};
export const HabitContext = createContext<HabitContextType | undefined>(undefined
);

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHabits, setIsHabits] = useState<Habit[]>([]);
  const value = { isHabits, setIsHabits };
  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};
