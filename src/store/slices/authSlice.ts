import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: number;
    name?: string;
    email: string;
    role?: string | undefined;
    accessToken: string;
    createdAt: string;
};

interface AuthInitialStateType {
    user: User | null,
    accessToken: string,
    isAuthenticated: boolean,
}

const initialState: AuthInitialStateType = {
    user: null,
    accessToken: localStorage.getItem('accessToken') ?? '',
    isAuthenticated: localStorage.getItem('accessToken') ? true : false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.user = actions.payload.user;
            state.accessToken = actions.payload.accessToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = '';
            state.isAuthenticated = false;
        },
        register: (state, actions) => {
            state.user = actions.payload.user;
            state.accessToken = actions.payload.accessToken;
            state.isAuthenticated = true;
        }
    }
})
export const {
    login,
    logout,
    register
} = authSlice.actions;

export default authSlice.reducer;
