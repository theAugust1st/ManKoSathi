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

type OnBoardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const totalSteps = 2;

function OnBoardingModal({ isOpen, onClose }: OnBoardingModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnBoardingData>({
    dob: "",
    gender: "",
  });
  const [errors, setErrors] = useState<{ dob?: string; gender?: string }>({});

  const { user, setUser } = useAuth();

  async function handleNext() {
    if (currentStep < totalSteps) {
      // validate current step before advancing
      if (currentStep === 1 && !formData.dob) {
        setErrors({ dob: "Date of birth is required" });
        return;
      }
      setErrors({});
      setCurrentStep(currentStep + 1);
    } else {
      // validate before finishing
      const newErrors: { dob?: string; gender?: string } = {};
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Please select a gender";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // both fields present -> update profile
      try {
        const updatedUser = { ...user, ...formData } as User;
        setUser(updatedUser);

        const response = await updateUserProfile(updatedUser);
        console.log("Profile updated successfully:", response);

        setUser(response.user);
      } catch (error) {
        console.error("Error updating profile:", error);
      }

      onClose();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center">
        <Cake size={24} className="text-brand-500" />
        <h2 className="text-lg text-left">Help us personalize your experience</h2>
        <p className="text-sm text-center text-gray-600 mt-2">
          This information helps us understand our user demographics better.
        </p>
        <p className="text-xs text-center text-gray-500 mt-2">
          This data is used for analytics & improving our services. You can skip
          this step.
        </p>
      </div>

      {/* Progress dots */}
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

      {/* Step content */}
      <div className="mt-6 space-y-6">
        {currentStep === 1 && (
          <div>
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
                if (errors.dob) setErrors({ ...errors, dob: undefined });
              }}
              className="w-full border border-solid px-4 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-brand-500 focus:ring-brand-200"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={(e) => {
                setFormData({ ...formData, gender: e.target.value });
                if (errors.gender) setErrors({ ...errors, gender: undefined });
              }}
              className="w-full border px-4 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 border-gray-300 focus:border-brand-500 focus:ring-brand-200"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
              <option value="Prefer Not To Say">Prefer Not To Say</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex w-full items-center justify-between mt-6 gap-4">
        <button
          className="text-sm p-2 hover:border-2 hover:border-gray-500 rounded-lg"
          onClick={onClose}
        >
          Skip for now
        </button>

        {currentStep > 1 && (
          <Button
            className="flex items-center"
            onClick={() => setCurrentStep(currentStep - 1)}
            variant="secondary"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>
        )}

        <Button onClick={handleNext}>
          {currentStep === totalSteps ? "Finish" : "Next"}
        </Button>
      </div>
    </Modal>
  );
}

export default OnBoardingModal;
