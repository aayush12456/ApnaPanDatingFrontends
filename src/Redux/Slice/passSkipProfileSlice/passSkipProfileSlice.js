import { createSlice } from "@reduxjs/toolkit";
const passSkipProfileSlice=createSlice({
    name:'passSkipProfile',
    initialState:{
        passSkipProfile:''
    },
    reducers:{
        passSkipProfile(state,action){
        state.passSkipProfile=action.payload
        // console.log(state.passData)
        }
    }
})
export const passSkipProfileSliceActions=passSkipProfileSlice.actions
export default passSkipProfileSlice.reducer