import "./index.css";
import { FaStar } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import image from "../assets/hotel-1.avif"
import { setHotel } from "./hotelListReducer";
import { useNavigate } from "react-router-dom";
function HotelList() {
    const hotelList = useSelector((state) => state.hotelListReducer.hotelList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectHotel = (hotel) => {
        dispatch(setHotel(hotel));
        navigate(`/Hotel/${hotel.hotel_id}`);
    }

    return (
        <div className="hotel-list-container">
            {
                hotelList.map(hotel => {
                    return (
                        <div className="hotel-card mb-3 me-3" onClick={(e) => { e.preventDefault(); selectHotel(hotel) }}>
                            <div><img className="hotel-picture" alt="text" src={image} /></div>
                            <div className="hotel-details">
                                <div className="hotel-name">{hotel.name}</div>
                                <div className="hotel-location">{hotel.location.city}, {hotel.location.state}</div>
                                <div className="hotel-rating mt-1">4.4<FaStar className="ms-1 mt-1" /></div>
                                <div className="hotel-price mt-2">${hotel.price} </div>
                                <div style={{ fontSize: "0.8em" }}>per night</div>
                                <span style={{ fontSize: "0.8em" }}>includes taxes and fees</span>
                            </div>
                        </div>)
                })
            }
            {hotelList.length === 0 &&
                <div className="no-hotels-container">
                    No hotels in this city!
                </div>}
        </div>
    )
}

export default HotelList;