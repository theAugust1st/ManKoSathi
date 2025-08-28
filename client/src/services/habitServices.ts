const getToken = ()=> localStorage.getItem("token");

export const getHabits= async ()=>{
    const token = getToken();
    if(!token){
        throw new Error("No authentication token found.");
    }
    const response = await fetch('/api/habits',{
        method:'GET',
        headers:{
            'Context-Type':'application/Type',
            'Authorization':`Bearer ${token}`
        }
    })
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch habits')
    }
    return response.json();
}