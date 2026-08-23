import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const userReportAsync = createAsyncThunk(
  'userReport/userReportAsync',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/sendReport', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'report response data ',Responedata)
           
        // sessionStorage.setItem('signupObject',JSON.stringify(personalSignUpData))
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userReportSlice = createSlice({
  name: 'userReport',
  initialState: {
    userReportObj: {}, // Initialize responseData in the state
  },
  reducers: {
    reportUsData: (state) => {
        state.userReportObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(userReportAsync.fulfilled, (state, action) => {
      state.userReportObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(userReportAsync.rejected, (state, action) => {
      state.userReportObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default userReportSlice.reducer;
export const userReportSliceAction = userReportSlice.actions;
export const {reportUsData} = userReportSlice.actions;