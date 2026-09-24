import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const planCheckAsync = createAsyncThunk(
  'User/ planCheckAsync',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/free-trial/${userId}`); 
      // console.log('plan check  user',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const  planCheckSlice = createSlice({
  name: 'planCheck',
  initialState: {
planCheckObj:{},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(planCheckAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase( planCheckAsync.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.planCheckObj=action.payload
      // console.log('matches data', state.getMatchUserArray)
    });
    builder.addCase( planCheckAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default planCheckSlice.reducer;
export const  planCheckSliceActions = planCheckSlice.actions;
