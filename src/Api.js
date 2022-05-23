import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
        baseURL: 'http://127.0.0.1:8000/api/'
    });





export default instance;
