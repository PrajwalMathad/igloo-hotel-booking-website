import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
function Account() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };

    const save = async () => {
        await client.updateUser(account);
    };

    const signout = async () => {
        await client.signout();
        navigate("/Signin");
    };

    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }

    }, []);

    return (
        <div>
            <div className="page-title ms-4 mt-4" style={{ width: "40%" }}>
                Account
                <Link style={{ float: "right" }} to="/Kanbas/Users" className="btn btn-warning">
                    Users
                </Link>
                <hr />
            </div>
            {account && (
                <div className="user-form">
                    <input value={account.password} class="form-control mb-2"
                        placeholder="Password"
                        onChange={(e) => setAccount({
                            ...account,
                            password: e.target.value
                        })} />
                    <input value={account.firstName} class="form-control mb-2"
                        placeholder="First Name"
                        onChange={(e) => setAccount({
                            ...account,
                            firstName: e.target.value
                        })} />
                    <input value={account.lastName} class="form-control mb-2"
                        placeholder="Last Name"
                        onChange={(e) => setAccount({
                            ...account,
                            lastName: e.target.value
                        })} />
                    <input value={account.dob} class="form-control mb-2"
                        placeholder="Date Of Birth"
                        onChange={(e) => setAccount({
                            ...account,
                            dob: e.target.value
                        })} />
                    <input value={account.email} class="form-control mb-2"
                        placeholder="Email"
                        onChange={(e) => setAccount({
                            ...account,
                            email: e.target.value
                        })} />
                    <select value={account.role} class="custom-select mb-2"
                        onChange={(e) => setAccount({
                            ...account,
                            role: e.target.value
                        })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <div className="signup-btn-container mb-2 mt-3">
                        <button class="btn custom-btn btn-secondary me-4" onClick={save}>
                            Save
                        </button>
                        <button class="btn custom-btn btn-danger me-4" onClick={signout}>
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Account;