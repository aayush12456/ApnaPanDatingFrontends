import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const getAllPhoneNumbersData = createAsyncThunk(
  'phoneNumber/getPhoneNumber',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/completeAllUser/${userId}`); 
      // console.log('response of all phone number',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAllPhoneNumberSlice = createSlice({
  name: 'getMatches',
  initialState: {
    getAllPhoneNumbersObj:{},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPhoneNumbersData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPhoneNumbersData.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.getAllPhoneNumbersObj = action.payload;
      // console.log('matches data', state.getUserArray)
    });
    builder.addCase(getAllPhoneNumbersData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAllPhoneNumberSlice.reducer;
export const getAllPhoneNumberSliceActions = getAllPhoneNumberSlice.actions;
