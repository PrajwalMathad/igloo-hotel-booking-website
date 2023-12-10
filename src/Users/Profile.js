import "./index.css";
import { useSelector } from "react-redux";
function Profile() {
    const selectedUser = useSelector((state) => state.userReducer.selectedUser);
    return (
        <div className="account-container">
            <h3 style={{ color: "#ffa546" }}>Account</h3>
            <div>
                <div className="display-flex">
                    <div className="label me-2">First Name:</div>
                    <div>{selectedUser.first_name}</div>
                </div>
                <div className="display-flex">
                    <div className="label me-2">Last Name:</div>
                    <div>{selectedUser.last_name}</div>
                </div>
                <div className="display-flex">
                    <div className="label me-2">Favourite hotels:</div>
                    <div>
                        {selectedUser.favourite_hotels.map(hotel => {
                            return (
                                <div>{hotel}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;