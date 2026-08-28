import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const getFieldRegisterUserData = createAsyncThunk(
  'user/getFieldRegisterUser',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/allFieldRegisterUser/${userId}`); 
      // console.log('response of all user',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const getFieldRegisterUserSlice = createSlice({
  name: 'getFieldRegisterUser',
  initialState: {
    getFieldRegisterUser:{},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFieldRegisterUserData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFieldRegisterUserData.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.getFieldRegisterUser= action.payload;
      // console.log('toy data is', state.getUserArray)
    });
    builder.addCase(getFieldRegisterUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getFieldRegisterUserSlice.reducer;
export const getFieldRegisterUserSliceActions = getFieldRegisterUserSlice.actions;
