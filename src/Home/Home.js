import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import store from "../store";
import { Provider } from "react-redux";
import WIP from "../WIP";
import "./index.css";
function Home() {
    return (
        <Provider store={store}>
            <div className="row outer-container">
                Navigation component
                <div className="col second-container">
                    <Routes>
                        <Route path="/" element={<WIP />} />
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}
export default Home;

