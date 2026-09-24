import { createSlice } from "@reduxjs/toolkit";

const LargePlanScreenSlice = createSlice({
  name: "LargePlanScreenToggle",
  initialState: {
    LargePlanScreenToggle: false,
  },
  reducers: {
    LargePlanScreenVisibleToggle(state){
        state.LargePlanScreenToggle = !state.LargePlanScreenToggle;
      
    },
  },
});

export const LargePlanScreenActions = LargePlanScreenSlice.actions
export default LargePlanScreenSlice.reducer