import { Wind, Plus } from "lucide-react";
import type { MeditationSessions } from "../../pages/DashBoard";


type MeditationWidgetProps = {
meditations:MeditationSessions[]
};

function MeditationWidget({meditations}: MeditationWidgetProps) {
  // For now, we will use the mock data.
  // In the future, this data will come from the DashboardPage as a prop.

  return (
    <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-sm max-h-[300px] flex flex-col">
      <h2 className="text-base md:tex-lg font-bold md:font-semi-bold text-brand-900 mb-2 md:mb-4 flex items-center gap-1 md:gap-2">
        <Wind className="w-4 h-4 md:w-6 md:h-6" />
        Meditation
      </h2>

      {/* This is the main content area */}
      <div className="flex-grow mb-2 md:mb-4 bg-brand-50 p-2 md:p-4 rounded-sm md:rounded-lg">
        {meditations.length>0 ? (
          // --- What to show IF the user HAS a recent session ---
          <div>
            <p className="text-xs text-brand-700">Your last session:</p>
            <p className="font-bold md:text-semibold text-brand-950 text-xs md:text-base">
              {meditations[0].durationSeconds / 60} minutes of {meditations[0].meditationTechnique}
            </p>
          </div>
        ) : (
          // --- What to show IF the user is NEW ---
          <div>
            <p className="text-xs md:text-base text-brand-800 ">
              Log your first session to begin your mindfulness journey.
            </p>
          </div>
        )}
      </div>

      {/* This button is always visible */}
      <button className="w-full bg-brand-500 text-white font-bold p-1 md:py-3 text-sm md:text-base rounded-sm md:rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors">
        <Plus className="h-4 w-4 md:h-6 md:w-6" />
        New Session
      </button>
    </div>
  );
}

export default MeditationWidget;