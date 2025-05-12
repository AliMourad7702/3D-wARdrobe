import './App.css';
import './components/preLoader.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SignUp from 'pages/Sign-Up';
import LogIn from 'pages/Login';
import About from 'pages/About';
import PremiumInfo from 'pages/PremiumInfo';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, useNavigate,
} from 'react-router-dom'
import { useState, useEffect } from "react";
import Auth from './Auth';
import PreLoader from 'components/PreLoader';



function App() {

  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    setIsAuth(Auth.isAuth)
  }, [])

  useEffect(() => {
    setIsAuth(Auth.isAuth)
  }, [Auth.isAuth])

  return (
    <div className="App">

      <Router>
        {!isAuth && (
          <PreLoader />
        )}

        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/premiumInfo" element={<PremiumInfo />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
