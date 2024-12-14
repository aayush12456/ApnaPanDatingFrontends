import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addVisitorEmailSenderAsync = createAsyncThunk(
  'User/addvisitorEmailSenderAsync',
  async (crossObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addVisitorSendEmail/${crossObj.id}`, crossObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      // console.log('add sms data is',Responedata)
  
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addVisitorEmailSlice = createSlice({
  name: 'addVisitorEmailData',
  initialState: {
    addVisitorEmailData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addVisitorEmailSenderAsync.fulfilled, (state, action) => {
      state.addVisitorEmailData = action.payload; // Update responseData in the state after successful login
      // console.log(state.responseData)
    });
    // Additional extra reducers if needed
    builder.addCase( addVisitorEmailSenderAsync.rejected, (state, action) => {
      state.addVisitorEmailData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addVisitorEmailSlice.reducer;
export const addVisitorEmailSliceAction =addVisitorEmailSlice.actions;