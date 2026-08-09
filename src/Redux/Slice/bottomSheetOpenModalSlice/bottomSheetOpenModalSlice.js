import { createSlice } from "@reduxjs/toolkit";

const bottomSheetOpenModalSlice = createSlice({
  name: "bottomSheetOpenModalToggle",
  initialState: {
    bottomSheetOpenToggle: false,
  },
  reducers: {
    bottomSheetOpenModalToggle(state){
        state.bottomSheetOpenToggle = !state.bottomSheetOpenToggle;
    },
  },
});

export const bottomSheetOpenModalToggleActions = bottomSheetOpenModalSlice.actions
export default bottomSheetOpenModalSlice.reducer