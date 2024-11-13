import { createSlice } from "@reduxjs/toolkit";
const passVideoSlice=createSlice({
    name:'passVideoData',
    initialState:{
        passVideoData:{}
    },
    reducers:{
        passVideoDatas(state,action){
        state.passVideoData=action.payload
        // console.log(state.passData)
        }
    }
})
export const passVideoDataSliceActions=passVideoSlice.actions
export default passVideoSlice.reducer