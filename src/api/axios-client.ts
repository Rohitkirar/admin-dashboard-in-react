import axios from "axios";

export const axiosClient = axios.create({
    baseURL: '/',
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    async (response) => response,
    async (error) =>  {
        if(error.response?.status === 401){
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            // need to show toast message of session expired and login again.
        }else if(error.response?.status !== 422){
            //something went wrong toast message.
        }
        return Promise.reject(error);
    }
);