import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { useForm, type SubmitHandler } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const loginSchema = z.object({
  email: z.string().email({ error: "Please enter a valid email" }),
  password: z.string().min(1, { error: "Password is required" }),
});
type LoginInputFields = z.infer<typeof loginSchema>;
function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { register, reset, handleSubmit, formState: { errors }, } = useForm<LoginInputFields>({ resolver: zodResolver(loginSchema) });
    const onSubmit: SubmitHandler<LoginInputFields> = async(data) => {
      setIsSubmitting(true);
      try{
      const response = await fetch('/api/auth/login',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data), 
      })
      const result = await response.json()
      if(!response.ok){
        console.log("Login Failed:", result.message);
        alert(`Login Failed: ${result.message}`)
      }
      else{
        console.log("Login Successful", result)
        const {user,token} = result
        login(user,token);
        navigate('/dashboard')
        reset();
      }
    }catch(err){
      console.log("An error occured",err)
      alert("An error occured during login")
    }
    finally{
      setIsSubmitting(false);
    }
    };
  return (
    <div className="min-h-screen w-screen bg-auth-gradient flex justify-center items-center p-4">
      <div className="w-full max-w-md rounded-lg bg-black/20 backdrop-blur-sm p-8 border border-white/10 ">
        <div className="flex flex-col gap-8 ">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black">ManKoSathi</h1>
            <p className="text-xl text-slate-200 mt-2">
              Login to your ManKoSathi account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="post"
            className="flex flex-col gap-6 "
          >
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
              <Button type="submit" disabled={isSubmitting}>{isSubmitting?"Logging in...":"Log In"}</Button>
          </form>
            <div className="center">
            <p className="text-base text-center text-slate-400">
              New to our sidte? <span className="underline underline-offset-2 cursor-pointer hover:text-blue-500">SignUp</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login