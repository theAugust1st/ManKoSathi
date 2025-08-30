// File: client/src/pages/MeditationGuidePage.tsx
import { useState } from 'react';
import Button from '../ui/Button';
import { ArrowLeft } from 'lucide-react';
// 1. Import our new "dictionary" of guides
import { meditationGuides } from '../../../src/data/meditationGuides';
import { useNavigate } from 'react-router-dom';
import { useMeditation } from '../../hooks/useMeditation';

// --- The Main MeditationGuidePage Component ---

function MeditationGuidePage() {
  const {settings} = useMeditation();
  console.log("meditationContext:",settings);
  // In a real app, this would come from the previous page
  // For now, we will use a sample. Try changing it to 'breathing'!
  const navigate = useNavigate();
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  // 2. Look up the correct guide in our dictionary
const technique = settings?.meditationTechnique || "default";
const guide = meditationGuides[technique];

   function handleChange(){
    setIsSessionStarted(true);
    navigate('/meditation/live');
  }
  return (
    <div className="min-h-screen bg-brand-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 border border-brand-100">
        <div><button onClick={()=>(navigate(-1))} className="hover:bg-brand-400 rounded-sm hover:text-white"><ArrowLeft size={20}/></button></div>
      <div className="rounded-2xl p-8"></div>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-950">
            {guide.title}
          </h1>
          <p className="text-brand-700 mt-2">Follow these steps for your practice</p>
        </div>

        {/* 3. Display the steps from our dictionary */}
        <div className="space-y-4">
          {guide.steps.map((step, index) => (
            <div 
              key={index}
              className="bg-brand-500/10 border border-brand-500/20 text-brand-900 p-4 rounded-xl flex items-center gap-4"
            >
              <div 
                className="flex-shrink-0 w-8 h-8 bg-brand-500 text-white rounded-full flex justify-center items-center font-bold"
              >
                {index + 1}
              </div>
              <p className="font-medium">{step}</p>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <div className="mt-8">
          <Button onClick={handleChange}type="button" className="w-full">
            Start Meditation
          </Button>
        </div>

      </div>
    </div>
  );
}

export default MeditationGuidePage;