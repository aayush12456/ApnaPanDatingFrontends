import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
import * as SecureStore from 'expo-secure-store';
export const finalLoginWithOtpAsync = createAsyncThunk(
  "userLogin/finalLoginWithOtpAsync",
  async (finalLoginWithOtpCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/verifyOtp", finalLoginWithOtpCredentials, {
        headers: { "Content-Type": "application/json" },
      });

      const Responedata = response.data;
      // console.log('final  login with otp data',Responedata)
      if (Responedata?.token) {
        await SecureStore.setItemAsync('loginToken', Responedata?.token);
        // console.log('Token stored securely in SecureStore',Responedata?.token);
      }
      if(Responedata?.loginData?._id){
        await SecureStore.setItemAsync('loginId', Responedata?.loginData?._id);
        // console.log('loginId stored securely in SecureStore',Responedata?.loginData?._id);
      }
      if (Responedata?.loginData) {
        await SecureStore.setItemAsync('loginObj', JSON.stringify(Responedata?.loginData)); // Stringify the object
        // console.log('login obj stored securely in SecureStore', Responedata?.loginData);
      }
      
      return Responedata;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const finalLoginWithOtpSlice = createSlice({
  name: "finalLoginWithOtp",
  initialState: {
    finalLoginWithOtpData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(finalLoginWithOtpAsync.fulfilled, (state, action) => {
      state.finalLoginWithOtpData = action.payload; // Update responseData in the state after successful login
    });
    // Additional extra reducers if needed
    builder.addCase(finalLoginWithOtpAsync.rejected, (state, action) => {
      state.finalLoginWithOtpData = action.payload; // Update responseData even for rejected login attempt
      // console.error('  Login with otp attempt failed:', action.payload)
    });
  },
});

export default finalLoginWithOtpSlice .reducer;
export const finalLoginWithOtpSliceAction = finalLoginWithOtpSlice .actions;
