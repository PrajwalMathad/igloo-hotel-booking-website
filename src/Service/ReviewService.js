import axios from "axios";
const request = axios.create({
    withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_API_BASE;
export const REVIEWS_API = `${BASE_API}/reviews`;


export const getAvgHotelRating = async (hotelId) => {
    const response = await request.get(`${REVIEWS_API}/rating/${hotelId}`);
    return response.data;
};

export const findReviewsByHotel = async (hotelId) => {
    const response = await request.get(`${REVIEWS_API}/hotel/${hotelId}`);
    return response.data;
};

