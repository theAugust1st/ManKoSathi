import {ListChecks, Plus} from "lucide-react";
import Habit from "../components/habit/Habit.tsx";
import { useHabit } from "../hooks/useHabit"
import { useState } from "react";
import Modal from "../components/ui/Modal.tsx";
import HabitFormModal from "../components/habit/HabitFormModal.tsx";

function HabitPage() {
    const {isHabits} = useHabit();
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  return (
        <div className="space-y-4">
      {/* 1. Header and Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl fonft-bold text-brand-950 flex items-center gap-3">
          <ListChecks size={32} />
          Habits
        </h1>
        <button onClick={(e)=>{e.stopPropagation();setIsModalOpen(true)}}
          className="w-full sm:w-auto bg-brand-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors"
        >
          <Plus size={20} />
          Add New Habit
        </button>
      </div>
      {isHabits.map((habit)=>
        <Habit key={habit._id} name={habit.habitName} description = {habit.description} completedDates={habit.completedLog} streak={habit.currentStreak} longestStreak={habit.longestStreak} id={habit._id} lastCompletedDate={habit.lastCompletedDate}/>
      )}
      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
        <HabitFormModal type="create" onClose={()=>setIsModalOpen(false)}></HabitFormModal>
      </Modal>
      </div>
  )
}

export default HabitPage