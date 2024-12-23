import { createSlice } from '@reduxjs/toolkit';

// Function to get the token from cookies
const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});
    return cookies.accessToken || null; // Use accessToken instead of token
};

// function to get user data from local storage if available 

const getUserDataFromLocal = () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null;
}

// Initial state
const initialState = {
    user: getUserDataFromLocal(),
    loading: false,
    error: null,
    isAuthenticated: !!getTokenFromCookie(), // Check if accessToken exists
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("user")
            document.cookie = 'accessToken=; Max-Age=0 path=/'; // Clear the token cookie
            document.cookie = 'refreshToken=; Max-Age=0 path=/'; // Clear the token cookie
        },
    },
});

// Export actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
