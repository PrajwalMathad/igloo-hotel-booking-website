import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import WIP from "../WIP";
import { useSelector, useDispatch } from "react-redux";
import { setSearchDetails } from "./homeReducer";
import "./index.css";
import HotelList from "../HotelList";
import * as HotelService from "../Service/HotelService";
import * as AuthService from "../Service/AuthService";
import { setHotelList, setFullHotelList } from "../HotelList/hotelListReducer";
import { setUserList } from "../Users/userReducer";

function Home() {
    const searchDetails = useSelector((state) => state.homeReducer.searchDetails);
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const dispatch = useDispatch();
    const search = async () => {
        try {
            if (searchDetails.city) {
                const hotelList = await HotelService.findHotelsByCity(searchDetails.city);
                if(hotelList && hotelList.message) {
                    dispatch(setHotelList([]));
                } else {
                    dispatch(setHotelList(hotelList));
                }
            } else {
                fetchHotels();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchHotels = async () => {
        try {
            if (!currentUser || (currentUser && (currentUser.role !== "owner"))) {
                const hotelList = await HotelService.findAllHotels();
                if(hotelList && hotelList.message) {
                    dispatch(setHotelList([]));
                } else {
                    dispatch(setHotelList(hotelList));
                    dispatch(setFullHotelList(hotelList));
                }
            } else {
                const hotelList = await HotelService.findHotelsByOwner(currentUser.email);
                if(hotelList && hotelList.message) {
                    dispatch(setHotelList([]));
                } else {
                    dispatch(setHotelList(hotelList));
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchUsers = async () => {
        try {
            const userList = await AuthService.findAllUsers();
            dispatch(setUserList(userList));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchHotels();
        fetchUsers();
    }, [])

    return (
        <div className="home-container">
            {(!currentUser || (currentUser && currentUser.role === "user")) &&
                <div class="search-container mt-3 mb-3">
                    <div className="search-title mb-3">Search your next destination!</div>
                    <div style={{ "alignItems": "flex-end" }} className="display-flex">
                        <div className="search-box me-2">
                            <label>City</label>
                            <input value={searchDetails.city} type="text" class="form-control " placeholder="Search City"
                                onChange={(e) => dispatch(setSearchDetails({ ...searchDetails, city: e.target.value }))} />
                        </div>
                        <div className="search-box me-2">
                            <label>From</label>
                            <input value={searchDetails.from} type="date" class="form-control" placeholder="Search Dates"
                                onChange={(e) => dispatch(setSearchDetails({ ...searchDetails, from: e.target.value }))} />
                        </div>
                        <div className="search-box me-2">
                            <label>To</label>
                            <input value={searchDetails.to} type="date" class="form-control" placeholder="Search Dates"
                                onChange={(e) => dispatch(setSearchDetails({ ...searchDetails, to: e.target.value }))} />
                        </div>
                        <button className="custom-btn btn-primary search-go" onClick={e => { e.preventDefault(); search() }}>Search</button>
                    </div>
                </div>}
            <HotelList />
        </div>
    );
}
export default Home;

