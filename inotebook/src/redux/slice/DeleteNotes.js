import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { apiService } from '../../Services/ApiService';

// we can createasyncthunk is a action becasue with api we get data and where we can get data that was a action.
export const funcDeleteNote = createAsyncThunk('funcDeleteNote', async (id) =>{
    // Here is one more catch between fetch and axios.
    /* 
    -> In fetch do not required to add body in post, put, patch http methods. However in axios its mandatory to add body because post, put, patch methods requires.
       So when we delete any data we use post, axios checks body(means json) but sometimes we send the data in url in which body not requries. we send body as an Empty Obj.
    */
    const response = await apiService.post(`/notes/${id}/deletenote`, 
        {} ,
        {
        headers:{
            "auth-token": localStorage.getItem('token')
        }
    });

    return response.data;
});

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


