import type { AxiosResponse } from "axios";
import { axiosClient } from "../axios-client"
import ApiEndpoints from "../../constants/ApiEndpoints";


export interface LoginObject {
    email: string,
    password: string
}

export interface RegisterObject {
    name: string,
    email: string,
    role?: string | undefined,
    password: string,
    createdAt?: string | undefined
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    accessToken: string;
    createdAt: string;
}

const login = async (payload: LoginObject): Promise<AuthUser> => {
    // const response: AxiosResponse = await axiosClient.post('/login', payload);
    const response = await axiosClient.get(ApiEndpoints.USERS);

    const users = response.data;

    const user = users?.find((user: any) => user.email === payload.email && user.password === payload.password);

    if (!user || !user.accessToken) {
        throw new Error('Invalid credentials');
    }

    localStorage.setItem('accessToken', user.accessToken);

    return user;
}

const logout = async () => {
    // await axiosClient.post('/logout');
    localStorage.removeItem('accessToken');
}

const register = async (payload: RegisterObject): Promise<AuthUser> => {
    // await axiosClient.post('/register', payload);
    const response = await axiosClient.get(ApiEndpoints.USERS);

    const users = response.data || [];

    const user = users.find((user: any) => user.email === payload.email);

    if (user) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: users.length + 1,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        password: payload.password,
        accessToken: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };

    await axiosClient.post(ApiEndpoints.USERS, newUser);

    return newUser;
}

export default { login, logout, register };