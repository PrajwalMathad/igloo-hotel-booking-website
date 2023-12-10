import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../Service/AuthService";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./userReducer";
import "./index.css";
function Register() {
    const [error, setError] = useState("");
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        role: ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        try {
            const data = await AuthService.signup(userDetails);
            dispatch(setCurrentUser(data));
            navigate("/Home");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="signin-container">
            <h1 className="mb-4 welcome-line">Register for Igloo</h1>
            {error && <div>{error}</div>}
            <div className="user-form">
                <input class="form-control mb-2"
                    value={userDetails.email}
                    placeholder="Email ID"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        email: e.target.value
                    })} />
                <input class="form-control mb-2"
                    value={userDetails.password}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        password: e.target.value
                    })} />
                <input class="form-control mb-2"
                    value={userDetails.first_name}
                    placeholder="First Name"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        first_name: e.target.value
                    })} />
                <input class="form-control mb-2"
                    value={userDetails.last_name}
                    placeholder="Last Name"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        last_name: e.target.value
                    })} />
                <input class="form-control mb-2"
                    value={userDetails.phone}
                    placeholder="Phone"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        phone: e.target.value
                    })} />
                <select className="form-select mb-4" onChange={(e) => setUserDetails({
                    ...userDetails,
                    role: e.target.value
                })}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="owner">owner</option>
                </select>


                {/* <input class="form-control mb-4"
                    value={userDetails.role}
                    placeholder="Role"
                    onChange={(e) => setUserDetails({
                        ...userDetails,
                        role: e.target.value
                    })} /> */}
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