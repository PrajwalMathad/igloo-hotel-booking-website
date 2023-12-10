import "./index.css";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../Service/AuthService";
import { FaUserAstronaut } from "react-icons/fa6";
import { BiSolidHotel } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../Users/userReducer";

function Navbar() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const dispatch = useDispatch();
    const toSignIn = () => {
        navigate('/Signin');
    }

    const signout = async () => {
        try {
            const data = await AuthService.signout();
            if (data) {
                dispatch(setCurrentUser(null));
                navigate("/Signin");
            } else {
            }
        } catch (e) {

        }
    }

    const toUserProfile = () => {
        navigate('/User')
    }
    return (
        <nav class="navbar fixed-top bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#/Home">
                    <BiSolidHotel className="me-2"/>
                    Igloo - Hotel Bookings Made Easy!</a>
                <div class="navbar-collapse" id="navbarNav">
                    <div class="navbar-nav">
                        {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                    </div>
                    {!currentUser &&
                        <div>
                            <span class="signin-link me-2" onClick={e => { e.preventDefault(); toSignIn() }}> SignIn </span>
                            <span class="signin-link me-4"> Register </span>
                        </div>}
                    {currentUser && currentUser.email &&
                        <div>
                            <div className="user-name" onClick={e => { e.preventDefault(); toUserProfile() }}>
                                <FaUserAstronaut className="me-2" />
                                <div className="me-1">{currentUser.first_name}</div>
                                <div className="me-1">{currentUser.last_name}</div>
                            </div>
                            <div className="signin-link float-end" onClick={e => { e.preventDefault(); signout(); }}>Signout</div>
                        </div>}
                </div>
            </div>
        </nav>
    );
}
export default Navbar;