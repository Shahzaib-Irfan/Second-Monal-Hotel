import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import AdminRooms from "./components/AdminRooms";
import AddRoom from "./components/AddRoom";
import BookRoom from "./components/BookRoom";

function App() {
  return (
    <div className="App"> 
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Loginscreen} />
          <Route path="/home" exact Component={Homescreen} />
          <Route path="/viewrooms" element={<AdminRooms />} />
          <Route path="/viewrooms/addroom" element={<AddRoom />} />
          <Route path="/viewrooms/bookroom/:id" element={<BookRoom />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            Component={Bookingscreen}
          />
          <Route path="/Login" exact Component={Loginscreen} />
          <Route path="/Register" exact Component={Registerscreen} />
          <Route path="/profile" exact Component={Profilescreen} />
          <Route path="/Admin" exact Component={Adminscreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
