import axios from "axios";
const request = axios.create({
    withCredentials: true,
});
export const BASE_API = "http://localhost:4000/api";
export const HOTELS_API = `${BASE_API}/hotels`;

export const findAllHotels = async () => {
    const response = await request.get(`${HOTELS_API}`);
    return response.data;
};

export const findHotelsByCity = async (city) => {
    const response = await request.get(`${HOTELS_API}/city/${city}`);
    return response.data;
};

export const findHotelsByOwner = async (owner) => {
    const response = await request.get(`${HOTELS_API}/owner/${owner}`);
    return response.data;
};

export const findHotelById = async (id) => {
    const response = await request.get(`${HOTELS_API}/${id}`);
    return response.data;
};

export const updateHotel = async (details) => {
    const response = await request.put(`${HOTELS_API}/${details.hotel_id}`, details);
    return response.data;
};
