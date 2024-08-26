import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URL;

export const loginUser = createAsyncThunk('loginUser' , async ({email, password}) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({email, password})
    });
    const responseData = await response.json();
    const authToken = response.headers.get('Authorization');// Get the token from headers
    return {responseData, authToken};
    // as we know this response result shows in extra reducer's action.payload that's we return from method inside in async thunk and it call in builder so that's why we set the data 
    // in state from action.payload.
});
 
 
const LoginSlice = createSlice({
    name: "login",
    initialState : {
        authData : null,
        status : null,
        isError : null
    },
    extraReducers : (builder) => {
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