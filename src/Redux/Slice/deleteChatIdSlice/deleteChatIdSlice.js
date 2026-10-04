import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const deleteChatIdAsync = createAsyncThunk(
  'deleteChatId/deleteChatIdAsync',
  async (deleteChatObj, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://192.168.29.169:4000/chat/deleteChatId/${deleteChatObj.id}`,deleteChatObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      // console.log( 'delete profile data',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteChatIdSlice= createSlice({
  name: 'deleteChatId',
  initialState: {
    deleteChatIdObj: {}, // Initialize responseData in the state
  },
  reducers: {
    deleteChatIdData: (state) => {
        state.deleteChatIdObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChatIdAsync.fulfilled, (state, action) => {
      state.deleteChatIdObj= action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(deleteChatIdAsync.rejected, (state, action) => {
      state.deleteChatIdObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default deleteChatIdSlice.reducer;
export const deleteChatIdSliceAction = deleteChatIdSlice.actions;
export const {deleteChatIdData} = deleteChatIdSlice.actions;