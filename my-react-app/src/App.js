import logo from './logo.svg';
import './App.css';
import Navbar from  './components/navbar';
import {Route, BrowserRouter , Routes,  Link} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact Component={Homescreen} />
          <Route path="/book/:roomid" exact Component={Bookingscreen} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
