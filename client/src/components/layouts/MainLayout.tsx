import Sidebar  from "./Sidebar"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className="flex min-h-screen">
        <Sidebar/>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet/>
        </main>
    </div>
  )
}

export default MainLayout