import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
// import io from 'socket.io-client';
// const socket = io('http://localhost:4000');
export const PasswordUpdateAsync = createAsyncThunk(
  'User/PasswordUpdateAsync',
  async (passwordUpdateObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/updatePasswordUser/${passwordUpdateObj.id}`,passwordUpdateObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      // console.log('password update data is',Responedata)
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const PasswordUpdateSlice = createSlice({
  name: 'PasswordUpdateData',
  initialState: {
    addPasswordUpdateData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(  PasswordUpdateAsync.fulfilled, (state, action) => {
      state.addPasswordUpdateData = action.payload; // Update responseData in the state after successful login
      // console.log(state.responseData)
    });
    // Additional extra reducers if needed
    builder.addCase(  PasswordUpdateAsync.rejected, (state, action) => {
      state.addPasswordUpdateData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default PasswordUpdateSlice.reducer;
export const PasswordUpdateSliceAction = PasswordUpdateSlice.actions;