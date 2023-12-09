import "./index.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function Navbar() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const toSignIn = () => {
        navigate('/Signin');
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
                        <div>
                            {currentUser.first_name}
                        </div>}
                </div>
            </div>
        </nav>
    );
}
export default Navbar;