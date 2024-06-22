import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const apiUrl = process.env.REACT_APP_API_URl;


// we can createasyncthunk is a action becasue with api we get data and where we can get data that was a action.
export const funcDeleteNote = createAsyncThunk('funcDeleteNote', async (id) =>{
    const response = await fetch(`${apiUrl}/notes/${id}/deletenote`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        // Here we do not use body because we want only delete data which we get done by Id. More E
    });

    // by text() method which is used with response. we send text in response from backend. Here we use text method because we send text in response.
    const responseData = await response.text();
    return responseData;
});
// why we give body and what the use of body?
/*
-> Body means we send data with the request which we need to add/update that why's we use this or some time we get data on the basis of few data so, also use this tbhi
body mei data ata hai or backend mei humei req.body se data milta hai. 
*/


const deleteNotesSlice = createSlice({
    name : "deleteNotes",
    initialState : {
        isLoading : false,
        deleteNoteMsg : null,
        isError : false
    },
    reducers: {
        //here we create the function we will export thsi.
        clearDeleteMessage: (state) => {
          state.deleteNoteMsg = null;
        }
      },
    extraReducers : (builder) => {
        builder.addCase(funcDeleteNote.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(funcDeleteNote.fulfilled, (state, action) => {
            state.deleteNoteMsg = action.payload;
            state.isLoading = false;
        });
        builder.addCase(funcDeleteNote.rejected, (state, action) => {
            state.isError = true;
        });
    }
})

// As we know we need another reducer so and we know when we create any reducer it always a action that's why we export that reducer from actions.
export const {clearDeleteMessage} = deleteNotesSlice.actions;
export default deleteNotesSlice.reducer;


