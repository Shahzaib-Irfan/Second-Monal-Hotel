import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Booking from './pages/Booking'
import LogIn from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'
import ProfilePage from './pages/ProfilePage'
import AdminHomeScreen from './pages/AdminHomeScreen'
import LandingPage from './pages/LandingPage'

function App() {
  useEffect(() =>{
    localStorage.removeItem('currentUserForHotelApp')
  },[])
  return (
    <>
    <Router>
    {/* the content hides behind navbar so the bottom style is applied */}
      <div style={{ marginTop: '6rem' }}>
          <Routes>
              <Route exact path='/' element={<LandingPage />} />
              <Route exact path='/home' element={<HomePage />} />
              <Route exact path='/adminHome' element={<AdminHomeScreen />} />
              <Route exact path='/book/:roomid/:fromDate/:toDate' element={<Booking />} />
              <Route exact path='/loginScreen' element={<LogIn />} />
              <Route exact path='/registerScreen' element={<Register />} />
              <Route exact path='/profileScreen' element={<ProfilePage />}/>
          </Routes>
      </div>
      </Router>
    </>
      
    // <div className="App">
    // </div>
  );
}

export default App
