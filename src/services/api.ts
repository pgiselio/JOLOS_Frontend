import axios from 'axios';
import { getUserLocalStorage } from '../contexts/AuthContext/util';

export const Api = axios.create({
    baseURL: "https://ifjobs-backend.herokuapp.com/"
});

Api.interceptors.request.use(
    (config) =>{
        const user = getUserLocalStorage();
        
        config.headers = {
            Authorization: user?.token,
        };
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
) 