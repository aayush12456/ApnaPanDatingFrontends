import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addSelectedSongAsync = createAsyncThunk(
  'song/addSelectedSongAsync',
  async (songObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addSelectedSong/${songObj.id}`, songObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      console.log('selected song data is',Responedata)
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addSelectedSongSlice = createSlice({
  name: 'addSelectedSongData',
  initialState: {
    addSelectedSongData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( addSelectedSongAsync.fulfilled, (state, action) => {
      state.addSelectedSongData = action.payload; // Update responseData in the state after successful login
      console.log(state.addSelectedSongData)
    });
    // Additional extra reducers if needed
    builder.addCase( addSelectedSongAsync.rejected, (state, action) => {
      state.addSelectedSongData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addSelectedSongSlice.reducer;
export const addSelectedSongSliceAction = addSelectedSongSlice.actions;