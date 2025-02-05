import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const loginWithOtpAsync = createAsyncThunk(
  "userLogin/LoginWithOtpAsync",
  async (loginWithOtpCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/loginWithOtp", loginWithOtpCredentials, {
        headers: { "Content-Type": "application/json" },
      });

      const Responedata = response.data;
      // console.log('login with otp data',Responedata)
      
      return Responedata;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginWithOtpSlice = createSlice({
  name: "loginWithOtp",
  initialState: {
    loginWithOtpData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithOtpAsync.fulfilled, (state, action) => {
      state.loginWithOtpData = action.payload; // Update responseData in the state after successful login
    });
    // Additional extra reducers if needed
    builder.addCase(loginWithOtpAsync.rejected, (state, action) => {
      state.loginWithOtpData = action.payload; // Update responseData even for rejected login attempt
      // console.error('  Login with otp attempt failed:', action.payload)
    });
  },
});

export default loginWithOtpSlice.reducer;
export const loginWithOtpSliceAction = loginWithOtpSlice.actions;
