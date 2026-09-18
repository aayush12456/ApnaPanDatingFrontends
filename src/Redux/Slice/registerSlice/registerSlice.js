import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const userRegisterAsync = createAsyncThunk(
  'userRegister/userRegisterAsync',
  async (registerObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup', registerObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      // console.log( 'register response data ',Responedata)
         
        // sessionStorage.setItem('signupObject',JSON.stringify(personalSignUpData))
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    registerDataObj: {}, // Initialize responseData in the state
  },
  reducers: {
    registerProfileResponse: (state) => {
      state.registerDataObj = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegisterAsync.fulfilled, (state, action) => {
      state.registerDataObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(userRegisterAsync.rejected, (state, action) => {
      state.registerDataObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default userRegisterSlice.reducer;
export const userRegisterSliceAction = userRegisterSlice.actions;
export const {  registerProfileResponse } = userRegisterSlice.actions;