
import { useNavigate, Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import store from "../store";
import { Provider } from "react-redux";
import WIP from "../WIP";
import Home from "./Home";
import "./index.css";
import Navbar from "../Navbar";
import HotelDetails from "../HotelList/HotelDetails";
import Signin from "../Users/SignIn";

function MainContainer() {
    return (
        <Provider store={store}>
            <div className="row outer-container">
                <Navbar />
                <div className="col second-container">
                    <Routes>
                        <Route path="/" element={<Navigate to="home" />} />
                        <Route path="home" element={<Home />} />
                        <Route path="hotel/:hotelId" element={
                            <HotelDetails />} />
                        {/* <Route path="hotel/:hotelId" element={
                            <HotelDetails />} /> */}
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}
export default MainContainer;

