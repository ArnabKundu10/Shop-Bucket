import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/auth.jsx'
import { CheckProvider } from './store/checked.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CheckProvider>
    <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
    </CheckProvider>
  </StrictMode>
)
