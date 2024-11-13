import { createSlice } from "@reduxjs/toolkit";

const addChatModalSlice = createSlice({
  name: "addChatModalToggle",
  initialState: {
    addChatModalToggle: false,
  },
  reducers: {
    addChatVisibleToggle(state){
        state.addChatModalToggle = !state.addChatModalToggle;
        console.log('add chat modal',state.addChatModalToggle)
      
    },
  },
});

export const addChatModalActions = addChatModalSlice.actions
export default addChatModalSlice.reducer