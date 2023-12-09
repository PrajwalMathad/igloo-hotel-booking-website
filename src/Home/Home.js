import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import WIP from "../WIP";
import { useSelector, useDispatch } from "react-redux";
import { setSearchDetails } from "./homeReducer";
import "./index.css";
import HotelList from "../HotelList";
import * as HotelService from "../Service/HotelService";
import { setHotelList } from "../HotelList/hotelListReducer";

function Home() {
    const searchDetails = useSelector((state) => state.homeReducer.searchDetails);
    const dispatch = useDispatch();
    const search = async () => {
        try {
            const hotelList = await HotelService.findHotelsByCity(searchDetails.city);
            dispatch(setHotelList(hotelList));
        } catch (err) {
            console.log(err);
        }
    }

    const fetchHotels = async () => {
        try {
            const hotelList = await HotelService.findAllHotels();
            dispatch(setHotelList(hotelList));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchHotels();
    }, [])

    return (
        <div className="home-container">
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
            </div>
            <HotelList />
            {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Sign In</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure want to remove the assignment?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => {

                            }}>SignIn</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
export default Home;

