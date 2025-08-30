export type BackgroundSound = {
  _id: string;
  name: string;
  audioUrl: string;
};
import { Play } from "lucide-react";
type BackgroundSoundsProps = {
  backgroundSounds: BackgroundSound[];
  selectedSound: string;
  setSelectedSound: (soundId: string) => void;
};
function BackgroundSounds({backgroundSounds,selectedSound,setSelectedSound}: BackgroundSoundsProps) {
  return (
            <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Background Sound
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {backgroundSounds.map((sound, index) => (
              <button
                key={index}
                onClick={() => setSelectedSound(`sound-${index}`)}
                className={`p-4 rounded-xl border transition-colors flex items-center justify-between ${
                  selectedSound === `sound-${index}`
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-white text-gray-700 border-brand-300 hover:border-brand-400"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{sound.name}</span>
                  {/* <span className="text-sm opacity-75">----</span> */}
                </div>
                <Play className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
  )
}

export default BackgroundSounds