import axios from "axios";

export const apiService = axios.create({
    baseURL : `http://localhost:5000/api`,
    headers : {
        'Content-Type': 'application/json',
    }
})

//const baseAPIUrl = `http://localhost:${process.env.PORT}/api`;
