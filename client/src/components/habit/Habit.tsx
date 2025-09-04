import { Check } from "lucide-react"
import HabitYearGrid from "./HabitYearGrid"
type HabitProps = {
    name : string,
    description?: string,
    completedDates: string[],
    streak: number,
    longestStreak: number

}
function Habit({name,description,completedDates,streak,longestStreak}:HabitProps) {
  return (
    <div className="w-fit bg-white p-2 rounded-lg shadow space-y-4">
        <div className="flex items-center justify-between px-4 rounded-lg">
            {/* for habit name */}
            <div className="flex-col items-center justify-between">
            <h2 className="text-xl font-semibold text-brand-950">{name}</h2>
            <p className="text-xs text-gray-500">{description}</p>
            </div>
            <div className="p-2 text-green-600 hover:text-green-500 hover:bg-green-100 rounded-xl transition-colors cursor-pointer border border-green-200">
            <Check size={32} />
            </div>   
        </div>
        <HabitYearGrid completedDates={completedDates}/>
        {/* for habit details */}
        <div className="flex items-center p-2 justify-between text-xs text-gray-500">
            <div >
                <p>Streak:{streak}</p>
                <p>Longest Streak:{longestStreak}</p>
            </div>
            <div className="flex gap-2">
                <p className="flex items-center gap-2"><span className="w-4 h-4 bg-brand-100 rounded-sm"></span>empty</p>
                <p className="flex items-center gap-2"><span className="w-4 h-4 bg-brand-500 rounded-sm"></span>complete</p>
            </div>
        </div>
    </div>
  )
}

export default Habit