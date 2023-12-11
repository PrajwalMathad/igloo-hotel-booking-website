import axios from "axios";
const request = axios.create({
    withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_API_BASE;
export const BOOKINGS_API = `${BASE_API}/bookings`;


export const findBookingsByUser = async (user) => {
    const response = await request.get(`${BOOKINGS_API}/user/${user}`);
    return response.data;
};

export const findBookingsByHotel = async (hotelId) => {
    const response = await request.get(`${BOOKINGS_API}/hotel/${hotelId}`);
    return response.data;
};

export const getBookingStatus = async (details) => {
    const response = await request.get(`${BOOKINGS_API}/status`, {
        params: {
            ...details
        }
    });
    return response.data;
};

export const createBooking = async (details) => {
    const response = await request.post(`${BOOKINGS_API}`, details);
    return response.data;
};

export const deleteBooking = async (bookingId) => {
    const response = await request.delete(`${BOOKINGS_API}/${bookingId}`);
    return response.data;
};

