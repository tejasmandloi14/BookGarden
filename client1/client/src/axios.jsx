import axios from "axios";
import { newtoken } from "./components/Login";
const API = axios.create({
    baseURL:'http://localhost:3000',
    headers:{
        'Content-Type':'application/json'
    }
});

API.interceptors.request.use(
    config=>{
        config.headers.authorization=`bearer ${newtoken}`;
        // console.log(newtoken)
        return config;
        },
        error=>{
            return Promise.reject(error);
        }
);



export default API;