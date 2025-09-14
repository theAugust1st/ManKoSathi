import { Wind, Plus, Trash2, Calendar , Trophy , ChevronFirst } from "lucide-react";
import { useState, useEffect } from "react";
import { getMeditationSessions,deleteMeditationSession } from "../services/meditationServices";
import type { MeditationSessions } from "./DashBoard";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../components/ui/DropdownMenu";
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const sortOptions = [
  {
    value: "createdAt",
    label: "recently added",
    icon: Calendar,
    description:"Sort by creation date",
    order:"asc"
  },
    {
    value: "durationSeconds",
    label: "Longest duration",
    icon:Trophy,
    description:"longest to shortest duration",
    order:"desc"
  },
    {
    value: "durationSeconds",
    label: "Shortest",
    icon:ChevronFirst,
    description:"shortest to longest duration",
    order:'asc'
  }

]
function MeditationPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<MeditationSessions[]>([]);
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);
  const [order, setOrder ] = useState<string>(sortOptions[0].order)
  useEffect(() => {
    const historySession = async () => {
      try {
        const data = await getMeditationSessions({sortBy,order});
        setSessions(data.sessions);
      } catch (error) {
        alert("Error: Not able to get the previous logs for now.");
        console.log(error, "Failed to retrived the meditation logs.");
      }
    };
    historySession();
  }, [sortBy,order]);
  function formatDuration(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  }

  function handleChange() {
    navigate("/meditation/setup");
  }
  async function handleDeleteSession(sessionId: string) {
    if(!window.confirm("Are you sure you want to delete this session? This action cannot be undone.")){
      return;
    }
    try {
      await deleteMeditationSession(sessionId);
      setSessions((prev)=>prev.filter(session=>session._id !== sessionId));
    } catch (error) {
      alert("Error: Unable to delete the session. Please try again later.");
      console.error("Failed to delete the session.", error);
    }
  }
  return (
    <div className="space-y-6">
      {/* 1. Header and Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl fonft-bold text-brand-950 flex items-center gap-3">
          <Wind size={32} />
          Meditation History
        </h1>
        <div className="flex items-center gap-2">
          <DropdownMenu options={sortOptions} value={sortBy} onChange={setSortBy} order={order} onChangeOrder={setOrder}/>
        <button
          onClick={handleChange}
          className="w-full sm:w-auto bg-brand-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors"
        >
          <Plus size={20} />
          Log New Session
        </button>
        </div>
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
                    {formatDuration(session.durationSeconds)} of{" "}
                    {session.meditationTechnique}
                  </p>
                  <p className="text-sm text-brand-700">
                    {formatDate(session.sessionDate)}
                  </p>
                </div>
                <button onClick={()=>handleDeleteSession(session._id)} className="p-2 text-brand-600 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors">
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          // What to show if there are no sessions logged yet
          <div className="text-center py-12">
            <p className="text-brand-800">
              You haven't logged any meditation sessions yet.
            </p>
            <p className="text-brand-700 mt-1">
              Click "Log New Session" to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeditationPage;
