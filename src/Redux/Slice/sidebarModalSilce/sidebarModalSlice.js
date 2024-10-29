import { createSlice } from "@reduxjs/toolkit";

const sidebarModalSlice = createSlice({
  name: "sidebarToggle",
  initialState: {
    sidebarModalToggle: false,
  },
  reducers: {
    sidebarVisibleToggle(state){
        state.sidebarModalToggle = !state.sidebarModalToggle;
        console.log('sidebar modal',state.sidebarModalToggle)
      
    },
  },
});

export const sidebarModalActions = sidebarModalSlice.actions
export default sidebarModalSlice.reducer