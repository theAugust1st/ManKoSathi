import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { HabitProvider } from './contexts/HabitContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <HabitProvider>
      <App />
      </HabitProvider>
    </AuthProvider>
  </StrictMode>,
)
