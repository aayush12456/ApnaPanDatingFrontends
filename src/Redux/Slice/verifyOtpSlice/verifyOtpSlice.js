import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const verifyOtpAsync = createAsyncThunk(
  'verifyOtp/verifyOtpAsync',
  async (loginObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/verifyOtp', loginObj, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'login response data in loginSlice',Responedata)
     
      
      return Responedata;
      
    } catch (error) {
      // console.error('Login error:', error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || { mssg: 'An error occurred. Please try again.' });
    }
  }
);

const verifyOtpSlice = createSlice({
  name: 'verifyOtp',
  initialState: {
    loginObj: {}, // Initialize responseData in the state
    error:null

  },
  reducers: {
    clearOtpResponse: (state) => {
      state.loginObj = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyOtpAsync.fulfilled, (state, action) => {
      state.loginObj = action.payload; // Update responseData in the state after successful login
      // console.log(state.registerData)
      state.error = null;
    });
    // Additional extra reducers if needed
    builder.addCase(verifyOtpAsync.rejected, (state, action) => {
      state.error = action.payload?.mssg || 'Login failed.'; // Set error message
        state.loginObj = {};   
    });
  },
});

export default verifyOtpSlice.reducer;
export const verifyOtpSliceAction = verifyOtpSlice.actions;
export const { clearOtpResponse } = verifyOtpSlice.actions;