import {ListChecks, Plus} from "lucide-react";
import Habit from "../components/habit/Habit.tsx";
import { useHabit } from "../hooks/useHabit"

function HabitPage() {
    const {isHabits} = useHabit();
  return (
        <div className="space-y-4">
      {/* 1. Header and Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl fonft-bold text-brand-950 flex items-center gap-3">
          <ListChecks size={32} />
          Habits
        </h1>
        <button
          className="w-full sm:w-auto bg-brand-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors"
        >
          <Plus size={20} />
          Add New Habit
        </button>
      </div>
      {isHabits.map((habit)=>
        <Habit key={habit._id} name={habit.habitName} description = {habit.description} completedDates={habit.completedLog} streak={habit.currentStreak} longestStreak={habit.longestStreak}/>
      )}
      </div>
  )
}

export default HabitPage