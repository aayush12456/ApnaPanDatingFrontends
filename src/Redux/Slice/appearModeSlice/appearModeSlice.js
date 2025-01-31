import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const appearModeAsync = createAsyncThunk(
  'User/appearModeAsync',
  async (appearObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addDarkMode/${appearObj.id}`, appearObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      console.log('add appear mode is',Responedata)
  
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appearModeSlice = createSlice({
  name: 'appearModeData',
  initialState: {
    appearModeData: {}, // Initialize responseData in the state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(appearModeAsync.fulfilled, (state, action) => {
      state.appearModeData = action.payload; // Update responseData in the state after successful login
      // console.log(state.responseData)
    });
    // Additional extra reducers if needed
    builder.addCase(appearModeAsync.rejected, (state, action) => {
      state.appearModeData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default appearModeSlice.reducer;
export const appearModeSliceAction =appearModeSlice.actions;