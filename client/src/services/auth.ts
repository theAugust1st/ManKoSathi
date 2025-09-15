export const verifyOtp = async({email,otp}:{email:string,otp:string}) =>{
    console.log(email,otp)
    const response = await fetch('/api/auth/verifyOTP',{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
        },
        body: JSON.stringify({email,otp})
    })
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to verify otp try again")
    }
    return response.json();
}