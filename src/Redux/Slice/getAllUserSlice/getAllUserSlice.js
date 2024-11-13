import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const getAllUserData = createAsyncThunk(
  'user/getAllUser',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/allUsers/${userId}`); 
      console.log('response of all user',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const getAllUserSlice = createSlice({
  name: 'getAllUser',
  initialState: {
    getAllUserArray:[],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllUserData.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.getAllUserArray = action.payload;
      // console.log('toy data is', state.getUserArray)
    });
    builder.addCase(getAllUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAllUserSlice.reducer;
export const getAllUserSliceActions = getAllUserSlice.actions;
