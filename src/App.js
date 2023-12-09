import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Signin from "./Users/SignIn";
import MainContainer from "./Home";
import Register from "./Users/Register";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <HashRouter>
      <div>
        <Provider store={store}>
          <Routes>
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/*" element={<MainContainer />} />
          </Routes>
        </Provider>
      </div>
    </HashRouter>
  );
}

export default App;
