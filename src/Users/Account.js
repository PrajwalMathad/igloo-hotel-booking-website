import "./index.css";
import React, { useEffect, useState } from "react";
import * as AuthService from "../Service/AuthService";
import * as BookingService from "../Service/BookingService";
import { FaTrashCan } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser, setUserBookings, setSelectedUser } from "./userReducer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function Account() {
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const userList = useSelector((state) => state.userReducer.userList);
    const userBookings = useSelector((state) => state.userReducer.userBookings);
    const fullHotelList = useSelector((state) => state.hotelListReducer.fullHotelList);
    const hotelList = useSelector((state) => state.hotelListReducer.hotelList);
    const [bookings, setBookings] = useState(null);
    const [showA, setShowA] = useState(false);
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
    const navigate = useNavigate();

    const toggleShowA = () => setShowA(!showA);

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

    const fetchHotelBookingsForOwner = async () => {
        try {
            let bookingsData = [];
            hotelList.map(async (hotel) => {
                const data = await BookingService.findBookingsByHotel(hotel.hotel_id);
                bookingsData = [...bookingsData, ...data];
                dispatch(setUserBookings(bookingsData));
                mapHotelsToBookings(bookingsData);
            })
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

    const deleteBooking = async (id) => {
        try {
            await BookingService.deleteBooking(id);
            const index = bookings.findIndex(item => item._id === id);
            const newBookings = [...bookings];
            newBookings.splice(index, 1);
            setBookings(newBookings);
            toggleShowA();
        } catch (err) {
        }
    }

    const toProfilePage = (user) => {
        dispatch(setSelectedUser(user));
        navigate(`/Profile/${user.email}`)
    }

    useEffect(() => {
        if (currentUser.role === "user") {
            fetchUserBookings();
        } else if (currentUser.role === "owner") {
            fetchHotelBookingsForOwner();
        }
    }, [])
    return (
        <div style={{ overflowX: "hidden" }}>
            <div className="account-container">
                <div style={{ width: "32%" }}>
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
                {currentUser && (currentUser.role === "user" || currentUser.role === "owner") &&
                    <div className="bookings-container">
                        {currentUser.role === "user" ? <h3 style={{ color: "#ffa546" }}>Your Bookings</h3> :
                            <h3 style={{ color: "#ffa546" }}>Bookings for your hotels:</h3>}
                        {bookings && bookings.length &&
                            <div>
                                {bookings.map(booking => {
                                    return (
                                        <div className="booking-item mb-3">
                                            <div className="hotel-name">{booking.hotel_name}
                                                <div className="float-end">
                                                    <FaTrashCan onClick={e => { e.preventDefault(); deleteBooking(booking._id); }} />
                                                </div>
                                            </div>
                                            <div className="hotel-city-name">{booking.location.city}</div>
                                            {currentUser.role === "owner" &&
                                                <div className="hotel-checkin"><span>Booked by: </span>{booking.user}</div>}
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
                    </div>}
                {currentUser && currentUser.role === "admin" &&
                    <div>
                        <h3 style={{ color: "#ffa546" }}>Users:</h3>
                        <table class="table">
                            <thead>
                                <tr style={{ color: "#ffa546" }}>
                                    <th scope="col">Email</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map(user => {
                                    return (
                                        <tr>
                                            <th className="user-row" scope="row" onClick={e => {
                                                e.preventDefault();
                                                toProfilePage(user);
                                            }
                                            }>{user.email}</th>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <Row>
                <Col md={4}></Col>
                <Col md={5} className="mb-2">
                    <Toast show={showA} onClose={toggleShowA} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Confirmation</strong>
                        </Toast.Header>
                        <Toast.Body>Your stay has been cancelled.</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </div>
    )
}
export default Account;