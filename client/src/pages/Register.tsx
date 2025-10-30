import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from 'react-toastify';
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required" })
    .min(3, { error: "Name must be at least 3 characters." })
    .max(20, { error: "Name should not be longer than 20 characters." }),
  email: z.email({ error: "Please enter a valid email" }),
  password: z
    .string()
    .refine(
      (val) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(val),
      {
        error:
          "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character",
      }
    ),
});
type InputFields = z.infer<typeof signUpSchema>;

function Register() {
  const navigate = useNavigate();
  // not setting auth user here — registration returns only otp info; we'll navigate to verify page
  // const { setUser } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFields>({ resolver: zodResolver(signUpSchema) });
  const onSubmit: SubmitHandler<InputFields> = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || 'Registration failed');
      } else {
        // pass email and otpExpires to the verify page so it can show the countdown
        toast.success('Registration successful — check your email for the code');
        navigate("/verify-otp", { state: { email: result.email, otpExpires: result.otpExpires } });
        reset();
      }
    } catch (err) {
      console.error("An error occured", err);
      toast.error("An error occured during registration");
    }
  };
  return (
    <div className="min-h-screen w-screen bg-auth-gradient flex justify-center items-center p-4">
      <div className="w-full max-w-xs md:max-w-md rounded-lg bg-black/20 backdrop-blur-sm p-6 md:p-8 border border-white/10 ">
        <div className="flex flex-col gap-4 sm:gap-8 ">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-bold text-brand-50">
              ManKoSathi
            </h1>
            <p className="text-xs md:text-xl text-slate-200 md:mt-2">
              Create your ManKoSathi account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="post"
            className="flex flex-col gap-3 sm:gap-6 "
          >
            <Input
              id="name"
              label="Full Name"
              placeholder="Full Name"
              register={register}
              error={errors.name}
            ></Input>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="a@b.c"
              register={register}
              error={errors.email}
            ></Input>
            <Input
              id="password"
              label="Password"
              placeholder="Password"
              type="password"
              register={register}
              error={errors.password}
            ></Input>
            <Button type="submit">Sign Up</Button>
          </form>
          <div className="center">
            <p className="text-xs md:text-base text-center text-slate-400">
              Alreay have ManKoSathi Account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="underline decoration-1 decoration-slate-400 underline-offset-2 cursor-pointer hover:text-blue-500"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
