import { createSlice } from "@reduxjs/toolkit";

const moreChatSlice = createSlice({
  name: "morechatToggle",
  initialState: {
    moreChatToggle: false,
  },
  reducers: {
    moreChatToggle(state){
        state.moreChatToggle = !state.moreChatToggle;
      
    },
  },
});

export const moreChatActions = moreChatSlice.actions
export default moreChatSlice.reducer