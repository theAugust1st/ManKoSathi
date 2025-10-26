import Button from "../ui/Button";
import { ArrowLeft } from "lucide-react";
import { meditationGuides } from "../../../src/data/meditationGuides";
import { useNavigate } from "react-router-dom";
import { useMeditation } from "../../hooks/useMeditation";

function MeditationGuidePage() {
  const { settings} = useMeditation();
  const navigate = useNavigate();
  const technique = settings?.meditationTechnique || "default";
  const guide = meditationGuides[technique];

  function handleChange() {
    navigate("/meditation/live");
  }
  return (
    <div className="min-h-screen bg-brand-50 flex justify-center items-center p-2 md:p-4">
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl p-4 sm:p-6 md:p-8 border border-brand-100">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-brand-400 rounded-sm hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>
        <div className="rounded-2xl md:p-4"></div>
        {/* Header */}
        <div className="text-center mb-2 md:mb-6">
          <h1 className="text-lg md:text-2xl font-bold text-brand-950">{guide.title}</h1>
          <p className="text-brand-700 mt-2 text-xs md:text-sm text-center">
            Follow these steps for your practice
          </p>
        </div>

        {/* 3. Display the steps from our dictionary */}
        <div className=" space-y-2 md:space-y-4">
          {guide.steps.map((step, index) => (
            <div
              key={index}
              className="bg-brand-500/10 border border-brand-500/20 text-brand-900 px-4 py-2  rounded-xl flex items-center gap-2 md:gap-4"
            >
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-brand-500 text-white text-sm rounded-full flex justify-center items-center font-bold">
                {index + 1}
              </div>
              <p className="font-medium text-sm md:text-base">{step}</p>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <div className="mt-4 md:mt-8">
          <Button onClick={handleChange} type="button" className="w-full">
            Start Meditation
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MeditationGuidePage;
