import { BookOpen,Heart } from "lucide-react"
import type { Quote } from "../../pages/DashBoard"
import { useState } from "react"
import { addFavouriteQuote } from "../../services/quoteServices";
import { toast } from 'react-toastify';
type QuoteProps = {
  quote: Quote | null 
}
function QuoteWidget({quote}:QuoteProps) {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  async function handleFavoriteClick(){
    if(!quote || isFavourite||isSubmitting) return // prevent multiple clicks
    setIsSubmitting(true)
    try {
      await addFavouriteQuote(quote._id);
      setIsFavourite(true);
    } catch (error) {
      console.error(error,"Failed to add into the favourites.");
      toast.error("Could not add to the favourites at this time.");
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
            <div className="bg-white rounded-lg p-2 sm:p-4 md:p-6 lg:col-span-3">
          <div className='flex items-center justify-between'>
          <h2 className='text-base md:text-lg font-bold md:font-semiboldtext-brand-900 mt-1 md:mt-2 flex items-center gap-1 md:gap-2'>
            <BookOpen className="w-4 h-4 md:w-6 md:h-6"/>
            Quote of the Day
            </h2>
        <button onClick={handleFavoriteClick} disabled={isSubmitting}>
          <Heart
            className={`transition-colors w-4 h-4 md:w-6 md:h-6 ${
              isFavourite
                ? "text-red-500 fill-current"
                : "text-brand-600 hover:text-red-500"
            }`}
          />
        </button>
          </div>
            <p className="italic text-xs md:text-base text-brand-900">"{quote?.quoteText}"</p>
            <p className='text-md text-[0.625rem] md:text-sm ml-2 md:ml-4 font-bold text-brand-950'>-{quote?.author}</p>
        </div>
  )
}

export default QuoteWidget