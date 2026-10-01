import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const deleteSubscribeUserAsync = createAsyncThunk(
  'user/deleteSubscribeUserAsync',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.post(`/delete/${userId}`); 
      // console.log('delete profile response count',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const deleteSubscribeUserSlice = createSlice({
  name: 'deleteSubscribeUser',
  initialState: {
    deleteSubscribeUserObj:{},
    isLoading: false,
    error: null,
  },
  reducers: {
    clearSubscribeUserResponse: (state) => {
      state.deleteSubscribeUserObj = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSubscribeUserAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteSubscribeUserAsync.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.deleteSubscribeUserObj= action.payload;
      // console.log('matches data', state.getUserArray)
    });
    builder.addCase(deleteSubscribeUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default  deleteSubscribeUserSlice.reducer;
export const  deleteSubscribeUserSliceActions = deleteSubscribeUserSlice.actions;
export const {clearSubscribeUserResponse} =  deleteSubscribeUserSlice.actions;
