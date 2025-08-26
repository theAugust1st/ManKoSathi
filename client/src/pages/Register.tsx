import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required" })
    .min(3, { error: "Name must be at least 3 characters." })
    .max(20,{error:"Name should not be longer than 20 characters."}),
    email:z.email({error:"Please enter a valid email"}),
    password:z.string().refine(
  (val) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(val),
  { error: "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character" }
)
});
type InputFields = z.infer<typeof signUpSchema>;

function Register() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFields>({ resolver: zodResolver(signUpSchema) });
  const onSubmit: SubmitHandler<InputFields> = async(data) => {
    try{
    const response = await fetch('/api/auth/register',{
      method:"POST",
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data), 
    })
    const result = await response.json()
    if(!response.ok){
      console.log("Registration Failed:", result.message);
      alert(`Registration Failed: ${result.message}`)
    }
    else{
      console.log("registration Successful", result)
      alert("Here will be welcome page")
      reset()
    }
  }catch(err){
    console.log("An error occured",err)
    alert("An error occured during registration")
  }
    console.log(data);
  };
  return (
    <div className="min-h-screen w-screen bg-auth-gradient flex justify-center items-center p-4">
      <div className="w-full max-w-md rounded-lg bg-black/20 backdrop-blur-sm p-8 border border-white/10 ">
        <div className="flex flex-col gap-8 ">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black">ManKoSathi</h1>
            <p className="text-xl text-slate-200 mt-2">
              Create your ManKoSathi account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="post"
            className="flex flex-col gap-6 "
          >
              <Input id="name" label="Full Name" placeholder="Full Name" register={register} error={errors.name}>
              </Input>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="a@b.c"
                register={register}
                error={errors.email}
              ></Input>
              <Input id="password" label="Password" placeholder="Password" type="password" register={register} error={errors.password}>
              </Input>
              <Button type="submit">Sign Up</Button>
          </form>
          <div className="center">
            <p className="text-base text-center text-slate-400">
              Alreay have ManKoSathi Account? <span className="underline underline-offset-2 cursor-pointer hover:text-blue-500">Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
