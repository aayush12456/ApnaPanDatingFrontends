import { createSlice } from "@reduxjs/toolkit";

const anotherBottomSheetModalSlice = createSlice({
  name: "antherBottomSheetModalToggle",
  initialState: {
    anotherBottomSheetToggle: false,
  },
  reducers: {
    anotherBottomSheetModalToggle(state){
        state.anotherBottomSheetToggle= !state.anotherBottomSheetToggle;
    },
  },
});

export const anotherBottomSheetModalToggleActions = anotherBottomSheetModalSlice.actions
export default anotherBottomSheetModalSlice.reducer