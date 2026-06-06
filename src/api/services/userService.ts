import { axiosClient } from "../axios-client";
import ApiEndpoints from "../../constants/ApiEndpoints";
import type { User } from "../../store/slices/userSlice";
import type { RegisterObject } from "./authService";

const getUsers = async () => {
    const response = await axiosClient.get(ApiEndpoints.USERS);
    return response.data;
}

const getUser = async (id: number) => {
    const response = await axiosClient.get(`${ApiEndpoints.USERS}/${id}`);
    return response.data;
}

const createUser = async (payload: RegisterObject) => {
    payload.role = 'user';
    payload.createdAt = new Date().toISOString();
    const response = await axiosClient.post(ApiEndpoints.USERS, payload);
    return response.data;
}

const updateUser = async (user: User) => {
    const response = await axiosClient.put(ApiEndpoints.USERS, user);
    return response.data;
}

const deleteUser = async (id: number) => {
    const response = await axiosClient.delete(`${ApiEndpoints.USERS}/${id}`);
    return response.status === 200 ? true : false;
}

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};