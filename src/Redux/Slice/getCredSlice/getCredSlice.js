import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getCredAsync = createAsyncThunk(
  'getCredDetail/getCredAsync',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/getCredUpload/${id}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'get hotel data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getCredSlice = createSlice({
  name: 'getCredDetails',
  initialState: {
    getCredObj: {}, // Initialize responseData in the state


  },
//   reducers: {
//     clearHotelNameData: (state) => {
//         state.getHotelNameObj = null;
//       },
//   },
  extraReducers: (builder) => {
    builder.addCase(getCredAsync.fulfilled, (state, action) => {
      state.getCredObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getCredAsync.rejected, (state, action) => {
      state.getCredObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default  getCredSlice.reducer;
export const  getCredSliceAction =  getCredSlice.actions;
// export const { clearHotelNameData } = getHotelNameSlice.actions;