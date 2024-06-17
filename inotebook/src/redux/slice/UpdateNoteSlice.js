import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { api_url } from './GetNotesSlice';

export const updateEditNote = createAsyncThunk('updateEditNote' , async ({id, title, description}) => {
    const response = await fetch(`${api_url}/api/notes/${id}/updatenote`, {
        method : 'PUT',
        headers : {
            "Content-Type": "application/json",
            "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEwMDEsImlhdCI6MTcxODUzMDc3MH0.gcsqXijCC71hk_uKfEFys-WZMuGuBYvjOXGKwlVHT_I'
        },
        body : JSON.stringify({id, title, description})  //in string we add object/array its depends on api in which we received data from api
    });
    const responseData = await response.json();  //here we get data in json that's why we use json method.
    return responseData;
});

const editNoteSlice = createSlice({
    name : "editNote",
    initialState : {
        data : null,
        status : null,
        isError : false
    },
    reducers : {
        clearStatusMsg : (state) => {
            state.data = null;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(updateEditNote.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(updateEditNote.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = "success";
        });
        builder.addCase(updateEditNote.rejected, (state, action) => {
            state.isError = "Error";
        });
    }
});

export const {clearStatusMsg} = editNoteSlice.actions;
export default editNoteSlice.reducer;
