import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Heart,
  Scan,
  Music,
  User,
  MoreHorizontal,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import Button from "../ui/Button";
import { useMeditation } from "../../hooks/useMeditation";
import { useNavigate } from "react-router-dom";
import { getBackgroundSounds } from "../../services/soundServices";
import BackgroundSounds from "./BackgroundSounds";
export type BackgroundSound = {
  _id: string;
  name: string;
  audioUrl: string;
};
export default function MeditationSessionSetup() {
  const navigate = useNavigate();
  const { setSessionSettings } = useMeditation();
  const [selectedDuration, setSelectedDuration] = useState("10m");
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedSound, setSelectedSound] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [notes, setNotes] = useState("");
  const [backgroundSounds, setBackgroundSounds] = useState<BackgroundSound[]>(
    []
  );
  const [soundPlayingId, setSoundPlayingId] = useState<string | null>(null);

  const durations = ["5m", "10m", "15m", "20m", "30m", "45m", "60m"];

  const techniques = [
    { id: "mindfulness", label: "Mindfulness", icon: Heart, selected: false },
    { id: "breathing", label: "Breathing", icon: Heart, selected: false },
    { id: "body-scan", label: "Body Scan", icon: Scan, selected: false },
    {
      id: "loving-kindness",
      label: "Loving Kindness",
      icon: Heart,
      selected: false,
    },
    { id: "mantra", label: "Mantra", icon: Music, selected: false },
    { id: "walking", label: "Walking", icon: User, selected: false },
    { id: "others", label: "Others", icon: MoreHorizontal, selected: false },
  ];

  const moods = [
    { id: "stressed", label: "Stressed", emoji: "😰", selected: true },
    { id: "anxious", label: "Anxious", emoji: "😰" },
    { id: "calm", label: "Calm", emoji: "😊" },
    { id: "neutral", label: "Neutral", emoji: "😐" },
    { id: "happy", label: "Happy", emoji: "😊" },
    { id: "sad", label: "sad", emoji: "😢" },
  ];

  const goals = [
    {
      id: "manage-anxiety",
      label: "Manage Anxiety",
      icon: Heart,
      selected: true,
    },
    { id: "reduce-stress", label: "Reduce Stress", icon: Heart },
    { id: "better-sleep", label: "Better Sleep", icon: Clock },
    { id: "improve-focus", label: "Improve Focus", icon: Heart },
    { id: "self-awareness", label: "Self-awareness", icon: User },
    { id: "other", label: "Other", icon: User },
  ];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const fetchBackgroundSounds = async () => {
      try {
        const data = await getBackgroundSounds();
        setBackgroundSounds(data.sounds);
      } catch (error) {
        alert("Error: Not able to fetch the background sounds for now.");
      }
    };
    fetchBackgroundSounds();
  }, []);
  const selectedBackgroundSound = backgroundSounds.find(
    (sound) => sound._id === selectedSound
  );
  function handleSessionStart() {
    setSessionSettings({
      durationSeconds: showCustom ? customDuration : selectedDuration,
      meditationTechnique: selectedTechnique,
      mood: {
        preSession: selectedMood,
        postSession: "",
      },
      goals: selectedGoal,
      backgroundSound: {
        _id: selectedBackgroundSound?._id || "",
        name: selectedBackgroundSound?.name || "",
        audioUrl: selectedBackgroundSound?.audioUrl || "",
      },
    });
    navigate("/meditation/guide");
  }
  const canStartSession = selectedTechnique && selectedMood && selectedGoal;
  function handleBackgoundSound(sound: BackgroundSound) {
    if (audioRef.current && soundPlayingId === sound._id) {
      audioRef.current.pause();
      setSoundPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(sound.audioUrl);
      audioRef.current.loop = true;
      audioRef.current.play();
      setSoundPlayingId(sound._id);
    }
  }
  function handleSelectedSound(soundId: string) {
    setSelectedSound(soundId);
  }
  return (
    <div className="max-w-4xl p-6 bg-white min-h-screen">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-brand-400 rounded-sm hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      <div className="rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Start your Meditation Session
          </h1>
          <p className="text-gray-600">Set up your practice</p>
        </div>

        {/* Duration Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-medium text-gray-900">Duration</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-3">
            {durations.map((duration) => (
              <button
                key={duration}
                onClick={() => {
                  setSelectedDuration(duration);
                  setShowCustom(false);
                }}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedDuration === duration && !showCustom
                    ? "bg-brand-500 text-white border-brand-600"
                    : "bg-white text-gray-700 border-brand-300 hover:border-brand-400"
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCustom(!showCustom)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                showCustom
                  ? "bg-brand-500 text-white border-brand-600"
                  : "bg-white text-gray-700 border-brand-300 hover:border-brand-400"
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCustom && (
              <input
                type="text"
                placeholder="Custom duration"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                className="px-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:border-border-500"
              />
            )}
          </div>
        </div>

        {/* Meditation Technique Section */}
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 mb-4">
          {techniques.map((technique) => {
            const IconComponent = technique.icon;
            const isSelected = selectedTechnique === technique.id;

            return (
              <button
                key={technique.id}
                onClick={() => setSelectedTechnique(technique.id)}
                className={`p-4 rounded-xl border transition-colors flex flex-col items-center gap-2 ${
                  isSelected
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-sm font-medium">{technique.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mood Section */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            How are you feeling right now?
          </h3>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                  selectedMood === mood.id
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-white text-gray-700 border-brand-300 hover:border-brand-400"
                }`}
              >
                <span>{mood.emoji}</span>
                <span className="font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Goal Section */}

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-medium text-gray-900">
              Primary Goal
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goals.map((goal) => {
              const IconComponent = goal.icon;
              const isSelected = selectedGoal === goal.id;

              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 rounded-xl border transition-colors flex items-center gap-3 ${
                    isSelected
                      ? "bg-brand-500 text-white border-brand-500"
                      : "bg-white text-gray-700 border-brand-300 hover:border-brand-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{goal.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Sound Section */}
        <BackgroundSounds
          backgroundSounds={backgroundSounds}
          selectedSound={selectedSound}
          setSelectedSound={handleSelectedSound}
          soundPlayingId={soundPlayingId}
          onPlayingSound={handleBackgoundSound}
        />

        {/* Notes Section */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Notes(Optional)
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Note for this sessions..."
            className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:border-teal-500 resize-none h-24"
          />
        </div>
        {canStartSession ? (
          <Button
            onClick={handleSessionStart}
            type={"button"}
            className="w-full"
          >
            Start Session
          </Button>
        ) : (
          <Button disabled type={"button"} className="w-full">
            Start Session
          </Button>
        )}

        {!canStartSession && (
          <p className="text-center text-gray-500 text-sm mt-2">
            Please select technique, mood and goal to continue
          </p>
        )}
      </div>
    </div>
  );
}
