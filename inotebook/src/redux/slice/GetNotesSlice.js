import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const apiUrl = process.env.REACT_APP_API_URl;

// createasyncthunk is a action.
export const getAllNotes = createAsyncThunk('getAllNotes', async () => {
    const response = await fetch(`${apiUrl}/notes/getallnotes`, {
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
        }
    });
    const responseData = await response.json();
    return responseData;
}) 

const getNotes = createSlice({
    name : "getNotes",
    initialState : {
        isLoading : false,
        data : null,
        isError : false
    },
    reducers : {
        clearNoteData : (state) => {
            state.data = null;
        }
    },
    // Here when we use createAsyncThunk it menas we do action(means we call an api tab we use extraReducer object or function where we give builder argument so that we get
    // data according to the states of an promise if fulfilled state of an api it means it will send the data so we set the data from action.payload to state because all data
    // will be coming in object form or we can say json form from an api inside the action that's why we said createasyncthunk is an action.
    extraReducers : (builder) => {
        builder.addCase(getAllNotes.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getAllNotes.rejected, (state, action) => {
            state.isError = true;
        });
    }
})

export const {clearNoteData} = getNotes.actions;
export default getNotes.reducer;
// Here it means we export the all reducers which we create inside the reducer key where all reducer have been created as per the functionality.
