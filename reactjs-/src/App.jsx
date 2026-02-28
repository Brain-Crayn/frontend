import { useState } from 'react'
import './App.css'
import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {
  const [count, setCount] = useState(0)
  const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <main>
          <AppRoutes />
        </main>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App;
 
