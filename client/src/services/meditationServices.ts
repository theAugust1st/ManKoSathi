const getToken = ()=> localStorage.getItem('token');
type GetMeditationOptions = {
  sortBy?:string,
  order?:string
}
export interface NewSessionData {
  durationSeconds: string | number;
  meditationTechnique: string;
  mood: {
    preSession: string;
    postSession: string;
  };
  goals: string;
  backgroundSoundID:string ;
}

export const getMeditationSessions = async(options:GetMeditationOptions ={})=>{
    const token = getToken();
    if(!token)
      throw new Error("No authentication token found.")
    let url = '/api/meditation'
    if(options.sortBy){
      url += `?sortBy=${options.sortBy}&order=${options.order|| 'asc'}` 
    }
    const response = await fetch(url,{
        method:"GET",
        headers:{
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
export const createMeditationSession = async (sessionData: NewSessionData) => {
  const token = getToken();
  if (!token) throw new Error('You are not logged in.');

  const response = await fetch('/api/meditation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(sessionData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create session.');
  }
  return response.json();
};

export const deleteMeditationSession = async (sessionId: string) => {
  const token = getToken();
  if (!token) throw new Error('You are not logged in.');

  const response = await fetch(`/api/meditation/${sessionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete session.');
  }
  return response.json();
}