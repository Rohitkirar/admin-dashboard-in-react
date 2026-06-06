import axios from "axios";
import AppEnv from "../constants/AppEnv";
import store from "../store/store";
import { logout } from "../store/slices/authSlice";

export const axiosClient = axios.create({
    baseURL: AppEnv.API_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

axiosClient.interceptors.request.use((config) => {
    const accessToken = store.getState().auth.accessToken;
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    async (response) => response,
    async (error) =>  {
        if(error.response?.status === 401){
            store.dispatch(logout());
            window.location.href = '/login';
            // need to show toast message of session expired and login again.
        }else if(error.response?.status !== 422){
            //something went wrong toast message.
        }
        return Promise.reject(error);
    }
);