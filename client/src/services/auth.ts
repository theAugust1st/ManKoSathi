export const verifyOtp = async({email,otp}:{email:string,otp:string}) =>{
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

export const sendOtp = async ({ email }: { email: string }) => {
    const response = await fetch('/api/auth/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send otp');
    }
    return response.json();
};