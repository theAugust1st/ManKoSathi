import { ArrowLeft, Mail } from "lucide-react";
import Button from "../components/ui/Button";
import { useRef, useState, useEffect } from "react";
import { verifyOtp, sendOtp } from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOtpPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state || {}) as { email?: string; otpExpires?: string };
  const [otpReel, setOtpReel] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [timeLeftSec, setTimeLeftSec] = useState<number>(() => {
    if (navState.otpExpires) {
      const t = Math.max(0, Math.floor((new Date(navState.otpExpires).getTime() - Date.now()) / 1000));
      return t;
    }
    // fallback start 10 minutes from now
    return 10 * 60;
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCooldownSec, setResendCooldownSec] = useState<number>(() => {
    // compute elapsed since OTP was issued (if otpExpires passed)
    if (navState.otpExpires) {
      const issuedAt = new Date(navState.otpExpires).getTime() - 10 * 60 * 1000;
      const elapsed = Math.floor((Date.now() - issuedAt) / 1000);
      const remaining = 90 - elapsed; // 90s cooldown
      return remaining > 0 ? remaining : 0;
    }
    return 90; // start with cooldown when no otpExpires provided
  });
  const [isResending, setIsResending] = useState(false);
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
      setIsSubmitting(true);
      const emailToUse = user?.email || navState.email;
      if (!emailToUse) {
        alert("Missing email to verify");
        setIsSubmitting(false);
        return;
      }
      const verifiedUser = await verifyOtp({ email: emailToUse, otp });
      login(verifiedUser.user, verifiedUser.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Invalid OTP", error);
      setIsSubmitting(false);
    }
  };

  // countdown timer
  useEffect(() => {
    let interval: number | undefined;
    interval = window.setInterval(() => {
      setTimeLeftSec((s) => {
        if (s <= 1) {
          // stop at zero
          if (interval) clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // resend cooldown timer
  useEffect(() => {
    let iv: number | undefined;
    if (resendCooldownSec > 0) {
      iv = window.setInterval(() => {
        setResendCooldownSec((s) => {
          if (s <= 1) {
            if (iv) clearInterval(iv);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (iv) clearInterval(iv);
    };
  }, [resendCooldownSec]);

  const formatMMSS = (seconds: number) => {
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const formatShortMMSS = (seconds: number) => {
    const mm = Math.floor(seconds / 60).toString();
    const ss = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleResend = async () => {
    const emailToUse = user?.email || navState.email;
    if (!emailToUse) {
      alert('Missing email to send OTP');
      return;
    }
    setIsResending(true);
    try {
      const resp = await sendOtp({ email: emailToUse });
      // restart main expiry timer if server returned otpExpires
      if (resp?.otpExpires) {
        const t = Math.max(0, Math.floor((new Date(resp.otpExpires).getTime() - Date.now()) / 1000));
        setTimeLeftSec(t);
      } else {
        setTimeLeftSec(10 * 60);
      }
      // set cooldown to 90s
      setResendCooldownSec(90);
      // optional: show a small confirmation (can be replaced by toast)
      alert('A new verification code has been sent to your email.');
    } catch (err) {
      console.error('Failed to resend OTP', err);
      alert('Failed to resend OTP. Please try again later.');
    } finally {
      setIsResending(false);
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
          <p className="text-sm text-gray-500">Code expires in {formatMMSS(timeLeftSec)}</p>
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
          <button
            onClick={handleResend}
            disabled={resendCooldownSec > 0 || isResending}
            className="text-sm text-brand-500 hover:underline disabled:opacity-50"
          >
            {resendCooldownSec > 0
              ? `Resend in ${formatShortMMSS(resendCooldownSec)}`
              : isResending
              ? 'Sending...'
              : 'Resend code'}
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
