
import { useNavigate, Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import "./index.css";
import Navbar from "../Navbar";
import HotelDetails from "../HotelList/HotelDetails";

function MainContainer() {
    return (
        <div className="row outer-container">
            <Navbar />
            <div className="col second-container">
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Hotel/:hotelId" element={
                        <HotelDetails />} />
                </Routes>
            </div>
        </div>
    );
}
export default MainContainer;

