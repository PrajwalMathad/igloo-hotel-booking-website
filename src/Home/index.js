
import { useNavigate, Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import "./index.css";
import Navbar from "../Navbar";
import HotelDetails from "../HotelList/HotelDetails";
import Account from "../Users/Account";
import Profile from "../Users/Profile";

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
                        
                    <Route path="User" element={<Account />} />
                    <Route path="Profile/:emailId" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}
export default MainContainer;

