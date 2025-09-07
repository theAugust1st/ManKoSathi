import Button from "./components/ui/Button"
import LandingPage from "./pages/LandingPage"
import DashBoard from "./pages/DashBoard"
import Login from "./pages/Login"
import { BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import Register from "./pages/Register"
import { useAuth } from "./hooks/useAuth"
import MainLayout from "./components/layouts/MainLayout"

function App() {
  const {isLoggedIn} = useAuth();
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn?<Navigate to="/dashboard"/>:<Login/>}></Route>
        <Route path="/register" element={isLoggedIn?<Navigate to="/dashboard"/>:<Register/>}></Route>
        <Route element={<ProtectedRoute/>} >
        <Route element={<MainLayout/>}>
          <Route path="/dashboard" element={<DashBoard/>}></Route>
        </Route>
        </Route>
        <Route path="/" element={isLoggedIn?<Navigate to="/dashboard"/>:<LandingPage/>}></Route>
      </Routes>
      {/* <div>
        <Button type="button"  disabled={false} variant={"secondary"}>Click Me</Button>
      </div> */}
    </BrowserRouter>
  )
}

export default App  