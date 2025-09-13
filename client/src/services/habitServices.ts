const getToken = ()=> localStorage.getItem("token");
type GetHabitOptions = {
        sortBy?:string,
        order?:string
    }
export const getHabits= async (options:GetHabitOptions = {})=>{
    

    const token = getToken();
    if(!token){
        throw new Error("No authentication token found.");
    }
    let url = '/api/habits'
    if(options.sortBy){
        url += `?sortBy=${options.sortBy}&order=${options.order|| 'asc'}`
    }
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch habits')
    }
    return response.json();
}
export const createHabit = async ({habitName:habitName,frequency:frequency,description}:{habitName:string,frequency:'daily'| 'weekly',description:string}) =>{
    const token = getToken();
    if(!token){
        throw new Error("No Authentication token found.")
    }
    const response = await fetch("/api/habits",{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({habitName:habitName,frequency:frequency,description})
    })
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save new habit for now.')
    }
    return response.json();
}
export const updateHabit = async (habitID:string,{habitName,frequency,description}:{habitName:string,frequency:'daily'| 'weekly',description:string})=>{
    const token = getToken()
    if(!token){
        throw new Error("NO Authentication token found.")
    }
    const response = await fetch(`/api/habits/${habitID}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({habitName,frequency,description})
    })
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit the habit for now.")
    }
    return response.json()
}
export const completeHabit = async(habitID:string)=>{
    const token = getToken();
    if(!token){
        throw new Error("No authentication token found.")
    }
    const response = await fetch(`/api/habits/${habitID}/complete`,
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }
    )
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete the habit.');
    }
    return response.json();
}

export const deleteHabit = async(id:string)=>{
    const token = getToken();
    if(!token){
        throw new Error("No Authentication token found.")
    }
    const response = await fetch(`/api/habits/${id}`,{
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the habit")
    }
    return response.json();
}