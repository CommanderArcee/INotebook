import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const apiUrl = process.env.REACT_APP_API_URl;


// we can createasyncthunk is a action becasue with api we get data and where we can get data that was a action.
export const addNotes = createAsyncThunk('addNotes', async ({title, description}) =>{
    const response = await fetch(`${apiUrl}/notes/createnotes`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description})
    });
    
    // by text() method which is used with response. So we send text in response from backend.
    const responseData = await response.text();
    return responseData;
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
