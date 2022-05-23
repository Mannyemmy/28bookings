import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
        baseURL: process.env.BASE_URL || "http://localhost:8000/api/",
    });





export default instance;
