import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from '../../axios/axios'


export const getBollywoodSongAsync = createAsyncThunk(
  'Song/getBollywoodSong',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/getUploadSong/${userId}`); 
      // console.log('response',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getBollywoodSongSlice = createSlice({
  name: 'getBollywoodSongs',
  initialState: {
    getBollywoodSongUserObj: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBollywoodSongAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getBollywoodSongAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getBollywoodSongUserObj= action.payload;
    });
    builder.addCase(getBollywoodSongAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getBollywoodSongSlice.reducer;
export const getBollywoodSongSliceActions= getBollywoodSongSlice.actions;
