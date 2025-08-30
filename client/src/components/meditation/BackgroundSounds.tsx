import { Play, Pause} from "lucide-react";
export type BackgroundSound = {
  _id: string;
  name: string;
  audioUrl: string;
};
type BackgroundSoundsProps = {
  backgroundSounds: BackgroundSound[];
  selectedSound: string;
  setSelectedSound: (soundId: string) => void;
  soundPlayingId: string | null;
  onPlayingSound?: (isSoundPlaying:BackgroundSound) => void;
};
function BackgroundSounds({
  backgroundSounds,
  selectedSound,
  setSelectedSound,
    soundPlayingId,
    onPlayingSound,
}: BackgroundSoundsProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Background Sound
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {backgroundSounds.map((sound, index) => {
            const isSoundPlaying = selectedSound === sound._id;
            const isPlayingSound = soundPlayingId === sound._id;
            console.log(isSoundPlaying,"isSoundPlaying")
            return(
          <button
            key={index}
            onClick={() => setSelectedSound(sound._id)}
            className={`p-4 rounded-xl border transition-colors flex items-center justify-between  ${
                  // --- THIS IS THE FIX ---
                  // The if/else logic is now INSIDE the ${}
                  isSoundPlaying
                    ? "bg-brand-500 text-white ring-2 ring-brand-500"
                    : "bg-white text-brand-900 border-brand-200 hover:border-brand-400"
                }`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{sound.name}</span>
              {/* <span className="text-sm opacity-75">----</span> */}
            </div>
            <button onClick ={(e)=>{e.stopPropagation();onPlayingSound?.(sound)}} className="p-2 rounded-full hover:bg-white/20"
>

              {!isPlayingSound?<Play className="w-5 h-5" />:<Pause className="w-5 h-5" />}
            </button>
          </button>
        )})}
      </div>
    </div>
  );
}

export default BackgroundSounds;
