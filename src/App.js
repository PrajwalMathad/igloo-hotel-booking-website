import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Signin from "./Users/SignIn";
import Home from "./Home/Home";
import Register from "./Users/Register";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Signin" />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
