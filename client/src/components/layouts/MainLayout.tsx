import { useAuth } from "../../hooks/useAuth"
import OnBoardingModal from "../profile/OnBoardingModal";
import Sidebar  from "./Sidebar"
import { Outlet } from "react-router-dom"
import { useState } from "react";

function MainLayout() {
  const [isModelOpen, setIsModelOpen] = useState(false)
  const {user} = useAuth();
  const onBoardingModalNeeded = user && (!user.dob || !user.gender)
  if(onBoardingModalNeeded && !isModelOpen){
    setIsModelOpen(true);
  }
  return (
    <div className="flex min-h-screen">
        <Sidebar/>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet/>
        </main>
        { onBoardingModalNeeded && <OnBoardingModal isOpen={isModelOpen} onClose={()=>setIsModelOpen(false)}/>}
    </div>
  )
}

export default MainLayout