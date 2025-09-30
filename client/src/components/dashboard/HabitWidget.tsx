import { ListChecks, Plus, Flame, CircleFadingPlus } from "lucide-react";
import type { Habit } from "../../pages/DashBoard";
type HabitWidgetProps = {
  habits: Habit[];
};
function HabitWidget({ habits }: HabitWidgetProps) {
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      dates.push(date);
    }
    return dates;
  };
  const lastSevenDays = getLast7Days();

  return (
    <div className="lg:col-span-2 bg-white p-4 md:p-6  rounded-lg border border-brand-100 min-h-[150px] max-h-[300px] md:min-h-[250] md:max-h-[500px] overflow-y-auto">
      <div className="flex items-center justify-between mb-2 md:mb-6">
        <div className="flex items-center gap-3">
          <ListChecks className="w-4 h-4 md:w-6 md:h-6" />
          <h1 className="text-base md:text-lg font-bold ">Habits</h1>
        </div>
        {habits.length>0?<button className="w-6 h-6 md:w-8 md:h-8 bg-brand-400 hover:bg-brand-500 rounded-full cursor-pointer flex items-center justify-center transition-colors">
          <Plus className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </button>:""}
      </div>
      {habits.length === 0 && 
        (<div className="flex flex-col justify-center items-center gap-2">
          <CircleFadingPlus className="w-12 h-12 md:w-16 md:h-16 text-brand-400 cursor-pointer" />
          <span className="text-xs md:text-lg text-gray-500">Click to start your Habit</span>
        </div>)
      }
      {/* Habit List */}
      <div className="space-y-3">
        {habits.map((habit) => {
          const completedDatesForHabit = new Set(
            habit.completedLog.map((log) => {
              const d = new Date(log.date);
              d.setHours(0, 0, 0, 0);
              return d.getTime();
            })
          );
          return (
            <div
              key={habit._id}
              className="bg-brand-50 rounded-lg p-2 md:p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                {/* Habit Info */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 md:w-10 md:h-10 bg-brand-100 rounded-sm md:rounded-lg flex items-center justify-center">
                    <Flame className="h-4 w-4 md:h-6 md:w-6" />
                  </div>
                  <span className="font-medium text-sm md:text-base">{habit.habitName}</span>
                </div>

                {/* Completion Checkboxes */}
                <div className="flex gap-1 md:gap-2 ">
                  {lastSevenDays.map((day, index) => {
                    const isCompleted = completedDatesForHabit.has(
                      day.getTime()
                    );
                    return (
                      <div
                        key={index}
                        className={`w-4 h-4 md:w-8 md:h-8 rounded-sm md:rounded flex items-center justify-center transition-colors cursor-pointer ${
                          isCompleted
                            ? "bg-brand-500"
                            : "bg-brand-100 border-brand-200 hover:border-brand-300"
                        }`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitWidget;
