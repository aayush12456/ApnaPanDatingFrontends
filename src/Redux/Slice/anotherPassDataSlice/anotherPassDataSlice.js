import { createSlice } from "@reduxjs/toolkit";
const anotherPassDataSlice=createSlice({
    name:'anotherPassData',
    initialState:{
        anotherPassData:{}
    },
    reducers:{
        anotherPassDatas(state,action){
        state.anotherPassData=action.payload
        // console.log(state.passData)
        }
    }
})
export const anotherPassDataSliceActions=anotherPassDataSlice.actions
export default anotherPassDataSlice.reducer