const getToken = ()=> localStorage.getItem('token');

export const getMeditationSessions = async()=>{
    const token = getToken();
    const response = await fetch('/api/meditation',{
        method:"GET",
        headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    )
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to retrieve the meditation sessions.")
    }
    return response.json();
}