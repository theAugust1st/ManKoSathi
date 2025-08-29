import QuoteWidget from '../components/dashboard/QuoteWidget';
import HabitWidget from '../components/dashboard/HabitWidget';
import MeditationWidget from '../components/dashboard/MeditationWidget';
import { useState,useEffect } from 'react';
import { getHabits } from '../services/habitServices';
import { getRandomQuote } from '../services/quoteServices';
import { getMeditationSessions } from '../services/meditation';
export type CompletedLogEntry = {
  date:Date;
}
export type MeditationSessions= {
  _id:string
  sessionDate:string,
  durationSeconds:number,
  meditationTechniques:'mindfulness'|'breathing'|'body-scan'|'loving-kindness'|'mantra'|'walking'|'others'|'none'
}
export type MeditationSessionResponse = {
  success:boolean,
  count:number,
  message:string,
  sessions: MeditationSessions[]
}
export type Quote = {
  _id:string
  quoteText:string,
  author:string,
  category: string
  // 'motivation'|'wisdom'|'mindfulness'|'perseverance'|'calm'|'positivity'|'reflection'|'inspiration'|'self-awareness'
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
export type HabitResponse ={
  count:number,
  habits: Habit[],
  message:string,
  success:boolean
}
export type QuoteResponse ={
  success:false,
  message:string,
  quote:Quote
}

function DashBoard() {
  const [habits,setHabits] = useState<Habit[]>([]);
  const [quote, setQuote] = useState<Quote | null >(null)
  const [meditations, setMeditations] = useState<MeditationSessions[]>([])
  useEffect(()=>{
    const fetchDashBoardData = async () => {
      try {
        const [habitsData, quoteData,meditationSessionsData] = await Promise.all([getHabits(), getRandomQuote(),getMeditationSessions()])
        setHabits(habitsData.habits)
        setQuote(quoteData.quote)
        setMeditations(meditationSessionsData.sessions)
      } catch (err:any) {
        console.log(err)
      }
    }
    fetchDashBoardData();
  },[])
  return (
    <div className="space-y-8">
      {/* For greeting */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-950">Good Morning,<span className="text-brand-500">UserName</span></h1>
        <p className="text-brand-800 mt-1">Ready to make today a great day?</p>
      </header>
      {/* for widgets */} 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quote of the day widget */}
          <QuoteWidget quote = {quote}/>
        {/* Habits widgets */}
        <HabitWidget habits={habits}/>
        {/* Quote widgets */}
        <MeditationWidget meditations={meditations}/>
      </div>
    </div>
  )
}

export default DashBoard