import Button from "./components/ui/Button"
import DashBoard from "./pages/DashBoard"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { BrowserRouter,Route,Routes} from "react-router-dom"
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcome to the ManKoSathi!</h1>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>
      </Routes>
      <div>
        <Button type="button"  disabled={false} variant={"secondary"}>Click Me</Button>
      </div>
    </BrowserRouter>
  )
}

export default App