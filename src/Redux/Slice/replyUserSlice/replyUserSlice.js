import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const replyUserAsync = createAsyncThunk(
  'replyUser/replyUserAsync',
  async (replyUserObj, { rejectWithValue }) => {
    try {
      // const response = await axios.post(`/sendEmail/${contactUsObj.id}`, contactUsObj, {
        const response = await axios.post(`/replyEmail`, replyUserObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      // console.log( 'add contact data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const replyUserSlice = createSlice({
  name: 'replyUserObj',
  initialState: {
    replyUserObj: {}, // Initialize responseData in the state
  },
  reducers: {
    replyUserData: (state) => {
        state.replyUserObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(replyUserAsync.fulfilled, (state, action) => {
      state.replyUserObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(replyUserAsync.rejected, (state, action) => {
      state.replyUserObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default replyUserSlice.reducer;
export const replyUserAction = replyUserSlice.actions;
export const {replyUserData} = replyUserSlice.actions;