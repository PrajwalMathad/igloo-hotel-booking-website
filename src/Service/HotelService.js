import axios from "axios";
const request = axios.create({
    withCredentials: true,
});

export const findAllHotels = async () => {
    const response = await request.get(`http://localhost:4000/api/hotels`);
    return response.data;
};

export const findHotelsByCity = async (city) => {
    const response = await request.get(`http://localhost:4000/api/hotels/${city}`);
    return response.data;
};

