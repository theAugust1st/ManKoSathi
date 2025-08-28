import { ListChecks, Plus, Flame } from "lucide-react";
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
    <div className="lg:col-span-2 bg-white p-6 h-full rounded-lg border border-brand-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ListChecks size={20} />
          <h1 className="text-lg font-semibold ">Habits</h1>
        </div>
        <button className="w-8 h-8 bg-brand-400 hover:bg-brand-500 rounded-full flex items-center justify-center transition-colors">
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

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
              className="bg-brand-50 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                {/* Habit Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Flame size={20} />
                  </div>
                  <span className="font-medium">{habit.habitName}</span>
                </div>

                {/* Completion Checkboxes */}
                <div className="flex gap-2">
                  {lastSevenDays.map((day, index) => {
                    const isCompleted = completedDatesForHabit.has(
                      day.getTime()
                    );
                    return (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
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
