import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URl;

export const funcChangePassword = createAsyncThunk("Change_ForgotPassword", async ({ email, newPassword, Verify, IsActive, IsValidOtp }) => {
    
    let isChangePassword = localStorage.getItem("isChangePassword") === "1" ? 1 : 0;

    const response = await fetch(`${apiUrl}/auth/changePassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword, Verify, IsActive, IsValidOtp, isChangePassword })
    });

    const responseData = await response.json();
    return responseData;
});

const forgotPasswordSlice = createSlice({
    name: "ChangePassword",
    initialState: {
        data: null,
        status: null,
        isError: null
    },
    extraReducers: (builder) => {
        builder.addCase(funcChangePassword.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(funcChangePassword.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = "success";
        });
        builder.addCase(funcChangePassword.rejected, (state, action) => {
            state.isError = "reject";
        });
    }
});

export default forgotPasswordSlice.reducer;