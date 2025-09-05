import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Register from "./pages/Register";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./components/layouts/MainLayout";
import MeditationPage from "./pages/MeditationPage";
import { MeditationLayout } from "./components/layouts/MeditationLayout";
import MeditationGuidePage from "./components/meditation/MeditationGuidePage";
import LiveSessionPage from "./components/meditation/LiveSessionPage";
import MeditationSessionSetup from "./components/meditation/MeditationSessionSetup";
import MeditationPostSession from "./components/meditation/MeditationPostSession";
import HabitLayout from "./components/layouts/HabitLayout";
import HabitPage from "./pages/HabitPage";
import QuotesPage from "./pages/QuotesPage";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        ></Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/meditation" element={<MeditationLayout />}>
              <Route index element={<MeditationPage />} />{" "}
              {/* Default history page */}
              <Route path="setup" element={<MeditationSessionSetup />} />
              <Route path="guide" element={<MeditationGuidePage />} />
              <Route path="live" element={<LiveSessionPage />} />
              <Route path="summary" element={<MeditationPostSession />} />
            </Route>
            <Route path="/habits" element={<HabitLayout />}>
              <Route index element={<HabitPage/>} />
            </Route>
            <Route path="/quotes" element={<QuotesPage/>}></Route>
          </Route>
        </Route>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <h1>Welcome to the ManKoSathi!</h1>
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
