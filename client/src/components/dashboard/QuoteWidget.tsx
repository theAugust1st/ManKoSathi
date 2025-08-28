import { BookOpen,Heart } from "lucide-react"
function QuoteWidget() {
  return (
            <div className="bg-white rounded-lg p-6 lg:col-span-4">
          <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-brand-900 mt-2 flex items-center gap-2'>
            <BookOpen size={20}/>
            Quote of the Day
            </h2>
            <Heart size={20}/>
          </div>
            <p className="italic text-brand-900">"Placeholder for a beautiful quote..."</p>
            <p className='text-md font-semibold text-brand-950'>-Auther</p>
        </div>
  )
}

export default QuoteWidget