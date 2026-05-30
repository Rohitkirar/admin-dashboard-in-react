import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: number;
    name?: string;
    email: string;
};

interface AuthInitialState {
    user: User | null,
    accessToken: string,
    isAuthenticated: boolean,
}

const initialState: AuthInitialState = {
    user: null,
    accessToken: localStorage.getItem('accessToken') ?? '',
    isAuthenticated: !!localStorage.getItem('accessToken')
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.user = actions.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})
export const {
    login,
    logout
} = authSlice.actions;

export default authSlice.reducer;
