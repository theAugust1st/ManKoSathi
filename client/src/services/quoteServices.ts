const getToken = () => localStorage.getItem('token');

export const getRandomQuote = async () =>{
    const response = await fetch('/api/quotes/random');
    if(!response.ok){
        throw new Error("Failed to fetch random quote.");
    }
    return response.json();
}

export const addFavouriteQuote = async (quoteId:string) => {
    const token = getToken();
    const response = await fetch('/api/user/profile/favorites',{
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization': `Bearer ${token}`
        },
        body :JSON.stringify({quoteId})
    })
    if( !response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Faild to add favorite.")
    }
    return response.json();
}