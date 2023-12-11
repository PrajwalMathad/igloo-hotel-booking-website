import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setHotel } from "./hotelListReducer";
import { useNavigate } from "react-router-dom";
import * as HotelService from "../Service/HotelService";
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import { setHotelList, setFullHotelList } from "../HotelList/hotelListReducer";

function HotelList(props) {
    const hotelList = useSelector((state) => state.hotelListReducer.hotelList);
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    let i = 0;

    const closeAddHotelModal = () => setShowAddModal(false);
    const showAddHotelModal = () => setShowAddModal(true);

    const toggleShowToast = () => setShowToast(true);
    const [newHotel, setNewHotel] = useState({
        "hotel_id": "",
        "name": "",
        "description": "",
        "amenities": [
            "Pool",
            "Spa",
            "Gym"
        ],
        "location": {
            "street": "",
            "city": "",
            "state": ""
        },
        "price": 0,
        "total_rooms": 0,
        "owner": ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectHotel = (hotel) => {
        dispatch(setHotel(hotel));
        navigate(`/Hotel/${hotel.hotel_id}`);
    }

    const addNewHotel = async () => {
        try {
            await HotelService.createHotel(newHotel);
            dispatch(setHotel(newHotel));
            fetchHotels();
        } catch (err) {
        }
    }

    const fetchHotels = async () => {
        try {
            const hotelList = await HotelService.findAllHotels();
            dispatch(setHotelList(hotelList));
            dispatch(setFullHotelList(hotelList));
            closeAddHotelModal();
            toggleShowToast();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="wrapper">
            {currentUser && currentUser.role === "admin" &&
                <div className="add-hotel-container">
                    <button class="btn custom-btn btn-primary m-4 float-end"
                        onClick={showAddHotelModal}> Add Hotel </button>
                </div>
            }
            <div className="hotel-list-container">
                {hotelList.length === 0 ?
                    <div className="no-hotels-container">
                        No hotels in this city!
                    </div> :
                    hotelList.map(hotel => {
                        if (i < 8) {
                            i++;
                        } else {
                            i = 0;
                        }
                        return (
                            <div className="hotel-card mb-3 me-3" onClick={(e) => { e.preventDefault(); selectHotel(hotel) }}>
                                <div><img className="hotel-picture" alt="text"
                                    src={require(`../assets/${'H00' + i}.avif`)} /></div>
                                <div className="hotel-details">
                                    <div className="hotel-name">{hotel.name}</div>
                                    <div className="hotel-location">{hotel.location.city}, {hotel.location.state}</div>
                                    <div className="hotel-price mt-2">${hotel.price} </div>
                                    <div style={{ fontSize: "0.8em" }}>per night</div>
                                    <span style={{ fontSize: "0.8em" }}>includes taxes and fees</span>
                                </div>
                            </div>)
                    })
                }
            </div>
            <Row>
                <Col md={4}></Col>
                <Col md={5} className="mb-2">
                    <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Confirmation</strong>
                        </Toast.Header>
                        <Toast.Body>New hotel is added.</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <Modal show={showAddModal} onHide={closeAddHotelModal} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Hotel Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="label" for="hotelName">Hotel Name</label>
                    <input id="hotelName" class="form-control mb-2" value={newHotel.name} placeholder="Hotel Name"
                        onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })} />
                    <label className="label" for="description">Description</label>
                    <input id="description" class="form-control mb-2" value={newHotel.description} placeholder="Description"
                        onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })} />
                    <label className="label" for="price">Price</label>
                    <input id="price" class="form-control mb-2" value={newHotel.price} placeholder="Price"
                        type="number"
                        onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })} />
                    <label className="label" for="noofrooms">Number of rooms</label>
                    <input id="noofrooms" class="form-control mb-2" value={newHotel.total_rooms} placeholder="Number of rooms"
                        type="number"
                        onChange={(e) => setNewHotel({ ...newHotel, total_rooms: e.target.value })} />

                    <label className="label" for="street">Location</label>
                    <div className="display-flex mb-2">
                        {/* <label className="label" for="street">Street Name</label> */}
                        <input id="street" class="form-control me-2" value={newHotel.location.street} placeholder="Street"
                            onChange={(e) => setNewHotel(
                                {
                                    ...newHotel,
                                    location: {
                                        ...newHotel.location,
                                        street: e.target.value
                                    }
                                }
                            )} />
                        {/* <label className="label" for="city">City</label> */}
                        <input id="city" class="form-control me-2" value={newHotel.location.city} placeholder="City"
                            onChange={(e) => setNewHotel(
                                {
                                    ...newHotel,
                                    location: {
                                        ...newHotel.location,
                                        city: e.target.value
                                    }
                                })} />
                        {/* <label className="label" for="state">Number of rooms</label> */}
                        <input id="state" class="form-control" value={newHotel.location.state} placeholder="State"
                            onChange={(e) => setNewHotel(
                                {
                                    ...newHotel,
                                    location: {
                                        ...newHotel.location,
                                        state: e.target.value
                                    }
                                })} />
                    </div>
                    <label className="label" for="owner">Owner</label>
                    <input id="owner" class="form-control mb-2" value={newHotel.owner} placeholder="Owner"
                        onChange={(e) => setNewHotel({ ...newHotel, owner: e.target.value })} />
                </Modal.Body>
                <Modal.Footer>
                    <button class="btn custom-btn btn-secondary me-2 mt-4 ms-4"
                        onClick={closeAddHotelModal}> Close </button>
                    <button class="btn custom-btn btn-primary me-2 mt-4"
                        onClick={addNewHotel}> Add </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default HotelList;