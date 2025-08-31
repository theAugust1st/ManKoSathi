import { Outlet } from "react-router-dom";
import { MeditationProvider } from "../../contexts/MeditationContext";
export const MeditationLayout = () => {
  return (
    <MeditationProvider>
      <Outlet />
    </MeditationProvider>
  );
};