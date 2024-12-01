import { createSlice } from "@reduxjs/toolkit";
const passMatchDataSlice=createSlice({
    name:'passMatchData',
    initialState:{
        passMatchData:{}
    },
    reducers:{
        passMatchDatas(state,action){
        state.passMatchData=action.payload
        // console.log(state.passData)
        }
    }
})
export const passMatchDataSliceActions=passMatchDataSlice.actions
export default passMatchDataSlice.reducer