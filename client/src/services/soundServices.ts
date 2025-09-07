export const getBackgroundSounds = async()=>{
    const response = await fetch('/api/meditation/sounds')
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to retrieve the background sounds.")
    }
    return response.json();
}