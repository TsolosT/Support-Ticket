import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { extractErrorMessage } from '../../utils/errorHandler';


// Get User from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = { 
    user: user ? user : null,
    isLoading: false
};
// Register new user
export const register = createAsyncThunk(
    'auth/register', 
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);
// Login existing user
export const login = createAsyncThunk(
    'auth/login', 
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);
// Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout();
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
