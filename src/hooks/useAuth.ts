import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store";
import authService from "../api/services/authService";
import { login, logout } from "../store/slices/authSlice";

const useAuth = () => {

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    const loginUser = async (email: string, password: string) => {
        const authUser = await authService.login({email, password});
        dispatch(login(authUser));
    }
    
    const logoutUser = async () => {
        await authService.logout();
        dispatch(logout());
    }
    
    return {
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        loginUser,
        logoutUser,
    }
}