import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const api_url = "http://localhost:8000";


// createasyncthunk is a action.
export const getAllNotes = createAsyncThunk('getAllNotes', async () => {
    const response = await fetch(`${api_url}/api/notes/getallnotes`, {
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEwMDAsImlhdCI6MTcxNzg3NjE4MX0.5SHb4jHd6EUggmbC5vpaUmE4aLiZH6_q-kQiIoEjCLc'
        }
    });
    const responseData = await response.json();
    return responseData;
}) 

const getNotes = createSlice({
    name : "getNotesReducer",
    initialState : {
        isLoading : false,
        data : null,
        isError : false
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

export default getNotes.reducer;
// Here it means we export the all reducers which we create inside the reducer key where all reducer have been created as per the functionality.
