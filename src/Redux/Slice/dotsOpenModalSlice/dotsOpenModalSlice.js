import { createSlice } from "@reduxjs/toolkit";

const dotsOpenModalSlice = createSlice({
  name: "dotsOpenModalToggle",
  initialState: {
    dotsOpenToggle: false,
  },
  reducers: {
    dotsOpenModalToggle(state){
        state.dotsOpenToggle = !state.dotsOpenToggle;
      
    },
  },
});

export const dotsOpenModalToggleActions = dotsOpenModalSlice.actions
export default dotsOpenModalSlice.reducer