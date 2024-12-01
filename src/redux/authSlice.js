import { createSlice } from "@reduxjs/toolkit";

// Function to load user and token from localStorage
const loadAuthFromLocalStorage = () => {
    try {
        const serializedUser = localStorage.getItem("user");
        const serializedToken = localStorage.getItem("token");
        return {
            user: serializedUser ? JSON.parse(serializedUser) : null,
            token: serializedToken || null,
        };
    } catch (error) {
        console.error("Error loading auth data from localStorage:", error);
        return { user: null, token: null }; // Fallback to default state
    }
};

// Initial state
const initialState = loadAuthFromLocalStorage();

// Create the Redux slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Set the user object
            localStorage.setItem("user", JSON.stringify(state.user)); // Save user to localStorage
        },
        setToken: (state, action) => {
            state.token = action.payload; // Set the token
            localStorage.setItem("token", state.token); // Save token to localStorage
        },
        logOut: (state) => {
            state.user = null; // Clear the user state
            state.token = null; // Clear the token state
            localStorage.removeItem("user"); // Remove user from localStorage
            localStorage.removeItem("token"); // Remove token from localStorage
        },
    },
});

// Export actions and reducer
export const { setUser, setToken, logOut } = authSlice.actions;
export default authSlice.reducer;
