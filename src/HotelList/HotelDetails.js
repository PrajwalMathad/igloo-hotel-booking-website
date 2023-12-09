import "./index.css";
import { useSelector, useDispatch } from "react-redux";

function HotelDetails() {
    const hotel = useSelector((state) => state.hotelListReducer.hotel);
    const dispatch = useDispatch();

    return(
        <div className="hotel-details-container">
            {hotel.name}
        </div>
    )
}
export default HotelDetails;