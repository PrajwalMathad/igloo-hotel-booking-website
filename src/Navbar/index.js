import "./index.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Navbar() {
    return (
        <nav class="navbar fixed-top bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#/Home">Igloo</a>
                <div class="navbar-collapse" id="navbarNav">
                    <div class="navbar-nav">
                        {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                    </div>
                    <div>
                        <span class="signin-link me-2"> SignIn </span>
                        <span class="signin-link me-4"> Register </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;