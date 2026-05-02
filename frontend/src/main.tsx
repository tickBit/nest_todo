import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import SignUp from './components/SignUp.tsx';
import SignIn from './components/SignIn.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<SignUp  />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
      </Router>
  </StrictMode>,
)
