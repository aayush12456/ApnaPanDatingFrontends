import { createSlice } from "@reduxjs/toolkit";

const playVideoModalSlice = createSlice({
  name: "playVideoModalToggle",
  initialState: {
    playVideoModalToggle: false,
  },
  reducers: {
    playVideoModalToggle(state){
        state.playVideoModalToggle = !state.playVideoModalToggle;
        console.log('playVideo modal',state.playVideoModalToggle)
      
    },
  },
});

export const playVideoModalActions = playVideoModalSlice.actions
export default playVideoModalSlice.reducer