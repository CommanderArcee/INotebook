import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { apiService } from '../../Services/ApiService';

// we can createasyncthunk is a action becasue with api we get data and where we can get data that was a action.
export const addNotes = createAsyncThunk('addNotes', async ({title, description, noteTag}) =>{
    const response = await apiService.post('/notes/createnotes', 
        {title, description, noteTag},   // This is the data (body of the request)
        {
        headers:{
            "auth-token": localStorage.getItem('token')
        }
    });
    
    return response.data;
})


const createNewNoteSlice = createSlice({
    name : "addNewNote",
    initialState : {
        isLoading : false,
        data : null,
        isError : false
    },
    reducers :  {
        clearDataMsgAfterSavedRecord : (state) => {
            state.data = null;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(addNotes.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addNotes.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(addNotes.rejected, (state, action) => {
            state.isError = true;
        });
    }
});


export const {clearDataMsgAfterSavedRecord} = createNewNoteSlice.actions;
export default createNewNoteSlice.reducer;
