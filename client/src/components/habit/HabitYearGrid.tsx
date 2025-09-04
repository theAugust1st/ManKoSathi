import { useState, useEffect } from "react";
type HabitYearGridProps = {
  completedDates: string[]
}
const HabitYearGrid = ({ completedDates = [] }:HabitYearGridProps) => {
  console.log("completeDates:",completedDates)
  const [weeksToShow, setWeeksToShow] = useState(52);

  // Detect screen size to set weeks
  useEffect(() => {
    const updateWeeks = () => {
      const width = window.innerWidth;
      if (width < 768) setWeeksToShow(12);       // mobile
      else if (width < 1024) setWeeksToShow(24); // tablet
      else setWeeksToShow(52);                   // desktop
    };
    updateWeeks();
    window.addEventListener("resize", updateWeeks);
    return () => window.removeEventListener("resize", updateWeeks);
  }, []);

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - weeksToShow * 7 + 1);

    const normalizedDates = completedDates.map(d =>
    typeof d === "string"
      ? d.split("T")[0]
      : new Date(d.date).toISOString().split("T")[0]
  );
    const completed = new Set(normalizedDates);

  // Generate days
  const days = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      day: d.getDay(), // 0=Sunday
      completed: completed.has(dateStr),
      isToday: dateStr === today.toISOString().split("T")[0],
    });
  }

  // Arrange by weeks (columns)
  const weeks = [];
  let week : any  = [];
  days.forEach((day) => {
    week.push(day);
    if (day.day === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week); // last partial week

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto w-fit">
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, di) => {
              const day = week.find((d:any) => d.day === di);
              return (
                <div
                  key={di}
                  className={`w-4 h-4 rounded-sm
                    ${
                      day
                        ? day.completed
                          ? "bg-brand-500"
                          : "bg-brand-100"
                        : "bg-transparent"
                    }
                    ${day?.isToday ? "ring-2 ring-brand-300" : ""}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitYearGrid;
