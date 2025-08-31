import { useState } from "react";
import {
  Heart,
  RotateCcw,
  Save,
} from "lucide-react";
import Button from "../ui/Button";
import { useMeditation } from "../../hooks/useMeditation";
import { createMeditationSession } from "../../services/meditationServices";
import type { NewSessionData } from "../../services/meditationServices";
import { useNavigate } from "react-router-dom";

const postMoods = [
  { id: "stressed", label: "Stressed", emoji: "😰" },
  { id: "anxious", label: "Anxious", emoji: "😟" },
  { id: "calm", label: "Calm", emoji: "😌" },
  { id: "neutral", label: "Neutral", emoji: "😐" },
  { id: "happy", label: "Happy", emoji: "😊" },
  { id: "sad", label: "Sad", emoji: "😢" },
];
function parseDuration(duration: string | number | undefined): number {
  if (!duration) return 0;
  if (typeof duration === "number") return duration;
  const match = duration.match(/^(\d+)([ms]?)$/);
  if (!match) return 0;
  const value = Number(match[1]);
  const unit = match[2];
  if (unit === "m") return value * 60;
  return value;
}

function MeditationPostSession() {
  const navigate = useNavigate();
  const { settings} = useMeditation();
  const totalDuration = parseDuration(settings?.durationSeconds);
  const [selectedPostMood, setSelectedPostMood] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saveSession = async () => {
    if (!settings || !selectedPostMood) return; 

    setIsSubmitting(true);
    try {
      const sessionData: NewSessionData = {
        durationSeconds: totalDuration,
        meditationTechnique: settings.meditationTechnique,
        mood: {
          preSession: settings.mood.preSession,
          postSession: selectedPostMood,
        },
        goals: settings.goals,
        backgroundSoundID: settings.backgroundSound.audioUrl, // This will be the ID
      };
      await createMeditationSession(sessionData);
    } catch (error) {
      console.error("Failed to save session.", error);
      alert("Failed to save session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSaveAndFinish = async() => {
    if (!selectedPostMood) {
      alert("Please select how you are feeling now.");
      return;
    }
    await saveSession();
    navigate("/meditation",{replace:true});
  };
    const handleStartNew = async () => {
    if (selectedPostMood) {
      await saveSession();
    }
    navigate("/meditation/setup",{replace:true}); 
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      {/* The main modal card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 border border-brand-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="text-green-500" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-brand-950 mb-2">
            Session Complete!
          </h1>
          <p className="text-brand-700">Reflect on your meditation practice</p>
        </div>

        {/* Session Summary */}
        <div className="bg-brand-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-brand-900 mb-4">
            Session Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            <div>
              <p className="text-brand-700 text-sm mb-1">Duration:</p>
              <p className="font-semibold text-brand-950">
                {settings ? totalDuration / 60 : "N/A"} minutes
              </p>
            </div>
            <div>
              <p className="text-brand-700 text-sm mb-1">Technique:</p>
              <p className="font-semibold text-brand-950 capitalize">
                {settings?.meditationTechnique}
              </p>
            </div>
            <div>
              <p className="text-brand-700 text-sm mb-1">Goal:</p>
              <p className="font-semibold text-brand-950 capitalize">
                {settings?.goals}
              </p>
            </div>
            <div>
              <p className="text-brand-700 text-sm mb-1">Started feeling:</p>
              <div className="flex items-center justify-center md:justify-start gap-1">
                <span className="font-semibold text-brand-950 capitalize">
                  {settings?.mood.preSession}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Session Mood Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-brand-900 mb-4">
            How are you feeling right now?
          </h3>
          <div className="flex flex-wrap gap-3">
            {postMoods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedPostMood(mood.id)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors flex items-center gap-2
                  ${
                    selectedPostMood === mood.id
                      ? "bg-brand-500 text-white border-brand-500"
                      : "bg-white text-brand-900 border-brand-200 hover:border-brand-400"
                  }`}
              >
                <span>{mood.emoji}</span>
                <span className="font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="secondary"
            onClick={() => {
              handleStartNew();
            }}
            disabled={isSubmitting}
          >
            <RotateCcw size={18} />
            Start New Session
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAndFinish}
            disabled={!selectedPostMood || isSubmitting}
          >
            <Save size={18} />
            Save & Finish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MeditationPostSession;
