import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URL;

export const signupUser = createAsyncThunk('signupAPi', async ({name, email, password}) => {
    const response = await fetch(`${apiUrl}/auth/createUser`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({name, email, password})
    });
    const responseData = await response.text();
    const authToken = response.headers.get('Authorization');// Get the token from headers
    return {responseData, authToken};
});

const signupSlice = createSlice({
    name : "signup",
    initialState : {
        data : null,
        status : null,
        isError : null
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.authData = action.payload;
            state.status = "success";
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.isError = "reject";
        });
    }
});

export default signupSlice.reducer;