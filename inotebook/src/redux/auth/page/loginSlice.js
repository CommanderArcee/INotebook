import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../../Services/ApiService";

export const loginUser = createAsyncThunk('loginUser', async ({ email, password }) => {
    const response = await apiService.post('auth/login',
        { email, password }   // This is the data (body of the request), and no header required in this.
    );
    return {data : response.data, headerAuthToken : response.headers.authorization};
    // As we know this response result shows in extra reducer's action.payload that's we return from method inside in async thunk and it call in builder so that's why we set the 
    // data in state from action.payload.
});


const LoginSlice = createSlice({
    name: "login",
    initialState: {
        authData: null,
        status: null,
        isError: null
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.authData = action.payload;
            state.status = "success";
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isError = "reject";
        });
    }
});

export default LoginSlice.reducer;