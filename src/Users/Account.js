import "./index.css";
import React, { useEffect, useState } from "react";
import * as AuthService from "../Service/AuthService";
import * as BookingService from "../Service/BookingService";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, setUserBookings } from "./userReducer";
function Account() {
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const userBookings = useSelector((state) => state.userReducer.userBookings);
    const fullHotelList = useSelector((state) => state.hotelListReducer.fullHotelList);
    const [bookings, setBookings] = useState(null);
    const [userDetails, setUserDetails] = useState({
        _id: currentUser._id,
        email: currentUser.email,
        password: currentUser.password,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        phone: currentUser.phone,
        role: currentUser.role,
        favourite_hotels: currentUser.favourite_hotels
    });
    const dispatch = useDispatch();

    const updateUser = async () => {
        try {
            const data = await AuthService.updateUser(userDetails);
            dispatch(setCurrentUser(data));
        } catch (err) {
        }
    }

    const fetchUserBookings = async () => {
        try {
            const data = await BookingService.findBookingsByUser(currentUser.email);
            dispatch(setUserBookings(data));
            mapHotelsToBookings(data);
        } catch (err) {
        }
    }

    const mapHotelsToBookings = (bookingsData) => {
        const modifiedData = bookingsData.map(booking => {
            const hotel = fullHotelList.find(hotel => hotel.hotel_id === booking.hotel);
            return { ...booking, hotel_name: hotel.name, location: hotel.location };
        })
        setBookings(modifiedData);
    }

    useEffect(() => {
        fetchUserBookings();
    }, [])
    return (
        <div className="account-container">
            <div style={{ width: "40%" }}>
                <h3 style={{ color: "#ffa546" }}>Account</h3>
                <div className="details-container">
                    <div className="mb-2"><span className="label">Email:</span> {userDetails.email}</div>
                    <div className="mb-2"><span className="label">Role:</span> {userDetails.role}</div>
                    <label className="label" for="firstName">First Name</label>
                    <input class="form-control mb-2"
                        id="firstName"
                        value={userDetails.first_name}
                        placeholder="First Name"
                        onChange={(e) => setUserDetails({
                            ...userDetails,
                            first_name: e.target.value
                        })} />
                    <label className="label" for="LastName">Last Name</label>
                    <input class="form-control mb-2"
                        id="LastName"
                        value={userDetails.last_name}
                        placeholder="Last Name"
                        onChange={(e) => setUserDetails({
                            ...userDetails,
                            last_name: e.target.value
                        })} />
                    <label className="label" for="phone">Phone</label>
                    <input class="form-control mb-4"
                        id="phone"
                        value={userDetails.phone}
                        placeholder="Phone"
                        onChange={(e) => setUserDetails({
                            ...userDetails,
                            phone: e.target.value
                        })} />

                    <button class="btn custom-btn btn-primary" onClick={updateUser}>
                        Update
                    </button>
                </div>
            </div>
            <div className="bookings-container">
                <h3 style={{ color: "#ffa546" }}>Bookings</h3>
                {bookings && bookings.length &&
                    <div>
                        {bookings.map(booking => {
                            return (
                                <div className="booking-item mb-3">
                                    <div className="hotel-name">{booking.hotel_name}</div>
                                    <div className="hotel-city-name">{booking.location.city}</div>
                                    <div className="display-flex">
                                        <div className="hotel-checkin me-4"><span>From: </span>{booking.check_in_date}</div>
                                        <div className="hotel-checkin"><span>To: </span>{booking.check_out_date}</div>
                                    </div>
                                    <div className="hotel-checkin"><span>No of Rooms: </span>{booking.rooms}</div>
                                    <div className="hotel-checkin"><span>Total price: </span> ${booking.price}</div>
                                </div>
                            )
                        })}
                    </div>}
                {(!userBookings || userBookings.length === 0) &&
                    <div>
                        You don't have any bookings!.
                    </div>}
            </div>
        </div>
    )
}
export default Account;