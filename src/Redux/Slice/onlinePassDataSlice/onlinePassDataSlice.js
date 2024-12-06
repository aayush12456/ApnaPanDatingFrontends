import { createSlice } from "@reduxjs/toolkit";
const onlinePassDataSlice=createSlice({
    name:'on;inePassData',
    initialState:{
        onlinePassData:''
    },
    reducers:{
        onlinePassDatas(state,action){
        state.onlinePassData=action.payload
        // console.log(state.passData)
        }
    }
})
export const onlinePassDataSliceActions=onlinePassDataSlice.actions
export default onlinePassDataSlice.reducer