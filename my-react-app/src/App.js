import logo from './logo.svg';
import './App.css';
import Navbar from  './components/navbar';
import {Route, BrowserRouter , Routes,  Link} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact Component={Homescreen} />
          <Route path="/book/:roomid/:fromdate/:todate" exact Component={Bookingscreen} />
          <Route path="/Login" exact Component={Loginscreen} />
          <Route path="/Register" exact Component={Registerscreen} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
