import * as AuthService from "../Service/AuthService";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";
function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const signin = async () => {
        // const data = await AuthService.signin(credentials);
        navigate("/Home");
        // if(data) {
        //     navigate("/Home");
        // } else {
        //     setError("Incorrect credentials. Unable to Login.");
        // }
    };
    return (
        <div className="signin-container">
            <h1 className="mb-4 welcome-line">Welcome to Igloo</h1>
            <div className="user-form">
                <input class="form-control mb-2" value={credentials.username} placeholder="User Name"
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                <input class="form-control mb-4" value={credentials.password} placeholder="Password"
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <div className="red-color mb-4">{error ? error : ""}</div>
                <div className="signup-btn-container">
                    <button class="btn custom-btn btn-secondary me-4" onClick={signin}> Sign In </button>
                    <Link to={`/Register`}><button class="btn custom-btn btn-secondary"> Register </button></Link>
                </div>
            </div>
        </div>
    );
}
export default Signin;

