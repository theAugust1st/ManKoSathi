import { ArrowLeft, Mail } from "lucide-react";
import Button from "../components/ui/Button";
import { useRef, useState } from "react";

function VerifyOtpPage() {
  const [otpReel, setOtpReel] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  function handleEntered(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const newOptReel = [...otpReel];
    newOptReel[i] = e.target.value;
    setOtpReel(newOptReel);
    if (e.target.value && i < inputRefs.current.length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !otpReel[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };
  return (
    <div className="relative flex flex-col min-h-screen w-screen justify-center items-center bg-gray-50 px-4">
      {/* Back button */}
      <button className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Card container */}
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="p-4 bg-brand-300 rounded-full">
            <Mail size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">Verify Your Email</h2>
          <p className="text-sm text-gray-600 max-w-[260px]">
            We've sent a 6-digit verification code to{" "}
            <span className="font-semibold text-brand-500">user@gmail.com</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-lg font-semibold">Enter Verification Code</h3>
          <div className="flex gap-3 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                ref={(el) => (inputRefs.current[i] = el)}
                onKeyDown={(e)=>handleKeyDown(e,i)}
                key={i}
                type="text"
                value={otpReel[i]}
                onChange={(e) => handleEntered(e, i)}
                maxLength={1}
                className="w-12 h-14 border rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Code expires in -- : --</p>
          <Button className="w-full mt-2">Verify Code</Button>
        </div>

        {/* Resend */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-500">Didn't receive the code?</p>
          <button className="text-sm text-brand-500 hover:underline">
            Resend in --:--
          </button>
        </div>

        {/* Footer */}
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
