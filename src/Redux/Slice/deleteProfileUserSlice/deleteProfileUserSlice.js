import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const deleteProfileUserAsync = createAsyncThunk(
  'counter/deleteProfileUserAsync',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.delete(`/deleteProfileUser/${userId}`); 
      // console.log('delete profile response count',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const deleteProfileUserSlice = createSlice({
  name: 'deleteProfileUser',
  initialState: {
    deleteProfileUserObj:{},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProfileUserAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProfileUserAsync.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.deleteProfileUserObj = action.payload;
      // console.log('matches data', state.getUserArray)
    });
    builder.addCase(deleteProfileUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default deleteProfileUserSlice.reducer;
export const deleteProfileUserSliceActions = deleteProfileUserSlice.actions;
