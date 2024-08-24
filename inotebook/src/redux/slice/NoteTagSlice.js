import { createSlice } from "@reduxjs/toolkit";

const NoteTagSlice = createSlice({
    name: "noteTag",
    initialState : {
        tagValue : null
    },
    reducers : {
        setNotetag : (state, action) => {
            state.tagValue = action.payload;
        },
        clearNotetag : (state) => {
            state.tagValue = null;
        }
    }
});


export const {setNotetag, clearNotetag} = NoteTagSlice.actions;
export default NoteTagSlice.reducer;
