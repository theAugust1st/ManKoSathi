import { Play, Pause, RotateCcw, Music, Volume2, VolumeX, Check } from 'lucide-react';
import { useMeditation } from '../../hooks/useMeditation';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function parseDuration(duration: string | number | undefined): number {
  if (!duration) return 0;
  if (typeof duration === 'number') return duration;

  const match = duration.match(/^(\d+)([ms]?)$/);
  if (!match) return 0;

  const value = Number(match[1]);
  const unit = match[2];

  if (unit === 'm') return value * 60;
  return value;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

function LiveSessionPage() {
  const navigatie = useNavigate();
  const { settings } = useMeditation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalDuration = parseDuration(settings?.durationSeconds);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= totalDuration) {
          clearInterval(interval);
          audioRef.current?.pause();
          handleComplete()
          return totalDuration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const togglePlayPause = () => {
    if (!audioRef.current && settings?.backgroundSound.audioUrl) {
      audioRef.current = new Audio(settings.backgroundSound.audioUrl);
      audioRef.current.loop = true;
      audioRef.current.muted = isMuted;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch((err) => console.error('Playback failed:', err));
    }

    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setElapsedSeconds(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.error('Playback failed:', err));
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) audioRef.current.muted = !isMuted;
  };

  const handleComplete = () => {
    setElapsedSeconds(totalDuration);
    setIsPlaying(false);
    audioRef.current?.pause();
    navigatie('/meditation')
    console.log('Meditation Completed!');
  };

  const progressPercentage = totalDuration
    ? Math.min((elapsedSeconds / totalDuration) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-brand-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8 sm:p-12 border border-brand-100 flex flex-col items-center">
        {/* Timer */}
        <div className="text-6xl sm:text-7xl font-light text-brand-900 tracking-wider mb-4">
          {formatTime(totalDuration - elapsedSeconds)}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-brand-100 rounded-full h-2 mb-6">
          <div
            className="bg-brand-500 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Meditation Info */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-brand-950">
            {settings?.meditationTechnique}
          </h2>
          <p className="text-brand-700 mt-1">Ready to begin your practice</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-6">
          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-3 bg-brand-100 text-brand-700 rounded-full hover:bg-brand-200 transition-colors"
          >
            <RotateCcw size={24} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="p-6 bg-brand-500 text-white rounded-full shadow-lg hover:bg-brand-600 transition-colors"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="p-3 bg-brand-100 text-brand-700 rounded-full hover:bg-brand-200 transition-colors"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          {/* Complete */}
          <button
            onClick={handleComplete}
            className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            <Check size={24} />
          </button>

          {/* Background Music */}
          {/* <button className="p-3 bg-brand-100 text-brand-700 rounded-full hover:bg-brand-200 transition-colors">
            <Music size={24} />
          </button> */}
        </div>

        {/* Background Sound Info */}
        <div className="text-center">
          <p className="text-sm text-brand-600">
            Background: {settings?.backgroundSound.name}{' '}
            {isPlaying ? '(Playing)' : '(Paused)'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LiveSessionPage;
