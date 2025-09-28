import { Play, Pause, Music } from "lucide-react";

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
  onPlayingSound?: (isSoundPlaying: BackgroundSound) => void;
};

function BackgroundSounds({
  backgroundSounds,
  selectedSound,
  setSelectedSound,
  soundPlayingId,
  onPlayingSound,
}: BackgroundSoundsProps) {
  return (
    <div className="mb-2 md:mb-4">
      <div className="flex items-center gap-2 mb-2 md:gap-3">
      <Music className="w-4 h-4 md:w-6 md:h-6"/>
      <h3 className="text-base font-medium text-gray-900 ">
        Background Sound
      </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {backgroundSounds.map((sound, index) => {
          const isSoundPlaying = selectedSound === sound._id;
          const isPlayingSound = soundPlayingId === sound._id;

          return (
            <button
              key={index}
              onClick={() => setSelectedSound(sound._id)}
              className={`p-2 md:p-4 rounded-xl border transition-colors flex items-center justify-between text-sm md:text-base ${
                isSoundPlaying
                  ? "bg-brand-500 text-white ring-2 ring-brand-500"
                  : "bg-white text-brand-900 border-brand-200 hover:border-brand-400"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{sound.name}</span>
              </div>

              {/* FIX: replace inner <button> with a span/div */}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // don’t trigger parent
                  onPlayingSound?.(sound);
                }}
                role="button"
                tabIndex={0}
                className="rounded-full hover:bg-white/20 cursor-pointer"
              >
                {!isPlayingSound ? (
                  <Play className="w-4 h-4 md:w-6 md:h-6" />
                ) : (
                  <Pause className="w-4 h-4 md:w-6 md:h-6" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BackgroundSounds;
