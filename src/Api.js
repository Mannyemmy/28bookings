import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
        baseURL: `https://api.28bookings.com/api/`,
    });





export default instance;
