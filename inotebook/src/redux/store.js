import {configureStore} from "@reduxjs/toolkit";
import getNotesReducer from "../redux/slice/GetNotesSlice";


export const store = configureStore({
    reducer : {
        getNotesReducer: getNotesReducer
    },
});