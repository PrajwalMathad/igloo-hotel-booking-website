import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FaStar, FaCircle, FaHeart, FaRegHeart } from "react-icons/fa6";
import image from "../assets/hotel-1.avif"
import { Link, useNavigate, useParams } from "react-router-dom";
import { setSearchDetails } from "../Home/homeReducer";
import * as HotelService from "../Service/HotelService";
import * as AuthService from "../Service/AuthService";
import * as BookingService from "../Service/BookingService";
import * as ReviewService from "../Service/ReviewService";
import { setHotel } from "../HotelList/hotelListReducer";
import { setCurrentUser } from "../Users/userReducer";

function HotelDetails() {
    const [totalPrice, setTotalprice] = useState(null);
    const [fav, setFav] = useState(false);
    const [hotelRating, setHotelRating] = useState(null);
    const [canBook, setCanBook] = useState(false);
    const [error, setError] = useState(null);
    const { hotelId } = useParams();
    const searchDetails = useSelector((state) => state.homeReducer.searchDetails);
    const hotel = useSelector((state) => state.hotelListReducer.hotel);
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const dispatch = useDispatch();

    const getHotelById = async (hotelId) => {
        try {
            const hotel = await HotelService.findHotelById(hotelId);
            if(currentUser.favourite_hotels.find(item => item === hotel.hotel_id)) {
                setFav(true);
            }
            dispatch(setHotel(hotel));
        } catch (err) {
            console.log(err);
        }
    }

    const checkAvailability = async () => {
        try {
            const details = {
                hotel: hotel.hotel_id,
                check_in_date: searchDetails.from,
                check_out_date: searchDetails.to
            }
            const data = await BookingService.getBookingStatus(details);
            if (hotel.total_rooms - data.booked_rooms >= searchDetails.rooms) {
                setCanBook(true);
                bookHotel();
            } else {
                setCanBook(false);
                setError("Not enough rooms available for the selected dates!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const bookHotel = async () => {
        try {
            const details = {
                "user": currentUser.email,
                "hotel": hotel.hotel_id,
                "check_in_date": searchDetails.from,
                "check_out_date": searchDetails.to,
                "rooms": searchDetails.rooms,
                "price": totalPrice
            }
            const data = await BookingService.createBooking(details);
        } catch (err) {
            console.log(err);
        }
    }

    const addToFav = async (fav) => {
        try {
            const user = {
                ...currentUser,
                favourite_hotels : [...currentUser.favourite_hotels, hotel.hotel_id]
            }
            const data = await AuthService.updateUser(user);
            setFav(true);
            dispatch(setCurrentUser(user));
        } catch (err) {
            console.log(err);
        }
    }

    const getHotelRating = async (hotelId) => {
        try {
            const rating = await ReviewService.getAvgHotelRating(hotelId);
            setHotelRating(rating[0].avg_rating);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (searchDetails.from && searchDetails.to) {
            let fromDate = new Date(searchDetails.from);
            let toDate = new Date(searchDetails.to);
            let noOfDays = Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24));
            if (noOfDays < 0) {
                setTotalprice(0);
                setError("From Date should be earlier than the To date.")
            } else {
                setError(null);
                setTotalprice(searchDetails.rooms * hotel.price * noOfDays);
            }
        }
    }, [searchDetails])

    useEffect(() => {
        if (hotelId && !hotel) {
            getHotelById(hotelId);
            getHotelRating(hotelId);
        } else {
            if(currentUser.favourite_hotels.find(item => item === hotel.hotel_id)) {
                setFav(true);
            }
            getHotelRating(hotel.hotel_id);
        }
        if (!currentUser) {
            setError("Please signin to book rooms.")
        }
    }, []);

    return (
        <div className="hotel-details-container">
            <div className="hotel-details-second-container">
                <div className="hotel-details">
                    <div className="hotel-name">{hotel.name}
                        <div title="Favourite" className="favouite float-end" onClick={e => { e.preventDefault(); addToFav(fav); }}>
                            {fav ? <FaHeart /> : <FaRegHeart />}
                        </div>
                    </div>
                    <div className="hotel-location">{hotel.location.street}, {hotel.location.city}, {hotel.location.state}</div>
                    <div className="hotel-rating mt-1">{hotelRating}<FaStar className="ms-1 mt-1" /></div>
                    <h5 className="mt-3">Description:</h5>
                    <div className="hotel-description">{hotel.description}</div>
                    <h5 className="mt-3">Aminities:</h5>
                    <div className="hotel-aminities">
                        {hotel.amenities.map(item => {
                            return (
                                <div className="aminity"><FaCircle className="am-circle me-2 ms-2" />{item}</div>
                            )
                        })}
                    </div>
                    <h5 className="mt-3">Room:</h5>
                    <div className="hotel-aminities">
                        <div className="aminity"><FaCircle className="am-circle me-2 ms-2" />King Size Bed</div>
                        <div className="aminity"><FaCircle className="am-circle me-2 ms-2" />AC</div>
                        <div className="aminity"><FaCircle className="am-circle me-2 ms-2" />TV</div>
                    </div>
                    <h6 className="mt-3">Room size: 150 sqft</h6>
                    <div className="hotel-price mt-2">${hotel.price} </div>
                    <div style={{ fontSize: "0.8em" }}>per night</div>
                    <span style={{ fontSize: "0.8em" }}>includes taxes and fees</span>
                </div>
                <img className="hotel-picture" alt="text" src={image} />
            </div>
            <div className="booking-container">
                <h3>Book:</h3>
                <div className="booking-search-container">
                    <div className="search-box me-2">
                        <label>Rooms</label>
                        <input value={searchDetails.rooms} type="number" class="form-control" placeholder="Search Dates"
                            onChange={(e) => dispatch(setSearchDetails({ ...searchDetails, rooms: e.target.value }))} />
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
                </div>
                {error && <div className="mt-2" style={{ color: "red" }}>{error}</div>}
                {(searchDetails.rooms > 0 && searchDetails.from && searchDetails.to) &&
                    <div className="display-flex mt-3">
                        <div>
                            <h5>Total Price:</h5>
                            <div className="total-price">${totalPrice}</div>
                            <span style={{ fontSize: "0.8em" }}>includes taxes and fees</span>
                        </div>
                        <div className="booking-button">
                            <button
                                disabled={currentUser && currentUser.role === 'user' ? false : true}
                                class="btn custom-btn btn-primary me-4 mt-4 ms-4" onClick={checkAvailability}> Book </button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
export default HotelDetails;