import DashBoard from "./pages/DashBoard"
import Login from "./pages/Login"
import { BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import Register from "./pages/Register"
import { useAuth } from "./hooks/useAuth"
import MainLayout from "./components/layouts/MainLayout"
import MeditationPage from "./pages/MeditationPage"
import { MeditationLayout } from "./components/layouts/MeditationLayout"
import MeditationGuidePage from "./components/meditation/MeditationGuidePage"
import LiveSessionPage from "./components/meditation/LiveSessionPage"
import MeditationSessionSetup from "./components/meditation/MeditationSessionSetup"
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
          <Route path="/meditation" element={<MeditationLayout/>}>
            <Route index element={<MeditationPage/>}></Route>
            <Route path="/meditation/setup" element={<MeditationSessionSetup/>}></Route>
            <Route path="/meditation/guide" element={<MeditationGuidePage/>}></Route>
            <Route path="/meditation/live" element={<LiveSessionPage/>}></Route>
          </Route>
        </Route>
        </Route>
        <Route path="/" element={isLoggedIn?<Navigate to="/dashboard"/>:<h1>Welcome to the ManKoSathi!</h1>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App