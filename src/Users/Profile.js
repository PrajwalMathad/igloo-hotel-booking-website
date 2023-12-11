import { useEffect, useState } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHotel } from "../HotelList/hotelListReducer";
import image from "../assets/hotel-1.avif"
function Profile() {
    const selectedUser = useSelector((state) => state.userReducer.selectedUser);
    const fullHotelList = useSelector((state) => state.hotelListReducer.fullHotelList);
    const [favouriteHotels, setFavouriteHotels] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mapHotelsToFavs = () => {
        const modifiedData = selectedUser.favourite_hotels.map(fav => {
            const hotel = fullHotelList.find(hotel => hotel.hotel_id === fav);
            return { ...hotel };
        })
        setFavouriteHotels(modifiedData);
    }

    useEffect(() => {
        mapHotelsToFavs();
    }, [])

    return (
        <div className="profile-container">
            <h2 style={{ color: "#ffa546" }}>Profile</h2>
            <div>
                <div>
                    <div className="profile-name">{selectedUser.first_name} {selectedUser.last_name}</div>
                </div>
                <div >
                    <h4 className="label me-2 mt-2">Favourite hotels:</h4>
                    <div className="fav-container">
                        {favouriteHotels.length > 0 && favouriteHotels.map(hotel => {
                            return (
                                <div className="fav-hotel-card mb-3 me-3"
                                    onClick={e => {
                                        e.preventDefault();
                                        dispatch(setHotel(hotel));
                                        navigate(`/Hotel/${hotel.hotel_id}`)
                                    }}>
                                    <div style={{ width: "50%" }}>
                                        <img className="hotel-picture" alt="text" src={image} />
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div className="fav-hotel-name ms-3 me-3">{hotel.name}</div>
                                        <div className="fav-hotel-location ms-3 me-3">{hotel.location.street}, {hotel.location.city}, {hotel.location.state}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;