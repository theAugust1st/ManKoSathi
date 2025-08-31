const getToken = ()=> localStorage.getItem('token');

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