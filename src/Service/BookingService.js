import axios from "axios";
const request = axios.create({
    withCredentials: true,
});
export const BASE_API = "http://localhost:4000/api";
export const BOOKINGS_API = `${BASE_API}/bookings`;


export const findBookingsByUser = async (user) => {
    const response = await request.get(`${BOOKINGS_API}/user/${user}`);
    return response.data;
};

export const getBookingStatus = async (details) => {
    const response = await request.get(`${BOOKINGS_API}/status`, details);
    return response.data;
};

export const createBooking = async (details) => {
    const response = await request.post(`${BOOKINGS_API}`, details);
    return response.data;
};

