import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const getAllPhoneMailData = createAsyncThunk(
  'phoneMail/getAllPhoneMail',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/getPhoneMail/${userId}`); 
      // console.log('response of all phone number',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAllPhoneMailSlice = createSlice({
  name: 'getAllPhoneMail',
  initialState: {
    getAllPhoneMailObj:{},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPhoneMailData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPhoneMailData.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.getAllPhoneMailObj = action.payload;
      // console.log('matches data', state.getUserArray)
    });
    builder.addCase(getAllPhoneMailData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAllPhoneMailSlice.reducer;
export const getAllPhoneMailSliceActions = getAllPhoneMailSlice.actions;
