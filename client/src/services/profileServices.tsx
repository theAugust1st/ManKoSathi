import type { User } from "../contexts/AuthContext";
const getToken = () => localStorage.getItem("token");

export const updateUserProfile = async(user:User)=>{
    const token = getToken();
    if(!token) throw new Error("No auth token found.")
    
    const response = await fetch('/api/user/profile/update',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })    
    if(!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user profile.')
    }
    return response.json();
}
