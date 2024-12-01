import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
import * as SecureStore from 'expo-secure-store';
export const userLoginAsync = createAsyncThunk(
  'userLogin/userLoginAsync',
  async (loginObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', loginObj, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'login response data in loginSlice',Responedata)
          if (Responedata?.token) {
        await SecureStore.setItemAsync('loginToken', Responedata?.token);
        console.log('Token stored securely in SecureStore',Responedata?.token);
      }
      if(Responedata?.loginData?._id){
        await SecureStore.setItemAsync('loginId', Responedata?.loginData?._id);
        console.log('loginId stored securely in SecureStore',Responedata?.loginData?._id);
      }
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    loginData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      state.loginData = action.payload; // Update responseData in the state after successful login
      // console.log(state.registerData)
    });
    // Additional extra reducers if needed
    builder.addCase(userLoginAsync.rejected, (state, action) => {
      state.loginData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default userLoginSlice.reducer;
export const userLoginSliceAction = userLoginSlice.actions;