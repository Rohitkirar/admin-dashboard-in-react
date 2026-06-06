import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store";
import authService, { type RegisterObject } from "../api/services/authService";
import { login, logout, register } from "../store/slices/authSlice";

export const useAuth = () => {

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    const loginUser = async (email: string, password: string) => {
        const authUser = await authService.login({ email, password });
        dispatch(login({ user: authUser }));
    }

    const logoutUser = async () => {
        await authService.logout();
        dispatch(logout());
    }

    const registerUser = async ({ name, email, password }: RegisterObject) => {
        const authUser = await authService.register({ name, email, password, role: 'user' });
        dispatch(register({ user: authUser }));
    }

    return {
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        loginUser,
        logoutUser,
        registerUser,
    }
}