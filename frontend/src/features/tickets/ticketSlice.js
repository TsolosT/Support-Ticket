import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService';
import { extractErrorMessage } from '../../utils/errorHandler';

const initialState = {
    tickets: null,
    ticket: null,
};

// Create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create', 
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // fetch token
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);

// Get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll', 
    //Dont need any arg only thunkAPI with _ can access it
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // fetch token
            return await ticketService.getTickets(token);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);

// Get user ticket
export const getTicket = createAsyncThunk(
    'tickets/get', 
    //Dont need any arg only thunkAPI with _ can access it
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // fetch token
            return await ticketService.getTicket(ticketId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);

// Close user ticket
export const closeTicket = createAsyncThunk(
    'tickets/close', 
    //Dont need any arg only thunkAPI with _ can access it
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // fetch token
            return await ticketService.closeTicket(ticketId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);


export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) =>{
                state.ticket = null;
            })
            .addCase(getTickets.fulfilled, (state, action) =>{
                state.tickets = action.payload;
            })
            .addCase(getTicket.fulfilled, (state, action) =>{
                state.ticket = action.payload;
            })
            .addCase(closeTicket.fulfilled, (state, action) =>{;
                state.tickets.map((ticket) => 
                    ticket._id === action.payload
                    ?  (ticket.status = 'closed')
                    : ticket
                );
            })
    }
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;