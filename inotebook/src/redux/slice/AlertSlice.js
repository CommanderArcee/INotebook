import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
    name: "ValidationAlert",
    initialState : {
        alert : null
    },
    reducers : {
        setAlerts : (state, action) => {
            state.alert = action.payload;
            // SetTimeout thsi type of function not used in this because this methods are async and reducer function work as sync. that's why!!
        },
        clearAlert : (state) => {
            state.alert = null;
        }
    }
});


export const {setAlerts, clearAlert} = AlertSlice.actions;
export default AlertSlice.reducer;
