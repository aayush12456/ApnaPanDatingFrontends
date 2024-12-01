import { createSlice } from "@reduxjs/toolkit";
const passMatchArraySlice=createSlice({
    name:'passMatchArray',
    initialState:{
        passMatchArrayData:[]
    },
    reducers:{
        passMatchArrayData(state,action){
        state.passMatchArrayData=action.payload
        // console.log('pass match array',state.passDataObj)
        }
    }
})
export const passMatchArraySliceActions=passMatchArraySlice.actions
export default passMatchArraySlice.reducer