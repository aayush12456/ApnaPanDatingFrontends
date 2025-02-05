import { createSlice } from "@reduxjs/toolkit";
const passDataSlice=createSlice({
    name:'passData',
    initialState:{
        passData:''
    },
    reducers:{
        passDatas(state,action){
        state.passData=action.payload
        // console.log('pass data',state.passData)
        }
    }
})
export const passDataSliceActions=passDataSlice.actions
export default passDataSlice.reducer