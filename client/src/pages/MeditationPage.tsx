
import { Wind, Plus, Trash2 } from 'lucide-react';
import { useState,useEffect} from 'react';
import { getMeditationSessions } from '../services/meditationServices';
import type { MeditationSessions } from './DashBoard';
import { useNavigate } from 'react-router-dom';

// --- Mock (Static) Data ---
// We will use this to build the UI. Later, this will come from your API.
// const mockMeditationSessions = [
//   { 
//     _id: 'm1', 
//     sessionDate: '2025-08-28T10:00:00Z',
//     durationSeconds: 600, // 10 minutes
//     meditationTechnique: 'mindfulness',
//   },
//   { 
//     _id: 'm2', 
//     sessionDate: '2025-08-27T09:30:00Z',
//     durationSeconds: 300, // 5 minutes
//     meditationTechnique: 'breathing',
//   },
//   { 
//     _id: 'm3', 
//     sessionDate: '2025-08-25T21:00:00Z',
//     durationSeconds: 900, // 15 minutes
//     meditationTechnique: 'body-scan',
//   },
// ];

// A small helper to format the date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


function MeditationPage() {
const [isModelOpen,setIsModelOpen] = useState<boolean>(false)
const navigate = useNavigate();
console.log(isModelOpen)
const [sessions, setSessions] = useState<MeditationSessions[]>([]);
  useEffect(()=>{
    const historySession = async()=>{
        try {
            const data = await getMeditationSessions();
            setSessions(data.sessions)
            console.log(data.sessions)
        } catch (error) {
            alert("Error: Not able to get the previous logs for now.")
            console.log(error,"Failed to retrived the meditation logs.")
        }
    }
    historySession();
  },[])
  function handleChange(){
    setIsModelOpen(true)
    navigate('/meditation/setup');
  }
  return (
    <div className="space-y-6">
      {/* 1. Header and Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl fonft-bold text-brand-950 flex items-center gap-3">
          <Wind size={32} />
          Meditation History
        </h1>
        <button onClick={handleChange} className="w-full sm:w-auto bg-brand-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors">
          <Plus size={20} />
          Log New Session
        </button>
      </div>

      {/* 2. History List */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-brand-100">
        {sessions.length > 0 ? (
          <ul className="space-y-3">
            {sessions.map((session) => (
              <li 
                key={session._id} 
                className="flex items-center justify-between bg-brand-50 p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-brand-950">
                    {session.durationSeconds / 60} minutes of {session.meditationTechniques}
                  </p>
                  <p className="text-sm text-brand-700">
                    {formatDate(session.sessionDate)}
                  </p>
                </div>
                <button className="p-2 text-brand-600 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors">
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          // What to show if there are no sessions logged yet
          <div className="text-center py-12">
            <p className="text-brand-800">You haven't logged any meditation sessions yet.</p>
            <p className="text-brand-700 mt-1">Click "Log New Session" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeditationPage;