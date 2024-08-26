import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URl;

export const otpSendMail = createAsyncThunk('OtpwithSendMail' , async ({userEmail}) => {
    const response = await fetch(`${apiUrl}/otp/otpSendMail`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({userEmail})
    });
    const responseData = await response.json();
    return responseData;
});

export const funcVerifyOtp = createAsyncThunk('funcVerifyOtp' , async ({userEmail, userEnteredOtp, currentDateTimeOfOtp}) => {
    const response = await fetch(`${apiUrl}/otp/verifyOtp`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({userEmail, userEnteredOtp, currentDateTimeOfOtp})
    });
    const responseData = await response.json();
    return responseData;
});

const OtpSlice = createSlice({
    name: "Otp",
    initialState : {
        data : null,
        status : null,
        isError : null,
        verifyData : null,
        verifyStatus : null,
        verifyIsError : null,
    },
    reducers : {
        clearDataErrorMsg : (state) => {
            state.data = null;
        },
        clearVerifyDataErrorMsg : (state) => {
            state.verifyData = null
        }
    },
    extraReducers : (builder) => {
        builder.addCase(otpSendMail.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(otpSendMail.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = "success";
        });
        builder.addCase(otpSendMail.rejected, (state, action) => {
            state.isError = "reject";
        });

        //VerifyOtp
        builder.addCase(funcVerifyOtp.pending, (state, action) => {
            state.verifyStatus = "pending";
        });
        builder.addCase(funcVerifyOtp.fulfilled, (state, action) => {
            state.verifyData = action.payload;
            state.verifyStatus = "success";
        });
        builder.addCase(funcVerifyOtp.rejected, (state, action) => {
            state.verifyIsError = "reject";
        });
    }
});

export let {clearDataErrorMsg, clearVerifyDataErrorMsg} = OtpSlice.actions;
export default OtpSlice.reducer;