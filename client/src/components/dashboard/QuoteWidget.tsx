import { BookOpen,Heart } from "lucide-react"
import type { Quote } from "../../pages/DashBoard"
import { useState } from "react"
import { addFavouriteQuote } from "../../services/quoteServices";
function QuoteWidget({quote}:{quote:Quote}) {
  console.log(quote._id)
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  async function handleFavoriteClick(){
    if(!quote || isFavourite||isSubmitting) return // prevent multiple clicks
    setIsSubmitting(true)
    try {
      await addFavouriteQuote(quote._id);
      setIsFavourite(true);
    } catch (error) {
      console.log(error,"Failed to add into the favourites.");
      alert("Could not add to the favourites at this time.");
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
            <div className="bg-white rounded-lg p-6 lg:col-span-4">
          <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-brand-900 mt-2 flex items-center gap-2'>
            <BookOpen size={20}/>
            Quote of the Day
            </h2>
        <button onClick={handleFavoriteClick} disabled={isSubmitting}>
          <Heart
            size={24}
            className={`transition-colors ${
              isFavourite
                ? "text-red-500 fill-current"
                : "text-brand-600 hover:text-red-500"
            }`}
          />
        </button>
          </div>
            <p className="italic text-brand-900">"{quote.quoteText}"</p>
            <p className='text-md font-semibold text-brand-950'>-{quote.author}</p>
        </div>
  )
}

export default QuoteWidget