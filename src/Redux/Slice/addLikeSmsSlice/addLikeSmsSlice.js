import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addLikeSmsSenderAsync = createAsyncThunk(
  'User/addSmsSenderAsync',
  async (crossObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addLikeSmsText/${crossObj.id}`, crossObj, {
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

const addLikeSmsSlice = createSlice({
  name: 'addLikeSmsSenderData',
  initialState: {
    addLikeSmsData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLikeSmsSenderAsync.fulfilled, (state, action) => {
      state.addLikeSmsData = action.payload; // Update responseData in the state after successful login
      // console.log(state.responseData)
    });
    // Additional extra reducers if needed
    builder.addCase( addLikeSmsSenderAsync.rejected, (state, action) => {
      state.addLikeSmsData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addLikeSmsSlice.reducer;
export const addLikeSmsSliceAction =addLikeSmsSlice.actions;