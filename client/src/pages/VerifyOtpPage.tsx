import { ArrowLeft, Mail } from "lucide-react";
import Button from "../components/ui/Button";
import { useRef, useState } from "react";
import { verifyOtp } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function VerifyOtpPage() {
  const { user,login } = useAuth();
  const navigate = useNavigate();
  const [otpReel, setOtpReel] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  function handleEntered(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtpReel = [...otpReel];
    newOtpReel[i] = value;
    setOtpReel(newOtpReel);

    if (i < inputRefs.current.length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace") {
      if (otpReel[i]) {
        const newOtpReel = [...otpReel];
        newOtpReel[i] = "";
        setOtpReel(newOtpReel);
      } else if (i > 0) {
        inputRefs.current[i - 1]?.focus();
      }
    }
  };

  const canJoin = otpReel.every((digit) => digit !== "");

  const handleVerify = async () => {
    if (!canJoin) return;

    const otp = otpReel.join("");
    try {
      if (!user?.email) return;
      const verifiedUser = await verifyOtp({
          email: user.email,
          otp,
        });
      setIsSubmitting(true)
      login(verifiedUser.user,verifiedUser.token)
      navigate('/dashboard')
    } catch (error) {
      console.error("Invalid OTP", error);
      setIsSubmitting(false)
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen justify-center items-center bg-gray-50 px-4">
      <button className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg flex flex-col gap-6">
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="p-4 bg-brand-300 rounded-full">
            <Mail size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">Verify Your Email</h2>
          <p className="text-sm text-gray-600 max-w-[260px]">
            We've sent a 6-digit verification code to{" "}
            <span className="font-semibold text-brand-500">
              {user?.email || "your email"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-lg font-semibold">Enter Verification Code</h3>
          <div className="flex gap-3 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                value={otpReel[i]}
                maxLength={1}
                onChange={(e) => handleEntered(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-14 border rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Code expires in -- : --</p>
          <Button
            onClick={handleVerify}
            disabled={!canJoin || isSubmitting}
            className="w-full mt-2"
          >
            {isSubmitting ? 'Verifying...' : 'Verify Account'}
          </Button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-500">Didn't receive the code?</p>
          <button className="text-sm text-brand-500 hover:underline">
            Resend in --:--
          </button>
        </div>

        <hr className="border-gray-200" />
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-gray-500 text-xs">
            For manKoSathi – A Friend of Your Mind
          </p>
          <p className="text-gray-500 text-xs">
            Check your spam folder if you don’t see the email
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpPage;
