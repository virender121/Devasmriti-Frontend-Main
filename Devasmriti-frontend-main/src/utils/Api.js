import api from "../config/backend";
import axios from 'axios';
const token = localStorage.getItem("token")
// console.log(token)

// ${api}

const instance = axios.create({
    baseURL: `${api}/`,
    headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

export const noauthinstance = axios.create({
    baseURL: `${api}/`,
    headers: {
        'Accept': 'application/json',
    },
});



export default instance;
