import "./index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserAstronaut } from "react-icons/fa6";
function Navbar() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const toSignIn = () => {
        navigate('/Signin');
    }

    const toUserProfile = () => {
        navigate('/User')
    }
    return (
        <nav class="navbar fixed-top bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#/Home">Igloo</a>
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
                        <div className="user-name" onClick={e => { e.preventDefault(); toUserProfile() }}>
                            <FaUserAstronaut className="me-2" />
                            <div className="me-1">{currentUser.first_name}</div>
                            <div className="me-1">{currentUser.last_name}</div>
                        </div>}
                </div>
            </div>
        </nav>
    );
}
export default Navbar;