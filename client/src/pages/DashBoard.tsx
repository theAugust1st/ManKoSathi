import QuoteWidget from '../components/dashboard/QuoteWidget';
import HabitWidget from '../components/dashboard/HabitWidget';
import MeditationWidget from '../components/dashboard/MeditationWidget';
import { useState,useEffect } from 'react';
import { getHabits } from '../services/habitServices';
export type CompletedLogEntry = {
  date:Date;
}
export type Habit = {
    _id:string,
    habitName:string,
    description:string,
    frequency: 'daily' | 'weekly',
    currentStreak:number,
    longestStreak:number,
    lastCompletedDate:Date,
    completedLog: CompletedLogEntry[]
}
function DashBoard() {
  const [habits,setHabits] = useState<Habit[]>([])
  console.log(habits)
  useEffect(()=>{
    const fetchHabitData = async () => {
      try {
        const data = await getHabits();
        setHabits(data.habits)
      } catch (err:any) {
        console.log(err)
      }
    }
    fetchHabitData();
  },[])
  return (
    <div className="space-y-8">
      {/* For greeting */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-950">Good Morning,<span className="text-brand-500">UserName</span></h1>
        <p className="text-brand-800 mt-1">Ready to make today a great day?</p>
      </header>
      {/* for widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quote of the day widget */}
          <QuoteWidget />
        {/* Habits widgets */}
        <HabitWidget habits={habits}/>
        {/* Quote widgets */}
        <MeditationWidget />
      </div>
    </div>
  )
}

export default DashBoard