import { ListChecks, Plus, Calendar, User, Zap, Trophy } from "lucide-react";
import Habit from "../components/habit/Habit.tsx";
import { useHabit } from "../hooks/useHabit";
import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal.tsx";
import HabitFormModal from "../components/habit/HabitFormModal.tsx";
import DropdownMenu from "../components/ui/DropdownMenu.tsx";
import { getHabits } from "../services/habitServices.ts";
const sortOptions = [
  {
    value: "createdAt",
    label: "Created At",
    icon: Calendar,
    description: "Sort by creation date",
    order:"desc"
  },
  {
    value: "habitName",
    label: "Name",
    icon: User,
    description: "Sort alphabetically",
    order:"asc"
  },
  {
    value: "currentStreak",
    label: "Streak",
    icon: Zap,
    description: "Streak count",
    order:'desc'
  },
  {
    value: "longestStreak",
    label: "Longest streak",
    icon: Trophy,
    description: "Best streak achieved",
    order:"desc"
  },
];
function HabitPage() {
  const { isHabits, setIsHabits } = useHabit();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);
  const [order, setOrder] = useState<string>(sortOptions[0].order)
  useEffect(()=>{
    const fetchHabits = async ()=>{
      try {
        console.log("Calling habit befre fetch",sortBy)
      const habit = await getHabits({sortBy,order});
      setIsHabits(habit.habits)
      } catch (error) {
        console.log("Failed to fetch the habits try again later",error)
      }
        }
        fetchHabits()
  },[sortBy,order])
  return (
    <div className="space-y-4 p-4 md:p-8">
      {/* 1. Header and Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <h1 className="text-lg md:text-4xl fonft-bold text-brand-950 flex items-center gap-3">
          <ListChecks className="w-6 h-6 md:w-8 md:h-8" />
          Habits
        </h1>
        <div className="flex gap-2 items-center">
          <DropdownMenu
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            order={order}
            onChangeOrder={setOrder}
          ></DropdownMenu>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="w-full text-xs md:text-base sm:w-auto bg-brand-500 text-white font-bold px-2 py-1 md:px-4 md:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors"
          >
            <Plus size={20} />
            Add New Habit
          </button>
        </div>
      </div>
      {isHabits.map((habit) => (
        <Habit
          key={habit._id}
          name={habit.habitName}
          description={habit.description}
          completedDates={habit.completedLog}
          streak={habit.currentStreak}
          longestStreak={habit.longestStreak}
          id={habit._id}
          lastCompletedDate={habit.lastCompletedDate}
        />
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <HabitFormModal
          type="create"
          onClose={() => setIsModalOpen(false)}
        ></HabitFormModal>
      </Modal>
    </div>
  );
}

export default HabitPage;
