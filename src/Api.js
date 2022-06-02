import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
        baseURL: "https://pure-anchorage-21759.herokuapp.com/api/",
    });





export default instance;
