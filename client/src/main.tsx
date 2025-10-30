import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { HabitProvider } from './contexts/HabitContext.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <HabitProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </HabitProvider>
    </AuthProvider>
  </StrictMode>,
)
