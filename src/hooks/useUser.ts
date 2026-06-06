import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import userService from "../api/services/userService";
import type { User } from "../store/slices/userSlice";
import { setUsers, setUser, update } from "../store/slices/userSlice";
import type { RegisterObject } from "../api/services/authService";

export const useUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    const getUsers = async () => {
        const users = await userService.getUsers();
        dispatch(setUsers(users));
    }

    const getUser = async (id: number) => {
        const user = await userService.getUser(id);
        dispatch(setUser(user));
    }

    const createUser = async (payload: RegisterObject) => {
        await userService.createUser(payload);
        try {
            await getUsers();
        } catch {
            // best-effort refresh — user was already created successfully
        }
    }

    const updateUser = async (user: User) => {
        const updatedUser = await userService.updateUser(user);
        dispatch(update(updatedUser));
    }

    const deleteUser = async (id: number) => {
        await userService.deleteUser(id);
        dispatch(setUsers(user.users.filter((user: User) => user.id !== id)));
    }

    return {
        users: user.users,
        user: user.user,
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
    }
}