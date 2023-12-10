import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FaStar, FaCircle, FaHeart, FaRegHeart, FaPencil } from "react-icons/fa6";
import image from "../assets/hotel-1.avif"
import { useParams } from "react-router-dom";
import { setSearchDetails } from "../Home/homeReducer";
import * as HotelService from "../Service/HotelService";
import * as AuthService from "../Service/AuthService";
import * as BookingService from "../Service/BookingService";
import * as ReviewService from "../Service/ReviewService";
import { setHotel } from "../HotelList/hotelListReducer";
import { setCurrentUser } from "../Users/userReducer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HotelDetails() {
    const searchDetails = useSelector((state) => state.homeReducer.searchDetails);
    const hotel = useSelector((state) => state.hotelListReducer.hotel);
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const [totalPrice, setTotalprice] = useState(null);
    const [fav, setFav] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [hotelRating, setHotelRating] = useState(null);
    const [hotelReviews, setHotelReviews] = useState(null);
    const [canBook, setCanBook] = useState(false);
    const [error, setError] = useState(null);
    const [hotelDetails, setHotelDetails] = useState({
        ...hotel
    })
    const { hotelId } = useParams();
    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false);

    const closeEditHotelModal = () => setShowEditModal(false);
    const showEditHotelModal = () => setShowEditModal(true);

    const toggleShowToast = () => setShowToast(!showToast);

    const getHotelById = async (hotelId) => {
        try {
            const hotel = await HotelService.findHotelById(hotelId);
            if (currentUser.favourite_hotels.find(item => item === hotel.hotel_id)) {
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
            toggleShowToast();
        } catch (err) {
            console.log(err);
        }
    }

    const addToFav = async (fav) => {
        try {
            if (currentUser) {
                const user = {
                    ...currentUser,
                    favourite_hotels: [...currentUser.favourite_hotels, hotel.hotel_id]
                }
                const data = await AuthService.updateUser(user);
                setFav(true);
                dispatch(setCurrentUser(user));
            }
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

    const getHotelReviews = async (hotelId) => {
        try {
            const reviews = await ReviewService.findReviewsByHotel(hotelId);
            setHotelReviews(reviews);
        } catch (err) {
            console.log(err);
        }
    }

    const updateHotelDetails = async () => {
        try {
            await HotelService.updateHotel(hotelDetails);
            dispatch(setHotel(hotelDetails));
            closeEditHotelModal();
        } catch (err) {
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
            getHotelReviews(hotelId)
        } else {
            if (currentUser && currentUser.favourite_hotels.find(item => item === hotel.hotel_id)) {
                setFav(true);
            }
            getHotelRating(hotel.hotel_id);
            getHotelReviews(hotel.hotel_id);
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
                        {currentUser && currentUser.role === "user" && <div title="Favourite" className="favouite float-end" onClick={e => { e.preventDefault(); addToFav(fav); }}>
                            {fav ? <FaHeart /> : <FaRegHeart />}
                        </div>}
                        {currentUser && currentUser.role === "owner" && <div className="edit-pencil mt-3 float-end" onClick={e => { e.preventDefault(); showEditHotelModal(fav); }}>
                            <FaPencil />
                        </div>}
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
                    {currentUser && currentUser.role === "user" &&
                        <div>
                            <h3>Book</h3>
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
                                        <button id="liveToastBtn"
                                            disabled={currentUser && currentUser.role === 'user' ? false : true}
                                            class="btn custom-btn btn-primary me-4 mt-4 ms-4"
                                            onClick={checkAvailability}> Book </button>
                                    </div>
                                </div>}

                        </div>}
                </div>
                <div className="hotel-picture-rating-container">
                    <img className="hotel-picture" alt="text" src={image} />
                    <div className="reviews-container">
                        <h3>Reviews</h3>
                        {hotelReviews && hotelReviews.map(review => {
                            return (
                                <div className="hotel-review mb-3">
                                    <div className="review-header">
                                        <div>{review.user}</div>
                                        <div>{review.date}</div>
                                    </div>
                                    <div className="hotel-rating mt-2 ms-3">{review.rating}<FaStar className="ms-1 mt-1" /></div>
                                    <div className="review-comment">{review.comment}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Row>
                <Col md={4}></Col>
                <Col md={5} className="mb-2">
                    <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Confirmation</strong>
                        </Toast.Header>
                        <Toast.Body>Your stay has been booked!!!</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <Modal show={showEditModal} onHide={closeEditHotelModal} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Hotel Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="label" for="hotelName">Hotel Name</label>
                    <input id="hotelName" class="form-control mb-2" value={hotelDetails.name} placeholder="Hotel Name"
                        onChange={(e) => setHotelDetails({ ...hotelDetails, name: e.target.value })} />
                    <label className="label" for="description">Description</label>
                    <input id="description" class="form-control mb-2" value={hotelDetails.description} placeholder="Description"
                        onChange={(e) => setHotelDetails({ ...hotelDetails, description: e.target.value })} />
                    <label className="label" for="price">Price</label>
                    <input id="price" class="form-control mb-2" value={hotelDetails.price} placeholder="Price"
                        onChange={(e) => setHotelDetails({ ...hotelDetails, price: e.target.value })} />
                    <label className="label" for="noofrooms">Number of rooms</label>
                    <input id="noofrooms" class="form-control mb-4" value={hotelDetails.total_rooms} placeholder="Number of rooms"
                        onChange={(e) => setHotelDetails({ ...hotelDetails, total_rooms: e.target.value })} />
                </Modal.Body>
                <Modal.Footer>
                    <button class="btn custom-btn btn-secondary me-2 mt-4 ms-4"
                        onClick={closeEditHotelModal}> Close </button>
                    <button class="btn custom-btn btn-primary me-2 mt-4"
                        onClick={updateHotelDetails}> Update </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default HotelDetails;