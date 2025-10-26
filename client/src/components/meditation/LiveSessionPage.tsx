import { Play, Pause, RotateCcw, Volume2, VolumeX, Check } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigatie = useNavigate();
  const { settings } = useMeditation();

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
    navigatie('/meditation/summary');
  };

  const progressPercentage = totalDuration
    ? Math.min((elapsedSeconds / totalDuration) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-brand-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8 sm:p-12 border border-brand-100 flex flex-col items-center">

        <div className="text-4xl sm:text-5xl font-light text-brand-900 tracking-wider mb-2 md:mb-4">
          {formatTime(totalDuration - elapsedSeconds)}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-brand-100 rounded-full  h-1 md:h-2 mb-6">
          <div
            className="bg-brand-500 h-1 md:h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Meditation Info */}
        <div className="text-center mb-8">
          <h2 className="text-base md:text-lg font-semibold md:font-bold text-brand-950">
            {settings?.meditationTechnique}
          </h2>
          <p className="text-brand-700 text-xs mt-1">Ready to begin your practice</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-6">
          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-2 md:p-4 bg-brand-100 text-brand-700 rounded-full hover:bg-brand-200 transition-colors"
          >
            <RotateCcw className='w-4 h-4 md:h-6 md:w-6' />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="p-4 md:p-6 bg-brand-500 text-white rounded-full shadow-lg hover:bg-brand-600 transition-colors"
          >
            {isPlaying ? <Pause className='w-6 h-6 md:w-8 md:h-8' /> : <Play className='w-6 h-6 md:w-8 md:h-8' />}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="p-2 md:p-4 bg-brand-100 text-brand-700 rounded-full hover:bg-brand-200 transition-colors"
          >
            {isMuted ? <VolumeX className='w-4 h-4 md:h-6 md:w-6' /> : <Volume2 className='w-4 h-4 md:h-6 md:w-6'/>}
          </button>

          {/* Complete */}
          <button
            onClick={handleComplete}
            className="p-2 md:p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            <Check className='w-4 h-4 md:h-6 md:w-6' />
          </button>
        </div>

        {/* Background Sound Info */}
        <div className="text-center">
          <p className="text-xs text-brand-600">
            Background: {settings?.backgroundSound.name}{' '}
            {isPlaying ? '(Playing)' : '(Paused)'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LiveSessionPage;
