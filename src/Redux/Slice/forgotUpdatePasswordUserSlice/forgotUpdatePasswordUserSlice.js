import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const forgotUpdatePasswordUserAsync = createAsyncThunk(
  'User/forgotUpdatePasswordUserAsync',
  async (forgotpasswordUpdateUserObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/forgotUpdatePasswordUser`,forgotpasswordUpdateUserObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add update password data to mongodb database.');
      }
     
      const Responedata = response.data;
      // console.log('forgot password update data is',Responedata)
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ForgotUpdatePasswordUserSlice= createSlice({
  name: 'ForgotUpdatePasswordUserData',
  initialState: {
    addForgotPasswordUpdateData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( forgotUpdatePasswordUserAsync.fulfilled, (state, action) => {
      state.addForgotPasswordUpdateData = action.payload; // Update responseData in the state after successful login
      // console.log(state.responseData)
    });
    // Additional extra reducers if needed
    builder.addCase( forgotUpdatePasswordUserAsync.rejected, (state, action) => {
      state.addForgotPasswordUpdateData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default ForgotUpdatePasswordUserSlice.reducer;
export const ForgotUpdatePasswordUserSliceSliceAction =ForgotUpdatePasswordUserSlice.actions;