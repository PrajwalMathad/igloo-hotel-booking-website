import * as AuthService from "../Service/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./userReducer";
import { useDispatch } from "react-redux";
import "./index.css";
function Signin() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signin = async () => {
        try {
            const data = await AuthService.signin(credentials);
            if (data) {
                dispatch(setCurrentUser(data));
                navigate("/Home");
            } else {
                setError("Incorrect credentials. Unable to Login.");
            }
        } catch(e) {

        }
    };

    const register = () => {
        navigate("/Register")
    }
    return (
        <div className="signin-container">
            <h1 className="mb-4 welcome-line">Welcome to Igloo</h1>
            <div className="user-form">
                <input class="form-control mb-2" value={credentials.email} placeholder="User Name"
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                <input class="form-control mb-4" value={credentials.password} placeholder="Password"
                    type="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <div className="red-color mb-4">{error ? error : ""}</div>
                <div className="signup-btn-container">
                    <button class="btn custom-btn btn-secondary me-4" onClick={signin}> Sign In </button>
                    <button class="btn custom-btn btn-secondary" onClick={register}> Register </button>
                </div>
            </div>
        </div>
    );
}
export default Signin;

