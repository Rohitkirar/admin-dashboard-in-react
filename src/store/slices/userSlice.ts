import { createSlice } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    email: string;
    role?: string | undefined;
    createdAt: string;
}

interface UserInitialStateType {
    users: User[];
    user: User | null;
}

const initialState: UserInitialStateType = {
    users: [],
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        update: (state, action) => {
            state.users = state.users.map((user: User) => user.id === action.payload.id ? action.payload : user);
            state.user = action.payload;
        },
    },
});

export const { setUsers, setUser, update } = userSlice.actions;

export default userSlice.reducer;