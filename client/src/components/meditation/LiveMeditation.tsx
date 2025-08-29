
import { Play, Pause, RotateCcw, Music, Volume2, VolumeX } from 'lucide-react';
import { useMeditation } from '../../hooks/useMeditation';

const mockSessionData = {
  techniqueName: "Mindfulness Meditation",
  durationSeconds: 600, 
  backgroundSound: {
    name: "Gentle Rainfall",
    url: "path/to/your/sound.mp3"
  }
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};


function LiveSessionPage() {
  const { techniqueName, durationSeconds, backgroundSound } = mockSessionData;
  const progressPercentage = 70; // Static progress for design purposes
  const {settings} = useMeditation();
  console.log("meditationContext:",settings);
  return (
    <div className="min-h-screen bg-brand-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8 sm:p-12 border border-brand-100 flex flex-col items-center">
        <div className="text-6xl sm:text-7xl font-light text-brand-900 tracking-wider mb-4">
          {formatTime(durationSeconds * (progressPercentage / 100))}
        </div>
        <div className="w-full bg-brand-100 rounded-full h-2 mb-6">
          <div 
            className="bg-brand-500 h-2 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-brand-950">{techniqueName}</h2>
          <p className="text-brand-700 mt-1">Ready to begin your practice</p>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <button className="p-3 bg-brand-100 text-brand-700 rounded-full hover:bg-brand-200 transition-colors">
            <RotateCcw size={24} />
          </button>
          <button className="p-6 bg-brand-500 text-white rounded-full shadow-lg hover:bg-brand-600 transition-colors">
            <Play size={32} />
          </button>
          <button className="p-3 bg-brand-100 text-brand-700 rounded-full hover:bg-brand-200 transition-colors">
            <Music size={24} />
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-brand-600">
            Background: {backgroundSound.name} (Playing)
          </p>
        </div>

      </div>
    </div>
  );
}

export default LiveSessionPage;