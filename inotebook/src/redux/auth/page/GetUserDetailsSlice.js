import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../../Services/ApiService";

export const getLoggedInUserDetails = createAsyncThunk('GetUserDetails' , async () => {
    const response = await apiService.get('/auth/getuser', {
        headers:{
            "auth-token": localStorage.getItem('token')
        }
    });

    // In axios we receive responses from api in Data key. Its required to return this.
    return response.data;
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