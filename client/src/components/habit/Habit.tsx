import { Check,Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from 'react-toastify';
import HabitYearGrid from "./HabitYearGrid";
import { completeHabit, deleteHabit } from "../../services/habitServices";
import { useHabit } from "../../hooks/useHabit";
import type { Habit } from "../../contexts/HabitContext";
import Modal from "../ui/Modal";
import HabitFormModal from "./HabitFormModal";

type HabitProps = {
  id: string;
  name: string;
  description?: string;
  completedDates: string[];
  streak: number;
  longestStreak: number;
  lastCompletedDate?: string;
};

const today = new Date();

function Habit({
  id,
  name,
  description,
  completedDates,
  streak,
  longestStreak,
  lastCompletedDate,
}: HabitProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsHabits } = useHabit();

  const handleCompleteHabit = async (id: string) => {
    try {
      const response = await completeHabit(id);
  // console.debug(response);
      setIsHabits((prev: Habit[]) =>
        prev.map((h) => (h._id === id ? response.habit : h))
      );
    } catch (error) {
      console.error("Error: Failed to complete the habit.", error);
      toast.error("Failed to complete the habit for now.");
    }
  };
  const handleDelete = async (e:React.MouseEvent<HTMLButtonElement>,id:string) => {
    e.stopPropagation();
    try {
      const confirmed = window.confirm("Are you sure you want to delete this habit?");
      if (!confirmed) return;
      await deleteHabit(id);
      setIsHabits((prev: Habit[]) => prev.filter((h) => h._id !== id));
    } catch (error){
      console.error("Failed to delete habit:", error);
      toast.error("Failed to delete habit. Please try again.");
    }
  }
  const normalizedLastCompleted = lastCompletedDate
    ? lastCompletedDate.slice(0, 10)
    : null;
  const todayStr = today.toISOString().split("T")[0];
  const isCompletedToday = normalizedLastCompleted === todayStr;

  return (
    <div
      onClick={() => {setIsModalOpen(true)}}
      className="w-fit bg-white p-2 rounded-lg shadow md:space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 md:px-4 rounded-lg">
        <div className="flex-col">
          <h2 className="text-sm md:text-base lg:text-lg font-semibold text-brand-950">{name}</h2>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="flex gap-2 md:gap-4">
        <button onClick={(e)=>{handleDelete(e,id)}}className="p-2 text-brand-600 hover:text-red-500 hover:bg-red-100 rounded-xl transition-colors">
          <Trash2 className="h-4 w-4 md:h-6 md:w-6" />
        </button>
        <button
          onClick={(e) => {e.stopPropagation();handleCompleteHabit(id)}}
          disabled={isCompletedToday}
          className={`p-2 rounded-lg md:rounded-xl transition-colors border ${
            isCompletedToday
              ? "bg-green-100 text-green-400 border-green-200 cursor-not-allowed"
              : "text-green-600 hover:text-green-500 hover:bg-green-100 border-green-200"
          }`}
        >
          <Check className="h-4 w-4 md:h-6 md:w-6" />
        </button>
        </div>
      </div>

      {/* Year grid */}
      <HabitYearGrid completedDates={completedDates} />

      {/* Details */}
      <div className="flex items-center p-2 justify-between text-[0.625rem] md:text-xs text-gray-500">
        <div className="md:space-y-1">
          <p>
            Streak: <span className="font-medium text-brand-950">{streak}</span>
          </p>
          <p>
            Longest Streak:{" "}
            <span className="font-medium text-brand-950">{longestStreak}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4">
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 md:w-4 md:h-4 bg-brand-100 rounded-xs md:rounded-sm"></span> Empty
          </p>
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 md:w-4 md:h-4 bg-brand-500 rounded-xs md:rounded-sm"></span> Complete
          </p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <HabitFormModal
          type="edit"
          onClose={() => setIsModalOpen(false)}
          id={id}
          name={name}
          des={description}
        ></HabitFormModal>
      </Modal>
    </div>
  );
}

export default Habit;
