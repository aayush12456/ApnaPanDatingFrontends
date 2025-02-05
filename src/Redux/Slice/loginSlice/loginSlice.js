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
      // console.log( 'login response data in loginSlice',Responedata)
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
      // console.error('Login error:', error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || { mssg: 'An error occurred. Please try again.' });
    }
  }
);

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    loginData: {}, // Initialize responseData in the state
    error:null

  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      state.loginData = action.payload; // Update responseData in the state after successful login
      // console.log(state.registerData)
      state.error = null;
    });
    // Additional extra reducers if needed
    builder.addCase(userLoginAsync.rejected, (state, action) => {
      state.error = action.payload?.mssg || 'Login failed.'; // Set error message
        state.loginData = {};   
    });
  },
});

export default userLoginSlice.reducer;
export const userLoginSliceAction = userLoginSlice.actions;