import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../Service/AuthService";
import "./index.css";
function Register() {
    const [error, setError] = useState("");
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const navigate = useNavigate();
    const signup = async () => {
        // try {
        //     await AuthService.signup(userDetails);
        navigate("/Home");
        // } catch (err) {
        //     setError(err.message);
        // }
    };
    return (
        <div className="signin-container">
            <h1 className="mb-4 welcome-line">Register for Igloo</h1>
            {error && <div>{error}</div>}
            <div className="user-form">
                <input class="form-control mb-2"
                    value={userDetails.username}
                    placeholder="User Name"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        username: e.target.value
                    })} />
                <input class="form-control mb-2"
                    value={userDetails.password}
                    placeholder="Password"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        password: e.target.value
                    })} />
                <input class="form-control mb-2"
                    value={userDetails.firstName}
                    placeholder="First Name"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        username: e.target.value
                    })} />
                <input class="form-control mb-4"
                    value={userDetails.lastName}
                    placeholder="Last Name"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        username: e.target.value
                    })} />
                <div className="signup-btn-container">
                    <button class="btn custom-btn btn-danger" onClick={signup}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Register;