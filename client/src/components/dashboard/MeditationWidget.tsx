import { Wind, Plus } from "lucide-react";
import type { MeditationSessions } from "../../pages/DashBoard";


type MeditationWidgetProps = {
meditations:MeditationSessions[]
};

function MeditationWidget({meditations}: MeditationWidgetProps) {
  // For now, we will use the mock data.
  // In the future, this data will come from the DashboardPage as a prop.

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-brand-900 mb-4 flex items-center gap-2">
        <Wind size={20} />
        Meditation
      </h2>

      {/* This is the main content area */}
      <div className="flex-grow mb-4 bg-brand-50 p-4 rounded-lg">
        {meditations.length>0 ? (
          // --- What to show IF the user HAS a recent session ---
          <div>
            <p className="text-sm text-brand-700">Your last session:</p>
            <p className="font-semibold text-brand-950 text-lg">
              {meditations[0].durationSeconds / 60} minutes of {meditations[0].meditationTechniques}
            </p>
          </div>
        ) : (
          // --- What to show IF the user is NEW ---
          <div>
            <p className="text-brand-800">
              Log your first session to begin your mindfulness journey.
            </p>
          </div>
        )}
      </div>

      {/* This button is always visible */}
      <button className="w-full bg-brand-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors">
        <Plus size={18} />
        New Session
      </button>
    </div>
  );
}

export default MeditationWidget;