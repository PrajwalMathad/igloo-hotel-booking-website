import axios from "axios";
const request = axios.create({
    withCredentials: true,
});
export const BASE_API = "http://localhost:4000/api";
export const REVIEWS_API = `${BASE_API}/reviews`;


export const getAvgHotelRating = async (hotelId) => {
    const response = await request.get(`${REVIEWS_API}/rating/${hotelId}`);
    return response.data;
};


