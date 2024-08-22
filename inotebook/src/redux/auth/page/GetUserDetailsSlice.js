import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URl;

export const getLoggedInUserDetails = createAsyncThunk('GetUserDetails' , async () => {
    const response = await fetch(`${apiUrl}/auth/getuser`, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Auth-Token" : localStorage.getItem('token')
        }
    });
    const responseData = await response.json();
    return responseData;
});
 
 
const LoggedInUserDetailSlice = createSlice({
    name: "loggedInUserDetail",
    initialState : {
        userData : null,
        status : null,
        isError : null
    },
    extraReducers : (builder) => {
        builder.addCase(getLoggedInUserDetails.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(getLoggedInUserDetails.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.status = "success";
        });
        builder.addCase(getLoggedInUserDetails.rejected, (state, action) => {
            state.isError = "reject";
        });
    }
});

export default LoggedInUserDetailSlice.reducer;