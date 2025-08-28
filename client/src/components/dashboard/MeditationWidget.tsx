import { Wind } from "lucide-react"
import Button from "../ui/Button"
function MeditationWidget() {
  return (
  <div className="bg-white col-span-2 p-6 rounded-lg border border-brand-100">
          <h2 className="text-lg font-semibold text-brand-900 mb-4 flex items-center gap-2">
            <Wind size={20} />
            Meditation
          </h2>
          <p className="text-brand-800">Last Session: 5th june</p>
          <p className="text-brand-800">Duration - Meditation-type</p>
          <Button>New Session</Button>
          </div>
  )
}

export default MeditationWidget