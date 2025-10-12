import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string;
    email: string;
    type: string;
};

const initialState: { user: User | null; wasLoggedOut: boolean } = {
    user: null,
    wasLoggedOut: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.wasLoggedOut = true;
        },
        resetWasLoggedOut: (state) => {
            state.wasLoggedOut = false;
        },
    },
});

export const { setUser, logout, resetWasLoggedOut } = authSlice.actions;
export default authSlice.reducer;
