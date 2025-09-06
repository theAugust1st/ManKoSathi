import { ArrowLeft, Cake } from "lucide-react";
import Modal from "../ui/Modal";
import { useState } from "react";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../contexts/AuthContext";
import { updateUserProfile } from "../../services/profileServices";
type OnBoardingData = {
  dob: string;
  gender: string;
};
type onBoardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const totalSteps = 2;
function OnBoardingModal({ isOpen, onClose }: onBoardingModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnBoardingData>({
    dob: "",
    gender: "",
  });
  const { user, setUser } = useAuth();
async function handleChange(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  direction: "forward" | "previous"
) {
  e.preventDefault();

  if (direction === "forward") {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      const updatedUser = { ...user, ...formData } as User;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      try {
        const response = await updateUserProfile(updatedUser);
        setUser(response.user);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
      onClose();
    }
  } else if (direction === "previous") {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }
}

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center">
        <Cake size={24} className="text-brand-500" />
        <h2 className="text-lg text-left">
          Help us personlize your experience
        </h2>
        <p className="text-sm text-center text-gray-600 mt-2">
          This information helps us understand our user demographics better.
        </p>
        <p className="text-xs text-center text-gray-500 mt-2">
          This data is used for analytics & imporving oru services. You can skip
          this step
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-6">
        <div className="flex justify-center items-center mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-1 mx-1 rounded-full ${
                currentStep === i + 1 ? "bg-brand-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        <div>
          {currentStep === 1 && (
            <div className="mt-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={(e) => {
                  setFormData({ ...formData, dob: e.target.value });
                }}
                className="w-full border border-solid px-4 py-2 rounded-md bg-white text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 transition-colors duration-200
                    border-gray-300 focus:border-brand-500 focus:ring-brand-200"
              />
            </div>
          )}
          {currentStep === 2 && (
            <>
              <label className="block text-sm font-medium" htmlFor="gender">
                Gender:
              </label>
              <select
                className={`w-full border p-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200 border-brand-300 focus:border-brand-500 focus:ring-brand-200
              `}
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
              >
                <option>select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
                <option value="Prefer Not To Say">Prefer Not To Say</option>
              </select>
            </>
          )}
        </div>
        <div
          className="flex w-full items-center justify-between
         gap-4"
        >
          <button className="text-sm p-2 hover:border-2 hover:border-gray-500 rounded-lg">
            Skip for now
          </button>
          {currentStep > 1 && (
            <Button
              className="flex items-center "
              onClick={(e) => handleChange(e, "previous")}
              variant="secondary"
            >
              <ArrowLeft size={16} />
              previous
            </Button>
          )}
          <Button onClick={(e) => handleChange(e, "forward")}>
            {currentStep === totalSteps ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default OnBoardingModal;
