const getToken = ()=>{return localStorage.getItem('token') || '';};

export const UserFavoriteQuotes = async () => {
    const token = getToken();
    if(!token) throw new Error('No auth token found');
    const response = await fetch('/api/user/profile/favorites', {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user favorite quotes');
    }
    return response.json();
}
export const getQuotes = async ({limit,page}:{limit:number|undefined , page:number|undefined})=>{
    const response = await fetch(`/api/quotes?limit=${limit}&page=${page}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
    }
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch quote of the day');
    }
    return response.json();   
}

export const addFavouriteQuote = async (quoteId:string)=>{
    const token = getToken();
    if(!token) throw new Error('No auth token found');
    const response = await fetch('/api/user/profile/favorites',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({quoteId})
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add favorite quote');
    }
    return response.json();
}

export const removeFavouriteQuote = async (quoteId:string)=>{
    const token = getToken();
    if(!token) throw new Error('No auth token found');
    const response = await fetch(`/api/user/profile/favorites/${quoteId}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove favorite quote');
    }
    return response.json();
}