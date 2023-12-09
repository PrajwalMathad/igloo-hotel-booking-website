import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill }
    from "react-icons/bs";
import * as client from "./client";
import { Link } from "react-router-dom";
import "./index.css";
function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });

    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);
    return (
        <div>
            <div className="page-title ms-4 mt-4">
                Users
                <hr />
            </div>
            <div className="user-table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <td style={{ display: "flex" }}>
                                <input class="form-control me-2" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                <input class="form-control me-2" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            </td>
                            <td>
                                <input class="form-control" placeholder="First Name" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                            </td>
                            <td>
                                <input class="form-control" placeholder="Last Name" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                            </td>
                            <td>
                                <select className="custom-select" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="FACULTY">Faculty</option>
                                    <option value="STUDENT">Student</option>
                                </select>
                            </td>
                            <td>
                                <BsPlusCircleFill className="me-2 text-success fs-3 text mb-1" onClick={createUser} />
                                <BsFillCheckCircleFill onClick={updateUser}
                                    className="me-2 text-success fs-3 text mb-1" />
                            </td>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <Link to={`/Kanbas/Account/${user._id}`}>{user.username}</Link>
                                </td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                </td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => selectUser(user)}>
                                        <BsPencil />
                                    </button>
                                    <button className="btn btn-danger me-2" onClick={() => deleteUser(user)}>
                                        <BsTrash3Fill />
                                    </button>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UserTable;