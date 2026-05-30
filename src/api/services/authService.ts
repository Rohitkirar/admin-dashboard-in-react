import type { AxiosResponse } from "axios";
import { axiosClient } from "../axios-client"

interface LoginObject {
    email: string,
    password: string
}

interface AuthUser {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    createdAt: string;   
}

const login = async (payload: LoginObject): Promise<AuthUser> =>  {
    const response: AxiosResponse = await axiosClient.post('/login', payload);
    localStorage.setItem('accessToken', response.data?.accessToken);
    return response.data;
}

const logout = async () => {
    await axiosClient.post('/logout');
    localStorage.removeItem('accessToken');
}

export default { login , logout };